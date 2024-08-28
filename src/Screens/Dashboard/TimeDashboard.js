import { ClockCircleOutlined, FieldTimeOutlined } from '@ant-design/icons'
import { Col, Row } from 'antd'
import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { amountSeparator } from '../../Util/Util'
import './Dashboard.scss'

class Dashboard extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      opacity: {
        income: 1,
        expences: 1
      },

      incomeTotalAmount: 0.0,
      incomeTotalCollected: 0.0,
      incomeTotalOutstanding: 0.0,
      incomeTotalCount: 0
      // incomeMonths: [],

      // expenseTotalAmount: 0.0,
      // expenseTotalCollected: 0.0,
      // expenseTotalOutstanding: 0.0,
      // expenseTotalCount: 0,
      // expenseMonths: [],

      // openAddInvoice: false
    }
  }

  handleMouseEnter = (o) => {
    const { dataKey } = o
    const { opacity } = this.state

    this.setState({
      opacity: { ...opacity, [dataKey]: 0.5 }
    })
  }

  render() {
    const { companyInfo } = this.props

    return (
      <Row gutter={(24, 20)}>
        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 12 }}>
          <div className="overview card">
            <div className="heading">
              {/* filter starts */}
              <Row>
                <Col xs={{ span: 12 }} sm={{ span: 12 }} md={{ span: 12 }} lg={{ span: 12 }}>
                  <h2>Time Details</h2>
                </Col>
                <Col
                  xs={{ span: 12 }}
                  sm={{ span: 12 }}
                  md={{ span: 12 }}
                  lg={{ span: 12 }}
                  style={{ textAlign: 'right' }}>
                  <Link to="/app/timeEntries" className="btn-glow primary">
                    Time Entries
                  </Link>
                </Col>
              </Row>
              {/* filter ends */}
            </div>
            <Row gutter={(16, 20)}>
              <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 12 }}>
                <div className="overall-details collected">
                  <div className="icon">
                    <FieldTimeOutlined />
                  </div>
                  <div className="details">
                    <h3>
                      {companyInfo.currency} {amountSeparator(this.state.incomeTotalAmount)}
                    </h3>
                    <p>This Week</p>
                  </div>
                </div>
              </Col>
              {/* collected ends here */}
              <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 12 }}>
                <div className="overall-details outstanding">
                  <div className="icon">
                    <ClockCircleOutlined />
                  </div>
                  <div className="details">
                    <h3>
                      {companyInfo.currency} {amountSeparator(this.state.incomeTotalCollected)}
                    </h3>
                    <p>Total Hours Worked</p>
                  </div>
                </div>
              </Col>
              {/* outstanding ends here */}
              <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 12 }}>
                <div className="overall-details overdue">
                  <div className="icon">
                    <i className="flaticon-wedding-planning" />
                  </div>
                  <div className="details">
                    <h3>
                      {companyInfo.currency} {amountSeparator(this.state.incomeTotalOutstanding)}
                    </h3>
                    <p>Submitted Timesheets</p>
                  </div>
                </div>
              </Col>
              {/* Overdue ends here */}
              <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 12 }}>
                <div className="overall-details clients">
                  <div className="icon">
                    <i className="flaticon-checklist-6" />
                  </div>
                  <div className="details">
                    <h3>{this.state.incomeTotalCount}</h3>
                    <p>Total Count</p>
                  </div>
                </div>
              </Col>
              {/* clients ends here */}

              <Link to="/app/timeReports">View Time Report</Link>
            </Row>
          </div>
        </Col>

        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 8 }}>
          <div className="overview card">
            <div className="heading">
              {/* filter starts */}
              <Row>
                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 24 }}>
                  <h2>Processed Timesheets</h2>
                </Col>
              </Row>
              {/* filter ends */}
            </div>
            <Row gutter={(16, 20)}>
              <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 24 }}>
                <div className="processed-timesheets">
                  <div className="list">
                    <div className="details">
                      <h4>01-May-2021 to 07-May-2021</h4>
                      <p>
                        <span style={{ background: '#3f51b5' }} className="status" /> Submitted
                      </p>
                    </div>
                  </div>
                  <div className="list">
                    <div className="details">
                      <h4>26-Apr-2021 to 30-Apr-2021</h4>
                      <p>
                        <span style={{ background: '#8bc34a' }} className="status" /> Approved
                      </p>
                    </div>
                  </div>
                </div>
              </Col>
              {/* clients ends here */}

              <Link to="/app/timeApprovals">View More Timesheets</Link>
            </Row>
          </div>
        </Col>
      </Row>
    )
  }
}

function mapStateToProps(state) {
  return {
    userInfo: state.users.userInfo,
    companyInfo: state.users.companyInfo
  }
}

export default connect(mapStateToProps)(Dashboard)
