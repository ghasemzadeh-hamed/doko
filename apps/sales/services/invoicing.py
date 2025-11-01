# Skeleton for future: create AR invoice from SalesOrder


def create_invoice_from_so(order):
    # TODO: persist invoice models when accounting app exists
    return {"order": str(order.id), "total": order.total_amount}
