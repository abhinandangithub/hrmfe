import { SettingOutlined } from '@ant-design/icons'
import { Popconfirm, Popover } from 'antd'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate  } from 'react-router-dom'
import TableBox from '../../../Components/TableBox/TableBox'
import FilterLayout from '../../../Layout/FilterLayout'
import TableLayout from '../../../Layout/TableLayout'
import apiClient from '../../../Util/apiClient'
import { GET_DATA, SET_DATA, validateAccess } from '../../../Util/Util'
import SalesPersonByClientFilter from './SalesPersonByClientFilter'

export default function SalesPersonByClients() {
  const [salesPersons, setSalesPersons] = useState([])
  const history = useNavigate()

  const getData = (params = {}) => {
    const filterCache = GET_DATA('salesPersons.filterData') || {}
    params = { ...filterCache, ...params }

    apiClient.get('sales-person-by-clients/get', { params }).then(({ status, data }) => {
      if (status === 200) {
        SET_DATA('salesPersons.filterData', { ...params, ...data.pageData })
        setSalesPersons(data.result)
      }
    })
  }

  useEffect(() => {
    getData()
  }, [])

  const onDelete = (id) => {
    apiClient.delete(`sales-person-by-clients/delete/${id}`).then(({ data }) => {
      if (data?.result) {
        setSalesPersons(salesPersons.filter((item) => item.id !== id))
      }
    })
  }

  const tableActions = (row) => (
    <div className="action-buttons">
      <ul>
        {validateAccess('edit-sales-person') && (
          <li>
            <Link to={`/app/edit-sales-person/${row.id}`}>
              <i className="flaticon-edit-1" /> Edit
            </Link>
          </li>
        )}
        {validateAccess('edit-sales-person') && (
          <li>
            <Popconfirm title="Sure to delete?" onConfirm={() => onDelete(row.id)}>
              <a>
                <i className="flaticon-delete-2" /> Delete
              </a>
            </Popconfirm>
          </li>
        )}
      </ul>
    </div>
  )

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      render: (v, r) => <Link to={`/app/edit-sales-person-by-client/${r.id}`}>{v}</Link>
    },
    {
      title: 'Client',
      dataIndex: 'clientName'
    },
    {
      title: 'Type',
      dataIndex: 'type'
    },
    {
      title: 'First Name',
      dataIndex: 'firstName'
    },
    {
      title: 'Last Name',
      dataIndex: 'lastName'
    },
    {
      title: 'Email',
      dataIndex: 'email'
    },
    {
      title: 'Phone',
      dataIndex: 'phone'
    },
    {
      title: 'Commission',
      dataIndex: 'commission'
    },
    {
      title: 'Status',
      dataIndex: 'status'
    },
    {
      title: 'Action',
      dataIndex: 'custom_action',
      render: (text, row) => (
        <Popover placement="bottomRight" content={tableActions(row)} trigger="click">
          <div className="btn-group">
            <button type="button" className="btn glow dropdown-toggle">
              <SettingOutlined /> <span className="caret" />
            </button>
          </div>
        </Popover>
      )
    }
  ]

  return (
    <FilterLayout
      addButton={{
        title: 'Sales Person & Client',
        onClick: () => history('/app/add-sales-person-by-client'),
        access: 'add-sales-person-by-client'
      }}
      filterData={GET_DATA('salesPersons.filterData')}
      filter={<SalesPersonByClientFilter onFilter={getData} />}>
      <TableLayout title="Sales Persons & Client Overview">
        <TableBox
          dataSource={salesPersons}
          columns={columns}
          pageData={GET_DATA('salesPersons.filterData')}
          onChangePage={getData}
        />
      </TableLayout>
    </FilterLayout>
  )
}
