from django.contrib import admin

from .models import Location, ProductStock, StockMove, Warehouse

admin.site.register(Warehouse)
admin.site.register(Location)


@admin.register(ProductStock)
class ProductStockAdmin(admin.ModelAdmin):
    list_display = ("product", "location", "quantity")
    search_fields = ("product__sku", "product__name", "location__name")


@admin.register(StockMove)
class StockMoveAdmin(admin.ModelAdmin):
    list_display = (
        "product",
        "qty",
        "source",
        "destination",
        "state",
        "reference",
        "created_at",
    )
    list_filter = ("state",)
    search_fields = ("product__sku", "reference")
