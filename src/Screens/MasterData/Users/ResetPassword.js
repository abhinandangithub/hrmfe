import { Col, message, Row } from 'antd'
import React from 'react'
import { connect } from 'react-redux'
import { resetUserPasword } from '../../../Actions/UserAction'
import InputBox from '../../../Components/InputBox/InputBox'
import ModalBoxFooter from '../../../Components/ModalBox/ModalBoxFooter'

class ResetPassword extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isSubmit: false,
      password: ''
    }
  }

  onChangeText = (value, type) => {
    this.setState({ [type]: value })
  }

  onSave = () => {
    const { password } = this.state
    const validateFields = ['password']
    let flag = true
    validateFields.map((data) => {
      if (this[data] && this[data].error) {
        flag = false
      }

      return true
    })

    if (flag) {
      resetUserPasword(this.props.selectedUser.user, { password }).then((user) => {
        if (user) {
          message.success('Password reset done')
          this.props.onCancel()
        }
      })
    } else {
      this.setState({ isSubmit: true })
    }
  }

  render() {
    return (
      <Row>
        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 24 }}>
          <div className="form-field">
            <InputBox
              label="Password"
              refs={(ref) => (this.password = ref)}
              id="password"
              value={this.state.password}
              onChangeText={this.onChangeText}
              isSubmit={this.state.isSubmit}
              type="password"
            />
          </div>
        </Col>
        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 24 }}>
          <ModalBoxFooter
            loader={this.state.buttonLoader}
            okText="Reset Now"
            onOk={() => this.onSave()}
            onCancel={() => this.props.onCancel()}
          />
        </Col>
      </Row>
    )
  }
}

function mapStateToProps(state) {
  return {
    userInfo: state.users.userInfo,
    companyInfo: state.users.companyInfo
  }
}

export default connect(mapStateToProps)(ResetPassword)
