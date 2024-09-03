import { Icon } from '@iconify/react'
import { ButtonBase } from '@mui/material'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { useTranslation } from 'react-i18next'
import { useNavigate  } from 'react-router-dom'
import RowOptions from '../../../Components/TableBoxGrid/RowOptions'
import TableBox from '../../../Components/TableBoxGrid/TableBox'

export default function Citizenship() {
  const history = useNavigate()
  const { t } = useTranslation()

  function tableAction(param: any) {
    if (param.TYPE === 'EDIT') {
      history(`/app/citizenship/${param.id}`)
    }
  }

  const citizenshipJson = {
    title: 'Citizenship Overview',
    page: 'CITIZENSHIP',
    endpoint: 'citizenship',
    setFilter: 'citizenship.filterData',
    table: {
      header: [
        {
          flex: 0.25,
          minWidth: 280,
          field: 'citizenshipId',
          headerClassName: 'super-app-theme--header',

          headerName: t('Citizenship ID'),
          disableColumnMenu: true,
          renderCell: ({ row }: any) => {
            const { citizenshipId, id } = row

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
                      {citizenshipId}
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
          field: 'citizenship',
          headerName: t('Citizenship'),
          headerClassName: 'super-app-theme--header',

          disableColumnMenu: true,
          renderCell: ({ row }: any) => {
            const { citizenship } = row

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
                    {citizenship}
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
      header: ['Citizenship Id', 'Citizenship'],
      data: ['citizenshipId', 'citizenship'],
      btnTitle: 'Add Citizenship'
    },
    filters: null
  }

  const emitData = (param: any) => {
    switch (param.TYPE) {
      case 'NEW':
        return history('/app/add-citizenship')
      default:
        console.log('test')
        break
    }
    console.log('param', param)
  }

  return (
    <Grid container spacing={6} sx={{ height: '100%', padding: 2 }}>
      <Grid item xs={12} sx={{ pb: 5 }}>
        <TableBox tableConfig={citizenshipJson} emitData={emitData} />
      </Grid>
    </Grid>
  )
}
