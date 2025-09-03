from rest_framework import serializers
from .models import Player, UserPlayerLike

class PlayerSerializer(serializers.ModelSerializer):
    likes_count = serializers.SerializerMethodField()

    class Meta:
        model = Player
        fields = [
            'id',
            'name',
            'height',
            'weight',
            'jersey_number',
            'position',
            'team',
            'is_active',
            'profile_picture',
            'likes_count',
        ]

    def get_likes_count(self, obj):
        return obj.userplayerlike_set.count()

class UserPlayerLikeSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserPlayerLike
        fields = ['id', 'user', 'player', 'liked_at']
        read_only_fields = ['user', 'liked_at']

    def create(self, validated_data):
        user = self.context['request'].user
        player = validated_data['player']
        if UserPlayerLike.objects.filter(user=user, player=player).exists():
            raise serializers.ValidationError("You have already liked this player.")
        return UserPlayerLike.objects.create(user=user, **validated_data)
