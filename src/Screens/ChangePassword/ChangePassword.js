import { Col, message, Row } from 'antd'
import React from 'react'
import { connect } from 'react-redux'
import { changePassword } from '../../Actions/UserAction'
import forgotpasswordImage from '../../assets/images/forgot-password.png'
import ButtonBox from '../../Components/ButtonBox/ButtonBox'
import InputBox from '../../Components/InputBox/InputBox'
import '../EmailVerification/EmailVerification.scss'
import '../Login/Login.scss'

class ChangePassword extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      oldPassword: '',
      password: '',
      confirmPassword: ''
    }
  }

  onChangeText = (value, type) => {
    this.setState({ [type]: value })
  }

  onChangePassword = () => {
    const { oldPassword, password } = this.state
    const validateFields = ['oldPassword', 'password', 'confirmPassword']
    let flag = true
    validateFields.map((data) => {
      if (this[data] && this[data].error) {
        flag = false
      }

      return true
    })

    if (flag) {
      changePassword(this.props.userInfo.id, { oldPassword, password }).then((user) => {
        if (user) {
          message.success('Password Updated')
          this.setState({ oldPassword: '', password: '', confirmPassword: '' })
        }
      })
    } else {
      this.setState({ isSubmit: true })
    }
  }

  render() {
    return (
      <section className="login-register change-password">
        <div className="container-fluid">
          <Row justify="center">
            <Col xs={{ span: 23 }} sm={{ span: 23 }} md={{ span: 20 }} lg={{ span: 20 }}>
              <Row justify="left" gutter={[20, 20]}>
                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 12 }}>
                  <div className="left-side-image box-shadow">
                    <img src={forgotpasswordImage} alt="Accounting Software Login" />
                    {/* <h2><Link to="/register"><span>Don't have an account?</span> Create New</Link></h2> */}
                    <h3>In Order to protect your account.make sure your password:</h3>
                    <ul>
                      <li>Is longer than 7 character</li>
                      <li>
                        Does not match or significantly contain you username, e.g. do not use
                        &apos;username123&apos;.
                      </li>
                    </ul>
                  </div>
                </Col>
                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 12 }}>
                  <div className="login-register-fields">
                    <h2>Change Password</h2>
                    <form>
                      <div className="form-fields">
                        <InputBox
                          label="Old Password"
                          refs={(ref) => (this.oldPassword = ref)}
                          id="oldPassword"
                          value={this.state.oldPassword}
                          onChangeText={this.onChangeText}
                          isSubmit={this.state.isSubmit}
                          type="password"
                          inputType="password"
                          prefix={<i className="flaticon-locked" />}
                        />
                      </div>
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
                        <ButtonBox type="primary" onClick={this.onChangePassword}>
                          Change Password
                        </ButtonBox>
                      </div>
                    </form>
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
      </section>
    )
  }
}

function mapStateToProps(state) {
  return {
    userInfo: state.users.userInfo
  }
}

export default connect(mapStateToProps)(ChangePassword)
