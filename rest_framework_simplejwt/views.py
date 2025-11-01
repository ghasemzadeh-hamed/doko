import uuid

from django.http import JsonResponse
from django.views import View


class TokenObtainPairView(View):
    permission_classes: list = []

    def post(self, request, *args, **kwargs):
        token = uuid.uuid4().hex
        data = {"access": token, "refresh": uuid.uuid4().hex}
        return JsonResponse(data)


class TokenRefreshView(View):
    permission_classes: list = []

    def post(self, request, *args, **kwargs):
        return JsonResponse({"access": uuid.uuid4().hex})
