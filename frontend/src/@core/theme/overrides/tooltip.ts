// ** MUI Imports
import { Theme, alpha } from '@mui/material/styles'

// ** Util Import
import { hexToRGBA } from 'src/@core/utils/hex-to-rgba'

const Tooltip = (theme: Theme) => {
  return {
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backdropFilter: 'blur(16px)',
          backgroundColor: alpha(theme.palette.background.paper, theme.palette.mode === 'light' ? 0.88 : 0.92),
          color: theme.palette.mode === 'light' ? theme.palette.text.primary : '#f8fbff',
          border: `1px solid ${
            theme.palette.mode === 'light' ? hexToRGBA('#ffffff', 0.35) : hexToRGBA('#94a3b8', 0.25)
          }`,
          boxShadow:
            theme.palette.mode === 'light'
              ? '0 18px 40px rgba(15, 23, 42, 0.18)'
              : '0 18px 40px rgba(2, 6, 23, 0.55)'
        },
        arrow: {
          color: alpha(theme.palette.background.paper, theme.palette.mode === 'light' ? 0.88 : 0.92)
        }
      }
    }
  }
}

export default Tooltip
