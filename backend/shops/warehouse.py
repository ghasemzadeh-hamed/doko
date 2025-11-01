from django.db import models
from backend.shops.productShop import Store
from django.utils.translation import gettext_lazy as _

class Warehouse(Store):
    METHOD_CHOICES = [
        ('main', 'Main Group'),
        ('sub', 'Subgruop'),

    ]

    group = models.CharField(max_length=10, choices=METHOD_CHOICES, unique=True,null=True,blank=True)
    capacity = models.PositiveIntegerField(_("Capacity (Cubic meter)"), null=True)
    max_capacity = models.PositiveIntegerField(_("max Capacity (Cubic meter)"), null=True)
    max_storage_temperature = models.FloatField(default=2, blank=True, null=True)
    min_storage_temperature = models.FloatField(default=-10, blank=True, null=True)
    def __str__(self):
        return self.name