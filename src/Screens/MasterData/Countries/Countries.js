import { FunnelPlotOutlined, SettingOutlined } from '@ant-design/icons'
import { Button, Col, Layout, Row } from 'antd'
import React from 'react'
import { getCountries } from '../../../Actions/UserAction'
import TableBox from '../../../Components/TableBox/TableBox'
import { validateAccess } from '../../../Util/Util'
import CountryFilter from './CountryFilter'

const { Sider, Content } = Layout

export default class Countries extends React.Component {
  constructor() {
    super()
    this.state = {
      // collapsed: false,
      // sample: '',
      // sample_select: '',
      viewType: 'table',
      countries: [],
      filterview: 'filter'
    }
  }

  componentDidMount() {
    getCountries().then((countries) => {
      if (countries) {
        this.setState({ countries })
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

  onFilter = (query) => {
    getCountries(query).then((countries) => {
      if (countries) {
        this.setState({ countries })
      }
    })
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
      validateAccess('edit-company')
        ? {
            title: 'Action',
            dataIndex: 'custom_action',
            render: (text, row) => (
              <div className="btn-group">
                <button
                  type="button"
                  onClick={() => this.props.history.push(`/app/edit-country/${row.id}`)}
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

          <CountryFilter {...this.props} onFilter={this.onFilter} />

          {/* search filter ends */}
        </Sider>
        <Layout className="site-layout">
          <Content className="site-layout-background">
            <div className="top-filter-options">
              <Row>
                <Col
                  xs={{ span: 24, order: 1 }}
                  sm={{ span: 24, order: 1 }}
                  md={{ span: 12, order: 1 }}
                  lg={{ span: 12, order: 1 }}>
                  <h2>Country Overview</h2>
                </Col>

                <Col
                  xs={{ span: 24, order: 2 }}
                  sm={{ span: 24, order: 2 }}
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
                      onClick={() => this.props.history.push('/app/add-country')}
                      className="btn-glow btn-block primary">
                      Add new country
                    </button>
                  </div>
                </Col>
              </Row>
            </div>
            <TableBox
              viewType={this.state.viewType}
              dataSource={this.state.countries}
              columns={columns}
              actionIndex="custom_action"
              cardHeaderIndex="status"
              cardFirstLabelIndex="docno"
            />
          </Content>
        </Layout>
      </Layout>
    )
  }
}
