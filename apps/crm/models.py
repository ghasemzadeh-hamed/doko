from django.db import models

from apps.common.models import BaseModel
from apps.partners.models import Partner


class Stage(BaseModel):
    name = models.CharField(max_length=128, unique=True)
    sequence = models.PositiveIntegerField(default=1)

    class Meta:
        ordering = ["sequence"]

    def __str__(self) -> str:  # pragma: no cover - trivial
        return self.name


class Lead(BaseModel):
    name = models.CharField(max_length=255)
    partner = models.ForeignKey(
        Partner, null=True, blank=True, on_delete=models.SET_NULL, related_name="leads"
    )
    email = models.EmailField(blank=True)
    phone = models.CharField(max_length=64, blank=True)
    stage = models.ForeignKey(Stage, on_delete=models.PROTECT, related_name="leads")
    expected_value = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    probability = models.PositiveSmallIntegerField(default=0)

    def __str__(self) -> str:  # pragma: no cover - trivial
        return self.name
