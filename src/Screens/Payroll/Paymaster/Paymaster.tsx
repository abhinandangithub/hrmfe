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

export default function EmployeePaymaster() {
  const history = useNavigate()
  const { t } = useTranslation()

  function tableAction(param: any) {
    if (param.TYPE === 'EDIT') {
      history(`/app/paymaster/edit/${param.id}`)
    }
  }

  const Employeepaymaster = {
    title: 'Employee Paymaster',
    page: 'PAY_MASTER',
    endpoint: 'employeePayMasters/get-employee-paymasters',
    setFilter: 'employeePaymaster.filterData',
    table: {
      header: [
        {
          flex: 0.25,
          minWidth: 100,
          field: 'name',
          headerClassName: 'super-app-theme--header',

          headerName: t('Employee Name'),
          disableColumnMenu: true,
          renderCell: ({ row }: any) => {
            const { name } = row

            return (
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
                  <ButtonBase
                    sx={{ textAlign: 'left', width: '100%' }}
                    onClick={() =>
                      tableAction({
                        TYPE: 'EDIT',
                        row
                      })
                    }>
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
                  </ButtonBase>
                </Box>
              </Box>
            )
          }
        },
        {
          flex: 0.25,
          minWidth: 100,
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
          flex: 0.25,
          minWidth: 100,
          field: 'email',
          headerName: t('Email'),
          headerClassName: 'super-app-theme--header',

          disableColumnMenu: true,
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
                      color: 'text.secondary',
                      '&:hover': { color: 'primary.main' }
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
          minWidth: 100,
          field: 'role',
          headerName: t('Role'),
          headerClassName: 'super-app-theme--header',

          disableColumnMenu: true,
          renderCell: ({ row }: any) => {
            const { role } = row

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
                    {role}
                  </Typography>
                </Box>
              </Box>
            )
          }
        },
        {
          flex: 0.25,
          minWidth: 100,
          field: 'payrollId',
          headerName: t('Payroll Id'),
          headerClassName: 'super-app-theme--header',

          disableColumnMenu: true,
          renderCell: ({ row }: any) => {
            const { payrollId } = row

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
                    {payrollId}
                  </Typography>
                </Box>
              </Box>
            )
          }
        },
        {
          flex: 0.25,
          minWidth: 100,
          field: 'payrollName',
          headerName: t('Payroll Name'),
          headerClassName: 'super-app-theme--header',

          disableColumnMenu: true,
          renderCell: ({ row }: any) => {
            const { payrollName } = row

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
                    {payrollName}
                  </Typography>
                </Box>
              </Box>
            )
          }
        },
        {
          flex: 0.1,
          minWidth: 20,
          field: 'status',
          headerName: t('Status'),
          headerClassName: 'super-app-theme--header',

          disableColumnMenu: true,
          renderCell: ({ row }: any) => {
            const { status } = row

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
                    {status}
                  </Typography>
                </Box>
              </Box>
            )
          }
        },
        {
          flex: 0.25,
          minWidth: 120,
          field: 'validFrom',
          headerName: t('Valid From'),
          headerClassName: 'super-app-theme--header',

          disableColumnMenu: true,
          renderCell: ({ row }: any) => {
            const { validFrom } = row

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
                    {validFrom}
                  </Typography>
                </Box>
              </Box>
            )
          }
        },
        {
          flex: 0.25,
          minWidth: 120,
          field: 'validTo',
          headerName: t('Valid To'),
          headerClassName: 'super-app-theme--header',

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
                    {validTo}
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
      header: [
        'Employee Name',
        'Employee ID',
        'Email',
        'Role',
        'Payroll Id',
        'Payroll Name',
        'Status',
        'Valid From',
        'Valid To'
      ],
      data: [
        'name',
        'employeeNo',
        'email',
        'role',
        'payrollId',
        'payrollName',
        'status',
        'validFrom',
        'validTo'
      ],
      btnTitle: 'Add Employee Pay'
    },
    filters: null
  }

  const emitData = (param: any) => {
    switch (param.TYPE) {
      case 'NEW':
        return history('/app/paymaster/add')
      default:
        console.log('test')
        break
    }
    console.log('param', param)
  }

  return (
    <Grid container spacing={6} sx={{ height: '100%', padding: 2 }}>
      <Grid item xs={12} sx={{ pb: 5 }}>
        <TableBox tableConfig={Employeepaymaster} emitData={emitData} />
      </Grid>
    </Grid>
  )
}
