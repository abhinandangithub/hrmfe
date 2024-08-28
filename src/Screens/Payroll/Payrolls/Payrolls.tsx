import { Icon } from '@iconify/react'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'
import RowOptions from '../../../Components/TableBoxGrid/RowOptions'
import TableBox from '../../../Components/TableBoxGrid/TableBox'

export default function Payrolls() {
  const history = useHistory()
  const { t } = useTranslation()

  function tableAction(param: any) {
    if (param.TYPE === 'EDIT') {
      history.push(`/app/edit-division/${param.id}`)
    }
  }

  const PayrollsJson = {
    title: 'PAYROLL OVERVIEW',
    page: 'PAYROLLRUN',
    endpoint: 'payroll/getAll',
    setFilter: 'payrolls.filterData',
    table: {
      header: [
        {
          flex: 0.25,
          minWidth: 280,
          field: 'employeeNo',
          headerName: t('Employee ID'),
          headerClassName: 'super-app-theme--header',

          disableColumnMenu: true,
          renderCell: ({ row }: any) => {
            const { employeeNo } = row

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
                    {employeeNo}
                  </Typography>
                </Box>
              </Box>
            )
          }
        },
        {
          flex: 0.15,
          minWidth: 280,
          field: 'name',
          headerName: t('Employee Name'),
          headerClassName: 'super-app-theme--header',

          disableColumnMenu: true,
          renderCell: ({ row }: any) => {
            const { name } = row

            return (
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
                  <Typography
                    noWrap
                    sx={{
                      fontWeight: 500,
                      textDecoration: 'none',
                      color: 'text.secondary'
                    }}>
                    {name}
                  </Typography>
                </Box>
              </Box>
            )
          }
        },
        {
          flex: 0.25,
          minWidth: 280,
          field: 'email',
          headerName: t('Email'),
          headerClassName: 'super-app-theme--header',

          disableColumnMenu: true,
          sortable: false,

          renderCell: ({ row }: any) => {
            const { email } = row

            return (
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
                  <Typography
                    noWrap
                    sx={{
                      fontWeight: 500,
                      textDecoration: 'none',
                      color: 'text.secondary'
                    }}>
                    {email}
                  </Typography>
                </Box>
              </Box>
            )
          }
        },

        {
          flex: 0.25,
          minWidth: 280,
          field: 'isApproved',
          headerName: t('Approval Status'),
          headerClassName: 'super-app-theme--header',

          disableColumnMenu: true,
          sortable: false,

          renderCell: ({ row }: any) => {
            const { isApproved } = row

            return (
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
                  <Typography
                    noWrap
                    sx={{
                      fontWeight: 500,
                      textDecoration: 'none',
                      color: 'text.secondary'
                    }}>
                    {isApproved}
                  </Typography>
                </Box>
              </Box>
            )
          }
        },
        {
          flex: 0.25,
          minWidth: 280,
          field: 'month',
          headerName: t('Month'),
          headerClassName: 'super-app-theme--header',

          disableColumnMenu: true,
          sortable: false,

          renderCell: ({ row }: any) => {
            const { month } = row

            return (
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
                  <Typography
                    noWrap
                    sx={{
                      fontWeight: 500,
                      textDecoration: 'none',
                      color: 'text.secondary'
                    }}>
                    {month}
                  </Typography>
                </Box>
              </Box>
            )
          }
        },
        {
          flex: 0.25,
          minWidth: 280,
          field: 'year',
          headerName: t('Year'),
          headerClassName: 'super-app-theme--header',

          disableColumnMenu: true,
          sortable: false,

          renderCell: ({ row }: any) => {
            const { year } = row

            return (
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
                  <Typography
                    noWrap
                    sx={{
                      fontWeight: 500,
                      textDecoration: 'none',
                      color: 'text.secondary'
                    }}>
                    {year}
                  </Typography>
                </Box>
              </Box>
            )
          }
        },
        {
          flex: 0.25,
          minWidth: 280,
          field: 'updatedAt',
          headerName: t('Last Generated'),
          headerClassName: 'super-app-theme--header',

          disableColumnMenu: true,
          sortable: false,

          renderCell: ({ row }: any) => {
            const { updatedAt } = row

            return (
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
                  <Typography
                    noWrap
                    sx={{
                      fontWeight: 500,
                      textDecoration: 'none',
                      color: 'text.secondary'
                    }}>
                    {updatedAt}
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
      header: ['Employee ID', 'Employee Name', 'Email', 'Approval Status', 'Month', 'Year', 'Last Generated'],
      data: ['employeeNo', 'name', 'email', 'isApproved', 'month', 'year', 'updatedAt'],
      btnTitle: 'Generate Payslips'
    },
    filters: null
  }

  const emitData = (param: any) => {
    switch (param.TYPE) {
      case 'NEW':
        return history.push('/payroll/generate-payrolls')
      default:
        console.log('test')
        break
    }
    console.log('param', param)
  }
  return (
    <Grid container spacing={6} sx={{ height: '100%', padding: 2 }}>
      <Grid item xs={12} sx={{ pb: 5 }}>
        <TableBox tableConfig={PayrollsJson} emitData={emitData} />
      </Grid>
    </Grid>
  )
}
