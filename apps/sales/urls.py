from rest_framework.routers import DefaultRouter

from .views import SalesOrderLineViewSet, SalesOrderViewSet

router = DefaultRouter()
router.register("sales-orders", SalesOrderViewSet)
router.register("sales-lines", SalesOrderLineViewSet)

urlpatterns = router.urls
