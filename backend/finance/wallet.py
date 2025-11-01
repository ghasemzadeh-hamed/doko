from djmoney.models.fields import MoneyField
from djmoney.money import Money
from backend.models import *
from django.db import models

class Wallet(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE)
    balance = MoneyField(max_digits=9 ,decimal_places=2, default_currency='IRR')

    def add_funds(self, amount, currency='USD'):
        """
        افزایش موجودی کیف پول
        """
        money_amount = Money(amount, currency)
        self.balance += money_amount
        self.save()

    def deduct_funds(self, amount, currency='USD'):
        """
        کاهش موجودی کیف پول
        """
        money_amount = Money(amount, currency)
        if self.balance >= money_amount:
            self.balance -= money_amount
            self.save()
        else:
            raise Exception("موجودی کافی نیست.")

    def __str__(self):
        return f"کیف پول {self.user} - موجودی: {self.balance}"
