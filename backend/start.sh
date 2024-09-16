#!/bin/bash

# Start Gunicorn
gunicorn backend.wsgi:application --bind 0.0.0.0:8000 &

# Start Celery
celery -A backend worker --loglevel=info &

# Wait for processes to finish
wait
