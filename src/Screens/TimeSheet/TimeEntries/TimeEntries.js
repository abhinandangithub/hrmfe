/* eslint-disable jsx-a11y/control-has-associated-label */
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
  getProjects,
  getTimeEntriesByEmployee,
  returnTimeEntry,
  submitTimeEntry
} from '../../../Actions/UserAction'
import approvedImg from '../../../assets/images/approved.png'
import rejectedImg from '../../../assets/images/rejected.png'
import returnedImg from '../../../assets/images/returned.png'
import submittedImg from '../../../assets/images/submitted.png'
import ConfirmationBox from '../../../Components/ConfirmationBox/ConfirmationBox'
import ModalBox from '../../../Components/ModalBox/ModalBox'
import { getStartAndEndWeek, TIME_ENABLED_STATUS } from '../../../Util/Util'
import Logs from '../../Logs/Logs'
import '../Day.scss'
import TimeEntryDays from './TimeEntryDays'
import TimeEntryForm from './TimeEntryForm'
import TimeEntryWeeks from './TimeEntryWeeks'

class TimeEntries extends React.Component {
  constructor() {
    super()
    this.state = {
      openAdd: false,
      // openProject: false,
      openLogs: false,
      view: localStorage.getItem('timeEntryView') || 'day',
      loader: true
    }
  }

  componentDidMount() {
    this.getTimeEntries()
    getProjects().then((projects) => {
      if (projects) {
        this.props.dispatch({ type: 'SET_USER_REDUCER', payload: { projects } })
      }
    })
  }

  getTimeEntries = (data) => {
    this.setState({ loader: true }, () => {
      const startWeekDate = data
        ? moment(data.startWeek).format('D')
        : moment(this.props.startWeek).format('D')
      const endWeekDate = data ? moment(data.endWeek).format('D') : moment(this.props.endWeek).format('D')
      const month = moment(data?.endWeek || this.props.endWeek).format('M')
      const year = moment(data?.endWeek || this.props.endWeek).format('YYYY')
      getTimeEntriesByEmployee(this.props.userInfo.id, { startWeekDate, endWeekDate, month, year }).then(
        (result) => {
          if (result) {
            const { weekEntry, timeEntries } = result
            this.setState({ weekStatus: weekEntry ? weekEntry.status : 'Created' })
            this.props.dispatch({ type: 'SET_TIME_DATA', payload: { timeEntries, weekEntry } })
          } else {
            this.setState({ weekStatus: 'Created' })
          }

          this.setState({ loader: false })
        }
      )
    })
  }

  onChangeWeek = (type) => {
    const date =
      type === 'previous'
        ? moment(this.props.startWeek).subtract(1, 'day')
        : moment(this.props.endWeek).add(1, 'day')
    const { startWeek, endWeek } = getStartAndEndWeek(date)

    if (this.props.companyInfo?.configurations?.timeEntryFutureDate === 'Yes' || startWeek < moment()) {
      this.props.dispatch({
        type: 'SET_TIME_DATA',
        payload: { startWeek, endWeek, selectedDate: moment(startWeek).format('YYYY-MM-DD') }
      })
      this.getTimeEntries({ startWeek, endWeek })
    }
  }

  onChangeDate = (date) => {
    if (date) {
      const { startWeek, endWeek } = getStartAndEndWeek(date)

      if (this.props.companyInfo?.configurations?.timeEntryFutureDate === 'Yes' || date < moment()) {
        this.props.dispatch({
          type: 'SET_TIME_DATA',
          payload: { startWeek, endWeek, selectedDate: moment(date).format('YYYY-MM-DD') }
        })
        this.getTimeEntries({ startWeek, endWeek })
      }
    }
  }

