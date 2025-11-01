from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'customers', views.CustomerViewSet, basename='customer')
router.register(r'sellers', views.SellerViewSet, basename='seller')
router.register(r'couriers', views.CourierViewSet, basename='courier')
router.register(r'managers', views.ManagerViewSet, basename='manager')
router.register(r'Teams', views.TeamsViewSet, basename='teams')
router.register(r'Organization', views.OrganizationViewSet, basename='organization')
router.register(r'Role', views.RoleViewSet, basename='role')

router.register(r'products', views.ProductViewSet, basename='product')
router.register(r'ProductMedia', views.ProductMediaViewSet, basename='productMedia')
router.register(r'ProductDetail', views.ProductDetailViewSet, basename='productDetail')
router.register(r'ProductDetailName', views.ProductDetailNameViewSet, basename='productDetailname')
router.register(r'Service', views.ServiceViewSet, basename='service')
router.register(r'ProductUnit', views.ProductUnitViewSet, basename='productunit')

router.register(r'addresses', views.AddressViewSet, basename='address')
router.register(r'location', views.LocationViewSet, basename='location')
router.register(r'area', views.AreaViewSet, basename='area')


router.register(r'Office', views.OfficeViewSet, basename='office')
router.register(r'Warehouse', views.WarehouseViewSet, basename='warehouse')
router.register(r'stores', views.StoreViewSet, basename='store')
router.register(r'ServiceProvider', views.ServiceProviderViewSet, basename='serviceprovider')

router.register(r'price', views.PriceViewSet, basename='productprice')
router.register(r'productprice', views.ProductPriceViewSet, basename='productprice')
router.register(r'Appointment', views.AppointmentsViewSet, basename='appointment')

router.register(r'order', views.OrderViewSet, basename='order')
router.register(r'orderitem', views.OrderItemViewSet, basename='orderitem')
router.register(r'invoice', views.InvoiceViewSet, basename='invoice')


# router.register(r'CourierOrder', views.CourierOrderViewSet, basename='courierorder')
# router.register(r'CourierModel', views.CourierModelViewSet, basename='courierModel')

# router.register(r'Profile', views.ProfileViewSet, basename='profile')
router.register(r'Campaign', views.CampaignViewSet, basename='campaign')
router.register(r'Lead', views.LeadViewSet, basename='lead')
router.register(r'Contact', views.ContactsViewSet, basename='contacts')
router.register(r'CRMTask', views.CRMTaskViewSet, basename='crmtask')
router.register(r'Ticket', views.TicketViewSet, basename='ticket')
router.register(r'Note', views.NoteViewSet, basename='note')
router.register(r'Activity', views.ActivityViewSet, basename='activity')
router.register(r'Event', views.EventViewSet, basename='event')
router.register(r'Opportunity', views.OpportunityViewSet, basename='opportunity')
router.register(r'Reminder', views.ReminderViewSet, basename='reminder')
#router.register(r'Attachment', views.AttachmentsViewSet, basename='attachments')
router.register(r'Document', views.DocumentsViewSet, basename='documents')

router.register(r'CourierExpense', views.CourierExpenseViewSet, basename='courierexpense')
router.register(r'Income', views.IncomeViewSet, basename='income')
router.register(r'Expense', views.ExpenseViewSet, basename='expense')
router.register(r'Commission', views.CommissionViewSet, basename='commission')
router.register(r'TaxlOperation', views.TaxOperationViewSet, basename='taxoperation')
router.register(r'Debt', views.DebtViewSet, basename='debt')
router.register(r'Refund', views.RefundViewSet, basename='refund')
router.register(r'Salary', views.SalaryViewSet, basename='salary')
router.register(r'LoanRequest', views.LoanRequestViewSet, basename='loanrequest')
router.register(r'Discount', views.DiscountViewSet, basename='discount')
router.register(r'Voucher', views.VoucherViewSet, basename='voucher')
router.register(r'LoanApplication', views.LoanApplicationViewSet, basename='loanapplication')
router.register(r'Wallet', views.WalletViewSet, basename='wallet')
router.register(r'FinancialKey', views.FinancialKeysViewSet, basename='financialkeys')
router.register(r'CurrencyExchangeRate', views.CurrencyExchangeRateViewSet, basename='currencyexchangeRate')
router.register(r'CostAttribute', views.CostAttributeViewSet, basename='costattribute')
router.register(r'LoanPayment', views.LoanPaymentViewSet, basename='loanpayment')
router.register(r'TaxSetting', views.TaxSettingViewSet, basename='taxsetting')
router.register(r'ProfitLoss', views.ProfitLossViewSet, basename='profitloss')
router.register(r'Stock', views.StockViewSet, basename='stock')
router.register(r'TotalSales', views.TotalSalesViewSet, basename='totalsales')
router.register(r'TotalExpense', views.TotalExpensesViewSet, basename='totalexpense')
router.register(r'TotalIncome', views.TotalIncomeViewSet, basename='totalincome')
router.register(r'CompanyCapital', views.CompanyCapitalViewSet, basename='companycapital')
router.register(r'DocumentLimit', views.DocumentLimitViewSet, basename='documentlimit')
router.register(r'CompanyResource', views.CompanyResourcesViewSet, basename='companyresource')
router.register(r'CheckManagement', views.CheckManagementViewSet, basename='checkmanagement')
router.register(r'PettyCash', views.PettyCashViewSet, basename='pettycash')
router.register(r'PromissoryNoteManagement', views.PromissoryNoteManagementViewSet, basename='promissorynotemanagement')
router.register(r'paymentmethod', views.PaymentMethodViewSet, basename='paymentmethod')
router.register(r'Payment', views.PaymentViewSet, basename='payment')
router.register(r'PaymentHistory', views.PaymentHistoryViewSet, basename='paymenthistory')
# router.register(r'Transaction', views.TransactionViewSet, basename='transaction')
# router.register(r'PaymentGateway', views.PaymentGatewayViewSet, basename='paymentgateway')


