import { FunnelPlotOutlined } from '@ant-design/icons'
import { Button, Col, Layout, Row } from 'antd'
import moment from 'moment'
import React from 'react'

import { generatePayroll } from '../../../Actions/UserAction'
import ModalBox from '../../../Components/ModalBox/ModalBox'
import TableBox from '../../../Components/TableBox/TableBox'
import GeneratePayrollFilter from './GeneratePayrollFilter'

const { Sider, Content } = Layout

class GeneratePayroll extends React.Component {
  constructor() {
    super()
    this.state = {
      openAdd: false,
      // collapsed: false,
      // sample: '',
      // sample_select: '',
      viewType: 'table',
      payRollList: [],
      filterview: 'filter'
    }
  }

  onCancel = () => {
    this.setState({ openAdd: !this.state.openAdd })
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

  run = (data) => {
    generatePayroll(data).then((pList) => {
      if (pList) {
        this.setState({ payRollList: pList })
      }
    })
  }

  render() {
    const columns = [
      {
        title: 'Employee ID',
        dataIndex: 'empId'
      },
      {
        title: 'Generated Date',
        render: (text, row) => (row?.date ? moment(row.date).format('DD-MM-YYYY') : '')
      },
      {
        title: 'Total',
        dataIndex: 'total'
      },
      {
        title: 'Run no',
        dataIndex: 'runNo'
      }
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
          {/* <HolidaycalendarFilter /> */}
          {/* search filter ends */}
          <GeneratePayrollFilter getToRun={this.run} />
          {/* <div className="filter-section">
              <button
                type="button"
                onClick={() => this.props.history('/app/add-holiday-calendar')}
                className="btn-glow btn-block primary">
                Add Holiday Calendar
              </button>
            </div> */}
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
                  <h2>Generate Payroll</h2>
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
                      Add Holiday calendarsss
                    </button>
                  </div>
                </Col>
              </Row>
            </div>

            <TableBox
              viewType={this.state.viewType}
              dataSource={this.state.payRollList}
              columns={columns}
              actionIndex="custom_action"
              cardHeaderIndex="status"
              cardFirstLabelIndex="docno"
            />
          </Content>
          <ModalBox // show when already genrated.
            title="Add New Expenses Claim"
            visible={!!this.state.openAdd}
            width={800}
            onCancel={this.onCancel}
            footer={null}
            destroyOnClose>
            Already payroll has genrated.
          </ModalBox>
        </Layout>
      </Layout>
    )
  }
}

export default GeneratePayroll