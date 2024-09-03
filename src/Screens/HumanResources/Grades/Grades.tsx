import { Icon } from '@iconify/react'
import { ButtonBase } from '@mui/material'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import moment from 'moment'
import { useTranslation } from 'react-i18next'
import { useNavigate  } from 'react-router-dom'
import RowOptions from '../../../Components/TableBoxGrid/RowOptions'
import TableBox from '../../../Components/TableBoxGrid/TableBox'

export default function Grades() {
  const history = useNavigate()
  const { t } = useTranslation()

  function tableAction(param: any) {
    if (param.TYPE === 'EDIT') {
      history(`/app/edit-grade/${param.id}`)
    }
  }
  const GradesJson = {
    title: 'Grades Overview',
    page: 'Grades',
    endpoint: 'grades/get',
    setFilter: 'grades.filterData',
    table: {
      header: [
        {
          flex: 0.25,
          minWidth: 180,

          field: 'validFrom',
          headerClassName: 'super-app-theme--header pl-3',

          headerName: t('Valid From'),
          disableColumnMenu: true,
          renderCell: ({ row }: any) => {
            const { validFrom, id } = row

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
                      {validFrom ? moment(validFrom).format('YYYY-MM-DD') : ''}
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
          field: 'validTo',
          headerName: t('Valid To'),
          headerClassName: 'super-app-theme--header pl-3',

          disableColumnMenu: true,
          renderCell: ({ row }: any) => {
            const { validTo } = row

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
                    {validTo ? moment(validTo).format('YYYY-MM-DD') : ''}
                  </Typography>
                </Box>
              </Box>
            )
          }
        },
        {
          flex: 0.25,
          minWidth: 180,
          field: 'gradeId',
          headerName: t('Grade ID'),
          headerClassName: 'super-app-theme--header pl-3 ',
          disableColumnMenu: true,
          renderCell: ({ row }: any) => {
            const { gradeId } = row

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
                    {gradeId}
                  </Typography>
                </Box>
              </Box>
            )
          }
        },
        {
          flex: 0.25,
          minWidth: 180,
          field: 'gradeName',
          headerName: t('Grade Name'),
          headerClassName: 'super-app-theme--header pl-3 ',
          disableColumnMenu: true,
          renderCell: ({ row }: any) => {
            const { gradeName } = row

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
                    {gradeName}
                  </Typography>
                </Box>
              </Box>
            )
          }
        },

        {
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
      header: ['Valid From', 'Valid To', 'Grade ID', 'Grade Name'],
      data: ['validFrom', 'validTo', 'gradeId', 'gradeName'],
      btnTitle: 'Add Grade'
    },
    filters: null
  }

  const emitData = (param: any) => {
    switch (param.TYPE) {
      case 'NEW':
        return history('/app/add-grade')
      default:
        console.log('test')
        break
    }
    console.log('param', param)
  }

  return (
    <Grid container spacing={6} sx={{ height: '100%', padding: 2 }}>
      <Grid item xs={12} sx={{ pb: 5 }}>
        <TableBox tableConfig={GradesJson} emitData={emitData} />
      </Grid>
    </Grid>
  )
}
