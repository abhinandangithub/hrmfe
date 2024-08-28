import { Col, Row, Steps } from 'antd'
import moment from 'moment'
import React from 'react'
import { connect } from 'react-redux'
import { getExpenseClaimLogs } from '../../Actions/UserAction'

const { Step } = Steps

class ExpenseClaimLogs extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      // isSubmit: false,
      timeLogs: [],
      userData: {}
    }
  }

  componentDidMount() {
    const { user } = this.props
    const startWeek = moment(this.props.startWeek)
    const endWeek = moment(this.props.endWeek)

    const startWeekDate = moment(startWeek).format('D')
    const endWeekDate = moment(endWeek).format('D')
    const month = moment(startWeek).format('MM')
    const year = moment(startWeek).format('YYYY')
    getExpenseClaimLogs(user, { startWeekDate, endWeekDate, month, year }).then((logs) => {
      if (logs) {
        const { timeLogs, userData } = logs
        this.setState({ timeLogs, userData })
      }
    })
  }

  render() {
    const { timeLogs, userData } = this.state

    return (
      <Row className="add-proj-timesheet">
        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 24 }}>
          <Steps current={1} status="error" direction="vertical">
            {timeLogs.map((val) => {
              if (val.status === 'Submitted') {
                return (
                  <Step
                    status="finish"
                    title={
                      <div className="submitted">
                        <span style={{ fontWeight: 600 }}>{val.status}</span>
                        <span> by {userData.name}</span>
                      </div>
                    }
                    description={
                      <div className="other-details">
                        <p className="description">{userData.name} submitted this timesheet</p>{' '}
                        <p className="date">{moment(val.createdAt).format('DD-MMM-YYYY hh:mm a')}</p>
                      </div>
                    }
                  />
                )
              }

              if (val.status === 'Returned') {
                return (
                  <Step
                    status="wait"
                    title={
                      <div className="returned">
                        <span style={{ fontWeight: 600 }}>{val.status}</span>
                        <span> by {userData.name}</span>
                      </div>
                    }
                    description={
                      <div className="other-details">
                        <p className="description">{userData.name} returned this timesheet</p>
                        <p className="date">{moment(val.createdAt).format('DD-MMM-YYYY hh:mm a')}</p>
                      </div>
                    }
                  />
                )
              }

              if (val.status === 'Approved') {
                return (
                  <Step
                    status="finish"
                    title={
                      <div className="approved">
                        <span style={{ fontWeight: 600 }}>{val.status}</span>
                        <span> by {val.reporterData.name}</span>
                      </div>
                    }
                    description={
                      <div className="other-details">
                        <p className="description">{val.reporterData.name} approved this timesheet</p>
                        <p className="date">{moment(val.createdAt).format('DD-MMM-YYYY hh:mm a')}</p>
                      </div>
                    }
                  />
                )
              }

              if (val.status === 'Rejected') {
                return (
                  <Step
                    status="error"
                    title={
                      <div className="rejected">
                        <span style={{ fontWeight: 600 }}>{val.status}</span>
                        <span> by {val.reporterData.name}</span>
                      </div>
                    }
                    description={
                      <div className="other-details">
                        <p className="description">{val.reason}</p>
                        <p className="date">{moment(val.createdAt).format('DD-MMM-YYYY hh:mm a')}</p>
                      </div>
                    }
                  />
                )
              }

              return null
            })}
          </Steps>
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

export default connect(mapStateToProps)(ExpenseClaimLogs)
