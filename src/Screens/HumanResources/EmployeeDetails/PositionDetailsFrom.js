import { Col, InputNumber, Row } from 'antd'
import DatePicker from 'antd/es/date-picker' // Import Ant Design DatePicker component
import moment from 'moment' // Import moment for date formatting
import { useEffect, useState } from 'react'
import { withTranslation } from 'react-i18next'
import { Field, Form } from '../../../Components/Formik'
import apiClient from '../../../Util/apiClient'
import { convertSelectOptions } from '../../../Util/Util'

const PositionDetailsForm = (props) => {
  const [jobLevelData, setjobLevelData] = useState([])
  const [jobBrandData, setjobBrandData] = useState([])
  const [gradesData, setGradesData] = useState([])
  const [costCenterData, setcostCenterData] = useState([])
  const [positionData, setPositionDataSource] = useState([])

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

  useEffect(() => {
    getData()
  }, [])

  const getData = () => {
    apiClient.get('job-levels').then(({ status, data }) => {
      if (status === 200) {
        setjobLevelData(
          data.result.map((item) => ({
            label: item.jobLevel,
            value: item.id,
            ...item
          }))
        )
      }
    })
    apiClient.get('job-bands').then(({ status, data }) => {
      if (status === 200) {
        setjobBrandData(
          data.result.map((item) => ({
            label: item.jobBands,
            value: item.id,
            ...item
          }))
        )
      }
    })
    apiClient.get('grades/get').then(({ status, data }) => {
      if (status === 200) {
        setGradesData(
          data.result.map((item) => ({
            label: item.gradeName,
            value: item.id,
            ...item
          }))
        )
      }
    })

    apiClient.get('cost-centers/get').then(({ data }) => {
      if (data && data.result) {
        setcostCenterData(convertSelectOptions(data.result, 'name', 'id'))
      }
    })

    apiClient.get('positions').then(({ data }) => {
      if (data && data.result) {
        setPositionDataSource(convertSelectOptions(data.result, 'positionTitle', 'id'))
      }
    })
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
            <label>{props.t('Position Number')}</label>
            <Field name="positionNumber" />
          </div>
        </Col>
        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 12 }}>
          <div className="form-field">
            <Field
              name="positionTitle"
              label={props.t('Position Title / Designation')}
              as="select"
              options={positionData}
            />
          </div>
        </Col>
        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 12 }}>
          <div className="form-field">
            <Field name="costCenter" label={props.t('Cost Center')} as="select" options={costCenterData} />
          </div>
        </Col>
        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 12 }}>
          <div className="form-field">
            <Field name="jobLevel" label={props.t('Job Level')} as="select" options={jobLevelData} />
          </div>
        </Col>
        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 12 }}>
          <div className="form-field">
            <Field name="jobBand" label={props.t('Job Band')} as="select" options={jobBrandData} />
          </div>
        </Col>
        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 12 }}>
          <div className="form-field">
            <Field name="grade" label={props.t('Grade')} as="select" options={gradesData} />
          </div>
        </Col>
        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 12 }}>
          <div className="form-field">
            <label>{props.t('FTE')}</label>
            <Field name="fte">
              {({ field, form }) => (
                <InputNumber
                  style={{ width: '100%' }}
                  {...field}
                  onChange={(value) => form.setFieldValue(field.name, value)}
                  value={field.value}
                  placeholder={props.t('Full-Time Equivalent (FTE)')}
                  min={0}
                  max={1}
                  step={0.01}
                />
              )}
            </Field>
          </div>
        </Col>
        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 12 }}>
          <div className="form-field">
            <label>{props.t('Employee Target Working Hours')}</label>
            <Field name="employeeTargetWorkingHours" type="number" readOnly />
          </div>
        </Col>
        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 24 }}>
          <div className="form-field">
            <label>{props.t('Role and Responsibility')}</label>
            <Field name="roleAndResponsibility" type="textarea" />
          </div>
        </Col>
      </Row>
    </Form>
  )
}

export default withTranslation()(PositionDetailsForm)
