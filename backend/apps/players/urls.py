from rest_framework.routers import DefaultRouter
from .views import PlayerViewSet, UserPlayerLikeViewSet

router = DefaultRouter()
router.register(r'players', PlayerViewSet)
router.register(r'player-likes', UserPlayerLikeViewSet)

urlpatterns = router.urls
