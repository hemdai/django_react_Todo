# Generated by Django 3.2.4 on 2021-06-14 15:15

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Task',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(blank=True, default='', max_length=255)),
                ('completed', models.BooleanField(default=False)),
                ('created', models.DateField(blank=True, default=datetime.date.today)),
            ],
        ),
    ]
