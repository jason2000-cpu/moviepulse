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

