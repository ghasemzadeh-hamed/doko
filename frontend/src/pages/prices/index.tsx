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
import ProductPriceComponent from "../../views/Price/ProductPrice";
import AppointmentsComponent from "../../views/Price/Appointments";



const PricesPage = () => {
  return (
    <ApexChartWrapper>
      <Grid container spacing={6}>
        <Grid item xs={12} md={4}>
          <ProductPriceComponent />
        </Grid>
        <Grid item xs={12} md={8}>
          <AppointmentsComponent />
        </Grid>

      </Grid>
    </ApexChartWrapper>
  )
}

export default PricesPage
