from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.http import HttpResponseRedirect


def redirect_to_test(request):
    return HttpResponseRedirect("/api/test/")


urlpatterns = [
    path("api/", include("movieapp.urls")),
    path("admin/", admin.site.urls),
    path("", redirect_to_test),
]
if settings.DEBUG:
    import debug_toolbar

    urlpatterns = [
        path("__debug__/", include(debug_toolbar.urls)),
    ] + urlpatterns
