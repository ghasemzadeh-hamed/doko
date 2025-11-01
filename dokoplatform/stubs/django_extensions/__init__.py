"""Helpers for installing a bare ``django_extensions`` stub."""

from pathlib import Path
from types import ModuleType
import sys


def install() -> None:
    """Register a minimal ``django_extensions`` module."""

    module = ModuleType("django_extensions")
    module.__dict__.update(
        {
            "__doc__": "Lightweight stub for django-extensions.",
            "__file__": __file__,
            "__path__": [str(Path(__file__).resolve().parent)],
            "__all__": [],
        }
    )
    sys.modules.setdefault("django_extensions", module)
