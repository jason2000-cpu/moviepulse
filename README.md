## SETTING UP THE BACKEND

**Ensure you have python 3, pip and virtualenv installed**

1. Install the required packages by running the following command:

```
cd backend
```

```
virtualenv .venv
```

Activate the virtual environment

```
source .venv/bin/activate
```

Install packages:

```
pip install -r requirements.txt
```

Copy the .env.example file to .env and update the values:

```
cp .env.example .env
```

Run migrations to create the DB:

```
python manage.py makemigrations
```

```
python manage.py migrate
```

Start the dev server:

```
python manage.py runserver
```

Then finally test the endpoints:

```
curl http://127.0.0.1/api/test
```

## SETTING UP FRONTEND

**Ensure you have node > 16 installed**

1. Open a new terminal and cd to the frontend folder to install dependencies

```
cd frontend
```

```
npm i
```

```
npm run start
```

## Features

[x] User registration, login

[x] Send and verify OTP to email

[x] Cache movies' list

[x] Allow only 3 searches for guest users (those without account)

[] Change profile details

[] Reset password

[] Store favorite movies to the DB for each user

## Endpoints

![/api/login/	movieapp.views.LoginView	login
/api/movies/	movieapp.views.TopMoviesListView	fetch-top-movies
/api/otp/verify/	movieapp.views.VerifyOTPView	verify-OTP
/api/register/	movieapp.views.UserCreateView	create_user
/api/search-movies/	movieapp.views.SearchMoviesView	search-movies
/api/test/	movieapp.views.hello_world	api-test](endpoints.png)

Navigate to `http://127.0.0.1:8000/api/schema/swagger-ui/` or `https://moviepulse.onrender.com/api/schema/swagger-ui/`
