import { Button, Col, message, Row } from 'antd'
import { withFormik } from 'formik'
import React from 'react'
import * as Yup from 'yup'
import contactImage from '../../assets/images/contact.svg'
import { Field, Form } from '../../Components/Formik'
import apiClient from '../../Util/apiClient'
import './Contactus.scss'

const Schema = Yup.object().shape({
  name: Yup.string().required(),
  email: Yup.string().email().required()
})

function CurrencyForm({ submitForm }) {
  return (
    <Form>
      {/* Breadcrum starts */}
      <section className="breadcrum-title">
        <div className="container-fluid">
          <Row justify="center">
            <Col span={21}>
              <Row justify="left" gutter={[20]}>
                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 12 }}>
                  <div className="breadcrum-content">
                    <h1>Contact Us</h1>
                  </div>
                </Col>
                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 12 }}>
                  <img src={contactImage} alt="contact us" />
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
      </section>
      {/* breadcrum ends here */}

      <section className="inner-pages contact-us">
        <div className="container-fluid">
          <Row justify="center">
            <Col xs={{ span: 20 }} sm={{ span: 20 }} md={{ span: 18 }} lg={{ span: 18 }}>
              <Row justify="center" gutter={[20]}>
                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 18 }} lg={{ span: 18 }}>
                  <h1>We would love to hear from you</h1>
                  <p>
                    Whether you have a question about anything, our team is ready to answer all your questions
                  </p>
                  <form action="">
                    <Row justify="center" gutter={[20]}>
                      <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 12 }}>
                        <div className="form-fields">
                          <Field label="Name" name="name" placeholder="John Smith" />
                        </div>
                      </Col>
                      <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 12 }}>
                        <div className="form-fields">
                          <Field label="Email" name="email" placeholder="john-smith@gmail.com" />
                        </div>
                      </Col>
                    </Row>
                    <Row justify="center" gutter={[20]}>
                      <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 12 }}>
                        <div className="form-fields">
                          <Field label="Phone" name="phone" placeholder="+966-1234567890" />
                        </div>
                      </Col>
                      <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 12 }}>
                        <div className="form-fields">
                          <Field
                            label="Company Name"
                            name="companyName"
                            placeholder="ie-(Accqrate Solutions)"
                          />
                        </div>
                      </Col>
                    </Row>
                    <Row justify="center" gutter={[20]}>
                      <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 24 }}>
                        <div className="form-fields">
                          <Field
                            as="textarea"
                            label="Message"
                            name="message"
                            rows={3}
                            placeholder="Type your message here.."
                          />
                        </div>
                      </Col>
                    </Row>
                    <Row justify="center" gutter={[20]}>
                      <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 24 }}>
                        <div className="form-fields submit-button">
                          <Button onClick={() => submitForm()} type="submit" variant="primary">
                            Contact Now
                          </Button>
                        </div>
                      </Col>
                    </Row>
                  </form>
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
      </section>
    </Form>
  )
}

export default withFormik({
  mapPropsToValues: () => ({
    name: '',
    email: '',
    phone: '',
    companyName: '',
    message: ''
  }),
  validationSchema: Schema,
  handleSubmit: (data, { props: { history } }) => {
    apiClient.post('contact-us/add', data).then(({ data }) => {
      if (data && data.result) {
        history('/')
        message.success('Thank you for contacting us! Our Accqrate team will reach you shortly')
      }
    })
  }
})(CurrencyForm)
