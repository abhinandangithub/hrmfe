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

export default function OrganizationUnit() {
  const history = useNavigate()
  const { t } = useTranslation()

  function tableAction(param: any) {
    if (param.TYPE === 'EDIT') {
      history(`/app/organization-unit/${param.id}`)
    }
  }

  const organizationUnitJSON = {
    title: 'Organization Unit Overview',
    page: 'ORGANIZATION_UNITS',
    endpoint: 'organization-units',
    setFilter: 'organizationUnits.filterData',
    table: {
      header: [
        {
          flex: 0.25,
          minWidth: 280,
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
          minWidth: 280,
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
          field: 'organizationId',
          headerName: t('Organization Id'),
          headerClassName: 'super-app-theme--header',

          disableColumnMenu: true,
          sortable: true,

          renderCell: ({ row }: any) => {
            const { organizationId } = row

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
                    {organizationId}
                  </Typography>
                </Box>
              </Box>
            )
          }
        },
        {
          flex: 0.25,
          minWidth: 280,
          field: 'organizationName',
          headerName: t('Organization Name'),
          headerClassName: 'super-app-theme--header',

          disableColumnMenu: true,
          sortable: true,

          renderCell: ({ row }: any) => {
            const { organizationName } = row

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
                    {organizationName}
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
      header: ['Valid From', 'Valid To', 'Organization Id', 'Organization Name'],
      data: ['validFrom', 'validTo', 'organizationId', 'organizationName'],
      btnTitle: 'Add Organization Unit'
    },
    filters: null
  }

  const emitData = (param: any) => {
    switch (param.TYPE) {
      case 'NEW':
        return history('/app/add-organization-unit')
      default:
        console.log('test')
        break
    }
    console.log('param', param)
  }

  return (
    <Grid container spacing={6} sx={{ height: '100%', padding: 2 }}>
      <Grid item xs={12} sx={{ pb: 5 }}>
        <TableBox tableConfig={organizationUnitJSON} emitData={emitData} />
      </Grid>
    </Grid>
  )
}
