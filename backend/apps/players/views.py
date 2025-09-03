from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework import permissions
from django.db.models import Count
from .models import Player, UserPlayerLike
from .serializers import PlayerSerializer, UserPlayerLikeSerializer

class PlayerViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Player.objects.all()
    serializer_class = PlayerSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    @action(detail=True, methods=['post'], permission_classes=[permissions.IsAuthenticated])
    def like(self, request, pk=None):
        player = self.get_object()
        user = request.user

        # Check if the user has already liked this player
        user_like, created = UserPlayerLike.objects.get_or_create(user=user, player=player)

        if not created:
            # If it was not created, it means the like already exists, so we unlike it
            user_like.delete()
            return Response({'status': 'player unliked', 'likes_count': player.userplayerlike_set.count()}, status=status.HTTP_200_OK)
        else:
            # If it was created, it means the player is now liked
            return Response({'status': 'player liked', 'likes_count': player.userplayerlike_set.count()}, status=status.HTTP_201_CREATED)

    @action(detail=False, methods=['get'])
    def overall_ranking(self, request):
        players = self.get_queryset().annotate(total_likes=Count('userplayerlike')).order_by('-total_likes')
        serializer = self.get_serializer(players, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['get'])
    def ranking_by_position(self, request):
        positions = Player.objects.values('position').annotate(total_likes=Count('userplayerlike')).order_by('-total_likes')
        result = {}
        for pos in positions:
            position_name = pos['position'] if pos['position'] else "Unknown Position"
            players_in_position = self.get_queryset().filter(position=pos['position']).annotate(total_likes=Count('userplayerlike')).order_by('-total_likes')
            serializer = self.get_serializer(players_in_position, many=True)
            result[position_name] = serializer.data
        return Response(result)

    @action(detail=False, methods=['get'])
    def ranking_by_club(self, request):
        clubs = Player.objects.values('team').annotate(total_likes=Count('userplayerlike')).order_by('-total_likes')
        result = {}
        for club in clubs:
            club_name = club['team'] if club['team'] else "Unknown Club"
            players_in_club = self.get_queryset().filter(team=club['team']).annotate(total_likes=Count('userplayerlike')).order_by('-total_likes')
            serializer = self.get_serializer(players_in_club, many=True)
            result[club_name] = serializer.data
        return Response(result)

class UserPlayerLikeViewSet(viewsets.ModelViewSet):
    queryset = UserPlayerLike.objects.all()
    serializer_class = UserPlayerLikeSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return self.queryset.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