  onSubmitTimeEntries = () => {
    const { userInfo, startWeek, endWeek, timeEntries } = this.props
    let totalMinutes = 0
    timeEntries.forEach((val) => {
      totalMinutes += parseInt(val.totalMinutes, 10)
    })

    if (!userInfo.timeEntryId || userInfo.timeEntryId === 'null') {
      if (totalMinutes > 0) {
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
            submitTimeEntry({
              user: userInfo.id,
              startWeekDate,
              endWeekDate,
              month,
              year,
              totalMinutes
            }).then((weekEntry) => {
              if (weekEntry) {
                message.success('Time entries submitted')
                const timeEntries = this.props.timeEntries.map((val) => {
                  val.status = 'Submitted'

                  return val
                })
                this.props.dispatch({ type: 'SET_TIME_DATA', payload: { timeEntries, weekEntry } })
                this.setState({ weekStatus: 'Submitted' })
              }
            })
          }
        )
      } else {
        message.error('Timer is no times to sumit!')
      }
    } else {
      message.error('Timer is running! Please turn of timer and submit')
    }
  }

  onReturnTimeEntries = () => {
    const { weekEntry } = this.props

    if (weekEntry) {
      ConfirmationBox(
        {
          title: 'Return',
          description: 'Are you sure! Do you want to return?',
          acceptText: 'Return',
          cancelText: 'Cancel'
        },
        () => {
          returnTimeEntry({ weekId: weekEntry.id }).then((response) => {
            if (response) {
              message.success('Time entries returned')
              const timeEntries = this.props.timeEntries.map((val) => {
                val.status = 'Created'

                return val
              })
              this.props.dispatch({ type: 'SET_TIME_DATA', payload: { timeEntries } })
              this.setState({ weekStatus: 'Returned' })
            }
          })
        }
      )
    }
  }

  onCancel = () => {
    this.setState({ openAdd: false })
  }

  onOpenProject = () => {
    this.setState({
      // openProject: true,
      openAdd: false
    })
  }

  onCancelProject = () => {
    this.setState({
      // openProject: false,
      openAdd: true
    })
  }

  onCancelLogs = () => {
    this.setState({ openLogs: false })
  }

  onChangeTab = (view) => {
    localStorage.setItem('timeEntryView', view)
    this.setState({ view })
  }

  render() {
    return (
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
                        onClick={this.onReturnTimeEntries}>
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
                  <div className="timesheet-group">
                    <button
                      type="button"
                      className={`pds-button ${this.state.view === 'day' ? 'btn-selected' : ''}`}
                      onClick={() => this.onChangeTab('day')}>
                      Day
                    </button>
                    <button
                      type="button"
                      className={`pds-button ${this.state.view === 'week' ? 'btn-selected' : ''}`}
                      onClick={() => this.onChangeTab('week')}>
                      Week
                    </button>
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

              {this.state.view === 'day' && (
                <TimeEntryDays
                  weekStatus={this.state.weekStatus}
                  onSubmitTimeEntries={this.onSubmitTimeEntries}
                />
              )}

              {this.state.view === 'week' && (
                <TimeEntryWeeks
                  weekStatus={this.state.weekStatus}
                  onSubmitTimeEntries={this.onSubmitTimeEntries}
                />
              )}
            </div>
          )}
          <ModalBox
            title={`Enter time for ${this.props.selectedDate}`}
            visible={this.state.openAdd}
            footer={null}
            onCancel={() => this.onCancel()}
            destroyOnClose>
            <TimeEntryForm onCancel={this.onCancel} onOpenProject={this.onOpenProject} />
          </ModalBox>
          {/* 
            <ModalBox
              title="Add Project"
              visible={this.state.openProject}
              footer={null}
              onCancel={() => this.onCancelProject()}
              destroyOnClose>
              <ProjectForm onCancel={this.onCancelProject} />
            </ModalBox> */}

          <ModalBox
            title="Time Logs"
            visible={this.state.openLogs}
            footer={null}
            onCancel={() => this.onCancelLogs()}
            destroyOnClose>
            {this.state.weekStatus !== 'Created' && this.props.weekEntry && (
              <Logs entityId={this.props.weekEntry.id} entityType="Timesheet" />
            )}
          </ModalBox>
        </Col>
      </Row>
    )
  }
}

function mapStateToProps(state) {
  return {
    userInfo: state.users.userInfo,
    companyInfo: state.users.companyInfo,
    startWeek: state.times.startWeek,
    endWeek: state.times.endWeek,
    timeEntries: state.times.timeEntries,
    selectedDate: state.times.selectedDate,
    weekEntry: state.times.weekEntry
  }
}

export default connect(mapStateToProps)(TimeEntries)
