"""Project package initialisation.

The test environment used for these kata-style exercises does not ship with a
few optional third-party dependencies (``django-cors-headers``,
``django-extensions`` and ``distlib``).  Importing this package installs small
runtime stubs for them so Django can start up and the test-suite can execute.
In real deployments the actual packages should be installed; the stubs are only
used when the imports fail.
"""

from importlib import import_module
from typing import Callable, Dict

from .stubs import corsheaders as corsheaders_stub
from .stubs import django_extensions as django_extensions_stub
from .stubs import distlib as distlib_stub

Installer = Callable[[], None]


def _ensure_module(module: str, installer: Installer) -> None:
    try:
        import_module(module)
    except ModuleNotFoundError:
        installer()


_STUBS: Dict[str, Installer] = {
    "corsheaders": corsheaders_stub.install,
    "django_extensions": django_extensions_stub.install,
    "distlib": distlib_stub.install,
}

for module_name, installer in _STUBS.items():
    _ensure_module(module_name, installer)

__all__ = ["_STUBS"]
