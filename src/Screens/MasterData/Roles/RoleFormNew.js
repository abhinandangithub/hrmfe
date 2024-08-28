import { Checkbox, Col, Row } from 'antd'
import React from 'react'
import { connect } from 'react-redux'
import { addRole } from '../../../Actions/UserAction'
import InputBox from '../../../Components/InputBox/InputBox'
import MENUS from '../../../Layout/MenuJson'
import './Roles.scss'

class RoleForm extends React.Component {
  constructor() {
    super()
    this.state = {
      name: ''
    }
  }

  generateMenuItem = (item) =>
    !item.dontShow && (
      <tr className="roles-access-action">
        <td>{item.label}</td>
        <td>
          {item.access &&
            item.access &&
            item.access.map((val, i2) => (
              <div key={i2} style={{ display: 'inline-block', paddingRight: 10, textAlign: 'center' }}>
                <Checkbox
                  checked={item.access.indexOf(val.value) >= 0}
                  onChange={() => this.onUpdateRole(item.id, val.value, val.view)}
                />
                <div>{val.label}</div>
              </div>
            ))}
        </td>
      </tr>
    )

  generateMenuGroup = (group) => (
    <>
      <tr className="title-label">
        <td>{group.label}</td>
      </tr>
      {group.children.map((item, ind) => this.generateMenuItem(item, ind))}
    </>
  )

  generateSubMenu = (sub, ind) => (
    <>
      <tr className="title-label">
        <td>{sub.label}</td>
      </tr>
      {sub.children.map((item) => {
        if (item.type === 'group') {
          return this.generateMenuGroup(item, ind)
        }

        return this.generateMenuItem(item, ind)
      })}
    </>
  )

  generateMenu = (menuItems) =>
    menuItems.map((item, ind) => {
      if (item.type === 'submenu') {
        return this.generateSubMenu(item, ind)
      }

      if (item.type === 'group') {
        return this.generateMenuGroup(item, ind)
      }

      return this.generateMenuItem(item, ind)
    })

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
          {MENUS(this.props.companyInfo).map((menu) => (
            <>
              <tr className="main-title">
                <td colSpan="12">{menu.label}</td>
              </tr>
              {menu.children ? this.generateMenu(menu.children) : this.generateMenuItem(menu)}
            </>
          ))}
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
