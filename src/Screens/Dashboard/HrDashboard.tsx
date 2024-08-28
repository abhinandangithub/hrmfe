/* eslint-disable react/button-has-type */
/* eslint-disable default-case */
// import React from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import { useSelector } from '../../Hooks/redux'
import './Dashboard.scss'
import CardStatsVertical from './Graph/hr/card-stats-vertical'
import EmailTimeline from './Graph/hr/EmailTimeline'
import SalesWithAreaChart from './Graph/hr/SalesWithAreaChart'
import ApexChartWrapper from './Graph/react-apexcharts'

const StyledGrid = styled(Grid)`
  ${({ theme }) => `
  cursor: pointer;
 
  transition: ${theme.transitions.create(['background-color', 'transform'], {
    duration: theme.transitions.duration.standard
  })};
  &:hover {
    transform: scale(1.05);
  }
  `}
`

function Crm() {
  const userInfo = useSelector((state) => state?.users?.userInfo)

  return (
    <ApexChartWrapper className="m-4 ">
      <Grid container spacing={6}>
        <Grid container item spacing={6} xs={12} sm={12} lg={6}>
          <StyledGrid item xs={12} sm={12} lg={12} className="mb-0">
            <Card style={{ minHeight: '100px', width: '103%' }}>
              <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-center' }}>
                <Typography variant="h5" sx={{ mb: 1 }}>
                  Welcome, <span>{userInfo ? userInfo.name : ''}</span>
                </Typography>

                <Typography variant="body2" sx={{ mb: 1, color: 'text.disabled' }}>
                  You have <strong /> access in this company
                </Typography>
              </CardContent>
            </Card>
          </StyledGrid>

          <StyledGrid
            item
            xs={6}
            sm={4}
            lg={4}
            className="mt-0"
            style={{ position: 'relative', bottom: '5%' }}>
            <SalesWithAreaChart />
          </StyledGrid>
          {/* <StyledGrid item xs={6} sm={4} lg={2}>
          <Sessions />
        </StyledGrid> */}

          <StyledGrid item xs={6} sm={6} lg={4} style={{ position: 'relative', bottom: '5%' }}>
            <CardStatsVertical
              sx={{ minHeight: '203px', maxHeight: '543px', width: '110%' }}
              stats="24 Days"
              chipColor="default"
              avatarColor="success"
              title="Leave Available"
              subtitle="Last week"
              avatarIcon="tabler:credit-card-filled"
            />
          </StyledGrid>

          <StyledGrid item xs={6} sm={6} lg={4} style={{ position: 'relative', bottom: '5%' }}>
            <CardStatsVertical
              sx={{ width: '110%' }}
              stats="Approved"
              chipColor="default"
              avatarColor="error"
              title="Time Sheet"
              subtitle="Last week"
              avatarIcon="solar:suitcase-bold"
            />
          </StyledGrid>
        </Grid>
        <Grid container item spacing={6} xs={12} sm={12} lg={6}>
          <StyledGrid item xs={12} md={12}>
            <EmailTimeline />
          </StyledGrid>
        </Grid>

        {/* <StyledGrid item xs={6} sm={6} lg={4}>
          <CardStatsVertical
            stats='24.67k'
            chipText='+25.2%'
            chipColor='default'
            avatarColor='success'
            title='New Employee'
            subtitle='Last week'
            avatarIcon='tabler:credit-card-filled'
          />
        </StyledGrid>
        <StyledGrid item xs={12} sm={8} lg={4}>
          <RevenueGrowth />
        </StyledGrid>
        <StyledGrid item xs={12} md={6}>
          <ActivityTimeline />
        </StyledGrid> */}
      </Grid>
    </ApexChartWrapper>
  )
}

export default Crm
