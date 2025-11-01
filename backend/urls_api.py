from django.urls import include, path

urlpatterns = [
    path("common/", include("apps.common.urls")),
    path("partners/", include("apps.partners.urls")),
    path("catalog/", include("apps.catalog.urls")),
    path("inventory/", include("apps.inventory.urls")),
    path("sales/", include("apps.sales.urls")),
    path("purchase/", include("apps.purchase.urls")),
    path("crm/", include("apps.crm.urls")),
    path("helpdesk/", include("apps.helpdesk.urls")),
]
