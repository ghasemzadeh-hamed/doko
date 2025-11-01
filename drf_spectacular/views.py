from django.http import JsonResponse
from django.views import View


class SpectacularAPIView(View):
    permission_classes: list = []

    def get(self, request, *args, **kwargs):
        return JsonResponse(
            {
                "openapi": "3.0.0",
                "info": {"title": "Doko API", "version": "0.1.0"},
                "paths": {},
            }
        )


class SpectacularSwaggerView(View):
    permission_classes: list = []
    url_name: str = "schema"

    def get(self, request, *args, **kwargs):
        return JsonResponse(
            {
                "docs": request.build_absolute_uri(),
                "schema_url_name": self.url_name,
            }
        )
