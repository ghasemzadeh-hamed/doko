from django.db import models
from django.utils.text import slugify
from backend.shops.productShop import Store
from backend.models import *


class ProductMedia(models.Model):
    id=models.AutoField(primary_key=True)
    media_type_choice=((1,"Image"),(2,"Video"))
    media_type=models.CharField(max_length=255, choices=media_type_choice)
    media_content=models.FileField(upload_to="static/media/products", null=True, blank=True)
    created_at=models.DateTimeField(auto_now_add=True)
    is_active= models.BooleanField(default=True)

class ProductDetailName(models.Model):
    subject_name = models.CharField(max_length=255, verbose_name="Name", unique=True)
    info = models.CharField(max_length=255, verbose_name="desc")
    def __str__(self):
        return f"{self.subject_name}-"
class ProductDetail(models.Model):
    subject = models.ForeignKey(ProductDetailName, on_delete=models.CASCADE, null=True, blank=True)
    info = models.CharField(max_length=255, verbose_name="product_info")
    def __str__(self):
        return f"{self.subject}-{self.info}"

class Product(models.Model):
    unique_code = models.CharField(max_length=100, unique=True)
    name = models.CharField(max_length=255)
    media = models.ForeignKey(ProductMedia, on_delete=models.CASCADE, null=True, blank=True)
    category = models.CharField(max_length=50, blank=True, null=True)
    barcode = models.CharField(max_length=50, unique=True)
    tags = models.ManyToManyField(Tag)
    max_c = models.IntegerField(null=True)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.name



class Service(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()

class Product_Unit(Unit):

    STATUS_CHOICES = [
        ('taki', 'Taki'),
        ('jin', 'jin'),
        ('karton', 'karton'),
    ]
    store = models.ForeignKey(Store, null=True, on_delete=models.SET_NULL)
    product = models.ForeignKey(Product,  null=True, on_delete=models.SET_NULL)
    status = models.CharField(max_length=200, null=True, choices=STATUS_CHOICES)
    quantity = models.PositiveIntegerField()
    date_created = models.DateTimeField(auto_now_add=True, null=True)
    def __str__(self):
        return f"{self.status}-{self.quantity}"