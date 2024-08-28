import {
  AppstoreAddOutlined,
  ArrowLeftOutlined,
  InfoCircleOutlined,
  LeftOutlined,
  RightOutlined
} from '@ant-design/icons'
import { Col, DatePicker, message, Row, Skeleton } from 'antd'
import moment from 'moment'
import React from 'react'
import { connect } from 'react-redux'
import {
  getExpensesByUser,
  getProjects,
  returnExpenseClaim,
  submitExpenseClaim
} from '../../Actions/UserAction'
import approvedImg from '../../assets/images/approved.png'
import expensesImg from '../../assets/images/expenses.svg'
import rejectedImg from '../../assets/images/rejected.png'
import returnedImg from '../../assets/images/returned.png'
import submittedImg from '../../assets/images/submitted.png'
// import '../Expenses.scss';
import ConfirmationBox from '../../Components/ConfirmationBox/ConfirmationBox'
import ModalBox from '../../Components/ModalBox/ModalBox'
import { getStartAndEndWeek, TIME_ENABLED_STATUS } from '../../Util/Util'
import Logs from '../Logs/Logs'
import '../TimeSheet/Day.scss'
import './Expenses.scss'
import ExpensesDetails from './ExpensesDetails'
import ExpensesForm from './ExpensesForm'

class ExpenseClaimEntries extends React.Component {
  constructor() {
    super()
    this.state = {
      openAdd: false,
      // openProject: false,
      openLogs: false,
      // view: 'day',
      loader: true
    }
  }

  componentDidMount() {
    this.getExpenseClaimEntries()
    getProjects().then((projects) => {
      if (projects) {
        this.props.dispatch({ type: 'SET_USER_REDUCER', payload: { projects } })
      }
    })
  }

  getExpenseClaimEntries = (data) => {
    this.setState({ loader: true }, () => {
      const startWeekDate = data
        ? moment(data.startWeek).format('D')
        : moment(this.props.startWeek).format('D')
      const endWeekDate = data ? moment(data.endWeek).format('D') : moment(this.props.endWeek).format('D')
      getExpensesByUser({ startWeekDate, endWeekDate }).then((result) => {
        if (result) {
          const { weekEntry, expenseClaimEntries } = result
          this.setState({ weekStatus: weekEntry ? weekEntry.status : 'Created' })
          this.props.dispatch({ type: 'SET_EXPENSE_CLAIM_DATA', payload: { expenseClaimEntries, weekEntry } })
        } else {
          this.setState({ weekStatus: 'Created' })
        }

        this.setState({ loader: false })
      })
    })
  }

  onChangeWeek = (type) => {
    const date =
      type === 'previous'
        ? moment(this.props.startWeek).subtract(1, 'day')
        : moment(this.props.endWeek).add(1, 'day')
    const { startWeek, endWeek } = getStartAndEndWeek(date)

    if (startWeek < moment()) {
      this.props.dispatch({
        type: 'SET_EXPENSE_CLAIM_DATA',
        payload: { startWeek, endWeek, selectedDate: moment(startWeek).format('YYYY-MM-DD') }
      })
      this.getExpenseClaimEntries({ startWeek, endWeek })
    }
  }

  onChangeDate = (date) => {
    if (date) {
      const { startWeek, endWeek } = getStartAndEndWeek(date)

      if (date < moment()) {
        this.props.dispatch({
          type: 'SET_EXPENSE_CLAIM_DATA',
          payload: { startWeek, endWeek, selectedDate: moment(date).format('YYYY-MM-DD') }
        })
        this.getExpenseClaimEntries({ startWeek, endWeek })
      }
    }
  }

