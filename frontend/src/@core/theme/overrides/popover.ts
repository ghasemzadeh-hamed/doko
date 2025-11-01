// ** MUI Imports
import { Theme, alpha } from '@mui/material/styles'

const Popover = (theme: Theme) => {
  return {
    MuiPopover: {
      styleOverrides: {
        root: {
          '& .MuiPopover-paper': {
            boxShadow: 'var(--liquid-glass-shadow)',
            background: 'var(--liquid-glass-surface)',
            borderRadius: 12,
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

export default Popover
