from django.conf import settings
from django.db import models

from apps.common.models import BaseModel
from apps.partners.models import Partner


class Ticket(BaseModel):
    OPEN = "open"
    IN_PROGRESS = "in_progress"
    RESOLVED = "resolved"
    CLOSED = "closed"

    STATUS_CHOICES = [
        (OPEN, "Open"),
        (IN_PROGRESS, "In Progress"),
        (RESOLVED, "Resolved"),
        (CLOSED, "Closed"),
    ]

    LOW = "low"
    MEDIUM = "medium"
    HIGH = "high"

    PRIORITY_CHOICES = [
        (LOW, "Low"),
        (MEDIUM, "Medium"),
        (HIGH, "High"),
    ]

    title = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    status = models.CharField(max_length=32, choices=STATUS_CHOICES, default=OPEN)
    priority = models.CharField(max_length=16, choices=PRIORITY_CHOICES, default=MEDIUM)
    customer = models.ForeignKey(
        Partner,
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name="tickets",
    )
    assigned_to = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name="assigned_tickets",
    )

    def __str__(self) -> str:  # pragma: no cover - trivial
        return self.title
