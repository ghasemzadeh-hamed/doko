from backend.location.address import Address
from backend.location.location import Location
from backend.models import CustomUser
from django.db import models
from django_currentuser.db.models import CurrentUserField
from backend.products.product import Product
from django.utils.translation import gettext_lazy as _
from djmoney.forms import MoneyField


class Order(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('out for delivery', 'Out for delivery'),
        ('delivered', 'Delivered'),
    ]
    PAYMENT_STATUS_CHOICES = [
        ("NI", "Not Initiated"),
        ("FL", "Failed"),
        ("PD", "Paid"),
    ]

#    assigned_to = CurrentUserField()
    title = models.CharField(_("Invoice Title"), max_length=50)
    number = models.IntegerField(_("Invoice Number"), auto_created=True, max_length=50)
    status = models.CharField(max_length=200, null=True, default='pending', choices=STATUS_CHOICES)
    payment_status = models.CharField(max_length=2, choices=PAYMENT_STATUS_CHOICES, default="NI")
    paid_price = MoneyField(max_digits=13 ,decimal_places=2, default_currency='IRR')
    remaining_amount = MoneyField(max_digits=13 ,decimal_places=2, default_currency='IRR')
    settlement_amount = MoneyField( max_digits=12, decimal_places=2)
    date_created = models.DateTimeField(auto_now_add=True, null=True)
    time_avalibale = models.DateTimeField( null=True)
    def __str__(self):
       # products_str = ", ".join([item.product_price.product.name for item in self.order_items.all()])
        return f"{self.number} - {self.status}"
