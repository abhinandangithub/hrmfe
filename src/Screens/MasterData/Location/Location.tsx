import { Icon } from '@iconify/react'
import { ButtonBase } from '@mui/material'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { useState } from 'react'
import { useTranslation, withTranslation } from 'react-i18next'
import ModalBox from '../../../Components/ModalBox/ModalBox'
import RowOptions from '../../../Components/TableBoxGrid/RowOptions'
import TableBox from '../../../Components/TableBoxGrid/TableBox'
import { validateAccess } from '../../../Util/Util'
import AddLocation from './AddLocation'

function Location(props: any) {
  const { t } = useTranslation()
  const [openAdd, setOpenAdd] = useState(false)
  const [editLoc, setEditLoc] = useState(null)
  const [apiload, setApiLoad] = useState(0)

  function tableAction(param: any) {
    console.log('param', param)
    if (param.TYPE === 'EDIT') {
      setEditLoc(param.row)
      setOpenAdd(true)
    }
  }

  // Location Id, Location Name, Default Working Hours, Location address

  const locationJson = {
    title: props.t('Location Details'),
    page: 'LOCATION',
    endpoint: 'location/getAll',
    setFilter: 'location.filterData',
    table: {
      header: [
        {
          flex: 0.15,
          minWidth: 280,
          field: 'locationId',
          headerName: t('Location Id'),
          headerClassName: 'super-app-theme--header',

          disableColumnMenu: true,
          renderCell: ({ row }: any) => {
            const { locationId, id } = row

            return (
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
                  <ButtonBase onClick={() => tableAction({ TYPE: 'EDIT', id })}>
                    <Typography
                      noWrap
                      sx={{
                        fontWeight: 500,
                        textDecoration: 'none',
                        color: 'text.secondary',
                        '&:hover': { color: 'primary.main' }
                      }}>
                      {locationId}
                    </Typography>
                  </ButtonBase>
                </Box>
              </Box>
            )
          }
        },
        {
          flex: 0.15,
          minWidth: 180,
          field: 'name',
          headerName: t('Location Name'),
          headerClassName: 'super-app-theme--header',

          disableColumnMenu: true,
          renderCell: ({ row }: any) => {
            const { name } = row

            return (
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
            )
          }
        },
        {
          flex: 0.15,
          minWidth: 180,
          field: 'workHour',
          headerName: t(' Default Working Hours'),
          headerClassName: 'super-app-theme--header',

          disableColumnMenu: true,
          renderCell: ({ row }: any) => {
            const { workHour } = row

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
                    {workHour}
                  </Typography>
                </Box>
              </Box>
            )
          }
        },
        {
          flex: 0.25,
          minWidth: 180,
          field: 'address',
          headerName: t('Location address'),
          headerClassName: 'super-app-theme--header',
          disableColumnMenu: true,
          renderCell: ({ row }: any) => {
            const { houseNo, street, town, city, country, postalCode } = row

            const address = `${houseNo}, ${street}, ${town}, ${city}, ${country}, ${postalCode}`

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
                    {address}
                  </Typography>
                </Box>
              </Box>
            )
          }
        },

        validateAccess('edit-location') && {
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
      header: ['Location Id', 'Location Name', 'Default Working Hours', 'Location Address'],
      data: ['locationId', 'name', 'workHour', 'address'],
      btnTitle: props.t('Add Location')
    },
    filters: null
  }

  const onCancel = (param?: boolean) => {
    if (param) {
      setApiLoad(Math.random() * 10)
    }
    setOpenAdd(!openAdd)
    setEditLoc(null)
  }

  const emitData = (param: any) => {
    console.log('param', param)
    switch (param.TYPE) {
      case 'NEW':
        return setOpenAdd(true)
      default:
        console.log('test')
        break
    }
    console.log('param', param)
  }

  return (
    <Grid container spacing={6} sx={{ height: '100%', padding: 2 }}>
      <Grid item xs={12} sx={{ pb: 5 }}>
        <TableBox tableConfig={locationJson} emitData={emitData} apiload={apiload} />
        <ModalBox
          title={props.t('Add Location')}
          visible={!!openAdd}
          footer={null}
          onCancel={() => onCancel()}
          destroyOnClose>
          <AddLocation onCancel={onCancel} selectedLoc={openAdd && editLoc ? editLoc : false} {...props} />
        </ModalBox>
      </Grid>
    </Grid>
  )
}

export default withTranslation()(Location)
