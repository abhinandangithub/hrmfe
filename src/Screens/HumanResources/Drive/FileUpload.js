import { InboxOutlined } from '@ant-design/icons'
import { message, Upload } from 'antd'
import React, { useState } from 'react'

const { Dragger } = Upload

function FileUpload(props) {
  const [show, setShow] = useState([])
  const attachments = {
    name: 'file',
    multiple: true,
    onChange(info) {
      if (info.fileList.length > 3) {
        message.error('Number of files exceeds 3')

        return true
      }

      setShow(info.fileList)

      info.fileList.map(async (file) => {
        const fileSize = file.originFileObj.size / 1024 / 1024

        if (fileSize > 5) {
          message.error('File size exceeds 5 mb')

          return true
        }
      })
      props.okFile(info.fileList)
    },
    onDrop(e) {
      console.log('Dropped files', e.dataTransfer.files)
    }
  }

  return (
    <>
      <Dragger {...attachments} showUploadList={false}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">Click or drag (PDF or image) file to this area to upload</p>
        <p className="ant-upload-hint">
          Support for a single or bulk upload. Strictly prohibit from uploading company data or other band
          files.
        </p>
      </Dragger>
      <div>
        {show.map((file, i) => (
          <div key={i}>{file.name}</div>
        ))}
      </div>
    </>
  )
}

export default FileUpload
