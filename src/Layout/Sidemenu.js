import { Menu } from 'antd'
import React from 'react'
import logoWithoutText from '../assets/images/logo-without-text.png'
import logoLight from '../assets/images/logo.png'

const { SubMenu } = Menu

const menus = [
  { name: 'Dashboard', icon: 'flaticon-home-page', route: 'dashboard' },
  { name: 'Income', icon: 'flaticon-incomes', route: 'income' },
  { name: 'Expenses', icon: 'flaticon-budget' },
  {
    name: 'Master Data',
    icon: 'flaticon-big-data',
    subMenus: [{ name: 'Dashboard', icon: 'flaticon-home-page' }]
  },
  { name: 'Payslip', icon: 'flaticon-payslip' }
]

export default class Sidemenu extends React.PureComponent {
  render() {
    const {
      match: { url }
    } = this.props

    return (
      <Menu theme="dark" mode="inline" defaultSelectedKeys={['menu0']}>
        <Menu.Item
          key="logo"
          style={{
            margin: '0',
            padding: 10,
            minHeight: 65
          }}
          className="brand-logo">
          <img
            src={this.props.collapsed ? logoWithoutText : logoLight}
            alt="Accounting software"
            style={{ height: this.props.collapsed ? 20 : 40 }}
          />
        </Menu.Item>
        {menus.map((menu, menuInd) => {
          if (menu.subMenus) {
            return (
              <SubMenu
                key={`menu${menuInd}`}
                icon={<i className={menu.icon} style={{ paddingRight: 10 }} />}
                title={this.props.collapsed ? '' : menu.name}>
                {menu.subMenus.map((subMenu, subMenuInd) => (
                  <Menu.Item
                    onClick={() => (subMenu.route ? this.props.history(`${url}/${subMenu.route}`) : {})}
                    key={`submenu${subMenuInd}`}
                    icon={<i className={subMenu.icon} style={{ paddingRight: 10 }} />}>
                    {subMenu.name}
                  </Menu.Item>
                ))}
              </SubMenu>
            )
          }

          return (
            <Menu.Item
              onClick={() => (menu.route ? this.props.history(`${url}/${menu.route}`) : {})}
              key={`menu${menuInd}`}
              icon={<i className={menu.icon} style={{ paddingRight: 10 }} />}>
              {this.props.collapsed ? '' : menu.name}
            </Menu.Item>
          )
        })}
      </Menu>
    )
  }
}
