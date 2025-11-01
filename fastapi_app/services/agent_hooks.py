from fastapi import Body


def quote(payload: dict = Body(...)):
    # TODO: call Django API for pricing/availability
    return {"ok": True, "quote": {"items": payload.get("items", [])}}
