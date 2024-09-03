import { ArrowLeftOutlined } from '@ant-design/icons'
import { Col, message, Row, TimePicker } from 'antd'
import { withFormik } from 'formik'
import moment from 'moment'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import Button from '../../../Components/Button'
import { Field, Form, TimePicker as CustomTimePicker } from '../../../Components/Formik'
import Panel from '../../../Layout/Panel'
import PanelLayout from '../../../Layout/PanelLayout'
import apiClient from '../../../Util/apiClient'
import { DAYS_OPTIONS, SHIFT_OPTIONS } from '../../../Util/Options'

function WorkScheduleForm({
  match: {
    params: { id }
  },
  history
  //   values,
  //   setValues
}) {
  const { t } = useTranslation()
  const [selectedShiftOption, setSelectedShiftOption] = useState('')
  const [workScheduleId, setWorkScheduleId] = useState('')
  const [selectedDays, setSelectedDays] = useState([])
  const [scheduleWorkingHours, setScheduleWorkingHours] = useState([
    {
      type: 'shift - 1',
      from: '00:00',
      to: '00:00'
    }
  ])
  const [breakTime, setBreakTime] = useState()
  const [scheduleName, setScheduleName] = useState('')

  useEffect(() => {
    if (id) {
      getDataById()
    }
  }, [id])

  const getDataById = () => {
    console.log('id', id)
    if (id) {
      apiClient.get(`work-schedules/get/${id}`).then(({ data }) => {
        if (data && data.result) {
          const workScheduleData = data.result
          setWorkScheduleId(workScheduleData.scheduleId)
          setSelectedDays(workScheduleData.daysOfWorks)
          setScheduleName(workScheduleData.name)
          setBreakTime(moment(workScheduleData.interval, 'mm a'))
          setSelectedShiftOption(workScheduleData.shift)
          const workingHoursData = workScheduleData.workingHours.map((el) => ({
            type: el.type,
            from: moment(el.from, 'HH:mm a'),
            to: moment(el.to, 'HH:mm a')
          }))
          setScheduleWorkingHours(workingHoursData)
        }
      })
    }
  }

  // useEffect(() => {
  //   if (!id) {
  //     setSelectedShiftOption(SHIFT_OPTIONS[0].label)
  //   }
  // }, [])

  // useEffect(() => {
  //   if (selectedShiftOption) {
  //     if (scheduleWorkingHours?.length === 0) {
  //       if (selectedShiftOption === 'One Shift') {
  //         setScheduleWorkingHours([{ type: 'shift - 1', from: '00:00', to: '00:00' }])
  //       } else if (selectedShiftOption === 'Two Shift') {
  //         setScheduleWorkingHours([
  //           { type: 'shift - 1', from: '00:00', to: '00:00' },
  //           { type: 'shift - 2', from: '00:00', to: '00:00' }
  //         ])
  //       } else if (selectedShiftOption === 'Three Shift') {
  //         setScheduleWorkingHours([
  //           { type: 'shift - 1', from: '00:00', to: '00:00' },
  //           { type: 'shift - 2', from: '00:00', to: '00:00' },
  //           { type: 'shift - 3', from: '00:00', to: '00:00' }
  //         ])
  //       } else {
  //         setScheduleWorkingHours([{ type: 'shift', from: '00:00', to: '00:00' }])
  //       }
  //     }
  //   }
  // }, [selectedShiftOption])

  const handleWorkingHoursChange = (index, key, timeString) => {
    const time24h = moment(timeString, ['hh:mm a']).format('hh:mm a')
    const scheduleWorkingHoursArray = [...scheduleWorkingHours]
    scheduleWorkingHours[index][key] = time24h
    setScheduleWorkingHours(scheduleWorkingHoursArray)
  }

  useEffect(() => {
    if (!id) {
      setSelectedShiftOption(SHIFT_OPTIONS[0].label)
    } else {
      apiClient.get('work-schedules/lastCreated').then(({ data }) => {
        if (data?.result) {
          console.log('shift option', data.result.shift)
          setSelectedShiftOption(data.result.shift)
        }
      })
    }
  }, [])

  useEffect(() => {
    if (!id) {
      apiClient.get('work-schedules/lastCreated').then(({ data }) => {
        if (data?.result) {
          const count = Number(data.result.scheduleId) + 1
          console.log('count', count, data.result)
          setWorkScheduleId(String(count).padStart(4, '0'))
        } else {
          setWorkScheduleId('0001')
        }
      })
    }
  }, [])

  const handleShiftOptions = (option) => {
    console.log(option)
    setSelectedShiftOption(option)
    if (option === 'One Shift') {
      setScheduleWorkingHours([{ type: 'shift - 1', from: '00:00', to: '00:00' }])
    } else if (option === 'Two Shift') {
      setScheduleWorkingHours([
        { type: 'shift - 1', from: '00:00', to: '00:00' },
        { type: 'shift - 2', from: '00:00', to: '00:00' }
      ])
    } else if (option === 'Three Shift') {
      setScheduleWorkingHours([
        { type: 'shift - 1', from: '00:00', to: '00:00' },
        { type: 'shift - 2', from: '00:00', to: '00:00' },
        { type: 'shift - 3', from: '00:00', to: '00:00' }
      ])
    } else {
      setScheduleWorkingHours([{ type: 'shift', from: '00:00', to: '00:00' }])
    }
    // setSelectedShiftOption(option)
  }

  const onSave = () => {
    if (id) {
      const data = {
        name: scheduleName,
        interval: moment(breakTime, 'hh:mm').minutes(),
        shift: selectedShiftOption,
        daysOfWorks: selectedDays.filter((item) => item),
        workingHours: scheduleWorkingHours.map((el) => ({
          type: el.type,
          from: moment(el.from, ['hh:mm a']).format('hh:mm a'),
          to: moment(el.to, ['hh:mm a']).format('hh:mm a')
        }))
      }
      apiClient.put(`work-schedules/update/${id}`, data).then(({ data }) => {
        if (data && data.result) {
          message.success('Work Schedules Updated')
          history('/app/work-schedules')
        }
      })
    } else {
      const data = {
        scheduleId: workScheduleId,
        name: scheduleName,
        interval: moment(breakTime, 'hh:mm').minutes(),
        shift: selectedShiftOption,
        daysOfWorks: selectedDays.filter((item) => item),
        workingHours: scheduleWorkingHours
      }

      apiClient
        .post('work-schedules/add', data)
        .then(({ data }) => {
          if (data && data.result) {
            history('/app/work-schedules')
          }
        })
        .catch((err) => {
          console.log('err', err)
          message.error('Unable to Create Work Schedule')
        })
    }
  }

  return (
    <Form>
      <Row justify="center" className="inner-contents">
        <Col xs={{ span: 22 }} sm={{ span: 22 }} md={{ span: 20 }} lg={{ span: 20 }}>
          <PanelLayout title={t('Work Schedule Details')}>
            <Panel title={t('Work Schedule')}>
              <Row justify="left" gutter={(12, 10)} className="mb-3">
                <Col xs={24} sm={24} md={8} lg={8}>
                  <div className="form-field">
                    <Field name="scheduleId" label="Schedule Id" value={workScheduleId} disable />
                  </div>
                </Col>
                <Col xs={24} sm={24} md={8} lg={8}>
                  <div className="form-field">
                    <Field
                      name="name"
                      label="Schedule Name"
                      as="input"
                      value={scheduleName}
                      onChange={(e, value) => {
                        setScheduleName(value)
                      }}
                    />
                  </div>
                </Col>
                <Col xs={24} sm={24} md={8} lg={8}>
                  <div className="form-field">
                    <Field
                      label="Shift"
                      name="shift"
                      as="select"
                      options={SHIFT_OPTIONS}
                      defaultValue={SHIFT_OPTIONS[0].label}
                      onSelect={(option) => {
                        // setScheduleWorkingHours([])
                        // setSelectedShiftOption(option)
                        handleShiftOptions(option)
                      }}
                      // value={id ? selectedShiftOption : SHIFT_OPTIONS[0].label}
                      value={id && selectedShiftOption}
                    />
                  </div>
                </Col>
              </Row>

              <Row className="mb-5">
                <Col xs={24} lg={8}>
                  {/* <div className="mb-3" style={{ fontWeight: 'bold', fontSize: '11.5px' }}>
                    Break Time
                  </div> */}
                  <div className="d-flex">
                    <div>
                      <label htmlFor="breakTime" className="font-weight-bold mb-2">
                        Break Time
                      </label>
                      <CustomTimePicker
                        style={{ marginTop: '10px' }}
                        // label="Break Time"
                        id="breakTime"
                        value={breakTime}
                        onChange={(time, val) => {
                          setBreakTime(val)
                        }}
                      />
                    </div>
                    <div className="form-field mt-4 ml-2" style={{ fontWeight: 'bold', fontSize: '11.5px' }}>
                      mins
                    </div>
                  </div>
                </Col>

                {DAYS_OPTIONS.map((day, i) => (
                  <Col xs={12} sm={12} md={12} lg={2} key={i}>
                    {i === 0 ? (
                      <label htmlFor="breakTime" className="font-weight-bold ">
                        Day of Work
                      </label>
                    ) : (
                      <div className="font-weight-bold " style={{ visibility: 'hidden' }}>
                        AT
                      </div>
                    )}
                    <div className="form-field">
                      <Field
                        as="checkbox"
                        name={day.value}
                        label={day.label}
                        value={selectedDays.includes(day.value)}
                        onChange={() => {
                          const selectedDay = selectedDays?.includes(day.value)
                          let weeks = []

                          if (selectedDay) {
                            weeks = selectedDays?.filter((d) => d !== day.value)
                          } else {
                            weeks = [...selectedDays, day.value]
                          }
                          console.log('weeks', weeks)
                          return setSelectedDays(weeks)
                        }}
                      />
                    </div>
                  </Col>
                ))}
              </Row>
            </Panel>

            <Panel title={t('Working Hours')}>
              <Row justify="space-between" gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} className="mb-3">
                {scheduleWorkingHours.map((field, index) => (
                  <Col className="gutter-row my-3" span={12} key={index}>
                    <div className="mt-0 d-flex  " key={index}>
                      <div className="mr-3 mt-4">
                        <label className="custom-label text-capitalize">{field.type}</label>
                      </div>
                      <div>
                        <div className="mr-3" style={{ width: '200px' }}>
                          <label className="custom-label">From</label>
                          <TimePicker
                            id="totalHours"
                            use12Hours
                            format="h:mm a"
                            value={field.from ? moment(field.from, 'HH:mm A') : null}
                            onChange={(time, timeString) =>
                              handleWorkingHoursChange(index, 'from', time, timeString)
                            }
                          />
                        </div>
                      </div>
                      <div>
                        <div className="mr-3" style={{ width: '200px' }}>
                          <label className="custom-label">To</label>
                          <TimePicker
                            label="To Time"
                            id="totalHours"
                            use12Hours
                            format="h:mm a"
                            value={field.to ? moment(field.to, 'HH:mm A') : null}
                            onChange={(time, timeString) =>
                              handleWorkingHoursChange(index, 'to', time, timeString)
                            }
                          />
                        </div>
                      </div>
                    </div>
                  </Col>
                ))}
              </Row>
            </Panel>
          </PanelLayout>
          <div className="save-changes">
            <Button type="submit" variant="primary" onClick={onSave}>
              {id ? 'Update' : 'Save'}
            </Button>
            <Button onClick={() => history.goBack()}>
              <ArrowLeftOutlined /> Back
            </Button>
          </div>
        </Col>
      </Row>
    </Form>
  )
}

export default withFormik({})(WorkScheduleForm)
