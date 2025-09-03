import json
from django.core.management.base import BaseCommand
from apps.players.models import Player

class Command(BaseCommand):
    help = 'Imports players from players.json into the database.'

    def handle(self, *args, **options):
        json_file_path = 'players.json'
        try:
            with open(json_file_path, 'r', encoding='utf-8') as file:
                players_data = json.load(file)
        except FileNotFoundError:
            self.stdout.write(self.style.ERROR(f'Error: {json_file_path} not found.'))
            return
        except json.JSONDecodeError:
            self.stdout.write(self.style.ERROR(f'Error: Could not decode JSON from {json_file_path}.'))
            return

        for player_data in players_data:
            name = player_data.get('name')
            if not name:
                self.stdout.write(self.style.ERROR(f'Skipping player due to missing name: {player_data}'))
                continue

            # Convert height and weight to Decimal, handle potential missing values
            height = player_data.get('height')
            weight = player_data.get('weight')

            if height is not None:
                try:
                    height = float(height)
                except ValueError:
                    height = None

            if weight is not None:
                try:
                    weight = float(weight)
                except ValueError:
                    weight = None

            Player.objects.create(
                name=name,
                height=height,
                weight=weight,
                jersey_number=player_data.get('jersey_number'),
                position=player_data.get('position'),
                team=player_data.get('club'), # Use 'club' from JSON for 'team' field
                is_active=player_data.get('is_active', True),
                # profile_picture will be handled separately if needed, as it's a file upload
            )
            self.stdout.write(self.style.SUCCESS(f'Successfully imported player: {name}'))

        self.stdout.write(self.style.SUCCESS('Player import complete.'))