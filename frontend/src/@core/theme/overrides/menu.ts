// ** MUI Imports
import { Theme, alpha } from '@mui/material/styles'

const Menu = (theme: Theme) => {
  return {
    MuiMenu: {
      styleOverrides: {
        root: {
          '& .MuiMenu-paper': {
            borderRadius: 12,
            boxShadow: 'var(--liquid-glass-shadow)',
            background: 'var(--liquid-glass-surface)',
            border: `1px solid ${
              theme.palette.mode === 'light' ? alpha('#ffffff', 0.35) : alpha('#94a3b8', 0.2)
            }`,
            backdropFilter: 'var(--liquid-glass-backdrop)',
            WebkitBackdropFilter: 'var(--liquid-glass-backdrop)'
          }
        }
      }
    }
  }
}

export default Menu
