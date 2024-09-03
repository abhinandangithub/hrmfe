import { Col, Image } from 'antd'
import React from 'react'
import { useNavigate  } from 'react-router-dom'
import folderImage from '../../../assets/images/icons/folder.svg'
import pdfImage from '../../../assets/images/icons/pdf.svg'
import wordImage from '../../../assets/images/icons/word.svg'
import AppConfig from '../../../config'
import './Drive.scss'

const { API_URL } = AppConfig

export default function DriveContentRenderer(props) {
  const history = useNavigate()

  const getImage = () => {
    const { type, fileType, path } = props

    if (type === 'Folder') {
      return <img height={100} width={100} src={folderImage} alt="Folder" />
    }

    if (fileType === 'application/pdf') {
      return <img height={100} width={100} src={pdfImage} alt="PDF" />
    }

    if (fileType.includes('image/')) {
      return <Image height={100} width="100%" src={`${API_URL}/${path}`} alt="Image" />
    }

    return <img height={100} width={100} src={wordImage} alt="Word" />
  }

  const onAction = () => {
    const { type, id, fileType, setFilePath, path } = props

    if (type === 'Folder') {
      history(`/app/drive/${id}`)
    }

    if (fileType === 'application/pdf') {
      setFilePath(path)
    }
  }

  const onDownload = () => {
    const a = document.createElement('a')
    a.href = `${API_URL}/${props.path}`
    a.download = props.name
    alert(props.name)
    // alert(`${API_URL}/${props.path}`)
    document.body.appendChild(a)
    a.click()
    a.remove()
  }

  return (
    <Col xs={{ span: 16 }} sm={{ span: 16 }} md={{ span: 8 }} lg={{ span: 6 }}>
      <div className="files-overview" onClick={() => onAction()} style={{ cursor: 'pointer' }}>
        <div className="image-holder border-bottom px-3 py-3">{getImage()}</div>
        <div className="document-details px-2 py-2">
          <div className="title">{props.name}</div>

          <div className="file-size" style={{ display: props.type === 'File' ? 'block' : 'none' }}>
            <span>File size:</span> {props.size.toFixed(2)} MB
            <span onClick={onDownload} style={{ float: 'right', cursor: 'pointer' }}>
              <i className="flaticon-download" />
            </span>
          </div>
        </div>
      </div>
    </Col>
  )
}
