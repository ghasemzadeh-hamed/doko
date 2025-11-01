from django.contrib import admin

from .models import Address, Partner


@admin.register(Partner)
class PartnerAdmin(admin.ModelAdmin):
    list_display = (
        "name",
        "partner_type",
        "email",
        "phone",
        "is_active",
        "created_at",
    )
    list_filter = ("partner_type", "is_active")
    search_fields = ("name", "email", "phone", "tax_id")


@admin.register(Address)
class AddressAdmin(admin.ModelAdmin):
    list_display = ("partner", "line1", "city", "country", "is_default")
    list_filter = ("country", "is_default")
    search_fields = ("line1", "city", "postal_code")
