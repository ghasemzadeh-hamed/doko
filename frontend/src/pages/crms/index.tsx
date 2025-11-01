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
import ProfileComponent from 'src/views/CRM/Profile'
import CampaignComponent from 'src/views/CRM/Campaign '
import LeadComponent from 'src/views/CRM/Lead'
import ContactsComponent from 'src/views/CRM/Contacts'
import CRMTaskComponent from 'src/views/CRM/CRMTask'
import EventComponent from 'src/views/CRM/Event'
import ReminderComponent from 'src/views/CRM/Reminder'
import PlannerEventComponent from 'src/views/CRM/PlannerEvent'
import DocumentsComponent  from 'src/views/CRM/DocumentsComponent'
import AttachmentsComponent   from 'src/views/CRM/AttachmentsComponent'
import TicketComponent from "../../views/CRM/Ticket";
import NoteComponent from "../../views/CRM/Note";
// import ActivityComponent from "../../views/CRM/Activity";
import OpportunityComponent from "../../views/CRM/Opportunity";

const CRMs = () => {
  return (
    <ApexChartWrapper>
      <Grid container spacing={6}>
        <Grid item xs={12} md={4}>
          <ProfileComponent />
        </Grid>
        <Grid item xs={12} md={8}>
          <CampaignComponent />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <LeadComponent />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <ContactsComponent />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <CRMTaskComponent />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <TicketComponent />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <NoteComponent />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          {/*<ActivityComponent />*/}
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <EventComponent />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <OpportunityComponent />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <ReminderComponent />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <PlannerEventComponent />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <DocumentsComponent  />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <AttachmentsComponent   />
        </Grid>
        {/*<Grid item xs={12} md={12} lg={8}>*/}
        {/*  <DepositWithdraw />*/}
        {/*</Grid>*/}
        {/*<Grid item xs={12}>*/}
        {/*  <Table />*/}
        {/*</Grid>*/}
      </Grid>
    </ApexChartWrapper>
  )
}

export default CRMs
