import { ArrowLeftOutlined } from '@ant-design/icons'
import { Calendar, Col, message, Row } from 'antd'
import { withFormik } from 'formik'
import moment from 'moment'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import * as Yup from 'yup'
import Button from '../../../../Components/Button'
import { Field, Form } from '../../../../Components/Formik'
import ModalBox from '../../../../Components/ModalBox/ModalBox'
import ModalBoxFooter from '../../../../Components/ModalBox/ModalBoxFooter'
import PanelLayout from '../../../../Layout/PanelLayout'
import apiClient from '../../../../Util/apiClient'
import { convertSelectOptions } from '../../../../Util/Util'
import '../../HumanResources.scss'
import LeaveDescription from './LeaveDescription'

const Schema = Yup.object().shape({
  applyingFor: Yup.string().required(),
  reporteeUserId: Yup.string().required(),
  fromDate: Yup.date().required(),
  toDate: Yup.date().required(),
  description: Yup.string().required(),
  leaveType: Yup.string().required(),
  duration: Yup.string().required()
})

function LeaveGeneration({ setFieldValue, values, history, submitForm, validateForm }) {
  const [month, setmonth] = useState([])
  const [toggle, setToggle] = useState(false)
  const [leavetypes, setLeavetypes] = useState([])
  const [reportees, setReportees] = useState([])
  const { userInfo } = useSelector((state) => state.users)

  const { t } = useTranslation()

  const [pending, setPending] = useState([])

  const getMonths = (date) => {
    const array = []
    const subdate = moment(date).subtract(1, 'months')
    array.push({
      date: moment(subdate).format('YYYY-MM-DD')
    })
    array.push({
      date: moment(date).format('YYYY-MM-DD')
    })
    const add1month = moment(date).add(1, 'months')
    array.push({
      date: moment(add1month).format('YYYY-MM-DD')
    })
    const add2month = moment(date).add(2, 'months')
    array.push({
      date: moment(add2month).format('YYYY-MM-DD')
    })

    setmonth(array)
  }

  useEffect(() => {
    console.log('values', values)
    if (values.dates) {
      const months = getMonths(values.dates)

      setFieldValue('months', months)
      apiClient.get(`absence-management/byDate?date=${values.dates}`).then(({ data }) => {
        if (data && data.result) {
          setFieldValue('weekendDates', data.result.weekendDates)
          setFieldValue('holidayDates', data.result.holidayDates)
        }
      })

      apiClient
        .get('absence-management/by-employee', { params: { date: values.dates.format('YYYY-MM-DD') } })
        .then(({ data }) => {
          if (data && data?.success === false) {
            message.error(data?.message || '')
            setFieldValue('leavearray', [])
            setFieldValue('calenderYear', '')
            setPending([])
            setLeavetypes([])
          }

          if (data && data.result) {
            setFieldValue('leavearray', data.result)
            setPending(data.result)
          }

          if (data && data.result2) {
            setLeavetypes(convertSelectOptions(data.result2.leaves, 'type', 'type'))
          }

          if (data && data.calenderYearId) {
            setFieldValue('calenderYear', data.calenderYearId)
          }
        })

      apiClient
        .get(`/employees/getReportees/${userInfo.id}`)
        .then(({ data }) => {
          if (data?.result) {
            setReportees(convertSelectOptions(data.result, ['name', 'email'], 'user'))
          }
        })
        .catch((error) => {
          console.error(error)
        })
    }
  }, [values.dates])

  const onSave = async () => {
    await submitForm()
    validateForm()
    const leaveObject = {
      ...values,
      fromDate: moment(values.fromDate).format('YYYY-MM-DD'),
      toDate: moment(values.toDate).format('YYYY-MM-DD')
    }
    apiClient.post('absence-management/add', leaveObject).then(async ({ data }) => {
      if (data && data?.success === true) {
        setToggle(false)
        const dates = moment(data?.result?.date).format('YYYY-MM-DD')

        setFieldValue('leavedates', dates)
        setFieldValue('description', data.result.description)

        // console.log('Hello World')

        // await apiClient
        //   .put('/absence-management/update', { data: data.result || [], workflowStatus: 'Approved' })
        //   .then(({ data }) => {
        //     if (data.success === true) {
        //       message.success(data.message)
        //     } else {
        //       message.info(data.message)
        //     }
        //   })

        apiClient
          .get('absence-management/by-employee', { params: { date: values.dates.format('YYYY-MM-DD') } })
          .then(({ data }) => {
            if (data && data?.success === false) {
              message.error(data?.message || '')
              setFieldValue('leavearray', [])
              setFieldValue('calenderYear', '')
              setPending([])
              setLeavetypes([])
            }

            if (data && data.result) {
              setFieldValue('leavearray', data.result)
              setPending(data.result)
            }

            if (data && data.result2) {
              setLeavetypes(convertSelectOptions(data.result2.leaves, 'type', 'type'))
            }

            if (data && data.calenderYearId) {
              setFieldValue('calenderYear', data.calenderYearId)
            }
          })
      } else {
        setToggle(false)
        message.error(data?.message || 'Leave not configured')
      }
    })
  }

  function onRemove() {
    setToggle(false)
    const formatedDate = moment(values.date).format('YYYY-MM-DD')
    const check = pending.find((v) => moment(v.date).format('YYYY-MM-DD') === formatedDate)

    if (check !== undefined) {
      apiClient.put(`absence-management/delete?date=${values.date}`).then(({ data }) => {
        if (data.success === true) {
          apiClient
            .get('absence-management/by-employee', { params: { date: values.dates.format('YYYY-MM-DD') } })
            .then(({ data }) => {
              if (data && data?.success === false) {
                message.error(data?.message || '')
                setFieldValue('leavearray', [])
                setFieldValue('calenderYear', '')
                setPending([])
                setLeavetypes([])
              }

              if (data && data.result) {
                setFieldValue('leavearray', data.result)
                setPending(data.result)
              }

              if (data && data.result2) {
                setLeavetypes(convertSelectOptions(data.result2.leaves, 'type', 'type'))
              }

              if (data && data.calenderYearId) {
                setFieldValue('calenderYear', data.calenderYearId)
              }
            })
        } else {
          message.error(data.message)
        }
      })
    }
  }

  function handleValueChange(val) {
    setFieldValue({ ...values, ...val })
  }

  function selectdate(d, details) {
    const hdayEvent = moment(d).format('YYYY-MM-DD')

    setFieldValue('description', '')
    setFieldValue('leaveType', '')
    setFieldValue('fromDate', hdayEvent)
    setFieldValue('toDate', hdayEvent)

    if (details) {
      setFieldValue('description', details.description)
      setFieldValue('leaveType', details.leaveType)
    }

    setToggle(true)
    setFieldValue('date', hdayEvent)
  }

  return (
    <Row justify="center" className="inner-contents">
      <Col xs={22} sm={22} md={20} lg={20}>
        <PanelLayout title={t('Leave Request Generation')}>
          <Form>
            <Row gutter={[20, 10]} style={{ marginLeft: '461px' }}>
              <Col xs={8} xl={10}>
                <div className="form-field">
                  <Field name="dates" label="Select a month" as="date" />
                </div>
              </Col>
            </Row>
            <Row
              gutter={[20, 10]}
              style={{ marginTop: '14px', marginRight: '-78px', marginBottom: '5px', marginLeft: '23px' }}>
              <Col
                xs={24}
                md={26}
                style={{
                  paddingTop: '36px',
                  paddingRight: '10px',
                  paddingBottom: '36px',
                  paddingLeft: '10px'
                }}>
                <Row justify="left" style={{ marginLeft: '-56px' }}>
                  {month.map((v, i) => (
                    <div key={i} className="site-calendar-demo-card">
                      <div className="months-company-calendar">
                        {moment(v.date).format('MMMM   YYYY')}
                        <Col xs={24} sm={16} md={8} lg={8}>
                          <Calendar
                            fullscreen={false}
                            value={moment(v.date)}
                            headerRender={() => null}
                            dateFullCellRender={(d) => {
                              const formatedDate = moment(d).format('YYYY-MM-DD')

                              const checkWeekends = values.weekendDates.includes(formatedDate)
                              const checkholiday = values.holidayDates.includes(formatedDate)
                              const holidayApplied = pending.find(
                                (v) => moment(v.date).format('YYYY-MM-DD') === formatedDate
                              )

                              if (checkWeekends) {
                                return (
                                  <div onClick={() => selectdate(d)} className="weekdays">
                                    {moment(d).format('DD')}
                                  </div>
                                )
                              }

                              if (holidayApplied) {
                                return (
                                  <div
                                    onClick={() => selectdate(d, holidayApplied)}
                                    className={
                                      holidayApplied.workflowStatus === 'Submitted' &&
                                      holidayApplied.duration === 'Full day'
                                        ? 'pendingleave'
                                        : holidayApplied.workflowStatus === 'Submitted' &&
                                          holidayApplied.duration === 'Half day'
                                        ? 'half-day'
                                        : 'holidaydates'
                                    }>
                                    {moment(d).format('DD')}
                                  </div>
                                )
                              }

                              if (checkholiday) {
                                return (
                                  <div onClick={() => selectdate(d)} className="holidays">
                                    {moment(d).format('DD')}
                                  </div>
                                )
                              }

                              return <div onClick={() => selectdate(d)}>{moment(d).format('DD')}</div>
                            }}
                            //  onPanelChange={onPanelChange}
                          />
                        </Col>
                      </div>
                    </div>
                  ))}
                </Row>
              </Col>
            </Row>

            <Row gutter={[20, 10]} style={{ marginLeft: '9px' }}>
              {leavetypes.map((d, i) => (
                <Col key={i} xs={8} xl={6}>
                  <div className="form-field">
                    <h2>{d.type} / Availed </h2>
                  </div>
                  <div className="form-field">
                    <Row gutter={[10, 20]}>
                      <Col xs={12}>
                        <Field name="total" value={d.total} disable="true" />
                      </Col>
                      <Col xs={12}>
                        <Field name="total" value={d.availed ? d.availed : 0} disable="true" />
                      </Col>
                    </Row>
                  </div>
                </Col>
              ))}
            </Row>

            <div className="save-changes">
              <Button onClick={() => history.goBack()}>
                <ArrowLeftOutlined /> Back
              </Button>
            </div>
            {/* <TableBox columns={columns} /> */}
            <ModalBox
              title={`${typeof toggle === 'object' ? 'Edit' : 'Add'} Leave Details`}
              visible={toggle}
              footer={false}
              width={700}
              onCancel={() => {
                setToggle(false)
              }}>
              <LeaveDescription
                currentDetails={values}
                leavetypes={leavetypes}
                handleValueChange={handleValueChange}
                setFieldValue={setFieldValue}
                reportees={reportees}
              />
              <ModalBoxFooter okText="Save" onOk={onSave} cancelText="Remove Leave" onCancel={onRemove} />
            </ModalBox>
          </Form>
        </PanelLayout>
      </Col>
    </Row>
  )
}

export default withFormik({
  mapPropsToValues: () => ({
    applyingFor: 'Self',
    reporteeUserId: '',
    filterPeriod: false,
    year: moment(),
    total: '',
    description: '',
    leaveType: '',
    duration: 'Full day',
    leaveoptions: '',
    leavedates: '',
    leavearray: [],
    calenderYear: '',
    dates: moment(new Date()),
    fromDate: moment().startOf('day'),
    toDate: moment().endOf('day'),
    date: '',
    holidayDates: [],
    weekendDates: [],
    startMonth: moment().format('MMM')
  }),
  handleSubmit: () => null,
  validationSchema: Schema
})(LeaveGeneration)
