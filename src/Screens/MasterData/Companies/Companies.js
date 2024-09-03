/* eslint-disable no-unused-vars */
import { Icon } from '@iconify/react'
import { ButtonBase } from '@mui/material'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate  } from 'react-router-dom'
import { getCompanies } from '../../../Actions/UserAction'
import RowOptions from '../../../Components/TableBoxGrid/RowOptions'
import TableBox from '../../../Components/TableBoxGrid/TableBox'

// const { Sider, Content } = Layout

const Companies = () => {
  const history = useNavigate()
  const { t } = useTranslation()
  // const [viewType, setViewType] = useState('table')
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [companies, setCompanies] = useState([])
  // const [filterView, setFilterView] = useState('filter')
  // const [open, setOpen] = useState(false)
  // const [selectedCompany, setSelectedCompany] = useState(null)

  useEffect(() => {
    getCompanies().then((companies) => {
      if (companies) {
        setCompanies(companies)
      }
    })
  }, [])

  function tableAction(param) {
    if (param.TYPE === 'EDIT') {
      history(`/app/edit-company/${param.id}`)
    }
  }

  const countryJson = {
    title: 'Company Overview',
    page: 'Company',
    endpoint: 'companies/getAll',
    setFilter: 'country.filterData',

    table: {
      header: [
        {
          flex: 0.25,
          minWidth: 280,
          field: 'name',
          headerClassName: 'super-app-theme--header',

          headerName: t('Name'),
          disableColumnMenu: true,
          renderCell: ({ row }: any) => {
            const { name, id } = row

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
                      {name}
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
          field: 'code',
          headerClassName: 'super-app-theme--header',

          headerName: t('Code'),
          disableColumnMenu: true,
          renderCell: ({ row }: any) => {
            const { postalCode, id } = row

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
                      {postalCode}
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
          field: 'currency',
          headerClassName: 'super-app-theme--header',

          headerName: t('Currency'),
          disableColumnMenu: true,
          renderCell: ({ row }: any) => {
            const { currency, id } = row

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
                      {currency}
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
          field: 'vat',
          headerName: t('VAT'),
          headerClassName: 'super-app-theme--header',

          disableColumnMenu: true,
          renderCell: ({ row }: any) => {
            const { tax, taxFormat } = row

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
                    {`${tax} ${taxFormat}`}
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
          renderCell: ({ row }: any) => <RowOptions id={row.id} tableAction={(e: any) => tableAction(e)} />
        }
      ],
      dataSource: []
    },
    export: {
      header: ['Name', 'Code', 'Currency', 'VAT'],
      data: ['name', 'countryCode', 'currency', 'tax'],
      btnTitle: 'Add Company'
    },
    filters: null
  }

  const emitData = (param: any) => {
    switch (param.TYPE) {
      case 'NEW':
        return history('/app/add-company')
      default:
        console.log('test')
        break
    }
    console.log('param', param)
  }

  return (
    <Grid container spacing={6} sx={{ height: '100%', padding: 2 }}>
      <Grid item xs={12} sx={{ pb: 5 }}>
        <TableBox tableConfig={countryJson} emitData={emitData} />
      </Grid>
    </Grid>
    // <Layout className="app-sidebar">
    //   <div className="mobile-filter">
    //     <button type="button" className="btn btn-glow">
    //       <FunnelPlotOutlined onClick={responsiveFilter} />
    //     </button>
    //   </div>
    //   <Sider width={230} trigger={null} collapsible collapsed={false} id="mobile-sider-menu">
    //     <CompanyFilter {...props} onFilter={() => {}} onOpen={() => setOpen(true)} />
    //   </Sider>
    //   <Layout className="site-layout">
    //     <Content className="site-layout-background">
    //       <div className="top-filter-options">
    //         <Row>
    //           <Col
    //             xs={{ span: 12, order: 1 }}
    //             sm={{ span: 12, order: 1 }}
    //             md={{ span: 12, order: 1 }}
    //             lg={{ span: 12, order: 1 }}>
    //             <h2>Company Overview</h2>
    //           </Col>
    //           <Col
    //             xs={{ span: 12, order: 2 }}
    //             sm={{ span: 12, order: 2 }}
    //             md={{ span: 12, order: 2 }}
    //             lg={{ span: 12, order: 2 }}>
    //             <div className="exports-and-settings">
    //               <ul>
    //                 <li>
    //                   <Button
    //                     type="standard"
    //                     className="ant-dropdown-link"
    //                     onClick={() => setViewType('table')}>
    //                     <i className="flaticon-table no-margin" />
    //                   </Button>
    //                 </li>
    //                 <li>
    //                   <Button
    //                     type="standard"
    //                     className="ant-dropdown-link"
    //                     onClick={() => setViewType('card')}>
    //                     <i className="flaticon-grid no-margin" />
    //                   </Button>
    //                 </li>
    //                 <li>
    //                   <Button type="standard" className="ant-dropdown-link" onClick={() => setOpen(true)}>
    //                     <i className="flaticon-settings no-margin" />
    //                   </Button>
    //                 </li>
    //               </ul>
    //             </div>
    //           </Col>
    //           <Col
    //             xs={{ span: 24, order: 3 }}
    //             sm={{ span: 24, order: 3 }}
    //             md={{ span: 24, order: 3 }}
    //             lg={{ span: 0, order: 3 }}>
    //             <div className="add-new-invoice-button">
    //               <button
    //                 type="button"
    //                 onClick={() => props.history('/app/add-company')}
    //                 className="btn-glow btn-block primary">
    //                 Add new company
    //               </button>
    //             </div>
    //           </Col>
    //         </Row>
    //       </div>
    //       <TableBox
    //         viewType={viewType}
    //         dataSource={companies}
    //         columns={columns}
    //         actionIndex="custom_action"
    //         cardHeaderIndex="status"
    //         cardFirstLabelIndex="docno"
    //       />
    //     </Content>
    //   </Layout>
    //   <ModalBox title="Add Company" visible={open} footer={null} onCancel={() => onCancel()} destroyOnClose>
    //     <CompanyForm onCancel={onCancel} selectedCompany={selectedCompany} />
    //   </ModalBox>
    // </Layout>
  )
}

export default Companies
