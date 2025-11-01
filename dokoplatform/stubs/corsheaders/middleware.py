from django.utils.deprecation import MiddlewareMixin


class CorsMiddleware(MiddlewareMixin):
    """No-op replacement for the real CORS middleware.

    The genuine ``django-cors-headers`` package augments responses with CORS
    headers.  For our test environment we only need the middleware hook to be
    importable, so the implementation simply returns the original response.
    """

    def process_response(self, request, response):
        return response
