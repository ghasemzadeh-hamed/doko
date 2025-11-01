// ** MUI Imports
import { Theme, alpha } from '@mui/material/styles'

// ** Theme Config Imports
import themeConfig from 'src/configs/themeConfig'

const Button = (theme: Theme) => {
  return {
    MuiButton: {
      styleOverrides: {
        root: {
          fontWeight: 500,
          lineHeight: 1.71,
          letterSpacing: '0.3px',
          padding: `${theme.spacing(1.875, 3)}`,
          textTransform: 'none',
          borderRadius: 12,
          transition:
            'background 0.35s ease, color 0.35s ease, box-shadow 0.35s ease, transform 0.25s ease',
          '&:hover': {
            transform: 'translate3d(0, -2px, 0)'
          }
        },
        contained: {
          boxShadow:
            theme.palette.mode === 'light'
              ? '0 15px 45px rgba(124, 58, 237, 0.35)'
              : '0 20px 55px rgba(99, 102, 241, 0.45)',
          padding: `${theme.spacing(1.875, 5.5)}`,
          backgroundImage: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
          color: theme.palette.primary.contrastText,
          '&:hover': {
            boxShadow:
              theme.palette.mode === 'light'
                ? '0 20px 55px rgba(124, 58, 237, 0.45)'
                : '0 24px 68px rgba(99, 102, 241, 0.55)',
            backgroundImage: `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.secondary.dark})`
          }
        },
        outlined: {
          padding: `${theme.spacing(1.625, 5.25)}`,
          borderWidth: 2,
          borderColor: alpha(theme.palette.primary.main, 0.35),
          backgroundColor: alpha(theme.palette.primary.main, 0.06),
          '&:hover': {
            borderColor: alpha(theme.palette.primary.main, 0.55),
            backgroundColor: alpha(theme.palette.primary.main, 0.12)
          }
        },
        text: {
          color: theme.palette.primary.main,
          '&:hover': {
            backgroundColor: alpha(theme.palette.primary.main, 0.08)
          }
        },
        sizeSmall: {
          padding: `${theme.spacing(1, 2.25)}`,
          '&.MuiButton-contained': {
            padding: `${theme.spacing(1, 3.5)}`
          },
          '&.MuiButton-outlined': {
            padding: `${theme.spacing(0.75, 3.25)}`
          }
        },
        sizeLarge: {
          padding: `${theme.spacing(2.125, 5.5)}`,
          '&.MuiButton-contained': {
            padding: `${theme.spacing(2.125, 6.5)}`
          },
          '&.MuiButton-outlined': {
            padding: `${theme.spacing(1.875, 6.25)}`
          }
        }
      }
    },
    MuiButtonBase: {
      defaultProps: {
        disableRipple: themeConfig.disableRipple
      }
    }
  }
}

export default Button
