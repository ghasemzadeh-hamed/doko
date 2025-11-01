from django.contrib import admin

from .models import Lead, Stage


@admin.register(Stage)
class StageAdmin(admin.ModelAdmin):
    list_display = ("name", "sequence", "created_at")
    search_fields = ("name",)
    list_filter = ("sequence",)


@admin.register(Lead)
class LeadAdmin(admin.ModelAdmin):
    list_display = ("name", "stage", "expected_value", "probability", "created_at")
    search_fields = ("name", "email", "phone")
    list_filter = ("stage",)
