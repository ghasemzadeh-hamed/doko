#backend/views.py
from django.utils.dateparse import parse_date
from rest_framework import status, viewsets
from rest_framework.response import Response
from rest_framework.views import APIView

from .serializers import *


class CustomUserViewSet(viewsets.ModelViewSet):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer

class CustomerViewSet(viewsets.ModelViewSet):
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer

class SellerViewSet(viewsets.ModelViewSet):
    queryset = Seller.objects.all()
    serializer_class = SellerSerializer

class CourierViewSet(viewsets.ModelViewSet):
    queryset = Courier.objects.all()
    serializer_class = CourierSerializer

class ManagerViewSet(viewsets.ModelViewSet):
    queryset = Manager.objects.all()
    serializer_class = ManagerSerializer

class TeamsViewSet(viewsets.ModelViewSet):
    queryset = Teams.objects.all()
    serializer_class = TeamsSerializer

class TagViewSet(viewsets.ModelViewSet):
    queryset = Tag.objects.all()
    serializer_class = TagSerializer

class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
class ProductMediaViewSet(viewsets.ModelViewSet):
    queryset = ProductMedia.objects.all()
    serializer_class = ProductMediaSerializer
class ProductDetailViewSet(viewsets.ModelViewSet):
    queryset = ProductDetail.objects.all()
    serializer_class = ProductDetailSerializer

class AddressViewSet(viewsets.ModelViewSet):
    queryset = Address.objects.all()
    serializer_class = AddressSerializer

class StoreViewSet(viewsets.ModelViewSet):
    queryset = Store.objects.all()
    serializer_class = StoreSerializer

class OfficeViewSet(viewsets.ModelViewSet):
    queryset = Office.objects.all()
    serializer_class = OfficeSerializer


class ProductPriceViewSet(viewsets.ModelViewSet):
    queryset = ProductPrice.objects.all()
    serializer_class = ProductPriceSerializer

class PriceViewSet(viewsets.ModelViewSet):
    queryset = Price.objects.all()
    serializer_class = PriceSerializer

class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer

class OrderItemViewSet(viewsets.ModelViewSet):
    queryset = OrderItem.objects.all()
    serializer_class = OrderItemSerializer

class InvoiceViewSet(viewsets.ModelViewSet):
    queryset = Invoice.objects.all()
    serializer_class = InvoiceSerializer

class InvoiceHistoryViewSet(viewsets.ModelViewSet):
    queryset = InvoiceHistory.objects.all()
    serializer_class = InvoiceHistorySerializer



class LocationViewSet(viewsets.ModelViewSet):
    queryset = Location.objects.all()
    serializer_class = LocationSerializer

class AreaViewSet(viewsets.ModelViewSet):
    queryset = Area.objects.all()
    serializer_class = AreaSerializer

# class CourierOrderViewSet(viewsets.ModelViewSet):
#     queryset = CourierOrder.objects.all()
#     serializer_class = CourierOrderSerializer

# class CourierModelViewSet(viewsets.ModelViewSet):
#     queryset = CourierModel.objects.all()
#     serializer_class = CourierModelSerializer

# class ProfileViewSet(viewsets.ModelViewSet):
#     queryset = Profile.objects.all()
#     serializer_class = ProfileSerializer

class CampaignViewSet(viewsets.ModelViewSet):
    queryset = Campaign.objects.all()
    serializer_class = CampaignSerializer

class LeadViewSet(viewsets.ModelViewSet):
    queryset = Lead.objects.all()
    serializer_class = LeadSerializer

class ContactsViewSet(viewsets.ModelViewSet):
    queryset = Contacts.objects.all()
    serializer_class = ContactsSerializer

class CRMTaskViewSet(viewsets.ModelViewSet):
    queryset = CRMTask.objects.all()
    serializer_class = CRMTaskSerializer

class TicketViewSet(viewsets.ModelViewSet):
    queryset = Ticket.objects.all()
    serializer_class = TicketSerializer

class NoteViewSet(viewsets.ModelViewSet):
    queryset = Note.objects.all()
    serializer_class = NoteSerializer

class ActivityViewSet(viewsets.ModelViewSet):
    queryset = Activity.objects.all()
    serializer_class = ActivitySerializer

