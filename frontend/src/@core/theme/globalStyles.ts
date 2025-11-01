// ** MUI Imports
import { Theme, alpha } from '@mui/material/styles'

const GlobalStyles = (theme: Theme) => {
  const glassSurface =
    theme.palette.mode === 'light'
      ? alpha('#ffffff', 0.68)
      : alpha(theme.palette.background.paper, 0.88)

  const glassBorder =
    theme.palette.mode === 'light'
      ? alpha('#ffffff', 0.35)
      : alpha('#94a3b8', 0.2)

  const glassShadow =
    theme.palette.mode === 'light'
      ? '0 18px 48px rgba(15, 23, 42, 0.14)'
      : '0 20px 55px rgba(2, 6, 23, 0.55)'

  const primaryBlob =
    theme.palette.mode === 'light' ? alpha('#7c3aed', 0.28) : alpha('#6366f1', 0.48)
  const secondaryBlob =
    theme.palette.mode === 'light' ? alpha('#38bdf8', 0.25) : alpha('#0ea5e9', 0.45)
  const tertiaryBlob =
    theme.palette.mode === 'light' ? alpha('#22d3ee', 0.28) : alpha('#22d3ee', 0.4)
  const sheen = theme.palette.mode === 'light' ? alpha('#ffffff', 0.65) : alpha('#f5f3ff', 0.24)
  const base = theme.palette.mode === 'light' ? '#eef2ff' : '#050714'
  const baseAlt = theme.palette.mode === 'light' ? '#dde7ff' : '#0b1027'

  return {
    body: {
      '--liquid-glass-base': base,
      '--liquid-glass-base-alt': baseAlt,
      '--liquid-glass-primary': primaryBlob,
      '--liquid-glass-secondary': secondaryBlob,
      '--liquid-glass-tertiary': tertiaryBlob,
      '--liquid-glass-sheen': sheen,
      '--liquid-glass-surface': glassSurface,
      '--liquid-glass-border': glassBorder,
      '--liquid-glass-shadow': glassShadow,
      '--liquid-glass-backdrop': 'blur(26px)',
      color: theme.palette.text.primary,
      backgroundColor: 'transparent',
      transition: 'color 0.3s ease-in-out'
    },
    '.ps__rail-y': {
      zIndex: 1,
      right: '0 !important',
      left: 'auto !important',
      '&:hover, &:focus, &.ps--clicking': {
        backgroundColor: theme.palette.mode === 'light' ? '#E4E5EB !important' : '#423D5D !important'
      },
      '& .ps__thumb-y': {
        right: '3px !important',
        left: 'auto !important',
        backgroundColor: theme.palette.mode === 'light' ? '#C2C4D1 !important' : '#504B6D !important'
      },
      '.layout-vertical-nav &': {
        '& .ps__thumb-y': {
          width: 4,
          backgroundColor: theme.palette.mode === 'light' ? '#C2C4D1 !important' : '#504B6D !important'
        },
        '&:hover, &:focus, &.ps--clicking': {
          backgroundColor: 'transparent !important',
          '& .ps__thumb-y': {
            width: 6
          }
        }
      }
    },

    '#nprogress': {
      pointerEvents: 'none',
      '& .bar': {
        left: 0,
        top: 0,
        height: 3,
        width: '100%',
        zIndex: 2000,
        position: 'fixed',
        backgroundImage: `linear-gradient(90deg, ${theme.palette.primary.light}, ${theme.palette.secondary.main})`,
        boxShadow: '0 4px 18px rgba(124, 58, 237, 0.3)'
      }
    },
    '.layout-navbar .MuiToolbar-root, .layout-footer .footer-content-container, .layout-vertical-nav .MuiDrawer-paper': {
      background: 'var(--liquid-glass-surface)',
      border: `1px solid ${glassBorder}`,
      boxShadow: glassShadow,
      backdropFilter: 'var(--liquid-glass-backdrop)',
      WebkitBackdropFilter: 'var(--liquid-glass-backdrop)'
    },
    '.layout-page-content': {
      position: 'relative'
    }
  }
}

export default GlobalStyles
