from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import UserSerializer
from rest_framework.generics import GenericAPIView
from rest_framework import status
from .utils import send_otp_email, fetch_movie_data, MoviePagination, fetch_top_movies
from .models import User, OneTimePassword
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from django.core.cache import cache
from django.core.exceptions import ValidationError


@api_view(["GET"])
def hello_world(request):
    return Response({"message": "Hello, world!"}, status=status.HTTP_200_OK)


class UserCreateView(GenericAPIView):
    serializer_class = UserSerializer

    def post(self, request):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            try:
                user = serializer.save()
                if not send_otp_email(email=user.email):
                    raise ValidationError("Failed to send OTP email")
                return Response(
                    {
                        "data": serializer.data,
                        "message": "User created successfully and OTP sent",
                    },
                    status=status.HTTP_201_CREATED,
                )
            except ValidationError as e:
                return Response(
                    {"message": str(e)},
                    status=status.HTTP_500_INTERNAL_SERVER_ERROR,
                )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class VerifyOTPView(APIView):
    """
    This view handles the OTP verification process.
    """

    def post(self, request):
        email = request.data.get("email")
        otp = request.data.get("otp")

        if not email or not otp:
            return Response(
                {"error": "Email and OTP are required"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            return Response(
                {"error": "User with this email does not exist"},
                status=status.HTTP_404_NOT_FOUND,
            )

        try:
            otp_obj = OneTimePassword.objects.get(user=user, otp=otp)
        except OneTimePassword.DoesNotExist:
            return Response(
                {"error": "Invalid OTP"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        otp_obj.delete()

        user.otp_verified = True
        user.save()

        return Response(
            {"message": "OTP verified successfully"},
            status=status.HTTP_200_OK,
        )


class LoginView(APIView):
    def post(self, request):
        email = request.data.get("email")
        password = request.data.get("password")

        if not email or not password:
            return Response(
                {"error": "Email and password are required"},
                status=status.HTTP_400_BAD_REQUEST,
            )
        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            return Response(
                {"error": "User with this email does not exist"},
                status=status.HTTP_404_NOT_FOUND,
            )

        if not user.check_password(password):
            return Response(
                {"error": "Invalid password"},
                status=status.HTTP_401_UNAUTHORIZED,
            )

        user = authenticate(request, email=email, password=password)
        if user is None:
            return Response(
                {"error": "Invalid email or password"},
                status=status.HTTP_401_UNAUTHORIZED,
            )

        try:
            otp_record = OneTimePassword.objects.get(user=user)
            if not otp_record.verified:
                verification_message = "Please verify your OTP."
            else:
                verification_message = None
        except OneTimePassword.DoesNotExist:
            verification_message = None

        refresh = RefreshToken.for_user(user)
        access_token = str(refresh.access_token)

        response_data = {
            "refresh": str(refresh),
            "access": access_token,
        }

        if verification_message:
            response_data["message"] = verification_message

        return Response(response_data, status=status.HTTP_200_OK)


class SearchMoviesView(APIView):
    MAX_REQUESTS = 2
    TIME_WINDOW = 60 * 60

    def get(self, request):
        ip_address = self.get_client_ip(request)
        cache_key = f"search_requests_{ip_address}"
        cached_movies_key = f"cached_movies_{ip_address}"

        request_count = cache.get(cache_key, 0)

        cached_movies = cache.get(cached_movies_key, None)

        if request_count >= self.MAX_REQUESTS:
            return Response(
                {
                    "error": "Rate limit exceeded. Create an account to proceed, currently showing previous searches",
                    "cached_movies": cached_movies if cached_movies else [],
                },
                status=status.HTTP_429_TOO_MANY_REQUESTS,
            )

        query = request.GET.get("query")
        if not query:
            return Response(
                {"error": "Query parameter is required"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        movie_data = fetch_movie_data(query)

        if "error" in movie_data:
            return Response(
                {"error": movie_data["error"]},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )

        cache.set(cache_key, request_count + 1, timeout=self.TIME_WINDOW)

        cache.set(cached_movies_key, movie_data, timeout=self.TIME_WINDOW)

        return Response(movie_data, status=status.HTTP_200_OK)

    def get_client_ip(self, request):
        x_forwarded_for = request.META.get("HTTP_X_FORWARDED_FOR")
        if x_forwarded_for:
            ip = x_forwarded_for.split(",")[0]
        else:
            ip = request.META.get("REMOTE_ADDR")
        return ip


class TopMoviesListView(APIView):
    def get(self, request):
        page = request.query_params.get("page", 1)

        cache_key = f"top_movies_{page}"

        data = cache.get(cache_key)

        if not data:
            data = fetch_top_movies(page)
            if "results" not in data:
                return Response(
                    {
                        "error": "Unexpected response from TMDB API. 'results' not found."
                    },
                    status=status.HTTP_500_INTERNAL_SERVER_ERROR,
                )

            cache.set(cache_key, data, timeout=7200)
            print(cache_key)

        paginator = MoviePagination()
        result_page = paginator.paginate_queryset(data["results"], request)

        return paginator.get_paginated_response(result_page)
