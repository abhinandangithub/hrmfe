import { Row } from 'antd'
import React, { useEffect, useState } from 'react'
import apiClient from '../../../Util/apiClient'
import ComponentFileRender from './ComponentFileRender'
import './Drive.scss'

export default function DriveSearchOverview(props) {
  const [files, setFiles] = useState([])

  const getData = () => {
    apiClient.get(`filestructure/search/${props.keywords}`).then(({ data }) => {
      if (data && data.result) {
        console.log(data.result)
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
              />
            )
          }

          return null
        })}
      </Row>
    </div>
  )
}
