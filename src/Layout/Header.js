import { CloseOutlined, DownOutlined, MenuOutlined } from '@ant-design/icons'
import { Col, Dropdown, Menu, Row } from 'antd'
import React from 'react'
import { withTranslation } from 'react-i18next'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import mainlogo from '../assets/images/logo-white.png'
import AutoCompleteBox from '../Components/AutoCompleteBox/AutoCompleteBox'
import apiClient from '../Util/apiClient'
import { LANGUAGES } from '../Util/Options'
import { avatarLetter, getImageUrl, validateAccess } from '../Util/Util'
import './Header.scss'
import MENUS from './MenuJson'

const { SubMenu } = Menu

class Header extends React.Component {
  constructor() {
    super()
    this.state = {
      filterview: 'view',
      search: '',
      searchOptions: []
    }
  }

  componentDidMount() {
    const searchOptions = []

    const resursiveFn = (items) => {
      items.forEach((val) => {
        if (validateAccess(val.access?.map((item) => item.value)) && !val.notInMenu && !val.dontShow) {
          searchOptions.push({ label: val.label, value: val.value })
        }

        if (val.children) {
          resursiveFn(val.children)
        }

        if (val.isSelf) {
          const roleData = this.props.userInfo?.roleData
          const roleBase = ['Employee', 'Manager']
          const findrole = roleBase.find((x) => x === roleData?.name)

          if (findrole) {
            searchOptions.push({ label: val.label, value: val.value })
          }
        }
      })
    }

    resursiveFn(MENUS(this.props.companyInfo, this.props.userInfo))
    this.setState({ searchOptions })
  }

  profilecontent = () => {
    const { userInfo } = this.props

    return (
      <div className="profile-main-menu">
        <ul className="list-group bg-dark text-white " style={{ height: '50vh', width: '105%' }}>
          <li className="list-group-item">
            <a href="/app/profile" className="d-flex align-items-center">
              <div className="accounting-user-profile">
                <div className="profile-name mt-3">
                  <span>{avatarLetter(userInfo.name)}</span>
                </div>
                {/* <div className="profile-image">
                <img src={profileimage} alt="Profile Image" />
            </div> */}
                <div className="profile-text mt-3">
                  <h3 className="text-white">{userInfo ? userInfo.name : ''}</h3>
                  <span>View Profile</span>
                </div>
              </div>
            </a>
          </li>
          <li className="list-group-item  bg-dark mt-3">DNID: {this.props.userInfo?.network}</li>
          <li className="list-group-item  bg-dark mt-3">Company: {this.props.userInfo?.company}</li>
          <li className="list-group-item">
            <a href="/app/profile" className="d-flex align-items-center mt-3 text-white">
              <i className="flaticon-user-1 mr-2 " /> My Profile
            </a>
          </li>
          {validateAccess('edit-company') && (
            <li className="list-group-item">
              <a
                href={`/app/edit-company/${this.props.userInfo && this.props.userInfo.company}`}
                className="d-flex align-items-center mt-3 text-white ">
                <i className="flaticon-office-building mr-3" /> Company Profile
              </a>
            </li>
          )}
          <li className="list-group-item">
            <a href="/app/manage-company" className="d-flex align-items-center mt-3 text-white">
              <i className="flaticon-office-building mr-3" /> Manage Company
            </a>
          </li>

          <li className="list-group-item">
            <a href="/app/changePassword" className="d-flex align-items-center  mt-3 text-white">
              <i className="flaticon-padlock mr-3" /> Change Password
            </a>
          </li>

          <li className="list-group-item">
            <a
              href="#"
              onClick={() => this.onRedirect('/login')}
              className="d-flex align-items-center  mt-3 text-white">
              <i className="flaticon-power-button mr-2" /> Logout
            </a>
          </li>
        </ul>
      </div>
    )
  }

  onRedirect = async (path) => {
    if (path === '/login') {
      localStorage.removeItem('ACCOUNTING_USER')
      this.props.history.push(path)
    } else {
      if (path === '/app/edit-employee') {
        const email = this.props.userInfo?.email
        const { data } = await apiClient.get(`employees/getId/${email}`)
        if (data?.result) {
          const sample = `${path}/${data?.result}`
          path = sample
        }
      }
      this.props.history.push(path)
      const x = document.getElementById('accounting-sider-menu')

      if (x) {
        x.style.display = 'none'
        this.setState({ filterview: 'view' })
      }
    }
  }

  // responsive filter starts
  accountingSidemenu = () => {
    const x = document.getElementById('accounting-sider-menu')
    const y = document.getElementById('mobile-sider-menu')

    if (x.style.display === 'block') {
      x.style.display = 'none'
      this.setState({ filterview: 'view' })
    } else {
      x.style.display = 'block'
      this.setState({ filterview: 'close' })

      if (y) {
        y.style.display = 'none'
      }
    }
  }
  // responsive filter ends

