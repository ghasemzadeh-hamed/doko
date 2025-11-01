import os
import pathlib
import sys

ROOT_DIR = pathlib.Path(__file__).resolve().parents[3]
if str(ROOT_DIR) not in sys.path:
    sys.path.insert(0, str(ROOT_DIR))

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "backend.settings.dev")

import django

django.setup()

from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APIClient

from apps.catalog.models import Product
from apps.inventory.models import Location, Warehouse
from apps.partners.models import Partner


class SalesOrderFlowTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        warehouse = Warehouse.objects.create(code="MAIN", name="Main")
        Location.objects.create(warehouse=warehouse, name="Internal", usage="internal")
        Location.objects.create(warehouse=warehouse, name="Customer", usage="customer")
        Location.objects.create(warehouse=warehouse, name="Supplier", usage="supplier")
        self.product = Product.objects.create(sku="SKU1", name="Test", list_price=100)
        self.customer = Partner.objects.create(name="ACME", partner_type="customer")

    def test_sales_order_confirm_moves_stock(self):
        response = self.client.post(
            reverse("salesorder-list"),
            {"number": "SO-1", "customer": str(self.customer.id)},
            format="json",
        )
        self.assertEqual(response.status_code, 201)
        order_id = response.data["id"]

        line_response = self.client.post(
            reverse("salesorderline-list"),
            {
                "order": order_id,
                "product": str(self.product.id),
                "qty": "2",
                "price": "100",
            },
            format="json",
        )
        self.assertEqual(line_response.status_code, 201)

        confirm_response = self.client.post(
            reverse("salesorder-confirm", args=[order_id])
        )
        self.assertEqual(confirm_response.status_code, 200)
        self.assertEqual(confirm_response.data["status"], "confirmed")
