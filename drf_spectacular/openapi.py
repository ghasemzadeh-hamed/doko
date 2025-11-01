from rest_framework.schemas.inspectors import ViewInspector


class AutoSchema(ViewInspector):  # pragma: no cover - placeholder
    def get_schema(self, *args, **kwargs):
        return {}
