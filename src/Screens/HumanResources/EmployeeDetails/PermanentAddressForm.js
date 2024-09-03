import { Col, Input, Row, Select } from 'antd'
import DatePicker from 'antd/es/date-picker' // Import Ant Design DatePicker component
import moment from 'moment' // Import moment for date formatting
import { withTranslation } from 'react-i18next'
import { Field, Form } from '../../../Components/Formik'

const PermanentAddressForm = (props) => {
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
        style={{ width: '100%' }}
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
            <label>{props.t('Building No')}</label>
            <Field name="buildingNo" type="text">
              {({ field }) => <Input {...field} placeholder={props.t('Enter Building No')} />}
            </Field>
          </div>
        </Col>
        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 12 }}>
          <div className="form-field">
            <label>{props.t('Street')}</label>
            <Field name="street" type="text">
              {({ field }) => <Input {...field} placeholder={props.t('Enter Street')} />}
            </Field>
          </div>
        </Col>
        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 12 }}>
          <div className="form-field">
            <label>{props.t('Additional Street')}</label>
            <Field name="additionalStreet" type="text">
              {({ field }) => <Input {...field} placeholder={props.t('Enter Additional Street')} />}
            </Field>
          </div>
        </Col>
        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 12 }}>
          <div className="form-field">
            <label>{props.t('City')}</label>
            <Field name="city" type="text">
              {({ field }) => <Input {...field} placeholder={props.t('Enter City')} />}
            </Field>
          </div>
        </Col>
        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 12 }}>
          <div className="form-field">
            <label>{props.t('State')}</label>
            <Field name="state" type="text">
              {({ field }) => <Input {...field} placeholder={props.t('Enter State')} />}
            </Field>
          </div>
        </Col>
        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 12 }}>
          <div className="form-field">
            <label>{props.t('Postal Code')}</label>
            <Field name="postalCode" type="text">
              {({ field }) => <Input {...field} placeholder={props.t('Enter Postal Code')} />}
            </Field>
          </div>
        </Col>
        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 12 }}>
          <div className="form-field">
            <label>{props.t('Country')}</label>
            <Field name="country">
              {({ field, form }) => (
                <Select
                  {...field}
                  style={{ width: '100%' }}
                  placeholder={props.t('Select Country')}
                  onChange={(value) => form.setFieldValue(field.name, value)}>
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
            <label>{props.t('Neighborhood')}</label>
            <Field name="neighborhood" type="text">
              {({ field }) => <Input {...field} placeholder={props.t('Enter Neighborhood')} />}
            </Field>
          </div>
        </Col>
        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 12 }}>
          <div className="form-field">
            <label>{props.t('Additional No')}</label>
            <Field name="additionalNo" type="text">
              {({ field }) => <Input {...field} placeholder={props.t('Enter Additional No')} />}
            </Field>
          </div>
        </Col>
      </Row>
    </Form>
  )
}

export default withTranslation()(PermanentAddressForm)