class EventViewSet(viewsets.ModelViewSet):
    queryset = Event.objects.all()
    serializer_class = EventSerializer

class OpportunityViewSet(viewsets.ModelViewSet):
    queryset = Opportunity.objects.all()
    serializer_class = OpportunitySerializer

class ReminderViewSet(viewsets.ModelViewSet):
    queryset = Reminder.objects.all()
    serializer_class = ReminderSerializer

# class PlannerEventViewSet(viewsets.ModelViewSet):
#     queryset = PlannerEvent.objects.all()
#     serializer_class = PlannerEventSerializer

class DocumentViewSet(viewsets.ModelViewSet):
    queryset = Document.objects.all()
    serializer_class = DocumentSerializer

class AttachmentViewSet(viewsets.ModelViewSet):
    queryset = Attachment.objects.all()
    serializer_class = AttachmentSerializer


class CourierExpenseViewSet(viewsets.ModelViewSet):
    queryset = CourierExpense.objects.all()
    serializer_class = CourierExpenseSerializer

class IncomeViewSet(viewsets.ModelViewSet):
    queryset = Income.objects.all()
    serializer_class = IncomeSerializer

class ExpenseViewSet(viewsets.ModelViewSet):
    queryset = Expense.objects.all()
    serializer_class = ExpenseSerializer

class SellerCommissionViewSet(viewsets.ModelViewSet):
    queryset = SellerCommission.objects.all()
    serializer_class = SellerCommissionSerializer

class TaxOperationViewSet(viewsets.ModelViewSet):
    queryset = TaxOperation.objects.all()
    serializer_class = TaxOperationSerializer
class TaxSettingViewSet(viewsets.ModelViewSet):
    queryset = TaxSetting.objects.all()
    serializer_class = TaxSettingSerializer
class DebtViewSet(viewsets.ModelViewSet):
    queryset = Debt.objects.all()
    serializer_class = DebtSerializer

class CommissionViewSet(viewsets.ModelViewSet):
    queryset = Commission.objects.all()
    serializer_class = CommissionSerializer

class RefundViewSet(viewsets.ModelViewSet):
    queryset = Refund.objects.all()
    serializer_class = RefundSerializer

class SalaryViewSet(viewsets.ModelViewSet):
    queryset = Salary.objects.all()
    serializer_class = SalarySerializer

class LoanRequestViewSet(viewsets.ModelViewSet):
    queryset = LoanRequest.objects.all()
    serializer_class = LoanRequestSerializer


class LoanPaymentViewSet(viewsets.ModelViewSet):
    queryset = LoanPayment.objects.all()
    serializer_class = LoanPaymentSerializer

class DiscountViewSet(viewsets.ModelViewSet):
    queryset = Discount.objects.all()
    serializer_class = DiscountSerializer

class VoucherViewSet(viewsets.ModelViewSet):
    queryset = Voucher.objects.all()
    serializer_class = VoucherSerializer

class LoanApplicationViewSet(viewsets.ModelViewSet):
    queryset = LoanApplication.objects.all()
    serializer_class = LoanApplicationSerializer
class CostAttributeViewSet(viewsets.ModelViewSet):
    queryset = CostAttribute.objects.all()
    serializer_class = CostAttributeSerializer


class  ProfitLossViewSet(viewsets.ModelViewSet):
    queryset =  ProfitLoss.objects.all()
    serializer_class =  ProfitLossSerializer

class  StockViewSet(viewsets.ModelViewSet):
    queryset =  Stock.objects.all()
    serializer_class =  StockSerializer

class  TotalSalesViewSet(viewsets.ModelViewSet):
    queryset =  TotalSales.objects.all()
    serializer_class =  TotalSalesSerializer

class  TotalExpensesViewSet(viewsets.ModelViewSet):
    queryset =  TotalExpenses.objects.all()
    serializer_class =  TotalExpensesSerializer

class  TotalIncomeViewSet(viewsets.ModelViewSet):
    queryset =  TotalIncome.objects.all()
    serializer_class =  TotalIncomeSerializer

class  CompanyCapitalViewSet(viewsets.ModelViewSet):
    queryset =  CompanyCapital.objects.all()
    serializer_class =  CompanyCapitalSerializer

