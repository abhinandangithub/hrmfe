import { Icon } from '@iconify/react'
import { ButtonBase } from '@mui/material'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { useState } from 'react'
import { useTranslation, withTranslation } from 'react-i18next'
import { useNavigate  } from 'react-router-dom'
import RowOptions from '../../../Components/TableBoxGrid/RowOptions'
import TableBox from '../../../Components/TableBoxGrid/TableBox'

function Departments(props: any) {
  const [department] = useState([])
  const { t } = useTranslation()
  const history = useNavigate()

  function tableAction(param: any) {
    if (param.TYPE === 'EDIT') {
      history(`/app/edit-departments/${param.id}`)
    }
  }

  const DepartmentJson = {
    title: t('Departments Overview'),
    page: t('DEPARTMENTS'),
    endpoint: 'department/get',
    setFilter: 'departments.filterData',
    table: {
      header: [
        {
          flex: 0.25,
          minWidth: 280,
          field: 'name',
          headerName: t('Name'),
          headerClassName: 'super-app-theme--header',

          disableColumnMenu: true,
          renderCell: ({ row }: any) => {
            const { name, id } = row

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
                      {name}
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
          field: 'email',
          headerName: t('Email'),
          headerClassName: 'super-app-theme--header',
          disableColumnMenu: true
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
      dataSource: department
    },
    export: {
      header: ['Name', 'Email'],
      data: ['name', 'email'],
      btnTitle: props.t('Add Departments')
    },
    filters: null
  }

  const emitData = (param: any) => {
    switch (param.TYPE) {
      case 'NEW':
        return history('/app/add-departments')
      default:
        console.log('test')
        break
    }
    console.log('param', param)
  }

  return (
    <Grid container spacing={6} sx={{ height: '100%', padding: 2 }}>
      <Grid item xs={12} sx={{ pb: 5 }}>
        <TableBox tableConfig={DepartmentJson} emitData={emitData} />
      </Grid>
    </Grid>
  )
}

export default withTranslation()(Departments)
