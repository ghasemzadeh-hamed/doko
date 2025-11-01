from django.db import models
from backend.orders.invoice import Invoice
from backend.price.productprice import ProductPrice , Appointments
from django.core.validators import MinValueValidator


class OrderItem(models.Model):
    order = models.ForeignKey(Invoice, on_delete=models.CASCADE, related_name='order_items')
    product_price = models.ForeignKey(ProductPrice, on_delete=models.CASCADE, null=True, blank=True)
    quantity_product_item = models.PositiveIntegerField( validators=[MinValueValidator(1)], null=True, blank=True)
    booking = models.ManyToManyField(Appointments, blank=True,)
    def __str__(self):
        return f"{self.order.assigned_to} "

# class Booking(models.Model):
#     pass

    # STATUS_CHOICES = [
    #     ('pending', 'Pending'),
    #     ('reserved', 'Reserved'),
    #     ('paid', 'Paid'),
    # ]
    #
    # status = models.CharField(max_length=200, null=True, default='pending', choices=STATUS_CHOICES)
    # customer = models.ForeignKey(Customer, on_delete=models.CASCADE)
    # appointment = models.ForeignKey(Appointments, on_delete=models.CASCADE)
    # booking_time = models.DateTimeField()
    # date_created = models.DateTimeField(auto_now_add=True, null=True)
    #
    # def __str__(self):
    #     return f"{self.id} - {self.appointments} - {self.customer} - {self.booking_time}"
    # # دیگر اطلاعات مربوط به رزرو

