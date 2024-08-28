import { Calendar, Col, message, Row } from 'antd'
import { withFormik } from 'formik'
import moment from 'moment'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import FooterActions from '../../../../Components/FooterActions'
import { Field, Form } from '../../../../Components/Formik'
import ModalBox from '../../../../Components/ModalBox/ModalBox'
import Panel from '../../../../Layout/Panel'
import PanelLayout from '../../../../Layout/PanelLayout'
import apiClient from '../../../../Util/apiClient'
import '../../HumanResources.scss'
import CompanyCalendarLeaveDesc from './CompanyCalendarLeaveDesc'

const DAYS = [
  { label: 'Monday', value: 1 },
  { label: 'Tuesday', value: 2 },
  { label: 'Wednesday', value: 3 },
  { label: 'Thursday', value: 4 },
  { label: 'Friday', value: 5 },
  { label: 'Saturday', value: 6 },
  { label: 'Sunday', value: 7 }
]

function CompanyCalendarForm1({
  match: {
    params: { id }
  },
  setFieldValue,
  values,
  history
}) {
  const [toggle, setToggle] = useState(false)
  const { t } = useTranslation()

  const getData = () => {
    if (id) {
      apiClient.get(`yearly-calender/byId/${id}`).then(({ data }) => {
        if (data) {
          setFieldValue('name', data.name)
          setFieldValue('holidayDates', data.holidayDates)
          setFieldValue('events', data.events)
          setFieldValue('startDate', data.startDate)
          setFieldValue('endDate', data.endDate)
          setFieldValue('weekends', data.weekends)
          setFieldValue('weekendDates', data.weekendDates)
          setFieldValue('leavedescription', data.events.leavedescription)
        }
      })
    }
  }

  useEffect(() => {
    if (id) {
      getData()
    }
  }, [])

  useEffect(() => {
    if (values.startDate && values.endDate) {
      const months = getMonths(values.startDate, values.endDate)

      setFieldValue('months', months)
    }
  }, [values.startDate, values.endDate])

  const handleAddNewDetails = (d) => {
    setToggle(true)

    const hdayEvent = moment(d).format('YYYY-MM-DD')
    values.events.map((d) => {
      if (hdayEvent.includes(moment(d.leavedate).format('YYYY-MM-DD'))) {
        setFieldValue('leavedescription', d.leavedescription)
      }

      return true
    })

    const eventValues = values.holidayDates
    eventValues.push(hdayEvent)
    setFieldValue('holidayDates', eventValues)
    setFieldValue('leavedate', hdayEvent)
  }

  const handleValueChange = (val) => {
    setFieldValue({ ...values, ...val })
  }

  useEffect(() => {
    const weekdays = generateWeekdays(values.weekends)

    setFieldValue('weekendDates', weekdays)
  }, [values.weekends])

  const getMonths = (startDate, endDate) => {
    let currentDate = moment(startDate)
    const stopDate = moment(endDate)
    const monthArray = []

    while (currentDate <= stopDate) {
      if (moment(currentDate).format('MM') !== moment(stopDate).format('MM')) {
        monthArray.push({
          date: moment(currentDate).format('YYYY-MM-DD')
        })
      }

      currentDate = moment(currentDate).add(1, 'months')
    }

    if (moment(currentDate).format('MM') === moment(stopDate).format('MM')) {
      monthArray.push({
        date: moment(endDate).format('YYYY-MM-DD')
      })
    }

    monthArray.push({
      date: moment(endDate).format('YYYY-MM-DD')
    })

    return monthArray
  }

  const generateWeekdays = (weeks) => {
    const start = moment(new Date(values.startDate))
    const end = moment(new Date(values.endDate))

    const result = []

    weeks.map((w) => {
      const day = w === 7 ? 0 : w
      const current = start.clone()

      while (current.day(7 + day).isBefore(end)) {
        result.push(current.clone().format('YYYY-MM-DD'))
      }

      return true
    })

    return result
  }

  const onRemove = () => {
    setToggle(false)

    for (let i = values.holidayDates.length - 1; i >= 0; i--) {
      if (values.holidayDates[i] === values.leavedate) {
        values.holidayDates.splice(i, 1)
      }
    }
  }

  const onSave = () => {
    const { id, ...rest } = values

    const hdayEvent = { leavedescription: rest.leavedescription, leavedate: rest.leavedate }
    const eventValues = values.events
    eventValues.push(hdayEvent)
    setFieldValue('events', eventValues)

    setToggle(false)
  }

  return (
    <Form>
      <Row justify="center" className="inner-contents">
        <Col xs={22} md={20}>
          <PanelLayout title={t('Holiday Calender')}>
            <Panel title={t('Calendar')}>
              <Row justify="left" gutter={(12, 10)}>
                <Col xs={24} sm={24} md={8} lg={8}>
                  <div className="form-field">
                    <Field name="name" label="Calendar Year" />
                  </div>
                </Col>
                <Col xs={24} sm={24} md={8} lg={8}>
                  <div className="form-field">
                    <Field name="startDate" label="From Month" as="date" />
                  </div>
                </Col>
                <Col xs={24} sm={24} md={8} lg={8}>
                  <div className="form-field">
                    <Field name="endDate" label="To Month" as="date" />
                  </div>
                </Col>
              </Row>
            </Panel>
          </PanelLayout>
          <Row>
            {DAYS.map((day, i) => (
              <Col key={i} xs={24} sm={24} md={8} lg={3}>
                <div className="form-field">
                  <Field
                    as="checkbox"
                    name={day.value}
                    label={day.label}
                    value={values?.weekends?.includes(day.value)}
                    onChange={() => {
                      const selectedDay = values?.weekends?.includes(day.value)
                      let weeks = []

                      if (selectedDay) {
                        weeks = values?.weekends?.filter((d) => d !== day.value)
                      } else {
                        weeks = [...values?.weekends, day.value]
                      }

                      return setFieldValue('weekends', weeks)
                    }}
                  />
                </div>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
      <Col xs={22} md={20}>
        <Row justify="left">
          {values.months.map((v, i) => (
            <div key={i} className="site-calendar-demo-card">
              <div className="months-company-calendar">{moment(v.date).format('MMMM')}</div>
              <Col xs={24} sm={16} md={8} lg={8}>
                <Calendar
                  fullscreen={false}
                  headerRender={() => null}
                  //  onPanelChange={onPanelChange}
                  value={moment(v.date)}
                  onSelect={handleAddNewDetails}
                  dateFullCellRender={(d) => {
                    const formatedDate = moment(d).format('YYYY-MM-DD')

                    const checkWeekends = values.weekendDates.includes(formatedDate)
                    const checkholiday = values.holidayDates.includes(formatedDate)

                    if (checkWeekends) {
                      return <div className="weekdays">{moment(d).format('DD')}</div>
                    }

                    if (checkholiday) {
                      return <div className="holidays">{moment(d).format('DD')}</div>
                    }

                    return <div>{moment(d).format('DD')}</div>
                  }}
                />
              </Col>
            </div>
          ))}
        </Row>
      </Col>

      <ModalBox
        title={`${typeof toggle === 'object' ? 'Edit' : 'Add'} Holiday Details`}
        visible={toggle}
        width={700}
        okText="Save"
        onOk={onSave}
        onCancel={onRemove}
        cancelText="Remove"
        destroyOnClose>
        <CompanyCalendarLeaveDesc currentDetails={values} handleValueChange={handleValueChange} />
      </ModalBox>
      <FooterActions
        centerActions={[
          {
            prefix: 'flaticon-writing',
            label: id ? 'Update' : 'Save',
            type: 'submit'
          },
          {
            prefix: 'flaticon-back',
            label: 'Back',
            onClick: () => history.goBack()
          }
        ]}
      />
    </Form>
  )
}

export default withFormik({
  mapPropsToValues: () => ({
    leavedescription: '',
    leavedate: '',
    startDate: '',
    endDate: '',
    weekends: [],
    weekendDates: [],
    holidayDates: [],
    events: [],
    months: [],
    name: ''
  }),
  // validationSchema: Schema,
  handleSubmit: (
    data,
    {
      props: {
        match: {
          params: { id }
        },
        history
      }
    }
  ) => {
    if (id) {
      apiClient.post(`yearly-calender/update/${id}`, data).then(({ data }) => {
        if (data && data.result) {
          history.push('/app/company-calendar')
        }

        if (data.success === false) {
          message.warning(data.message)
        }
      })
    } else {
      apiClient.post('yearly-calender/add', data).then(({ data }) => {
        if (data && data.result) {
          history.push('/app/company-calendar')
        }

        if (data.success === false) {
          message.warning(data.message)
        }
      })
    }
  }
})(CompanyCalendarForm1)