  generateMenuItem = (item, ind) => {
    if (
      (validateAccess(item.access?.map((item) => item.value)) && !item.notInMenu && !item.dontShow) ||
      item.isSelf
    ) {
      return (
        <Menu.Item key={`${item.label}-${ind}`}>
          <a style={{ color: 'white', paddingLeft: '1px' }} onClick={() => this.onRedirect(item.value)}>
            {this.props.useTranslation.t(item.label)}
          </a>
        </Menu.Item>
      )
    }

    return false
  }

  generateMenuGroup = (group, ind) => {
    const groupMenu = []
    group.children.forEach((item, itemInd) => {
      if (item.type === 'submenu') {
        const subMenu = this.generateSubMenu(item, `${ind}-${itemInd}`)
        if (subMenu) {
          groupMenu.push(subMenu)
        }
      } else {
        const list = this.generateMenuItem(item, `${ind}-${itemInd}`)
        if (list) {
          groupMenu.push(list)
        }
      }
    })

    if (groupMenu.length > 0) {
      if (group.type === 'submenu') {
        return (
          <SubMenu title={this.props.useTranslation.t(group.label)} key={`${group.label}-${ind}`}>
            {groupMenu}
          </SubMenu>
        )
      }
      return (
        <Menu.ItemGroup title={this.props.useTranslation.t(group.label)} key={`${group.label}-${ind}`}>
          {groupMenu}
        </Menu.ItemGroup>
      )
    }

    return false
  }

  generateSubMenu = (sub, ind) => {
    const submenu = []
    sub.children.forEach((item, itemInd) => {
      if (item.type === 'group' || item.type === 'submenu') {
        const groupOrSubMenu = this.generateMenuGroup(item, `${ind}-${itemInd}`)
        if (groupOrSubMenu) {
          submenu.push(groupOrSubMenu)
        }
      } else {
        const list = this.generateMenuItem(item, `${ind}-${itemInd}`)
        if (list) {
          submenu.push(list)
        }
      }
    })

    if (submenu.length > 0) {
      return (
        <SubMenu title={this.props.useTranslation.t(sub.label)} key={`${sub.label}-${ind}`}>
          {submenu}
        </SubMenu>
      )
    }

    return false
  }

  generateMenu = (menuItems, className) => {
    const menuArr = []
    menuItems.forEach((item, ind) => {
      if (item.type === 'submenu') {
        const submenu = this.generateSubMenu(item, ind)

        if (submenu) {
          menuArr.push(submenu)
        }
      } else if (item.type === 'group') {
        const groupMenu = this.generateMenuGroup(item, ind)

        if (groupMenu) {
          menuArr.push(groupMenu)
        }
      } else {
        const list = this.generateMenuItem(item, ind)

        if (list) {
          menuArr.push(list)
        }
      }
    })

    if (menuArr.length > 0) {
      return <Menu className={className || ''}>{menuArr}</Menu>
    }

    return false
  }

  renderMenu = () =>
    MENUS(this.props.companyInfo, this.props.userInfo).map((menu, ind) => {
      if (menu.children) {
        const menuItem = this.generateMenu(menu.children, menu.className)

        if (menuItem) {
          return (
            <Menu.Item key={`${menu.label}-${ind}`}>
              <Dropdown className="customMenu px-1" overlay={menuItem} trigger={['click']} arrow>
                <a className="ant-dropdown-link">
                  {this.props.useTranslation.t(menu.label)}
                  <DownOutlined />
                </a>
              </Dropdown>
            </Menu.Item>
          )
        }

        return null
      }
      return this.generateMenuItem(menu)
    })

  renderReponsiveMenu = () =>
    MENUS(this.props.companyInfo, this.props.userInfo).map((menu, ind) => {
      if (menu.children) {
        const menuItem = this.generateMenu(menu.children)

        if (menuItem) {
          return (
            <SubMenu key={`${menu.label}-${ind}`} title={menu.label}>
              {menuItem}
            </SubMenu>
          )
        }

        return null
      }

      return this.generateMenuItem(menu)
    })

  filterOption = (inputValue, option) => option.label.toUpperCase().indexOf(inputValue.toUpperCase()) >= 0

