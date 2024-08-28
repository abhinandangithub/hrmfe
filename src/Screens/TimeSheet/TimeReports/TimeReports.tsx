import { Icon } from '@iconify/react'
import { ButtonBase } from '@mui/material'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'
import RowOptions from '../../../Components/TableBoxGrid/RowOptions'
import TableBox from '../../../Components/TableBoxGrid/TableBox'
import { convertMinutesToHours, convertQueryStr } from '../../../Util/Util'

export default function TimeReports(props: any) {
  const history = useHistory()
  const { t } = useTranslation()

  function tableAction(param: any) {
    if (param.TYPE === 'EDIT') {
      onView(param.id, param.row)
    }
    if (param.TYPE === 'VIEW') {
      onView(param.id, param.row)
    }
  }

  const onView = async (id: string, row: any) => {
    const ids = [id]
    const objStr: any = { ids }

    if (row.projectIds && row.projectIds.length > 0) {
      objStr.project = row.projectIds
    }

    if (row.clientIds) {
      objStr.client = row.clientIds
    }

    history.push(`/app/time-reports-view?${convertQueryStr(objStr)}`)
  }

  const TimereportJson = {
    title: 'Time Reports Overview',
    page: 'TIME_REPORT',
    endpoint: 'timeEntries/getMothlyReport',
    method: 'POST',
    setFilter: 'timeReport.filterData',
    table: {
      header: [
        {
          flex: 0.25,
          minWidth: 280,
          field: 'employeeData',
          headerName: t('Employee ID'),
          headerClassName: 'super-app-theme--header',

          disableColumnMenu: true,
          renderCell: ({ row }: any) => {
            const { employeeData } = row
            const handleEdit = () => {
              // Call tableAction function with the edit type and the row id
              tableAction({ TYPE: 'VIEW', id: row._id, row })
            }

            return (
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
                  <ButtonBase onClick={handleEdit}>
                    <Typography
                      noWrap
                      sx={{
                        fontWeight: 500,
                        textDecoration: 'none',
                        color: 'text.secondary',
                        '&:hover': { color: 'primary.main' }
                      }}>
                      {employeeData.employeeNo}
                    </Typography>
                  </ButtonBase>
                </Box>
              </Box>
            )
          }
        },
        {
          flex: 0.15,
          minWidth: 280,
          field: 'employeeData1',
          headerName: t('Employee Name'),
          headerClassName: 'super-app-theme--header',

          disableColumnMenu: true,
          renderCell: ({ row }: any) => {
            const { employeeData } = row

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
                    {employeeData.name}
                  </Typography>
                </Box>
              </Box>
            )
          }
        },
        {
          flex: 0.15,

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
          flex: 0.15,

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
          flex: 0.15,
          field: 'totalMinutes',
          headerName: t('Total Hours'),
          headerClassName: 'super-app-theme--header',

          disableColumnMenu: true,
          sortable: false,
          renderCell: ({ row }: any) => convertMinutesToHours(row?.totalMinutes || 0)
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
          renderCell: ({ row }: any) => (
            <RowOptions id={row.id} row={row} tableAction={(e: any) => tableAction(e)} />
          )
        }
      ],
      dataSource: []
    },
    export: {
      header: ['Employee ID', 'Employee Name', 'Month', 'Year', 'Total Hours'],
      data: [
        { type: 'OBJECT', field: 'employeeData', showField: 'name' },
        { type: 'OBJECT', field: 'employeeData', showField: 'employeeNo' },
        'month',
        'year',
        'totalMinutes'
      ]
      // btnTitle: 'Add Division'
    },
    filters: null
  }
  useEffect(() => {
    if (props?.companyInfo?.configurations?.division !== 'Yes') {
      history.push('/app/time-reports')
    }
  }, [])

  const emitData = (param: any) => {
    switch (param.TYPE) {
      case 'NEW':
        return history.push('/app/add-division')
      default:
        console.log('test')
        break
    }
    console.log('param', param)
  }
  return (
    <Grid container spacing={6} sx={{ height: '100%', padding: 2 }}>
      <Grid item xs={12} sx={{ pb: 5 }}>
        <TableBox tableConfig={TimereportJson} emitData={emitData} />
      </Grid>
    </Grid>
  )
}
