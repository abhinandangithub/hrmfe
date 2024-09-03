import { ButtonBase } from '@mui/material'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { useTranslation } from 'react-i18next'
import { useNavigate  } from 'react-router-dom'
import RowOptions from '../../../Components/TableBoxGrid/RowOptions'
import TableBox from '../../../Components/TableBoxGrid/TableBox'
import { validateAccess } from '../../../Util/Util'

export default function AppliedJobs() {
  const history = useNavigate()
  const { t } = useTranslation()

  function tableAction(param: any) {
    if (param.TYPE === 'EDIT') {
      history(`/app/edit-applied-job/${param.id}`)
    }
  }
  const AppliedjobJson = {
    title: 'Profiles Evaluation',
    page: 'APPLIEDJOB',
    endpoint: 'applied-jobs/get',
    setFilter: 'appliedJobs.filterData',
    table: {
      header: [
        {
          flex: 0.25,
          minWidth: 180,

          field: 'firstName',
          headerClassName: 'super-app-theme--header pl-3',

          headerName: t('First Name'),
          disableColumnMenu: true,
          renderCell: ({ row }: any) => {
            const { firstName, id } = row

            return (
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
                  <ButtonBase
                    onClick={() => {
                      tableAction({
                        TYPE: 'EDIT',
                        id
                      })
                    }}>
                    <Typography
                      noWrap
                      sx={{
                        fontWeight: 500,
                        textDecoration: 'none',
                        color: 'text.secondary',
                        '&:hover': { color: 'primary.main' }
                      }}>
                      {firstName}
                    </Typography>
                  </ButtonBase>
                </Box>
              </Box>
            )
          }
        },
        {
          flex: 0.25,
          minWidth: 180,
          field: 'lastName',
          headerName: t('Last Name'),
          headerClassName: 'super-app-theme--header pl-3',

          disableColumnMenu: true,
          renderCell: ({ row }: any) => {
            const { lastName } = row

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
                    {lastName}
                  </Typography>
                </Box>
              </Box>
            )
          }
        },
        {
          flex: 0.25,
          minWidth: 180,
          field: 'email',
          headerName: t('Email'),
          headerClassName: 'super-app-theme--header pl-3 ',
          disableColumnMenu: true,
          renderCell: ({ row }: any) => {
            const { email } = row

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
                    {email}
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
          headerName: t('Job Name'),
          headerClassName: 'super-app-theme--header pl-3 ',
          disableColumnMenu: true,
          renderCell: ({ row }: any) => {
            const { name } = row

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
                    {name}
                  </Typography>
                </Box>
              </Box>
            )
          }
        },

        {
          flex: 0.25,
          minWidth: 180,
          field: 'appliedDate',
          headerName: t('Applied Date'),
          headerClassName: 'super-app-theme--header pl-3 ',
          disableColumnMenu: true,
          renderCell: ({ row }: any) => {
            const { appliedDate } = row

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
                    {appliedDate}
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
          renderCell: ({ row }: any) => {
            const { status } = row

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
                    {status}
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
          // renderHeader: () => (
          //   <Icon
          //     icon="lets-icons:setting-line-duotone-line"
          //     fontSize="1.5rem"
          //     className=""
          //     style={{ marginLeft: '3px' }}
          //   />
          // ),
          renderCell: ({ row }: any) => <RowOptions id={row.id} tableAction={(e: any) => tableAction(e)} />
        }
      ],
      dataSource: []
    },
    export: {
      header: ['First Name', 'Last Name', 'Email', 'Job Name', 'Applied Date', 'Status'],
      data: ['firstName', 'lastName', 'email', 'name', 'appliedDate', 'status']
      // btnTitle: 'Add Sequence'
    },
    filters: null
  }
  // const emitData = (param: any) => {
  //   switch (param.TYPE) {
  //     case 'NEW':
  //       return history('/app/add-grade')
  //     default:
  //       console.log('test')
  //       break
  //   }
  //   console.log('param', param)
  // }
  return (
    <Grid container spacing={6} sx={{ height: '100%', padding: 2 }}>
      <Grid item xs={12} sx={{ pb: 5 }}>
        <TableBox tableConfig={AppliedjobJson} />
      </Grid>
    </Grid>
  )
}
