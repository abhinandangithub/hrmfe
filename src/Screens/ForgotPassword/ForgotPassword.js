import { Button, Col, message, Row } from 'antd'
import React from 'react'
import ReactCodeInput from 'react-verification-code-input'
import forgotpasswordImage from '../../assets/images/password-reset.png'
import InputBox from '../../Components/InputBox/InputBox'
import apiClient from '../../Util/apiClient'
import '../EmailVerification/EmailVerification.scss'
import '../Login/Login.scss'

export default class ForgotPassword extends React.PureComponent {
  constructor() {
    super()
    this.state = {
      currentView: 'email',
      email: '',
      otp: '',
      password: '',
      confirmPassword: ''
    }
  }

  onSend = () => {
    const { email } = this.state
    const validateFields = ['email']
    let flag = true
    validateFields.forEach((data) => {
      if (this[data] && this[data].error) {
        flag = false
      }
    })

    if (flag) {
      apiClient.post('users/forgotPassword', { email }).then(({ data }) => {
        if (data && data.result) {
          this.setState({ currentView: 'verify', isSubmit: false })
        }
      })
    } else {
      this.setState({ isSubmit: true })
    }
  }

  onVerify = () => {
    const { email, otp } = this.state

    if (otp !== '') {
      apiClient.post('users/validateForgotPassword', { email, otp }).then(({ data }) => {
        if (data && data.result) {
          this.setState({ currentView: 'reset', isSubmit: false })
        }
      })
    } else {
      message.error('Please enter OTP')
    }
  }

  onResetPassword = () => {
    const { email, otp, password } = this.state
    const validateFields = ['password', 'confirmPassword']
    let flag = true
    validateFields.forEach((data) => {
      if (this[data] && this[data].error) {
        flag = false
      }
    })

    if (flag) {
      apiClient.put('users/resetPassword', { email, otp, password }).then(({ data }) => {
        if (data && data.result) {
          message.success('Password reset done')
          this.props.history('/login')
        }
      })
    } else {
      this.setState({ isSubmit: true })
    }
  }

  onChangeText = (value, type) => {
    this.setState({ [type]: value })
  }

  render() {
    const { currentView } = this.state

    return (
      <>
        {/* Breadcrum starts */}
        <section className="breadcrum-title only-heading">
          <div className="container-fluid">
            <Row justify="center">
              <Col span={21}>
                <Row justify="left">
                  <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 24 }}>
                    <div className="breadcrum-content">
                      <h1>Forgot Password</h1>
                    </div>
                  </Col>
                </Row>
              </Col>
            </Row>
          </div>
        </section>
        {/* breadcrum ends here */}

        <section className="login-register">
          <div className="container-fluid">
            <Row justify="center">
              <Col xs={{ span: 23 }} sm={{ span: 23 }} md={{ span: 20 }} lg={{ span: 20 }}>
                <Row justify="left" gutter={[20, 20]}>
                  <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 12 }}>
                    <div className="left-side-image">
                      <img src={forgotpasswordImage} alt="Accounting Software Login" />
                    </div>
                  </Col>

                  {currentView === 'email' && (
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 12 }}>
                      <div className="login-register-fields">
                        <h1>Forgot Password</h1>
                        <p>
                          Please enter your registered email ID. We will send a verification code to your
                          registered email ID.
                        </p>
                        <form>
                          <div className="form-fields">
                            <InputBox
                              refs={(ref) => (this.email = ref)}
                              placeholder="Email"
                              id="email"
                              value={this.state.email}
                              isSubmit={this.state.isSubmit}
                              onChangeText={this.onChangeText}
                              inputType="email"
                              prefix="flaticon-email-1"
                            />
                          </div>

                          <div className="form-fields">
                            <Button onClick={this.onSend} type="primary">
                              Send Now
                            </Button>
                          </div>
                        </form>
                      </div>
                    </Col>
                  )}
                  {currentView === 'verify' && (
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 12 }}>
                      <div className="login-register-fields">
                        <h1>Email Verification</h1>
                        <p>Please enter the verification code which we have sent to your email ID</p>
                        <form>
                          <div className="form-fields code-verification-field">
                            <ReactCodeInput
                              onChange={(v) => this.onChangeText(v, 'otp')}
                              fieldWidth={40}
                              values={this.state.otp}
                              clasName="verification-code"
                            />
                          </div>

                          <div className="form-fields">
                            <Button onClick={this.onVerify} type="primary">
                              Verify
                            </Button>
                          </div>
                        </form>
                      </div>
                    </Col>
                  )}
                  {currentView === 'reset' && (
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 12 }}>
                      <div className="login-register-fields">
                        <h1>Reset Password</h1>
                        <p>Please enter you new password here</p>
                        <form>
                          <div className="form-fields">
                            <InputBox
                              label="Password"
                              refs={(ref) => (this.password = ref)}
                              id="password"
                              value={this.state.password}
                              onChangeText={this.onChangeText}
                              isSubmit={this.state.isSubmit}
                              type="password"
                              inputType="password"
                              prefix={<i className="flaticon-locked" />}
                            />
                          </div>
                          <div className="form-fields">
                            <InputBox
                              label="Confirm Password"
                              refs={(ref) => (this.confirmPassword = ref)}
                              id="confirmPassword"
                              value={this.state.confirmPassword}
                              onChangeText={this.onChangeText}
                              isSubmit={this.state.isSubmit}
                              password={this.state.password}
                              type="password"
                              inputType="confirmPassword"
                            />
                          </div>

                          <div className="form-fields">
                            <Button onClick={this.onResetPassword} type="primary">
                              Reset Now
                            </Button>
                          </div>
                        </form>
                      </div>
                    </Col>
                  )}
                </Row>
              </Col>
            </Row>
          </div>
        </section>
      </>
    )
  }
}
