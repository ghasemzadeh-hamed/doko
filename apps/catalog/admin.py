from django.contrib import admin

from .models import Category, PriceList, PriceListItem, Product

admin.site.register(Category)


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ("sku", "name", "category", "list_price", "cost_price", "is_active")
    search_fields = ("sku", "name")
    list_filter = ("category", "is_active")


admin.site.register(PriceList)


@admin.register(PriceListItem)
class PriceListItemAdmin(admin.ModelAdmin):
    list_display = ("pricelist", "product", "price")
    search_fields = ("pricelist__name", "product__sku", "product__name")
