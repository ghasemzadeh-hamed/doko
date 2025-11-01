from django.db import models

from apps.common.models import BaseModel


class Partner(BaseModel):
    CUSTOMER = "customer"
    SUPPLIER = "supplier"
    BOTH = "both"
    OTHER = "other"

    PARTNER_TYPES = [
        (CUSTOMER, "Customer"),
        (SUPPLIER, "Supplier"),
        (BOTH, "Customer & Supplier"),
        (OTHER, "Other"),
    ]

    name = models.CharField(max_length=255)
    partner_type = models.CharField(
        max_length=32, choices=PARTNER_TYPES, default=CUSTOMER
    )
    email = models.EmailField(blank=True)
    phone = models.CharField(max_length=64, blank=True)
    tax_id = models.CharField(max_length=64, blank=True)
    is_active = models.BooleanField(default=True)

    def __str__(self) -> str:  # pragma: no cover - trivial
        return self.name


class Address(BaseModel):
    partner = models.ForeignKey(
        Partner, on_delete=models.CASCADE, related_name="addresses"
    )
    line1 = models.CharField(max_length=255)
    line2 = models.CharField(max_length=255, blank=True)
    city = models.CharField(max_length=128)
    state = models.CharField(max_length=128, blank=True)
    postal_code = models.CharField(max_length=32, blank=True)
    country = models.CharField(max_length=64)
    is_default = models.BooleanField(default=False)

    def __str__(self) -> str:  # pragma: no cover - trivial
        return f"{self.line1}, {self.city}"
