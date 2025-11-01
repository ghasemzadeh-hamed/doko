from fastapi import APIRouter

from ..services.agent_hooks import quote
from ..services.webhooks import order_created, stock_low

api_router = APIRouter()
api_router.post("/agent/quote")(quote)
api_router.post("/hooks/order-created")(order_created)
api_router.post("/hooks/stock-low")(stock_low)