class  CurrencyExchangeRateViewSet(viewsets.ModelViewSet):
    queryset =  CurrencyExchangeRate.objects.all()
    serializer_class =  CurrencyExchangeRateSerializer


class  PettyCashViewSet(viewsets.ModelViewSet):
    queryset = PettyCash.objects.all()
    serializer_class = PettyCashSerializer


class  PromissoryNoteManagementViewSet(viewsets.ModelViewSet):
    queryset =PromissoryNoteManagement.objects.all()
    serializer_class = PromissoryNoteManagementSerializer



class  CheckManagementViewSet(viewsets.ModelViewSet):
    queryset = CheckManagement.objects.all()
    serializer_class = CheckManagementSerializer



class DocumentLimitViewSet(viewsets.ModelViewSet):
    queryset =  DocumentLimit.objects.all()
    serializer_class =  DocumentLimitSerializer
class CompanyResourcesViewSet(viewsets.ModelViewSet):
    queryset =  CompanyResources.objects.all()
    serializer_class = CompanyResourcesSerializer

class WalletViewSet(viewsets.ModelViewSet):
    queryset = Wallet.objects.all()
    serializer_class = WalletSerializer

class UserLoginLogViewSet(viewsets.ModelViewSet):
    queryset = UserLoginLog.objects.all()
    serializer_class = UserLoginLogSerializer

class LeaveBalanceViewSet(viewsets.ModelViewSet):
    queryset = LeaveBalance.objects.all()
    serializer_class = LeaveBalanceSerializer

