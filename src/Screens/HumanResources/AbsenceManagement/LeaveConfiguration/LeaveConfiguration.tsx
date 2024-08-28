import { Icon } from '@iconify/react'
import { ButtonBase } from '@mui/material'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'
import RowOptions from '../../../../Components/TableBoxGrid/RowOptions'
import TableBox from '../../../../Components/TableBoxGrid/TableBox'
import { validateAccess } from '../../../../Util/Util'

export default function leave() {
  const [levesconfig] = useState([])
  const { t } = useTranslation()

  const history = useHistory()
  function tableAction(param: any) {
    console.log('param', param)
    if (param.TYPE === 'EDIT') {
      history.push(`/app/edit-leave-configuration/${param.id}`)
    }
  }

  const LeveConfigJson = {
    title: 'Leave Configuration Overview',
    page: 'LEAVE',
    endpoint: 'leave-types/get-all',
    setFilter: 'Leave.filterData',
    table: {
      header: [
        {
          flex: 0.25,
          minWidth: 280,
          field: 'calenderName',
          headerClassName: 'super-app-theme--header',

          headerName: t('Calendar Year'),
          disableColumnMenu: true,
          renderCell: ({ row }: any) => {
            console.log('row', row)
            const { calenderName, calenderYear } = row

            return (
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
                  <ButtonBase
                    onClick={() => {
                      tableAction({
                        TYPE: 'EDIT',
                        id: calenderYear
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
                      {calenderName}
                    </Typography>
                  </ButtonBase>
                </Box>
              </Box>
            )
          }
        },
        {
          flex: 0.25,
          minWidth: 280,
          field: 'leaveTypes',
          headerName: t('Leave Type'),
          headerClassName: 'super-app-theme--header',

          disableColumnMenu: true,
          renderCell: ({ row }: any) => {
            const { leaveTypes } = row
            const temparr = leaveTypes.map((x: any) => x.type)
            const displayStr = temparr.length ? temparr.toString() : ''

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
                    {displayStr}
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
          renderHeader: () => (
            <Icon
              icon="lets-icons:setting-line-duotone-line"
              fontSize="1.5rem"
              className=""
              style={{ marginLeft: '3px' }}
            />
          ),
          renderCell: ({ row }: any) => (
            <RowOptions id={row.calenderYear} tableAction={(e: any) => tableAction(e)} />
          )
        }
      ],
      dataSource: levesconfig
    },
    export: {
      header: ['Calendar Year', 'Leave Type'],
      data: ['calenderName',
        { type: 'ARRAY', field: 'leaveTypes', showField: 'type' }],
      btnTitle: 'Add Sequence'
    },
    filters: null
  }

  const emitData = (param: any) => {
    switch (param.TYPE) {
      case 'NEW':
        return history.push('/app/add-leave-configuration')
      default:
        console.log('test')
        break
    }
    console.log('param', param)
  }

  return (
    <Grid container spacing={6} sx={{ height: '100%', padding: 2 }}>
      <Grid item xs={12} sx={{ pb: 5 }}>
        <TableBox tableConfig={LeveConfigJson} emitData={emitData} />
      </Grid>
    </Grid>
  )
}
