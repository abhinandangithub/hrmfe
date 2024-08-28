import { Col, Image } from 'antd'
import React, { useEffect, useState } from 'react'
import excelImage from '../../../assets/images/icons/excel.svg'
import pdfImage from '../../../assets/images/icons/pdf.svg'
import wordImage from '../../../assets/images/icons/word.svg'
import './Drive.scss'

export default function ComponentFileRender(props) {
  const [imageHolder, setImageHolder] = useState(null)

  const image = () => {
    console.log(props.path)

    switch (props.fileType) {
      case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' || 'application/vnd.ms-excel':
        setImageHolder(excelImage)
        break
      case 'application/pdf':
        setImageHolder(pdfImage)
        break
      case 'application/msword' || 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
        setImageHolder(wordImage)
        break
      default:
        setImageHolder(wordImage)
    }
  }

  useEffect(() => {
    image()
  }, [])

  return (
    <Col xs={{ span: 16 }} sm={{ span: 16 }} md={{ span: 8 }} lg={{ span: 6 }}>
      <div className="files-overview">
        <div className="image-holder border-bottom px-3 py-3">
          <Image
            src={imageHolder}
            alt="Excel"
            preview={{
              src: 'file:///E:/mcbitss/Accounting_Frontend/src/Capture.PNG'
            }}
          />
        </div>
        <div className="document-details px-2 py-2">
          <div className="title">{props.name}</div>
          <div className="file-size">
            <span>File size:</span> {props.size.toFixed(2)} MB
          </div>
        </div>
      </div>
    </Col>
  )
}
