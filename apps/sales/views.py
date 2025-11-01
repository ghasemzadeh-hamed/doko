from rest_framework import status, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from .models import SalesOrder, SalesOrderLine
from .serializers import SalesOrderLineSerializer, SalesOrderSerializer


class SalesOrderViewSet(viewsets.ModelViewSet):
    queryset = SalesOrder.objects.all().order_by("-created_at")
    serializer_class = SalesOrderSerializer

    @action(detail=True, methods=["post"])
    def confirm(self, request, pk=None):
        order = self.get_object()
        order.confirm()
        serializer = self.get_serializer(order)
        return Response(serializer.data, status=status.HTTP_200_OK)


class SalesOrderLineViewSet(viewsets.ModelViewSet):
    queryset = SalesOrderLine.objects.all().select_related("order", "product")
    serializer_class = SalesOrderLineSerializer
