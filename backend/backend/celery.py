from __future__ import absolute_import, unicode_literals
import os
from celery import Celery
from os import getenv
from dotenv import load_dotenv

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "backend.settings")

app = Celery("backend")


app.config_from_object("django.conf:settings", namespace="CELERY")


app.autodiscover_tasks()
app.conf.update(
    BROKER_URL=os.getenv("REDDIS_SERVER"),
    RESULT_BACKEND=os.getenv("REDDIS_SERVER"),
    BROKER_USE_SSL={"ssl_cert_reqs": "required"},
    RESULT_BACKEND_USE_SSL={"ssl_cert_reqs": "required"},
    BROKER_CONNECTION_RETRY_ON_STARTUP=True,
)
