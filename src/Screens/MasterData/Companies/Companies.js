import { FunnelPlotOutlined, SettingOutlined } from '@ant-design/icons'
import { Button, Col, Layout, Row } from 'antd'
import React from 'react'
import { getCompanies } from '../../../Actions/UserAction'
import ModalBox from '../../../Components/ModalBox/ModalBox'
import TableBox from '../../../Components/TableBox/TableBox'
import { validateAccess } from '../../../Util/Util'
import CompanyFilter from './CompanyFilter'
import CompanyForm from './CompanyForm'

const { Sider, Content } = Layout

export default class Companies extends React.Component {
  constructor() {
    super()
    this.state = {
      // collapsed: false,
      // sample: '',
      // sample_select: '',
      viewType: 'table',
      companies: [],
      filterview: 'filter'
    }
  }

  componentDidMount() {
    getCompanies().then((companies) => {
      if (companies) {
        this.setState({ companies })
      }
    })
  }
  // responsive filter starts

  responsiveFilter = () => {
    const x = document.getElementById('mobile-sider-menu')

    if (x.style.display === 'block') {
      x.style.display = 'none'
      this.setState({ filterview: 'filter' })
    } else {
      x.style.display = 'block'
      this.setState({ filterview: 'filter' })
    }
  }
  // responsive filter ends

  onChangeText = (value, type) => {
    this.setState({ [type]: value })
  }

  onCancel = (company, type) => {
    if (type === 'Add') {
      const companies = [...this.state.companies, company]
      this.setState({ open: false, selectedCompany: false, companies })
    } else if (type === 'Update') {
      const companies = this.state.companies.map((val) => (val.id === company.id ? company : val))
      this.setState({ open: false, selectedCompany: false, companies })
    }

    this.setState({ open: false, selectedCompany: false })
  }

  render() {
    const columns = [
      {
        title: 'Name',
        dataIndex: 'name'
      },
      {
        title: 'Code',
        dataIndex: 'code'
      },
      {
        title: 'Currency',
        dataIndex: 'currency'
      },
      {
        title: 'VAT',
        dataIndex: 'vat',
        render: (text) => `${text}%`
      },
      validateAccess('edit-company')
        ? {
            title: 'Action',
            dataIndex: 'custom_action',
            render: (text, row) => (
              <div className="btn-group">
                <button
                  type="button"
                  onClick={() => this.props.history.push(`/app/edit-company/${row.id}`)}
                  className="btn glow dropdown-toggle">
                  {' '}
                  <SettingOutlined />
                </button>
              </div>
            )
          }
        : {}
    ]

    return (
      <Layout className="app-sidebar">
        <div className="mobile-filter">
          <button type="button" className="btn btn-glow">
            {this.state.filterview === 'filter' ? (
              <FunnelPlotOutlined onClick={this.responsiveFilter} />
            ) : (
              <FunnelPlotOutlined onClick={this.responsiveFilter} />
            )}
          </button>
        </div>
        <Sider width={230} trigger={null} collapsible collapsed={false} id="mobile-sider-menu">
          {/* search filter starts  */}

          <CompanyFilter
            {...this.props}
            onFilter={this.onFilter}
            onOpen={() => this.setState({ open: true })}
          />

          {/* search filter ends */}
        </Sider>
        <Layout className="site-layout">
          <Content className="site-layout-background">
            <div className="top-filter-options">
              <Row>
                <Col
                  xs={{ span: 12, order: 1 }}
                  sm={{ span: 12, order: 1 }}
                  md={{ span: 12, order: 1 }}
                  lg={{ span: 12, order: 1 }}>
                  <h2>Company Overview</h2>
                </Col>

                <Col
                  xs={{ span: 12, order: 2 }}
                  sm={{ span: 12, order: 2 }}
                  md={{ span: 12, order: 2 }}
                  lg={{ span: 12, order: 2 }}>
                  <div className="exports-and-settings">
                    <ul>
                      <li>
                        <Button
                          type="standard"
                          className="ant-dropdown-link"
                          onClick={() => this.setState({ viewType: 'table' })}>
                          <i className="flaticon-table no-margin" />
                        </Button>
                      </li>
                      <li>
                        <Button
                          type="standard"
                          className="ant-dropdown-link"
                          onClick={() => this.setState({ viewType: 'card' })}>
                          <i className="flaticon-grid no-margin" />
                        </Button>
                      </li>

                      <li>
                        <Button type="standard" className="ant-dropdown-link" onClick={this.showModal}>
                          <i className="flaticon-settings no-margin" />
                        </Button>
                      </li>
                    </ul>
                  </div>
                </Col>
                <Col
                  xs={{ span: 24, order: 3 }}
                  sm={{ span: 24, order: 3 }}
                  md={{ span: 24, order: 3 }}
                  lg={{ span: 0, order: 3 }}>
                  <div className="add-new-invoice-button">
                    <button
                      type="button"
                      onClick={() => this.props.history.push('/app/add-company')}
                      className="btn-glow btn-block primary">
                      Add new company
                    </button>
                  </div>
                </Col>
              </Row>
            </div>
            <TableBox
              viewType={this.state.viewType}
              dataSource={this.state.companies}
              columns={columns}
              actionIndex="custom_action"
              cardHeaderIndex="status"
              cardFirstLabelIndex="docno"
            />
          </Content>
        </Layout>
        <ModalBox
          title="Add Company"
          visible={this.state.open}
          footer={null}
          onCancel={() => this.onCancel()}
          destroyOnClose>
          <CompanyForm onCancel={this.onCancel} selectedCompany={this.state.selectedCompany} />
        </ModalBox>
      </Layout>
    )
  }
}
