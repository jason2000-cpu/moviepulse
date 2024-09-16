from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.http import HttpResponseRedirect
from drf_spectacular.views import (
    SpectacularAPIView,
    SpectacularRedocView,
    SpectacularSwaggerView,
)


def redirect_to_test(request):
    return HttpResponseRedirect("api/schema/swagger-ui/")


urlpatterns = [
    path("api/", include("movieapp.urls")),
    path("admin/", admin.site.urls),
    path("", redirect_to_test),
    # OPENAPI
    path("api/schema/", SpectacularAPIView.as_view(), name="schema"),
    # Optional UI:
    path(
        "api/schema/swagger-ui/",
        SpectacularSwaggerView.as_view(url_name="schema"),
        name="swagger-ui",
    ),
    path(
        "api/schema/redoc/",
        SpectacularRedocView.as_view(url_name="schema"),
        name="redoc",
    ),
]


if settings.DEBUG:
    import debug_toolbar

    urlpatterns = [
        path("__debug__/", include(debug_toolbar.urls)),
    ] + urlpatterns
