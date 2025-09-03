from rest_framework import viewsets
from apps.dogs.models import DogType
from apps.dogs.serializers import DogTypeSerializer

class DogTypeViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = DogType.objects.all()
    serializer_class = DogTypeSerializer
