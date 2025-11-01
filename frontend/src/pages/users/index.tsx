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
import CustomerComponent from 'src/views/Users/Customer'
import SellerComponent from "../../views/Users/Seller";
import CourierComponent from "../../views/Users/Courier";
import ManagerComponent from "../../views/Users/Manager";
import OrganizationComponent from "../../views/Users/Organization";
import TeamsComponent from "../../views/Users/Teams";
import UsersComponent from "../../views/Users/CustomUser";



const UsersPage = () => {
  return (
    <ApexChartWrapper>
      <Grid container spacing={6}>
        <Grid item xs={12} md={4}>
          <CustomerComponent />
        </Grid>
        <Grid item xs={12} md={8}>
          <SellerComponent />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <CourierComponent />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <ManagerComponent />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <OrganizationComponent />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <TeamsComponent />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <UsersComponent />
        </Grid>
      </Grid>
    </ApexChartWrapper>
  )
}

export default UsersPage
