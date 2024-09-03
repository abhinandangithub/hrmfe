import { FunnelPlotOutlined, SettingOutlined } from '@ant-design/icons'
import { Button, Col, Layout, Row } from 'antd'
import moment from 'moment'
import React from 'react'

import { getHolidayList } from '../../../Actions/UserAction'
import LoaderBox from '../../../Components/LoaderBox/LoaderBox'
import TableBox from '../../../Components/TableBox/TableBox'

const { Sider, Content } = Layout

class Holidaycalendar extends React.Component {
  constructor() {
    super()
    this.state = {
      // collapsed: false,
      // sample: '',
      // sample_select: '',
      viewType: 'table',
      holidayList: [],
      filterview: 'filter',
      loader: true
    }
  }

  componentDidMount() {
    getHolidayList().then((holidayList) => {
      if (holidayList) {
        this.setState({ holidayList, loader: false })
      } else {
        this.setState({ loader: false })
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

  render() {
    const columns = [
      {
        title: 'Day',
        dataIndex: 'date',
        render: (text, row) => (row?.date ? moment(row.date).format('DD-MM-YYYY') : '')
      },
      {
        title: 'Region',
        dataIndex: 'region'
      },
      {
        title: 'Description',
        dataIndex: 'description'
      },
      {
        title: 'Action',
        dataIndex: 'custom_action',
        render: (text, row) => (
          <div className="btn-group">
            <button
              type="button"
              onClick={() => this.props.history(`/app/edit-holiday-calendar/${row._id}`)}
              className="btn glow dropdown-toggle">
              <SettingOutlined />
            </button>
          </div>
        )
      }
    ]

    return this.state.loader ? (
      <LoaderBox loader="Loading Holiday calendar..." />
    ) : (
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
          {/* <HolidaycalendarFilter /> */}
          {/* search filter ends */}
          <div className="filter-section">
            <button
              type="button"
              onClick={() => this.props.history('/app/add-holiday-calendar')}
              className="btn-glow btn-block primary">
              <i className="flaticon-plus" />
              Add Holiday Calendar
            </button>
          </div>
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
                  <h2>Holiday Calendar Details</h2>
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
                      onClick={() => this.props.history('/app/add-holiday-calendar')}
                      className="btn-glow btn-block primary">
                      Add Holiday calendar
                    </button>
                  </div>
                </Col>
              </Row>
            </div>

            <TableBox
              viewType={this.state.viewType}
              dataSource={this.state.holidayList}
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

export default Holidaycalendar
