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
import ProductComponent from "../../views/Products/Product";
import ServiceComponent from "../../views/Products/Service";
import ProductUnitComponent from "../../views/Products/ProductUnit";
import ProductDetailComponent from "../../views/Products/ProductDetail";
import ProductMediaComponent from "../../views/Products/ProductMedia";

const ProductsPage = () => {
  return (
    <ApexChartWrapper>
      <Grid container spacing={6}>
        <Grid item xs={12} md={4}>
          <ProductComponent />
        </Grid>
        <Grid item xs={12} md={8}>
          <ServiceComponent />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <ProductUnitComponent />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <ProductDetailComponent />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <ProductMediaComponent />
        </Grid>
      </Grid>
    </ApexChartWrapper>
  )
}

export default ProductsPage
