from rest_framework import serializers

from apps.catalog.models import PriceList, Product
from apps.partners.models import Partner

from .models import SalesOrder, SalesOrderLine


class SalesOrderSerializer(serializers.ModelSerializer):
    customer = serializers.PrimaryKeyRelatedField(queryset=Partner.objects.all())
    pricelist = serializers.PrimaryKeyRelatedField(
        allow_null=True, required=False, queryset=PriceList.objects.all()
    )

    class Meta:
        model = SalesOrder
        fields = [
            "id",
            "number",
            "customer",
            "status",
            "pricelist",
            "total_amount",
            "created_at",
        ]
        read_only_fields = ("status", "total_amount", "created_at")


class SalesOrderLineSerializer(serializers.ModelSerializer):
    order = serializers.PrimaryKeyRelatedField(queryset=SalesOrder.objects.all())
    product = serializers.PrimaryKeyRelatedField(queryset=Product.objects.all())

    class Meta:
        model = SalesOrderLine
        fields = [
            "id",
            "order",
            "product",
            "qty",
            "price",
            "tax_amount",
            "subtotal",
            "created_at",
        ]
        read_only_fields = ("subtotal", "created_at")

    def create(self, validated_data):
        return SalesOrderLine.objects.create(**validated_data)
