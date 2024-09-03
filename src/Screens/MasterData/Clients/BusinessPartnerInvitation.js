import { Col, message, Row } from 'antd'
import React from 'react'
import { closeToken, createCompanyByInvitation, validateToken } from '../../../Actions/UserAction'
import ButtonBox from '../../../Components/ButtonBox/ButtonBox'
import InputBox from '../../../Components/InputBox/InputBox'
import LoaderBox from '../../../Components/LoaderBox/LoaderBox'

export default class BusinessPartnerInvitation extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loader: 'Validating link! Please wait',
      tokenData: false,
      currentStep: 0,
      password: ''
    }
    this.validateTokenData(props)
  }

  validateTokenData = (props) => {
    const { token } = props.match.params
    validateToken(token).then((result) => {
      if (result) {
        this.setState({ loader: false, tokenData: result })
      } else {
        this.setState({ loader: false })
      }
    })
  }

  onChangeText = (value, type) => {
    this.setState({ [type]: value })
  }

  onAccept = () => {
    const { password, tokenData } = this.state

    if (password !== '') {
      const { token } = this.props.match.params
      const obj = {
        token,
        email: tokenData.entityEmail,
        password,
        name: 'Admin User',
        companyName: tokenData.entityData.name,
        client: tokenData.entityId
      }
      createCompanyByInvitation(obj).then((result) => {
        if (result) {
          this.setState({ invitaionMessage: 'Invitaion accepted successfully ' })
        }
      })
    } else {
      message.error('Please enter passord')
    }
  }

  onReject = () => {
    const { token } = this.props.match.params
    closeToken(token).then((result) => {
      if (result) {
        this.setState({ invitaionMessage: 'Invitaion Rejected' })
      }
    })
  }

  render() {
    const { tokenData, loader, currentStep, invitaionMessage } = this.state

    return (
      <>
        <LoaderBox loader={loader} noData={tokenData ? false : 'Invalid link or link got expired'} />

        {tokenData && (
          <div className="loading-content">
            {invitaionMessage ? (
              <Row justify="center" style={{ padding: 30 }}>
                <Col
                  xs={{ span: 23 }}
                  sm={{ span: 23 }}
                  md={{ span: 22 }}
                  lg={{ span: 18 }}
                  style={{ paddingRight: 10 }}>
                  <div style={{ fontSize: 22, minWidth: 320 }}>{invitaionMessage}</div>
                  <br />
                  <ButtonBox onClick={() => this.props.history('/login')}>Login</ButtonBox>
                </Col>
              </Row>
            ) : (
              <Row justify="center" style={{ padding: 30 }}>
                <Col
                  xs={{ span: 23 }}
                  sm={{ span: 23 }}
                  md={{ span: 22 }}
                  lg={{ span: 18 }}
                  style={{ paddingRight: 10 }}>
                  <div style={{ fontSize: 22 }}>
                    <b>{tokenData.companyData.name}</b> wants to add you as business partner, for{' '}
                    {tokenData.entityData.name}
                  </div>
                </Col>
                {currentStep === 0 && (
                  <Col
                    xs={{ span: 23 }}
                    sm={{ span: 23 }}
                    md={{ span: 22 }}
                    lg={{ span: 18 }}
                    style={{ paddingRight: 10 }}>
                    <div style={{ paddingTop: 10, fontSize: 16, width: 'fit-content' }}>
                      <div>
                        <b>Company Name:</b> {tokenData.entityData.name}
                      </div>
                      <div style={{ paddingTop: 10 }}>
                        <b>Primary Email:</b> {tokenData.entityEmail}
                      </div>
                      <div style={{ paddingTop: 10 }}>
                        <b>Currency:</b> {tokenData.entityData.currency}
                      </div>
                      <div style={{ paddingTop: 10 }}>
                        <ButtonBox onClick={() => this.setState({ currentStep: 1 })}>
                          Accept and continue
                        </ButtonBox>
                        &nbsp;&nbsp;
                        <ButtonBox type="default" onClick={() => this.onReject()}>
                          Reject
                        </ButtonBox>
                      </div>
                    </div>
                  </Col>
                )}
                {currentStep === 1 && (
                  <Col
                    xs={{ span: 23 }}
                    sm={{ span: 23 }}
                    md={{ span: 22 }}
                    lg={{ span: 18 }}
                    style={{ paddingRight: 10 }}>
                    <div style={{ paddingTop: 10, fontSize: 16, width: 'fit-content' }}>
                      <div>
                        <b>Please enter password for {tokenData.entityEmail}</b>
                      </div>
                      <div style={{ paddingTop: 10 }}>
                        {' '}
                        <InputBox
                          label="Password"
                          refs={(ref) => (this.password = ref)}
                          id="password"
                          value={this.state.password}
                          onChangeText={this.onChangeText}
                          type="password"
                        />
                      </div>
                      <div style={{ paddingTop: 10 }}>
                        <ButtonBox onClick={this.onAccept}>Confirm</ButtonBox>&nbsp;&nbsp;
                      </div>
                    </div>
                  </Col>
                )}
                <Col
                  xs={{ span: 23 }}
                  sm={{ span: 23 }}
                  md={{ span: 22 }}
                  lg={{ span: 18 }}
                  style={{ paddingRight: 10 }}>
                  {/* <div>Company Name: {tokenData.entityData.name}</div>
                            <div>Primary Email: {tokenData.entityEmail}</div> */}
                </Col>
              </Row>
            )}
          </div>
        )}
      </>
    )
  }
}
