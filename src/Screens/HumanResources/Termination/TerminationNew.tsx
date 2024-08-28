import { Icon } from '@iconify/react'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import moment from 'moment'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'
import RowOptions from '../../../Components/TableBoxGrid/RowOptions'
import TableBox from '../../../Components/TableBoxGrid/TableBox'
import { validateAccess } from '../../../Util/Util'

export default function Termination() {
  const history = useHistory()
  const { t } = useTranslation()

  function tableAction(param: any) {
    if (param.TYPE === 'EDIT') {
      history.push(`/app/edit-termination/${param.id}`)
    }
  }

  const TerminationJson = {
    title: 'Termination Overview',
    page: 'TERMINATION_EMPLOYEE',
    endpoint: 'termination/get-all',
    setFilter: 'Termination.filterData',
    table: {
      header: [
        {
          flex: 0.25,
          minWidth: 180,
          field: 'employee',
          headerClassName: 'super-app-theme--header',

          headerName: t('Employee'),
          disableColumnMenu: true,
          renderCell: ({ row }: any) => {
            const { employeeData } = row
            const emp = employeeData.map((x: any) => x.name)

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
                    {emp.toString()}
                  </Typography>
                </Box>
              </Box>
            )
          }
        },
        {
          flex: 0.25,
          minWidth: 180,
          field: 'RefNo',
          headerName: t('Reference Number'),
          headerClassName: 'super-app-theme--header',
          disableColumnMenu: true
        },
        {
          flex: 0.25,
          minWidth: 180,
          field: 'terminationDate',
          headerName: t('Termination Date'),
          headerClassName: 'super-app-theme--header',

          disableColumnMenu: true,
          renderCell: ({ row }: any) => {
            const { terminationDate } = row

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
                    {terminationDate ? moment(terminationDate).format('YYYY-MM-DD') : ''}
                  </Typography>
                </Box>
              </Box>
            )
          }
        },

        {
          flex: 0.25,
          minWidth: 180,
          field: 'lastWorkingDate',
          headerName: t('Last Working Date'),
          headerClassName: 'super-app-theme--header',

          disableColumnMenu: true,
          renderCell: ({ row }: any) => {
            const { lastWorkingDate } = row

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
                    {lastWorkingDate ? moment(lastWorkingDate).format('YYYY-MM-DD') : ''}
                  </Typography>
                </Box>
              </Box>
            )
          }
        },
        {
          flex: 0.25,
          minWidth: 180,
          field: 'remarks',
          headerName: t('Remarks'),
          headerClassName: 'super-app-theme--header',
          disableColumnMenu: true
        },
        validateAccess('edit-termination') && {
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
      header: ['Employee', 'Termination Date', 'Reference Number', 'Last Working Date', 'Remarks'],
      data: [
        { type: 'ARRAY', field: 'employeeData', showField: 'name' },
        'RefNo',
        { type: 'DATE', field: 'terminationDate' },
        { type: 'DATE', field: 'lastWorkingDate' },
        'remarks'
      ],
      btnTitle: 'Add Terminations'
    },
    filters: null
  }

  const emitData = (param: any) => {
    switch (param.TYPE) {
      case 'NEW':
        return history.push('/app/add-termination')
      default:
        console.log('test')
        break
    }
    console.log('param', param)
  }
  return (
    <Grid container spacing={6} sx={{ height: '100%', padding: 2 }}>
      <Grid item xs={12} sx={{ pb: 5 }}>
        <TableBox tableConfig={TerminationJson} emitData={emitData} />
      </Grid>
    </Grid>
  )
}
