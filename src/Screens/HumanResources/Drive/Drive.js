import { CloseOutlined, DownloadOutlined } from '@ant-design/icons'
import { Col, Row } from 'antd'
import { useEffect, useState } from 'react'
import Button from '../../../Components/Button'
import TableBox from '../../../Components/TableBox/TableBox'
import AppConfig from '../../../config'
import { useSelector } from '../../../Hooks/redux'
import FilterLayout from '../../../Layout/FilterLayout'
import apiClient from '../../../Util/apiClient'
import { GET_DATA, SET_DATA } from '../../../Util/Util'
import CreateNew from './CreateNew'
import './Drive.scss'
import DriveHeader from './DriveHeader'
import DriveTreeStructure from './DriveTreeStructure'

const { API_URL } = AppConfig

function bytesToSize(bytes, decimals = 2) {
  if (!bytes) {
    return '-'
  }

  const k = 1024
  const dm = decimals < 0 ? 0 : decimals
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return `${parseFloat((bytes / k ** i).toFixed(dm))} ${sizes[i]}`
}

export default function Drive({
  match: {
    params: { id, keywords }
  },
  history
}) {
  const [files, setFiles] = useState([])
  const [fileData, setFileData] = useState(false)
  const { userInfo } = useSelector((state) => state.users)
  const [showAddNewFolderButton, setShowAddNewFolderButton] = useState(false)

  const onDownload = async (path, name) => {
    const image = await fetch(`${API_URL}/${path}`)
    const imageBlog = await image.blob()
    const imageURL = URL.createObjectURL(imageBlog)

    const link = document.createElement('a')
    link.href = imageURL
    link.download = name
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const col = [
    {
      title: 'Name',
      dataIndex: 'name',
      render: (v, r) => (
        <div
          onClick={() => {
            if (r.type === 'Folder') {
              history(`/app/drive/${r.id}`)
            } else {
              setFileData(r)
            }
          }}>
          <a>{v}</a>
        </div>
      )
    },
    {
      title: 'Type',
      dataIndex: 'type',
      dontShow: !!fileData
    },
    { title: 'Size', dataIndex: 'size', render: (v) => bytesToSize(v), dontShow: !!fileData },
    {
      title: 'Action',
      dataIndex: 'custom_action',
      render: (text, row) => (
        <div className="btn-group">
          {row.type === 'File' && (
            <Button onClick={() => onDownload(row.path, row.name)} className="btn glow dropdown-toggle">
              <DownloadOutlined />
            </Button>
          )}
        </div>
      )
    }
  ]

  const getData = () => {
    apiClient.get('filestructure/get/employee/root-folder').then(({ data }) => {
      if (data?.result) {
        setShowAddNewFolderButton(true)
      }
    })

    if (keywords) {
      apiClient.get(`filestructure/search/${keywords}`).then(({ data }) => {
        if (data?.result) {
          if (userInfo.userType === 'Admin') {
            setFiles(data.result)
          } else {
            setShowAddNewFolderButton(false)
          }
        }
      })
    } else if (userInfo.userType === 'Admin') {
      const endpoint = id ? `filestructure/get-by-parent/${id}` : 'filestructure/get/employees/root-folders'
      apiClient.get(endpoint).then(({ data }) => {
        if (data && data.result) {
          setFiles(data.result)
          SET_DATA('drive.selectedFile', false)
        }
      })
    } else if (userInfo.userType !== 'Admin' && !id) {
      apiClient.get('filestructure/get/employee/root-folder').then(({ data }) => {
        if (data && data.result) {
          if (data.result[0]?.id) {
            history(`/app/drive/${data.result[0].id}`)
            apiClient.get(`filestructure/get-by-parent/${data.result[0].id}`).then(({ data }) => {
              setFiles(data.result)
              SET_DATA('drive.selectedFile', false)
            })
          } else {
            setShowAddNewFolderButton(false)
          }
        }
      })
    } else if (userInfo.userType !== 'Admin' && id) {
      apiClient.get(`filestructure/get-by-parent/${id}`).then(({ data }) => {
        if (data && data.result) {
          setFiles(data.result)
          SET_DATA('drive.selectedFile', false)
        }
      })
    }
  }

  useEffect(() => {
    getData()
    const selectedFile = GET_DATA('drive.selectedFile')

    if (selectedFile) {
      setFileData(selectedFile)
    }
  }, [])

  return (
    <FilterLayout
      filter={
        <>
          {(userInfo.userType === 'Admin' || showAddNewFolderButton) && (
            <CreateNew parentId={id} getData={getData} />
          )}
          <DriveTreeStructure parentId={id} history={history} />
        </>
      }>
      <div className="drive-panel">
        <div className="drive-container py-3">
          <DriveHeader parentId={id} keywords={keywords} />

          <div className="drive-body-section">
            <div className="drive-file-details mt-2">
              <Row>
                <Col lg={fileData ? 10 : 24}>
                  <TableBox className="drive-table" columns={col} dataSource={files} />
                </Col>
                <Col lg={14}>
                  {fileData && (
                    <div>
                      <div className="side-header">
                        {fileData?.name}
                        <div className="close-outlined">
                          <CloseOutlined onClick={() => setFileData(false)} />
                        </div>
                      </div>
                      {fileData?.fileType === 'application/pdf' && (
                        <iframe
                          src={`${API_URL}/${fileData.path}#view=fitH`}
                          height="480"
                          width="100%"
                          title="PDF"
                        />
                      )}
                      {fileData && fileData?.fileType !== 'application/pdf' && fileData?.fileType !== '' && (
                        <img src={`${API_URL}/${fileData.path}#view=fitH`} alt="preview-img" width="100%" />
                      )}
                    </div>
                  )}
                </Col>
              </Row>
            </div>
          </div>
        </div>
      </div>
    </FilterLayout>
  )
}
