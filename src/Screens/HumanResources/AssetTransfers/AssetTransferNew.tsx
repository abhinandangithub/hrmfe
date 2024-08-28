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

export default function AssetTransfers() {
  const history = useHistory()
  const { t } = useTranslation()

  function tableAction(param: any) {
    if (param.TYPE === 'EDIT') {
      history.push(`/app/edit-asset-transfer/${param.id}`)
    }
  }
  const AssetJson: any = {
    title: 'Asset Transfers Overview',
    page: 'ASSET_TRANSFER',
    endpoint: 'asset-transfers/get',
    setFilter: 'assetTransfers.filterData',
    table: {
      header: [
        {
          flex: 0.25,
          minWidth: 180,
          field: 'assetData',
          headerClassName: 'super-app-theme--header pl-3',

          headerName: t('Asset No'),
          disableColumnMenu: true,
          renderCell: ({ row }: any) => {
            const { assetData } = row

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
                    {assetData.assetNo}
                  </Typography>
                </Box>
              </Box>
            )
          }
        },


        {
          flex: 0.25,
          minWidth: 180,
          field: 'name',
          headerName: t('Asset'),
          headerClassName: 'super-app-theme--header pl-3',
          disableColumnMenu: true,
          renderCell: ({ row }: any) => {
            const { assetData } = row

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
                    {assetData.name}
                  </Typography>
                </Box>
              </Box>
            )
          }
        },
        {
          flex: 0.25,
          minWidth: 180,
          field: 'employeeData',
          headerName: 'Employee Name',
          headerClassName: 'super-app-theme--header pl-3',
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
                      color: 'text.secondary',
                      '&:hover': { color: 'primary.main' }
                    }}>
                    {employeeData.name || ''}
                  </Typography>
                </Box>
              </Box>
            )
          }
        },
        {
          flex: 0.25,
          minWidth: 180,
          field: 'employeeNo',
          headerName: t('Employee No'),
          headerClassName: 'super-app-theme--header pl-3 ',
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
                      color: 'text.secondary',
                      '&:hover': { color: 'primary.main' }
                    }}>
                    {employeeData.employeeNo}
                  </Typography>
                </Box>
              </Box>
            )
          }
        },

        {
          flex: 0.25,
          minWidth: 180,
          field: 'assignedDate',
          headerName: t('Assigned Date'),
          headerClassName: 'super-app-theme--header pl-3 ',
          disableColumnMenu: true,
          renderCell: ({ row }: any) => {
            const { assignedDate } = row

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
                    {moment(assignedDate).format('YYYY-MM-DD')}
                  </Typography>
                </Box>
              </Box>
            )
          }
        },

        {
          flex: 0.25,
          minWidth: 180,
          field: 'purpose',
          headerName: t('Purpose'),
          headerClassName: 'super-app-theme--header pl-3 ',
          disableColumnMenu: true,
        },
        {
          flex: 0.25,
          minWidth: 180,
          field: 'returnedDate',
          headerName: t('Returned Date'),
          headerClassName: 'super-app-theme--header pl-3 ',
          disableColumnMenu: true,
          renderCell: ({ row }: any) => {
            const { returnedDate } = row

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
                    {moment(returnedDate).format('YYYY-MM-DD')}
                  </Typography>
                </Box>
              </Box>
            )
          }
        },
        {
          flex: 0.25,
          minWidth: 180,
          field: 'status',
          headerName: t('Status'),
          headerClassName: 'super-app-theme--header pl-3 ',
          disableColumnMenu: true,
        },

        validateAccess('edit-asset-transfer') && {
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
        'Asset No',
        'Asset',
        'Emp Name',
        'Emp No',
        'Assigned Date',
        'Purpose',
        'Returned Date',
        'Status',
      ],
      data: [
        { type: 'OBJECT', field: 'assetData', showField: 'assetNo' },
        { type: 'OBJECT', field: 'assetData', showField: 'name' },
        { type: 'OBJECT', field: 'employeeData', showField: 'name' },
        { type: 'OBJECT', field: 'employeeData', showField: 'employeeNo' },
        { type: 'DATE', field: 'assignedDate' },
        'purpose',
        { type: 'DATE', field: 'returnedDate' },
        'status'
      ],
      btnTitle: 'Assign Asset'
    },
    filters: null
  }

  const emitData = (param: any) => {
    switch (param.TYPE) {
      case 'NEW':
        return history.push('/app/add-asset-transfer')
      default:
        console.log('test')
        break
    }
    console.log('param', param)
  }

  return (
    <Grid container spacing={6} sx={{ height: '100%', padding: 2 }}>
      <Grid item xs={12} sx={{ pb: 5 }}>
        <TableBox tableConfig={AssetJson} emitData={emitData} />
      </Grid>
    </Grid>
  )
}
