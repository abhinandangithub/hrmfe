import { Icon } from '@iconify/react'
import { ButtonBase } from '@mui/material'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { useTranslation } from 'react-i18next'
import { useNavigate  } from 'react-router-dom'
import RowOptions from '../../../Components/TableBoxGrid/RowOptions'
import TableBox from '../../../Components/TableBoxGrid/TableBox'
import { validateAccess } from '../../../Util/Util'

function WorkSchedule() {
  const { t } = useTranslation()
  const history = useNavigate()

  function tableAction(param: any) {
    if (param.TYPE === 'EDIT') {
      history(`/app/edit-work-schedules/${param.id}`)
    }
  }

  const WorkScheduleJson = {
    title: t('Work Schedule'),
    page: 'WORK_SCHEDULE',
    endpoint: 'work-schedules/getAll',
    setFilter: 'work-schedules.filterData',
    table: {
      header: [
        {
          flex: 0.12,
          minWidth: 100,
          field: 'scheduleId',
          headerName: t('Schedule Id'),
          headerClassName: 'super-app-theme--header',

          disableColumnMenu: true,
          renderCell: ({ row }: any) => {
            const { scheduleId, id } = row

            return (
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
                  <ButtonBase onClick={() => tableAction({ TYPE: 'EDIT', id })}>
                    <Typography
                      noWrap
                      sx={{
                        fontWeight: 500,
                        textDecoration: 'none',
                        color: 'text.secondary',
                        '&:hover': { color: 'primary.main' }
                      }}>
                      {scheduleId}
                    </Typography>
                  </ButtonBase>
                </Box>
              </Box>
            )
          }
        },
        {
          flex: 0.15,
          minWidth: 200,
          field: 'name',
          headerName: t('Schedule Name'),
          headerClassName: 'super-app-theme--header',

          disableColumnMenu: true,
          renderCell: ({ row }: any) => {
            const { name } = row
            return (
              <Typography
                noWrap
                sx={{
                  fontWeight: 500,
                  textDecoration: 'none',
                  color: 'text.secondary',
                  '&:hover': { color: 'primary.main' }
                }}>
                {name}
              </Typography>
            )
          }
        },
        {
          flex: 0.12,
          minWidth: 150,
          field: 'shift',
          headerName: t('Shift'),
          headerClassName: 'super-app-theme--header',

          disableColumnMenu: true,
          renderCell: ({ row }: any) => {
            const { shift } = row
            return (
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
                  <Typography
                    noWrap
                    sx={{
                      fontWeight: 500,
                      textDecoration: 'none',
                      color: 'text.secondary',
                      '&:hover': { color: 'primary.main' }
                    }}>
                    {shift}
                  </Typography>
                </Box>
              </Box>
            )
          }
        },
        {
          flex: 0.35,
          minWidth: 180,
          field: 'daysOfWorks',
          headerName: t('Days of Work'),
          headerClassName: 'super-app-theme--header',
          disableColumnMenu: true,
          renderCell: ({ row }: any) => {
            const { daysOfWorks } = row
            return (
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'row' }}>
                  <Typography
                    noWrap
                    sx={{
                      fontWeight: 500,
                      textDecoration: 'none',
                      color: 'text.secondary',
                      '&:hover': { color: 'primary.main' }
                    }}>
                    {daysOfWorks ? daysOfWorks.toString() : ''}
                  </Typography>
                </Box>
              </Box>
            )
          }
        },
        {
          flex: 0.6,
          minWidth: 180,
          field: 'workingHours',
          headerName: t('Working Hours'),
          headerClassName: 'super-app-theme--header',

          disableColumnMenu: true,
          renderCell: ({ row }: any) => {
            const { workingHours } = row
            return (
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                  {workingHours.map((el: any, index: any) => (
                    <Typography
                      noWrap
                      key={index}
                      sx={{
                        fontWeight: 500,
                        textDecoration: 'none',
                        color: 'text.secondary',
                        '&:hover': { color: 'primary.main' }
                      }}>
                      {`${el.from} - ${el.to}`}
                      {index !== workingHours.length - 1 && ','}
                    </Typography>
                  ))}
                </Box>
              </Box>
            )
          }
        },
        {
          flex: 0.1,
          minWidth: 100,
          field: 'interval',
          headerName: t('Break'),
          headerClassName: 'super-app-theme--header',
          disableColumnMenu: true,
          renderCell: ({ row }: any) => {
            const { interval } = row
            return (
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
                  <Typography
                    noWrap
                    sx={{
                      fontWeight: 500,
                      textDecoration: 'none',
                      color: 'text.secondary',
                      '&:hover': { color: 'primary.main' }
                    }}>
                    {interval} mins
                  </Typography>
                </Box>
              </Box>
            )
          }
        },
        validateAccess('edit-work-schedules') && {
          flex: 0.1,
          minWidth: 100,
          sortable: false,
          headerClassName: 'super-app-theme--header',
          disableColumnMenu: true,
          field: 'actions',
          headerName: '',
          renderHeader: () => (
            <Icon
              icon="lets-icons:setting-line-duotone-line"
              fontSize="1.5rem"
              className=""
              style={{ marginLeft: '3px' }}
            />
          ),
          renderCell: ({ row }: any) => <RowOptions id={row.id} tableAction={(e: any) => tableAction(e)} />
        }
      ],
      dataSource: []
    },
    export: {
      header: ['Schedule Id', 'Schedule Name', 'Shift', 'Days of Work', 'Working Hours', 'Break'],
      data: [
        'scheduleId',
        'name',
        'shift',
        'daysOfWorks',
        { type: 'ARRAY_FROM_TO', field: 'workingHours' },
        'interval'
      ],
      btnTitle: t('Add Work Schedule')
    },
    filters: null
  }

  const emitData = (param: any) => {
    switch (param.TYPE) {
      case 'NEW':
        return history('/app/add-work-schedules')
      default:
        console.log('test')
        break
    }
    console.log('param123', param)
  }

  return (
    <Grid container spacing={6} sx={{ height: '100%', padding: 2 }}>
      <Grid item xs={12} sx={{ pb: 5 }}>
        <TableBox tableConfig={WorkScheduleJson} emitData={emitData} autoHeight />
      </Grid>
    </Grid>
  )
}

export default WorkSchedule