router.register(r'UserLoginLog', views.UserLoginLogViewSet, basename='userloginlog')
router.register(r'LeaveBalance', views.LeaveBalanceViewSet, basename='leavebalance')
router.register(r'WorkingHours', views.WorkingHoursViewSet, basename='workinghours')
router.register(r'EmployeeInfo', views.EmployeeInfoViewSet, basename='employeeinfo')
router.register(r'EmploymentContract', views.EmploymentContractViewSet, basename='employmentcontract')
router.register(r'StaffDocument', views.StaffDocumentViewSet, basename='staffdocument')
router.register(r'Leave', views.LeaveViewSet, basename='leave')
router.register(r'OverTime', views.OverTimeViewSet, basename='overtime')
router.register(r'AnnualLeave', views.AnnualLeaveViewSet, basename='annualleave')
router.register(r'FreeDay', views.FreeDayViewSet, basename='freeday')
router.register(r'LeaveManager', views.LeaveManagerViewSet, basename='leavemanager')


router.register(r'Inventory', views.InventoryViewSet, basename='inventory')
router.register(r'Shipment', views.ShipmentViewSet, basename='shipment')
router.register(r'StoreItem', views.StoreItemViewSet, basename='storeitem')
router.register(r'DistanceTraveled', views.DistanceTraveledViewSet, basename='distancetraveled')


router.register(r'Project', views.ProjectViewSet, basename='project')
router.register(r'Task', views.TaskViewSet, basename='task')
router.register(r'MarketAnalysis', views.MarketAnalysisViewSet, basename='marketanalysis')
router.register(r'StrategicPlanning', views.StrategicPlanningViewSet, basename='strategicplanning')
router.register(r'ProjectManagement', views.ProjectManagementViewSet, basename='projectmanagement')
router.register(r'Budgeting', views.BudgetingViewSet, basename='budgeting')
router.register(r'ControlAndMonitoring', views.ControlAndMonitoringViewSet, basename='controlandmonitoring')
router.register(r'RiskManagement', views.RiskManagementViewSet, basename='riskmanagement')
router.register(r'DataAnalyst', views.DataAnalysisViewSet, basename='dataanalyst')

# router.register(r'DVR', views.DVRViewSet, basename='dvr')

router.register(r'Document', views.DocumentViewSet, basename='document')
router.register(r'Attachment', views.AttachmentViewSet, basename='attachment')

#backend
router.register(r'DevelopmentProces', views.DevelopmentProcessViewSet, basename='developmentproces')
router.register(r'ReturnOrder', views.ReturnOrderViewSet, basename='returnorder')
router.register(r'Return', views.ReturnViewSet, basename='return')
# router.register(r'Review', views.ReviewViewSet, basename='review')
router.register(r'BaseStaffRequest', views.BaseStaffRequestViewSet, basename='basestaffrequest')
router.register(r'LicenseInfo', views.LicenseInfoViewSet, basename='LicenseInfo')
router.register(r'SellerCommission', views.SellerCommissionViewSet, basename='sellercommission')
router.register(r'InvoiceHistory', views.InvoiceHistoryViewSet, basename='invoiceHistory')
router.register(r'Sublink', views.SublinkViewSet, basename='sublink')
router.register(r'PlatformSettings', views.PlatformSettingsViewSet, basename='platformsettings')
router.register(r'NavigationLink', views.NavigationLinkViewSet, basename='navigationlink')
router.register(r'customusers', views.CustomUserViewSet, basename='customuser')
router.register(r'Unit', views.UnitViewSet, basename='unit')
router.register(r'tags', views.TagViewSet, basename='tag')




urlpatterns = [
    path('WorkingHours/summary/', views.WorkingHoursSummaryView.as_view(), name='workinghours-summary'),
    path('', include(router.urls)),
]