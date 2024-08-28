import { Col, message, Row } from 'antd'
import { withFormik } from 'formik'
import React from 'react'
import { Link } from 'react-router-dom'
import * as Yup from 'yup'
import ButtonBox from '../../Components/ButtonBox/ButtonBox'
import { Field, Form } from '../../Components/Formik'
import T from '../../Components/Translate/Translate'
import apiClient from '../../Util/apiClient'
import './Home.scss'

const MODULES = [
  { label: 'E-Invoicing Solution', value: 'E-Invoicing Solution' },
  { label: 'Digital signatures', value: 'Digital signatures' },
  { label: 'Finance Management', value: 'Finance Management' },
  { label: 'Service Management', value: 'Service Management' },
  { label: 'Logistics Management', value: 'Logistics Management' },
  { label: 'HR & Payroll', value: 'HR & Payroll' }
]

const Schema = Yup.object().shape({
  name: Yup.string().required('is required'),
  email: Yup.string().email().required('is required')
})

function BookDemo({ submitForm }) {
  return (
    <Form>
      <Row justify="center" gutter={[20]}>
        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 12 }}>
          <div className="form-fields">
            <Field name="name" placeholder="Name" />
          </div>
        </Col>
        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 12 }}>
          <div className="form-fields">
            <Field name="email" placeholder="Email" />
          </div>
        </Col>
        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 12 }}>
          <div className="form-fields">
            <Field name="phone" placeholder="Phone" />
          </div>
        </Col>
        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 12 }}>
          <div className="form-fields">
            <Field name="companyName" placeholder="Company Name" />
          </div>
        </Col>
        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 24 }}>
          <div className="form-fields">
            <Field name="country" placeholder="Country" />
          </div>
        </Col>
        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 24 }}>
          <div className="form-fields">
            <Field name="industry" placeholder="Industry" />
          </div>
        </Col>
        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 24 }}>
          <div className="form-fields">
            <Field name="modules" placeholder="Modules" as="select" options={MODULES} mode="multiple" />
          </div>
        </Col>
        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 24 }}>
          <h3 className="mb-3">
            <T>
              By completing this form, I agree that Accqrate may keep me informed of its products, services
              and offerings. To view our privacy policy
            </T>
            ,
            <Link to="./privacy-policy" target="_blank">
              <T>click here</T>
            </Link>
            .
          </h3>
        </Col>
      </Row>
      <Row justify="center" gutter={[20]}>
        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 24 }}>
          <div className="form-fields submit-button">
            <ButtonBox onClick={() => submitForm()} type="primary" className="btn-large">
              <T>Book a Demo</T>
            </ButtonBox>
          </div>
        </Col>
      </Row>
    </Form>
  )
}

export default withFormik({
  mapPropsToValues: () => ({
    name: '',
    email: '',
    phone: '',
    companyName: '',
    country: '',
    industry: '',
    modules: []
  }),
  validationSchema: Schema,
  handleSubmit: (data, { resetForm }) => {
    apiClient.post('book-demos/add', data).then(({ data }) => {
      if (data && data.result) {
        resetForm()
        message.success('Thank you for booking a demo! Our Accqrate team will reach you shortly')
      }
    })
  }
})(BookDemo)
