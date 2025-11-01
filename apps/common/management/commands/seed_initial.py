from django.core.management.base import BaseCommand

from apps.crm.models import Stage
from apps.inventory.models import Location, Warehouse


class Command(BaseCommand):
    help = "Seed initial data: locations & CRM stages"

    def handle(self, *args, **kwargs):
        wh, _ = Warehouse.objects.get_or_create(
            code="MAIN", defaults={"name": "Main Warehouse"}
        )
        for name, usage in [
            ("Internal", "internal"),
            ("Customer", "customer"),
            ("Supplier", "supplier"),
        ]:
            Location.objects.get_or_create(
                warehouse=wh, name=name, defaults={"usage": usage}
            )
        for seq, name in enumerate(
            ["New", "Qualified", "Quoted", "Won", "Lost"], start=1
        ):
            Stage.objects.get_or_create(name=name, defaults={"sequence": seq})
        self.stdout.write(self.style.SUCCESS("Seed complete"))
