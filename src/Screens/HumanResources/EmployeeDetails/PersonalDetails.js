import { Col, Row } from 'antd'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { Field } from '../../../Components/Formik'
import Panel from '../../../Layout/Panel'
import apiClient from '../../../Util/apiClient'
import { useTranslation } from 'react-i18next'


// const Schema = Yup.object().shape({
//   dob: Yup.date().required(),
//   bloodGroup: Yup.string().required(),
//   drivingLicenseNo: Yup.string().required(),
//   drivingLicenseExpiryDate: Yup.date().required(),
//   nationality: Yup.string().required(),
//   maritalStatus: Yup.string().required(),
//   gender: Yup.string().required(),
//   panCardNo: Yup.string().required()
// })


const {t} = useTranslation()


const PersonalDetails = (props) => {
  const { editable, values = {} } = props
  const [options, setOptions] = useState({})

  useEffect(() => {
    if (editable) {
      fetchDropdownValues()
    }
  }, [props.editable])

  const fetchDropdownValues = () => {
    apiClient
      .get('options/get-by-types', {
        params: { type: ['BloodGroup', 'Nationality', 'MaritalStatus', 'Gender'] }
      })
      .then(({ data }) => {
        if (data && data.result) {
          setOptions(data.result)
        }
      })
  }

  return (
    <Panel title={t('Personal Details')}>
      {!editable && (
        <div className="panel-with-border">
          <Row justify="left" gutter={(12, 10)}>
            <Col xs={24} sm={24} md={8} lg={8}>
              <span>Social ID</span>
              <p>{values?.socialId || 'N/A'}</p>
            </Col>
            <Col xs={24} sm={24} md={8} lg={8}>
              <span>Date of Birth</span>
              <p>{values?.dob ? moment(values?.dob).format('DD-MMM-YYYY') : 'N/A'}</p>
            </Col>
            <Col xs={24} sm={24} md={8} lg={8}>
              <span>Blood Group</span>
              <p>{values?.bloodGroup || 'N/A'}</p>
            </Col>

            <Col xs={24} sm={24} md={8} lg={8}>
              <span>Driving License No</span>
              <p>{values?.drivingLicenseNo || 'N/A'}</p>
            </Col>
            <Col xs={24} sm={24} md={8} lg={8}>
              <span>Driving License Valid To</span>
              <p>
                {values?.drivingLicenseExpiryDate
                  ? moment(values?.drivingLicenseValidFrom).format('DD-MMM-YYYY')
                  : 'N/A'}
              </p>
            </Col>
            <Col xs={24} sm={24} md={8} lg={8}>
              <span>Driving License Valid To</span>
              <p>
                {values?.drivingLicenseExpiryDate
                  ? moment(values?.drivingLicenseValidTo).format('DD-MMM-YYYY')
                  : 'N/A'}
              </p>
            </Col>

            <Col xs={24} sm={24} md={8} lg={8}>
              <span>Nationality</span>
              <p>{values?.nationality || 'N/A'}</p>
            </Col>
            <Col xs={24} sm={24} md={8} lg={8}>
              <span>Marital Status</span>
              <p>{values?.maritalStatus || 'N/A'}</p>
            </Col>
            <Col xs={24} sm={24} md={8} lg={8}>
              <span>Gender</span>
              <p>{values?.gender || 'N/A'}</p>
            </Col>
            {/* <Col xs={24} sm={24} md={8} lg={8}>
              <span>Pan Card No</span>
              <p>{values?.panCardNo || 'N/A'}</p>
            </Col> */}
          </Row>
        </div>
      )}
      {editable && (
        <Row justify="left" gutter={(12, 10)}>
          <Col xs={24} sm={24} md={8} lg={8}>
            <div className="form-field">
              <Field name="socialId" label="Social ID" />
            </div>
          </Col>
          <Col xs={24} sm={24} md={8} lg={8}>
            <div className="form-field">
              <Field name="dob" label="Date of Birth" as="date" />
            </div>
          </Col>
          <Col xs={24} sm={24} md={8} lg={8}>
            <div className="form-field">
              <Field name="bloodGroup" label="Blood Group" />
            </div>
          </Col>

          <Col xs={24} sm={24} md={8} lg={8}>
            <div className="form-field">
              <Field name="drivingLicenseNo" label="Driving License No" />
            </div>
          </Col>
          <Col xs={24} sm={24} md={8} lg={8}>
            <div className="form-field">
              <Field name="drivingLicenseValidFrom" label="Driving License Valid From" as="date" />
            </div>
          </Col>
          <Col xs={24} sm={24} md={8} lg={8}>
            <div className="form-field">
              <Field name="drivingLicenseValidTo" label="Driving License Valid To" as="date" />
            </div>
          </Col>

          <Col xs={24} sm={24} md={8} lg={8}>
            <div className="form-field">
              <Field name="nationality" label="Nationality" as="select" options={options.Nationality || []} />
            </div>
          </Col>
          <Col xs={24} sm={24} md={8} lg={8}>
            <div className="form-field">
              <Field
                name="maritalStatus"
                label="Marital Status"
                as="select"
                options={options.MaritalStatus || []}
              />
            </div>
          </Col>
          <Col xs={24} sm={24} md={8} lg={8}>
            <div className="form-field">
              <Field name="gender" label="Gender" as="select" options={options.Gender || []} />
            </div>
          </Col>
          {/* <Col xs={24} sm={24} md={8} lg={8}>
            <div className="form-field">
              <Field name="panCardNo" label="Pan Card" />
            </div>
          </Col> */}
        </Row>
      )}
    </Panel>
  )
}

export default PersonalDetails
