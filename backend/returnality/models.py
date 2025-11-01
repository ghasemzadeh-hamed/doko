from backend.models import CustomUser
from backend.orders.order import Order
from django.db import models

class Return(models.Model):

    return_date_first = models.DateTimeField(auto_now_add=True)

class ReturnOrder(Return):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    order = models.ForeignKey(Order, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField()
    return_reason = models.TextField()
    return_date = models.DateTimeField(auto_now_add=True)
    def __str__(self):
        return f"{self.id} - {self.warehouse.name} - {self.quantity}"