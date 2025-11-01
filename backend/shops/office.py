from backend.location.address import Address
from backend.users.models import Seller
from django.db import models


class Office(models.Model):
    name = models.CharField(max_length=100)
    managers = models.ManyToManyField(Seller, related_name='managed_office', blank=True)
    location = models.ForeignKey(Address, on_delete=models.CASCADE)
    online = models.BooleanField(default=True)

    def __str__(self):
        return self.name
