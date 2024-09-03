import { Button, Col, Row } from 'antd'
import React from 'react'
import { withTranslation } from 'react-i18next'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { login } from '../../Actions/UserAction'
import darklogo from '../../assets/images/logo.png'
import InputBox from '../../Components/InputBox/InputBox'
import '../EmailVerification/EmailVerification.scss'
import './Login.scss'

class Login extends React.Component {
  constructor() {
    super()
    this.state = {
      email: '',
      password: '',
      isSubmit: false
    }
  }

  componentDidMount() {
    const currentUser = localStorage.getItem('ACCOUNTING_USER')

    if (currentUser) {
      this.props.history('/app/dashboard')
    }
  }

  onChangeText = (value, type) => {
    this.setState({ [type]: value })
  }

  onLogin = () => {
    const { email, password } = this.state
    const validateFields = ['email', 'password']
    let flag = true
    validateFields.map((data) => {
      if (this[data] && this[data].error) {
        flag = false
      }

      return true
    })

    if (flag) {
      this.props.dispatch(login({ email, password })).then((userData) => {
        if (userData) {
          localStorage.setItem('ACCOUNTING_USER', userData.token)
          this.props.history(userData.result.company ? '/app/dashboard' : '/app/manage-company')
        }
      })
    } else {
      this.setState({ isSubmit: true })
    }
  }

  render() {
    return (
      <section className="dltdocs-login-section">
        <Row justify="center">
          <Col xs={{ span: 23 }} sm={{ span: 23 }} md={{ span: 20 }} lg={{ span: 20 }}>
            <Row gutter={(24, 24)}>
              <Col
                xs={{ span: 24, order: 1 }}
                sm={{ span: 24, order: 1 }}
                md={{ span: 12, order: 1 }}
                lg={{ span: 14, order: 1 }}>
                <h1 className="login-text">
                  {this.props.t('Discover the Easy-to-Use Cloud ERP Software Built for Small,')}
                  {this.props.t('Medium and Enterprise Companies')}
                </h1>
              </Col>
              <Col
                xs={{ span: 24, order: 1 }}
                sm={{ span: 24, order: 1 }}
                md={{ span: 12, order: 1 }}
                lg={{ span: 10, order: 1 }}>
                <div className="login-register-fields">
                  <div className="fields-holder">
                    <Link to="/">
                      <img className="logo" src={darklogo} alt="Accqrate" />
                    </Link>
                    <h1 className="mt-0 mb-1">{this.props.t('Welcome')} </h1>
                    <h2 className="mt-0 mb-3">{this.props.t('Sign in to Accqrate')}</h2>
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
                        <InputBox
                          refs={(ref) => (this.Password = ref)}
                          placeholder="Password"
                          id="password"
                          value={this.state.password}
                          isSubmit={this.state.isSubmit}
                          prefix="flaticon-locked-1"
                          type="password"
                          onChangeText={this.onChangeText}
                        />
                      </div>
                      <div className="form-fields">
                        <Button className="text-uppercase" onClick={this.onLogin} type="primary">
                          {this.props.t('Sign in')}
                        </Button>
                      </div>
                      <div className="form-fields forgot-passsword">
                        <Link to="/forgot-password">{this.props.t('Forgot Password ?')}</Link>
                      </div>
                      {/* <Divider />
                      <div className="social-login">
                        <h4>Login instantly</h4>
                        <Button>
                          <img src={googleicon} alt="Google" /> Google
                        </Button>
                        <Button>
                          <img src={facebookicon} alt="Facebook" /> Facebook
                        </Button>
                      </div> */}
                    </form>
                  </div>
                </div>
              </Col>
              {/* <Col
                xs={{ span: 24, order: 2 }}
                sm={{ span: 24, order: 2 }}
                md={{ span: 11, order: 1 }}
                lg={{ span: 11, order: 1 }}>
                <div className="login-description">
                  <div className="content">
                    <img src={loginImage} alt="Accqrate | Accounting Software Login" />

                    <h2 className="mt-3 mb-0">
                      Don&apos;t miss to track of your company progress. Sign in to stay updated.
                    </h2>
                  </div>
                </div>
              </Col> */}
            </Row>
          </Col>
        </Row>
      </section>
    )
  }
}

function mapStateToProps(state) {
  return {
    userInfo: state.users.userInfo
  }
}

export default connect(mapStateToProps)(withTranslation()(Login))
