from django.utils.translation import gettext_lazy as _
from django.utils.translation import pgettext_lazy
from django.db import models
from backend.archive.models import Document, Attachment
from backend.crm.utils import ROLES, SOCIAL_MEDIA_TYPES, EVENT_TYPE, EVENT_STATUS, LEAD_SOURCE, LEAD_STATUS, STAGES, \
    SOURCES, PRIORITY_CHOICE, Task_STATUS_CHOICES, TICKET_STATUS
from backend.finance.finance import FinancialKeys
from backend.location.address import Address
from backend.models import CustomUser
from backend.users.models import Organization, Teams, Role
from backend.products.product import Tag


# class Profile(models.Model):
#     user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
#     address = models.ManyToManyField(
#         'Address',
#         related_name="address_users",
#         blank=True,
#     )
#
#     role = models.CharField(max_length=50, choices=ROLES, default="USER")
#     has_sales_access = models.BooleanField(default=False)
#     has_marketing_access = models.BooleanField(default=False)
#     has_services_access = models.BooleanField(default=False)
#     has_utilities_access = models.BooleanField(default=False)
#     is_organization_admin = models.BooleanField(default=False)
#     is_active = models.BooleanField(default=True)
#     date_of_joining = models.DateField(null=True, blank=True)
#
#     def __str__(self):
#         return f"{self.user.phone_number}"

class Campaign(models.Model):
    name = models.CharField(max_length=255, verbose_name="Campaign Name")
    start_date = models.DateField(verbose_name="Start Date")
    end_date = models.DateField(verbose_name="End Date")
    description = models.TextField(blank=True, null=True, verbose_name="Description")

    def __str__(self):
        return self.name

class Contacts(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    role = models.ForeignKey(Role, on_delete=models.CASCADE, null=True)
    full_name = models.CharField(max_length=100, null=True)
    ID_number = models.IntegerField(max_length=100, null=True, blank=True)
    date_of_birth = models.DateField(blank=True, null=True)
    email = models.EmailField(blank=True, null=True)
    financial_keys = models.ManyToManyField(FinancialKeys, blank=True)
    instagram_username = models.CharField(max_length=50,blank=True, null=True)
    telegram_username = models.CharField(max_length=50,blank=True, null=True)
    other_username = models.CharField(max_length=50,blank=True, null=True)
    teams = models.ManyToManyField(Teams, blank=True)
    org = models.OneToOneField(Organization, on_delete=models.SET_NULL, null=True, blank=True)

    def __str__(self):
        return f"{self.last_name} - {self.user} "

class Lead(models.Model):
    title = models.CharField(max_length=64)
    assigned_to = models.ManyToManyField(Contacts)
    source = models.CharField(
        max_length=255, blank=True, null=True, choices=LEAD_SOURCE
    )
    status = models.CharField(
        max_length=255, blank=True, null=True,  choices=LEAD_STATUS
    )
    description = models.TextField(blank=True, null=True)
    probability = models.IntegerField(default=0, blank=True, null=True)
    open_date = models.DateField(default=None, null=True)
    close_date = models.DateField(default=None, null=True)
    teams = models.ManyToManyField(Teams, blank=True)
    org = models.ForeignKey(Organization, on_delete=models.SET_NULL, null=True, blank=True)
    tags = models.ManyToManyField(Tag, blank=True)

    is_active = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.title}"

class CRMTask(models.Model):
    title = models.CharField(max_length=200, verbose_name=_("Title"))
    status = models.CharField(max_length=50, choices=Task_STATUS_CHOICES, verbose_name=_("Status"))
    priority = models.CharField(max_length=50, choices=PRIORITY_CHOICE, verbose_name=_("Priority"))
    due_date = models.DateField(blank=True, null=True, verbose_name=_("Due Date"))
    contacts = models.ManyToManyField(Contacts, related_name="contacts_tasks", blank=True, verbose_name=_("Contacts"))
    teams = models.ManyToManyField(Teams, related_name="tasks_teams", blank=True)
    org = models.ForeignKey(Organization, on_delete=models.SET_NULL, null=True, blank=True, verbose_name=_("Organization"))
    tags = models.ManyToManyField(Tag, blank=True, verbose_name=_("Tags"))

    def __str__(self):
        return f"{self.title} - {self.status}"

