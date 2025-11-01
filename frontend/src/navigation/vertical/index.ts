// ** Icon imports
import Login from 'mdi-material-ui/Login'
import Table from 'mdi-material-ui/Table'
import CubeOutline from 'mdi-material-ui/CubeOutline'
import HomeOutline from 'mdi-material-ui/HomeOutline'
import FormatLetterCase from 'mdi-material-ui/FormatLetterCase'
import AccountCogOutline from 'mdi-material-ui/AccountCogOutline'
import CreditCardOutline from 'mdi-material-ui/CreditCardOutline'
import AccountPlusOutline from 'mdi-material-ui/AccountPlusOutline'
import AlertCircleOutline from 'mdi-material-ui/AlertCircleOutline'
import GoogleCirclesExtended from 'mdi-material-ui/GoogleCirclesExtended'

// ** Type import
import { VerticalNavItemsType } from 'src/@core/layouts/types'

const navigation = (): VerticalNavItemsType => {
  return [
    {
      title: 'Dashboard',
      icon: HomeOutline,
      path: '/'
    },
    {
      title: 'Archives',
      icon: HomeOutline,
      path: '/archives'
    },
    {
      title: 'CRM',
      icon: HomeOutline,
      path: '/crms'
    },
    {
      title: 'Finance',
      icon: HomeOutline,
      path: '/finances'
    },
    {
      title: 'HR',
      icon: HomeOutline,
      path: '/hrs',
      children: [
        {
          title: 'OverTime',
          icon: HomeOutline,
          path: '/hrs/overtime'
        },

        {
          title: 'WorkingHours',
          icon: HomeOutline,
          path: '/hrs/WorkingHours'
        },
        {
          title: 'EmploymentContract',
          icon: HomeOutline,
          path: '/hrs/EmploymentContract'
        },
      ]
    },
    {
      title: 'Location',
      icon: HomeOutline,
      path: '/locations'
    },
    {
      title: 'Logistics',
      icon: HomeOutline,
      path: '/logistics'
    },
    {
      title: 'Orders',
      icon: HomeOutline,
      path: '/orders'
    },
    {
      title: 'Project Management',
      icon: HomeOutline,
      path: '/pms'
    },
    {
      title: 'Prices',
      icon: HomeOutline,
      path: '/prices'
    },
    {
      title: 'Products',
      icon: HomeOutline,
      path: '/products'
    },
   {
      title: 'Shops',
      icon: HomeOutline,
      path: '/shops'
    },
   {
      title: 'Users',
      icon: HomeOutline,
      path: '/users'
    },

    {
      title: 'Account Settings',
      icon: AccountCogOutline,
      path: '/account-settings'
    },
    {
      title: 'Platform Settings',
      icon: AccountCogOutline,
      path: '/settings'
    },
    {
      sectionTitle: 'Pages'
    },
    {
      title: 'Login',
      icon: Login,
      path: '/pages/login',
      openInNewTab: true
    },
    {
      title: 'Register',
      icon: AccountPlusOutline,
      path: '/pages/register',
      openInNewTab: true
    },
    {
      title: 'Error',
      icon: AlertCircleOutline,
      path: '/pages/error',
      openInNewTab: true
    },
    {
      sectionTitle: 'User Interface'
    },
    {
      title: 'Typography',
      icon: FormatLetterCase,
      path: '/typography'
    },
    {
      title: 'Icons',
      path: '/icons',
      icon: GoogleCirclesExtended
    },
    {
      title: 'Cards',
      icon: CreditCardOutline,
      path: '/cards'
    },
    {
      title: 'Tables',
      icon: Table,
      path: '/tables'
    },
    {
      icon: CubeOutline,
      title: 'Form Layouts',
      path: '/form-layouts'
    }
  ]
}

export default navigation
