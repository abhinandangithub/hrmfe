import { Icon } from '@iconify/react'
import { ButtonBase } from '@mui/material'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'
import RowOptions from '../../../Components/TableBoxGrid/RowOptions'
import TableBox from '../../../Components/TableBoxGrid/TableBox'

export default function Employees() {
  const history = useHistory()
  const { t } = useTranslation()

  function tableAction(param: any) {
    console.log('table action', param)
    if (param.TYPE === 'EDIT') {
      history.push(`/app/edit-employee/${param.id}`)
    }
  }

  const employeeJson = {
    title: 'Employee Overview',
    page: 'EMPLOYEE',
    endpoint: 'employees/get',
    setFilter: 'employees.filterData',
    table: {
      header: [
        {
          flex: 0.25,
          minWidth: 280,
          field: 'employeeNo',
          headerName: t('Employee No'),
          disableColumnMenu: true,
          headerClassName: 'super-app-theme--header',

          renderCell: ({ row }: any) => {
            const { employeeNo, id } = row
            const handleEdit = () => {
              // Call tableAction function with the edit type and the row id
              tableAction({ TYPE: 'EDIT', id: row._id })
            }
            return (
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
                  <a href="#" onClick={handleEdit}>
                    <ButtonBase
                      onClick={() =>
                        tableAction({
                          TYPE: 'EDIT',
                          id
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
                        {employeeNo}
                      </Typography>
                    </ButtonBase>
                  </a>
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
          disableColumnMenu: true,
          headerClassName: 'super-app-theme--header',

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
          sortable: false,
          headerClassName: 'super-app-theme--header',

          renderCell: ({ row }: any) => {
            const { email } = row

            return (
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
            )
          }
        },
        {
          flex: 0.15,
          minWidth: 120,
          headerName: t('Phone'),
          field: 'phone',
          sortable: false,
          disableColumnMenu: true,
          headerClassName: 'super-app-theme--header',

          renderCell: ({ row }: any) => (
            <Typography noWrap sx={{ fontWeight: 500, color: 'text.secondary', textTransform: 'capitalize' }}>
              {row.phone}
            </Typography>
          )
        },
        {
          flex: 0.15,
          minWidth: 120,
          headerName: t('Status'),
          field: 'status',
          sortable: false,
          disableColumnMenu: true,
          headerClassName: 'super-app-theme--header',

          renderCell: ({ row }: any) => (
            <Typography noWrap sx={{ fontWeight: 500, color: 'text.secondary', textTransform: 'capitalize' }}>
              {row.status}
            </Typography>
          )
        },
        {
          flex: 0.1,
          minWidth: 100,
          sortable: false,
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
          headerClassName: 'super-app-theme--header',

          renderCell: ({ row }: any) => <RowOptions id={row._id} tableAction={(e: any) => tableAction(e)} />
        }
      ],
      dataSource: []
    },
    export: {
      header: ['Employee No', 'Name', 'Email ID', 'Phone'],
      data: ['employeeNo', 'name', 'email', 'phone'],
      btnTitle: 'Add Employee'
    },
    filters: null
  }

  const emitData = (param: any) => {
    switch (param.TYPE) {
      case 'NEW':
        return history.push('/app/add-employee')
      default:
        console.log('test')
        break
    }
    console.log('param', param)
  }

  return (
    <Grid container spacing={6} sx={{ height: '100%', padding: 2 }}>
      <Grid item xs={12}>
        <TableBox tableConfig={employeeJson} emitData={emitData} />
      </Grid>
    </Grid>
  )
}
