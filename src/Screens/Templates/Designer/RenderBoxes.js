import { MailOutlined } from '@ant-design/icons'
import { Menu } from 'antd'
import React, { memo } from 'react'
import { Box } from './Box'

const { SubMenu } = Menu

export const Boxes = memo(({ groups, items }) => (
  <Menu selectable={false} mode="inline">
    {groups.map((group) => {
      const menus = items.filter((val) => val.group === group)

      return (
        <SubMenu key={group} icon={<MailOutlined />} title={group}>
          {menus.map((menu, ind) => (
            <Menu.Item key={menu.name} style={{ height: '100%', width: '100%' }}>
              <Box key={ind} {...menu} />
            </Menu.Item>
          ))}
        </SubMenu>
      )
    })}
  </Menu>
))
