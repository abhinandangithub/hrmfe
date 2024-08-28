import { ClockCircleOutlined } from '@ant-design/icons'
import moment from 'moment'
import React from 'react'
import { connect } from 'react-redux'
import timeManagemeentImg from '../../../assets/images/time-management.png'
import { convertMinutesToHours, TIME_ENABLED_STATUS } from '../../../Util/Util'
import DayList from './DayList'

class TimeEntryDays extends React.Component {
  constructor() {
    super()
    this.state = {}
  }

  getWeeks = () => {
    const { startWeek, endWeek, timeEntries } = this.props
    const weeks = []

    for (let m = moment(startWeek); m.isBefore(endWeek); m.add(1, 'days')) {
      let totalMinutes = 0
      timeEntries.forEach((val) => {
        if (moment(`${val.year}-${val.month}-${val.date}`).format('YYYY-MM-DD') === m.format('YYYY-MM-DD')) {
          totalMinutes += parseInt(val.totalMinutes || 0, 10)
        }
      })
      weeks.push({ label: m.format('YYYY-MM-DD'), date: m, totalMinutes })
    }

    return weeks
  }

  onSelectDate = (selectedDate) => {
    if (
      this.props.companyInfo?.configurations?.timeEntryFutureDate === 'Yes' ||
      moment(selectedDate) <= moment()
    ) {
      this.props.dispatch({ type: 'SET_TIME_DATA', payload: { selectedDate } })
    }
  }

  getDayEntries = () => {
    const dayTimeEntries = []
    let totalMinutes = 0
    let totalHours = 0
    this.props.timeEntries.forEach((val) => {
      if (moment(`${val.year}-${val.month}-${val.date}`).format('YYYY-MM-DD') === this.props.selectedDate) {
        dayTimeEntries.push(val)
        totalMinutes += parseInt(val.totalMinutes || 0, 10)
      }

      totalHours += parseInt(val.totalMinutes || 0, 10)
    })

    return { dayTimeEntries, totalMinutes, totalHours }
  }

  render() {
    const { dayTimeEntries, totalMinutes, totalHours } = this.getDayEntries()

    return (
      <section className="time-table">
        <div className="day-view-week-nav">
          <table>
            <tr>
              {this.getWeeks().map((val, i) => (
                <td key={i} onClick={() => this.onSelectDate(val.label)}>
                  <a
                    className="pds-button"
                    style={{
                      borderBottom: this.props.selectedDate === val.label ? '2px solid #ff9800' : '0px'
                    }}>
                    <div className="time-day-label"> {moment(val.label).format('DD-MMM-YYYY')}</div>
                    <div className="time-day-total">
                      {convertMinutesToHours(val.totalMinutes)} ({moment(val.label).format('ddd')})
                    </div>
                  </a>
                </td>
              ))}
              <td>
                <div id="day-view-week-nav-total">
                  Total: <strong className="test-week-total">{convertMinutesToHours(totalHours)}</strong>
                </div>
              </td>
            </tr>
          </table>
        </div>

        <div>
          {dayTimeEntries.length === 0 ? (
            <section className="time-table">
              {TIME_ENABLED_STATUS.indexOf(this.props.weekStatus) >= 0 && (
                <div className="empty-timesheet no-data">
                  <img src={timeManagemeentImg} alt="" />
                  <h2>You’re ready to track time! Let’s get to work.</h2>
                </div>
              )}
            </section>
          ) : (
            <section className="time-table">
              {dayTimeEntries.map((entry, i) => (
                <DayList key={i} entry={entry} weekStatus={this.props.weekStatus} />
              ))}

              <div className="day-view-summary">
                <div
                  className="day-view-total"
                  style={{
                    paddingRight: TIME_ENABLED_STATUS.indexOf(this.props.weekStatus) >= 0 ? 166 : 26
                  }}>
                  Total:{' '}
                  <span>
                    <ClockCircleOutlined /> {convertMinutesToHours(totalMinutes)}
                  </span>
                </div>
              </div>
            </section>
          )}
        </div>

        {TIME_ENABLED_STATUS.indexOf(this.props.weekStatus) >= 0 && dayTimeEntries.length > 0 && (
          <div className="day-view-timesheet-submission">
            <button
              type="button"
              className="pds-button pds-button-large"
              onClick={this.props.onSubmitTimeEntries}>
              Submit Week for Approval
            </button>
          </div>
        )}
      </section>
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

export default connect(mapStateToProps)(TimeEntryDays)
