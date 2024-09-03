import { Col, Row } from 'antd'
// import { withFormik } from 'formik' // Import withFormik and Form from Formik
import { useEffect, useState } from 'react'
import { withTranslation } from 'react-i18next'
// import * as Yup from 'yup'
import { Field, Form } from '../../../Components/Formik'
import apiClient from '../../../Util/apiClient'

// const Schema = Yup.object().shape({
//   name: Yup.string().required(),
//   relationship: Yup.string().required(),
//   homeTelephone: Yup.string()
//     .matches(/^\d{10}$/, 'Home telephone number must be exactly 10 digits')
//     .required('Home telephone number is required'),
//   mobile: Yup.string()
//     .matches(/^\d{10}$/, 'Mobile number must be exactly 10 digits')
//     .required('Mobile number is required'),
//   workTelephone: Yup.string()
//     .matches(/^\d{10}$/, 'Work telephone number must be exactly 10 digits')
//     .required('Work telephone number is required')
// })

const EmergencyDetailsForm = (props) => {
  const [options, setOptions] = useState({})

  const fetchDropdownValues = () => {
    apiClient
      .get('options/get-by-types', {
        params: { type: ['Relationship'] }
      })
      .then(({ data }) => {
        if (data && data.result) {
          console.log('data.result', data)
          setOptions(data.result)
        }
      })
  }

  useEffect(() => {
    fetchDropdownValues()
  }, [])

  return (
    <Form>
      <Row justify="left" gutter={(12, 10)}>
        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 12 }}>
          <div className="form-field">
            <Field name="name" label={props.t('Name')} type="text" />
          </div>
        </Col>
        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 12 }}>
          <div className="form-field">
            <Field
              name="relationship"
              label={props.t('Relationship')}
              as="select"
              options={
                options.Relationship?.map?.((relationship) => ({
                  ...relationship,
                  label: props.t(relationship.label)
                })) || []
              }
            />
          </div>
        </Col>
        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 12 }}>
          <div className="form-field">
            <Field name="homeTelephone" label={props.t('Home Telephone')} type="number" />
          </div>
        </Col>
        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 12 }}>
          <div className="form-field">
            <Field name="mobile" label={props.t('Mobile')} type="number" />
          </div>
        </Col>
        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 12 }}>
          <div className="form-field">
            <Field name="workTelephone" label={props.t('Work Telephone')} type="number" />
          </div>
        </Col>
      </Row>
    </Form>
  )
}

export default withTranslation()(EmergencyDetailsForm)
