from datetime import datetime, timedelta, date
from decimal import Decimal, InvalidOperation, ROUND_HALF_UP

from backend.location.address import Address
from distlib.util import cached_property
from django.conf import settings
from django.core.exceptions import ValidationError
from django.core.validators import MinValueValidator
from django.db import models
from backend.models import CustomUser, Role, Tag
from django.utils import timezone
from django.utils.translation import gettext_lazy as _
from rest_framework.fields import JSONField
from typing_extensions import Optional


class UserLoginLog(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    login_time = models.DateTimeField(auto_now_add=True)
    logout_time = models.DateTimeField(null=True, blank=True)
    tag = models.ManyToManyField(Tag, null=True,blank=True)

class LeaveBalance(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE)
    annual_leave = models.PositiveIntegerField(default=0)
    sick_leave = models.PositiveIntegerField(default=0)
    other_leave = models.PositiveIntegerField(default=0)
    tag = models.ManyToManyField(Tag, null=True,blank=True)

class WorkingHours(UserLoginLog):
    duration = models.DurationField(null=True, blank=True)
    work_day = models.DateField(null=True, blank=True, db_index=True)
    hourly_rate = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        null=True,
        blank=True,
        validators=[MinValueValidator(Decimal("0"))],
    )
    fixed_salary = models.DecimalField(
        max_digits=12,
        decimal_places=2,
        null=True,
        blank=True,
        validators=[MinValueValidator(Decimal("0"))],
    )
    overtime_rate = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        null=True,
        blank=True,
        validators=[MinValueValidator(Decimal("0"))],
    )

    HOURS_QUANTIZER = Decimal("0.01")
    CURRENCY_QUANTIZER = Decimal("0.01")

    def calculate_duration(self):
        """Return the time spent between login and logout."""
        if self.login_time and self.logout_time:
            return self.logout_time - self.login_time
        return None

    @classmethod
    def get_standard_daily_hours(cls) -> Decimal:
        """Return configured standard daily hours or default to 8."""
        configured = getattr(settings, "HR_STANDARD_DAILY_HOURS", Decimal("8"))
        try:
            return Decimal(str(configured))
        except (InvalidOperation, TypeError, ValueError):
            return Decimal("8")

    @classmethod
    def round_hours(cls, value: Decimal) -> Decimal:
        return value.quantize(cls.HOURS_QUANTIZER, rounding=ROUND_HALF_UP)

    @classmethod
    def round_currency(cls, value: Decimal) -> Decimal:
        return value.quantize(cls.CURRENCY_QUANTIZER, rounding=ROUND_HALF_UP)

    @staticmethod
    def _duration_to_hours(duration: timedelta | None) -> Decimal | None:
        if duration is None:
            return None
        return Decimal(str(duration.total_seconds())) / Decimal("3600")

    @property
    def duration_in_hours(self) -> Decimal | None:
        return self._duration_to_hours(self.duration)

    @property
    def effective_work_day(self) -> date | None:
        if self.work_day:
            return self.work_day
        if self.login_time:
            return self.login_time.date()
        return None

    @property
    def regular_hours(self) -> Decimal | None:
        duration_hours = self.duration_in_hours
        if duration_hours is None:
            return None
        standard_hours = self.get_standard_daily_hours()
        if duration_hours <= Decimal("0"):
            return Decimal("0")
        regular_hours = min(duration_hours, standard_hours)
        if regular_hours <= Decimal("0"):
            return Decimal("0")
        return regular_hours

    @property
    def overtime_in_hours(self) -> Decimal | None:
        hours = self.duration_in_hours
        if hours is None:
            return None
        overtime = hours - self.get_standard_daily_hours()
        if overtime <= Decimal("0"):
            return Decimal("0")
        return overtime

    @property
    def regular_cost(self) -> Decimal | None:
        regular_hours = self.regular_hours
        if regular_hours is None:
            return None
        if self.hourly_rate is None:
            return None
        return regular_hours * self.hourly_rate

    @property
    def overtime_cost(self) -> Decimal | None:
        overtime_hours = self.overtime_in_hours
        if overtime_hours is None:
            return None
        if overtime_hours == Decimal("0"):
            return Decimal("0")
        applicable_rate = self.overtime_rate or self.hourly_rate
        if applicable_rate is None:
            return None
        return overtime_hours * applicable_rate

    @property
    def total_compensation(self) -> Decimal | None:
        components: list[Decimal] = []
        if self.fixed_salary is not None:
            components.append(self.fixed_salary)

        regular_cost = self.regular_cost
        if regular_cost is not None:
            components.append(regular_cost)

        overtime_cost = self.overtime_cost
        if overtime_cost is not None:
            components.append(overtime_cost)

        if not components:
            return None

        total = sum(components, Decimal("0"))
        if total <= Decimal("0"):
            return Decimal("0")
        return total

    @staticmethod
    def _compose_user_name(values: dict) -> str:
        first_name = (values.get("user__first_name") or "").strip()
        last_name = (values.get("user__last_name") or "").strip()
        full_name = f"{first_name} {last_name}".strip()
        if full_name:
            return full_name
        fallback = values.get("user__email")
        if fallback:
            return fallback
        return str(values.get("user"))

    @classmethod
    def summarize(cls, start_date=None, end_date=None):
        queryset = cls.objects.select_related("user").order_by("user_id", "login_time")

        if start_date:
            queryset = queryset.filter(login_time__date__gte=start_date)
        if end_date:
            queryset = queryset.filter(login_time__date__lte=end_date)

        rows: list[dict] = []
        totals = {
            "total_hours": Decimal("0"),
            "expected_hours": Decimal("0"),
            "overtime_hours": Decimal("0"),
            "regular_hours": Decimal("0"),
            "fixed_salary": Decimal("0"),
            "regular_cost": Decimal("0"),
            "overtime_cost": Decimal("0"),
            "total_compensation": Decimal("0"),
            "workdays": 0,
        }
        standard_hours = cls.get_standard_daily_hours()

        user_aggregates: dict[int, dict] = {}

        for entry in queryset:
            user_id = entry.user_id
            user_full_name = entry.user.get_full_name().strip()
            if not user_full_name:
                user_full_name = (
                    entry.user.email
                    or entry.user.username
                    or str(entry.user_id)
                )
            aggregate = user_aggregates.setdefault(
                user_id,
                {
                    "user": user_id,
                    "user_name": user_full_name,
                    "user_email": entry.user.email,
                    "workdays_set": set(),
                    "total_hours": Decimal("0"),
                    "regular_hours": Decimal("0"),
                    "overtime_hours": Decimal("0"),
                    "fixed_salary": Decimal("0"),
                    "regular_cost": Decimal("0"),
                    "overtime_cost": Decimal("0"),
                    "total_compensation": Decimal("0"),
                },
            )

            work_day = entry.effective_work_day
            if work_day:
                aggregate["workdays_set"].add(work_day)

            duration_hours = entry.duration_in_hours or Decimal("0")
            aggregate["total_hours"] += duration_hours

            regular_hours = entry.regular_hours or Decimal("0")
            aggregate["regular_hours"] += regular_hours

            overtime_hours = entry.overtime_in_hours or Decimal("0")
            aggregate["overtime_hours"] += overtime_hours

            if entry.fixed_salary is not None:
                aggregate["fixed_salary"] += entry.fixed_salary

            regular_cost = entry.regular_cost
            if regular_cost is not None:
                aggregate["regular_cost"] += regular_cost

            overtime_cost = entry.overtime_cost
            if overtime_cost is not None:
                aggregate["overtime_cost"] += overtime_cost

            total_compensation = entry.total_compensation
            if total_compensation is not None:
                aggregate["total_compensation"] += total_compensation

        for aggregate in user_aggregates.values():
            workdays = len(aggregate["workdays_set"])
            total_hours = aggregate["total_hours"]
            regular_hours = aggregate["regular_hours"]
            overtime_hours = aggregate["overtime_hours"]
            expected_hours = standard_hours * Decimal(workdays)
            if overtime_hours < Decimal("0"):
                overtime_hours = Decimal("0")

            rows.append(
                {
                    "user": aggregate["user"],
                    "user_name": aggregate["user_name"],
                    "user_email": aggregate["user_email"],
                    "workdays": workdays,
                    "total_hours": float(cls.round_hours(total_hours)),
                    "expected_hours": float(cls.round_hours(expected_hours)),
                    "overtime_hours": float(cls.round_hours(overtime_hours)),
                    "regular_hours": float(cls.round_hours(regular_hours)),
                    "fixed_salary": float(
                        cls.round_currency(aggregate["fixed_salary"])
                    )
                    if aggregate["fixed_salary"]
                    else 0.0,
                    "regular_cost": float(
                        cls.round_currency(aggregate["regular_cost"])
                    )
                    if aggregate["regular_cost"]
                    else 0.0,
                    "overtime_cost": float(
                        cls.round_currency(aggregate["overtime_cost"])
                    )
                    if aggregate["overtime_cost"]
                    else 0.0,
                    "total_compensation": float(
                        cls.round_currency(aggregate["total_compensation"])
                    )
                    if aggregate["total_compensation"]
                    else 0.0,
                }
            )

            totals["total_hours"] += total_hours
            totals["expected_hours"] += expected_hours
            totals["overtime_hours"] += overtime_hours
            totals["regular_hours"] += regular_hours
            totals["fixed_salary"] += aggregate["fixed_salary"]
            totals["regular_cost"] += aggregate["regular_cost"]
            totals["overtime_cost"] += aggregate["overtime_cost"]
            totals["total_compensation"] += aggregate["total_compensation"]
            totals["workdays"] += workdays

        return {
            "rows": rows,
            "totals": {
                "total_hours": float(cls.round_hours(totals["total_hours"])),
                "expected_hours": float(cls.round_hours(totals["expected_hours"])),
                "overtime_hours": float(cls.round_hours(totals["overtime_hours"])),
                "regular_hours": float(cls.round_hours(totals["regular_hours"])),
                "fixed_salary": float(
                    cls.round_currency(totals["fixed_salary"])
                )
                if totals["fixed_salary"]
                else 0.0,
                "regular_cost": float(
                    cls.round_currency(totals["regular_cost"])
                )
                if totals["regular_cost"]
                else 0.0,
                "overtime_cost": float(
                    cls.round_currency(totals["overtime_cost"])
                )
                if totals["overtime_cost"]
                else 0.0,
                "total_compensation": float(
                    cls.round_currency(totals["total_compensation"])
                )
                if totals["total_compensation"]
                else 0.0,
                "workdays": totals["workdays"],
                "unique_users": len(rows),
            },
        }

    def clean(self):
        super().clean()
        if self.login_time and self.logout_time and self.logout_time < self.login_time:
            raise ValidationError({
                "logout_time": _("Logout time cannot be earlier than login time."),
            })

    def save(self, *args, **kwargs):
        self.duration = self.calculate_duration()
        if not self.work_day and self.login_time:
            self.work_day = self.login_time.date()
        super().save(*args, **kwargs)

