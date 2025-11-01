from pathlib import Path

from django.apps import AppConfig


class CorsHeadersConfig(AppConfig):
    """Minimal app config mimicking ``django-cors-headers``."""

    name = "corsheaders"
    verbose_name = "CORS Headers"
    path = str(Path(__file__).resolve().parent)
