from decimal import Decimal

from apps.catalog.models import PriceList, PriceListItem


def resolve_price(
    product,
    partner=None,
    channel=None,
    date=None,
    pricelist: PriceList | None = None,
) -> Decimal:
    # TODO: implement channel/date rules
    if pricelist:
        item = PriceListItem.objects.filter(
            pricelist=pricelist, product=product
        ).first()
        if item:
            return item.price
    # fallback to product.list_price
    return product.list_price
