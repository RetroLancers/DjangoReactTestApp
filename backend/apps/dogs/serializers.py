from rest_framework import serializers
from apps.dogs.models import DogType

class DogTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = DogType
        fields = ['id', 'name', 'description']
