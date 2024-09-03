import { Col, Row } from 'antd'
import DatePicker from 'antd/es/date-picker' // Import Ant Design DatePicker component
import moment from 'moment' // Import moment for date formatting
import { useEffect, useState } from 'react'
import { withTranslation } from 'react-i18next'
import { Field, Form } from '../../../Components/Formik'
import apiClient from '../../../Util/apiClient'

const PayrollDetailForm = (props) => {
  const [payrollData, setPayrollData] = useState([])
  const [paygroupData, setpaygroupData] = useState([])
  const [locData, setLocData] = useState([])
  const [wageData, setwageData] = useState([])
  const [regionData, setRegionData] = useState([])
  const [empGrpData, setempGrpData] = useState([])
  const [empSubGrpData, setempSubGrpData] = useState([])
  const [workScheduleData, setWorkSchData] = useState([])
  useEffect(() => {
    getData()
  }, [])

  const getData = () => {
    apiClient.get('payroll-area').then(({ status, data }) => {
      if (status === 200) {
        setPayrollData(
          data.result.map((item) => ({
            label: item.payrollAreaName,
            value: item.id,
            ...item
          }))
        )
      }
    })
    apiClient.get('pay-group').then(({ status, data }) => {
      if (status === 200) {
        setpaygroupData(
          data.result.map((item) => ({
            label: item.payGroup,
            value: item.id,
            ...item
          }))
        )
      }
    })
    apiClient.get('location/getAll').then(({ status, data }) => {
      if (status === 200) {
        setLocData(
          data.result.map((item) => ({
            label: item.name,
            value: item.id,
            ...item
          }))
        )
      }
    })

    apiClient.get('wage-types').then(({ status, data }) => {
      if (status === 200) {
        setwageData(
          data.result.map((item) => ({
            label: item.wageType,
            value: item.id,
            ...item
          }))
        )
      }
    })

    apiClient.get('region').then(({ status, data }) => {
      if (status === 200) {
        setRegionData(
          data.result.map((item) => ({
            label: item.region,
            value: item.id,
            ...item
          }))
        )
      }
    })

    apiClient.get('employee-groups').then(({ status, data }) => {
      if (status === 200) {
        setempGrpData(
          data.result.map((item) => ({
            label: item.employeeGroupId,
            value: item.id,
            ...item
          }))
        )
      }
    })

    apiClient.get('employee-sub-groups').then(({ status, data }) => {
      if (status === 200) {
        setempSubGrpData(
          data.result.map((item) => ({
            label: item.employeeSubGroupText,
            value: item.id,
            ...item
          }))
        )
      }
    })

    apiClient.get('work-schedules/getAll').then(({ status, data }) => {
      if (status === 200) {
        setWorkSchData(
          data.result.map((item) => ({
            label: item.name,
            value: item.id,
            ...item
          }))
        )
      }
    })
  }

  const DatePickerField = ({ field, form, ...props }) => {
    const { name, value } = field
    const { setFieldValue, setFieldTouched } = form

    return (
      <DatePicker
        {...props}
        value={value ? moment(value, 'YYYY-MM-DD') : null} // Ensure value is a moment object or null
        onChange={(date) => {
          setFieldValue(name, date ? date.format('YYYY-MM-DD') : '')
          setFieldTouched(name, true)
        }}
      />
    )
  }

  return (
    <Form>
      <Row justify="left" gutter={[12, 10]}>
        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 12 }}>
          <div className="form-field">
            <label>{props.t('Valid From')}</label>
            <Field name="validFrom" component={DatePickerField} />
          </div>
        </Col>
        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 12 }}>
          <div className="form-field">
            <label>{props.t('Valid To')}</label>
            <Field name="validTo" component={DatePickerField} />
          </div>
        </Col>
        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 12 }}>
          <div className="form-field">
            <Field name="payrollArea" label={props.t('Payroll Area')} as="select" options={payrollData} />
          </div>
        </Col>
        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 12 }}>
          <div className="form-field">
            <Field name="payGroup" label={props.t('Pay Group')} as="select" options={paygroupData} />
          </div>
        </Col>
        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 12 }}>
          <div className="form-field">
            <Field name="wageType" label={props.t('Wage Type')} as="select" options={wageData} />
          </div>
        </Col>
        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 12 }}>
          <div className="form-field">
            <Field name="location" label={props.t('Location')} as="select" options={locData} />
          </div>
        </Col>
        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 12 }}>
          <div className="form-field">
            <Field name="region" label={props.t('Region')} as="select" options={regionData} />
          </div>
        </Col>
        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 12 }}>
          <div className="form-field">
            <Field name="employeeGroup" label={props.t('Employee Group')} as="select" options={empGrpData} />
          </div>
        </Col>
        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 12 }}>
          <div className="form-field">
            <Field
              name="employeeSubgroup"
              label={props.t('Employee Subgroup')}
              as="select"
              options={empSubGrpData}
            />
          </div>
        </Col>
        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 12 }}>
          <div className="form-field">
            <Field
              name="workSchedule"
              label={props.t('Work Schedule')}
              as="select"
              options={workScheduleData}
            />
          </div>
        </Col>
      </Row>
    </Form>
  )
}

export default withTranslation()(PayrollDetailForm)