class DistanceTraveled(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    distance = models.DecimalField(max_digits=10, decimal_places=2)
    date = models.DateField()
    tag = models.ManyToManyField(Tag, null=True,blank=True)

class EmploymentContract(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    contract_name = models.CharField(max_length=100)
    contract_number = models.CharField(max_length=20)
    # دیگر اطلاعات قرارداد
    tag = models.ManyToManyField(Tag, null=True,blank=True)

class LicenseInfo(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    software_name = models.CharField(max_length=100)
    license_key = models.CharField(max_length=50)
    # دیگر اطلاعات لایسنس نرم‌افزاری
    tag = models.ManyToManyField(Tag, null=True,blank=True)

class EmployeeInfo(models.Model):
    # """
    # StaffProfile model class.
    #
    # Extends auth.User and adds more fields
    # """

    # sex choices
    # according to https://en.wikipedia.org/wiki/ISO/IEC_5218
    NOT_KNOWN = "0"
    MALE = "1"
    FEMALE = "2"
    NOT_APPLICABLE = "9"

    SEX_CHOICES = (
        (NOT_KNOWN, _("Not Known")),
        (MALE, _("Male")),
        (FEMALE, _("Female")),
        (NOT_APPLICABLE, _("Not Applicable")),
    )

    user = models.OneToOneField(CustomUser, verbose_name=_("User"), on_delete=models.CASCADE)

    image = models.ImageField(
        upload_to="static/staff-images/",
        max_length=255,
        verbose_name=_("Profile Image"),
        help_text=_("A square image works best"),
        blank=True,
    )
    sex = models.CharField(
        _("Gender"),
        choices=SEX_CHOICES,
        max_length=1,
        default=NOT_KNOWN,
        blank=True,
        db_index=True,
    )
    role = models.ForeignKey(
        Role,
        verbose_name=_("Role"),
        blank=True,
        default=None,
        null=True,
        on_delete=models.SET_NULL,
    )
    # phone = PhoneNumberField(_("Phone"), blank=True, default="")
    address = models.ForeignKey(Address , blank=True,null=True , on_delete=models.CASCADE)
    birthday = models.DateField(_("Birthday"), blank=True, default=None, null=True)
    leave_days = models.PositiveIntegerField(
        _("Leave days"),
        default=21,
        blank=True,
        help_text=_("Number of leave days allowed in a year."),
    )
    sick_days = models.PositiveIntegerField(
        _("Sick days"),
        default=10,
        blank=True,
        help_text=_("Number of sick days allowed in a year."),
    )
    overtime_allowed = models.BooleanField(
        _("Overtime allowed"), blank=True, default=False
    )
    start_date = models.DateField(
        _("Start Date"),
        null=True,
        default=None,
        blank=True,
        help_text=_("The start date of employment"),
    )
    end_date = models.DateField(
        _("End Date"),
        null=True,
        default=None,
        blank=True,
        help_text=_("The end date of employment"),
    )
    employment_contract = models.ForeignKey (EmploymentContract,null=True, on_delete=models.CASCADE,blank=True)
    # data = JSONField(default=dict, null=True )
    #
    # def get_name(self):
    #     """Return the staff member's name."""
    #     return f"{self.CustomUser.first_name} {self.user.last_name}"
    #
    # @cached_property
    # def _current_year(self):  # pylint: disable=no-self-use
    #     """Get the current year."""
    #     return datetime.today().year
    #
    # def get_approved_leave_days(self, year: Optional[int] = None):
    #     """Get approved leave days in the current year."""
    #     return get_taken_leave_days (
    #         staffprofile=self,
    #         status=Leave.APPROVED,
    #         leave_type=Leave.REGULAR,
    #         start_year=year or self._current_year,
    #         end_year=year or self._current_year,
    #     )
    #
    # def get_approved_sick_days(self, year: Optional[int] = None):
    #     """Get approved leave days in the current year."""
    #     return get_taken_leave_days(
    #         staffprofile=self,
    #         status=Leave.APPROVED,
    #         leave_type=Leave.SICK,
    #         start_year=year or self._current_year,
    #         end_year=year or self._current_year,
    #     )
    #
    # def get_available_leave_days(self, year: Optional[int] = None):
    #     """Get available leave days."""
    #     try:
    #         leave_record = AnnualLeave.objects.get(
    #             leave_type=Leave.REGULAR, staff=self, year=year or self._current_year
    #         )
    #     except AnnualLeave.DoesNotExist:
    #         return Decimal(0)
    #     else:
    #         return leave_record.get_available_leave_days()
    #
    # def get_available_sick_days(self, year: Optional[int] = None):
    #     """Get available sick days."""
    #     try:
    #         leave_record = AnnualLeave.objects.get(
    #             leave_type=Leave.SICK, staff=self, year=year or self._current_year
    #         )
    #     except AnnualLeave.DoesNotExist:
    #         return Decimal(0)
    #     else:
    #         return leave_record.get_available_leave_days()
    #
    def __str__(self):
        return f"{self.user}"
    tag = models.ManyToManyField(Tag, null=True,blank=True)

class StaffDocument(models.Model):
    # """StaffDocument model class."""

    staff = models.ForeignKey(
        EmployeeInfo, verbose_name=_("Staff Member"), on_delete=models.CASCADE
    )
    name = models.CharField(_("Name"), max_length=255)
    description = models.TextField(_("Description"), blank=True, default="")
    file = models.FileField(
        _("File"),
        upload_to="staff-documents/",
        help_text=_("Upload staff member document"),
    )
    public = models.BooleanField(
        _("Public"),
        help_text=_("If public, it will be available to everyone."),
        blank=True,
        default=False,
    )
    def __str__(self):
        # """Unicode representation of class object."""
        return f" {self.name}"
    tag = models.ManyToManyField(Tag, null=True,blank=True)

class BaseStaffRequest(models.Model):
    # """Abstract model class for Leave & Overtime tracking."""
    STATUS_CHOICES = (
        ("Pending", "PENDING"),
        ("ACCEPT", "ACCEPT"),
    )
    staff = models.ForeignKey(
        EmployeeInfo, verbose_name=_("Staff Member"), on_delete=models.CASCADE
    )
    start = models.DateTimeField(max_length=255, blank=True, null=True)
    end = models.DateTimeField(max_length=255, blank=True, null=True)
    review_reason = models.TextField(_("Reason"), blank=True, default="")
    review_status = models.CharField(_("Status"),
        max_length=255, blank=True, null=True, choices=STATUS_CHOICES
    )
    set_reviewers_function: Optional[str] = "small_small_hr.reviews.set_staff_request_reviewer"
    set_user_function: Optional[
        str
    ] = "small_small_hr.reviews.set_staff_request_review_user"
    tag = models.ManyToManyField(Tag, null=True,blank=True)

class OverTime(BaseStaffRequest):
    """Overtime model class."""

    date = models.DateField(
        _("Date"), auto_now=False, auto_now_add=False, db_index=True
    )
    start_time = models.TimeField( auto_now=False, auto_now_add=False)
    end_time = models.TimeField( auto_now=False, auto_now_add=False)

    # MODEL REVIEW OPTIONS
    # path to function that will be used to send email to reviewers
    request_for_review_function: Optional[
        str
    ] = "small_small_hr.emails.send_request_for_overtime_review"
    # path to function that will be used to send email to user after review
    review_complete_notify_function: Optional[
        str
    ] = "small_small_hr.emails.send_overtime_review_complete_notice"

    def __str__(self):

        return f" {self.date} from {self.start} to {self.end}"

    def get_duration(self):
        """Get duration."""
        start = datetime.combine(self.date, self.start)
        end = datetime.combine(self.date, self.end)
        return end - start

    @cached_property
    def duration(self):
        """Get duration as a property."""
        return self.get_duration()

class FreeDay(models.Model):
    """Model definition for FreeDay."""

    name = models.CharField(_("Name"), max_length=255)
    date = models.DateField(_("Date"), unique=True)

    class Meta:
        """Meta definition for FreeDay."""

        ordering = ["-date"]
        verbose_name = _("Free Day")
        verbose_name_plural = _("Free Days")

    def __str__(self):
        """Unicode representation of class object."""
        return f"{self.date.year} - {self.name}"

    def get_days(start: object, end: object):
        """Yield the days between two datetime objects."""
        current_tz = timezone.get_current_timezone()
        local_start = current_tz.normalize(start)
        local_end = current_tz.normalize(end)
        span = local_end.date() - local_start.date()
        for i in range(span.days + 1):
            yield local_start.date() + timedelta(days=i)
    #
    # def get_real_leave_duration(leave_obj: Leave) -> Decimal:
    #     """
    #     Get the real leave duration.
    #
    #     Takes into account public holidays, weekends and weekend policy
    #     """
    #     count = Decimal(0)
    #     free_days = FreeDay.objects.filter(
    #         date__gte=leave_obj.start.date(), date__lte=leave_obj.end.date()
    #     ).values_list("date", flat=True)
    #     days = get_days(start=leave_obj.start, end=leave_obj.end)
    #     for day in days:
    #         if day not in free_days:
    #             day_value = settings.SSHR_DAY_LEAVE_VALUES[day.isoweekday()]
    #             count = count + Decimal(day_value)
    #     return count
    #
    # def get_taken_leave_days(
    #     staffprofile: object, status: str, leave_type: str, start_year: int, end_year: int
    # ):
    #     """
    #     Calculate the number of leave days actually taken.
    #
    #     Takes into account weekends and weekend policy
    #     """
    #     count = Decimal(0)
    #     free_days = FreeDay.objects.filter(
    #         date__year__gte=start_year, date__year__lte=end_year
    #     ).values_list("date", flat=True)
    #     queryset = Leave.objects.filter(
    #         staff=staffprofile, review_status=status, leave_type=leave_type
    #     ).filter(Q(start__year__gte=start_year) | Q(end__year__lte=end_year))
    #     for leave_obj in queryset:
    #         days = get_days(start=leave_obj.start, end=leave_obj.end)
    #         for day in days:
    #             if day.year >= start_year and day.year <= end_year and day not in free_days:
    #                 day_value = settings.SSHR_DAY_LEAVE_VALUES[day.isoweekday()]
    #                 count = count + Decimal(day_value)
    #     return count
    tag = models.ManyToManyField(Tag, null=True,blank=True)

class LeaveManager(models.Manager):
    """
    Custom manager for Leave model
    """

    def get_queryset(self):
        """
        Get the queryset
        """
        return super().get_queryset().annotate(
            duration=models.F('end')-models.F('start'))

    def get_carry_over(staffprofile: EmployeeInfo, year: int, leave_type: str):
        """Get carried over leave days."""
        if leave_type == Leave.REGULAR:
            previous_obj = AnnualLeave.objects.filter(
                staff=staffprofile, year=year - 1, leave_type=leave_type
            ).first()
            if previous_obj:
                remaining = previous_obj.get_available_leave_days()
                max_carry_over = settings.SSHR_MAX_CARRY_OVER
                if remaining > max_carry_over:
                    carry_over = max_carry_over
                else:
                    carry_over = remaining

                return carry_over

        return 0

    # def create_annual_leave(staffprofile: EmployeeInfo, year: int, leave_type: str):
    #     """Creates an annual leave object for the staff member."""
    #     try:
    #         annual_leave = AnnualLeave.objects.get(
    #             staff=staffprofile, year=year, leave_type=leave_type
    #         )
    #     except AnnualLeave.DoesNotExist:
    #         carry_over = get_carry_over(staffprofile, year, leave_type)
    #
    #         if leave_type == Leave.REGULAR:
    #             allowed_days = staffprofile.leave_days
    #         elif leave_type == Leave.SICK:
    #             allowed_days = staffprofile.sick_days
    #
    #         annual_leave = AnnualLeave(
    #             staff=staffprofile,
    #             year=year,
    #             leave_type=leave_type,
    #             allowed_days=allowed_days,
    #             carried_over_days=carry_over,
    #         )
    #         annual_leave.save()
    #
    #     return annual_leave

    def create_free_days(start_year: int = timezone.now().year, number_of_years: int = 11):
        """
        Create FreeDay records.

        :param start_year:  the year from which to start creating free days
        :param number_of_years: number of years to create free days objects
        """
        default_days = settings.SSHR_FREE_DAYS
        years = (start_year + _ for _ in range(number_of_years))
        for year in years:
            for default_day in default_days:
                the_date = date(
                    year=year, month=default_day["month"], day=default_day["day"],
                )
                free_day = FreeDay(name=the_date.strftime("%A %d %B %Y"), date=the_date,)
                free_day.save()
    tag = models.ManyToManyField(Tag, null=True,blank=True)

class Leave(BaseStaffRequest):
    """Leave model class."""

    SICK = "1"
    REGULAR = "2"

    TYPE_CHOICES = (
        (SICK, _("Sick Leave")),
        (REGULAR, _("Regular Leave")),
    )

    leave_type = models.CharField(
        _("Type"),
        max_length=1,
        choices=TYPE_CHOICES,
        default=REGULAR,
        blank=True,
        db_index=True,
    )

    objects = LeaveManager()

    # MODEL REVIEW OPTIONS
    # path to function that will be used to send email to reviewers
    request_for_review_function: Optional[
        str
    ] = "small_small_hr.emails.send_request_for_leave_review"
    # path to function that will be used to send email to user after review
    review_complete_notify_function: Optional[
        str
    ] = "small_small_hr.emails.send_leave_review_complete_notice"

    def __str__(self):
        return f"{self.staff.user}: {self.start} to {self.end}"

    def get_duration(self):
        """Get duration."""
        return self.end - self.start

    @cached_property
    def duration(self):
        """Get duration as a property."""
        return self.get_duration()

    # @cached_property
    # def day_count(self):
    #     """
    #     Get the number of leave days as a property.
    #
    #     This takes into account holidays and weekend policy.
    #     """
    #     return get_real_leave_duration(leave_obj=self)

class AnnualLeave(models.Model):
    """
    Model to keep track of staff employee annual leave.

    This model is meant to be populated once a year
    Each staff member can only have one record per leave_type per year
    """

    # YEAR_CHOICES = [(r, r) for r in range(1402, datetime.ExtractYear + 10)]

    year = models.PositiveIntegerField(
        _("Year"), default=1402, db_index=True
    )
    staff = models.ForeignKey(
        EmployeeInfo, verbose_name=_("Staff Member"), on_delete=models.CASCADE
    )
    leave_type = models.CharField(
        _("Type"), max_length=1, choices=Leave.TYPE_CHOICES, db_index=True
    )
    allowed_days = models.DecimalField(
        _("Allowed Leave days"),
        default=21,
        blank=True,
        decimal_places=1,
        max_digits=12,
        # validators=[MinValueValidator(Decimal('0.1'))],
        help_text=_("Number of leave days allowed in a year."),
    )
    carried_over_days = models.DecimalField(
        _("Carried Over Leave days"),
        default=0,
        blank=True,
        decimal_places=1,
        max_digits=12,
        # validators=[MinValueValidator(Decimal('0.1'))],
        help_text=_("Number of leave days carried over into this year."),
    )


    #
    # def get_cumulative_leave_taken(self):
    #     """
    #     Get the cumulative leave taken.
    #
    #     Returns a timedelta
    #     """
    #     return get_taken_leave_days(
    #         staffprofile=self.staff,
    #         status=Leave.APPROVED,
    #         leave_type=self.leave_type,
    #         start_year=self.year,
    #         end_year=self.year,
    #     )

    # def get_available_leave_days(self, month: int = 12):
    #     """Get the remaining leave days."""
    #     if month <= 0:
    #         month = 1
    #     elif month > 12:
    #         month = 12
    #
    #     # the max allowed days per year
    #     allowed = self.allowed_days
    #
    #     # the days `earned` per month
    #     per_month = Decimal(allowed / 12)
    #
    #     # the days earned so far, given the month
    #     earned = (Decimal(month) * per_month)
    #
    #     # the days taken
    #     taken = self.get_cumulative_leave_taken()
    #
    #     # the starting balance
    #     starting_balance = self.carried_over_days
    #
    #     return Decimal(earned + starting_balance - taken)
    tag = models.ManyToManyField(Tag, null=True,blank=True)
