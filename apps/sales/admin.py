from django.contrib import admin

from .models import SalesOrder, SalesOrderLine


@admin.register(SalesOrder)
class SalesOrderAdmin(admin.ModelAdmin):
    list_display = ("number", "customer", "status", "total_amount", "created_at")
    list_filter = ("status", "customer")
    search_fields = ("number", "customer__name")


@admin.register(SalesOrderLine)
class SalesOrderLineAdmin(admin.ModelAdmin):
    list_display = ("order", "product", "qty", "price", "subtotal")
    search_fields = ("order__number", "product__sku", "product__name")
    list_filter = ("order__status",)
