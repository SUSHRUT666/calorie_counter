from django.urls import path
from .views import CalorieCountView

urlpatterns = [
    path('calorie-count/', CalorieCountView.as_view(), name='calorie_count'),
]