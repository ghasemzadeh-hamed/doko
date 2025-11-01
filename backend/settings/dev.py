from pathlib import Path

from .base import *  # noqa

DEBUG = True
REST_FRAMEWORK["DEFAULT_PERMISSION_CLASSES"] = ["rest_framework.permissions.AllowAny"]

DATABASES["default"] = {
    "ENGINE": "django.db.backends.sqlite3",
    "NAME": str(Path(BASE_DIR) / "db.sqlite3"),
}
