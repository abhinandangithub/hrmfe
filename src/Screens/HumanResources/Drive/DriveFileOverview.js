import { Row } from 'antd'
import { useEffect, useState } from 'react'
import apiClient from '../../../Util/apiClient'
import ComponentFileRender from './ComponentFileRender'
import './Drive.scss'

export default function DriveFileOverview(props) {
  const [files, setFiles] = useState([])
  const endpoint = props.id ? `filestructure/get-files/${props.id}` : 'filestructure/get-by-parent'

  const getData = () => {
    apiClient.get(endpoint).then(({ data }) => {
      if (data && data.result) {
        setFiles(data.result)
      }
    })
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <div className="drive-file-details mt-4">
      <h3>Files</h3>
      <Row justify="left" gutter={[20, { xs: 10, sm: 16, md: 16, lg: 16 }]}>
        {files.map((file) => {
          if (file.filename) {
            return (
              <ComponentFileRender
                name={file.filename}
                fileType={file.fileType}
                size={file.size / 1024 / 1024}
                id={file._id}
                path={file.path}
              />
            )
          }

          return null
        })}
      </Row>
    </div>
  )
}
