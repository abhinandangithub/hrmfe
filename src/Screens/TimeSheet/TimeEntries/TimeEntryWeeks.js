import moment from 'moment'
import React from 'react'
import { connect } from 'react-redux'
import timeManagemeentImg from '../../../assets/images/time-management.png'
import { convertMinutesToHours, TIME_ENABLED_STATUS } from '../../../Util/Util'
import WeekList from './WeekList'

class TimeEntryWeeks extends React.Component {
  constructor() {
    super()
    this.state = {
      // time: ''
    }
  }

  getWeeks = () => {
    const { startWeek, endWeek } = this.props
    const weeks = []

    for (let m = moment(startWeek); m.isBefore(moment(endWeek).endOf('day')); m.add(1, 'days')) {
      // let totalMinutes = 0
      // this.props.timeEntries.map((val) => {
      //   if (moment(val.date).format('DD-MMM-YYYY') === m.format('DD-MMM-YYYY')) {
      //     totalMinutes += parseInt(val.totalMinutes || 0)
      //   }
      // })
      weeks.push(m.format('YYYY-MM-DD'))
    }

    return weeks
  }

  getProjects = () => {
    const projectObj = {}
    const total = { label: 'total_week_minutes', projectTotalMinutes: 0 }
    this.props.timeEntries.forEach((val) => {
      const key = [moment(`${val.year}-${val.month}-${val.date}`).format('YYYY-MM-DD')]
      const minutes = parseInt(val.totalMinutes, 10)

      if (projectObj[val.project]) {
        if (projectObj[val.project][key]) {
          projectObj[val.project][key] += minutes
          projectObj[val.project][`${key}-${val.project}-id`] = false
        } else {
          projectObj[val.project][key] = minutes
          projectObj[val.project][`${key}-${val.project}-id`] = val.id
        }

        projectObj[val.project].projectTotalMinutes += minutes

        if (!projectObj[val.project][`${key}-${val.project}-timer`]) {
          projectObj[val.project][`${key}-${val.project}-timer`] = this.props.userInfo.timeEntryId === val.id
        }
      } else {
        projectObj[val.project] = {
          label: val.projectData.name,
          project: val.project,
          clientData: val.clientData,
          [key]: minutes,
          projectTotalMinutes: minutes,
          [`${key}-${val.project}-id`]: val.id,
          [`${key}-${val.project}-timer`]: this.props.userInfo.timeEntryId === val.id
        }
      }

      if (total[key]) {
        total[key] += minutes
      } else {
        total[key] = minutes
      }

      total.projectTotalMinutes += minutes
    })

    return { projects: Object.values(projectObj), footer: total }
  }

  render() {
    const weeks = this.getWeeks()
    const { projects, footer } = this.getProjects()

    return (
      <section className="week-timesheet">
        <table border="0" cellPadding="0" cellSpacing="0" className="week-view-table">
          <thead>
            <tr>
              <td className="name">
                <div>Project</div>
              </td>
              {weeks.map((day, i) => (
                <td key={i} className="day">
                  <a>
                    {moment(day).format('ddd')}
                    <span>{moment(day).format('DD MMM')}</span>
                  </a>
                </td>
              ))}
              <td className="total">
                <div />
              </td>
              <td className="delete">
                <div />
              </td>
            </tr>
          </thead>
          {projects.length === 0 ? (
            <tbody className="time-table">
              <tr>
                <td colSpan={weeks.length + 3} className="empty-timesheet no-data">
                  <img src={timeManagemeentImg} alt="" />
                  <h2>You’re ready to track time! Let’s get to work.</h2>
                </td>
              </tr>
            </tbody>
          ) : (
            <tbody>
              {projects.map((project, i) => (
                <WeekList key={i} projectData={project} weeks={weeks} weekStatus={this.props.weekStatus} />
              ))}
              <tr style={{ height: projects.length <= 4 ? 65 * (4 - projects.length) : 0 }} />
            </tbody>
          )}
          <tfoot>
            <tr>
              <td className="name">{/* <button className="pds-button">View timesheet details</button> */}</td>
              {weeks.map((day, i) => (
                <td key={i} className="day">
                  {convertMinutesToHours(footer[day] ? footer[day] : 0)}
                </td>
              ))}
              <td className="total">{convertMinutesToHours(footer.projectTotalMinutes || 0)}</td>
              <td className="delete">&nbsp;</td>
            </tr>
          </tfoot>
        </table>
        {TIME_ENABLED_STATUS.indexOf(this.props.weekStatus) >= 0 && projects.length > 0 && (
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
    startWeek: state.times.startWeek,
    endWeek: state.times.endWeek,
    timeEntries: state.times.timeEntries,
    selectedDate: state.times.selectedDate
  }
}

export default connect(mapStateToProps)(TimeEntryWeeks)
