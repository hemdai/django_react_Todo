from django.db import models
import datetime


# Create your models here.
class Task(models.Model):
    name = models.CharField(default="", max_length=255, blank=True)
    completed = models.BooleanField(default=False)
    created = models.DateField(blank=True, default=datetime.date.today)

    def __str__(self):
        return self.name
