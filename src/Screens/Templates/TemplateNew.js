// import TableBox from '../../Components/TableBox/TableBox'
// import TableBox from '../../Components/TableBoxGrid/TableBox'
import { Icon } from '@iconify/react'
import { ButtonBase } from '@mui/material'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import { DataGrid } from '@mui/x-data-grid'
import { Tabs } from 'antd'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate  } from 'react-router-dom'
import TableHeader from '../../Components/TableBoxGrid/TableHeader'
import apiClient from '../../Util/apiClient'
import { GET_DATA, SET_DATA, validateAccess } from '../../Util/Util'
import TemplateForm from './TemplateForm'
import TemplateHTMLEditor from './TemplateHTMLEditor'

const { TabPane } = Tabs

export default function Templates() {
  const [activeTab, setActiveTab] = useState(GET_DATA('customTemplates.activeTab') || 'Service')
  const [templates, setTemplates] = useState([])
  const [toggleForm, setToggleForm] = useState(false)
  const [toggleHTMLForm, setToggleHTMLForm] = useState(false)
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10
  })
  const [rowCount, setRowCount] = useState(1)
  const { t } = useTranslation()
  const history = useNavigate()

  const getData = (params = {}) => {
    params.type = activeTab

    apiClient.get('customTemplates/getAll', { params }).then(({ data }) => {
      if (data && data.result) {
        SET_DATA(`customTemplates${activeTab}.filterData`, { ...params, ...data.pageData })
        setTemplates(data.result)
        if (data.pageData) {
          setRowCount(data.pageData.totalCount)
        } else {
          setRowCount(0) // or some default value
        }
      }
    })
  }

  const onAdd = (values) => {
    const templateData = { ...values, type: activeTab }

    if (toggleForm?.id || toggleHTMLForm?.id) {
      apiClient
        .put(`customTemplates/update/${toggleForm?.id || toggleHTMLForm?.id}`, templateData)
        .then(({ data }) => {
          if (data && data.result) {
            getData(GET_DATA(`customTemplates${activeTab}.filterData`))
            // setTemplates(templates.map((t) => (t.id === data.result.id ? data.result : t)))
          }

          setToggleForm(false)
          setToggleHTMLForm(false)
        })
    } else {
      apiClient.post('customTemplates/add', templateData).then(({ data }) => {
        if (data && data.result) {
          setTemplates([...templates, data.result])
        }

        setToggleForm(false)
      })
    }
  }

  const onCancel = () => {
    setToggleForm(false)
    setToggleHTMLForm(false)
  }

  useEffect(() => {
    getData(GET_DATA(`customTemplates${activeTab}.filterData`))
    SET_DATA('customTemplates.activeTab', activeTab)
  }, [activeTab])

  const setForm = (param) => {
    console.log('param', param)
    history(`/app/custom-templates/${param.id}`)
  }

  const columns = [
    {
      flex: 0.25,
      minWidth: 200,
      field: 'name',
      headerName: t('Name'),
      headerClassName: 'super-app-theme--header',

      disableColumnMenu: true,
      renderCell: ({ row }) => {
        const { name } = row

        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
              <ButtonBase
                onClick={() => {
                  setForm(row)
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

    // {
    //   title: 'Name',
    //   dataIndex: 'name',
    //   render: (text, r) => (
    //     <div
    //       onClick={() =>
    //         r.mode === 'HTML' ? setToggleHTMLForm(r) : history(`/app/custom-templates/${r.id}`)
    //       }>
    //       <a>{text}</a>
    //     </div>
    //   )
    // },
    {
      flex: 0.15,
      minWidth: 200,
      field: 'description',
      headerName: t('Description'),
      headerClassName: 'super-app-theme--header',
      disableColumnMenu: true
    },
    {
      flex: 0.15,
      minWidth: 180,
      field: 'mode',
      headerName: t('Mode'),
      headerClassName: 'super-app-theme--header',
      disableColumnMenu: true
    },
    {
      flex: 0.15,
      minWidth: 180,
      field: 'for',
      headerName: t('For'),
      headerClassName: 'super-app-theme--header',
      disableColumnMenu: true
    },
    {
      flex: 0.15,
      minWidth: 100,
      field: 'default',
      headerName: t('Default'),
      headerClassName: 'super-app-theme--header',

      disableColumnMenu: true,
      renderCell: ({ row }) => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
            <div
              style={{
                width: 50,
                background: row?.default === 'Yes' ? '#daf0db' : '#fadddd',
                borderRadius: 10,
                padding: '0px 10px',
                textAlign: 'center',
                fontWeight: 500
              }}>
              {row?.default}
            </div>
          </Box>
        </Box>
      )
    },
    {
      flex: 0.15,
      minWidth: 100,
      field: 'status',
      headerName: t('Status'),
      headerClassName: 'super-app-theme--header',
      disableColumnMenu: true
    },

    {
      ...(validateAccess('edit-custom-template') && {
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
        renderCell: ({ row }) => (
          <IconButton size="small" onClick={() => setForm(row)}>
            <Icon icon="tabler:edit" fontSize={20} />
          </IconButton>
        )
      })
    }
  ]

  const toggleAddUserDrawer = () => {
    setToggleForm(true)
    // props.emitData({ TYPE: 'NEW', DATA: null })
  }

  const onFilter = (e) => {
    console.log('e', e)
    getData(e)
  }

  return (
    // <FilterLayout
    //   addButton={{
    //     title: 'New Template',
    //     onClick: () => setToggleForm(true),
    //     access: 'add-custom-template'
    //   }}
    //   filterData={GET_DATA(`customTemplates${activeTab}.filterData`)}
    //   filter={<TemplateFilter key={activeTab} onFilter={getData} />}>

    // </FilterLayout>

    <Grid container spacing={6} sx={{ height: '100%', padding: 2 }}>
      <Grid item xs={12} sx={{ pb: 5 }}>
        <Card sx={{ boxShadow: 3, marginTop: '10px', margin: '10px' }}>
          <TableHeader
            toggle={toggleAddUserDrawer}
            dataSource={templates}
            exportKeys={['name', 'description', 'mode', 'for', 'default', 'status']}
            header={['Name', 'Description', 'Mode', 'For', 'Default', 'Status']}
            btnTitle="New Template"
            title="CUSTOM TEMPLATES OVERVIEW"
            filters={null}
            page="CUSTOM_TEMPLATE"
            config={{}}
            applyFilter={(e) => onFilter(e)}
          />

          <Tabs className="pl-3" activeKey={activeTab} onChange={setActiveTab}>
            <TabPane tab={t('Service')} key="Service" />
            <TabPane tab={t('Logistic')} key="Logistic" />
            <TabPane tab={t('Finance')} key="Finance" />
            <TabPane tab={t('Freight')} key="Freight" />
            <TabPane tab={t('Payroll')} key="Payroll" />
          </Tabs>

          <DataGrid
            sx={{
              '& .MuiDataGrid-menuIconButton': {
                opacity: 1,
                color: '#fff'
              },

              fontSize: 12,
              '& .MuiDataGrid-iconButtonContainer': {
                visibility: 'visible'
              },
              '& .MuiDataGrid-sortIcon': {
                opacity: 'inherit !important',
                color: '#CBC9D2'
              },
              '& .MuiDataGrid-root .MuiDataGrid-columnHeader:focus-within': {
                outline: 'none !important',
                backgroundColor: 'red',
                margin: '6px'
              },
              '.MuiDataGrid-cell .MuiTypography-root': {
                fontSize: '12px !important'
              },
              '.MuiDataGrid-columnHeaderTitle': {
                fontWeight: '500 !important'
              },
              '.MuiTablePagination-displayedRows': {
                display: 'flex',
                justifyContent: 'flex-start' /* Align items to the left */,
                paddingTop: '15px'
              },
              '& .MuiDataGrid-cell:first-child': {
                paddingLeft: 2 // Table first column padding
              },
              '& .MuiDataGrid-columnHeader:first-child': {
                paddingLeft: 2
              },
              '& .MuiTablePagination-spacer': {
                flex: 'none !important'
              },

              '& .MuiDataGrid-footerContainer': {
                display: 'inline-block'
              },
              // '& .MuiTablePagination-root': {
              //   position: 'relative',
              //   right: '85%'
              //   // display: 'flex',
              //   // flex: 'none !important'
              // },

              // '& .MuiTablePagination-spacer ': {
              //   display: 'flex',
              //   flex: 'none !important'
              // },
              '& .MuiDataGrid-row': {
                height: '10px'
              }

              // '& .MuiDataGrid-main': {
              //   // remove overflow hidden overwise sticky does not work
              //   overflow: 'unset'
              // },
              // '& .MuiDataGrid-columnHeader:last-child': {
              //   position: 'sticky', // Table first column padding
              //   right: 0,
              //   background: 'white',
              //   boxShadow: '5px 2px 5px grey',
              //   borderLeft: '2px solid black'
              // },
              // '& .MuiDataGrid-cell:last-child ': {
              //   position: 'sticky', // Table first column padding
              //   right: 0,
              //   background: 'white',
              //   boxShadow: '5px 2px 5px grey',
              //   borderLeft: '2px solid black'
              // },
            }}
            paginationMode="server"
            autoHeight
            columnHeaderHeight={45}
            rowHeight={35}
            rows={templates}
            columns={columns}
            disableRowSelectionOnClick
            disableDensitySelector
            rowCount={rowCount}
            onPaginationModelChange={setPaginationModel}
            paginationModel={paginationModel}
          />
          {toggleForm && (
            <TemplateForm
              activeTab={activeTab}
              edit={toggleForm?.id ? toggleForm : false}
              templates={templates}
              type={activeTab}
              open={toggleForm}
              onAdd={onAdd}
              onCancel={onCancel}
            />
          )}
          {toggleHTMLForm && (
            <TemplateHTMLEditor
              edit={toggleHTMLForm?.id ? toggleHTMLForm : false}
              open={toggleHTMLForm}
              onAdd={onAdd}
              onCancel={onCancel}
            />
          )}
        </Card>
      </Grid>
    </Grid>
  )
}
