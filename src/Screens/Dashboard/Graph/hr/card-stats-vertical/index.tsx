// ** MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'

// ** Type Import
import { CardStatsVerticalProps } from './types'

// ** Custom Component Import
import CustomAvatar from '../../../../../mui/avatar'
import Icon from '../icon'



const CardStatsVertical = (props: CardStatsVerticalProps) => {
  // ** Props
  const {
    sx,
    stats,
    title,
    subtitle,
    avatarIcon,
    avatarSize = 44,
    iconSize = '1.75rem',
    avatarColor = 'primary'
  } = props

  // const RenderChip = chipColor === 'default' ? Chip : CustomChip

  return (
    <Card sx={{ ...sx }} style={{ minHeight: '230px', maxHeight: '230px' }}>
      <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>

        <Typography variant='h5' sx={{ mb: 1 }}>
          {title}
        </Typography>
        <Typography variant='body2' sx={{ mb: 1, color: 'text.disabled' }}>
          {subtitle}
        </Typography>
        <CustomAvatar
          skin='light'
          variant='rounded'
          color={avatarColor}
          sx={{ mb: 2, width: avatarSize, height: avatarSize }}
        >
          <Icon icon={avatarIcon} fontSize={iconSize} />
        </CustomAvatar>
        <Typography sx={{ mb: 2, color: 'text.secondary' }}>{stats}</Typography>
        {/* <RenderChip
          size='small'
          label={chipText}
          color={chipColor}
          {...(chipColor === 'default'
            ? { sx: { borderRadius: '4px', color: 'text.secondary' } }
            : { rounded: true, skin: 'light' })}
        /> */}
      </CardContent>
    </Card>
  )
}

export default CardStatsVertical
