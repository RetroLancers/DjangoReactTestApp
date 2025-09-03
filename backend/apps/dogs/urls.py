from django.urls import path, include
from rest_framework.routers import DefaultRouter
from apps.dogs.views import DogTypeViewSet

router = DefaultRouter()
router.register(r'dog-types', DogTypeViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
