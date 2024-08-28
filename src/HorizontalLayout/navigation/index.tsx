// ** MUI Imports
import Box from '@mui/material/Box'

// ** Type Import
import { LayoutProps } from '../types'

// ** Config Import
import themeConfig from '../themeConfig'

// ** Menu Components
import HorizontalNavItems from './HorizontalNavItems'

// ** Types
interface Props {
  settings: LayoutProps['settings']
  horizontalNavItems: NonNullable<NonNullable<LayoutProps['horizontalLayoutProps']>['navMenu']>['navItems']
}

const Navigation = (props: Props) =>
(
  <Box
    className='menu-content'
    sx={{
      display: 'flex',
      flexWrap: 'wrap',
      alignItems: 'center',
      '& > *': {
        '&:not(:last-child)': { mr: 1 },
        ...(themeConfig.menuTextTruncate && { maxWidth: 200 })
      }
    }}
  >
    <HorizontalNavItems {...props} />
  </Box>
)


export default Navigation
