"""Helpers for installing a partial ``distlib`` implementation."""

from pathlib import Path
from types import ModuleType
import sys

from . import util


def install() -> None:
    """Expose ``distlib`` modules that provide :class:`cached_property`."""

    module = ModuleType("distlib")
    module.__dict__.update(
        {
            "__doc__": "Lightweight stub for distlib.",
            "__file__": __file__,
            "__path__": [str(Path(__file__).resolve().parent)],
            "__all__": ["util"],
            "util": util,
        }
    )

    sys.modules.setdefault("distlib", module)
    sys.modules.setdefault("distlib.util", util)
