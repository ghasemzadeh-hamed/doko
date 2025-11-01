from backend.location.models import Area
from backend.shops.office import Office
from rest_framework import serializers
from .models import *
from backend.models import *
from backend.returnality.models import *
#from backend.bi.bi import *
from backend.crm.crm import *
#from backend.delivery.order import *
#from backend.delivery.courier import *
from backend.finance.finance import *
from backend.finance.paymethod import *
from backend.finance.wallet import *
from backend.finance.discount import *
from backend.hr.hr import *
from backend.location.location import *
from backend.location.address import *
from backend.logistics.logistic import *
from backend.orders.order import *
from backend.orders.invoice import *
from backend.orders.item import *
from backend.price.productprice import *
from backend.products.product import *
from backend.shops.productShop import *
from backend.shops.serviceShop import *
from backend.shops.warehouse import *
from backend.pm.spm import *
from backend.pm.pm import *
from backend.users.models import *
#from backend.camera.dvr import *
#from backend.rating.review import Review
from decimal import Decimal, InvalidOperation

class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = "__all__"
    def create(self, validated_data):
        return User.objects.create_user(**validated_data)
class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = "__all__"

class SellerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Seller
        fields = "__all__"

class CourierSerializer(serializers.ModelSerializer):
    class Meta:
        model = Courier
        fields = "__all__"

class TeamsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Teams
        fields = "__all__"

class ManagerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Manager
        fields = "__all__"

class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = "__all__"

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = "__all__"

class ProductDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductDetail
        fields = "__all__"

class ProductMediaSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductMedia
        fields = "__all__"

class AddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Address
        fields = "__all__"

class OfficeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Office
        fields = "__all__"

class StoreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Store
        fields = "__all__"

class ProductPriceSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductPrice
        fields = "__all__"

class PriceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Price
        fields = "__all__"

class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = "__all__"

class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = "__all__"

class InvoiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Invoice
        fields = "__all__"

class InvoiceHistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = InvoiceHistory
        fields = '__all__'


# class CourierOrderSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = CourierOrder
#         fields = "__all__"
#
# class CourierModelSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = CourierModel
#         fields = "__all__"



class LocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Location
        fields = "__all__"

class AreaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Area
        fields = "__all__"

# class ProfileSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Profile
#         fields = "__all__"
class CampaignSerializer(serializers.ModelSerializer):
    class Meta:
        model = Campaign
        fields = "__all__"
class LeadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lead
        fields = "__all__"

class ContactsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contacts
        fields = "__all__"


class CRMTaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = CRMTask
        fields = "__all__"

class TicketSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ticket
        fields = "__all__"

class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = "__all__"


class ActivitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Activity
        fields = "__all__"

class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = "__all__"


class OpportunitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Opportunity
        fields = "__all__"

class ReminderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reminder
        fields = "__all__"

# class PlannerEventSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = PlannerEvent
#         fields = "__all__"

class DocumentsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Documents
        fields = '__all__'

class AttachmentsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Attachments
        fields = '__all__'



class CourierExpenseSerializer(serializers.ModelSerializer):
    class Meta:
        model = CourierExpense
        fields = "__all__"



class IncomeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Income
        fields = "__all__"



class ExpenseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Expense
        fields = "__all__"



class SellerCommissionSerializer(serializers.ModelSerializer):
    class Meta:
        model = SellerCommission
        fields = "__all__"




class TaxSettingSerializer(serializers.ModelSerializer):
    class Meta:
        model = TaxSetting
        fields = "__all__"

class TaxOperationSerializer(serializers.ModelSerializer):
    class Meta:
        model = TaxOperation
        fields = "__all__"



class DebtSerializer(serializers.ModelSerializer):
    class Meta:
        model = Debt
        fields = "__all__"

class CostAttributeSerializer(serializers.ModelSerializer):
    class Meta:
        model = CostAttribute
        fields = "__all__"


class CommissionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Commission
        fields = "__all__"



class RefundSerializer(serializers.ModelSerializer):
    class Meta:
        model = Refund
        fields = "__all__"



class SalarySerializer(serializers.ModelSerializer):
    class Meta:
        model = Salary
        fields = "__all__"


class LoanRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = LoanRequest
        fields = '__all__'


class LoanPaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = LoanPayment
        fields = "__all__"



class DiscountSerializer(serializers.ModelSerializer):
    class Meta:
        model = Discount
        fields = "__all__"



class VoucherSerializer(serializers.ModelSerializer):
    class Meta:
        model = Voucher
        fields = "__all__"


class LoanApplicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = LoanApplication
        fields = "__all__"


class CurrencyExchangeRateSerializer(serializers.ModelSerializer):
    class Meta:
        model = CurrencyExchangeRate
        fields = "__all__"


class CompanyCapitalSerializer(serializers.ModelSerializer):
    class Meta:
        model = CompanyCapital
        fields = "__all__"


class TotalIncomeSerializer(serializers.ModelSerializer):
    class Meta:
        model = TotalIncome
        fields = "__all__"


class TotalExpensesSerializer(serializers.ModelSerializer):
    class Meta:
        model = TotalExpenses
        fields = "__all__"


class TotalSalesSerializer(serializers.ModelSerializer):
    class Meta:
        model = TotalSales
        fields = "__all__"


class StockSerializer(serializers.ModelSerializer):
    class Meta:
        model = Stock
        fields = "__all__"


class ProfitLossSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProfitLoss
        fields = "__all__"

class PettyCashSerializer(serializers.ModelSerializer):
    class Meta:
        model = PettyCash
        fields = "__all__"
class PromissoryNoteManagementSerializer(serializers.ModelSerializer):
    class Meta:
        model = PromissoryNoteManagement
        fields = "__all__"

