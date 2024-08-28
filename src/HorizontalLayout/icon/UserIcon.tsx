// ** Type Import
import { IconProps } from '@iconify/react'

// ** Custom Icon Import
import Icon from './index'

const UserIcon = ({ icon, ...rest }: IconProps) =>
  <Icon icon={icon} {...rest} />


export default UserIcon
