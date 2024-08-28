import { Checkbox, Col, message, Row } from 'antd'
import React from 'react'
import { withTranslation } from 'react-i18next'
import { connect } from 'react-redux'
import { getRoles, updateRoles } from '../../../Actions/UserAction'
import ModalBox from '../../../Components/ModalBox/ModalBox'
import MENUS from '../../../Layout/MenuJson'
import { validateAccess } from '../../../Util/Util'
import RoleForm from './RoleForm'
import './Roles.scss'

class Roles extends React.Component {
  constructor() {
    super()
    this.state = {
      roles: [],
      openRole: false
    }
    this.getRolesData()
  }

  getRolesData = () => {
    getRoles().then((roles) => {
      if (roles) {
        if (roles) {
          this.setState({ roles })
        }
      }
    })
  }

  onChangeText = (value, type) => {
    this.setState({ [type]: value })
  }

  onUpdateRole = (id, page, view) => {
    const roles = this.state.roles.map((role) => {
      if (role.id === id) {
        const findIndex = role.access.indexOf(page)

        if (findIndex >= 0) {
          role.access = role.access.filter((val) => val !== page)

          if (view) {
            role.access = role.access.filter((val) => val !== page)
          }
        } else {
          role.access.push(page)

          if (view) {
            role.access.push(view)
          }
        }

        return role
      }

      return role
    })
    this.setState({ roles })
  }

  generateMenuItem = (item) =>
    !item.dontShow && (
      <tr className="roles-access-action">
        <td>{this.props.t(item.label)}</td>
        {this.state.roles.map((role, i) => (
          <td key={i}>
            {item.access &&
              item.access &&
              item.access.map((val, i2) => (
                <div key={i2} style={{ display: 'inline-block', paddingRight: 10, textAlign: 'center' }}>
                  <Checkbox
                    checked={role.access.indexOf(val.value) >= 0}
                    onChange={() => this.onUpdateRole(role.id, val.value, val.view)}
                  />
                  <div>{this.props.t(val.label)}</div>
                </div>
              ))}
          </td>
        ))}
      </tr>
    )

  generateMenuGroup = (group) => (
    <>
      <tr className="title-label">
        <td>{this.props.t(group.label)}</td>
      </tr>
      {group.children.map((item, ind) => this.generateMenuItem(item, ind))}
    </>
  )

  generateSubMenu = (sub, ind) => (
    <>
      <tr className="title-label">
        <td>{this.props.t(sub.label)}</td>
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

  onCancel = (role, type) => {
    if (type === 'Add') {
      const roles = [role, ...this.state.roles].sort((a, b) =>
        a.name > b.name ? 1 : b.name > a.name ? -1 : 0
      )
      this.setState({ openRole: false, roles })
    } else {
      this.setState({ openRole: false })
    }
  }

  onSave = () => {
    const { roles } = this.state
    updateRoles(roles).then((resp) => {
      if (resp) {
        message.success('Roles saved')
        this.getRolesData()
      }
    })
  }

  render() {
    return (
      <>
        <Row justify="center" className="inner-contents panel role-mapping">
          <Col xs={{ span: 23 }} sm={{ span: 23 }} md={{ span: 22 }} lg={{ span: 18 }}>
            <Row justify="center" className="main-title-section">
              <Col xs={{ span: 12 }} sm={{ span: 12 }} md={{ span: 12 }} lg={{ span: 12 }}>
                <h2>{this.props.t('Manage Roles')}</h2>
              </Col>
              <Col xs={{ span: 12 }} sm={{ span: 12 }} md={{ span: 12 }} lg={{ span: 12 }}>
                {validateAccess('add-role') && (
                  <div className="btn-glow primary" onClick={() => this.setState({ openRole: true })}>
                    <i className="flaticon-plus" /> {this.props.t('Add Role')}
                  </div>
                )}
              </Col>
            </Row>
          </Col>
          <Col xs={{ span: 23 }} sm={{ span: 23 }} md={{ span: 22 }} lg={{ span: 18 }}>
            <div className="role-management">
              <table className="roles-access">
                <thead>
                  <tr>
                    <td style={{ fontWeight: 600 }}>{this.props.t('Screens')}</td>
                    {this.state.roles.map((role, i) => (
                      <td key={i} style={{ fontWeight: 600 }}>
                        {this.props.t(role.name)}
                      </td>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {MENUS(this.props.companyInfo).map((menu) => (
                    <>
                      <tr className="main-title">
                        <td colSpan="12">{this.props.t(menu.label)}</td>
                      </tr>
                      {menu.children ? this.generateMenu(menu.children) : this.generateMenuItem(menu)}
                    </>
                  ))}
                </tbody>
              </table>
            </div>
          </Col>
        </Row>
        {validateAccess('edit-role') && (
          <div className="inner-contents">
            <div className="save-changes">
              <button type="button" onClick={this.onSave} className="btn-glow primary">
                {this.props.t('Save')}
              </button>
            </div>
          </div>
        )}
        <ModalBox
          title={this.props.t('Role')}
          visible={this.state.openRole}
          footer={null}
          onCancel={() => this.onCancel()}
          destroyOnClose>
          <RoleForm onCancel={this.onCancel} />
        </ModalBox>
      </>
    )
  }
}

function mapStateToProps(state) {
  return {
    userInfo: state.users.userInfo,
    companyInfo: state.users.companyInfo
  }
}

export default connect(mapStateToProps)(withTranslation()(Roles))