  onSubmitExpenseClaim = () => {
    const { userInfo, startWeek, endWeek, expenseClaimEntries } = this.props
    let amount = 0
    expenseClaimEntries.forEach((val) => {
      amount += parseFloat(val.amount)
    })

    if (!userInfo.timeEntryId || userInfo.timeEntryId === 'null') {
      ConfirmationBox(
        {
          title: 'Submit',
          description: 'Are you sure! Do you want to submit?',
          acceptText: 'Submit',
          cancelText: 'Cancel'
        },
        () => {
          const startWeekDate = moment(startWeek).format('D')
          const endWeekDate = moment(endWeek).format('D')
          const month = moment(startWeek).format('M')
          const year = moment(startWeek).format('YYYY')
          submitExpenseClaim({
            user: userInfo.id,
            startWeekDate,
            endWeekDate,
            month,
            year,
            amount: parseFloat(amount).toFixed(2)
          }).then((weekEntry) => {
            if (weekEntry) {
              message.success('Expense claims submitted')
              const expenseClaimEntries = this.props.expenseClaimEntries.map((val) => {
                val.status = 'Submitted'

                return val
              })
              this.props.dispatch({
                type: 'SET_EXPENSE_CLAIM_DATA',
                payload: { expenseClaimEntries, weekEntry }
              })
              this.setState({ weekStatus: 'Submitted' })
            }
          })
        }
      )
    } else {
      message.error('Timer is running! Please turn of timer and submit')
    }
  }

  onReturnExpenseClaim = () => {
    const { weekEntry } = this.props
    ConfirmationBox(
      {
        title: 'Return',
        description: 'Are you sure! Do you want to return?',
        acceptText: 'Return',
        cancelText: 'Cancel'
      },
      () => {
        returnExpenseClaim({ weekId: weekEntry.id }).then((response) => {
          if (response) {
            message.success('Time entries returned')
            const expenseClaimEntries = this.props.expenseClaimEntries.map((val) => {
              val.status = 'Created'

              return val
            })
            this.props.dispatch({ type: 'SET_EXPENSE_CLAIM_DATA', payload: { expenseClaimEntries } })
            this.setState({ weekStatus: 'Returned' })
          }
        })
      }
    )
  }

  onCancel = () => {
    this.setState({ openAdd: false })
  }

  onOpenProject = () => {
    this.setState({
      //  openProject: true,
      openAdd: false
    })
  }

  onCancelProject = () => {
    this.setState({
      //  openProject: false,
      openAdd: true
    })
  }

  onCancelLogs = () => {
    this.setState({ openLogs: false })
  }

