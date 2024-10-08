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

export default function Goals() {
  const history = useNavigate()
  const { t } = useTranslation()

  function tableAction(param: any) {
    if (param.TYPE === 'EDIT') {
      history(`/app/editdd-grade/${param.id}`)
    }
  }

  const GoalsJson = {
    title: 'GOALS CONFIGURATON',
    page: 'GOALS',
    endpoint: '',
    setFilter: '',
    table: {
      header: [
        {
          flex: 0.25,
          minWidth: 180,

          field: 'appraisalName',
          headerClassName: 'super-app-theme--header pl-3',

          headerName: t('Goal Name'),
          disableColumnMenu: true,
          renderCell: ({ row }: any) => {
            const { appraisalName, id } = row

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
                      {appraisalName}
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
          field: 'appraisalStartDate',
          headerName: t('Goal Start Date'),
          headerClassName: 'super-app-theme--header pl-3',

          disableColumnMenu: true,
          renderCell: ({ row }: any) => {
            const { appraisalStartDate } = row

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
                    {appraisalStartDate}
                  </Typography>
                </Box>
              </Box>
            )
          }
        },
        {
          flex: 0.25,
          minWidth: 180,
          field: 'appraisalEndDate',
          headerName: t('Goal End Date'),
          headerClassName: 'super-app-theme--header pl-3 ',
          disableColumnMenu: true,
          renderCell: ({ row }: any) => {
            const { appraisalEndDate } = row

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
                    {appraisalEndDate}
                  </Typography>
                </Box>
              </Box>
            )
          }
        },

        {
          flex: 0.25,
          minWidth: 180,
          field: 'hrRatingStartDate',
          headerName: t('HR Rating Start Date'),
          headerClassName: 'super-app-theme--header pl-3 ',
          disableColumnMenu: true,
          renderCell: ({ row }: any) => {
            const { hrRatingStartDate } = row

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
                    {hrRatingStartDate}
                  </Typography>
                </Box>
              </Box>
            )
          }
        },

        {
          flex: 0.25,
          minWidth: 180,
          field: 'hrRatingEndDate',
          headerName: t('HR Rating End Date'),
          headerClassName: 'super-app-theme--header pl-3 ',
          disableColumnMenu: true,
          renderCell: ({ row }: any) => {
            const { hrRatingEndDate } = row

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
                    {hrRatingEndDate}
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
      header: ['Goal Name', 'Goal Start Date', 'Goal End Date', 'HR Rating Start Date', 'HR Rating End Date'],
      data: [
        'appraisalName',
        'appraisalStartDate',
        'appraisalEndDate',
        'hrRatingStartDate',
        'hrRatingEndDate'
      ],
      btnTitle: 'Add Sequence'
    },
    filters: null
  }
  const emitData = (param: any) => {
    switch (param.TYPE) {
      case 'NEW':
        return history('/app/add-goal')
      default:
        console.log('test')
        break
    }
    console.log('param', param)
  }

  return (
    <Grid container spacing={6} sx={{ height: '100%', padding: 2 }}>
      <Grid item xs={12} sx={{ pb: 5 }}>
        <TableBox tableConfig={GoalsJson} emitData={emitData} />
      </Grid>
    </Grid>
  )
}
