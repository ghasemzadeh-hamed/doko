"""Helpers for installing a lightweight ``corsheaders`` stub."""

from pathlib import Path
from types import ModuleType
import sys

from . import apps, middleware


def install() -> None:
    """Register the stub modules in :data:`sys.modules`.

    Django imports ``corsheaders`` both as an installed app and for the
    middleware path.  We provide a minimal, no-op implementation that satisfies
    those imports so the project can run inside the constrained execution
    environment used for the kata.
    """

    module = ModuleType("corsheaders")
    module.__dict__.update(
        {
            "__doc__": "Lightweight stub for django-cors-headers.",
            "__file__": __file__,
            "__path__": [str(Path(__file__).resolve().parent)],
            "__all__": ["__version__", "apps", "middleware"],
            "__version__": "0.0.dev0",
            "apps": apps,
            "middleware": middleware,
        }
    )

    sys.modules.setdefault("corsheaders", module)
    sys.modules.setdefault("corsheaders.apps", apps)
    sys.modules.setdefault("corsheaders.middleware", middleware)
