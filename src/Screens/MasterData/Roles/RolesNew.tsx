import { Icon } from '@iconify/react'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { useHistory } from 'react-router-dom'
import RowOptions from '../../../Components/TableBoxGrid/RowOptions'
import TableBox from '../../../Components/TableBoxGrid/TableBox'
import { validateAccess } from '../../../Util/Util'

export default function Roles() {
    const history = useHistory()

    function tableAction(param: any) {
        if (param.TYPE === 'EDIT') {
            history.push(`/app/edit-customer/${param.id}`)
        }
    }

    const roleJson = {
        title: 'Manage Roles',
        page: 'ROLES',
        endpoint: 'roles/get-active',
        table: {
            header: [
                {
                    flex: 0.25,
                    minWidth: 280,
                    field: 'name',
                    headerName: 'Role Name',
                    headerClassName: 'super-app-theme--header',

                    disableColumnMenu: true,
                    renderCell: ({ row }: any) => {
                        const { name } = row

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
                                        {name}
                                    </Typography>
                                </Box>
                            </Box>
                        )
                    }
                },

                {
                    flex: 0.25,
                    minWidth: 280,
                    field: 'status',
                    headerName: 'Status',
                    headerClassName: 'super-app-theme--header',

                    disableColumnMenu: true,
                    renderCell: ({ row }: any) => {
                        const { status } = row

                        return (
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
                                    <Typography
                                        noWrap
                                    >
                                        {status}
                                    </Typography>
                                </Box>
                            </Box>
                        )
                    }
                },

                validateAccess('edit-role') && {
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
            header: ['Role Name'],
            data: ['clientNo'],
            btnTitle: 'Add Role'
        },
        filters: null
    }

    const emitData = (param: any) => {
        switch (param.TYPE) {
            case 'NEW':
                return history.push('/app/add-role')
            default:
                console.log('test')
                break
        }
        console.log('param', param)
    }

    return (
        <Grid container spacing={6} sx={{ height: '100%', padding: 2 }}>
            <Grid item xs={12} sx={{ pb: 5 }}>
                <TableBox tableConfig={roleJson} emitData={emitData} />
            </Grid>
        </Grid>
    )
}
