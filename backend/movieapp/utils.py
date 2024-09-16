from celery import shared_task
from django.core.mail import send_mail
from django.conf import settings
from .models import OneTimePassword, User
import random
import requests
from rest_framework.pagination import PageNumberPagination
from django.utils.http import urlsafe_base64_encode
from django.utils.encoding import force_bytes
from django.urls import reverse

if settings.DEBUG:
    import logging

    logger = logging.getLogger(__name__)


@shared_task
def send_otp_email_task(user):
    try:
        user = User.objects.get(email=user)
    except User.DoesNotExist:
        logger.error(f"User with ID {user} does not exist.")
        return False

    otp = random.randint(100000, 999999)
    subject = "OTP for MovieApp"

    email_from = settings.DEFAULT_FROM_EMAIL

    uid = urlsafe_base64_encode(force_bytes(user.pk))
    otp_encoded = urlsafe_base64_encode(force_bytes(otp))

    verification_link = reverse("verify-OTP")
    full_link = (
        f"{settings.FRONTEND_URL}{verification_link}?uid={uid}&otp={otp_encoded}"
    )

    email_body = f"""
    Hello {user.first_name},

    Your OTP is {otp}. Please click the link below to verify:

    {full_link}

    Regards,
    Team MovieApp
    """
    OneTimePassword.objects.create(user=user, otp=otp)

    try:
        send_mail(subject, email_body, email_from, [user.email], fail_silently=False)
        logger.info(f"OTP email sent to {user.email}")
    except Exception as e:
        logger.error(
            f"Error sending OTP email to {user.email}: {str(e)}", exc_info=True
        )
        return False

    return True


def send_otp_email(email):
    try:
        user = User.objects.get(email=email)
        send_otp_email_task(user)
        logger.info(f"OTP email task for {email} has been queued.")
        return True
    except User.DoesNotExist:
        logger.error(f"User with email {email} does not exist.")
        return False


class MoviePagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = "page_size"
    max_page_size = 100


def fetch_movie_data(query):
    url = f"https://api.themoviedb.org/3/search/movie"
    params = {
        "api_key": settings.TMDB_API_KEY,
        "query": query,
        "language": "en-US",
        "page": 1,
        "include_adult": "false",
    }
    response = requests.get(url, params=params)
    if response.status_code == 200:
        return response.json()
    else:
        return {"error": "Failed to fetch data from TMDb"}


def fetch_top_movies(page):
    url = "https://api.themoviedb.org/3/discover/movie"
    params = {
        "include_adult": "false",
        "include_video": "false",
        "language": "en-US",
        "page": page,
        "sort_by": "popularity.desc",
    }

    headers = {
        "accept": "application/json",
        "Authorization": f"Bearer {settings.TMDB_ACCESS_TOKEN}",
    }

    response = requests.get(url, headers=headers, params=params)

    if response.status_code == 200:
        print(response.json())
        return response.json()
    else:
        print(response.json())
        return {"error": "Failed to fetch data from TMDb"}