  render() {
    return (
      <>
        <Row justify="center" className="inner-contents">
          <Col xs={{ span: 23 }} sm={{ span: 23 }} md={{ span: 22 }} lg={{ span: 18 }}>
            <section className="day-timesheet-header">
              <Row>
                <Col
                  xs={{ span: 24 }}
                  sm={{ span: 24 }}
                  md={{ span: 24 }}
                  lg={{ span: 10 }}
                  className="left-section">
                  <div className="timesheet-group">
                    <button
                      type="button"
                      className="pds-button pds-button-icon"
                      onClick={() => this.onChangeWeek('previous')}>
                      <LeftOutlined />
                    </button>
                    <button
                      type="button"
                      className="pds-button pds-button-icon"
                      onClick={() => this.onChangeWeek('next')}>
                      <RightOutlined />
                    </button>
                  </div>
                  <div className="today-date">
                    <span className="title" />{' '}
                    <span className="selected-date">
                      {moment(this.props.startWeek).format('DD')} -{' '}
                      {moment(this.props.endWeek).format('DD MMM YYYY')}
                    </span>{' '}
                    {this.state.weekStatus !== 'Created' && (
                      <span className="week-status">({this.state.weekStatus})</span>
                    )}
                  </div>
                </Col>
                <Col
                  xs={{ span: 24 }}
                  sm={{ span: 24 }}
                  md={{ span: 24 }}
                  lg={{ span: 14 }}
                  className="right-section">
                  <div className="main-day-view-controls">
                    <div className="add-new-calendar">
                      {TIME_ENABLED_STATUS.indexOf(this.state.weekStatus) >= 0 && (
                        <button
                          type="button"
                          className="pds-button pds-button-primary"
                          onClick={() => this.setState({ openAdd: true })}>
                          <AppstoreAddOutlined /> New Entry
                        </button>
                      )}
                      {this.state.weekStatus === 'Submitted' && (
                        <button
                          type="button"
                          className="pds-button pds-button-primary"
                          onClick={this.onReturnExpenseClaim}>
                          <ArrowLeftOutlined /> Return Submitted
                        </button>
                      )}
                      <button type="button" className="pds-button pds-date">
                        <DatePicker value={moment(this.props.selectedDate)} onChange={this.onChangeDate} />
                      </button>
                      {this.state.weekStatus !== 'Created' && (
                        <button
                          type="button"
                          className="pds-button pds-button-icon"
                          title="Logs"
                          onClick={() => this.setState({ openLogs: true })}>
                          <InfoCircleOutlined />
                        </button>
                      )}
                    </div>
                  </div>
                </Col>
              </Row>
            </section>

            {this.state.loader ? (
              <div>
                <Skeleton loading active />
                <Skeleton loading active />
                <Skeleton loading active />
              </div>
            ) : (
              <div className="timetable-container">
                <div className="status-watermark">
                  {this.state.weekStatus === 'Approved' && (
                    <img draggable={false} src={approvedImg} alt="Status" />
                  )}
                  {this.state.weekStatus === 'Submitted' && (
                    <img draggable={false} src={submittedImg} alt="Status" />
                  )}
                  {this.state.weekStatus === 'Rejected' && (
                    <img draggable={false} src={rejectedImg} alt="Status" />
                  )}
                  {this.state.weekStatus === 'Returned' && (
                    <img draggable={false} src={returnedImg} alt="Status" />
                  )}
                </div>
                {this.props.expenseClaimEntries.length > 0 ? (
                  <div>
                    <ExpensesDetails
                      expenseClaimEntries={this.props.expenseClaimEntries}
                      weekStatus={this.state.weekStatus}
                      onSubmitExpenseClaim={this.onSubmitExpenseClaim}
                      getExpenseClaimEntries={this.getExpenseClaimEntries}
                    />
                  </div>
                ) : (
                  <section className="expenses">
                    <div className="empty-timesheet no-data">
                      <img src={expensesImg} alt="Expenses Entries" />
                      <h2>
                        Ready to record those airline tickets, meals, or miles?
                        <br />
                        Go ahead, create your first expense.
                      </h2>
                    </div>
                  </section>
                )}
              </div>
            )}
          </Col>
        </Row>
        <ModalBox
          title="Add New Expenses Claim"
          visible={!!this.state.openAdd}
          width={800}
          onCancel={this.onCancel}
          footer={null}
          destroyOnClose>
          <ExpensesForm
            onCancel={this.onCancel}
            getExpenseClaimEntries={this.getExpenseClaimEntries}
            weekStatus={this.state.weekStatus}
          />
        </ModalBox>

        <ModalBox
          title="Expense Claim Logs"
          visible={this.state.openLogs}
          footer={null}
          onCancel={() => this.onCancelLogs()}
          destroyOnClose>
          {this.state.weekStatus !== 'Created' && this.props.weekEntry && (
            <Logs entityId={this.props.weekEntry.id} entityType="ExpenseClaim" />
          )}
        </ModalBox>
      </>
    )
  }
}

function mapStateToProps(state) {
  return {
    userInfo: state.users.userInfo,
    startWeek: state.expenseClaims.startWeek,
    endWeek: state.expenseClaims.endWeek,
    expenseClaimEntries: state.expenseClaims.expenseClaimEntries,
    selectedDate: state.expenseClaims.selectedDate,
    weekEntry: state.expenseClaims.weekEntry
  }
}

export default connect(mapStateToProps)(ExpenseClaimEntries)
