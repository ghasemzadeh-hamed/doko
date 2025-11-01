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
import ShipmentComponent  from 'src/views/Logistics/Shipment'
import InventoryComponent from "../../views/Logistics/Inventory";
import StoreItemComponent from "../../views/Logistics/StoreItem";


const LogisticsPage = () => {
  return (
    <ApexChartWrapper>
      <Grid container spacing={6}>
        <Grid item xs={12} md={4}>
          <ShipmentComponent  />
        </Grid>
        <Grid item xs={12} md={8}>
          <InventoryComponent />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <StoreItemComponent />
        </Grid>
      </Grid>
    </ApexChartWrapper>
  )
}

export default LogisticsPage
