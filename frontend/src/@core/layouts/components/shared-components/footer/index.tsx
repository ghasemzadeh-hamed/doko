// ** React Imports
import { ReactNode } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import { useTheme, alpha } from '@mui/material/styles'

// ** Type Import
import { Settings } from 'src/@core/context/settingsContext'

// ** Footer Content Component
import FooterContent from './FooterContent'

interface Props {
  settings: Settings
  saveSettings: (values: Settings) => void
  footerContent?: (props?: any) => ReactNode
}

const Footer = (props: Props) => {
  // ** Props
  const { settings, footerContent: userFooterContent } = props

  // ** Hook
  const theme = useTheme()

  // ** Vars
  const { contentWidth } = settings

  return (
    <Box
      component='footer'
      className='layout-footer'
      sx={{
        zIndex: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <Box
        className='footer-content-container'
        sx={{
          width: '100%',
          borderTopLeftRadius: 14,
          borderTopRightRadius: 14,
          padding: theme.spacing(4, 6),
          background: 'var(--liquid-glass-surface)',
          border: `1px solid ${
            theme.palette.mode === 'light' ? alpha('#ffffff', 0.35) : alpha('#94a3b8', 0.18)
          }`,
          boxShadow: 'var(--liquid-glass-shadow)',
          backdropFilter: 'var(--liquid-glass-backdrop)',
          WebkitBackdropFilter: 'var(--liquid-glass-backdrop)',
          ...(contentWidth === 'boxed' && { '@media (min-width:1440px)': { maxWidth: 1440 } })
        }}
      >
        {userFooterContent ? userFooterContent(props) : <FooterContent />}
      </Box>
    </Box>
  )
}

export default Footer
