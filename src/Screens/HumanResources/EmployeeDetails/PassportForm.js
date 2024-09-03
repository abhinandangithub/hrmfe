import { Col, Row, Select } from 'antd'
import DatePicker from 'antd/es/date-picker' // Import Ant Design DatePicker component
import moment from 'moment' // Import moment for date formatting
import { withTranslation } from 'react-i18next'
import { Field, Form } from '../../../Components/Formik'

const PassportForm = (props) => {
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
            <label>{props.t('Passport issued Country')}</label>
            <Field name="passportIssuedCountry">
              {({ field, form }) => (
                <Select
                  style={{ width: '100%' }}
                  {...field}
                  onChange={(value) => form.setFieldValue(field.name, value)}
                  value={field.value}
                  placeholder={props.t('Select Country')}>
                  <Option value="us">United States</Option>
                  <Option value="canada">Canada</Option>
                  <Option value="uk">United Kingdom</Option>
                  {/* Add more options as necessary */}
                </Select>
              )}
            </Field>
          </div>
        </Col>
        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 12 }}>
          <div className="form-field">
            <Field name="passportNo" label={props.t('Passport No')} />
          </div>
        </Col>
        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 12 }}>
          <div className="form-field">
            <Field name="nameAsInPassport" label={props.t('Name As In Passport')} />
          </div>
        </Col>
        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 12 }}>
          <div className="form-field">
            <label>{props.t('Passport Valid From')}</label>
            <Field name="passportValidFrom" component={DatePickerField} />
          </div>
        </Col>
        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 12 }}>
          <div className="form-field">
            <label>{props.t('Passport Valid To')}</label>
            <Field name="passportValidTo" component={DatePickerField} />
          </div>
        </Col>
        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 12 }}>
          <div className="form-field">
            <label>{props.t('Issue On')}</label>
            <Field name="issueOn" component={DatePickerField} />
          </div>
        </Col>
        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 12 }}>
          <div className="form-field">
            <label>{props.t('Visa held for country')}</label>
            <Field name="visaHeldForCountry">
              {({ field, form }) => (
                <Select
                  style={{ width: '100%' }}
                  {...field}
                  onChange={(value) => form.setFieldValue(field.name, value)}
                  value={field.value}
                  placeholder={props.t('Select Country')}>
                  <Option value="us">United States</Option>
                  <Option value="canada">Canada</Option>
                  <Option value="uk">United Kingdom</Option>
                  {/* Add more options as necessary */}
                </Select>
              )}
            </Field>
          </div>
        </Col>
        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 12 }}>
          <div className="form-field">
            <label>{props.t('Type of Visa')}</label>
            <Field name="typeOfVisa">
              {({ field, form }) => (
                <Select
                  style={{ width: '100%' }}
                  {...field}
                  onChange={(value) => form.setFieldValue(field.name, value)}
                  value={field.value}
                  placeholder={props.t('Select Visa Type')}>
                  <Option value="tourist">Tourist</Option>
                  <Option value="work">Work</Option>
                  <Option value="student">Student</Option>
                  {/* Add more options as necessary */}
                </Select>
              )}
            </Field>
          </div>
        </Col>
        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 12 }}>
          <div className="form-field">
            <label>{props.t('Type Of Visa Entry')}</label>
            <Field name="typeOfVisaEntry">
              {({ field, form }) => (
                <Select
                  style={{ width: '100%' }}
                  {...field}
                  onChange={(value) => form.setFieldValue(field.name, value)}
                  value={field.value}
                  placeholder={props.t('Select Entry Type')}>
                  <Option value="single">Single</Option>
                  <Option value="multiple">Multiple</Option>
                </Select>
              )}
            </Field>
          </div>
        </Col>
        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 12 }}>
          <div className="form-field">
            <label>{props.t('Visa Valid From')}</label>
            <Field name="visaValidFrom" component={DatePickerField} />
          </div>
        </Col>
        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 12 }}>
          <div className="form-field">
            <label>{props.t('Visa Valid To')}</label>
            <Field name="visaValidTo" component={DatePickerField} />
          </div>
        </Col>
        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 12 }}>
          <div className="form-field">
            <label>{props.t('Permit Country')}</label>
            <Field name="permitCountry">
              {({ field, form }) => (
                <Select
                  style={{ width: '100%' }}
                  {...field}
                  onChange={(value) => form.setFieldValue(field.name, value)}
                  value={field.value}
                  placeholder={props.t('Select Country')}>
                  <Option value="us">United States</Option>
                  <Option value="canada">Canada</Option>
                  <Option value="uk">United Kingdom</Option>
                  {/* Add more options as necessary */}
                </Select>
              )}
            </Field>
          </div>
        </Col>
        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 12 }}>
          <div className="form-field">
            <Field name="permitNo" label={props.t('Permit No')} />
          </div>
        </Col>
        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 12 }}>
          <div className="form-field">
            <label>{props.t('Date of entry')}</label>
            <Field name="dateOfEntry" component={DatePickerField} />
          </div>
        </Col>
        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 12 }}>
          <div className="form-field">
            <label>{props.t('Issued On')}</label>
            <Field name="issuedOn" component={DatePickerField} />
          </div>
        </Col>
      </Row>
    </Form>
  )
}

export default withTranslation()(PassportForm)
