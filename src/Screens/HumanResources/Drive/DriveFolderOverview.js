import { Row } from 'antd'
import React, { useEffect, useState } from 'react'
import apiClient from '../../../Util/apiClient'
import ComponentFolderRender from './ComponentFolderRender'
import './Drive.scss'

export default function DriveFolderOverview(props) {
  const [folders, setFolders] = useState([])
  const endpoint = props.id ? `filestructure/get-folders/${props.id}` : 'filestructure/get-folders'

  const getData = () => {
    apiClient.get(endpoint).then(({ data }) => {
      if (data && data.result) {
        setFolders(data.result)
      }
    })
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <div className="drive-folder-details mt-4">
      <h3>Folders</h3>
      <Row justify="left" gutter={[20, { xs: 10, sm: 16, md: 16, lg: 16 }]}>
        {folders.map((item) => {
          if (item.filename) {
            return <ComponentFolderRender name={item.filename} id={item._id} />
          }

          return null
        })}
      </Row>
    </div>
  )
}
