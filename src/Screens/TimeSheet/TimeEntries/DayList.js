import { ClockCircleOutlined } from '@ant-design/icons'
import { Col, Row } from 'antd'
import moment from 'moment'
import React from 'react'
import { connect } from 'react-redux'
import { endTimer, startTimer } from '../../../Actions/UserAction'
import ModalBox from '../../../Components/ModalBox/ModalBox'
import { convertMinutesToHours, TIME_ENABLED_STATUS } from '../../../Util/Util'
import TimeEntryForm from './TimeEntryForm'

class DayList extends React.Component {
  constructor() {
    super()
    this.state = {
      open: false
      // timeEntryId: false
    }
  }

  componentWillUnmount() {
    if (this.timer) {
      clearInterval(this.timer)
    }
  }

  onCancel = () => {
    this.setState({ open: false })
  }

  onStartTimer = () => {
    const { entry, userInfo } = this.props
    startTimer({ id: entry.id, user: userInfo.id }).then((result) => {
      if (result) {
        const { userData, oldEntry, newEntry } = result
        const timeEntries = this.props.timeEntries.map((val) => {
          if (oldEntry && val.id === oldEntry.id) {
            return oldEntry
          }

          if (newEntry && val.id === newEntry.id) {
            return newEntry
          }

          return val
        })
        this.props.dispatch({ type: 'SET_TIME_DATA', payload: { timeEntries } })
        const userObj = {
          ...userInfo,
          timeEntryId: userData.timeEntryId,
          timeEntryStartsAt: userData.timeEntryStartsAt
        }
        this.props.dispatch({ type: 'SET_USER_REDUCER', payload: { userInfo: userObj } })
        this.props.dispatch({ type: 'SET_TIMER_COUNT', payload: newEntry })
      }
    })
  }

  onEndTimer = () => {
    const { entry, userInfo } = this.props
    endTimer({ id: entry.id, user: userInfo.id }).then((result) => {
      if (result) {
        const userData = { ...userInfo, timeEntryId: null, timeEntryStartsAt: null }
        const timeEntries = this.props.timeEntries.map((val) =>
          val.id === result.entry.id ? result.entry : val
        )
        this.props.dispatch({ type: 'SET_USER_REDUCER', payload: { userInfo: userData } })
        this.props.dispatch({ type: 'SET_TIMER_COUNT', payload: false })
        this.props.dispatch({ type: 'SET_TIME_DATA', payload: { timeEntries } })
      }
    })
  }

  render() {
    const { entry, userInfo } = this.props
    const clientName =
      entry.clientData && entry.clientData.name ? entry.clientData.name : this.props.companyInfo.name

    return (
      <div className="day-view-entry-list">
        <div className="day-view-entry">
          <Row gutter={[24]}>
            <Col
              xs={{ span: 24 }}
              sm={{ span: 24 }}
              md={{ span: 16 }}
              lg={{ span: 16 }}
              className="left-section">
              <div className="entry-info">
                <div className="project-client">
                  <span className="project">{entry.projectData && entry.projectData.name}</span>{' '}
                  <span className="client">({clientName})</span>
                </div>
                <div className="task-notes">
                  <span className="notes">
                    {entry.description ? (
                      <p>{entry.description}</p>
                    ) : (
                      <i style={{ color: 'gray' }}>No description</i>
                    )}
                  </span>
                </div>
              </div>
            </Col>
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 8 }}>
              <div className="entry-action-timer">
                {userInfo.timeEntryId === entry.id ? (
                  <div id="timer_count" className="entry-time">
                    {convertMinutesToHours(entry.totalMinutes)}
                  </div>
                ) : (
                  <div id="time" className="entry-time">
                    <ClockCircleOutlined /> {convertMinutesToHours(entry.totalMinutes)}
                  </div>
                )}
                {TIME_ENABLED_STATUS.indexOf(this.props.weekStatus) >= 0 && (
                  <div className="entry-button">
                    {userInfo.timeEntryId === entry.id ? (
                      <button type="button" className="pds-button pds-button-large" onClick={this.onEndTimer}>
                        <i className="flaticon-info" />
                        Stop
                      </button>
                    ) : (
                      moment().format('YYYY-MM-DD') === this.props.selectedDate && (
                        <button
                          type="button"
                          className="pds-button pds-button-large"
                          onClick={this.onStartTimer}>
                          <i className="flaticon-info" />
                          Start
                        </button>
                      )
                    )}
                  </div>
                )}
                {TIME_ENABLED_STATUS.indexOf(this.props.weekStatus) >= 0 && (
                  <div className="edit-button">
                    <button
                      type="button"
                      className="pds-button pds-button-small"
                      onClick={() => this.setState({ open: true })}>
                      <i className="flaticon-edit" />
                    </button>
                  </div>
                )}
              </div>
            </Col>
          </Row>
        </div>
        <ModalBox
          title={`Update for ${this.props.selectedDate}`}
          visible={this.state.open}
          footer={null}
          onCancel={() => this.onCancel()}
          destroyOnClose>
          <TimeEntryForm selectedEntry={entry} onCancel={this.onCancel} />
        </ModalBox>
      </div>
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
    selectedDate: state.times.selectedDate
  }
}

export default connect(mapStateToProps)(DayList)
