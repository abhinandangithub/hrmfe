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

export default function EmployeeSubGroup() {
  const history = useNavigate()
  const { t } = useTranslation()

  function tableAction(param: any) {
    if (param.TYPE === 'EDIT') {
      history(`/app/employee-sub-group/${param.id}`)
    }
  }

  const employeeSubGroupJSON = {
    title: 'Employee Sub Group Overview',
    page: 'EMPLOYEESUBGROUP',
    endpoint: 'employee-sub-groups',
    setFilter: 'employeeSubGroups.filterData',
    table: {
      header: [
        {
          flex: 0.15,
          minWidth: 180,
          field: 'validFrom',
          headerClassName: 'super-app-theme--header',

          headerName: t('Valid From'),
          disableColumnMenu: true,
          renderCell: ({ row }: any) => {
            const { validFrom, id } = row

            return (
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
                  <ButtonBase
                    onClick={() => {
                      tableAction({ TYPE: 'EDIT', id })
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
          flex: 0.15,
          minWidth: 180,
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
                      color: 'text.secondary'
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
          minWidth: 280,
          field: 'employeeGroupId',
          headerName: t('Employee Group Id'),
          headerClassName: 'super-app-theme--header',

          disableColumnMenu: true,
          sortable: true,

          renderCell: ({ row }: any) => {
            const { employeeGroupId } = row

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
                    {employeeGroupId}
                  </Typography>
                </Box>
              </Box>
            )
          }
        },
        {
          flex: 0.25,
          minWidth: 280,
          field: 'employeeSubGroupId',
          headerName: t('Employee Sub Group Id'),
          headerClassName: 'super-app-theme--header',

          disableColumnMenu: true,
          sortable: true,

          renderCell: ({ row }: any) => {
            const { employeeSubGroupId } = row

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
                    {employeeSubGroupId}
                  </Typography>
                </Box>
              </Box>
            )
          }
        },
        {
          flex: 0.25,
          minWidth: 280,
          field: 'employeeSubGroupText',
          headerName: t('Employee Sub Group Text'),
          headerClassName: 'super-app-theme--header',

          disableColumnMenu: true,
          sortable: true,

          renderCell: ({ row }: any) => {
            const { employeeSubGroupText } = row

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
                    {employeeSubGroupText}
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
      header: [
        'Valid From',
        'Valid To',
        'Employee Group ID',
        'Employee Sub Group ID',
        'Employee Sub Group Text'
      ],
      data: ['validFrom', 'validTo', 'employeeGroupId', 'employeeSubGroupId', 'employeeSubGroupText'],
      btnTitle: 'Add Employee Sub Group'
    },
    filters: null
  }

  const emitData = (param: any) => {
    switch (param.TYPE) {
      case 'NEW':
        return history('/app/add-employee-sub-group')
      default:
        console.log('test')
        break
    }
    console.log('param', param)
  }

  return (
    <Grid container spacing={6} sx={{ height: '100%', padding: 2 }}>
      <Grid item xs={12} sx={{ pb: 5 }}>
        <TableBox tableConfig={employeeSubGroupJSON} emitData={emitData} />
      </Grid>
    </Grid>
  )
}
