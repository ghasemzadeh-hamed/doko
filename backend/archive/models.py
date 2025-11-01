from backend.users.models import Organization
from django.db import models

from backend.models import CustomUser, Tag


class Attachment(models.Model):
    created_by = models.ForeignKey(
        CustomUser,
        related_name="attachment_created_by",
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
    )
    file_name = models.CharField(max_length=60)
    attachment = models.FileField(max_length=1001, upload_to="static/archives/attachments/%Y/%m/")
    tag = models.ManyToManyField(Tag, null=True,blank=True)

    def __str__(self):
        return f"{self.file_name}"


class Document(models.Model):

    DOCUMENT_STATUS_CHOICE = (("active", "active"), ("inactive", "inactive"))
    name = models.CharField(max_length=60, null=True)
    title = models.TextField(blank=True, null=True)
    document_file = models.FileField(upload_to="static/archives/documents", max_length=5000)
    created_by = models.ForeignKey(
        CustomUser, related_name="document_uploaded",
        on_delete=models.SET_NULL,
        null=True,
    )

    status = models.CharField(
        choices=DOCUMENT_STATUS_CHOICE, max_length=64, default="active")
    shared_to = models.ManyToManyField(CustomUser, related_name="shared_documents",blank=True)
    org = models.ForeignKey(
        Organization,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="document_org",
    )
    tag = models.ManyToManyField(Tag, null=True,blank=True)

    def __str__(self):
        return f"{self.name}"