  render() {
    const { userInfo, companyInfo } = this.props
    const onChangeLang = (e) => {
      const langcode = e.target.value
      sessionStorage.setItem('language', langcode)
      this.props.i18n.changeLanguage(langcode)
    }

    return (
      <div>
        {/* responsive main menu starts */}
        <div className="accounting-sider-menu" id="accounting-sider-menu">
          <Menu mode="inline">{this.renderReponsiveMenu()}</Menu>
        </div>
        {/* responsive main menu ends */}

        <div className="main-header">
          <Row justify="center">
            <Col xs={{ span: 9 }} sm={{ span: 9 }} md={{ span: 6 }} lg={{ span: 3 }}>
              <div
                className="logo"
                style={{
                  background: 'transparent'
                }}>
                <div className="main-responsive-menu">
                  {this.state.filterview === 'view' ? (
                    <MenuOutlined
                      onClick={this.accountingSidemenu}
                      style={{ color: '#fff', fontSize: '25px' }}
                    />
                  ) : (
                    <CloseOutlined
                      onClick={this.accountingSidemenu}
                      style={{ color: '#fff', fontSize: '25px' }}
                    />
                  )}
                </div>
                <Link to="/app/dashboard">
                  {companyInfo ? (
                    companyInfo.logo && companyInfo.logo !== '' ? (
                      <img src={getImageUrl(companyInfo.logo)} alt="Accounting software" />
                    ) : (
                      <h2>{companyInfo.name}</h2>
                    )
                  ) : (
                    <img
                      src={mainlogo}
                      alt="Accounting software"
                      style={{ width: '100%', height: 45, padding: 5 }}
                    />
                  )}
                </Link>
              </div>
            </Col>

            <Col xs={{ span: 14 }} sm={{ span: 14 }} md={{ span: 18 }} lg={{ span: 21 }}>
              <div className="container-menu">
                <Row align="middle">
                  <Col
                    xs={{ span: 3 }}
                    sm={{ span: 3 }}
                    md={{ span: 8 }}
                    lg={{ span: 12 }}
                    xl={{ span: 16 }}
                    xxl={{ span: 16 }}
                    className="default-menu-desktop">
                    <div className="navigation">
                      <Menu mode="horizontal">{this.renderMenu()}</Menu>
                    </div>
                  </Col>

                  <Col xs={{ span: 0 }} sm={{ span: 0 }} md={{ span: 7 }} lg={{ span: 3 }} xxl={{ span: 3 }}>
                    <div className="search" style={{ width: '100%' }}>
                      <AutoCompleteBox
                        id="Search"
                        showSearch
                        placeholder="User Search"
                        value={this.state.search}
                        options={this.state.search !== '' ? this.state.searchOptions : []}
                        onChangeText={(value) => this.setState({ search: value })}
                        onSelect={(value) => {
                          this.props.history.push(value)
                          this.setState({ search: '' })
                        }}
                        isSubmit={this.state.isSubmit}
                        disabled={this.props.disableFields}
                        filterOption={this.filterOption}
                      />
                    </div>
                  </Col>

                  <Col
                    xs={{ span: 24 }}
                    sm={{ span: 24 }}
                    md={{ span: 9 }}
                    lg={{ span: 5 }}
                    xxl={{ span: 5 }}>
                    <div className="right-profile-menu">
                      <ul className="profile d-flex justify-content-start align-items-center">
                        <li>
                          <select
                            style={{ width: '100px' }}
                            defaultValue={sessionStorage.getItem('language') || 'en'}
                            onChange={onChangeLang}>
                            {LANGUAGES.sort((a, b) => a.label.localeCompare(b.label)).map(
                              ({ code, label }) => (
                                <option key={code} value={code}>
                                  {' '}
                                  {label}{' '}
                                </option>
                              )
                            )}
                            {/* {LANGUAGES.map(({ code, label }) => (
                              <option key={code} value={code}>
                                {label}
                              </option>
                            ))} */}
                          </select>
                        </li>
                        <li className="inbox">
                          <div>
                            <Link to="/app/inbox" className="ant-dropdown-link settings">
                              <i className="flaticon-mail" style={{ fontSize: 25 }} />
                            </Link>
                          </div>
                        </li>
                        {/* <li>
                          <Link to="/app/notifications" className="notification">
                            <i className="flaticon-notification" />
                            <span>3</span>
                          </Link>
                        </li> */}
                        <li>
                          <Dropdown overlay={this.profilecontent()} trigger={['click']} arrow>
                            <a className="ant-dropdown-link main-profile">
                              <div className="profile-name">
                                <span>{avatarLetter(userInfo.name)}</span>
                              </div>
                              {/* <div className="profile-image">
                                                                <img src={profileimage} alt="Profile Image" />
                                                            </div> */}
                            </a>
                          </Dropdown>
                        </li>
                      </ul>
                    </div>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    userInfo: state.users.userInfo,
    companyInfo: state.users.companyInfo,
    access: state.users.access
  }
}

export default connect(mapStateToProps)(withTranslation()(Header))
