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
import ProjectComponent from "../../views/PM/Project";
import TaskComponent from "../../views/PM/Task";
import MarketAnalysisComponent from "../../views/PM/MarketAnalysis";
import StrategicPlanningComponent from "../../views/PM/StrategicPlanning";
import ProjectManagementComponent from "../../views/PM/ProjectManagement";
import BudgetingComponent from "../../views/PM/Budgeting";
import ControlAndMonitoringComponent from "../../views/PM/ControlAndMonitoring";
import RiskManagementComponent from "../../views/PM/RiskManagement";
import DataAnalysisComponent from "../../views/PM/DataAnalysisL";
import DevelopmentProcessComponent from "../../views/PM/DevelopmentProcess";


const PmsPage = () => {
  return (
    <ApexChartWrapper>
      <Grid container spacing={6}>
        <Grid item xs={12} md={4}>
          <ProjectComponent />
        </Grid>
        <Grid item xs={12} md={8}>
          <TaskComponent />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <MarketAnalysisComponent />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <StrategicPlanningComponent />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <ProjectManagementComponent />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <BudgetingComponent />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <ControlAndMonitoringComponent />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <RiskManagementComponent />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <DataAnalysisComponent />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <DevelopmentProcessComponent />
        </Grid>

      </Grid>
    </ApexChartWrapper>
  )
}

export default PmsPage
