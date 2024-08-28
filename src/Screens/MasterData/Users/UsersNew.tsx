import { Icon } from '@iconify/react'
import { ButtonBase } from '@mui/material'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { message } from 'antd'
import { useState } from 'react'
import { useTranslation, withTranslation } from 'react-i18next'
import { sendUserInvitaion } from '../../../Actions/UserAction'
import ModalBox from '../../../Components/ModalBox/ModalBox'
import TableBox from '../../../Components/TableBoxGrid/TableBox'
import { validateAccess } from '../../../Util/Util'
import AddUser from './AddUser'
import ResetPassword from './ResetPassword'
import RowOptions from './userRowOption'

function User(props: any) {
  const [openAdd, setOpenAdd] = useState<any>(false)
  const [openResetPassord, setOpenResetPassord] = useState(false)
  const { t } = useTranslation()
  const [users] = useState([])

  const onSendInvitation = (id: string) => {
    sendUserInvitaion({ users: id }).then((result: any) => {
      if (result) {
        message.success('Invitaions Sent')
      }
    })
  }

  function tableAction(param: any) {
    console.log('test', param)
    if (param.TYPE === 'EDIT') {
      return setOpenAdd(param?.row)
      // edit part
    }
    if (param.TYPE === 'PASSWORD') {
      return setOpenResetPassord(param?.row)
    }

    if (param.TYPE === 'INVITE') {
      onSendInvitation(param?.id)
    }
  }

  const userJson = {
    title: props.t('Users Overview'),
    page: 'USER',
    endpoint: 'users/getUsersByCompany',
    setFilter: 'users.filterData',
    table: {
      header: [
        {
          flex: 0.5,
          minWidth: 180,
          field: 'name',
          headerName: t('Name'),
          headerClassName: 'super-app-theme--header',

          disableColumnMenu: true,
          renderCell: ({ row }: any) => {
            const { name } = row

            return (
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
                  <ButtonBase
                    onClick={() => {
                      setOpenAdd(row)
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
          flex: 0.5,
          minWidth: 280,
          field: props.t('email'),
          headerName: props.t('Email ID'),
          headerClassName: 'super-app-theme--header',

          disableColumnMenu: true,
          renderCell: ({ row }: any) => {
            const { email } = row

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
          field: 'reporterName',
          headerName: t('Reporter'),
          headerClassName: 'super-app-theme--header',

          disableColumnMenu: true,
          renderCell: ({ row }: any) => {
            const { reporterName } = row

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
                    {reporterName}
                  </Typography>
                </Box>
              </Box>
            )
          }
        },
        {
          flex: 0.25,
          minWidth: 180,
          field: 'roleName',
          headerName: t('Role'),
          headerClassName: 'super-app-theme--header',

          disableColumnMenu: true,
          renderCell: ({ row }: any) => {
            const { roleName } = row

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
                    {roleName}
                  </Typography>
                </Box>
              </Box>
            )
          }
        },
        {
          flex: 0.25,
          minWidth: 180,
          field: 'type',
          headerName: t('Type'),
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
          flex: 0.25,
          minWidth: 180,
          field: 'status',
          headerName: t('Status'),
          headerClassName: 'super-app-theme--header',

          disableColumnMenu: true,
          renderCell: ({ row }: any) => {
            const { status } = row

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
                    {status}
                  </Typography>
                </Box>
              </Box>
            )
          }
        },
        validateAccess('edit-user') && {
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
      header: ['Name', 'Email ID', 'Reporter', 'Role', 'Type', 'Status'],
      data: ['name', 'email', 'reporterName', 'role', 'type', 'status'],
      btnTitle: props.t('Add User')
    },
    filters: null
  }

  const emitData = (param: any) => {
    console.log('what value comming ', param)
    switch (param.TYPE) {
      case 'NEW':
        return setOpenAdd(true)
      default:
        console.log('test')
        break
    }
    console.log('param', param)
  }

  const onCancel = (type?: any) => {
    if (type === 'Add' || type === 'Update') {
      setOpenAdd(false)
    } else {
      setOpenAdd(false)
      setOpenResetPassord(false)
    }
  }

  return (
    <Grid container spacing={6} sx={{ height: '100%', padding: 2 }}>
      <Grid item xs={12} sx={{ pb: 5 }}>
        <TableBox tableConfig={userJson} emitData={emitData} />
        <ModalBox
          title={props.t('Add User')}
          visible={!!openAdd}
          footer={null}
          onCancel={() => onCancel()}
          destroyOnClose>
          <AddUser
            onCancel={(e?: any) => onCancel(e)}
            users={users}
            selectedUser={openAdd && openAdd.user ? openAdd : false}
          />
        </ModalBox>

        <ModalBox
          title={props.t('Reset Password')}
          visible={!!openResetPassord}
          footer={null}
          onCancel={() => onCancel()}
          destroyOnClose>
          <ResetPassword onCancel={onCancel} selectedUser={openResetPassord} />
        </ModalBox>
      </Grid>
    </Grid>
  )
}

export default withTranslation()(User)
