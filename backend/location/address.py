from django.db import models

ADDRESS_CHOICES = (
    ('S', 'Store'),
    ('C', 'Customer'),
    ('P', 'ServiceProvider'),
    ('S', 'Warehouse'),
    ('S', 'Shipping'),
    ('S', 'Shipping'),
)
class Address(models.Model):
    country = models.CharField(max_length=100)
    province = models.CharField(max_length=100)
    city = models.CharField(max_length=100)
    latitude = models.FloatField(null=True, blank=True)
    longitude = models.FloatField(null=True, blank=True)
    street = models.CharField(max_length=100)
    alley = models.CharField(max_length=100, null=True, blank=True)
    plaque = models.CharField(max_length=10, null=True, blank=True)
    default = models.BooleanField(default=False)
    def __str__(self):
        return self.street

