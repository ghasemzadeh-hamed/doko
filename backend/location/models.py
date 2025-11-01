from django.db import models
from .address import Address
from .location import Location

class Area(models.Model):
    name = models.CharField(max_length=100, null=True)
    number = models.IntegerField(max_length=100, null=True)
    Address = models.ForeignKey(Address, max_length=100, null=True, blank=True, on_delete=models.CASCADE)
    location = models.ForeignKey(Location, max_length=100, null=True, blank=True, on_delete=models.CASCADE)

    def __str__(self):
        return self.name

