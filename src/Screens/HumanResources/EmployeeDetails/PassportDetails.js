import { CaretRightOutlined } from '@ant-design/icons'
import { Col, Collapse, Row } from 'antd'
import moment from 'moment'
import { useEffect, useState } from 'react'
import { withTranslation } from 'react-i18next'
import { Field } from '../../../Components/Formik'
import apiClient from '../../../Util/apiClient'

const { Panel } = Collapse

const PassportDetails = (props) => {
  const { values, editable } = props
  const [options, setOptions] = useState({})

  useEffect(() => {
    if (editable) {
      fetchDropdownValues()
    }
  }, [editable])

  const fetchDropdownValues = () => {
    apiClient
      .get('options/get-by-types', {
        params: { type: ['TypeOfVisa', 'TypeOfVisaEntry'] }
      })
      .then(({ data }) => {
        if (data && data.result) {
          setOptions(data.result)
        }
      })
  }

  return (
    <Collapse
      collapsible="header"
      expandIconPosition="right"
      expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 270 : 90} />}
      bordered>
      <Panel style={{ fontSize: 16, fontWeight: 'bold' }} header={props.t('Passport / Visa Details')} key="4">
        {!editable && (
          <div className="basic-details">
            <Row justify="left" gutter={(12, 10)}>
              <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 8 }}>
                <span>{props.t('Passport issued Country')}</span>
                <p>{values.passportIssuedCountry || '-'}</p>
              </Col>
              <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 8 }}>
                <span>{props.t('Passport No')}</span>
                <p>{values.passportNo || '-'}</p>
              </Col>
              <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 8 }}>
                <span>{props.t('Name As In Passport')}</span>
                <p>{values.nameAsPassport || '-'}</p>
              </Col>
              <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 8 }}>
                <span>{props.t('Passport Valid From')}</span>
                <p>
                  {values.passportValidFrom ? moment(values.passportValidFrom).format('DD-MMM-YYYY') : '-'}
                </p>
              </Col>
              <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 8 }}>
                <span>{props.t('Passport Valid To')}</span>
                <p>{values.passportValidTo ? moment(values.passportValidTo).format('DD-MMM-YYYY') : '-'}</p>
              </Col>
              <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 8 }}>
                <span>{props.t('Issue On')}</span>
                <p>{values.issueon || '-'}</p>
              </Col>
              <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 8 }}>
                <span>{props.t('Visa held for country')}</span>
                <p>{values.visaHeldForCountry || '-'}</p>
              </Col>
              <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 8 }}>
                <span>{props.t('Type of Visa')}</span>
                <p>{values.typeOfVisa || '-'}</p>
              </Col>
              <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 8 }}>
                <span>{props.t('Type Of Visa Entry')}</span>
                <p>{values?.typeOfVisaEntry || '-'}</p>
              </Col>
              <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 8 }}>
                <span>{props.t('Visa Valid From')}</span>
                <p>{values.visaValidFrom ? moment(values.visaValidFrom).format('DD-MMM-YYYY') : '-'}</p>
              </Col>
              <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 8 }}>
                <span>{props.t('Visa Valid To')}</span>
                <p>{values.visaValidTo ? moment(values.visaValidTo).format('DD-MMM-YYYY') : '-'}</p>
              </Col>
              <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 8 }}>
                <span>{props.t('Permit Country')}</span>
                <p>{values?.permitcountry || '-'}</p>
              </Col>
              <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 8 }}>
                <span>{props.t('Permit No')}</span>
                <p>{values?.permitno || '-'}</p>
              </Col>
              <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 8 }}>
                <span>{props.t('Date of entry')}</span>
                <p>{values.dateofentry ? moment(values.dateofentry).format('DD-MMM-YYYY') : '-'}</p>
              </Col>
              <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 8 }}>
                <span>{props.t('Valid From')}</span>
                <p>{values.validfrom ? moment(values.validfrom).format('DD-MMM-YYYY') : '-'}</p>
              </Col>
              <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 8 }}>
                <span>{props.t('Valid To')}</span>
                <p>{values.validto ? moment(values.validto).format('DD-MMM-YYYY') : '-'}</p>
              </Col>
              <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 8 }}>
                <span>{props.t('Issued On')}</span>
                <p>{values.issuedon ? moment(values.issuedon).format('DD-MMM-YYYY') : '-'}</p>
              </Col>
            </Row>
          </div>
        )}
        {editable && (
          <div>
            <Row justify="left" gutter={(12, 10)}>
              <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 8 }}>
                <div className="form-field">
                  <Field name="passportIssuedCountry" label="Passport issued Country" />
                </div>
              </Col>
              <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 8 }}>
                <div className="form-field">
                  <Field name="passportNo" label="Passport No" />
                </div>
              </Col>
              <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 8 }}>
                <div className="form-field">
                  <Field name="nameAsPassport" label="Name As In Passport" />
                </div>
              </Col>
              <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 8 }}>
                <div className="form-field">
                  <Field name="passportValidFrom" label="Passport Valid From" as="date" />
                </div>
              </Col>
              <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 8 }}>
                <div className="form-field">
                  <Field name="passportValidTo" label="Passport Valid To" as="date" />
                </div>
              </Col>
              <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 8 }}>
                <div className="form-field">
                  <Field name="issueon" label="Issue on" as="date" />
                </div>
              </Col>

              {/* <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 8 }}>
              <div className="form-field">
                <Field name="visa" label="Visa" as="select" options={YES_NO_OPTIONS} />
              </div>
            </Col> */}

              <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 8 }}>
                <div className="form-field">
                  <Field name="visaHeldForCountry" label="Visa held for country" />
                </div>
              </Col>

              <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 8 }}>
                <div className="form-field">
                  <Field
                    name="typeOfVisa"
                    label="Type of Visa"
                    as="select"
                    options={options.TypeOfVisa || []}
                  />
                </div>
              </Col>
              <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 8 }}>
                <div className="form-field">
                  <Field
                    name="typeOfVisaEntry"
                    label="Type Of Visa Entry"
                    as="select"
                    options={options.TypeOfVisaEntry || []}
                  />
                </div>
              </Col>

              <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 8 }}>
                <div className="form-field">
                  <Field name="visaValidFrom" label="Visa Valid From" as="date" />
                </div>
              </Col>
              <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 8 }}>
                <div className="form-field">
                  <Field name="visaValidTo" label="Visa Valid To" as="date" />
                </div>
              </Col>

              <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 8 }}>
                <div className="form-field">
                  <Field name="permitcountry" label="Permit Country" />
                </div>
              </Col>
              <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 8 }}>
                <div className="form-field">
                  <Field name="permitno" label="Permit No" />
                </div>
              </Col>
              <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 8 }}>
                <div className="form-field">
                  <Field name="dateofentry" label="Date of entry" as="date" />
                </div>
              </Col>
              <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 8 }}>
                <div className="form-field">
                  <Field name="validfrom" label="Valid From" as="date" />
                </div>
              </Col>
              <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 8 }}>
                <div className="form-field">
                  <Field name="validto" label="Valid To" as="date" />
                </div>
              </Col>
              <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 8 }}>
                <div className="form-field">
                  <Field name="issuedon" label="Issued on" as="date" />
                </div>
              </Col>
            </Row>
          </div>
        )}
      </Panel>
    </Collapse>
  )
}

export default withTranslation()(PassportDetails)
