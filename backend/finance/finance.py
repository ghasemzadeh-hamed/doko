from backend.users.models import Courier, Seller, Customer, Organization
from django.core.exceptions import ValidationError
from backend.models import *
from django.db import transaction
from django.db.models import Sum
from django.utils import timezone
from djmoney.models.fields import MoneyField
from djmoney.money import Money
from typing import Optional


DEFAULT_CURRENCY = "IRR"


def _ensure_money(amount, *, currency):
    """Return a :class:`~djmoney.money.Money` instance for ``amount``.

    ``amount`` can be provided as either a numeric value or an existing ``Money``
    instance.  When a ``Money`` instance with a different currency is supplied,
    we raise a :class:`ValidationError` to avoid silent conversions.
    """

    if isinstance(amount, Money):
        if amount.currency.code != currency:
            raise ValidationError("Currency mismatch for monetary operation.")
        return amount
    if amount is None:
        return Money(0, currency)
    return Money(amount, currency)

# کلاس هزینه پیک
class CourierExpense(models.Model):
    courier = models.ForeignKey(Courier, on_delete=models.CASCADE)
    amount = MoneyField(max_digits=13, decimal_places=2, default_currency='IRR', null=True)
    # دیگر فیلدها

    def __str__(self):
        return f"{self.courier} - {self.amount}"

    def save(self, *args, **kwargs):
        """
        ذخیره تغییرات موجودی کیف پول
        """
        super(CourierExpense, self).save(*args, **kwargs)

    def create_expense(self, amount, currency=DEFAULT_CURRENCY):
        """ایجاد هزینه جدید برای پیک"""

        currency_code = (
            self.amount.currency.code
            if self.amount
            else (amount.currency.code if isinstance(amount, Money) else currency)
        )
        current_amount = self.amount or Money(0, currency_code)
        money_amount = _ensure_money(amount, currency=currency_code)
        self.amount = current_amount + money_amount
        self.save(update_fields=["amount"])

    def get_balance(self):
        """
        دریافت موجودی فعلی کیف پول پیک
        """
        return self.amount or Money(0, DEFAULT_CURRENCY)

# کلاس درآمد
class Income(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name="userincome")
    amount = MoneyField(max_digits=13, decimal_places=2, default_currency='IRR', null=True)
    # دیگر فیلدها

    def __str__(self):
        return f"Income for Seller: {self.user} - Amount: {self.amount}"

    def add_income(self, amount, currency=DEFAULT_CURRENCY):
        """افزودن درآمد به حساب فروشنده"""

        currency_code = (
            self.amount.currency.code
            if self.amount
            else (amount.currency.code if isinstance(amount, Money) else currency)
        )
        current_amount = self.amount or Money(0, currency_code)
        money_amount = _ensure_money(amount, currency=currency_code)
        self.amount = current_amount + money_amount
        self.save(update_fields=["amount"])

    def get_total_income(self):
        """
        دریافت مجموع درآمد فروشنده
        """
        return self.amount or Money(0, DEFAULT_CURRENCY)

    def get_seller(self):
        """
        دریافت فروشنده مرتبط با این درآمد
        """
        return self.user


