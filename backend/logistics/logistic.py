from django.db import models
from backend.products.product import Product
from backend.price.productprice import ProductPrice
from backend.shops.productShop import Store
from backend.shops.warehouse import Warehouse
from djmoney.models.fields import MoneyField


class Shipment(models.Model):
    supplier_from = models.CharField(max_length=255, verbose_name="Supplier From")
    supplier_to = models.CharField(max_length=255, verbose_name="Supplier To")
    typeCar = models.CharField(max_length=255)
    transportation_fee = MoneyField(max_digits=13 ,decimal_places=2, default_currency='IRR', null=True)
    arrival_date = models.DateField()
    departure_date = models.DateField()
    input = models.BooleanField()
    out = models.BooleanField()
    last_updated = models.DateTimeField(auto_now=True)
    def __str__(self):
        return f"{self.pk} - {self.typeCar} - {self.input} - {self.out}"

class Inventory(models.Model):
    to_store = models.ForeignKey(Store, on_delete=models.CASCADE)
    shipment = models.ForeignKey(Shipment, on_delete=models.CASCADE)

    products = models.ForeignKey(ProductPrice, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField()
#    last_updated = models.DateTimeField(auto_now=True)
    input = models.BooleanField()
    out = models.BooleanField()

    def __str__(self):
        return f"{self.pk} - {self.to_store.name} - {self.quantity}"


# Model for store items
class StoreItem(models.Model):
    name = models.CharField(max_length=255)
    code = models.IntegerField()
    quantity = models.IntegerField()
    location = models.ForeignKey(Store, null=True, on_delete=models.CASCADE)
    price = models.DecimalField(max_digits=10, decimal_places=2)

    # Function to add an item to the store
    def add_item_to_store(item_name,code, quantity,store, price):
        new_item = StoreItem(name=item_name, code=code , quantity=quantity,location=store, price=price)
        new_item.save()






