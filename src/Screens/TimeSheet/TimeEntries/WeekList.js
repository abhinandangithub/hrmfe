import moment from 'moment'
import React from 'react'
import { connect } from 'react-redux'
import { addTimeEntry, updateTimeEntry } from '../../../Actions/UserAction'
import InputBox from '../../../Components/InputBox/InputBox'
import { convertMinutesToHours, getStartAndEndWeek, TIME_ENABLED_STATUS } from '../../../Util/Util'
import '../Week.scss'

class WeekList extends React.Component {
  constructor() {
    super()
    this.state = {
      sample: '',
      // sample_select: '',
      visible: false,
      isSubmit: false,
      type: '',
      loading: false
    }
  }

  onSelectDate = (selectedDate) => {
    this.props.dispatch({ type: 'SET_TIME_DATA', payload: { selectedDate } })
  }

  onChangeText = (value, type) => {
    this.setState({ [type]: value })
  }

  onBlurHours = (value, type, selectedDate) => {
    const timeData = value.replace(/[^0-9]/g, '')
    let totalMinutes = 0

    if (timeData.length === 0) {
      totalMinutes = 0
    } else if (timeData.length === 1) {
      totalMinutes = parseInt(timeData, 10) * 60
    } else if (timeData.length === 2) {
      totalMinutes = parseInt(timeData, 10) * 60
    } else if (timeData.length === 3) {
      const hours = timeData.slice(0, 1)
      const minutes = timeData.slice(1, 3)
      totalMinutes = parseInt(hours, 10) * 60 + parseInt(minutes, 10)
    } else {
      const hours = timeData.slice(0, 2)
      const minutes = timeData.slice(2, 4)
      totalMinutes = parseInt(hours, 10) * 60 + parseInt(minutes, 10)
    }

    const minutes = this.props.projectData[selectedDate]
    const entryId = this.props.projectData[`${selectedDate}-${this.props.projectData.project}-id`]

    if (totalMinutes >= 0 && minutes !== totalMinutes) {
      if (!minutes || parseInt(minutes, 10) < totalMinutes || entryId) {
        const min = entryId ? totalMinutes : totalMinutes - (minutes ? parseInt(minutes, 10) : 0)
        this.onSave(min, selectedDate, entryId)
        this.setState({ totalMinutes, [type]: convertMinutesToHours(totalMinutes) })
      } else if (parseInt(minutes, 10) > totalMinutes) {
        this.setState({ totalMinutes: minutes, [type]: convertMinutesToHours(minutes) })
      }
    }
  }

  onSave = (totalMinutes, curDate, entryId) => {
    const { project } = this.props.projectData
    const description = ''
    const selectedDate = moment(curDate)

    if (selectedDate !== '' && totalMinutes !== '') {
      if (entryId) {
        updateTimeEntry(entryId, { totalMinutes }).then((timeEntry) => {
          if (timeEntry) {
            const timeEntries = this.props.timeEntries.map((val) =>
              val.id === timeEntry.id ? timeEntry : val
            )
            this.props.dispatch({
              type: 'SET_TIME_DATA',
              payload: { timeEntries, selectedDate: selectedDate.format('DD-MMM-YYYY') }
            })
            // message.success('Time entry updated')
          }
        })
      } else {
        const selectedProject = this.props.projects.find((pro) => pro.id === project)
        const client = selectedProject ? selectedProject.client : null
        const { startWeekDate, endWeekDate } = getStartAndEndWeek(selectedDate)
        const date = moment(selectedDate).format('D')
        const month = moment(selectedDate).format('M')
        const year = moment(selectedDate).format('YYYY')
        const billable = selectedProject ? selectedProject.billable : 'No'
        const timeObj = {
          date,
          month,
          year,
          startWeekDate,
          endWeekDate,
          project,
          description,
          totalMinutes,
          status: 'Created',
          user: this.props.userInfo.id,
          client,
          billable,
          company: this.props.companyInfo.id
        }
        addTimeEntry(timeObj).then((timeEntry) => {
          if (timeEntry) {
            const timeEntries = [timeEntry, ...this.props.timeEntries]
            this.props.dispatch({
              type: 'SET_TIME_DATA',
              payload: { timeEntries, selectedDate: selectedDate.format('DD-MMM-YYYY') }
            })
            // message.success('Time entry updated')
          }
        })
      }
    } else {
      this.setState({ isSubmit: true })
    }
  }

  render() {
    const { projectData, weeks } = this.props
    const clientName =
      projectData.clientData && projectData.clientData.name
        ? projectData.clientData.name
        : this.props.companyInfo.name

    return (
      <tr className="week-view-entry">
        <td className="name">
          <div className="project-client">
            <span className="project">{projectData.label}</span>
            <span className="client">({clientName})</span>
          </div>
          <div className="task">
            <i style={{ color: 'gray' }}>No description</i>
          </div>
        </td>
        {weeks.map((day, i) => (
          <td
            key={i}
            id={
              this.props.projectData[`${day}-${this.props.projectData.project}-timer`]
                ? 'timer_count'
                : 'time'
            }
            className="day">
            {TIME_ENABLED_STATUS.indexOf(this.props.weekStatus) >= 0 ? (
              <InputBox
                id={`${day}-${projectData.project}`}
                value={
                  this.state[`${day}-${projectData.project}`] ||
                  (projectData[day] ? convertMinutesToHours(projectData[day]) : '')
                }
                onChangeText={this.onChangeText}
                onBlur={(value, type) => this.onBlurHours(value, type, day)}
                disabled={
                  this.props.companyInfo?.configurations?.timeEntryFutureDate === 'Yes'
                    ? false
                    : moment() <= moment(day)
                }
              />
            ) : (
              convertMinutesToHours(projectData[day])
            )}
          </td>
        ))}
        <td className="total">{convertMinutesToHours(projectData.projectTotalMinutes)}</td>
        <td className="delete js-end-of-week-row " />
      </tr>
    )
  }
}

function mapStateToProps(state) {
  return {
    userInfo: state.users.userInfo,
    companyInfo: state.users.companyInfo,
    timeEntries: state.times.timeEntries,
    selectedDate: state.times.selectedDate,
    projects: state.users.projects
  }
}

export default connect(mapStateToProps)(WeekList)
