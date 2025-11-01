"""ASGI configuration exposing the FastAPI application for the platform."""

import os

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "dokoplatform.settings.prod")

from fastapi_app import app as application  # noqa: E402  (imports after Django config)

