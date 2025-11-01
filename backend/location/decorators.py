from backend.models import CustomUser
from django.db import models



#Request
class Demande(models.Model):
    depart = models.CharField(max_length=100)
    latitudeDepart = models.FloatField(default=31.932940)
    longitudeDepart = models.FloatField(default=-4.423060)
    destination  = models.CharField(max_length=100)
    dateDemande = models.DateTimeField(default=timezone.now)
    nombrePlaces = models.PositiveSmallIntegerField()
    statut = models.BooleanField('Demande status', default=False)
    utilisateur = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    chauffeur = models.ForeignKey(CustomUser, on_delete=models.CASCADE, null=True, blank=True)

    def __str__(self):
        return self.depart