class Ticket(models.Model):
    user = models.ForeignKey(Contacts, on_delete=models.CASCADE)
    title = models.CharField(max_length=200)
    question = models.TextField(verbose_name=_("Question"))
    answer = models.TextField(null=True,blank=True)
    status = models.CharField(max_length=50, choices=TICKET_STATUS, verbose_name=_("Status"))
    supervisor = models.ForeignKey(CustomUser, on_delete=models.CASCADE, null=True)
    priority = models.CharField(max_length=50, choices=PRIORITY_CHOICE, verbose_name=_("Priority"))
    created_at = models.DateTimeField(auto_now_add=True)
    tags = models.ManyToManyField(Tag, blank=True, verbose_name=_("Tags"))

    def __str__(self):
        return f"{self.user.user.phone_number} - {self.priority}"

class Note(models.Model):
    user = models.ForeignKey(Contacts, on_delete=models.CASCADE)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    tags = models.ManyToManyField(Tag, blank=True, verbose_name=_("Tags"))

    def __str__(self):
        return f"{self.user.user.phone_number}"

class Activity(models.Model):
    user = models.ForeignKey(Contacts, on_delete=models.CASCADE)
    description = models.TextField()
    tags = models.ManyToManyField(Tag, blank=True, verbose_name=_("Tags"))


    def __str__(self):
        return f"{self.user.user.phone_number} "


class Opportunity(models.Model):
    name = models.CharField(
        max_length=64, verbose_name=_("Name of Opportunity"), choices=STAGES
    )
    stage = models.CharField(
        max_length=64, choices=STAGES, verbose_name=_("Stage of Opportunity")
    )
    lead_source = models.CharField(
        max_length=255, choices=SOURCES, blank=True, null=True, verbose_name=_("Source of Lead")
    )
    description = models.TextField(blank=True, null=True, verbose_name=_("Description"))

    amount = models.DecimalField(
        decimal_places=2, max_digits=12, blank=True, null=True, verbose_name=_("Opportunity Amount")
    )

    lead = models.ManyToManyField(Lead, verbose_name=_("Opportunity Lead"))

    probability = models.IntegerField(default=0, blank=True, null=True)
    contacts = models.ManyToManyField(Contacts, verbose_name=_("Contacts"))
    closed_by = models.ForeignKey(
        Contacts,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="oppurtunity_closed_by",
        verbose_name=_("Closed By")
    )
    closed_on = models.DateField(blank=True, null=True, verbose_name=_("Closed On"))
    account = models.ForeignKey(
        Contacts,
        related_name="opportunities",
        on_delete=models.CASCADE,
        blank=True,
        null=True,
        verbose_name=_("Account")
    )
    assigned_to = models.ManyToManyField(
        Contacts, related_name="opportunity_assigned_to", blank=True, verbose_name=_("Assigned To")
    )
    is_active = models.BooleanField(default=False, verbose_name=_("Is Active"))
    tags = models.ManyToManyField(Tag, blank=True, verbose_name=_("Tags"))
    teams = models.ManyToManyField(Teams, related_name="oppurtunity_teams", blank=True)
    org = models.ForeignKey(
        Organization,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="oppurtunity_org",
        verbose_name=_("Organization")
    )

    def __str__(self):
        return f"{self.name}"

class Reminder(models.Model):
    reminder_type = models.CharField(max_length=50, blank=True, null=True)
    start_date = models.DateField(default=None, verbose_name=_("Start Date"))
    start_time = models.TimeField(default=None, verbose_name=_("Start Time"))
    note = models.CharField(max_length=50, blank=True, null=True)
    contacts = models.ManyToManyField(Contacts, blank=True, related_name="reminder_contact", verbose_name=_("Contacts"))


    def __str__(self):
        return f"{self.reminder_type}"