class CompanyResourcesSerializer(serializers.ModelSerializer):
    class Meta:
        model = CompanyResources
        fields = "__all__"

class CheckManagementSerializer(serializers.ModelSerializer):
    class Meta:
        model = CheckManagement
        fields = "__all__"


class DocumentLimitSerializer(serializers.ModelSerializer):
    class Meta:
        model = DocumentLimit
        fields = "__all__"


class WalletSerializer(serializers.ModelSerializer):
    class Meta:
        model = Wallet
        fields = "__all__"


class PaymentMethodSerializer(serializers.ModelSerializer):
    class Meta:
        model = PaymentMethod
        fields = "__all__"

# class TransactionSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Transaction
#         fields = "__all__"
class PaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payment
        fields = "__all__"

class PaymentHistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = PaymentHistory
        fields = "__all__"

# class PaymentGatewaySerializer(serializers.ModelSerializer):
#     class Meta:
#         model = PaymentGateway
#         fields = "__all__"

class UserLoginLogSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserLoginLog
        fields = "__all__"

class LeaveBalanceSerializer(serializers.ModelSerializer):
    class Meta:
        model = LeaveBalance
        fields = "__all__"

class WorkingHoursSerializer(serializers.ModelSerializer):
    class Meta:
        model = WorkingHours
        fields = "__all__"

class EmployeeInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = EmployeeInfo
        fields = "__all__"

class FinancialKeysSerializer(serializers.ModelSerializer):
    class Meta:
        model = FinancialKeys
        fields = "__all__"

class DistanceTraveledSerializer(serializers.ModelSerializer):
    class Meta:
        model = DistanceTraveled
        fields = "__all__"

class EmploymentContractSerializer(serializers.ModelSerializer):
    class Meta:
        model = EmploymentContract
        fields = "__all__"

class LicenseInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = LicenseInfo
        fields = "__all__"

class LeaveManagerSerializer(serializers.ModelSerializer):
    class Meta:
        model = LeaveManager
        fields = "__all__"

class FreeDaySerializer(serializers.ModelSerializer):
    class Meta:
        model = FreeDay
        fields = "__all__"

class LicenseInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = LicenseInfo
        fields = "__all__"

class AnnualLeaveSerializer(serializers.ModelSerializer):
    class Meta:
        model = AnnualLeave
        fields = "__all__"

class OverTimeSerializer(serializers.ModelSerializer):
    class Meta:
        model = OverTime
        fields = "__all__"

class LeaveSerializer(serializers.ModelSerializer):
    class Meta:
        model = Leave
        fields = "__all__"

class BaseStaffRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = BaseStaffRequest
        fields = "__all__"

class RoleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Role
        fields = "__all__"

class StaffDocumentSerializer(serializers.ModelSerializer):
    class Meta:
        model = StaffDocument
        fields = "__all__"



class WarehouseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Warehouse
        fields = "__all__"

class InventorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Inventory
        fields = "__all__"

class ShipmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Shipment
        fields = "__all__"


class ReturnOrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = ReturnOrder
        fields = "__all__"

class ReturnSerializer(serializers.ModelSerializer):
    class Meta:
        model = Return
        fields = "__all__"

class LoanApplicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = LoanApplication
        fields = "__all__"

class ServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Service
        fields = "__all__"

class ServiceProviderSerializer(serializers.ModelSerializer):
    class Meta:
        model = ServiceProvider
        fields = "__all__"

class ReturnSerializer(serializers.ModelSerializer):
    class Meta:
        model = Return
        fields = "__all__"
# class BookingSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Booking
#         fields = "__all__"

# class ReviewSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Review
#         fields = "__all__"

class AppointmentsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Appointments
        fields = "__all__"



class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = "__all__"

class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = "__all__"

class MarketAnalysisSerializer(serializers.ModelSerializer):
    class Meta:
        model = MarketAnalysis
        fields = "__all__"

class StrategicPlanningSerializer(serializers.ModelSerializer):
    class Meta:
        model = StrategicPlanning
        fields = "__all__"

class ProjectManagementSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProjectManagement
        fields = "__all__"

class BudgetingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Budgeting
        fields = "__all__"

class ControlAndMonitoringSerializer(serializers.ModelSerializer):
    class Meta:
        model = ControlAndMonitoring
        fields = "__all__"

class RiskManagementSerializer(serializers.ModelSerializer):
    class Meta:
        model = RiskManagement
        fields = "__all__"

class DataAnalysisSerializer(serializers.ModelSerializer):
    class Meta:
        model = DataAnalysis
        fields = "__all__"

class LoanApplicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = LoanApplication
        fields = "__all__"

class DevelopmentProcessSerializer(serializers.ModelSerializer):
    class Meta:
        model = DevelopmentProcess
        fields = "__all__"

# class DVRSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = DVR
#         fields = '__all__'

class UnitSerializer(serializers.ModelSerializer):
    class Meta:
        model = Unit
        fields = '__all__'

class DocumentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Document
        fields = '__all__'



class AttachmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Attachment
        fields = '__all__'


class OrganizationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Organization
        fields = '__all__'

class StoreItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = StoreItem
        fields = '__all__'

# class TripSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Trip
#         fields = "__all__"
#         read_only_fields = ('id', 'created', 'updated',)
#
# class NestedTripSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Trip
#         fields = '__all__'
#         depth = 1


class PlatformSettingsSerializer(serializers.ModelSerializer):
    class Meta:
        model = PlatformSettings
        fields = '__all__'

class NavigationLinkSerializer(serializers.ModelSerializer):
    class Meta:
        model = NavigationLink
        fields = '__all__'

class SublinkSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sublink
        fields = '__all__'

class ProductUnitSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product_Unit
        fields = '__all__'

class ProductDetailNameSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductDetailName
        fields = '__all__'
