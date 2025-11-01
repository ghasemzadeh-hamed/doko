// ** Type Imports
import { PaletteMode } from '@mui/material'
import { ThemeColor } from 'src/@core/layouts/types'

const DefaultPalette = (mode: PaletteMode, themeColor: ThemeColor) => {
  // ** Vars
  const lightColor = '24, 31, 56'
  const darkColor = '240, 244, 255'
  const mainColor = mode === 'light' ? lightColor : darkColor

  const primaryGradient = () => {
    if (themeColor === 'primary') {
      return '#a78bfa'
    } else if (themeColor === 'secondary') {
      return '#67e8f9'
    } else if (themeColor === 'success') {
      return '#4ade80'
    } else if (themeColor === 'error') {
      return '#fb7185'
    } else if (themeColor === 'warning') {
      return '#facc15'
    } else {
      return '#60a5fa'
    }
  }

  return {
    customColors: {
      main: mainColor,
      primaryGradient: primaryGradient(),
      tableHeaderBg: mode === 'light' ? '#F9FAFC' : '#3D3759'
    },
    common: {
      black: '#000',
      white: '#FFF'
    },
    mode: mode,
    primary: {
      light: '#a78bfa',
      main: '#7c3aed',
      dark: '#5b21b6',
      contrastText: '#FFF'
    },
    secondary: {
      light: '#67e8f9',
      main: '#22d3ee',
      dark: '#0ea5e9',
      contrastText: mode === 'light' ? '#042f2e' : '#ecfeff'
    },
    success: {
      light: '#86efac',
      main: '#22c55e',
      dark: '#15803d',
      contrastText: '#FFF'
    },
    error: {
      light: '#fca5a5',
      main: '#f43f5e',
      dark: '#be123c',
      contrastText: '#FFF'
    },
    warning: {
      light: '#fde68a',
      main: '#f59e0b',
      dark: '#b45309',
      contrastText: mode === 'light' ? '#2f1900' : '#fff7ed'
    },
    info: {
      light: '#60a5fa',
      main: '#3b82f6',
      dark: '#1d4ed8',
      contrastText: '#FFF'
    },
    grey: {
      50: '#FAFAFA',
      100: '#F5F5F5',
      200: '#EEEEEE',
      300: '#E0E0E0',
      400: '#BDBDBD',
      500: '#9E9E9E',
      600: '#757575',
      700: '#616161',
      800: '#424242',
      900: '#212121',
      A100: '#D5D5D5',
      A200: '#AAAAAA',
      A400: '#616161',
      A700: '#303030'
    },
    text: {
      primary: `rgba(${mainColor}, 0.87)`,
      secondary: `rgba(${mainColor}, 0.68)`,
      disabled: `rgba(${mainColor}, 0.38)`
    },
    divider: `rgba(${mainColor}, 0.12)`,
    background: {
      paper: mode === 'light' ? '#f7f9ff' : '#13172b',
      default: mode === 'light' ? '#eef2ff' : '#070b1a'
    },
    action: {
      active: `rgba(${mainColor}, 0.54)`,
      hover: `rgba(${mainColor}, 0.04)`,
      selected: `rgba(${mainColor}, 0.08)`,
      disabled: `rgba(${mainColor}, 0.3)`,
      disabledBackground: `rgba(${mainColor}, 0.18)`,
      focus: `rgba(${mainColor}, 0.12)`
    }
  }
}

export default DefaultPalette
