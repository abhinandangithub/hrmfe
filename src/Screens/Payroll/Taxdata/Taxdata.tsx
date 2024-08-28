import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'
import TableBox from '../../../Components/TableBoxGrid/TableBox'

export default function Payrolls() {
  const history = useHistory()
  const { t } = useTranslation()

  const TaxTableJson = {
    title: 'TAX DATA OVERVIEW',
    page: 'TAX_DATA',
    endpoint: 'tax-data/getAll',
    setFilter: 'taxData.filterData',
    table: {
      header: [
        {
          flex: 0.25,
          minWidth: 180,
          field: 'taxCode',
          headerClassName: 'super-app-theme--header pl-3',
          headerName: t('Tax Code'),
          disableColumnMenu: true,
          renderCell: ({ row }: any) => {
            const { taxCode } = row
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
                    {taxCode}
                  </Typography>
                </Box>
              </Box>
            )
          }
        },
        {
          flex: 0.25,
          minWidth: 180,
          field: 'from',
          headerName: t('From'),
          headerClassName: 'super-app-theme--header pl-3',
          disableColumnMenu: true,
          renderCell: ({ row }: any) => {
            const { from } = row
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
                    {from}
                  </Typography>
                </Box>
              </Box>
            )
          }
        },
        {
          flex: 0.25,
          minWidth: 180,
          field: 'to',
          headerName: t('To'),
          headerClassName: 'super-app-theme--header pl-3',
          disableColumnMenu: true,
          renderCell: ({ row }: any) => {
            const { to } = row
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
                    {to}
                  </Typography>
                </Box>
              </Box>
            )
          }
        },
        {
          flex: 0.25,
          minWidth: 180,
          field: 'tax',
          headerName: t('Tax'),
          headerClassName: 'super-app-theme--header pl-3',
          disableColumnMenu: true,
          renderCell: ({ row }: any) => {
            const { tax } = row
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
                    {tax}
                  </Typography>
                </Box>
              </Box>
            )
          }
        },
        {
          flex: 0.25,
          minWidth: 180,
          field: 'year',
          headerName: t('Year'),
          headerClassName: 'super-app-theme--header pl-3',
          disableColumnMenu: true,
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
                      color: 'text.secondary',
                      '&:hover': { color: 'primary.main' }
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
          minWidth: 180,
          field: 'state',
          headerName: t('State'),
          headerClassName: 'super-app-theme--header pl-3',
          disableColumnMenu: true,
          renderCell: ({ row }: any) => {
            const { state } = row
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
                    {state}
                  </Typography>
                </Box>
              </Box>
            )
          }
        }
      ],
      dataSource: []
    },
    export: {
      header: ['Tax Code', 'From', 'To', 'Tax', 'Year', 'State'],
      data: ['taxCode', 'from', 'to', 'tax', 'year', 'state'],
      btnTitle: 'Upload Tax Data'
    },
    filters: null
  }
  const emitData = (param: any) => {
    switch (param.TYPE) {
      case 'NEW':
        return history.push('/app/taxdata')
      default:
        console.log('test')
        break
    }
    console.log('param', param)
  }

  return (
    <Grid container spacing={6} sx={{ height: '100%', padding: 2 }}>
      <Grid item xs={12} sx={{ pb: 5 }}>
        <TableBox tableConfig={TaxTableJson} emitData={emitData} />
      </Grid>
    </Grid>
  )
}
