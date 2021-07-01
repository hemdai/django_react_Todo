from django.urls import path
from . import views

urlpatterns = [
    path('list/', views.book_list_view, name='list'),
    path('create/', views.book_post_view, name='create'),
    path('update/<int:num_id>', views.book_put_view, name='update'),
    path('delete/<int:num_id>', views.book_delete_view, name='delete')
]
