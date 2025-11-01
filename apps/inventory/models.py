from decimal import Decimal

from django.db import models

from apps.catalog.models import Product
from apps.common.models import BaseModel


class Warehouse(BaseModel):
    name = models.CharField(max_length=255)
    code = models.CharField(max_length=32, unique=True)

    def __str__(self) -> str:  # pragma: no cover - trivial
        return f"{self.code} - {self.name}"


class Location(BaseModel):
    INTERNAL = "internal"
    CUSTOMER = "customer"
    SUPPLIER = "supplier"
    TRANSIT = "transit"

    USAGE_CHOICES = [
        (INTERNAL, "Internal"),
        (CUSTOMER, "Customer"),
        (SUPPLIER, "Supplier"),
        (TRANSIT, "Transit"),
    ]

    warehouse = models.ForeignKey(
        Warehouse, on_delete=models.CASCADE, related_name="locations"
    )
    name = models.CharField(max_length=255)
    usage = models.CharField(max_length=32, choices=USAGE_CHOICES, default=INTERNAL)
    is_active = models.BooleanField(default=True)

    class Meta:
        unique_together = ("warehouse", "name")

    def __str__(self) -> str:  # pragma: no cover - trivial
        return f"{self.name} ({self.get_usage_display()})"


class ProductStock(BaseModel):
    product = models.ForeignKey(
        Product, on_delete=models.CASCADE, related_name="stocks"
    )
    location = models.ForeignKey(
        Location, on_delete=models.CASCADE, related_name="stocks"
    )
    quantity = models.DecimalField(
        max_digits=14, decimal_places=2, default=Decimal("0.00")
    )

    class Meta:
        unique_together = ("product", "location")

    def __str__(self) -> str:  # pragma: no cover - trivial
        return f"{self.product} @ {self.location}: {self.quantity}"


class StockMove(BaseModel):
    DRAFT = "draft"
    DONE = "done"
    CANCELLED = "cancelled"

    STATE_CHOICES = [
        (DRAFT, "Draft"),
        (DONE, "Done"),
        (CANCELLED, "Cancelled"),
    ]

    product = models.ForeignKey(Product, on_delete=models.PROTECT, related_name="moves")
    qty = models.DecimalField(max_digits=14, decimal_places=2)
    source = models.ForeignKey(
        Location,
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name="moves_out",
    )
    destination = models.ForeignKey(
        Location,
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name="moves_in",
    )
    state = models.CharField(max_length=16, choices=STATE_CHOICES, default=DRAFT)
    reference = models.CharField(max_length=255, blank=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self) -> str:  # pragma: no cover - trivial
        return f"{self.product} {self.qty} {self.state}"

    def apply(self) -> None:
        if self.state == self.DONE:
            return

        if self.source:
            stock, _ = ProductStock.objects.get_or_create(
                product=self.product, location=self.source
            )
            stock.quantity = (stock.quantity or Decimal("0.00")) - self.qty
            stock.save(update_fields=["quantity", "updated_at"])

        if self.destination:
            stock, _ = ProductStock.objects.get_or_create(
                product=self.product, location=self.destination
            )
            stock.quantity = (stock.quantity or Decimal("0.00")) + self.qty
            stock.save(update_fields=["quantity", "updated_at"])

        self.state = self.DONE
        self.save(update_fields=["state", "updated_at"])
