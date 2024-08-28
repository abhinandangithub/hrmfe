import { Col, Row } from 'antd'
import { memo } from 'react'
import { COUNTRIES } from '../../Util/Options'
import { Field } from '../Formik'

function AddressFields({ addressType }: { addressType: string }) {
  return (
    <Row gutter={[10, 5]}>
      <Col xs={24}>
        <div className="form-field">
          <Field name={`${addressType}.buildingNo`} label="Building No" altInput />
        </div>
      </Col>
      <Col xs={24}>
        <div className="form-field">
          <Field name={`${addressType}.street`} label="Street" altInput />
        </div>
      </Col>
      <Col xs={12}>
        <div className="form-field">
          <Field name={`${addressType}.city`} label="City" altInput />
        </div>
      </Col>
      <Col xs={12}>
        <div className="form-field">
          <Field name={`${addressType}.district`} label="District" altInput />
        </div>
      </Col>

      <Col xs={12}>
        <div className="form-field">
          <Field name={`${addressType}.country`} label="Country" as="select" options={COUNTRIES} altInput />
        </div>
      </Col>
      <Col xs={12}>
        <div className="form-field">
          <Field name={`${addressType}.postalCode`} label="Postal Code" altInput />
        </div>
      </Col>

      <Col xs={12}>
        <div className="form-field">
          <Field name={`${addressType}.additionalNo`} label="Additional No" altInput />
        </div>
      </Col>
      <Col xs={12}>
        <div className="form-field">
          <Field name={`${addressType}.additionalStreet`} label="Additional Street" altInput />
        </div>
      </Col>
      <Col xs={12}>
        <div className="form-field">
          <Field name={`${addressType}.state`} label="State/Province" altInput />
        </div>
      </Col>
      <Col xs={12}>
        <div className="form-field">
          <Field name={`${addressType}.neighbourhood`} label="Neighbourhood" altInput />
        </div>
      </Col>
    </Row>
  )
}

export default memo(AddressFields)
