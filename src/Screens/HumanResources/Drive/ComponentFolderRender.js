import { Col } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'
import folderImage from '../../../assets/images/icons/folder.svg'
import './Drive.scss'

function ComponentFolderRender(props) {
  const endpoint = `/app/drive/${props.id}`

  return (
    <Col xs={{ span: 16 }} sm={{ span: 16 }} md={{ span: 8 }} lg={{ span: 6 }}>
      <div>
        <Link to={endpoint} className="d-flex folder-overview p-3">
          <div className="icon mr-2">
            <img src={folderImage} alt="folder" />
          </div>
          <div className="title">{props.name}</div>
        </Link>
      </div>
    </Col>
  )
}

export default ComponentFolderRender
