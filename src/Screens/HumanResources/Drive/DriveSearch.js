import { DownOutlined } from '@ant-design/icons'
import { Dropdown, Layout, Menu } from 'antd'
import React from 'react'
import folderImage from '../../../assets/images/icons/folder.svg'
import './Drive.scss'
import DriveHeader from './DriveHeader'
import DriveSearchOverview from './DriveSearchOverview'

const { Sider } = Layout

const createFolderMenu = (
  <Menu>
    <Menu.Item>
      <a href="#">
        <img src={folderImage} className="folder-icon" alt="folder" /> Folder
      </a>
    </Menu.Item>
  </Menu>
)

export default function DriveSearch({
  match: {
    params: { keywords }
  }
}) {
  return (
    <div className="drive-panel">
      <div className="drive-sider">
        <Sider width={230} trigger={null} collapsible collapsed={false}>
          <div className="filter-section">
            <Dropdown
              className="mr-3"
              overlay={createFolderMenu}
              trigger={['click']}
              placement="bottomLeft"
              arrow>
              <a
                className="ant-btn ant-btn-primary btn-block mb-3 ant-dropdown-link"
                onClick={(e) => e.preventDefault()}>
                <i className="flaticon-plus mr-2" /> Create New <DownOutlined />
              </a>
            </Dropdown>
            <div className="tree-folder-view">Folder View</div>
          </div>
        </Sider>
      </div>
      <div className="drive-container py-3">
        <DriveHeader keywords={keywords} />
        <div className="drive-body-section">
          <DriveSearchOverview keywords={keywords} />
        </div>
      </div>
    </div>
  )
}
