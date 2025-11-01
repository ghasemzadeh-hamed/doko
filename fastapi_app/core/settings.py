import os


class Settings:
    CORS = os.getenv("CORS_ORIGINS", "http://localhost:3000").split(",")
    DJANGO_BASE = os.getenv("UPSTREAM_DJANGO_BASE_URL", "http://127.0.0.1:8000")


settings = Settings()
