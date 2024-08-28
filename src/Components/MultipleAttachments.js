import { message } from 'antd'
import { memo, useEffect, useState } from 'react'
import Dropzone from 'react-dropzone'
import excelIcon from '../assets/images/excel.png'
import imageIcon from '../assets/images/image.png'
import pdfIcon from '../assets/images/pdf.png'
import { getDocPath } from '../Util/Util'
import './Component.scss'

const fileIcons = {
  excel: 'flaticon-csv-file-format-extension',
  pdf: 'flaticon-pdf',
  image: 'flaticon-image-gallery',
  xml: 'flaticon-xml'
}

const displayIcons = {
  'application/pdf': pdfIcon,
  'image/png': imageIcon,
  'image/jpeg': imageIcon,
  'application/vnd.ms-excel': excelIcon,
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': excelIcon,
  '.csv': excelIcon
}

function MultipleAttachments({
  title = '',
  name = '',
  description = '',
  acceptFile = ['image'],
  onUpload,
  value = [],
  disabled,
  readOnly,
  maxFiles = 3,
  size = 5,
  noPreview
}) {
  const [attachments, setAttachments] = useState(value)

  useEffect(() => {
    if (value.length > 0) {
      setAttachments(value)
    }
  }, [value])

  const onFileChange = async (files) => {
    const totalFiles = [...attachments, ...files]

    if (totalFiles.length <= maxFiles) {
      setAttachments(totalFiles)
      onUpload?.(name, totalFiles)
    } else {
      message.error(`Max ${maxFiles} files can be uploaded`)
    }
  }

  const onClear = (file) => {
    const files = attachments.filter((v) => v.name !== file.name)
    setAttachments(files)
    onUpload?.(name, files)
  }

  const onDownload = (v) => {
    window.open(getDocPath(v.path), '_blank').focus()
  }

  const getAccept = () => {
    const acceptObj = {}

    acceptFile.forEach((v) => {
      if (v === 'pdf') {
        acceptObj['application/pdf'] = []
      } else if (v === 'image') {
        acceptObj['image/png'] = []
        acceptObj['image/jpeg'] = []
      } else if (v === 'xml') {
        acceptObj['application/xml'] = []
        acceptObj['text/xml'] = []
      }
    })

    return acceptObj
  }

  return (
    <div className="attachments-area">
      {!readOnly && (
        <Dropzone
          onDrop={onFileChange}
          accept={getAccept()}
          multiple
          maxSize={size * 1000000}
          disabled={disabled}>
          {({ getRootProps, getInputProps }) => (
            <div {...getRootProps()}>
              <div className="attachments-drop-area">
                <input {...getInputProps()} />
                <div>
                  {acceptFile.map((v, i) => (
                    <i key={i} className={fileIcons[v]} style={{ fontSize: 30, margin: 10 }} />
                  ))}
                </div>
                <b>{title}</b>
                <div>{description || `You can upload a maximum of ${maxFiles} files, ${size}MB each`}</div>
              </div>
            </div>
          )}
        </Dropzone>
      )}
      {!noPreview && (
        <div className="attachments-files">
          {attachments.map((v, i) => (
            <div key={i} className="file-content">
              {!disabled && (
                <div className="clear-icon" onClick={() => onClear(v)}>
                  <i className="flaticon-delete" />
                </div>
              )}
              <img alt="file" title={v.name} src={displayIcons[v.type]} onClick={() => onDownload(v)} />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default memo(MultipleAttachments)
