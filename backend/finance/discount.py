from backend.models import *
from backend.users.models import Customer
from django.db import models
from backend.orders.order import Order
from backend.products.product import Product


# کلاس تخفیفات
class Discount(models.Model):
    name = models.CharField(max_length=100)  # نام تخفیف
    code = models.CharField(max_length=20, unique=True)  # کد تخفیف
    description = models.TextField(blank=True, null=True)  # توضیحات تخفیف
    percentage = models.DecimalField(max_digits=5, decimal_places=2, blank=True, null=True)  # درصد تخفیف
    amount = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)  # مقدار تخفیف
    users = models.ManyToManyField(Customer, blank=True)  # کاربران مشخصی که می‌توانند از تخفیف استفاده کنند
    applicable_to_products = models.ManyToManyField(Product, blank=True)  # محصولاتی که تخفیف بر روی آنها قابل اعمال است
    applicable_to_orders = models.ManyToManyField(Order, blank=True)  # فاکتورهایی که تخفیف بر روی آنها قابل اعمال است

    def apply_discount_to_order(self, order):
        if self.is_applicable_to_order(order):
            if self.percentage is not None:
                # اعمال تخفیف به مقدار درصدی بر روی فاکتور
                order.total_price -= (order.total_price * (self.percentage / 100))
            elif self.amount is not None:
                # اعمال تخفیف به مقدار مشخص
                order.total_price -= self.amount
            order.save()

    def apply_discount_to_product(self, product):
        if self.is_applicable_to_product(product):
            if self.percentage is not None:
                # اعمال تخفیف به مقدار درصدی بر روی محصول
                product.price -= (product.price * (self.percentage / 100))
            elif self.amount is not None:
                # اعمال تخفیف به مقدار مشخص
                product.price -= self.amount
            product.save()

    def is_applicable_to_order(self, order):
        # بررسی اینکه آیا تخفیف بر روی فاکتور قابل اعمال است یا خیر
        if self.applicable_to_orders.filter(id=order.id).exists():
            return True
        return False

    def is_applicable_to_product(self, product):
        # بررسی اینکه آیا تخفیف بر روی محصول قابل اعمال است یا خیر
        if self.applicable_to_products.filter(id=product.id).exists():
            return True
        return False
    
    def __str__(self):
        return self.name




# کلاس بن خرید
class Voucher(models.Model):
    code = models.CharField(max_length=20, unique=True)  # کد بن خرید
    discount = models.ForeignKey(Discount, on_delete=models.CASCADE)  # تخفیف مرتبط با بن خرید
    users = models.ManyToManyField(Customer)  # کاربران مشخصی که می‌توانند از بن خرید استفاده کنند
    applicable_to_orders = models.ManyToManyField(Order)  # فاکتورهایی که بن خرید بر روی آنها قابل اعمال است

    def __str__(self):
        return f"کد بن خرید: {self.code} - تخفیف: {self.discount}"

    def apply_to_order(self, order):
        if self.is_valid_for_order(order):
            # اعمال تخفیف به سفارش
            # ایجاد یک آیتم تخفیف در سفارش
            discount_item = Voucher(voucher=self, order=order)
            discount_item.save()
            return True
        return False

    def is_valid_for_order(self, order):
        # اعتبارسنجی بن خرید برای سفارش
        # اینجا قوانین اعتبارسنجی بن خرید را اضافه کنید
        return True  # اگر بن خرید معتبر باشد، True برگردانید، در غیر این صورت False

    def calculate_discount_amount(self, order):
        # محاسبه مقدار تخفیف بر اساس معیارهای مورد نیاز
        return 0  # مقدار تخفیف را محاسبه و برگردانید
