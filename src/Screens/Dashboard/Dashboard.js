import { Col, DatePicker, Row } from 'antd'
import moment from 'moment'
import React from 'react'
import { connect } from 'react-redux'
import { validateAccess } from '../../Util/Util'
import './Dashboard.scss'
import InvoiceDashboard from './InvoiceDashboard'
import TransmissionDashboard from './TransmissionDashboard'

const { RangePicker } = DatePicker

class Dashboard extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      startDate: moment().subtract(1, 'month'),
      endDate: moment(),
      showDashboard: true
    }
  }

  onChange = (value) => {
    this.setState({ showDashboard: false }, () => {
      this.setState({ startDate: value[0], endDate: value[1], showDashboard: true })
    })
  }

  render() {
    const transmissionAccess = validateAccess('transmissions')
    // const clientTransmissionAccess =
    //   this.props.userInfo.userType !== 'Admin' && validateAccess('customer-transmissions')
    const invoiceAccess = validateAccess('incomes') || validateAccess('expenses')

    return (
      <div className="accounting-dashboard">
        <Row justify="center">
          <Col
            xs={{ span: 23, order: 1 }}
            sm={{ span: 22, order: 1 }}
            md={{ span: 22, order: 1 }}
            lg={{ span: 17, order: 1 }}>
            <h1>Dashboard</h1>
          </Col>
          <Col
            xs={{ span: 23, order: 1 }}
            sm={{ span: 22, order: 1 }}
            md={{ span: 22, order: 1 }}
            lg={{ span: 5, order: 1 }}>
            <RangePicker
              value={[this.state.startDate, this.state.endDate]}
              selected={[this.state.startDate, this.state.endDate]}
              onChange={this.onChange}
              clearIcon={false}
            />
          </Col>
          {this.state.showDashboard && (
            <Col
              xs={{ span: 23, order: 1 }}
              sm={{ span: 22, order: 1 }}
              md={{ span: 22, order: 1 }}
              lg={{ span: 22, order: 1 }}>
              {transmissionAccess && (
                <TransmissionDashboard startDate={this.state.startDate} endDate={this.state.endDate} />
              )}
            </Col>
          )}

          {this.state.showDashboard && (
            <Col
              xs={{ span: 23, order: 1 }}
              sm={{ span: 22, order: 1 }}
              md={{ span: 22, order: 1 }}
              lg={{ span: 22, order: 1 }}>
              {/* {clientTransmissionAccess && <ClientTransmissionDashboard startDate={this.state.startDate} endDate={this.state.endDate} />} */}
            </Col>
          )}

          {this.state.showDashboard && (
            <Col
              xs={{ span: 23, order: 1 }}
              sm={{ span: 22, order: 1 }}
              md={{ span: 22, order: 1 }}
              lg={{ span: 22, order: 1 }}>
              {invoiceAccess && (
                <InvoiceDashboard startDate={this.state.startDate} endDate={this.state.endDate} />
              )}
            </Col>
          )}
        </Row>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    userInfo: state.users.userInfo,
    companyInfo: state.users.companyInfo,
    access: state.users.access
  }
}

export default connect(mapStateToProps)(Dashboard)
