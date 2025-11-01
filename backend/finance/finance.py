from backend.users.models import Courier, Seller, Customer, Organization
from django.core.exceptions import ValidationError
from backend.models import *
from django.db.models import Sum
from django.utils import timezone
from djmoney.models.fields import MoneyField

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

    def create_expense(self, amount, currency='IRR'):
        """
        ایجاد هزینه جدید برای پیک
        """
        money_amount = MoneyField(amount, currency)
        self.amount += money_amount
        self.save()

    def get_balance(self):
        """
        دریافت موجودی فعلی کیف پول پیک
        """
        return self.amount

# کلاس درآمد
class Income(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name="userincome")
    amount = MoneyField(max_digits=13, decimal_places=2, default_currency='IRR', null=True)
    # دیگر فیلدها

    def __str__(self):
        return f"Income for Seller: {self.user} - Amount: {self.amount}"

    def add_income(self, amount, currency='IRR'):
        """
        افزودن درآمد به حساب فروشنده
        """
        money_amount = MoneyField(amount, currency)
        self.amount += money_amount
        self.save()

    def get_total_income(self):
        """
        دریافت مجموع درآمد فروشنده
        """
        return self.amount

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
    commission = models.IntegerField(max_length=2,null=True,blank=True)
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
        return cls.objects.create(user=user, bank_account_number=bank_account_number, tax_number=tax_number)

    def update_financial_key(self, bank_account_number, tax_number):
        self.bank_account_number = bank_account_number
        self.tax_number = tax_number
        self.save()

    def delete_financial_key(self):
        self.delete()

    @classmethod
    def get_financial_key_by_user(cls, user):
        return cls.objects.filter(user=user).first()

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
        debt = cls(seller=seller, amount=amount, description=description)
        debt.save()
        return debt


    def add_debt(self, additional_amount):
        """Add to the existing debt amount."""
        if additional_amount < 0:
            raise ValidationError("Additional amount cannot be negative.")
        self.amount += additional_amount
        self.is_paid = False
        self.save()

    def make_payment(self, payment_amount):
        """Make a payment towards the debt."""
        if payment_amount < 0:
            raise ValidationError("Payment amount cannot be negative.")
        if payment_amount > self.amount:
            raise ValidationError("Payment amount cannot exceed the debt amount.")
        self.amount -= payment_amount
        if self.amount == 0:
            self.is_paid = True
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
        return total_debt if total_debt else MoneyField(0, 'IRR')

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
        refund = Refund(customer=customer, amount=amount, description=description)
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
    # محاسبه موارد مختلفی نظیر مبلغ باقی‌مانده، مجموع پرداختی و مجموع سودهاست
        total_interests = self.loanpayment_set.filter(is_paid=True).aggregate(Sum('amount'))['amount__sum'] or 0
        total_payments = self.loanpayment_set.filter(is_paid=True).aggregate(Sum('amount'))['amount__sum'] or 0
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
    # محاسبه نرخ دوره وام
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
        # محاسبه نوع ژورنال بر اساس ویژگی‌های وام
        if self.loan_type == "fixed-annuity" or self.loan_type == "fixed-annuity-begin":
            self.journal_type = "fixed-annuity-journal"
        else:
            self.journal_type = "other-journal"
    def calculate_monthly_payment(self):
        # محاسبه پرداخت ماهیانه
        if self.periods == 0:
            return 0

        monthly_interest_rate = self.rate_period / 12 / 100
        numerator = monthly_interest_rate * (1 + monthly_interest_rate) ** self.periods
        denominator = (1 + monthly_interest_rate) ** self.periods - 1

        monthly_payment = self.loan_amount * (numerator / denominator)
        return monthly_payment

    def approve_loan(self):
        # تایید وام
        self.state = "posted"
        self.save()

    def cancel_loan(self):
        # انصراف از وام
        self.state = "cancelled"
        self.save()

    def close_loan(self):
        # بسته شدن وام
        self.state = "closed"
        self.save()

    def generate_schedule(self):
        # تولید برنامه پرداخت
        pass  # اینجا باید تولید برنامه پرداخت وام انجام شود

    def calculate_outstanding_balance(self):
        # محاسبه مانده وام
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