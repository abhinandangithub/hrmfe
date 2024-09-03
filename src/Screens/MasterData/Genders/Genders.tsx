import { Icon } from '@iconify/react'
import { ButtonBase } from '@mui/material'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { useTranslation } from 'react-i18next'
import { useNavigate  } from 'react-router-dom'
import RowOptions from '../../../Components/TableBoxGrid/RowOptions'
import TableBox from '../../../Components/TableBoxGrid/TableBox'

export default function Genders() {
  const history = useNavigate()
  const { t } = useTranslation()

  function tableAction(param: any) {
    if (param.TYPE === 'EDIT') {
      history(`/app/genders/${param.id}`)
    }
  }

  const genderJson = {
    title: 'Gender Overview',
    page: 'GENDER',
    endpoint: 'genders',
    setFilter: 'genders.filterData',
    table: {
      header: [
        {
          flex: 0.25,
          minWidth: 280,
          field: 'genderId',
          headerClassName: 'super-app-theme--header',

          headerName: t('Gender Id'),
          disableColumnMenu: true,
          renderCell: ({ row }: any) => {
            const { genderId, id } = row

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
                      {genderId}
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
          field: 'genderText',
          headerName: t('Gender Text'),
          headerClassName: 'super-app-theme--header',

          disableColumnMenu: true,
          renderCell: ({ row }: any) => {
            const { genderText } = row

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
                    {genderText}
                  </Typography>
                </Box>
              </Box>
            )
          }
        },
        // {
        //   flex: 0.25,
        //   minWidth: 280,
        //   field: 'clientName',
        //   headerName: t('Client'),
        //   headerClassName: 'super-app-theme--header',

        //   disableColumnMenu: true,
        //   sortable: false,

        //   renderCell: ({ row }: any) => {
        //     const { clientName } = row

        //     return (
        //       <Box sx={{ display: 'flex', alignItems: 'center' }}>
        //         <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
        //           <Typography
        //             noWrap
        //             sx={{
        //               fontWeight: 500,
        //               textDecoration: 'none',
        //               color: 'text.secondary'
        //             }}>
        //             {clientName}
        //           </Typography>
        //         </Box>
        //       </Box>
        //     )
        //   }
        // },
        // {
        //   flex: 0.15,
        //   minWidth: 120,
        //   headerName: t('Billable'),
        //   headerClassName: 'super-app-theme--header',

        //   field: 'billable',
        //   sortable: false,
        //   disableColumnMenu: true,
        //   renderCell: ({ row }: any) => (
        //     <Typography noWrap sx={{ fontWeight: 500, color: 'text.secondary', textTransform: 'capitalize' }}>
        //       {row.billable}
        //     </Typography>
        //   )
        // },
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
      header: ['Gender Id', 'Gender Text'],
      data: ['genderId', 'genderText'],
      btnTitle: 'Add Gender'
    },
    filters: null
  }

  const emitData = (param: any) => {
    switch (param.TYPE) {
      case 'NEW':
        return history('/app/add-gender')
      default:
        console.log('test')
        break
    }
    console.log('param', param)
  }

  return (
    <Grid container spacing={6} sx={{ height: '100%', padding: 2 }}>
      <Grid item xs={12} sx={{ pb: 5 }}>
        <TableBox tableConfig={genderJson} emitData={emitData} />
      </Grid>
    </Grid>
  )
}
