// ** MUI Imports
import { Theme, alpha } from '@mui/material/styles'

const Snackbar = (theme: Theme) => {
  return {
    MuiSnackbarContent: {
      styleOverrides: {
        root: {
          color: theme.palette.mode === 'light' ? theme.palette.text.primary : '#f8fbff',
          background: 'var(--liquid-glass-surface)',
          border: `1px solid ${
            theme.palette.mode === 'light' ? alpha('#ffffff', 0.3) : alpha('#94a3b8', 0.2)
          }`,
          boxShadow:
            theme.palette.mode === 'light'
              ? '0 22px 60px rgba(15, 23, 42, 0.18)'
              : '0 22px 65px rgba(2, 6, 23, 0.6)',
          backdropFilter: 'blur(18px)',
          WebkitBackdropFilter: 'blur(18px)'
        }
      }
    }
  }
}

export default Snackbar
