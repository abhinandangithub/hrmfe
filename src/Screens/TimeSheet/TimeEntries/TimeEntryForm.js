import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import { Button, Col, Collapse, Form, message, Row, Space, TimePicker } from 'antd'
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
    console.log('props', props)
    super(props)
    this.state = {
      isSubmit: false,

      project: props.selectedEntry ? props.selectedEntry.project : '',
      description: props.selectedEntry ? props.selectedEntry.description : '',
      totalMinutes: props.selectedEntry ? props.selectedEntry.totalMinutes : 0,
      totalHours: props.selectedEntry ? convertMinutesToHours(props.selectedEntry.totalMinutes) : '00:00',
      totalHourInpRad1: props.selectedEntry
        ? convertMinutesToHours(props.selectedEntry.totalMinutes)
        : '00:00',
      dynamicFields: [
        {
          fromHour: '00:00',
          toHour: '00:00',
          totalHoursPerField: '00:00'
        }
      ],
      totalArrayHours: '00:00',
      type: '1',

      projects: []
    }
  }

  componentDidMount() {
    console.log('ssss', this.props.selectedEntry)
    if (this.props.selectedEntry && this.props.selectedEntry.type === '2') {
      this.setState({ type: '2', dynamicFields: this.props.selectedEntry.hourEntry })
    }
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

  // Accordion
  // onChange = (key) => {
  //   console.log(key)
  //   this.setState({
  //     totalHours: '00:00',
  //     totalMinutes: 0,
  //     totalHourInpRad1: '00:00',
  //     type: key
  //   })
  // }

  // dynamic  form field antd

  onFinish = () => {
    const { dynamicFields } = this.state
    let totHourFromArr = 0
    const timeEntries = dynamicFields.map((field) => ({
      fromHour: field.fromHour,
      toHour: field.toHour,
      totalHoursPerField: field.totalHoursPerField
    }))
    dynamicFields.forEach((field) => {
      const [hours, minutes] = field.totalHoursPerField.split(':').map(Number)
      totHourFromArr += hours * 60 + minutes
    })
    const totalHourArrayValue = convertMinutesToHours(totHourFromArr)
    this.setState({
      totalArrayHours: totalHourArrayValue,
      totalHours: totalHourArrayValue,
      totalMinutes: totHourFromArr
    })
    console.log('Hour Entries:', timeEntries, totalHourArrayValue, this.state.totalArrayHours)
  }

  handleDynamicFieldChange = (index, key, value, timeString) => {
    // console.log(index, key, 'sdasdas', value, timeString)
    const time24h = moment(timeString, ['h:mm A']).format('HH:mm')
    // console.log(time24h)
    const dynamicFields = [...this.state.dynamicFields]
    dynamicFields[index][key] = time24h

    if (key === 'fromHour' || key === 'toHour') {
      const totalMinutes = this.calculateTotalMinutes(
        dynamicFields[index].fromHour,
        dynamicFields[index].toHour
      )
      dynamicFields[index].totalHoursPerField = convertMinutesToHours(totalMinutes)
    }

    this.onFinish()
    this.setState({ dynamicFields })
  }

  calculateTotalMinutes = (fromTime, toTime) => {
    const [fromHours, fromMinutes] = fromTime.split(':').map(Number)
    const [toHours, toMinutes] = toTime.split(':').map(Number)
    return toHours * 60 + toMinutes - (fromHours * 60 + fromMinutes)
  }

  addDynamicField = () => {
    this.setState((prevState) => ({
      dynamicFields: [
        ...prevState.dynamicFields,
        { fromHour: '00:00', toHour: '00:00', totalHoursPerField: '00:00' }
      ],
      totalHours: '00:00'
    }))
  }

  removeDynamicField = (index) => {
    const dynamicFields = [...this.state.dynamicFields]
    dynamicFields.splice(index, 1)
    this.setState({ dynamicFields, totalHours: '00:00' })
  }

  // total hours selected
  // calculateTotalHours = () => {
  //   const { fromHours1, toHours1, fromHours2, toHours2 } = this.state
  //   console.log('fromHours1', fromHours1, 'toHours', toHours1, 'fromHours2', fromHours2, 'toHours2', toHours2)
  //   const calculateMinutes = (fromTime, toTime) => {
  //     const [fromHours, fromMinutes] = fromTime.split(':').map(Number)
  //     const [toHours, toMinutes] = toTime.split(':').map(Number)
  //     return toHours * 60 + toMinutes - (fromHours * 60 + fromMinutes)
  //   }
  //   const total1Minutes = calculateMinutes(fromHours1, toHours1)
  //   console.log('total1Minutes', total1Minutes)
  //   this.setState({
  //     total1Hours: convertMinutesToHours(total1Minutes)
  //   })
  // }

  onChangeText = (value, type) => {
    console.log('type', type, 'value', value)
    this.setState({ [type]: value })
  }

  handleTimeChange = (value) => {
    const [hours, minutes] = value.split(':').map(Number)
    const totalMinutes = hours * 60 + minutes
    this.setState({ totalMinutes, totalHours: value, totalHourInpRad1: value })
  }

  changevalue = () => {
    const { totalHourInpRad1 } = this.state
    const [hours, minutes] = totalHourInpRad1.split(':').map(Number)
    const totalMins = hours * 60 + minutes
    this.setState({ totalMinutes: totalMins })
    // this.setState({ totalMinutes, totalHours: value, totalHourInpRad1: value })
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

    this.setState({
      totalMinutes,
      totalHours: convertMinutesToHours(totalMinutes),
      totalHourInpRad1: convertMinutesToHours(totalMinutes)
    })
  }

  onSave = () => {
    const { project, totalMinutes, description, type, dynamicFields } = this.state
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
      console.log('props', this.props)
      console.log('state', this.state)
      if (this.props.selectedEntry) {
        if (this.state.type === '2') {
          const timeObj = { totalMinutes, description, type, hourEntry: dynamicFields }
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
        }
        const timeObj = { totalMinutes, description, type }
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
        // const timeObj = {
        //   date,
        //   month,
        //   year,
        //   startWeekDate,
        //   endWeekDate,
        //   project,
        //   description,
        //   totalMinutes,
        //   status: 'Created',
        //   user: this.props.userInfo.id,
        //   client,
        //   billable,
        //   company: this.props.companyInfo.id,
        //   timer: moment().format('YYYY-MM-DD') === this.props.selectedDate ? !(totalMinutes > 0) : false
        // }
        console.log(this.state.totalArrayHours, this.state.dynamicFields, this.state.type)
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
          timer: moment().format('YYYY-MM-DD') === this.props.selectedDate ? !(totalMinutes > 0) : false,
          type: this.state.type,
          hourEntry: this.state.dynamicFields
        }
        console.log('timeObj', timeObj)

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
    const { Panel } = Collapse

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
        {/* <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 24 }}>
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
        </Col> */}

        {/* <div className="mb-2 font-weight-bold">Total Hours Accord</div> */}
        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 24 }}>
          <div className="d-flex">
            <div className="form-fields d-flex align-items-center mr-5">
              <InputBox
                // label="Total Hours"
                value="1"
                name="type"
                type="radio"
                id="hour"
                checked={this.state.type === '1'}
                onChangeText={() => this.onChangeText('1', 'type')}
                isSubmit={this.state.isSubmit}
              />
              <label htmlFor="hour" className="ml-2">
                Total Hours
              </label>
            </div>
            <div className="form-fields d-flex align-items-center">
              <InputBox
                // label="Hour Entry"
                id="hourEntry"
                type="radio"
                value="2"
                name="type"
                // checked={selectedEntry.type === '2' ? selectedEntry.type === '2' : this.state.type === '2'}
                checked={
                  (selectedEntry && selectedEntry.type === '2') || (this.state && this.state.type === '2')
                }
                onChangeText={() => this.onChangeText('2', 'type')}
                isSubmit={this.state.isSubmit}
              />
              <label htmlFor="hourEntry" className="ml-2">
                Hours Entry
              </label>
            </div>
          </div>
        </Col>
        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 24 }}>
          <div>
            <Collapse defaultActiveKey={['1']}>
              <Panel header={`${this.state.type === '1' ? 'Total Hours' : 'Hour Entry'}`} key="1">
                {this.state.type === '1' ? (
                  <InputBox
                    refs={(ref) => (this.totalMinutes = ref)}
                    label="Total Hours"
                    value={this.state.totalHourInpRad1}
                    id="totalHours"
                    onChangeText={this.handleTimeChange}
                    onBlur={this.onBlurHours}
                    isSubmit={this.state.isSubmit}
                  />
                ) : (
                  <Form name="dynamic_form_nest_item" autoComplete="off">
                    {this.state.dynamicFields.map((field, index) => (
                      <Space
                        key={index}
                        style={{ display: 'flex', marginBottom: 8, alignItems: 'center', flexWrap: 'wrap' }}
                        align="baseline">
                        <div style={{ width: '170px' }}>
                          <label className="custom-label">From</label>
                          <TimePicker
                            id="totalHours"
                            use12Hours
                            format="h:mm a"
                            value={field.fromHour ? moment(field.fromHour, 'HH:mm') : null}
                            onChange={(time, timeString) =>
                              this.handleDynamicFieldChange(index, 'fromHour', time, timeString)
                            }
                          />
                          {/* <InputBox
                      className="totalHourStyle"
                      label="From Time"
                      type="time"
                      value={field.fromHour}
                      onChangeText={(value) => this.handleDynamicFieldChange(index, 'fromHour', value)}
                      isSubmit={this.state.isSubmit}
                    /> */}
                        </div>
                        <div style={{ width: '170px' }}>
                          <label className="custom-label">To</label> {/* Custom label */}
                          <TimePicker
                            id="totalHours"
                            use12Hours
                            format="h:mm a"
                            value={field.toHour ? moment(field.toHour, 'HH:mm') : null}
                            onChange={(time, timeString) =>
                              this.handleDynamicFieldChange(index, 'toHour', time, timeString)
                            }
                          />
                          {/* <InputBox
                      className="totalHourStyle"
                      label="To Time"
                      type="time"
                      value={field.toHour}
                      onChangeText={(value) => this.handleDynamicFieldChange(index, 'toHour', value)}
                      isSubmit={this.state.isSubmit}
                    /> */}
                        </div>
                        <div style={{ width: '130px' }}>
                          <InputBox
                            // className="totalHourStyle"
                            id="totalHoursStyle"
                            value={field.totalHoursPerField}
                            label="Hours"
                            readOnly
                          />
                        </div>
                        <MinusCircleOutlined
                          onClick={() => this.removeDynamicField(index)}
                          className="text-danger mt-4"
                        />
                      </Space>
                    ))}
                    <div className="d-flex justify-content-end align-items-center">
                      <div className="text-nowrap font-weight-bold mr-3">Total Hours</div>
                      <div style={{ width: '130px', marginRight: '32px' }}>
                        <InputBox
                          className="totalHourStyle"
                          value={this.state.totalHours}
                          id="totalHoursStyle"
                          // label="Hours"
                        />
                      </div>
                    </div>
                    <Form.Item className="mb-2 mt-3">
                      <Button type="success" onClick={this.addDynamicField} block icon={<PlusOutlined />}>
                        Add field
                      </Button>
                    </Form.Item>
                    {/* <Form.Item className="mb-2">
                      <Button
                        className="w-100"
                        // style={{ marginTop: '0' }}
                        type="primary"
                        onClick={this.onFinish}
                        block>
                        Calculate Total Hours
                      </Button>
                    </Form.Item> */}
                  </Form>
                )}
              </Panel>
              {/* <Panel header="Hour Entry" key="2">
               
              </Panel> */}
            </Collapse>
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
