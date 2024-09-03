import { Icon } from '@iconify/react'
import { ButtonBase } from '@mui/material'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import moment from 'moment'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate  } from 'react-router-dom'
import RowOptions from '../../../../Components/TableBoxGrid/RowOptions'
import TableBox from '../../../../Components/TableBoxGrid/TableBox'
import { LEAVE_BUCKET, LEAVE_CATEGORY } from '../../../../Util/Options'
import { validateAccess } from '../../../../Util/Util'

export default function leave() {
  const [levesconfig] = useState([])
  const { t } = useTranslation()

  const history = useNavigate()
  function tableAction(param: any) {
    console.log('param', param)
    if (param.TYPE === 'EDIT') {
      history(`/app/edit-leave-configuration/${param.id}/${param.row.index}`)
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
          flex: 0.1,
          minWidth: 150,
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
                        id: calenderYear,
                        row
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
                      {calenderName ? moment(calenderName).format('YYYY') : ''}
                    </Typography>
                  </ButtonBase>
                </Box>
              </Box>
            )
          }
        },
        {
          flex: 0.1,
          minWidth: 150,
          field: 'category',
          headerName: t('Leave Category'),
          headerClassName: 'super-app-theme--header',

          disableColumnMenu: true,
          renderCell: ({ row }: any) => {
            const { category } = row
            const temparr = LEAVE_CATEGORY.find((x) => x.value === category)
            const displayStr = temparr && temparr.label ? temparr.label : ''

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
        {
          flex: 0.1,
          minWidth: 150,
          field: 'type',
          headerName: t('Leave Type'),
          headerClassName: 'super-app-theme--header',

          disableColumnMenu: true,
          renderCell: ({ row }: any) => {
            const { type } = row
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
                    {type}
                  </Typography>
                </Box>
              </Box>
            )
          }
        },
        {
          flex: 0.1,
          minWidth: 150,
          field: 'bucket',
          headerName: t('Leave Bucket'),
          headerClassName: 'super-app-theme--header',

          disableColumnMenu: true,
          renderCell: ({ row }: any) => {
            const { bucket } = row
            const temparr = LEAVE_BUCKET.find((x) => x.value === bucket)
            const displayStr = temparr && temparr.label ? temparr.label : ''

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
        {
          flex: 0.1,
          minWidth: 150,
          field: 'location',
          headerName: t('Location'),
          headerClassName: 'super-app-theme--header',

          disableColumnMenu: true,
          renderCell: ({ row }: any) => {
            const { location } = row
            const displayStr = location.length ? location.toString() : ''

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
        {
          flex: 0.1,
          minWidth: 150,
          field: 'jobLevel',
          headerName: t('Job Level'),
          headerClassName: 'super-app-theme--header',

          disableColumnMenu: true,
          renderCell: ({ row }: any) => {
            const { jobLevel } = row
            const displayStr = jobLevel.length ? jobLevel.toString() : ''

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
        {
          flex: 0.1,
          minWidth: 150,
          field: 'leavePerYear',
          headerName: t('Leave Per Year'),
          headerClassName: 'super-app-theme--header',

          disableColumnMenu: true,
          renderCell: ({ row }: any) => {
            const { leavePerYear } = row

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
                    {leavePerYear}
                  </Typography>
                </Box>
              </Box>
            )
          }
        },
        {
          flex: 0.1,
          minWidth: 150,
          field: 'previousPerYear',
          headerName: t('Previous Leave Per Year'),
          headerClassName: 'super-app-theme--header',

          disableColumnMenu: true,
          renderCell: ({ row }: any) => {
            const { previousPerYear } = row

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
                    {previousPerYear}
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
            <RowOptions id={row.calenderYear} row={row} tableAction={(e: any) => tableAction(e)} />
          )
        }
      ],
      dataSource: levesconfig
    },
    export: {
      header: ['Calendar Year', 'Leave Type'],
      data: ['calenderName', { type: 'ARRAY', field: 'leaveTypes', showField: 'type' }],
      btnTitle: 'Add Sequence'
    },
    filters: null
  }

  const emitData = (param: any) => {
    switch (param.TYPE) {
      case 'NEW':
        return history('/app/add-leave-configuration')
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
