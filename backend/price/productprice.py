from backend.finance.finance import Commission
from django.db import models
from backend.users.models import Seller
from backend.products.product import Product, Service, ProductDetail, Product_Unit
from backend.shops.productShop import Store
from backend.shops.serviceShop import ServiceProvider
from djmoney.models.fields import MoneyField
#from decimal import Decimal


class Price(models.Model):
    name = models.CharField(max_length=15,blank=True,null=True)
    price = MoneyField(max_digits=13 ,decimal_places=2, default_currency='IRR', null=True, unique=True)
    last_updated = models.DateTimeField(auto_now=True)


    def __str__(self):
        return f"{self.name} - {self.price} "


class ProductPrice(models.Model):
    cip = models.IntegerField(max_length=8,  null=True, blank=True)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    details = models.ManyToManyField(ProductDetail, null=True, blank=True)
    unit = models.ForeignKey(Product_Unit, on_delete=models.CASCADE, null=True, blank=True)
    sales_price = MoneyField(max_digits=13 ,decimal_places=2, default_currency='IRR', null=True)
    purchase_price = MoneyField(max_digits=13 ,decimal_places=2, default_currency='IRR', null=True)
    max_price = MoneyField(max_digits=13 ,decimal_places=2, default_currency='IRR', null=True)
    min_price = MoneyField(max_digits=13 ,decimal_places=2, default_currency='IRR', null=True)
    avg_price = MoneyField(max_digits=13 ,decimal_places=2, default_currency='IRR', null=True)
    discount_price = MoneyField(max_digits=13 ,decimal_places=2, default_currency='IRR', blank=True, null=True)
    other_price = models.ManyToManyField(Price, null=True, blank=True)
    from_store = models.ForeignKey(Store, on_delete=models.CASCADE)
    last_updated = models.DateTimeField(auto_now=True)
    quantity = models.IntegerField(max_length=10,blank=True,null=True)
    min_quantity = models.IntegerField(max_length=10,blank=True,null=True)
    max_quantity = models.IntegerField(max_length=10,blank=True,null=True)


    def convert_moneyfield_to_integer(money_value):
        """
        Converts a MoneyField value (formatted as a string) to an integer.

        Args:
            money_value (str): A string representing the MoneyField value.

        Returns:
            int: The converted integer value.
        """
        # Remove currency symbols and commas
        cleaned_value = money_value.replace('$', '').replace(',', '')

        # Convert to float and then to integer
        integer_value = int(float(cleaned_value))

        return integer_value

    def update_prices(self):
        """
        Updates max_price and min_price with sales_price if they are empty.
        """
        sales_price = self.sales_price
        max_price = self.max_price
        min_price = self.min_price

        # Update max_price and min_price if empty
        if max_price == 0:
            max_price = sales_price
        if min_price == 0:
            min_price = sales_price

        # Return updated product details
        return {
            'sales_price': sales_price,
            'max_price': max_price,
            'min_price': min_price
        }
    def calculate_average_price(self):
        """
        Calculates the average price based on sales_price, purchase_price, and discount_price.
        """
        total_prices = int(str(self.sales_price) + str(self.purchase_price) + str(self.discount_price))
        num_prices = 3  # Number of prices considered (sales, purchase, discount)

        # Calculate the average price
        avg_price = total_prices / num_prices

        return avg_price

    def __str__(self):
        return f"{self.from_store} - {self.product.name} - {self.sales_price} - {self.purchase_price} - {self.discount_price}"
class Appointments(models.Model):
    store = models.ForeignKey(ServiceProvider, on_delete=models.CASCADE)
    service = models.ForeignKey(Service, on_delete=models.CASCADE)
    line = models.ForeignKey(Seller, on_delete=models.CASCADE, related_name='provider')
    price_appointments = MoneyField(max_digits=13 ,decimal_places=2, default_currency='IRR', blank=True, null=True)
    appointment_time = models.DateField()
    commission = models.ForeignKey(Commission, on_delete=models.CASCADE,null=True,blank=True)

    def __str__(self):
        return f"{self.pk} - {self.service.name} - {self.store.name} "

    # دیگر اطلاعات مربوط به قرار ملاقات

