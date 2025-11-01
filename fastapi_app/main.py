from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .api.v1.routes import api_router
from .core.settings import settings

app = FastAPI(title="Doko FastAPI")
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(api_router, prefix="/v1")


@app.get("/healthz")
def healthz():
    return {"ok": True}
