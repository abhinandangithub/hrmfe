import { SettingOutlined } from '@ant-design/icons'
import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import TableBox from '../../../Components/TableBox/TableBox'
import FilterLayout from '../../../Layout/FilterLayout'
import apiClient from '../../../Util/apiClient'
import { GET_DATA, SET_DATA, validateAccess } from '../../../Util/Util'
import ClientFilter from './ClientFilter'

export default function Clients() {
  const [clients, setClients] = useState([])
  const history = useHistory()

  const onFilter = (params = {}) => {
    apiClient.get('clients/getAll', { params }).then(({ data }) => {
      if (data.result) {
        SET_DATA('clients.filterData', { ...params, ...data.pageData })
        setClients(data.result)
      }
    })
  }

  useEffect(() => {
    onFilter(GET_DATA('clients.filterData'))
  }, [])

  const onChangePage = (pageData) => {
    const filterCache = GET_DATA('clients.filterData')
    onFilter({ ...(filterCache || {}), ...pageData })
  }

  const columns = [
    {
      title: 'Client No',
      dataIndex: 'clientNo',
      render: (v, r) => <Link to={`/app/edit-client/${r.id}`}>{v}</Link>
    },
    {
      title: 'Name',
      dataIndex: 'name'
    },
    {
      title: 'Type',
      dataIndex: 'type'
    },
    {
      title: 'Currency',
      dataIndex: 'currency'
    },
    {
      title: 'Status',
      dataIndex: 'status'
    },
    validateAccess('edit-client')
      ? {
          title: 'Action',
          dataIndex: 'custom_action',
          render: (text, row) => (
            <div className="btn-group">
              <button
                type="button"
                onClick={() => history.push(`/app/edit-client/${row.id}`)}
                className="btn glow dropdown-toggle">
                {' '}
                <SettingOutlined />
              </button>
            </div>
          )
        }
      : {}
  ]

  return (
    <FilterLayout filter={<ClientFilter onFilter={onFilter} />}>
      <div className="top-filter-options">
        <h2>Business Partners Overview</h2>
      </div>
      <TableBox
        dataSource={clients}
        columns={columns}
        pageData={GET_DATA('clients.filterData')}
        onChangePage={onChangePage}
      />
    </FilterLayout>
  )
}
