from fastapi import Body


def order_created(payload: dict = Body(...)):
    # TODO: sync event to Agent or external bus
    return {"received": "order_created"}


def stock_low(payload: dict = Body(...)):
    return {"received": "stock_low"}
