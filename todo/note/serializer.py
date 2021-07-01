from rest_framework import serializers
from . models import Task

class TaskSerializer(serializers.ModelSerializer):
    # name = serializers.CharField()
    # completed = serializers.BooleanField()
    # created = serializers.DateField()

    class Meta:
        model = Task
        fields = '__all__'
