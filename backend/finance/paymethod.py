from backend.users.models import Customer
from django.db import models
from django.utils import timezone
from djmoney.models.fields import MoneyField
from backend.models import CustomUser
from backend.orders.invoice import Invoice
from rest_framework.exceptions import ValidationError


# کلاس روش‌های پرداخت
class PaymentMethod(models.Model):
    METHOD_CHOICES = [
        ('online', 'Online Payment'),
        ('wallet', 'Wallet Payment'),
        ('offline', 'Offline Payment'),
    ]

    name = models.CharField(max_length=50, choices=METHOD_CHOICES, unique=True)
    description = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.name

    @classmethod
    def get_online_payment_method(cls):
        """
        بازگرداندن روش پرداخت آنلاین
        """
        try:
            return cls.objects.get(name='online')
        except cls.DoesNotExist:
            return None

    @classmethod
    def get_wallet_payment_method(cls):
        """
        بازگرداندن روش پرداخت از طریق کیف پول
        """
        try:
            return cls.objects.get(name='wallet')
        except cls.DoesNotExist:
            return None

    @classmethod
    def get_offline_payment_method(cls):
        """
        بازگرداندن روش پرداخت آفلاین
        """
        try:
            return cls.objects.get(name='offline')
        except cls.DoesNotExist:
            return None
        

class Payment(models.Model):
    ip_address = models.GenericIPAddressField()
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE)
    invoice = models.OneToOneField(Invoice, on_delete=models.CASCADE, unique=True)
    amount = MoneyField(max_digits=13, decimal_places=2, default_currency='IRR', null=True)
    payment_method = models.ForeignKey(PaymentMethod, on_delete=models.CASCADE, null=True)
    payment_time = models.DateTimeField()

    def save(self, *args, **kwargs):
        # اطمینان حاصل کنید که تاریخ سررسید پرداخت در گذشته نیست
        if self.payment_time and self.payment_time.date() < timezone.now().date():
            raise ValidationError("تاریخ سررسید نمی‌تواند در گذشته باشد.")

        # تعیین مبلغ پرداخت بر اساس مجموع قیمت فاکتور انتخاب شده
        self.amount = self.invoice.total_price if self.invoice else None
        super(Payment, self).save(*args, **kwargs)


    @classmethod
    def create_payment(cls, customer, invoice, payment_method, amount):
        """
        تابعی برای ایجاد تراکنش پرداخت جدید
        """
        try:
            payment = cls(customer=customer, invoice=invoice, payment_method=payment_method, amount=amount)
            payment.save()
            return payment
        except Exception as e:
            raise ValidationError(str(e))

    @classmethod
    def get_payments(cls, customer):
        """
        تابعی برای دریافت تمام تراکنش‌های مالی یک مشتری
        """
        return cls.objects.filter(customer=customer)

    @classmethod
    def get_customer_payments(cls, customer, invoice):
        """
        تابعی برای دریافت تمام تراکنش‌های مالی یک مشتری بر اساس فاکتور مشخص
        """
        return cls.objects.filter(customer=customer, invoice=invoice)



class PaymentHistory(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    total_payments = models.DecimalField(max_digits=13, decimal_places=2, default=0.0)
    last_payment_date = models.DateTimeField(null=True, blank=True)
    #
    # def add_payment(self, amount, currency='IRR'):
    #     """
    #     افزودن تراکنش پرداخت به تاریخچه پرداخت
    #     """
    #     money_amount = Money(amount, currency)
    #     self.total_payments += money_amount
    #     self.last_payment_date = timezone.now()
    #     self.save()

    def get_total_payments(self):
        """
        دریافت مجموع تمام پرداخت‌ها
        """
        return self.total_payments

    def get_last_payment_date(self):
        """
        دریافت تاریخ آخرین پرداخت
        """
        return self.last_payment_date

    def __str__(self):
        return f"تاریخچه پرداخت برای کاربر {self.user}"
    

# class Transaction(models.Model):
#     invoice = models.ForeignKey(Invoice, on_delete=models.CASCADE)
#     customer = models.ForeignKey(Customer, on_delete=models.CASCADE)
#     amount = MoneyField(max_digits=13, decimal_places=2, default_currency='IRR')
#     payment_method = models.ForeignKey(PaymentMethod, on_delete=models.CASCADE)
#     payment_time = models.DateTimeField()
#
#     @classmethod
#     def create_transaction(cls, invoice, customer, payment_method, payment_time):
#         """
#         ایجاد تراکنش جدید
#         """
#         amount = invoice.total_price  # مبلغ تراکنش برابر با مجموع فاکتور
#         transaction = cls(
#             invoice=invoice,
#             customer=customer,
#             amount=amount,
#             payment_method=payment_method,
#             payment_time=payment_time,
#         )
#         transaction.save()
#         return transaction
#
#     def __str__(self):
#         return f"Customer {self.customer} - Invoice: {self.invoice} - Amount: {self.amount} - Payment Method: {self.payment_method}"


# class PaymentGateway:
#     objects = None
#
#     def __init__(self, customer):
#         self.customer = customer
#
#     def process_payment(self, invoice, payment_method):
#         try:
#             # ایجاد یک تراکنش پرداخت جدید
#             payment = Payment(
#                 customer=self.customer,
#                 invoice=invoice,
#                 payment_method=payment_method,
#                 amount=invoice.total_price,  # مبلغ پرداخت برابر با مجموع فاکتور
#                 payment_time=timezone.now()  # زمان پرداخت را تنظیم کنید
#             )
#             payment.save()
#
#             # افزایش موجودی کیف پول کاربر در صورت استفاده از کیف پول به عنوان متد پرداخت
#             if payment_method == 'wallet':
#                 # افزایش موجودی کیف پول
#                 self.customer.wallet.add_funds(invoice.total_price.amount, invoice.total_price.currency)
#
#             return True, "پرداخت با موفقیت انجام شد."
#
#         except Exception as e:
#             return False, str(e)