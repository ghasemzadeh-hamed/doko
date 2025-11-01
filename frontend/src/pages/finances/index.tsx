// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Icons Imports
import Poll from 'mdi-material-ui/Poll'
import CurrencyUsd from 'mdi-material-ui/CurrencyUsd'
import HelpCircleOutline from 'mdi-material-ui/HelpCircleOutline'
import BriefcaseVariantOutline from 'mdi-material-ui/BriefcaseVariantOutline'

// ** Custom Components Imports
import CardStatisticsVerticalComponent from 'src/@core/components/card-statistics/card-stats-vertical'

// ** Styled Component Import
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'

// ** Demo Components Imports
import WalletComponent from "../../views/Finance/Wallet";
import PaymentMethodComponent from "../../views/Finance/PaymentMethod";
import PaymentComponent from "../../views/Finance/Payment";
import CourierExpenseComponent from "../../views/Finance/CourierExpense";
import IncomeComponent from "../../views/Finance/Income";
import TotalIncomeComponent from "../../views/Finance/TotalIncome";
import ExpenseComponent from "../../views/Finance/Expense";
import TotalExpensesComponent from "../../views/Finance/TotalExpenses";
import CommissionComponent from "../../views/Finance/Commission";
import SellerCommissionComponent from "../../views/Finance/SellerCommission";
import FinancialKeysComponent from "../../views/Finance/FinancialKeys";
import TaxSettingComponent from "../../views/Finance/TaxSetting";
import TaxOperationComponent from "../../views/Finance/TaxOperation";
import DebtComponent from "../../views/Finance/Debt";
import RefundComponent from "../../views/Finance/Refund";
import SalaryComponent from "../../views/Finance/Salary";



const FinancePage = () => {
  return (
    <ApexChartWrapper>
      <Grid container spacing={6}>
        <Grid item xs={12} md={4}>
          <WalletComponent />
        </Grid>
        <Grid item xs={12} md={8}>
          <PaymentMethodComponent />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <PaymentComponent />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <CourierExpenseComponent />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <IncomeComponent />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <TotalIncomeComponent />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <ExpenseComponent />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <TotalExpensesComponent />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <CommissionComponent />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <SellerCommissionComponent />
        </Grid>

        <Grid item xs={12} md={6} lg={4}>
          <FinancialKeysComponent />
        </Grid>

        <Grid item xs={12} md={6} lg={4}>
          <TaxSettingComponent />
        </Grid>

        <Grid item xs={12} md={6} lg={4}>
          <TaxOperationComponent />
        </Grid>

        <Grid item xs={12} md={6} lg={4}>
          <DebtComponent />
        </Grid>

        <Grid item xs={12} md={6} lg={4}>
          <RefundComponent />
        </Grid>

        <Grid item xs={12} md={6} lg={4}>
          <SalaryComponent />
        </Grid>

      </Grid>
    </ApexChartWrapper>
  )
}

export default FinancePage
