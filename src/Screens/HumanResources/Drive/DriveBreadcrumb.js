import { HomeOutlined } from '@ant-design/icons'
import { Breadcrumb } from 'antd'
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import apiClient from '../../../Util/apiClient'
import './Drive.scss'

export default function DriveBreadcrumb({ parentId }) {
  const [navigations, setNavigations] = useState([])
  const history = useHistory()

  useEffect(() => {
    const endpoint = parentId
      ? `filestructure/get-nativagation-by-parent/${parentId}`
      : 'filestructure/get-nativagation-by-parent'
    apiClient.get(endpoint).then(({ data }) => {
      if (data && data.result) {
        setNavigations(data.result)
      }
    })
  }, [parentId])

  const onNavigate = (id) => {
    history.push(id ? `/app/drive/${id}` : '/app/drive')
  }

  return (
    <div className="drive-breadcrumb">
      <Breadcrumb className="d-flex pl-0 pt-2">
        <Breadcrumb.Item onClick={() => onNavigate()}>
          <HomeOutlined /> Home
        </Breadcrumb.Item>
        {navigations.map((v, i) => (
          <Breadcrumb.Item key={i} onClick={() => onNavigate(v.id)}>
            {v.name}
          </Breadcrumb.Item>
        ))}
      </Breadcrumb>
    </div>
  )
}
