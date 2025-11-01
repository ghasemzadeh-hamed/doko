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
import PlatformSettingsComponent from "../../views/settings/PlatformSettings";
import NavigationLinksComponent from "../../views/settings/NavigationLinks";
import TagsComponent from "../../views/settings/Tag";
import RoleComponent from "../../views/settings/Role";
import UnitComponent from "../../views/settings/Unit";




const SettingsPage = () => {
  return (
    <ApexChartWrapper>
      <Grid container spacing={6}>
        <Grid item xs={12} md={4}>
          <PlatformSettingsComponent />
        </Grid>
        <Grid item xs={12} md={8}>
          <NavigationLinksComponent />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <TagsComponent />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <RoleComponent />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <UnitComponent />
        </Grid>
      </Grid>
    </ApexChartWrapper>
  )
}

export default SettingsPage
