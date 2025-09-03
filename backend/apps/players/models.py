from django.db import models
from django.conf import settings

class Player(models.Model):
    name = models.CharField(max_length=255)
    height = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True)
    weight = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True)
    jersey_number = models.IntegerField(null=True, blank=True)
    position = models.CharField(max_length=100, null=True, blank=True)
    team = models.CharField(max_length=255, null=True, blank=True)
    is_active = models.BooleanField(default=True)
    profile_picture = models.ImageField(upload_to='player_profile_pictures/', null=True, blank=True)

    def __str__(self):
        return self.name

class UserPlayerLike(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    player = models.ForeignKey(Player, on_delete=models.CASCADE)
    liked_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('user', 'player')

    def __str__(self):
        return f"{self.user.username} likes {self.player.name}"