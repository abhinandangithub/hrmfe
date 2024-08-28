// ** MUI Imports
import { AvatarProps } from '@mui/material/Avatar'

type ThemeColor = 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info'

export type CustomAvatarProps = AvatarProps & {
  color?: ThemeColor
  skin?: 'filled' | 'light' | 'light-static'
}
