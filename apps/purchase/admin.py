from django.contrib import admin

from .models import PurchaseOrder, PurchaseOrderLine


@admin.register(PurchaseOrder)
class PurchaseOrderAdmin(admin.ModelAdmin):
    list_display = ("number", "vendor", "status", "total_amount", "created_at")
    list_filter = ("status", "vendor")
    search_fields = ("number", "vendor__name")


@admin.register(PurchaseOrderLine)
class PurchaseOrderLineAdmin(admin.ModelAdmin):
    list_display = ("order", "product", "qty", "price", "subtotal")
    search_fields = ("order__number", "product__sku", "product__name")
    list_filter = ("order__status",)
