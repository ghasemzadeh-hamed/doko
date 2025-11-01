"""FastAPI application that reuses the existing Django models and serializers.

The legacy Django Rest Framework viewsets already contain all the model and
serializer wiring we need to offer CRUD endpoints.  Instead of maintaining a
second copy of that logic we dynamically read the router configuration from
``backend.urls`` and expose equivalent FastAPI routes.

Running the server::

    uvicorn fastapi_app.main:app --reload

The resulting API mirrors the structure of the previous DRF router (with the
exception of duplicate prefixes, which gain a ``-<basename>`` suffix so the
routes stay unique).
"""

from __future__ import annotations

import os
from collections import defaultdict
from typing import Any, Dict, List

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "dokoplatform.settings.dev")

import django

django.setup()

from django.core.exceptions import ObjectDoesNotExist, ValidationError as DjangoValidationError
from django.db import IntegrityError
from fastapi import APIRouter, FastAPI, HTTPException, Response
from rest_framework.exceptions import ErrorDetail, ValidationError as DRFValidationError

from backend.urls import router as drf_router

app = FastAPI(title="Doko Platform API", version="1.0.0")

_registered_resources: List[Dict[str, str]] = []


def _normalise_errors(detail: Any) -> Any:
    """Convert DRF error details to FastAPI friendly structures."""

    if isinstance(detail, dict):
        return {key: _normalise_errors(value) for key, value in detail.items()}
    if isinstance(detail, list):
        return [_normalise_errors(item) for item in detail]
    if isinstance(detail, ErrorDetail):
        return str(detail)
    return detail


def _build_crud_router(prefix: str, viewset_cls: Any, tag: str) -> APIRouter:
    """Create a CRUD router for the supplied DRF viewset."""

    model = viewset_cls.queryset.model
    serializer_class = viewset_cls.serializer_class
    pk_field = model._meta.pk

    router = APIRouter(prefix=prefix, tags=[tag])

    def _parse_pk(raw_pk: str):
        try:
            return pk_field.to_python(raw_pk)
        except (DjangoValidationError, TypeError, ValueError):
            raise HTTPException(status_code=422, detail="Invalid identifier") from None

    def _serialize(instance: Any) -> Dict[str, Any]:
        serializer = serializer_class(instance, context={"request": None})
        return dict(serializer.data)

    def _serialize_many(queryset: Any) -> List[Dict[str, Any]]:
        serializer = serializer_class(queryset, many=True, context={"request": None})
        return list(serializer.data)

    @router.get("/", name=f"{tag}-list")
    def list_items() -> List[Dict[str, Any]]:
        queryset = model.objects.all()
        return _serialize_many(queryset)

    @router.get("/{item_id}", name=f"{tag}-detail")
    def retrieve_item(item_id: str) -> Dict[str, Any]:
        pk_value = _parse_pk(item_id)
        try:
            instance = model.objects.get(pk=pk_value)
        except ObjectDoesNotExist as exc:  # pragma: no cover - defensive guard
            raise HTTPException(status_code=404, detail="Item not found") from exc
        return _serialize(instance)

    @router.post("/", status_code=201, name=f"{tag}-create")
    def create_item(payload: Dict[str, Any]) -> Dict[str, Any]:
        serializer = serializer_class(data=payload, context={"request": None})
        try:
            serializer.is_valid(raise_exception=True)
            instance = serializer.save()
        except DRFValidationError as exc:
            raise HTTPException(status_code=422, detail=_normalise_errors(exc.detail)) from exc
        except IntegrityError as exc:
            raise HTTPException(status_code=400, detail=str(exc)) from exc
        return _serialize(instance)

    @router.put("/{item_id}", name=f"{tag}-update")
    def update_item(item_id: str, payload: Dict[str, Any]) -> Dict[str, Any]:
        pk_value = _parse_pk(item_id)
        try:
            instance = model.objects.get(pk=pk_value)
        except ObjectDoesNotExist as exc:
            raise HTTPException(status_code=404, detail="Item not found") from exc
        serializer = serializer_class(instance, data=payload, context={"request": None})
        try:
            serializer.is_valid(raise_exception=True)
            instance = serializer.save()
        except DRFValidationError as exc:
            raise HTTPException(status_code=422, detail=_normalise_errors(exc.detail)) from exc
        except IntegrityError as exc:
            raise HTTPException(status_code=400, detail=str(exc)) from exc
        return _serialize(instance)

    @router.patch("/{item_id}", name=f"{tag}-partial-update")
    def partial_update_item(item_id: str, payload: Dict[str, Any]) -> Dict[str, Any]:
        pk_value = _parse_pk(item_id)
        try:
            instance = model.objects.get(pk=pk_value)
        except ObjectDoesNotExist as exc:
            raise HTTPException(status_code=404, detail="Item not found") from exc
        serializer = serializer_class(
            instance, data=payload, partial=True, context={"request": None}
        )
        try:
            serializer.is_valid(raise_exception=True)
            instance = serializer.save()
        except DRFValidationError as exc:
            raise HTTPException(status_code=422, detail=_normalise_errors(exc.detail)) from exc
        except IntegrityError as exc:
            raise HTTPException(status_code=400, detail=str(exc)) from exc
        return _serialize(instance)

    @router.delete("/{item_id}", status_code=204, name=f"{tag}-delete")
    def delete_item(item_id: str) -> Response:
        pk_value = _parse_pk(item_id)
        try:
            instance = model.objects.get(pk=pk_value)
        except ObjectDoesNotExist as exc:
            raise HTTPException(status_code=404, detail="Item not found") from exc
        instance.delete()
        return Response(status_code=204)

    return router


_prefix_usage: Dict[str, int] = defaultdict(int)

for prefix, viewset_cls, basename in drf_router.registry:
    normalised_prefix = f"/{prefix.strip('/')}" if prefix else ""
    usage_index = _prefix_usage[prefix]
    _prefix_usage[prefix] += 1

    if usage_index:
        suffix = basename or str(usage_index + 1)
        fastapi_prefix = f"{normalised_prefix}-{suffix}"
        tag = f"{prefix}-{suffix}"
    else:
        fastapi_prefix = normalised_prefix or "/"
        tag = basename or prefix or "resource"

    router = _build_crud_router(fastapi_prefix, viewset_cls, tag)
    app.include_router(router)

    model_name = viewset_cls.queryset.model.__name__
    serializer_name = viewset_cls.serializer_class.__name__
    _registered_resources.append(
        {
            "path": fastapi_prefix or "/",
            "viewset": viewset_cls.__name__,
            "model": model_name,
            "serializer": serializer_name,
        }
    )


@app.get("/", tags=["meta"], name="root")
def list_resources() -> Dict[str, Any]:
    """Return the list of available auto-generated resources."""

    return {"resources": _registered_resources}

