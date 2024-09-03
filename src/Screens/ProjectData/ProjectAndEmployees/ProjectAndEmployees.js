import { EditOutlined } from '@ant-design/icons'
import React, { useEffect, useState } from 'react'
import { useNavigate  } from 'react-router-dom'
import Button from '../../../Components/Button'
import TableBox from '../../../Components/TableBox/TableBox'
import FilterLayout from '../../../Layout/FilterLayout'
import apiClient from '../../../Util/apiClient'
import { validateAccess } from '../../../Util/Util'
import ProjectAndEmployeeFilter from './ProjectAndEmployeeFilter'

export default function Projects() {
  const [projects, setProjects] = useState([])
  const history = useNavigate()

  const getData = (params) => {
    apiClient.get('projects/getAllProjectAndEmployees', { params }).then(({ data }) => {
      if (data && data.result) {
        setProjects(data.result)
      }
    })
  }

  useEffect(() => {
    getData()
  }, [])

  const columns = [
    {
      title: 'Client',
      dataIndex: 'client',
      render: (text, row) => (row.clientData ? row.clientData.name : '')
    },
    {
      title: 'Project',
      dataIndex: 'project',
      render: (text, row) => (row.projectData ? row.projectData.name : '')
    },
    {
      title: 'Employee',
      dataIndex: 'user',
      render: (text, row) => (row.userData ? row.userData.name : '')
    },
    {
      ...(validateAccess('edit-project-employee') && {
        title: 'Action',
        dataIndex: 'custom_action',
        render: (text, row) => (
          <div className="btn-group">
            <Button
              onClick={() => history(`/app/edit-project-employee/${row.id}`)}
              className="dropdown-toggle">
              <EditOutlined />
            </Button>
          </div>
        )
      })
    }
  ]

  return (
    <FilterLayout filter={<ProjectAndEmployeeFilter onSubmit={getData} />}>
      <div className="top-filter-options">
        <h2>Project and employee Overview</h2>
      </div>
      <TableBox dataSource={projects} columns={columns} />
    </FilterLayout>
  )
}
