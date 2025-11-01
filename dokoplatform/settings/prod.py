"""Production ready settings."""

from __future__ import annotations

import os
from django.core.exceptions import ImproperlyConfigured

from .base import *  # noqa: F401,F403

DEBUG = False
ALLOWED_HOSTS = _split_env_list(os.environ.get("DJANGO_ALLOWED_HOSTS"))
SECRET_KEY = os.environ.get("DJANGO_SECRET_KEY")

if not SECRET_KEY or SECRET_KEY == "insecure-development-key":
    raise ImproperlyConfigured("DJANGO_SECRET_KEY must be set for production deployments.")

if not ALLOWED_HOSTS:
    raise ImproperlyConfigured("DJANGO_ALLOWED_HOSTS must include at least one host in production.")

if DATABASES["default"]["ENGINE"] == "django.db.backends.sqlite3":
    raise ImproperlyConfigured("SQLite is not supported in production. Configure PostgreSQL settings.")

SESSION_COOKIE_SECURE = True
CSRF_COOKIE_SECURE = True
SECURE_BROWSER_XSS_FILTER = True
SECURE_CONTENT_TYPE_NOSNIFF = True
SECURE_PROXY_SSL_HEADER = ("HTTP_X_FORWARDED_PROTO", "https")

CORS_ALLOWED_ORIGINS = _split_env_list(os.environ.get("CORS_ALLOWED_ORIGINS"))
CORS_ALLOW_ALL_ORIGINS = False
