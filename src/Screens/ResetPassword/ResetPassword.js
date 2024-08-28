import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons'
import { Button, Col, Input, Row } from 'antd'
import React from 'react'
import forgotpasswordImage from '../../assets/images/reset-password.png'
import '../EmailVerification/EmailVerification.scss'
import '../Login/Login.scss'

export default class ResetPassword extends React.PureComponent {
  render() {
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
                      <h1>Reset Password</h1>
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
                      {/* <h2><Link to="/register"><span>Don't have an account?</span> Create New</Link></h2> */}
                    </div>
                  </Col>
                  <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 12 }}>
                    <div className="login-register-fields">
                      <h1>Reset Password</h1>
                      <p>Please enter the new password to reset the older password.</p>
                      <form>
                        <div className="form-fields">
                          <Input.Password
                            placeholder="New Password"
                            id="new-password"
                            prefix={<i className="flaticon-locked" />}
                            iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                          />
                        </div>
                        <div className="form-fields">
                          <Input.Password
                            placeholder="Confirm Password"
                            id="confim-password"
                            prefix={<i className="flaticon-locked" />}
                            iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                          />
                        </div>

                        <div className="form-fields">
                          <Button type="primary">Change Password</Button>
                        </div>
                      </form>
                    </div>
                  </Col>
                </Row>
              </Col>
            </Row>
          </div>
        </section>
      </>
    )
  }
}
