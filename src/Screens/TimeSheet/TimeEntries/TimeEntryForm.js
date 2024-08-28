import { Col, message, Row } from 'antd'
import moment from 'moment'
import React from 'react'
import { connect } from 'react-redux'
import { addTimeEntry, deleteTimeEntry, updateTimeEntry } from '../../../Actions/UserAction'
import ConfirmationButtonBox from '../../../Components/ButtonBox/ConfirmationButtonBox'
import InputBox from '../../../Components/InputBox/InputBox'
import ModalBoxFooter from '../../../Components/ModalBox/ModalBoxFooter'
import SelectBox from '../../../Components/SelectBox/SelectBox'
import apiClient from '../../../Util/apiClient'
import { convertMinutesToHours, getStartAndEndWeek } from '../../../Util/Util'

class TimeEntryForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isSubmit: false,

      project: props.selectedEntry ? props.selectedEntry.project : '',
      description: props.selectedEntry ? props.selectedEntry.description : '',
      totalMinutes: props.selectedEntry ? props.selectedEntry.totalMinutes : 0,
      totalHours: props.selectedEntry ? convertMinutesToHours(props.selectedEntry.totalMinutes) : '00:00',

      projects: []
    }
  }

  componentDidMount() {
    const date = moment(this.props.selectedDate).format('YYYY-MM-DD')
    apiClient.get('projects/get-projects-by-user', { params: { date } }).then(({ data }) => {
      if (data && data.result) {
        const projects = data.result.map((val) => {
          const { projectData } = val
          projectData.label = val.projectData.name
          projectData.value = val.projectData.id

          return projectData
        })
        this.setState({ projects })
      }
    })
  }

  onChangeText = (value, type) => {
    this.setState({ [type]: value })
  }

  onBlurHours = (value) => {
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

    this.setState({ totalMinutes, totalHours: convertMinutesToHours(totalMinutes) })
  }

  onSave = () => {
    const { project, totalMinutes, description } = this.state
    const selectedDate = moment(this.props.selectedDate)
    const validateFields = ['project', 'totalMinutes']
    let flag = true
    validateFields.map((data) => {
      if (this[data] && this[data].error) {
        flag = false
      }

      return true
    })

    if (flag && selectedDate !== '' && totalMinutes !== '') {
      if (this.props.selectedEntry) {
        const timeObj = { totalMinutes, description }
        updateTimeEntry(this.props.selectedEntry.id, timeObj).then((timeEntry) => {
          if (timeEntry) {
            const timeEntries = this.props.timeEntries.map((val) =>
              val.id === timeEntry.id ? timeEntry : val
            )
            this.props.dispatch({ type: 'SET_TIME_DATA', payload: { timeEntries } })
            this.props.onCancel()
            message.success('Time entry updated')
          }
        })
      } else {
        const { startWeekDate, endWeekDate } = getStartAndEndWeek(selectedDate)
        const selectedProject = this.state.projects.find((pro) => pro.id === project)
        const client = selectedProject ? selectedProject.client : null
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
          company: this.props.companyInfo.id,
          timer: moment().format('YYYY-MM-DD') === this.props.selectedDate ? !(totalMinutes > 0) : false
        }
        addTimeEntry(timeObj).then((result) => {
          if (result) {
            const { userData, oldEntry, newEntry } = result

            if (userData) {
              const timeData = this.props.timeEntries.map((val) => {
                if (oldEntry && val.id === oldEntry.id) {
                  return oldEntry
                }

                return val
              })
              const timeEntries = [newEntry, ...timeData]
              this.props.dispatch({ type: 'SET_TIME_DATA', payload: { timeEntries } })
              const userInfo = {
                ...this.props.userInfo,
                timeEntryId: userData.timeEntryId,
                timeEntryStartsAt: userData.timeEntryStartsAt
              }
              this.props.dispatch({ type: 'SET_USER_REDUCER', payload: { userInfo } })
              this.props.dispatch({ type: 'SET_TIMER_COUNT', payload: newEntry })
            } else {
              const timeEntries = [result, ...this.props.timeEntries]
              this.props.dispatch({ type: 'SET_TIME_DATA', payload: { timeEntries } })
            }

            this.props.onCancel()
            message.success('Time entry added')
          }
        })
      }
    } else {
      this.setState({ isSubmit: true })
    }
  }

  onDelete = () => {
    deleteTimeEntry(this.props.selectedEntry.id).then((timeEntry) => {
      if (timeEntry) {
        const timeEntries = this.props.timeEntries.filter((val) => val.id !== this.props.selectedEntry.id)
        this.props.dispatch({ type: 'SET_TIME_DATA', payload: { timeEntries } })
        this.props.onCancel()
        message.success('Time entry deleted')
      }
    })
  }

  render() {
    const { selectedEntry } = this.props

    return (
      <Row className="add-proj-timesheet">
        {!selectedEntry && (
          <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 24 }}>
            <div className="form-fields">
              <SelectBox
                refs={(ref) => (this.project = ref)}
                label="Project"
                value={this.state.project}
                id="project"
                options={this.state.projects}
                onChangeText={this.onChangeText}
                isSubmit={this.state.isSubmit}
              />
            </div>
          </Col>
        )}
        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 24 }}>
          <div className="form-fields">
            <InputBox
              label="Description"
              value={this.state.description}
              id="description"
              onChangeText={this.onChangeText}
              textArea
              isSubmit={this.state.isSubmit}
              optional
            />
          </div>
        </Col>
        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 24 }}>
          <div className="form-fields">
            <InputBox
              refs={(ref) => (this.totalMinutes = ref)}
              label="Time"
              value={this.state.totalHours}
              id="totalHours"
              onChangeText={this.onChangeText}
              onBlur={this.onBlurHours}
              isSubmit={this.state.isSubmit}
            />
          </div>
        </Col>
        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 24 }}>
          {selectedEntry && (
            <div style={{ position: 'absolute', top: 20 }}>
              <ConfirmationButtonBox
                title="Are you sure! Do you want to delete?"
                placement="topLeft"
                type="secondary"
                onConfirm={this.onDelete}>
                Delete
              </ConfirmationButtonBox>
            </div>
          )}
          <ModalBoxFooter
            loader={this.state.buttonLoader}
            okText={
              selectedEntry
                ? 'Update'
                : moment().format('YYYY-MM-DD') === this.props.selectedDate &&
                  this.state.totalHours === '00:00'
                ? 'Start Timer'
                : 'Add'
            }
            onOk={this.onSave}
            onCancel={() => this.props.onCancel()}
          />
        </Col>
      </Row>
    )
  }
}

function mapStateToProps(state) {
  return {
    userInfo: state.users.userInfo,
    companyInfo: state.users.companyInfo,
    selectedDate: state.times.selectedDate,
    timeEntries: state.times.timeEntries
  }
}

export default connect(mapStateToProps)(TimeEntryForm)