class WorkingHoursViewSet(viewsets.ModelViewSet):
    queryset = WorkingHours.objects.all()
    serializer_class = WorkingHoursSerializer

    def get_queryset(self):
        queryset = (
            WorkingHours.objects.select_related("user")
            .prefetch_related("tag")
            .order_by("-login_time")
        )

        request = getattr(self, "request", None)
        if not request:
            return queryset

        start_date_param = request.query_params.get("start_date")
        end_date_param = request.query_params.get("end_date")
        user_param = request.query_params.get("user")

        start_date = parse_date(start_date_param) if start_date_param else None
        end_date = parse_date(end_date_param) if end_date_param else None

        if start_date:
            queryset = queryset.filter(login_time__date__gte=start_date)
        if end_date:
            queryset = queryset.filter(login_time__date__lte=end_date)
        if user_param:
            queryset = queryset.filter(user_id=user_param)

        return queryset

    def list(self, request, *args, **kwargs):
        start_date_param = request.query_params.get("start_date")
        end_date_param = request.query_params.get("end_date")

        start_date = parse_date(start_date_param) if start_date_param else None
        end_date = parse_date(end_date_param) if end_date_param else None

        if start_date_param and start_date is None:
            return Response(
                {"detail": "Invalid start_date format. Use YYYY-MM-DD."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        if end_date_param and end_date is None:
            return Response(
                {"detail": "Invalid end_date format. Use YYYY-MM-DD."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        if start_date and end_date and end_date < start_date:
            return Response(
                {"detail": "end_date must be greater than or equal to start_date."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        return super().list(request, *args, **kwargs)


class WorkingHoursSummaryView(APIView):
    def get(self, request, *args, **kwargs):
        start_date_param = request.query_params.get("start_date")
        end_date_param = request.query_params.get("end_date")

        start_date = parse_date(start_date_param) if start_date_param else None
        end_date = parse_date(end_date_param) if end_date_param else None

        if start_date_param and start_date is None:
            return Response(
                {"detail": "Invalid start_date format. Use YYYY-MM-DD."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        if end_date_param and end_date is None:
            return Response(
                {"detail": "Invalid end_date format. Use YYYY-MM-DD."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        if start_date and end_date and end_date < start_date:
            return Response(
                {"detail": "end_date must be greater than or equal to start_date."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        summary = WorkingHours.summarize(start_date=start_date, end_date=end_date)

        return Response(
            {
                "results": summary["rows"],
                "totals": summary["totals"],
                "meta": {
                    "start_date": start_date.isoformat() if start_date else None,
                    "end_date": end_date.isoformat() if end_date else None,
                    "standard_daily_hours": float(
                        WorkingHours.round_hours(WorkingHours.get_standard_daily_hours())
                    ),
                },
            }
        )

class EmployeeInfoViewSet(viewsets.ModelViewSet):
    queryset = EmployeeInfo.objects.all()
    serializer_class = EmployeeInfoSerializer

class FinancialKeysViewSet(viewsets.ModelViewSet):
    queryset = FinancialKeys.objects.all()
    serializer_class = FinancialKeysSerializer

class DistanceTraveledViewSet(viewsets.ModelViewSet):
    queryset = DistanceTraveled.objects.all()
    serializer_class = DistanceTraveledSerializer

class EmploymentContractViewSet(viewsets.ModelViewSet):
    queryset = EmploymentContract.objects.all()
    serializer_class = EmploymentContractSerializer

class StaffDocumentViewSet(viewsets.ModelViewSet):
    queryset = StaffDocument.objects.all()
    serializer_class = StaffDocumentSerializer

class RoleViewSet(viewsets.ModelViewSet):
    queryset = Role.objects.all()
    serializer_class = RoleSerializer

class LicenseInfoViewSet(viewsets.ModelViewSet):
    queryset = LicenseInfo.objects.all()
    serializer_class = LicenseInfoSerializer

class BaseStaffRequestViewSet(viewsets.ModelViewSet):
    queryset = BaseStaffRequest.objects.all()
    serializer_class = BaseStaffRequestSerializer

class LeaveViewSet(viewsets.ModelViewSet):
    queryset = Leave.objects.all()
    serializer_class = LeaveSerializer

class OverTimeViewSet(viewsets.ModelViewSet):
    queryset = OverTime.objects.all()
    serializer_class = OverTimeSerializer

class AnnualLeaveViewSet(viewsets.ModelViewSet):
    queryset = AnnualLeave.objects.all()
    serializer_class = AnnualLeaveSerializer

class FreeDayViewSet(viewsets.ModelViewSet):
    queryset = FreeDay.objects.all()
    serializer_class = FreeDaySerializer

class LeaveManagerViewSet(viewsets.ModelViewSet):
    serializer_class = LeaveManagerSerializer

class WarehouseViewSet(viewsets.ModelViewSet):
    queryset = Warehouse.objects.all()
    serializer_class = WarehouseSerializer

class InventoryViewSet(viewsets.ModelViewSet):
    queryset = Inventory.objects.all()
    serializer_class = InventorySerializer

class ShipmentViewSet(viewsets.ModelViewSet):
    queryset = Shipment.objects.all()
    serializer_class = ShipmentSerializer

class ReturnOrderViewSet(viewsets.ModelViewSet):
    queryset = ReturnOrder.objects.all()
    serializer_class = ReturnOrderSerializer

class ReturnViewSet(viewsets.ModelViewSet):
    queryset = Return.objects.all()
    serializer_class = ReturnSerializer

class ServiceViewSet(viewsets.ModelViewSet):
    queryset = Service.objects.all()
    serializer_class = ServiceSerializer

class ServiceProviderViewSet(viewsets.ModelViewSet):
    queryset = ServiceProvider.objects.all()
    serializer_class = ServiceProviderSerializer

# class BookingViewSet(viewsets.ModelViewSet):
#     queryset = Booking.objects.all()
#     serializer_class = BookingSerializer

# class ReviewViewSet(viewsets.ModelViewSet):
#     queryset = Review.objects.all()
#     serializer_class = ReviewSerializer

# class PaymentGatewayViewSet(viewsets.ModelViewSet):
#     queryset = PaymentGateway.objects.all()
#     serializer_class = PaymentGatewaySerializer
class PaymentMethodViewSet(viewsets.ModelViewSet):
    queryset = PaymentMethod.objects.all()
    serializer_class = PaymentMethodSerializer

class PaymentViewSet(viewsets.ModelViewSet):
    queryset = Payment.objects.all()
    serializer_class = PaymentSerializer

class PaymentHistoryViewSet(viewsets.ModelViewSet):
    queryset = PaymentHistory.objects.all()
    serializer_class = PaymentHistorySerializer

# class TransactionViewSet(viewsets.ModelViewSet):
#     queryset = Payment.objects.all()
#     serializer_class = TransactionSerializer


class StoreItemViewSet(viewsets.ModelViewSet):
    queryset = StoreItem.objects.all()
    serializer_class = StoreItemSerializer

class AppointmentsViewSet(viewsets.ModelViewSet):
    queryset = Appointments.objects.all()
    serializer_class = AppointmentsSerializer

class ProjectViewSet(viewsets.ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer

class TaskViewSet(viewsets.ModelViewSet):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer

class MarketAnalysisViewSet(viewsets.ModelViewSet):
    queryset = MarketAnalysis.objects.all()
    serializer_class = MarketAnalysisSerializer

class StrategicPlanningViewSet(viewsets.ModelViewSet):
    queryset = StrategicPlanning.objects.all()
    serializer_class = StrategicPlanningSerializer

class ProjectManagementViewSet(viewsets.ModelViewSet):
    queryset = ProjectManagement.objects.all()
    serializer_class = ProjectManagementSerializer

class BudgetingViewSet(viewsets.ModelViewSet):
    queryset = Budgeting.objects.all()
    serializer_class = BudgetingSerializer

class ControlAndMonitoringViewSet(viewsets.ModelViewSet):
    queryset = ControlAndMonitoring.objects.all()
    serializer_class = ControlAndMonitoringSerializer

class RiskManagementViewSet(viewsets.ModelViewSet):
    queryset = RiskManagement.objects.all()
    serializer_class = RiskManagementSerializer

class DataAnalysisViewSet(viewsets.ModelViewSet):
    queryset = DataAnalysis.objects.all()
    serializer_class = DataAnalysisSerializer

class DevelopmentProcessViewSet(viewsets.ModelViewSet):
    queryset = DevelopmentProcess.objects.all()
    serializer_class = DevelopmentProcessSerializer

# class DVRViewSet(viewsets.ModelViewSet):
#     queryset = DVR.objects.all()
#     serializer_class = DVRSerializer
# #    permission_classes = [permissions.IsAuthenticated]
#
#     @action(detail=True, methods=['get'])
#     def get_image(self, request, pk=None):
#         dvr = self.get_object()
#         service = DVRService(dvr)
#         image = service.get_camera_image()
#
#         if image is not None:
#             # Depending on the response format, you might need to serialize the image data
#             # For simplicity, assuming the image is a binary file
#             return Response({"message": "Image received successfully", "image_data": image.tobytes().decode('latin-1')})
#         else:
#             return Response({"message": "Error retrieving image from DVR"}, status=500)

class UnitViewSet(viewsets.ModelViewSet):
    queryset = Unit.objects.all()
    serializer_class = UnitSerializer

class OrganizationViewSet(viewsets.ModelViewSet):
    queryset = Organization.objects.all()
    serializer_class = OrganizationSerializer

class DocumentsViewSet(viewsets.ModelViewSet):
    queryset = Documents.objects.all()
    serializer_class = DocumentsSerializer



class AttachmentsViewSet(viewsets.ModelViewSet):
    queryset = Attachments.objects.all()
    serializer_class = AttachmentsSerializer

#
#
# class TripViewSet(viewsets.ModelViewSet):
#     queryset = Trip.objects.all()
#     serializer_class = TripSerializer
#
# class TripDetailViewSet(viewsets.ModelViewSet):
#     lookup_field = 'id'
#     lookup_url_kwarg = 'trip_id'
#     queryset = Trip.objects.all()
#     serializer_class = TripSerializer
#
# class ReturnViewSet(viewsets.ModelViewSet):
#     queryset = Return.objects.all()
#     serializer_class = ReturnSerializer

class PlatformSettingsViewSet(viewsets.ModelViewSet):
    queryset = PlatformSettings.objects.all()
    serializer_class = PlatformSettingsSerializer

class NavigationLinkViewSet(viewsets.ModelViewSet):
    queryset = NavigationLink.objects.all()
    serializer_class = NavigationLinkSerializer

class SublinkViewSet(viewsets.ModelViewSet):
    queryset = Sublink.objects.all()
    serializer_class = SublinkSerializer



class ProductUnitViewSet(viewsets.ModelViewSet):
    queryset = Product_Unit.objects.all()
    serializer_class = ProductUnitSerializer



class ProductDetailNameViewSet(viewsets.ModelViewSet):
    queryset = ProductDetailName.objects.all()
    serializer_class = ProductDetailNameSerializer