class Event(models.Model):
    name = models.CharField(max_length=64, verbose_name=_("Event"))
    event_type = models.CharField(max_length=200, choices=EVENT_TYPE, verbose_name=_("Event Type"))
    status = models.CharField(
        choices=EVENT_STATUS, max_length=64, blank=True, null=True, verbose_name=_("Status"))
    priority = models.CharField(max_length=50, choices=PRIORITY_CHOICE, verbose_name=_("Priority"), null=True)
    direction = models.ForeignKey(Address,on_delete=models.SET_NULL, blank=True, null=True)
    description = models.CharField(max_length=20, blank=True)
    reminders = models.ManyToManyField(Reminder, blank=True)
    task = models.ManyToManyField(CRMTask, blank=True)
    lead = models.ManyToManyField(Lead, verbose_name=_("Event Lead"))
    opportunity = models.ManyToManyField(Opportunity, blank=True, verbose_name=_("Opportunity"))
    start_date = models.DateField(default=None, verbose_name=_("Start Date"))
    start_time = models.TimeField(default=None, verbose_name=_("Start Time"))
    end_date = models.DateField(default=None, verbose_name=_("End Date"))
    end_time = models.TimeField(default=None, blank=True, null=True, verbose_name=_("End Time"))
    created_on = models.DateTimeField(_("Created on"), auto_now_add=True)
    contacts = models.ManyToManyField(Contacts, blank=True, related_name="event_contact", verbose_name=_("Contacts"))
    # assigned_to = models.ManyToManyField(
    #     Contacts, blank=True, related_name="event_assigned", verbose_name=_("Assigned To")
    # )
    created_by = models.ForeignKey(
        CustomUser,
        related_name="event_created_by_user",
        null=True,
        on_delete=models.SET_NULL,
        verbose_name=_("Created By")
    )
    updated_by = models.ForeignKey(
        CustomUser,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="updated_user",
        verbose_name=_("Updated By")
    )
    # attendees_contacts = models.ManyToManyField(
    #     Contacts, blank=True, related_name="attendees_contact", verbose_name=_("Attendees (Contacts)")
    # )
    teams = models.ManyToManyField(Teams, related_name="event_teams", blank=True)
    org = models.ForeignKey(Organization, on_delete=models.SET_NULL, null=True, blank=True, verbose_name=_("Organization"))
    updated_on = models.DateTimeField(auto_now=True)
    is_active = models.BooleanField(default=True)
    disabled = models.BooleanField(default=False)
    tags = models.ManyToManyField(Tag)

    def __str__(self):
        return f"{self.name} - {self.created_by.user.phone_number}"

# class PlannerEvent(models.Model):
#     name = models.CharField(max_length=64, verbose_name=_("Name of the Event"))
#     event_type = models.CharField(
#         max_length=18, choices=EVENT_TYPE, verbose_name=_("Type of the event")
#     )
#     status = models.CharField(
#         max_length=64, blank=True, verbose_name=_("Status")
#     )
#     direction = models.CharField(max_length=20, blank=True)
#     start_date = models.DateField(verbose_name=_("Start Date"))
#     close_date = models.DateField(blank=True, null=True, verbose_name=_("Close Date"))
#     duration = models.IntegerField(
#         default=None, null=True, verbose_name=_("Duration of the Event in Seconds")
#     )
#
#     attendees_user = models.ManyToManyField(
#         CustomUser, blank=True, related_name="attendees_user", verbose_name=_("Attendees (Users)")
#     )
#
#     created_on = models.DateTimeField(_("Created on"), auto_now_add=True)
#     created_by = models.ForeignKey(
#         CustomUser, related_name="event_created_by", on_delete=models.SET_NULL, null=True,
#         verbose_name=_("Created By")
#     )
#
#     description = models.TextField(blank=True, null=True, verbose_name=_("Description"))
#     is_active = models.BooleanField(default=False, verbose_name=_("Is Active"))
#
#     def __str__(self):
#         return f"{self.name}"

class Documents(Document):
    pass

class Attachments(Attachment):
    lead = models.ForeignKey(
        Lead,
        null=True,
        blank=True,
        related_name="lead_attachment",
        on_delete=models.CASCADE,
        verbose_name=_("Lead")
    )
    account = models.ForeignKey(
        CustomUser,
        null=True,
        blank=True,
        related_name="account_attachment",
        on_delete=models.CASCADE,
        verbose_name=_("Account")
    )
    contact = models.ForeignKey(
        Contacts,
        on_delete=models.CASCADE,
        related_name="contact_attachment",
        blank=True,
        null=True,
        verbose_name=_("Contact")
    )
    opportunity = models.ForeignKey(
        Opportunity,
        blank=True,
        null=True,
        on_delete=models.CASCADE,
        related_name="opportunity_attachment",
        verbose_name=_("Opportunity")
    )
    task = models.ForeignKey(
        CRMTask,
        blank=True,
        null=True,
        related_name="tasks_attachment",
        on_delete=models.CASCADE,
        verbose_name=_("Task")
    )