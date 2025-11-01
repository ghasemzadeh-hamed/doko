from decimal import Decimal

from django.db import models

from apps.common.models import BaseModel


class Category(BaseModel):
    name = models.CharField(max_length=255)
    parent = models.ForeignKey(
        "self",
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name="children",
    )
    description = models.TextField(blank=True)

    class Meta:
        verbose_name_plural = "Categories"

    def __str__(self) -> str:  # pragma: no cover - trivial
        return self.name


class Product(BaseModel):
    sku = models.CharField(max_length=64, unique=True)
    name = models.CharField(max_length=255)
    category = models.ForeignKey(
        Category,
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name="products",
    )
    description = models.TextField(blank=True)
    list_price = models.DecimalField(
        max_digits=12, decimal_places=2, default=Decimal("0.00")
    )
    cost_price = models.DecimalField(
        max_digits=12, decimal_places=2, default=Decimal("0.00")
    )
    is_active = models.BooleanField(default=True)

    def __str__(self) -> str:  # pragma: no cover - trivial
        return f"{self.sku} - {self.name}"


class PriceList(BaseModel):
    name = models.CharField(max_length=255)
    currency = models.CharField(max_length=3, default="USD")
    is_active = models.BooleanField(default=True)

    def __str__(self) -> str:  # pragma: no cover - trivial
        return self.name


class PriceListItem(BaseModel):
    pricelist = models.ForeignKey(
        PriceList, on_delete=models.CASCADE, related_name="items"
    )
    product = models.ForeignKey(
        Product, on_delete=models.CASCADE, related_name="price_items"
    )
    price = models.DecimalField(max_digits=12, decimal_places=2)

    class Meta:
        unique_together = ("pricelist", "product")

    def __str__(self) -> str:  # pragma: no cover - trivial
        return f"{self.pricelist} - {self.product}"
