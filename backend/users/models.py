# models.py
from django.db import models
from backend.models import *


class Customer(CustomUser):
    CUSTOMER_TYPES = [
        ('local', 'Local Customer'),
        ('vip', 'VIP Customer'),
        ('regular', 'Regular Customer'),
    ]
    customer_type = models.CharField(
        max_length=10,
        choices=CUSTOMER_TYPES,
        default='regular',
    )

    location = models.ForeignKey(Address, on_delete=models.CASCADE, null=True,blank=True)
    empty_location = models.ForeignKey(Location, on_delete=models.CASCADE, null=True,blank=True)



class Seller(CustomUser):
    is_store_manager = models.BooleanField(default=False)
    is_cashier = models.BooleanField(default=False) #sandooqdar
    is_apprentice = models.BooleanField(default=False) #shagerd


class Courier(CustomUser):
    # مشخص کننده آنلاین یا آفلاین بودن پیک
    is_online = models.BooleanField(default=False)

    # موقعیت مکانی پیک
    location = models.ForeignKey(Location, on_delete=models.SET_NULL, null=True)

    def __str__(self):
        return self.phone_number


class Manager(CustomUser):
    is_super_manager = models.BooleanField(default=False)
    is_technical_manager = models.BooleanField(default=False)
    is_support_manager = models.BooleanField(default=False)


class Organization(CustomUser):
    name =models.CharField(max_length=200, null=True)
    location = models.ForeignKey(Address, on_delete=models.CASCADE, null=True,blank=True)
    employees = models.ManyToManyField(CustomUser, related_name='employees')

    def __str__(self):
        return self.name

class Teams(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    teams = models.ManyToManyField(CustomUser, related_name="teams")
    created_on = models.DateTimeField( auto_now_add=True)
    def __str__(self):
        return f"{self.name}"