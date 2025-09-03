from django.core.management.base import BaseCommand
from apps.dogs.models import DogType

class Command(BaseCommand):
    help = 'Populates the database with initial dog types.'

    def handle(self, *args, **options):
        dog_types = [
            {'name': 'Golden Retriever', 'description': 'Friendly and intelligent.'},
            {'name': 'Labrador Retriever', 'description': 'Outgoing, eager, and high-spirited.'},
            {'name': 'German Shepherd', 'description': 'Smart, confident, and courageous.'},
            {'name': 'Poodle', 'description': 'Active, intelligent, and elegant.'},
            {'name': 'Bulldog', 'description': 'Friendly, courageous, and calm.'},
            {'name': 'Beagle', 'description': 'Curious, friendly, and merry.'},
            {'name': 'Rottweiler', 'description': 'Loyal, loving, and confident guardian.'},
            {'name': 'Dachshund', 'description': 'Curious, friendly, and lively.'},
            {'name': 'Siberian Husky', 'description': 'Loyal, outgoing, and mischievous.'},
            {'name': 'Great Dane', 'description': 'Friendly, patient, and dependable.'},
        ]

        for dog_type_data in dog_types:
            DogType.objects.get_or_create(name=dog_type_data['name'], defaults={'description': dog_type_data['description']})
            self.stdout.write(self.style.SUCCESS(f"Successfully added/updated dog type: {dog_type_data['name']}"))
