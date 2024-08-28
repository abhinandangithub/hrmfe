import { ExpandAltOutlined } from '@ant-design/icons'
import { message, Upload } from 'antd'
import { memo, useEffect, useState } from 'react'
import excelIcon from '../assets/images/excel.png'
import imageIcon from '../assets/images/image.png'
import pdfIcon from '../assets/images/pdf.png'
import apiClient from '../Util/apiClient'
import { getDocPath } from '../Util/Util'
import './Component.scss'
import ModalBox from './ModalBox/ModalBox'

const headers = {
  Accept: 'application/x-www-form-urlencoded',
  'Content-Type': 'application/x-www-form-urlencoded',
  'cache-control': 'no-cache'
}

const formats = {
  excel: '.csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel',
  pdf: 'application/pdf',
  image: 'image/png, image/jpeg'
}

const fileIcons = {
  excel: 'flaticon-csv-file-format-extension',
  pdf: 'flaticon-pdf',
  image: 'flaticon-image-gallery'
}

const displayIcons = {
  'application/pdf': pdfIcon,
  'image/png': imageIcon,
  'image/jpeg': imageIcon,
  'application/vnd.ms-excel': excelIcon,
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': excelIcon,
  '.csv': excelIcon
}

export const Image = ({ data, disabled, onClear, ...props }) => {
  const [src, setSrc] = useState(displayIcons[data.type])
  const [preview, setPreview] = useState(false)

  useEffect(() => {
    if (data.path && data.path.startsWith('accqrate-documents')) {
      apiClient.get(data.path, { responseType: 'blob' }).then(({ status, data } = {}) => {
        if (status === 200) {
          const url = window.URL.createObjectURL(data)
          setSrc(url)
        }
      })
    } else if (data.type?.startsWith?.('image')) {
      setSrc(getDocPath(data.path))
    }
  }, [])

  const onDownload = (e) => {
    e.preventDefault()
    e.stopPropagation()

    const path = data.path?.startsWith('accqrate-documents') ? src : getDocPath(data.path)

    if (data.type?.startsWith?.('image') || data.type === 'application/pdf') {
      setPreview(path)
    } else {
      window.open(path, '_blank').focus()
    }
  }

  return (
    <div className="file-content">
      <ModalBox
        title={data.name}
        visible={preview}
        onCancel={(e) => {
          e.preventDefault()
          e.stopPropagation()
          setPreview(false)
        }}
        footer={false}>
        {data.type === 'application/pdf' && (
          <iframe src={`${preview}#view=fitH`} height="480" width="100%" title="PDF" />
        )}
        {data && data.type !== 'application/pdf' && data.type !== '' && (
          <img src={`${preview}#view=fitH`} alt="preview-img" width="100%" />
        )}
      </ModalBox>
      {!disabled && (
        <div className="clear-icon" onClick={() => onClear?.(data)}>
          <i className="flaticon-delete" />
        </div>
      )}
      <span className="expand-icon" onClick={onDownload}>
        <ExpandAltOutlined />
      </span>
      <img
        alt="file"
        title={data.name}
        src={data.type?.startsWith?.('image') && src ? src : displayIcons[data.type || 'image/png']}
        {...props}
      />
    </div>
  )
}

function Attachments({
  title = '',
  name = '',
  description = '',
  acceptFile = ['image'],
  endPoint = 'companies/uploadTempDocuments',
  onUpload,
  value = [],
  disabled = false,
  readOnly = false,
  fileObj = false,
  fileLength = 3,
  size = 5,
  noPreview = false
}) {
  const [attachments, setAttachments] = useState(value)
  const [prevent, setPrevent] = useState(true)

  useEffect(() => {
    if (value.length > 0) {
      setAttachments(value)
    }
  }, [value])

  const onFileChange = async ({ file }) => {
    if (prevent && file) {
      const fileSize = file.size / 1024 / 1024

      if (attachments.length >= fileLength || fileSize > size) {
        message.error(
          attachments.length >= fileLength
            ? `Number of files exceeds ${fileLength}`
            : `File size exceeds ${size} mb`
        )

        return true
      }

      if (fileObj) {
        setAttachments([...attachments, file])
        onUpload?.(name, [...attachments, file])
      } else {
        const uploadData = new FormData()
        uploadData.append('document', file)
        apiClient.post(endPoint, uploadData, { headers }).then(({ data }) => {
          if (data && data.result) {
            setAttachments([...attachments, data.result[0]])
            onUpload?.(name, [...attachments, data.result[0]])
          }

          setPrevent(true)
        })
        setPrevent(false)
      }
    }
  }

  const onClear = (file) => {
    const files = attachments.filter((v) => v.name !== file.name)
    setAttachments(files)
    onUpload?.(name, files)
  }

  const accept = acceptFile.map((v) => formats[v] || '').join(', ')

  return (
    <div className="attachments-area">
      {!readOnly && (
        <Upload previewFile fileList={[]} accept={accept} customRequest={onFileChange} disabled={disabled}>
          <div className="attachments-drop-area">
            <div>
              {acceptFile.map((v, i) => (
                <i key={i} className={fileIcons[v]} style={{ fontSize: 30, margin: 10 }} />
              ))}
            </div>
            <b>{title}</b>
            <div>{description || `You can upload a maximum of ${fileLength} files, ${size}MB each`}</div>
          </div>
        </Upload>
      )}
      {!noPreview && (
        <div className="attachments-files">
          {attachments.map((v, i) => (
            <Image key={v.name || i} data={v} disabled={disabled} onClear={onClear} />
          ))}
        </div>
      )}
    </div>
  )
}

export default memo(Attachments)
