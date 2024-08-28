import { Button, Col, Row } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'
import ReactCodeInput from 'react-verification-code-input'
import emailVerification from '../../assets/images/registration-1.png'
import Footer from '../Footer/Footer'
import Header from '../Header/Header'
import '../Login/Login.scss'
import './EmailVerification.scss'

export default class EmailVerification extends React.PureComponent {
  render() {
    return (
      <>
        <Header />

        <section className="login-register">
          <div className="container-fluid">
            <Row justify="center">
              <Col xs={{ span: 23 }} sm={{ span: 23 }} md={{ span: 20 }} lg={{ span: 20 }}>
                <Row justify="left" gutter={[20, 20]}>
                  <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 12 }}>
                    <div className="left-side-image">
                      <img src={emailVerification} alt="Accounting Software Login" />
                      {/* <h2><Link to="/register"><span>Don't have an account?</span> Create New</Link></h2> */}
                    </div>
                  </Col>
                  <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 12 }}>
                    <div className="login-register-fields">
                      <h1>Email Verification</h1>
                      <p>
                        Please enter the verification code. We have sent a verification code to your
                        registered email ID.
                      </p>
                      <form>
                        <div className="form-fields code-verification-field">
                          <ReactCodeInput fieldWidth={20} clasName="verification-code" />
                        </div>

                        <div className="form-fields">
                          <Link to="/reset-password">
                            <Button type="primary">Done</Button>
                          </Link>
                          <div className="resend-code">
                            <Link to="#">Resend code</Link>
                          </div>
                        </div>
                      </form>
                    </div>
                  </Col>
                </Row>
              </Col>
            </Row>
          </div>
        </section>

        <Footer />
      </>
    )
  }
}
