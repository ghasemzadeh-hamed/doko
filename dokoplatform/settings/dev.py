"""Development settings for local work."""

from __future__ import annotations

import os

from .base import *  # noqa: F401,F403

DEBUG = os.environ.get("DJANGO_DEBUG", "True").lower() in {"1", "true", "yes", "on"}
SECRET_KEY = os.environ.get("DJANGO_SECRET_KEY", "insecure-development-key")
ALLOWED_HOSTS = _split_env_list(
    os.environ.get("DJANGO_ALLOWED_HOSTS", "localhost,127.0.0.1")
)

if DATABASES["default"]["ENGINE"] == "django.db.backends.postgresql":
    if not os.environ.get("POSTGRES_DB") and not os.environ.get("DJANGO_DB_NAME"):
        DATABASES["default"] = {
            "ENGINE": "django.db.backends.sqlite3",
            "NAME": str(BASE_DIR / "db.sqlite3"),
        }

CORS_ALLOW_ALL_ORIGINS = True
