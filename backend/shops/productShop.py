from backend.location.address import Address
from backend.users.models import Seller
from django.db import models


class Store(models.Model):
    name = models.CharField(max_length=100)
    managers = models.ManyToManyField(Seller, related_name='managed_stores', blank=True, limit_choices_to={'is_store_manager': True})
    cashiers = models.ManyToManyField(Seller, related_name='cashiers_stores', blank=True, limit_choices_to={'is_cashier': True})
    apprentice = models.ManyToManyField(Seller, related_name='working_stores', blank=True, limit_choices_to={'is_apprentice': True})
    location = models.ForeignKey(Address, on_delete=models.CASCADE)
    online = models.BooleanField(default=True)

    def __str__(self):
        return self.name
