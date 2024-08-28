import { CaretRightOutlined } from '@ant-design/icons'
import { Col, Collapse, Row, Space } from 'antd'
import { withTranslation } from 'react-i18next'
import { Field } from '../../../Components/Formik'
import { COUNTRIES } from '../../../Util/Options'

const { Panel } = Collapse

const ContactDetails = (props) => {
  const { values = {}, editable } = props

  return (
    <Space direction="vertical" size="large" className="w-100">
      <Collapse
        collapsible="header"
        expandIconPosition="right"
        expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 270 : 90} />}
        bordered>
        <Panel style={{ fontSize: 16, fontWeight: 'bold' }} header={props.t('Current Address')} key="2">
          {!editable && (
            <div className="basic-details">
              <Row justify="left" gutter={(12, 10)}>
                <Col xs={24} sm={24} md={8} lg={8}>
                  <span>{props.t('Building No')}</span>
                  <p>{values.currentAddress?.buildingNo || '-'}</p>
                </Col>
                <Col xs={24} sm={24} md={8} lg={8}>
                  <span>{props.t('street')}</span>
                  <p>{values.currentAddress?.street || '-'}</p>
                </Col>
                <Col xs={24} sm={24} md={8} lg={8}>
                  <span>{props.t('Additional Street')}</span>
                  <p>{values.currentAddress?.additionalStreet || '-'}</p>
                </Col>
                <Col xs={24} sm={24} md={8} lg={8}>
                  <span>{props.t('City')}</span>
                  <p>{values.currentAddress?.city || '-'}</p>
                </Col>
                <Col xs={24} sm={24} md={8} lg={8}>
                  <span>{props.t('State')}</span>
                  <p>{values.currentAddress?.state || '-'}</p>
                </Col>
                <Col xs={24} sm={24} md={8} lg={8}>
                  <span>{props.t('PostalCode')}</span>
                  <p>{values.currentAddress?.postalCode || '-'}</p>
                </Col>
                <Col xs={24} sm={24} md={8} lg={8}>
                  <span>{props.t('Country')}</span>
                  <p>{values.currentAddress?.country || '-'}</p>
                </Col>
                <Col xs={24} sm={24} md={8} lg={8}>
                  <span>{props.t('Neighborhood')}</span>
                  <p>{values.currentAddress?.neighborhood || '-'}</p>
                </Col>
                <Col xs={24} sm={24} md={8} lg={8}>
                  <span>{props.t('Additional No')}</span>
                  <p>{values.currentAddress?.additionalNo || '-'}</p>
                </Col>
              </Row>
            </div>
          )}
          {editable && (
            <div>
              <Row justify="left" gutter={(12, 10)}>
                <Col xs={24} sm={24} md={8} lg={8}>
                  <div className="form-field">
                    <Field name="currentAddress.buildingNo" label="Building No" />
                  </div>
                </Col>
                <Col xs={24} sm={24} md={8} lg={8}>
                  <div className="form-field">
                    <Field name="currentAddress.street" label="Street" />
                  </div>
                </Col>
                <Col xs={24} sm={24} md={8} lg={8}>
                  <div className="form-field">
                    <Field name="currentAddress.additionalStreet" label="Additional Street" />
                  </div>
                </Col>
                <Col xs={24} sm={24} md={8} lg={8}>
                  <div className="form-field">
                    <Field name="currentAddress.city" label="City" />
                  </div>
                </Col>
                <Col xs={24} sm={24} md={8} lg={8}>
                  <div className="form-field">
                    <Field name="currentAddress.state" label="State" />
                  </div>
                </Col>
                <Col xs={24} sm={24} md={8} lg={8}>
                  <div className="form-field">
                    <Field name="currentAddress.postalCode" label="Postal Code" />
                  </div>
                </Col>
                <Col xs={24} sm={24} md={8} lg={8}>
                  <div className="form-field">
                    <Field name="currentAddress.country" label="Country" as="select" options={COUNTRIES} />
                  </div>
                </Col>
                <Col xs={24} sm={24} md={8} lg={8}>
                  <div className="form-field">
                    <Field name="currentAddress.neighborhood" label="Neighborhood" />
                  </div>
                </Col>
                <Col xs={24} sm={24} md={8} lg={8}>
                  <div className="form-field">
                    <Field name="currentAddress.additionalNo" label="Additional No" />
                  </div>
                </Col>
              </Row>
            </div>
          )}
        </Panel>
      </Collapse>

      <Collapse
        collapsible="header"
        expandIconPosition="right"
        expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 270 : 90} />}
        bordered>
        <Panel style={{ fontSize: 16, fontWeight: 'bold' }} header={props.t('Permanent Address')} key="3">
          {!editable && (
            <div className="basic-details">
              <Row justify="left" gutter={(12, 10)}>
                <Col xs={24} sm={24} md={8} lg={8}>
                  <span>{props.t('Building No')}</span>
                  <p>{values.permanentAddress?.buildingNo || '-'}</p>
                </Col>
                <Col xs={24} sm={24} md={8} lg={8}>
                  <span>{props.t('street')}</span>
                  <p>{values.permanentAddress?.street || '-'}</p>
                </Col>
                <Col xs={24} sm={24} md={8} lg={8}>
                  <span>{props.t('Additional Street')}</span>
                  <p>{values.permanentAddress?.additionalStreet || '-'}</p>
                </Col>
                <Col xs={24} sm={24} md={8} lg={8}>
                  <span>{props.t('City')}</span>
                  <p>{values.permanentAddress?.city || '-'}</p>
                </Col>
                <Col xs={24} sm={24} md={8} lg={8}>
                  <span>{props.t('State')}</span>
                  <p>{values.permanentAddress?.state || '-'}</p>
                </Col>
                <Col xs={24} sm={24} md={8} lg={8}>
                  <span>{props.t('PostalCode')}</span>
                  <p>{values.permanentAddress?.postalCode || '-'}</p>
                </Col>
                <Col xs={24} sm={24} md={8} lg={8}>
                  <span>{props.t('Country')}</span>
                  <p>{values.permanentAddress?.country || '-'}</p>
                </Col>
                <Col xs={24} sm={24} md={8} lg={8}>
                  <span>{props.t('Neighborhood')}</span>
                  <p>{values.permanentAddress?.neighborhood || '-'}</p>
                </Col>
                <Col xs={24} sm={24} md={8} lg={8}>
                  <span>{props.t('Additional No')}</span>
                  <p>{values.permanentAddress?.additionalNo || '-'}</p>
                </Col>
              </Row>
            </div>
          )}
          {editable && (
            <div className="position-relative ">
              <div
                className="same-as-shipping-container mt-3"
                onClick={() => props.setFieldValue('permanentAddress', values.currentAddress)}>
                <i className="flaticon-plus" /> Same as Current Address
              </div>
              <Row justify="left" gutter={(12, 10)}>
                <Col xs={24} sm={24} md={8} lg={8}>
                  <div className="form-field">
                    <Field name="permanentAddress.buildingNo" label="Building No" />
                  </div>
                </Col>
                <Col xs={24} sm={24} md={8} lg={8}>
                  <div className="form-field">
                    <Field name="permanentAddress.street" label="Street" />
                  </div>
                </Col>
                <Col xs={24} sm={24} md={8} lg={8}>
                  <div className="form-field">
                    <Field name="permanentAddress.additionalStreet" label="Additional Street" />
                  </div>
                </Col>
                <Col xs={24} sm={24} md={8} lg={8}>
                  <div className="form-field">
                    <Field name="permanentAddress.city" label="City" />
                  </div>
                </Col>
                <Col xs={24} sm={24} md={8} lg={8}>
                  <div className="form-field">
                    <Field name="permanentAddress.state" label="State" />
                  </div>
                </Col>
                <Col xs={24} sm={24} md={8} lg={8}>
                  <div className="form-field">
                    <Field name="permanentAddress.postalCode" label="Postal Code" />
                  </div>
                </Col>
                <Col xs={24} sm={24} md={8} lg={8}>
                  <div className="form-field">
                    <Field name="permanentAddress.country" label="Country" as="select" options={COUNTRIES} />
                  </div>
                </Col>
                <Col xs={24} sm={24} md={8} lg={8}>
                  <div className="form-field">
                    <Field name="permanentAddress.neighborhood" label="Neighborhood" />
                  </div>
                </Col>
                <Col xs={24} sm={24} md={8} lg={8}>
                  <div className="form-field">
                    <Field name="permanentAddress.additionalNo" label="Additional No" />
                  </div>
                </Col>
              </Row>
            </div>
          )}
        </Panel>
      </Collapse>
    </Space>
  )
}

export default withTranslation()(ContactDetails)
