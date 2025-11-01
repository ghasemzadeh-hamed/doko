// ** MUI Imports
import { Theme, alpha } from '@mui/material/styles'

const Paper = (theme: Theme) => {
  const borderColor = theme.palette.mode === 'light' ? alpha('#ffffff', 0.45) : alpha('#94a3b8', 0.24)
  const hoverShadow = theme.palette.mode === 'light' ? '0 32px 70px rgba(15, 23, 42, 0.18)' : '0 32px 80px rgba(2, 6, 23, 0.65)'

  return {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          backgroundColor: 'var(--liquid-glass-surface)',
          border: `1px solid ${borderColor}`,
          boxShadow: 'var(--liquid-glass-shadow)',
          backdropFilter: 'var(--liquid-glass-backdrop)',
          WebkitBackdropFilter: 'var(--liquid-glass-backdrop)',
          transition: 'background-color 0.3s ease, border-color 0.3s ease, box-shadow 0.4s ease, transform 0.4s ease',
          '&:hover': {
            boxShadow: hoverShadow,
            transform: 'translate3d(0, -2px, 0)'
          }
        }
      }
    }
  }
}

export default Paper