#کلاس میزان کل درآمدها (TotalIncome)
class TotalIncome(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    income = models.DecimalField(max_digits=12, decimal_places=2, default=0)

    def add_income(self, income_amount):
        """Add a new income to the total expenses."""
        if income_amount < 0:
            raise ValidationError("income amount cannot be negative.")
        self.income += income_amount
        self.save()

    def reset_income(self):
        """Reset the total income to zero."""
        self.income = 0
        self.save()

    def __str__(self):
        return f"Total income: {self.income}"


# کلاس هزینه ها
class Expense(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name="userexpense")
    amount = MoneyField(max_digits=13, decimal_places=2, default_currency='IRR', null=True)
    # دیگر فیلدها

#کلاس میزان کل هزینه (TotalExpenses)
class TotalExpenses(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    expenses = models.DecimalField(max_digits=12, decimal_places=2, default=0)

    def add_expense(self, expense_amount):
        """Add a new expense to the total expenses."""
        if expense_amount < 0:
            raise ValidationError("Expense amount cannot be negative.")
        self.expenses += expense_amount
        self.save()

    def reset_expenses(self):
        """Reset the total expenses to zero."""
        self.expenses = 0
        self.save()

    def __str__(self):
        return f"Total Expenses: {self.expenses}"

#کلاس میزان کل فروش (TotalSales)
class TotalSales(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    sales = models.DecimalField(max_digits=12, decimal_places=2, default=0)

    def add_sale(self, sale_amount):
        """Add a new sale to the total sales."""
        if sale_amount < 0:
            raise ValidationError("Sale amount cannot be negative.")
        self.sales += sale_amount
        self.save()

    def reset_sales(self):
        """Reset the total sales to zero."""
        self.sales = 0
        self.save()

    def __str__(self):
        return f"Total Sales: {self.sales}"


class Commission(models.Model):
    commission = models.PositiveSmallIntegerField(null=True, blank=True)
# کلاس محاسبه 5 درصد از سفارشات فروشندگان

class SellerCommission(models.Model):
    seller = models.ForeignKey(Seller, on_delete=models.CASCADE)
    commission_percentage = models.DecimalField(max_digits=5, decimal_places=2)
    # دیگر فیلدها
    def __str__(self):
        return f"{self.seller} - Commission: {self.commission_percentage}%"

    def calculate_commission(self, total_sales):
        """
        محاسبه مبلغ کمیسیون بر اساس درصد کمیسیون و مجموع فروش
        :param total_sales: مجموع فروش فروشنده
        :return: مبلغ کمیسیون محاسبه شده
        """
        commission_amount = (self.commission_percentage / 100) * total_sales
        return commission_amount

    def set_commission_percentage(self, new_percentage):
        """
        تنظیم درصد کمیسیون جدید برای فروشنده
        :param new_percentage: درصد کمیسیون جدید
        """
        self.commission_percentage = new_percentage
        self.save()

# کلاس حساب های بانکی کاربران

class FinancialKeys(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    bank_account_number = models.CharField(max_length=20)
    tax_number = models.CharField(max_length=20)
    # دیگر اطلاعات مالی

    def __str__(self):
        return f"کلید مالی برای {self.user}"

    @classmethod
    def create_financial_key(cls, user, bank_account_number, tax_number):
        return cls.objects.create(
            user=user, bank_account_number=bank_account_number, tax_number=tax_number
        )

    def update_financial_key(self, bank_account_number, tax_number):
        self.bank_account_number = bank_account_number
        self.tax_number = tax_number
        self.save(update_fields=["bank_account_number", "tax_number"])

    def delete_financial_key(self):
        self.delete()

    @classmethod
    def get_financial_key_by_user(cls, user):
        return cls.objects.filter(user=user).first()


class Account(models.Model):
    class AccountType(models.TextChoices):
        ASSET = "ASSET", "دارایی"
        LIABILITY = "LIABILITY", "بدهی"
        EQUITY = "EQUITY", "سرمایه"
        REVENUE = "REVENUE", "درآمد"
        EXPENSE = "EXPENSE", "هزینه"

    class DetailLevel(models.TextChoices):
        CONTROL = "CONTROL", "کنترل"
        SUBSIDIARY = "SUBSIDIARY", "معین"
        ANALYTICAL = "ANALYTICAL", "تفضیلی"

    code = models.CharField(max_length=20, unique=True)
    name = models.CharField(max_length=255)
    account_type = models.CharField(
        max_length=20, choices=AccountType.choices, default=AccountType.ASSET
    )
    detail_level = models.CharField(
        max_length=20, choices=DetailLevel.choices, default=DetailLevel.CONTROL
    )
    parent = models.ForeignKey(
        "self", on_delete=models.CASCADE, related_name="children", null=True, blank=True
    )
    is_active = models.BooleanField(default=True)

    class Meta:
        verbose_name = "Account"
        verbose_name_plural = "Accounts"

    def __str__(self):
        return f"{self.code} - {self.name}"

    def clean(self):
        if self.parent and self.parent.detail_level == Account.DetailLevel.ANALYTICAL:
            raise ValidationError("Analytical accounts cannot have child accounts.")
        if self.parent is None and self.detail_level != Account.DetailLevel.CONTROL:
            raise ValidationError("Only control accounts can be root accounts.")

    def activate(self):
        self.is_active = True
        self.save(update_fields=["is_active"])

    def deactivate(self):
        if self.children.filter(is_active=True).exists():
            raise ValidationError("Cannot deactivate an account with active children.")
        self.is_active = False
        self.save(update_fields=["is_active"])


class DetailAccount(models.Model):
    class DetailType(models.TextChoices):
        PERSON = "PERSON", "اشخاص"
        COST_CENTER = "COST_CENTER", "مراکز هزینه"
        PROJECT = "PROJECT", "پروژه"
        CONTRACT = "CONTRACT", "قرارداد"

    account = models.ForeignKey(Account, on_delete=models.CASCADE, related_name="detail_accounts")
    code = models.CharField(max_length=30)
    name = models.CharField(max_length=255)
    detail_type = models.CharField(max_length=20, choices=DetailType.choices)
    user = models.ForeignKey(
        CustomUser,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="detail_accounts",
    )

    class Meta:
        unique_together = ("account", "code")

    def __str__(self):
        return f"{self.account.code}-{self.code} {self.name}"

    def clean(self):
        super().clean()
        if self.user and self.detail_type != DetailAccount.DetailType.PERSON:
            raise ValidationError(
                "Only person type detail accounts can be linked to a user."
            )

    @property
    def ledger_user(self):
        return self.user


class UserLedgerBalance(models.Model):
    user = models.OneToOneField(
        CustomUser, on_delete=models.CASCADE, related_name="ledger_balance"
    )
    total_debit = MoneyField(
        max_digits=13, decimal_places=2, default=0, default_currency=DEFAULT_CURRENCY
    )
    total_credit = MoneyField(
        max_digits=13, decimal_places=2, default=0, default_currency=DEFAULT_CURRENCY
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "User Ledger Balance"
        verbose_name_plural = "User Ledger Balances"

    def __str__(self):
        side = self.balance_side
        amount = self.balance_amount
        return f"{self.user} - {side} {amount}" if amount else f"{self.user} - صفر"

    @property
    def currency_code(self):
        if self.total_debit is not None:
            return self.total_debit.currency.code
        if self.total_credit is not None:
            return self.total_credit.currency.code
        return DEFAULT_CURRENCY

    def _increment_money_field(self, field_name, amount):
        if amount is None:
            return False
        if isinstance(amount, Money):
            currency = amount.currency.code
        else:
            currency = self.currency_code
        money_amount = _ensure_money(amount, currency=currency)
        current_value = getattr(self, field_name)
        if current_value is None or current_value.amount == 0:
            current_value = Money(0, money_amount.currency)
        if money_amount.amount == 0:
            setattr(self, field_name, current_value)
            return True
        if current_value.currency != money_amount.currency:
            raise ValidationError("Currency mismatch for user ledger accumulation.")
        setattr(self, field_name, current_value + money_amount)
        return True

    def register_debit(self, amount, currency=DEFAULT_CURRENCY):
        updated = self._increment_money_field("total_debit", _ensure_money(amount, currency=currency))
        if updated:
            self.save(update_fields=["total_debit", "updated_at"])

    def register_credit(self, amount, currency=DEFAULT_CURRENCY):
        updated = self._increment_money_field(
            "total_credit", _ensure_money(amount, currency=currency)
        )
        if updated:
            self.save(update_fields=["total_credit", "updated_at"])

    @classmethod
    def record_entry(cls, *, user, debit=None, credit=None, currency=DEFAULT_CURRENCY):
        ledger, _ = cls.objects.get_or_create(user=user)
        updated_fields = []
        if debit is not None:
            ledger._increment_money_field("total_debit", _ensure_money(debit, currency=currency))
            updated_fields.append("total_debit")
        if credit is not None:
            ledger._increment_money_field(
                "total_credit", _ensure_money(credit, currency=currency)
            )
            updated_fields.append("total_credit")
        if updated_fields:
            updated_fields.append("updated_at")
            ledger.save(update_fields=updated_fields)
        return ledger

    @property
    def net_balance(self):
        return self.total_debit - self.total_credit

    @property
    def balance_amount(self):
        balance = self.net_balance
        return balance if balance.amount >= 0 else Money(-balance.amount, balance.currency)

    @property
    def balance_side(self):
        balance = self.net_balance
        if balance.amount > 0:
            return "بدهکار"
        if balance.amount < 0:
            return "بستانکار"
        return "متعادل"


class AccountingDocument(models.Model):
    class DocumentStatus(models.TextChoices):
        PROVISIONAL = "PROVISIONAL", "غیر قطعی"
        FINAL = "FINAL", "قطعی"

    number = models.CharField(max_length=30, unique=True)
    document_date = models.DateField(default=timezone.now)
    status = models.CharField(
        max_length=20, choices=DocumentStatus.choices, default=DocumentStatus.PROVISIONAL
    )
    description = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-document_date", "-created_at"]

    def __str__(self):
        return f"Document {self.number} ({self.get_status_display()})"

    @property
    def is_final(self):
        return self.status == AccountingDocument.DocumentStatus.FINAL

    def finalize(self):
        if self.lines.count() == 0:
            raise ValidationError("Cannot finalize an empty accounting document.")
        if self.total_debit != self.total_credit:
            raise ValidationError("Document must be balanced before finalizing.")
        self.status = AccountingDocument.DocumentStatus.FINAL
        self.save(update_fields=["status"])

    def revert_to_provisional(self):
        self.status = AccountingDocument.DocumentStatus.PROVISIONAL
        self.save(update_fields=["status"])

    @property
    def total_debit(self):
        total = Money(0, DEFAULT_CURRENCY)

        def _accumulate(current_total, value):
            if value is None:
                return current_total
            if current_total.currency != value.currency:
                if current_total.amount == 0:
                    return Money(value.amount, value.currency)
                if value.amount == 0:
                    return current_total
                raise ValidationError("Cannot sum amounts with different currencies.")
            return current_total + value

        for line in self.lines.all():
            total = _accumulate(total, line.debit)
        return total

    @property
    def total_credit(self):
        total = Money(0, DEFAULT_CURRENCY)

        def _accumulate(current_total, value):
            if value is None:
                return current_total
            if current_total.currency != value.currency:
                if current_total.amount == 0:
                    return Money(value.amount, value.currency)
                if value.amount == 0:
                    return current_total
                raise ValidationError("Cannot sum amounts with different currencies.")
            return current_total + value

        for line in self.lines.all():
            total = _accumulate(total, line.credit)
        return total

    def add_line(
        self,
        *,
        account,
        detail_account=None,
        debit=None,
        credit=None,
        currency=DEFAULT_CURRENCY,
        description="",
    ):
        if self.is_final:
            raise ValidationError("Cannot modify a finalized accounting document.")
        debit_money = _ensure_money(debit, currency=currency) if debit is not None else None
        credit_money = _ensure_money(credit, currency=currency) if credit is not None else None
        if debit_money and credit_money:
            raise ValidationError("A document line cannot have both debit and credit amounts.")
        if not debit_money and not credit_money:
            raise ValidationError("Either debit or credit must be provided for a document line.")
        if detail_account and detail_account.account_id != account.id:
            raise ValidationError("Detail account does not belong to the selected account.")
        if account.detail_level == Account.DetailLevel.ANALYTICAL and detail_account is None:
            raise ValidationError("Analytical accounts require a detail account to be specified.")
        return AccountingDocumentLine.objects.create(
            document=self,
            account=account,
            detail_account=detail_account,
            debit=debit_money,
            credit=credit_money,
            description=description,
        )


class AccountingDocumentLine(models.Model):
    document = models.ForeignKey(
        AccountingDocument, related_name="lines", on_delete=models.CASCADE
    )
    account = models.ForeignKey(Account, on_delete=models.PROTECT)
    detail_account = models.ForeignKey(
        DetailAccount, on_delete=models.PROTECT, null=True, blank=True
    )
    debit = MoneyField(
        max_digits=13, decimal_places=2, default_currency=DEFAULT_CURRENCY, null=True, blank=True
    )
    credit = MoneyField(
        max_digits=13, decimal_places=2, default_currency=DEFAULT_CURRENCY, null=True, blank=True
    )
    description = models.CharField(max_length=255, blank=True)

    class Meta:
        verbose_name = "Accounting Document Line"
        verbose_name_plural = "Accounting Document Lines"

    def clean(self):
        if self.debit and self.credit:
            raise ValidationError("Only debit or credit can be set, not both.")
        if not self.debit and not self.credit:
            raise ValidationError("Either debit or credit must be provided.")
        if self.detail_account and self.detail_account.account_id != self.account_id:
            raise ValidationError("Detail account does not belong to the selected account.")
        if (
            self.account.detail_level == Account.DetailLevel.ANALYTICAL
            and self.detail_account is None
        ):
            raise ValidationError("Analytical accounts require a detail account to be specified.")
        if self.document.is_final:
            raise ValidationError("Cannot modify a finalized accounting document.")

    @property
    def currency_code(self):
        if self.debit:
            return self.debit.currency.code
        if self.credit:
            return self.credit.currency.code
        return DEFAULT_CURRENCY

    def save(self, *args, **kwargs):
        self.full_clean()
        super().save(*args, **kwargs)

    def __str__(self):
        amount = self.debit or self.credit
        side = "بدهکار" if self.debit else "بستانکار"
        return f"{self.document.number} - {self.account.code} ({side} {amount})"


class DocumentWorkflowService:
    """Service helpers for managing accounting documents and their lines."""

    @staticmethod
    def create_document(*, number, document_date=None, description=""):
        return AccountingDocument.objects.create(
            number=number,
            document_date=document_date or timezone.now().date(),
            description=description,
        )

    @staticmethod
    def register_line(
        document: AccountingDocument,
        *,
        account: Account,
        detail_account: Optional[DetailAccount] = None,
        debit=None,
        credit=None,
        currency=DEFAULT_CURRENCY,
        description="",
        ledger_user: Optional[CustomUser] = None,
    ):
        line = document.add_line(
            account=account,
            detail_account=detail_account,
            debit=debit,
            credit=credit,
            currency=currency,
            description=description,
        )
        balance_user = ledger_user
        if balance_user is None and detail_account and detail_account.ledger_user:
            balance_user = detail_account.ledger_user
        if balance_user:
            UserLedgerBalance.record_entry(
                user=balance_user,
                debit=line.debit,
                credit=line.credit,
                currency=line.currency_code,
            )
        return line

    @staticmethod
    def finalize_document(document: AccountingDocument):
        with transaction.atomic():
            document.refresh_from_db()
            document.finalize()

    @staticmethod
    def register_sales_return(
        *,
        number: str,
        customer: Customer,
        amount,
        receivable_account: Account,
        sales_return_account: Account,
        receivable_detail: Optional[DetailAccount] = None,
        currency=DEFAULT_CURRENCY,
        description: str = "",
        reason: str = "",
    ):
        currency_code = amount.currency.code if isinstance(amount, Money) else currency
        money_amount = _ensure_money(amount, currency=currency_code)
        line_description = description or f"برگشت از فروش برای {customer}"
        with transaction.atomic():
            document = DocumentWorkflowService.create_document(
                number=number,
                description=line_description,
            )
            DocumentWorkflowService.register_line(
                document,
                account=sales_return_account,
                debit=money_amount,
                currency=money_amount.currency.code,
                description=line_description,
            )
            DocumentWorkflowService.register_line(
                document,
                account=receivable_account,
                detail_account=receivable_detail,
                credit=money_amount,
                currency=money_amount.currency.code,
                description=line_description,
                ledger_user=customer,
            )
            document.finalize()
            return SalesReturn.objects.create(
                document=document,
                customer=customer,
                amount=money_amount,
                reason=reason,
            )

    @staticmethod
    def register_purchase_return(
        *,
        number: str,
        seller: Seller,
        amount,
        payable_account: Account,
        purchase_return_account: Account,
        payable_detail: Optional[DetailAccount] = None,
        currency=DEFAULT_CURRENCY,
        description: str = "",
        reason: str = "",
    ):
        currency_code = amount.currency.code if isinstance(amount, Money) else currency
        money_amount = _ensure_money(amount, currency=currency_code)
        line_description = description or f"برگشت از خرید برای {seller}"
        with transaction.atomic():
            document = DocumentWorkflowService.create_document(
                number=number,
                description=line_description,
            )
            DocumentWorkflowService.register_line(
                document,
                account=payable_account,
                detail_account=payable_detail,
                debit=money_amount,
                currency=money_amount.currency.code,
                description=line_description,
                ledger_user=seller,
            )
            DocumentWorkflowService.register_line(
                document,
                account=purchase_return_account,
                credit=money_amount,
                currency=money_amount.currency.code,
                description=line_description,
            )
            document.finalize()
            return PurchaseReturn.objects.create(
                document=document,
                seller=seller,
                amount=money_amount,
                reason=reason,
            )

class SalesReturn(models.Model):
    document = models.OneToOneField(
        AccountingDocument, on_delete=models.CASCADE, related_name="sales_return"
    )
    customer = models.ForeignKey(
        Customer, on_delete=models.PROTECT, related_name="sales_returns"
    )
    amount = MoneyField(
        max_digits=13, decimal_places=2, default_currency=DEFAULT_CURRENCY
    )
    reason = models.CharField(max_length=255, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Sales Return"
        verbose_name_plural = "Sales Returns"

    def __str__(self):
        return f"برگشت از فروش {self.customer} - {self.amount}"

    def clean(self):
        super().clean()
        if not self.document.is_final:
            raise ValidationError("Sales return documents must be finalized.")
        total_debit = self.document.total_debit
        total_credit = self.document.total_credit
        if total_debit != total_credit:
            raise ValidationError("Sales return document must be balanced.")
        if total_debit != self.amount:
            raise ValidationError("Sales return amount must match document totals.")

    @property
    def currency_code(self):
        return self.amount.currency.code


class PurchaseReturn(models.Model):
    document = models.OneToOneField(
        AccountingDocument, on_delete=models.CASCADE, related_name="purchase_return"
    )
    seller = models.ForeignKey(
        Seller, on_delete=models.PROTECT, related_name="purchase_returns"
    )
    amount = MoneyField(
        max_digits=13, decimal_places=2, default_currency=DEFAULT_CURRENCY
    )
    reason = models.CharField(max_length=255, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Purchase Return"
        verbose_name_plural = "Purchase Returns"

    def __str__(self):
        return f"برگشت از خرید {self.seller} - {self.amount}"

    def clean(self):
        super().clean()
        if not self.document.is_final:
            raise ValidationError("Purchase return documents must be finalized.")
        total_debit = self.document.total_debit
        total_credit = self.document.total_credit
        if total_debit != total_credit:
            raise ValidationError("Purchase return document must be balanced.")
        if total_credit != self.amount:
            raise ValidationError("Purchase return amount must match document totals.")

    @property
    def currency_code(self):
        return self.amount.currency.code


# کلاس امورمالیاتی
class TaxSetting(models.Model):
    # Fields for tax setting details
    tax_name = models.CharField(max_length=50, unique=True)
    tax_rate = models.DecimalField(max_digits=5, decimal_places=2)

class TaxOperation(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    operation_type = models.ForeignKey(TaxSetting , max_length=50, on_delete=models.CASCADE )
    amount = MoneyField(max_digits=13, decimal_places=2, default_currency='IRR', null=True)
    # دیگر فیلدها

    def __str__(self):
        return f"{self.user} - {self.operation_type} - {self.amount}"

    def save(self, *args, **kwargs):
        # در اینجا می‌توانید منطق خاصی برای ذخیره‌سازی اضافه کنید
        super().save(*args, **kwargs)

    def get_total_tax_amount(self):
        # این تابع مجموع تمام عملیات مالیاتی را برمی‌گرداند
        total_tax_amount = TaxOperation.objects.filter(user=self.user).aggregate(
            total=models.Sum('amount')
        )['total']
        return total_tax_amount

    def get_tax_operations_by_type(self, operation_type):
        # این تابع لیست عملیات‌های مالیاتی با نوع خاص را برمی‌گرداند
        tax_operations = TaxOperation.objects.filter(user=self.user, operation_type=operation_type)
        return tax_operations

    def get_tax_operations_by_amount_range(self, min_amount, max_amount):
        # این تابع لیست عملیات‌های مالیاتی با مبلغ در محدوده مشخص را برمی‌گرداند
        tax_operations = TaxOperation.objects.filter(user=self.user, amount__range=(min_amount, max_amount))
        return tax_operations

    def get_total_tax_amount_by_type(self, operation_type):
        # این تابع مجموع مبالغ عملیات‌های مالیاتی با نوع خاص را برمی‌گرداند
        total_tax_amount = TaxOperation.objects.filter(user=self.user, operation_type=operation_type).aggregate(
            total=models.Sum('amount')
        )['total']
        return total_tax_amount

    def get_total_tax_amount_by_amount_range(self, min_amount, max_amount):
        # این تابع مجموع مبالغ عملیات‌های مالیاتی در محدوده مشخص را برمی‌گرداند
        total_tax_amount = TaxOperation.objects.filter(user=self.user, amount__range=(min_amount, max_amount)).aggregate(
            total=models.Sum('amount')
        )['total']
        return total_tax_amount


class Debt(models.Model):
    seller = models.ForeignKey(Seller, on_delete=models.CASCADE)
    amount = MoneyField(max_digits=13 ,decimal_places=2, default_currency='IRR', null=True)
    description = models.TextField()
    date = models.DateTimeField(auto_now_add=True)
    debtor = models.CharField(max_length=100)
    is_paid = models.BooleanField(default=False)

    def __str__(self):
        paid_status = "Paid" if self.is_paid else "Unpaid"
        return f"Debt:{self.seller} - {self.amount} (Debtor: {self.debtor}, Status: {paid_status})"

    @classmethod
    def create_debt(cls, seller, amount, description):
        """
        ایجاد یک بدهی جدید برای فروشنده
        """
        currency_code = (
            amount.currency.code if isinstance(amount, Money) else DEFAULT_CURRENCY
        )
        money_amount = _ensure_money(amount, currency=currency_code)
        if money_amount.amount < 0:
            raise ValidationError("Debt amount cannot be negative.")
        debt = cls(
            seller=seller,
            amount=money_amount,
            description=description,
        )
        debt.save()
        return debt


    def add_debt(self, additional_amount):
        """Add to the existing debt amount."""
        base_currency = self.amount.currency.code if self.amount else DEFAULT_CURRENCY
        money_amount = _ensure_money(additional_amount, currency=base_currency)
        if money_amount.amount < 0:
            raise ValidationError("Additional amount cannot be negative.")
        current_amount = self.amount or Money(0, base_currency)
        self.amount = current_amount + money_amount
        self.is_paid = False
        self.save()

    def make_payment(self, payment_amount):
        """Make a payment towards the debt."""
        base_currency = self.amount.currency.code if self.amount else DEFAULT_CURRENCY
        money_amount = _ensure_money(payment_amount, currency=base_currency)
        if money_amount.amount < 0:
            raise ValidationError("Payment amount cannot be negative.")
        if money_amount > (self.amount or Money(0, base_currency)):
            raise ValidationError("Payment amount cannot exceed the debt amount.")
        self.amount = (self.amount or Money(0, base_currency)) - money_amount
        if self.amount.amount == 0:
            self.is_paid = True
        else:
            self.is_paid = False
        self.save()


    @classmethod
    def get_debts_for_seller(cls, seller):
        """
        دریافت تمام بدهی‌های یک فروشنده خاص
        """
        return cls.objects.filter(seller=seller)

    @classmethod
    def get_total_debt_for_seller(cls, seller):
        """
        محاسبه مجموع بدهی‌های یک فروشنده خاص
        """
        debts = cls.get_debts_for_seller(seller)
        total_debt = debts.aggregate(total=Sum('amount'))['total']
        if total_debt is None:
            return Money(0, DEFAULT_CURRENCY)
        return total_debt

    def update_description(self, new_description):
        """
        به‌روزرسانی توضیحات برای بدهی فروشنده
        """
        self.description = new_description
        self.save()

    def delete_debt(self):
        """
        حذف بدهی از سیستم
        """
        self.delete()

class Refund(models.Model):
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE)
    amount = MoneyField(max_digits=13 ,decimal_places=2, default_currency='IRR', null=True)
    description = models.TextField()
    date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.customer} - {self.amount} - {self.date}"

    @staticmethod
    def create_refund(customer, amount, description):
        """
        تابعی برای ایجاد یک تراکنش بازپرداخت
        """
        currency_code = (
            amount.currency.code if isinstance(amount, Money) else DEFAULT_CURRENCY
        )
        money_amount = _ensure_money(amount, currency=currency_code)
        if money_amount.amount < 0:
            raise ValidationError("Refund amount cannot be negative.")
        refund = Refund(
            customer=customer,
            amount=money_amount,
            description=description,
        )
        refund.save()
        return refund

    @staticmethod
    def get_customer_refunds(customer):
        """
        تابعی برای گرفتن تمام تراکنش‌های بازپرداخت یک مشتری
        """
        return Refund.objects.filter(customer=customer)

    @staticmethod
    def get_order_refunds(order):
        """
        تابعی برای گرفتن تمام تراکنش‌های بازپرداخت مرتبط با یک سفارش
        """
        return Refund.objects.filter(order=order)

class Salary(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    amount = MoneyField(max_digits=13 ,decimal_places=2, default_currency='IRR', null=True)
    payment_date = models.DateField()
    description = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"{self.user}'s Salary - {self.payment_date}"

    def calculate_monthly_payment(self):
        # محاسبه حقوق ماهیانه بر اساس میزان حضور و مرخصی ها و مقدار پایه حقوق
        base_salary = self.user.base_salary  # فرضاً پایه حقوق کاربر را از مدل CustomUser بگیریم
        # محاسبه میزان حضور کاربر در ماه جاری (می‌توانید از یک تابع دیگر برای این کار استفاده کنید)
        attendance_days = self.calculate_attendance_days()
        # محاسبه میزان مرخصی کاربر در ماه جاری (می‌توانید از یک تابع دیگر برای این کار استفاده کنید)
        leave_days = self.calculate_leave_days()

        # محاسبه حقوق ماهیانه با در نظر گرفتن پایه حقوق، میزان حضور و مرخصی
        monthly_salary = base_salary * (attendance_days / 30) - (base_salary / 30) * leave_days
        return monthly_salary

#  کلاس وام و نسیه



class LoanRequest(models.Model):
    customer = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    approved = models.BooleanField(default=False)


class LoanApplication(models.Model):
    name = models.CharField(max_length=255, default="/")
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name="LoanUser")
    loan_request = models.ForeignKey(LoanRequest, on_delete=models.CASCADE)
    company_id = models.ForeignKey(Organization, on_delete=models.CASCADE, null=True, blank=True)
    state = models.CharField(max_length=9, choices=[
        ("draft", "Draft"),
        ("posted", "Posted"),
        ("cancelled", "Cancelled"),
        ("closed", "Closed"),
    ], default="draft")
    periods = models.IntegerField()
    method_period = models.IntegerField(default=1)
    rate = models.FloatField(default=0.0)
    rate_period = models.FloatField()
    rate_type = models.CharField(max_length=4, choices=[
        ("napr", "Nominal APR"),
        ("ear", "EAR"),
        ("real", "Real rate"),
    ], default="napr")
    loan_type = models.CharField(max_length=19, choices=[
        ("fixed-annuity", "Fixed Annuity"),
        ("fixed-annuity-begin", "Fixed Annuity Begin"),
        ("fixed-principal", "Fixed Principal"),
        ("interest", "Only interest"),
    ], default="fixed-annuity")
    fixed_amount = MoneyField(max_digits=13, decimal_places=2)
    fixed_loan_amount = MoneyField(max_digits=13, decimal_places=2)
    fixed_periods = models.IntegerField(default=0)
    loan_amount = MoneyField(max_digits=13, decimal_places=2)
    residual_amount = MoneyField(max_digits=13, decimal_places=2)
    round_on_end = models.BooleanField(default=False)
    payment_on_first_period = models.BooleanField(default=False)
    post_invoice = models.BooleanField(default=True)
    start_date = models.DateField(default=timezone.now)
    end_date = models.DateField(null=True, blank=True)
    is_approved = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)

    def _compute_total_amounts(self):
        """محاسبه مبلغ باقی‌مانده، مجموع پرداختی و مجموع سودها"""

        if self.loan_amount is None:
            raise ValidationError("Loan amount must be set before computing totals.")

        loan_currency = self.loan_amount.currency.code
        total_interests = (
            self.loanpayment_set.filter(is_paid=True)
            .aggregate(Sum('amount'))
            .get('amount__sum')
        )
        total_payments = (
            self.loanpayment_set.filter(is_paid=True)
            .aggregate(Sum('amount'))
            .get('amount__sum')
        )
        total_interests = total_interests or Money(0, loan_currency)
        total_payments = total_payments or Money(0, loan_currency)
        self.interests_amount = total_interests
        self.payment_amount = total_payments
        self.pending_principal_amount = self.loan_amount - total_payments

        if self.pending_principal_amount <= 0:
            self.state = "closed"
        else:
            self.state = "posted"
        self.save()
    def _compute_currency(self):
        # محاسبه ارز مرتبط با وام
        # اینجا فرض بر این است که وام همواره از یک ارز مشخص استفاده می‌کند
        return self.loan_amount.currency

    def _compute_fixed_amount(self):
        # محاسبه مبلغ ثابت وام
        if self.loan_type == "fixed-annuity":
            # اگر نوع وام معادل با "fixed-annuity" باشد، مبلغ ثابت برابر با مبلغ وام است
            self.fixed_amount = self.loan_amount
        elif self.loan_type == "fixed-annuity-begin":
            # اگر نوع وام معادل با "fixed-annuity-begin" باشد، مبلغ ثابت برابر با مبلغ وام منهای مبلغ اولین اقساط است
            self.fixed_amount = self.loan_amount - self.fixed_loan_amount

    def _compute_rate_period(self):
        """محاسبه نرخ دوره وام"""
        if self.rate_type == "napr":
            # اگر نوع نرخ معادل با "napr" باشد، نرخ دوره برابر با نرخ وام تقسیطی است
            self.rate_period = self.rate / self.periods
        elif self.rate_type == "ear":
            # اگر نوع نرخ معادل با "ear" باشد، نرخ دوره برابر با نرخ سود معادل است
            self.rate_period = self.rate
        elif self.rate_type == "real":
            # اگر نوع نرخ معادل با "real" باشد، نرخ دوره برابر با نرخ واقعی است
            # در اینجا باید محاسبات مخصوص به نرخ واقعی انجام شود
            pass  # اینجا محاسبات مخصوص به نرخ واقعی را اضافه کنید

    def _compute_journal_type(self):
        """محاسبه نوع ژورنال بر اساس ویژگی‌های وام"""
        if self.loan_type == "fixed-annuity" or self.loan_type == "fixed-annuity-begin":
            self.journal_type = "fixed-annuity-journal"
        else:
            self.journal_type = "other-journal"

    def calculate_monthly_payment(self):
        """محاسبه پرداخت ماهیانه"""

        if self.periods == 0:
            return 0

        monthly_interest_rate = self.rate_period / 12 / 100
        numerator = monthly_interest_rate * (1 + monthly_interest_rate) ** self.periods
        denominator = (1 + monthly_interest_rate) ** self.periods - 1

        monthly_payment = self.loan_amount * (numerator / denominator)
        return monthly_payment

    def approve_loan(self):
        """تایید وام"""

        self.state = "posted"
        self.save()

    def cancel_loan(self):
        """انصراف از وام"""

        self.state = "cancelled"
        self.save()

    def close_loan(self):
        """بسته شدن وام"""

        self.state = "closed"
        self.save()

    def generate_schedule(self):
        """تولید برنامه پرداخت (در حال حاضر پیاده‌سازی نشده است)"""

        pass

    def calculate_outstanding_balance(self):
        """محاسبه مانده وام"""

        outstanding_balance = self.pending_principal_amount + self.interests_amount
        return outstanding_balance

class LoanPayment(models.Model):
    loan = models.ForeignKey(LoanApplication, on_delete=models.CASCADE)
    due_date = models.DateField()
    amount = MoneyField(max_digits=13, decimal_places=2, default_currency='IRR', null=True)
    is_paid = models.BooleanField(default=False)

    def save(self, *args, **kwargs):
        # Ensure due date is not in the past
        if self.due_date and self.due_date < timezone.now().date():
            raise ValidationError("Due date cannot be in the past.")
        super().save(*args, **kwargs)

# Assuming you have Product, Store models already defined
class CostAttribute(models.Model):
    name = models.CharField(max_length=100, unique=True)
    value = models.DecimalField(max_digits=10, decimal_places=2)
    description = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.name

    def get_name(self):
        return self.name

    def set_name(self, name):
        self.name = name

    def get_value(self):
        return self.value

    def set_value(self, value):
        self.value = value

    def get_description(self):
        return self.description

    def set_description(self, description):
        self.description = description

class CurrencyExchangeRate(models.Model):
    source_currency = models.CharField(max_length=3)
    target_currency = models.CharField(max_length=3)
    exchange_rate = models.DecimalField(max_digits=10, decimal_places=6)

    @classmethod
    def get_exchange_rate(cls, source_currency, target_currency):
        """
        بازیابی نرخ تبدیل بین دو ارز
        """
        try:
            exchange_rate = cls.objects.get(
                source_currency=source_currency,
                target_currency=target_currency
            )
            return exchange_rate.exchange_rate
        except cls.DoesNotExist:
            return None

    @classmethod
    def set_exchange_rate(cls, source_currency, target_currency, exchange_rate):
        """
        تعیین نرخ تبدیل بین دو ارز
        """
        exchange_rate, created = cls.objects.update_or_create(
            source_currency=source_currency,
            target_currency=target_currency,
            defaults={'exchange_rate': exchange_rate}
        )
        return exchange_rate

    def __str__(self):
        return f"{self.source_currency}/{self.target_currency}: {self.exchange_rate}"

#کلاس میزان سرمایه شرکت (CompanyCapital)
class CompanyCapital(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    capital_amount = models.DecimalField(max_digits=12, decimal_places=2, default=0)

    def add_to_capital(self, amount):
        """Add to the company's capital."""
        if amount < 0:
            raise ValidationError("Amount must be positive to add to capital.")
        self.capital_amount += amount
        self.save()

    def reduce_capital(self, amount):
        """Reduce the company's capital."""
        if amount < 0 or amount > self.capital_amount:
            raise ValidationError("Invalid amount to reduce from capital.")
        self.capital_amount -= amount
        self.save()

    def __str__(self):
        return f"Company Capital: {self.capital_amount}"

#کلاس سهام (Stock)
class Stock(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    number_of_shares = models.IntegerField(default=0)
    price_per_share = models.DecimalField(max_digits=10, decimal_places=2)

    def buy_shares(self, quantity, price):
        """Buy shares at a specific price."""
        if quantity < 0 or price < 0:
            raise ValidationError("Quantity and price must be positive.")
        self.number_of_shares += quantity
        self.price_per_share = price
        self.save()

    def sell_shares(self, quantity):
        """Sell a number of shares."""
        if quantity < 0:
            raise ValidationError("Quantity must be positive.")
        if quantity > self.number_of_shares:
            raise ValidationError("Cannot sell more shares than owned.")
        self.number_of_shares -= quantity
        self.save()

    def update_share_price(self, new_price):
        """Update the price of the shares."""
        if new_price < 0:
            raise ValidationError("New price must be positive.")
        self.price_per_share = new_price
        self.save()

    def __str__(self):
        return f"Stock: {self.number_of_shares} shares at {self.price_per_share} each"

#کلاس سود و زیان (ProfitLoss)
class ProfitLoss(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    total_income = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    total_expenses = models.DecimalField(max_digits=10, decimal_places=2, default=0)

    @property
    def profit(self):
        """Calculate the profit of the company."""
        if self.total_income >= self.total_expenses:
            return self.total_income - self.total_expenses
        return 0

    @property
    def loss(self):
        """Calculate the loss of the company."""
        if self.total_expenses > self.total_income:
            return self.total_expenses - self.total_income
        return 0

    def add_income(self, amount):
        """Add income to the total income."""
        if amount < 0:
            raise ValidationError("Income amount cannot be negative.")
        self.total_income += amount
        self.save()

    def add_expense(self, amount):
        """Add expense to the total expenses."""
        if amount < 0:
            raise ValidationError("Expense amount cannot be negative.")
        self.total_expenses += amount
        self.save()

    def __str__(self):
        return f"Profit/Loss Statement: Income - {self.total_income}, Expenses - {self.total_expenses}"

class DocumentLimit(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    max_documents = models.IntegerField()
    current_documents = models.IntegerField(default=0)

    def add_document(self):
        """Add a document if the limit is not reached."""
        if self.current_documents < self.max_documents:
            self.current_documents += 1
            self.save()
        else:
            raise ValidationError("Maximum document limit reached.")

    def remove_document(self):
        """Remove a document, ensuring the count doesn't go below zero."""
        if self.current_documents > 0:
            self.current_documents -= 1
            self.save()
        else:
            raise ValidationError("No documents to remove.")

    def is_limit_reached(self):
        """Check if the document limit is reached."""
        return self.current_documents >= self.max_documents

    def __str__(self):
        return f"Document Limit for {self.user}: {self.current_documents}/{self.max_documents}"

#کلاس منابع شرکت (CompanyResources)
class CompanyResources(models.Model):
    user = models.ForeignKey(Organization, on_delete=models.CASCADE)
    resource_name = models.CharField(max_length=100)
    income_amount = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    description = models.TextField()
    @classmethod
    def total_income_from_resources(cls):
        """Calculate the total income from all resources."""
        return cls.objects.aggregate(models.Sum('income_amount'))['income_amount__sum'] or 0

    def add_income(self, amount):
        """Add income to a specific resource."""
        if amount < 0:
            raise ValidationError("Income amount must be positive.")
        self.income_amount += amount
        self.save()

    def __str__(self):
        return f"Resource: {self.resource_name}, Income: {self.income_amount}"

#کلاس مدیریت و ثبت چک (CheckManagement)
class CheckManagement(models.Model):
    CHECK_STATUSES = (
        ('issued', 'Issued'),
        ('cleared', 'Cleared'),
        ('bounced', 'Bounced'),
        ('cancelled', 'Cancelled'),
    )

    check_number = models.CharField(max_length=100, unique=True)
    status = models.CharField(max_length=50, choices=CHECK_STATUSES, default='issued')

    def change_status(self, new_status):
        """Change the status of the check."""
        if new_status not in [status[0] for status in self.CHECK_STATUSES]:
            raise ValidationError("Invalid status for a check.")
        self.status = new_status
        self.save()

    def __str__(self):
        return f"Check Number: {self.check_number}, Status: {self.status}"


#کلاس تنخواه و تنخواه‌دار (PettyCash)
class PettyCash(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    amount = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    custodian = models.CharField(max_length=100)

    def allocate_funds(self, allocation_amount):
        """Allocate funds to the petty cash."""
        if allocation_amount < 0:
            raise ValidationError("Allocation amount must be positive.")
        self.amount += allocation_amount
        self.save()

    def use_funds(self, usage_amount):
        """Use funds from the petty cash."""
        if usage_amount < 0 or usage_amount > self.amount:
            raise ValidationError("Invalid usage amount.")
        self.amount -= usage_amount
        self.save()

    def __str__(self):
        return f"Petty Cash Amount: {self.amount}, Custodian: {self.custodian}"


#کلاس مدیریت و ثبت سفته (PromissoryNoteManagement)
class PromissoryNoteManagement(models.Model):
    NOTE_STATUSES = (
        ('issued', 'Issued'),
        ('redeemed', 'Redeemed'),
        ('defaulted', 'Defaulted'),
    )
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, blank=True,null=True)
    organization = models.ForeignKey(Organization,related_name="orgpnm" , blank=True,null=True, on_delete=models.CASCADE)
    note_number = models.CharField(max_length=100, unique=True)
    status = models.CharField(max_length=50, choices=NOTE_STATUSES, default='issued')
    def change_status(self, new_status):
        """Change the status of the promissory note."""
        if new_status not in [status[0] for status in self.NOTE_STATUSES]:
            raise ValidationError("Invalid status for a promissory note.")
        self.status = new_status
        self.save()

    def __str__(self):
        return f"Promissory Note Number: {self.note_number}, Status: {self.status}"