from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.decorators import api_view
from .models import Task
from .serializer import TaskSerializer
from rest_framework.response import Response


# Create your views here.


@api_view(["GET"])
def book_list_view(request):
    qs = Task.objects.all()
    serializers = TaskSerializer(qs, many=True)
    return Response(serializers.data)


@api_view(["POST"])
def book_post_view(request):
    data_body = request.data
    serializer = TaskSerializer(data=data_body)
    if serializer.is_valid():
        serializer.save()
    return Response("done")


@api_view(["PUT"])
def book_put_view(request, num_id):
    data_body = request.data
    serializer = TaskSerializer(data=data_body)

    if serializer.is_valid():
        qs = Task.objects.filter(id=num_id).update(**serializer.data)
    return Response("done")


@api_view(["DELETE"])
def book_delete_view(requset, num_id):
    qs = Task.objects.get(id=num_id).delete()
    return Response("done")
