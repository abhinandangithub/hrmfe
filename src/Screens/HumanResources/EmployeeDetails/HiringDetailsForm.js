import { Col, Row, Select } from 'antd'
import DatePicker from 'antd/es/date-picker' // Import Ant Design DatePicker component
import moment from 'moment' // Import moment for date formatting
import { useEffect, useState } from 'react'
import { withTranslation } from 'react-i18next'
import { Field, Form } from '../../../Components/Formik'
import apiClient from '../../../Util/apiClient'

const HiringDetailsForm = (props) => {
  // Custom DatePickerField component within the same file
  const [contractTypes, setContractTypes] = useState([])
  console.log('props.currentEmployee', props.currentEmployee)

  useEffect(() => {
    getData()
  }, [])

  const getData = () => {
    apiClient.get('contract-type').then(({ status, data }) => {
      if (status === 200) {
        setContractTypes(
          data.result.map((item) => ({
            label: item.contractType,
            value: item.id,
            ...item
          }))
        )
      }
    })
  }

  const { Option } = Select
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
            <Field name="employeeNo" label={props.t('Employee Number')} type="text" />
          </div>
        </Col>
        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 12 }}>
          <div className="form-field">
            <Field name="uniqueId" label={props.t('Unique ID')} type="text" />
          </div>
        </Col>
        {!props.currentEmployee?._id && (
          <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 24 }}>
            <div className="form-field">
              <Field name="email" label={props.t('Email')} type="email" />
            </div>
          </Col>
        )}

        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 12 }}>
          <div className="form-field">
            <label>{props.t('Hire Date')}</label>
            <Field name="hireDate" component={DatePickerField} />
          </div>
        </Col>
        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 12 }}>
          <div className="form-field">
            <label>{props.t('Original Hire Date')}</label>
            <Field name="originalHireDate" component={DatePickerField} />
          </div>
        </Col>
        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 12 }}>
          <div className="form-field">
            <label>{props.t('Exit Date')}</label>
            <Field name="exitDate" component={DatePickerField} />
          </div>
        </Col>
        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 12 }}>
          <div className="form-field">
            <label>{props.t('Title')}</label>

            <Field name="title">
              {({ field, form }) => (
                <Select
                  style={{ width: '100%' }}
                  {...field}
                  onChange={(value) => form.setFieldValue(field.name, value)}
                  value={field.value}
                  placeholder={props.t('Select Title')}>
                  <Option value="Mr">Mr</Option>
                  <Option value="Mrs">Mrs</Option>
                  <Option value="Ms">Ms</Option>
                </Select>
              )}
            </Field>
          </div>
        </Col>
        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 12 }}>
          <div className="form-field">
            <Field name="firstName" label={props.t('First Name')} type="text" />
          </div>
        </Col>
        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 12 }}>
          <div className="form-field">
            <Field name="middleName" label={props.t('Middle Name')} type="text" />
          </div>
        </Col>
        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 12 }}>
          <div className="form-field">
            <Field name="lastName" label={props.t('Last Name')} type="text" />
          </div>
        </Col>
        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 12 }}>
          <div className="form-field">
            <label>{props.t('Valid From')}</label>
            <Field name="validFrom" label={props.t('Valid From')} component={DatePickerField} />
          </div>
        </Col>
        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 12 }}>
          <div className="form-field">
            <label>{props.t('Valid To')}</label>
            <Field name="validTo" label={props.t('Valid To')} component={DatePickerField} />
          </div>
        </Col>
        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 12 }}>
          <div className="form-field">
            <Field name="contractType" label={props.t('Contract Type')} as="select" options={contractTypes} />
          </div>
        </Col>
      </Row>
    </Form>
  )
}

export default withTranslation()(HiringDetailsForm)
