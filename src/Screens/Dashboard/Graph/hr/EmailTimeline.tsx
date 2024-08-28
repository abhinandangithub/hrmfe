// ** MUI Import
import MuiTimeline, { TimelineProps } from '@mui/lab/Timeline'
import TimelineConnector from '@mui/lab/TimelineConnector'
import TimelineContent from '@mui/lab/TimelineContent'
import TimelineDot from '@mui/lab/TimelineDot'
import TimelineItem from '@mui/lab/TimelineItem'
import TimelineSeparator from '@mui/lab/TimelineSeparator'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import MuiCardHeader, { CardHeaderProps } from '@mui/material/CardHeader'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import moment from 'moment'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import apiClient from '../../../../Util/apiClient'
// ** Custom Components Imports
import Icon from './icon'

// Styled Timeline component
const Timeline = styled(MuiTimeline)<TimelineProps>({
  paddingLeft: 0,
  paddingRight: 0,
  '& .MuiTimelineItem-root': {
    width: '100%',
    '&:before': {
      display: 'none'
    }
  }
})

const CardHeader = styled(MuiCardHeader)<CardHeaderProps>(({ theme }) => ({
  '& .MuiTypography-root': {
    lineHeight: 1.6,
    fontWeight: 500,
    fontSize: '1.125rem',
    letterSpacing: '0.15px',
    [theme.breakpoints.up('sm')]: {
      fontSize: '1.25rem'
    }
  }
}))

const EmailTimeline = () => {
  const [{ inbox }, setData] = useState({
    startDate: '',
    endDate: '',
    inbox: []
  })

  const getData = () => {
    apiClient.get('dashboard', {}).then(({ status, data }) => {
      if (status === 200) {
        setData(data)
      }
    })
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <Card sx={{ minHeight: '366px', maxHeight: '543px' }}>
      <CardHeader
        title={
          <Box sx={{ display: 'flex', alignItems: 'center', '& svg': { mr: 1, mt: 2 } }}>
            <Icon fontSize="1.25rem" icon="tabler:list-details" className="mb-3" />
            <Typography>Email</Typography>
          </Box>
        }
      />
      <CardContent>
        <Timeline>
          {inbox.map((item: any, index) => (
            <TimelineItem key={index}>
              <TimelineSeparator>
                <TimelineDot color="warning" sx={{ mt: 1.5 }} />
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent sx={{ pt: 0, mt: 0, mb: (theme) => `${theme.spacing(2)} !important` }}>
                <Box
                  sx={{
                    mb: 0.5,
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}>
                  <Typography variant="h6" sx={{ mr: 2 }}>
                    {item.entityType} ({item.status})
                  </Typography>
                  <Typography variant="caption" sx={{ color: 'text.disabled' }}>
                    {moment(item.createdAt).format('DD-MMM-YYYY hh:mm a')}
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Avatar src="/images/avatars/3.png" sx={{ mr: 3, width: 38, height: 38 }} />
                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                    <Link to="/app/inbox">
                      Go to Inbox <i className="flaticon-arrow-pointing-to-right" />
                    </Link>
                  </Box>
                </Box>
              </TimelineContent>
            </TimelineItem>
          ))}
        </Timeline>
      </CardContent>
    </Card>
  )
}

export default EmailTimeline
