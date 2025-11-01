from decimal import Decimal

from django.db import models, transaction

from apps.catalog.models import Product
from apps.common.models import BaseModel
from apps.inventory.models import Location, StockMove
from apps.partners.models import Partner


class PurchaseOrder(BaseModel):
    DRAFT = "draft"
    RECEIVED = "received"
    CANCELLED = "cancelled"

    STATUS_CHOICES = [
        (DRAFT, "Draft"),
        (RECEIVED, "Received"),
        (CANCELLED, "Cancelled"),
    ]

    number = models.CharField(max_length=64, unique=True)
    vendor = models.ForeignKey(
        Partner, on_delete=models.PROTECT, related_name="purchase_orders"
    )
    status = models.CharField(max_length=16, choices=STATUS_CHOICES, default=DRAFT)
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
    def receive(self) -> None:
        if self.status == self.RECEIVED:
            return

        internal = (
            Location.objects.filter(usage=Location.INTERNAL)
            .order_by("created_at")
            .first()
        )
        supplier_loc = (
            Location.objects.filter(usage=Location.SUPPLIER)
            .order_by("created_at")
            .first()
        )
        if not internal or not supplier_loc:
            raise ValueError("Inventory locations not configured")

        for line in self.lines.all():
            move = StockMove.objects.create(
                product=line.product,
                qty=line.qty,
                source=supplier_loc,
                destination=internal,
                reference=self.number,
            )
            move.apply()

        self.status = self.RECEIVED
        self.save(update_fields=["status", "updated_at"])


class PurchaseOrderLine(BaseModel):
    order = models.ForeignKey(
        PurchaseOrder, on_delete=models.CASCADE, related_name="lines"
    )
    product = models.ForeignKey(
        Product, on_delete=models.PROTECT, related_name="purchase_lines"
    )
    qty = models.DecimalField(max_digits=12, decimal_places=2)
    price = models.DecimalField(max_digits=12, decimal_places=2)
    subtotal = models.DecimalField(
        max_digits=12, decimal_places=2, default=Decimal("0.00")
    )

    class Meta:
        unique_together = ("order", "product")

    def __str__(self) -> str:  # pragma: no cover - trivial
        return f"{self.product} x {self.qty}"

    def save(self, *args, **kwargs):
        if not self.price:
            self.price = self.product.cost_price
        self.subtotal = self.price * self.qty
        super().save(*args, **kwargs)
        self.order.recalculate_totals()
