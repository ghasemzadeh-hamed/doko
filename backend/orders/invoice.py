import datetime
import arrow
from backend.finance.finance import TaxSetting
from django.db import models
from backend.location.address import Address
from backend.location.location import Location
from backend.models import CustomUser
from backend.users.models import Teams
from backend.orders.order import Order
from djmoney.models.fields import MoneyField
from django.utils.translation import gettext_lazy as _

class Invoice(Order):
#    invoice = models.OneToOneField(Order, related_name="Invoice", on_delete=models.CASCADE)
    from_address = models.ForeignKey(
        Address,
        related_name="invoice_from_address",
        on_delete=models.SET_NULL,
        null=True,
    )
    created_by = models.ForeignKey(CustomUser, related_name="invoice_created_by", null=True, on_delete=models.SET_NULL)
    assigned_to = models.ManyToManyField(CustomUser,  related_name="invoice_assigned_to",  blank=True)
    teams = models.ManyToManyField(Teams, related_name="invoices_teams",  blank=True)

    to_address = models.ForeignKey(
        Address, related_name="invoice_delivered_on_address", on_delete=models.SET_NULL, null=True)
    to_location = models.ForeignKey(
        Location, related_name="invoice_delivered_on_location", on_delete=models.SET_NULL,  null=True,  blank=True)
    tax = models.ForeignKey(TaxSetting,blank=True, null=True, on_delete=models.SET_NULL)
    details = models.TextField(_("Details"), null=True, blank=True)

    amount_due = MoneyField(blank=True, null=True, max_digits=12, decimal_places=2)
    amount_discount = MoneyField(blank=True, null=True, max_digits=12, decimal_places=2)
    total_price = MoneyField(max_digits=13 ,decimal_places=2, default_currency='IRR', blank=True, null=True)
    total_price = MoneyField(max_digits=13 ,decimal_places=2, default_currency='IRR', blank=True, null=True)
    total_quantity = models.PositiveIntegerField(default=0, null=True,  blank=True)

#     def calculate_total_price(self):
#
#         total_product_price = sum(item.product_price.sales_price * item.quantity_product_item for item in self.order.order_items.all())
#         total_price = sum(total_product_price + item.booking.price for item in self.order.order_items.all())
#
#         return total_price
#
    def __str__(self):
        return f"Order {self.invoice.id}  "

# @receiver(post_save, sender=OrderItem)
# def create_or_update_invoice(sender, instance, **kwargs):
#     order = instance.order
#     try:
#         invoice = Invoice.objects.get(order=order)
#     except Invoice.DoesNotExist:
#         invoice = Invoice(order=order)
#     invoice.total_price = invoice.calculate_total_price()
#     invoice.save()
    def invoice_id_generator(self, prev_number=None):
        if prev_number:
            prev_number += 1
            return prev_number
        date = datetime.datetime.now().strftime("%d%m%Y")
        return int(self.number + date + "0001")

    def save(self, *args, **kwargs):
        if not self.number:
            self.number = self.invoice_id_generator()
            while Invoice.objects.filter(invoice_number=self.number).exists():
                self.number = self.invoice_id_generator(
                    prev_number=self.number
                )
        super(Invoice, self).save(*args, **kwargs)

class InvoiceHistory(Order):
    """Model definition for InvoiceHistory.
    This model is used to track/keep a record of the updates made to original invoice object."""
#    invoice = models.ForeignKey(Invoice, on_delete=models.CASCADE, related_name="invoice_history_history")
    updated_by = models.ForeignKey(CustomUser, related_name="invoice_history_created_by", null=True, on_delete=models.SET_NULL)
    assigned_to = models.ManyToManyField(CustomUser, related_name="invoice_history_assigned_to")
    teams = models.ManyToManyField(Teams, related_name="invoices_history_teams", blank=True)
    from_address = models.ForeignKey(
        Address,
        related_name="invoice_history_from_address",
        on_delete=models.SET_NULL,
        null=True,
    )


    to_address = models.ForeignKey(
        Address, related_name="invoice_history_to_address", on_delete=models.SET_NULL, null=True)
    to_location = models.ForeignKey(
        Location, related_name="invoice_history_to_location", on_delete=models.SET_NULL, null=True)
    tax = models.DecimalField(blank=True, null=True, max_digits=12, decimal_places=2)
    details = models.TextField(_("Details"), null=True, blank=True)
    amount_due = MoneyField(blank=True, null=True, max_digits=12, decimal_places=2)
    amount_discount = MoneyField(blank=True, null=True, max_digits=12, decimal_places=2)
    total_price = MoneyField(max_digits=13 ,decimal_places=2, default_currency='IRR', blank=True, null=True)
    total_quantity = models.PositiveIntegerField(default=0)
    due_date = models.DateField(blank=True, null=True)

#     def calculate_total_price(self):
#
#         total_product_price = sum(item.product_price.sales_price * item.quantity_product_item for item in self.order.order_items.all())
#         total_price = sum(total_product_price + item.booking.price for item in self.order.order_items.all())
#
#         return total_price
#
    def __str__(self):
        """Unicode representation of Invoice."""
        return self.invoice.number