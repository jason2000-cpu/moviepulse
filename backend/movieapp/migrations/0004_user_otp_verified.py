# Generated by Django 5.1.1 on 2024-09-16 06:09

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("movieapp", "0003_onetimepassword_verified"),
    ]

    operations = [
        migrations.AddField(
            model_name="user",
            name="otp_verified",
            field=models.BooleanField(default=False),
        ),
    ]
