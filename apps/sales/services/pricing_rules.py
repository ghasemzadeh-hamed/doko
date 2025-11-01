from decimal import Decimal

from apps.catalog.services.pricing import resolve_price


def price_line(line, pricelist=None, taxes=None, discounts=None) -> dict:
    base = resolve_price(line.product, pricelist=pricelist)
    price = base
    # TODO discounts (% or amount)
    tax_amount = Decimal("0.00")
    # TODO taxes rules
    subtotal = (price * line.qty) + tax_amount
    return {"price": price, "tax_amount": tax_amount, "subtotal": subtotal}
