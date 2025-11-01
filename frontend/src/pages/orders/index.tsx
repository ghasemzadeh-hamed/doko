// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Icons Imports
// import Poll from 'mdi-material-ui/Poll'
// import CurrencyUsd from 'mdi-material-ui/CurrencyUsd'
// import HelpCircleOutline from 'mdi-material-ui/HelpCircleOutline'
// import BriefcaseVariantOutline from 'mdi-material-ui/BriefcaseVariantOutline'
// ** Custom Components Imports
// import CardStatisticsVerticalComponent from 'src/@core/components/card-statistics/card-stats-vertical'

// ** Styled Component Import
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'

// ** Demo Components Imports
import InvoiceComponent from 'src/views/Orders/Invoice'
import InvoiceHistoryComponent from "../../views/Orders/InvoiceHistory";
import OrderItemComponent from "../../views/Orders/OrderItem";
import OrderComponent from "../../views/Orders/Order";



const OrdersPage = () => {
  return (
    <ApexChartWrapper>
      <Grid container spacing={6}>
        <Grid item xs={12} md={4}>
          <InvoiceComponent />
        </Grid>
        <Grid item xs={12} md={8}>
          <InvoiceHistoryComponent />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <OrderItemComponent />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <OrderComponent />
        </Grid>
      </Grid>
    </ApexChartWrapper>
  )
}

export default OrdersPage
