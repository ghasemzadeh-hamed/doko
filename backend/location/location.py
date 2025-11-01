from django.db import models
from django.utils.translation import gettext_lazy as _


class Location(models.Model):
    # اطلاعات موقعیت مکانی
    latitude = models.FloatField(null=True, blank=True)
    longitude = models.FloatField(null=True, blank=True)
    created_at = models.DateTimeField(_('created at'), auto_now_add=True)
    updated_at = models.DateTimeField(_('updated at'), auto_now=True)

    # بقیه فیلدهای مورد نیاز برای اطلاعات موقعیت مکانی می‌توانند اینجا تعریف شوند.

    def __str__(self):
        return f"Location ({self.latitude}, {self.longitude})"


