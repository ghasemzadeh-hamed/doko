from backend.location.models import Area
from backend.shops.office import Office
from django.contrib import admin
from backend.models import *
#from backend.ai.models import *
from backend.archive.models import *
from backend.returnality.models import *
from backend.crm.crm import *
#from backend.delivery.order import *
#from backend.delivery.courier import *
from backend.finance.finance import *
from backend.finance.paymethod import PaymentMethod, Payment, PaymentHistory
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
#from backend.rating.review import *
from backend.shops.productShop import *
from backend.shops.serviceShop import *
from backend.pm.spm import *
from backend.pm.pm import *
from backend.users.models import *
#from backend.camera.dvr import *
from django.utils.translation import gettext_lazy as _
from backend import *


# Registering models with their respective admins
#admin.site.register(DVR, category=_("Camera"))
admin.site.register([ReturnOrder, Return], category=_("Returnality"))
admin.site.register([Campaign,Lead, Contacts,CRMTask, Ticket, Note, Activity, Event, Opportunity, Documents, Reminder, Attachments], category=_("CRM"))
#admin.site.register([CourierOrder,CourierModel], category=_("Courier"))
admin.site.register([
    CourierExpense, Income, Expense, SellerCommission,Commission, TaxOperation,
    Debt, Refund, Salary, Discount, Voucher, LoanApplication, LoanRequest,
     Wallet, FinancialKeys, Payment , PaymentMethod ,CurrencyExchangeRate ,CostAttribute
    , LoanPayment , TaxSetting , PaymentHistory, CompanyCapital, TotalIncome,TotalExpenses,TotalSales
    , Stock,DocumentLimit,ProfitLoss , CompanyResources ,CheckManagement ,PettyCash ,PromissoryNoteManagement
], category=_("Finance"))
admin.site.register([
    UserLoginLog, LeaveBalance, WorkingHours, EmployeeInfo, DistanceTraveled,
    EmploymentContract, LicenseInfo , StaffDocument , BaseStaffRequest , Leave , OverTime
,AnnualLeave,FreeDay  ], category=_("HR"))
admin.site.register([Address, Location, Area], category=_("Location"))
admin.site.register([StoreItem, Inventory, Shipment], category=_("Logistics"))
admin.site.register([Order, OrderItem, Invoice, InvoiceHistory], category=_("Orders"))
admin.site.register([ProductPrice,Appointments,Price], category=_("ProductPricecs"))
admin.site.register([ Product, ProductMedia,ProductDetail, Service , Product_Unit,ProductDetailName], category=_("Products"))
admin.site.register([Store, ServiceProvider,Warehouse , Office], category=_("Shops"))
#admin.site.register([Review], category=_("Review"))
admin.site.register([
    Project, Task, MarketAnalysis, StrategicPlanning, ProjectManagement,
    Budgeting, ControlAndMonitoring, RiskManagement, DataAnalysis,
    DevelopmentProcess], category=_("PM"))

admin.site.register([CustomUser, Role, Tag , Unit, NavigationLink, Sublink, PlatformSettings ], category=_("backend"))
admin.site.register([ Customer, Seller, Courier, Manager, Organization, Teams], category=_("Users"))
admin.site.register([Document, Attachment], category=_("Archive"))