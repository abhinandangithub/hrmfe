import { Icon } from '@iconify/react'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { useState } from 'react'

import ModalBox from '../../../Components/ModalBox/ModalBox'
import RowOptions from '../../../Components/TableBoxGrid/RowOptions'
import TableBox from '../../../Components/TableBoxGrid/TableBox'
import CostCenterForm from './CostCenterForm'

export default function CostCenter({ companyInfo }: { companyInfo: any }) {
    const [openForm, setOpenForm] = useState(false)
    console.log('companyInfo', companyInfo)

    function tableAction(param: any) {
        if (param.TYPE === 'EDIT') {
            setOpenForm(param.row)
        }
    }

    // const onAdd = (row: any) => {
    //     // setParentData(row.costCenterNo !== companyInfo?.name ? row : false)
    //     setOpenForm(true)
    // }

    const CostCenterJson = {
        title: 'Cost Centers',
        page: 'COST_CENTER',
        endpoint: 'cost-centers/get',
        setFilter: 'costCenters.filterData',
        table: {
            header: [
                {
                    flex: 0.25,
                    minWidth: 280,
                    field: 'costCenterNo',
                    headerName: 'Cost Center No',
                    headerClassName: 'super-app-theme--header',

                    disableColumnMenu: true,
                    renderCell: ({ row }: any) => {
                        const { costCenterNo } = row

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
                                        {costCenterNo}
                                    </Typography>
                                </Box>
                            </Box>
                        )
                    }
                },
                {
                    flex: 0.15,
                    minWidth: 280,
                    field: 'name',
                    headerName: 'Name',
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
                                            color: 'text.secondary'
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
                    field: 'employeeData',
                    headerName: 'Responsible',
                    headerClassName: 'super-app-theme--header',
                    disableColumnMenu: true,
                    renderCell: ({ row }: any) => {
                        const { employeeData } = row

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
                                        {employeeData.name || ''}
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
                    headerName: 'STATUS',
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
                    renderCell: ({ row }: any) => <RowOptions id={row.id} row={row} tableAction={(e: any) => tableAction(e)} />
                }
            ],
            dataSource: []
        },
        export: {
            header: ['Name', 'Email', 'Phone'],
            data: ['name', 'email', 'phone'],
            btnTitle: 'Add Cost Center'
        },
        filters: null
    }




    const emitData = (param: any) => {
        switch (param.TYPE) {
            case 'NEW':
                setOpenForm(true)
                break
            default:
                console.log('test')
                break
        }
        console.log('param', param)
    }

    const onCancel = (type?: any) => {
        if (type) {
            //   onFilter(GET_DATA('costCenters.filterData'))

            setOpenForm(false)
        } else {
            setOpenForm(false)
        }
    }

    return (
        <Grid container spacing={6} sx={{ height: '100%', padding: 2 }}>
            <Grid item xs={12} sx={{ pb: 5 }}>
                <TableBox tableConfig={CostCenterJson} emitData={emitData} />
                <ModalBox
                    title="Cost Center"
                    visible={!!openForm}
                    footer={null}
                    onCancel={() => onCancel()}
                    destroyOnClose>
                    <CostCenterForm
                        onCancel={(e?: any) => onCancel(e)}
                        // parentData={parentData}
                        selectedData={typeof openForm === 'object' ? openForm : false}
                    />
                </ModalBox>
            </Grid>
        </Grid>
    )
}
