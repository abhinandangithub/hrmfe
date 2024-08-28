import { Col, Row } from 'antd'
import React from 'react'
import { connect } from 'react-redux'
import { addRole } from '../../../Actions/UserAction'
import InputBox from '../../../Components/InputBox/InputBox'
import ModalBoxFooter from '../../../Components/ModalBox/ModalBoxFooter'

class RoleForm extends React.Component {
  constructor() {
    super()
    this.state = {
      name: ''
    }
  }

  onChangeText = (value, type) => {
    this.setState({ [type]: value })
  }

  onSave = () => {
    const { name } = this.state
    const validateFields = ['name']
    let flag = true
    validateFields.map((data) => {
      if (this[data] && this[data].error) {
        flag = false
      }

      return true
    })

    if (flag) {
      const obj = { name, company: this.props.companyInfo.id }
      addRole(obj).then((role) => {
        if (role) {
          this.props.onCancel(role, 'Add')
        }
      })
    } else {
      this.setState({ isSubmit: true })
    }
  }

  render() {
    return (
      <Row gutter={[24]}>
        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 24 }}>
          <div className="form-fields">
            <InputBox
              label="Name"
              id="name"
              value={this.state.name}
              onChangeText={this.onChangeText}
              isSubmit={this.state.isSubmit}
            />
          </div>
        </Col>
        <Col xs={{ span: 24 }} sm={{ span: 8 }} md={{ span: 24 }} lg={{ span: 24 }}>
          <ModalBoxFooter
            loader={this.state.buttonLoader}
            okText="Add"
            onOk={this.onSave}
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

export default connect(mapStateToProps)(RoleForm)
