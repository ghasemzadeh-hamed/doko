from decimal import Decimal

from apps.inventory.models import Location, ProductStock


def compute_reorder_suggestions(
    internal_location: Location,
    safety_stock=Decimal("5"),
    min_qty=Decimal("10"),
):
    # naive suggestion: if quantity < safety_stock -> propose (min_qty - quantity) or min_qty
    suggestions = []
    for q in ProductStock.objects.filter(location=internal_location):
        if q.quantity < safety_stock:
            need = max(min_qty - q.quantity, Decimal("0"))
            suggestions.append({"product": q.product.id, "suggested_qty": need})
    return suggestions
