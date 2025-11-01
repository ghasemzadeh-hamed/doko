from decimal import Decimal

from django.db import models, transaction

from apps.catalog.models import PriceList, Product
from apps.common.models import BaseModel
from apps.inventory.models import Location, StockMove
from apps.partners.models import Partner
from apps.sales.services.pricing_rules import price_line


class SalesOrder(BaseModel):
    DRAFT = "draft"
    CONFIRMED = "confirmed"
    CANCELLED = "cancelled"

    STATUS_CHOICES = [
        (DRAFT, "Draft"),
        (CONFIRMED, "Confirmed"),
        (CANCELLED, "Cancelled"),
    ]

    number = models.CharField(max_length=64, unique=True)
    customer = models.ForeignKey(
        Partner, on_delete=models.PROTECT, related_name="sales_orders"
    )
    status = models.CharField(max_length=16, choices=STATUS_CHOICES, default=DRAFT)
    pricelist = models.ForeignKey(
        PriceList,
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name="sales_orders",
    )
    total_amount = models.DecimalField(
        max_digits=14, decimal_places=2, default=Decimal("0.00")
    )

    class Meta:
        ordering = ["-created_at"]

    def __str__(self) -> str:  # pragma: no cover - trivial
        return self.number

    def recalculate_totals(self) -> None:
        total = self.lines.aggregate(total=models.Sum("subtotal"))
        self.total_amount = total.get("total") or Decimal("0.00")
        self.save(update_fields=["total_amount", "updated_at"])

    @transaction.atomic
    def confirm(self) -> None:
        if self.status == self.CONFIRMED:
            return

        internal = (
            Location.objects.filter(usage=Location.INTERNAL)
            .order_by("created_at")
            .first()
        )
        customer_loc = (
            Location.objects.filter(usage=Location.CUSTOMER)
            .order_by("created_at")
            .first()
        )
        if not internal or not customer_loc:
            raise ValueError("Inventory locations not configured")

        for line in self.lines.all():
            move = StockMove.objects.create(
                product=line.product,
                qty=line.qty,
                source=internal,
                destination=customer_loc,
                reference=self.number,
            )
            move.apply()

        self.status = self.CONFIRMED
        self.save(update_fields=["status", "updated_at"])


class SalesOrderLine(BaseModel):
    order = models.ForeignKey(
        SalesOrder, on_delete=models.CASCADE, related_name="lines"
    )
    product = models.ForeignKey(
        Product, on_delete=models.PROTECT, related_name="sales_lines"
    )
    qty = models.DecimalField(max_digits=12, decimal_places=2)
    price = models.DecimalField(max_digits=12, decimal_places=2)
    tax_amount = models.DecimalField(
        max_digits=12, decimal_places=2, default=Decimal("0.00")
    )
    subtotal = models.DecimalField(
        max_digits=12, decimal_places=2, default=Decimal("0.00")
    )

    class Meta:
        unique_together = ("order", "product")

    def __str__(self) -> str:  # pragma: no cover - trivial
        return f"{self.product} x {self.qty}"

    def save(self, *args, **kwargs):
        pricing = price_line(self, pricelist=self.order.pricelist)
        if not self.price:
            self.price = pricing["price"]
        if not self.tax_amount:
            self.tax_amount = pricing["tax_amount"]
        self.subtotal = (self.price * self.qty) + self.tax_amount
        super().save(*args, **kwargs)
        self.order.recalculate_totals()
