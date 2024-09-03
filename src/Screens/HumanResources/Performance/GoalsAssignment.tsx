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

export default function GoalsAssignment() {
  const history = useNavigate()
  const { t } = useTranslation()
  function tableAction(param: any) {
    if (param.TYPE === 'EDIT') {
      history(`/app/esditddd-grade/${param.id}`)
    }
  }

  const GradesAssignmentJson = {
    title: 'Assign New Goal ',
    page: 'GradesAssignmen',
    endpoint: '',
    setFilter: '',
    table: {
      header: [
        {
          flex: 0.25,
          minWidth: 180,

          field: 'goalName',
          headerClassName: 'super-app-theme--header pl-3',

          headerName: t('Goal Name'),
          disableColumnMenu: true,
          renderCell: ({ row }: any) => {
            const { goalName, id } = row

            return (
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
                  <ButtonBase
                    onClick={() => {
                      tableAction({
                        TYPE: 'EDIT',
                        id
                      })
                    }}>
                    <Typography
                      noWrap
                      sx={{
                        fontWeight: 500,
                        textDecoration: 'none',
                        color: 'text.secondary',
                        '&:hover': { color: 'primary.main' }
                      }}>
                      {goalName}
                    </Typography>
                  </ButtonBase>
                </Box>
              </Box>
            )
          }
        },
        {
          flex: 0.25,
          minWidth: 180,
          field: 'employeeName',
          headerName: t('Employee Name'),
          headerClassName: 'super-app-theme--header pl-3',

          disableColumnMenu: true,
          renderCell: ({ row }: any) => {
            const { employeeName } = row

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
                    {employeeName}
                  </Typography>
                </Box>
              </Box>
            )
          }
        },
        {
          flex: 0.25,
          minWidth: 180,
          field: 'overallStatus',
          headerName: t('Overall Status'),
          headerClassName: 'super-app-theme--header pl-3 ',
          disableColumnMenu: true,
          renderCell: ({ row }: any) => {
            const { overallStatus } = row

            return (
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
                  <Typography
                    noWrap
                    sx={{
                      fontWeight: '500',
                      textDecoration: 'none',
                      color: 'text.secondary',

                      '&:hover': { color: 'primary.main' }
                    }}>
                    {overallStatus}
                  </Typography>
                </Box>
              </Box>
            )
          }
        },

        {
          flex: 0.25,
          minWidth: 180,
          field: 'hrRating',
          headerName: t('HR Rating'),
          headerClassName: 'super-app-theme--header pl-3 ',
          disableColumnMenu: true,
          renderCell: ({ row }: any) => {
            const { hrRating } = row

            return (
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
                  <Typography
                    noWrap
                    sx={{
                      fontWeight: '500',
                      textDecoration: 'none',
                      color: 'text.secondary',

                      '&:hover': { color: 'primary.main' }
                    }}>
                    {hrRating}
                  </Typography>
                </Box>
              </Box>
            )
          }
        },
        {
          flex: 0.25,
          minWidth: 180,
          field: 'showYesNo',
          headerName: t('Show(Yes/No)'),
          headerClassName: 'super-app-theme--header pl-3 ',
          disableColumnMenu: true,
          renderCell: ({ row }: any) => {
            const { showYesNo } = row

            return (
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
                  <Typography
                    noWrap
                    sx={{
                      fontWeight: '500',
                      textDecoration: 'none',
                      color: 'text.secondary',

                      '&:hover': { color: 'primary.main' }
                    }}>
                    {showYesNo}
                  </Typography>
                </Box>
              </Box>
            )
          }
        },

        validateAccess('edit-job-sequence') && {
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
      header: ['Goal Name', 'Employee Name', 'Overall Status', 'HR Rating', 'Show(Yes/No)'],
      data: ['goalName', 'employeeName', 'overallStatus', 'hrRating', 'showYesNo'],
      btnTitle: 'Add Sequence'
    },
    filters: null
  }

  const emitData = (param: any) => {
    switch (param.TYPE) {
      case 'NEW':
        return history('/app/assign-goal')
      default:
        console.log('test')
        break
    }
    console.log('param', param)
  }

  return (
    <Grid container spacing={6} sx={{ height: '100%', padding: 2 }}>
      <Grid item xs={12} sx={{ pb: 5 }}>
        <TableBox tableConfig={GradesAssignmentJson} emitData={emitData} />
      </Grid>
    </Grid>
  )
}
