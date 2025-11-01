// ** MUI Imports
import Grid from '@mui/material/Grid'


// ** Styled Component Import
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'

// ** Office Components Imports
import OfficeList from 'src/views/Shops/OfficeList'
import AddOffice from 'src/views/Shops/AddOffice'
import DeleteOffice from 'src/views/Shops/DeleteOffice'
import EditOffice from 'src/views/Shops/EditOffice'

// ** ServiceProvider Components Imports
import ServiceProviderList from 'src/views/Shops/ServiceProviderList'
import AddServiceProvider from 'src/views/Shops/AddServiceProvider'
import DeleteServiceProvider from 'src/views/Shops/DeleteServiceProvider'
import EditServiceProvider from 'src/views/Shops/EditServiceProvider'

// ** Store Components Imports
import StoreList from 'src/views/Shops/StoreList'
import AddStore from 'src/views/Shops/AddStore'
import DeleteStore from 'src/views/Shops/DeleteStore'
import EditStore from 'src/views/Shops/EditStore'

// ** Warehouse Components Imports
import WarehouseList from 'src/views/Shops/WarehouseList'
import AddWarehouse from 'src/views/Shops/AddWarehouse'
import DeleteWarehouse from 'src/views/Shops/DeleteWarehouse'
import EditWarehouse from 'src/views/Shops/EditWarehouse'


const Shops = () => {
  return (
    <ApexChartWrapper>
      <Grid container spacing={6}>
        <Grid item xs={12} md={4}>
          <OfficeList />
        </Grid>
        <Grid item xs={12} md={8}>
          <AddOffice />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <DeleteOffice />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <EditOffice />
        </Grid>
        <Grid item xs={12} md={4}>
          <ServiceProviderList />
        </Grid>
        <Grid item xs={12} md={8}>
          <AddServiceProvider />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <DeleteServiceProvider />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <EditServiceProvider />
        </Grid>
        <Grid item xs={12} md={4}>
          <StoreList />
        </Grid>
        <Grid item xs={12} md={8}>
          <AddStore />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <DeleteStore />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <EditStore />
        </Grid>

        <Grid item xs={12} md={4}>
          <WarehouseList />
        </Grid>
        <Grid item xs={12} md={8}>
          <AddWarehouse />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <DeleteWarehouse />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <EditWarehouse />
        </Grid>

      </Grid>
    </ApexChartWrapper>
  )
}

export default Shops
