import { Col, Row } from 'antd'
import DatePicker from 'antd/es/date-picker' // Import Ant Design DatePicker component
import moment from 'moment' // Import moment for date formatting
import { useEffect, useState } from 'react'
import { withTranslation } from 'react-i18next'
import { Field, Form } from '../../../Components/Formik'
import apiClient from '../../../Util/apiClient'

const StatusDetailsForm = (props) => {
  const [religionData, setreligionData] = useState([])
  const [citizenshipData, setcitizenshipData] = useState([])
  const [maritalStatusData, setmaritalStatusData] = useState([])
  const [militaryStatusData, setmilitaryStatusData] = useState([])
  const [disabilityStatusData, setdisabilityStatusData] = useState([])

  useEffect(() => {
    getData()
  }, [])

  const getData = () => {
    apiClient.get('religion').then(({ status, data }) => {
      if (status === 200) {
        setreligionData(
          data.result.map((item) => ({
            label: item.religionName,
            value: item.id,
            ...item
          }))
        )
      }
    })
    apiClient.get('citizenship').then(({ status, data }) => {
      if (status === 200) {
        setcitizenshipData(
          data.result.map((item) => ({
            label: item.citizenship,
            value: item.id,
            ...item
          }))
        )
      }
    })
    apiClient.get('marital-status').then(({ status, data }) => {
      if (status === 200) {
        setmaritalStatusData(
          data.result.map((item) => ({
            label: item.maritalstatus,
            value: item.id,
            ...item
          }))
        )
      }
    })
    apiClient.get('military-status').then(({ status, data }) => {
      if (status === 200) {
        setmilitaryStatusData(
          data.result.map((item) => ({
            label: item.militaryStatusName,
            value: item.id,
            ...item
          }))
        )
      }
    })
    apiClient.get('disability').then(({ status, data }) => {
      if (status === 200) {
        setdisabilityStatusData(
          data.result.map((item) => ({
            label: item.disabilityName,
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
            <Field name="citizenship" label={props.t('Citizenship')} as="select" options={citizenshipData} />
          </div>
        </Col>
        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 12 }}>
          <div className="form-field">
            <Field
              name="maritalStatus"
              label={props.t('Marital Status')}
              as="select"
              options={maritalStatusData}
            />
          </div>
        </Col>
        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 12 }}>
          <div className="form-field">
            <Field
              name="militaryStatus"
              label={props.t('Military Status')}
              as="select"
              options={militaryStatusData}
            />
          </div>
        </Col>
        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 12 }}>
          <div className="form-field">
            <Field
              name="disabilityStatus"
              label={props.t('Disability Status')}
              as="select"
              options={disabilityStatusData}
            />
          </div>
        </Col>
        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 12 }}>
          <div className="form-field">
            <Field name="religion" label={props.t('Religion')} as="select" options={religionData} />
          </div>
        </Col>
      </Row>
    </Form>
  )
}

export default withTranslation()(StatusDetailsForm)
