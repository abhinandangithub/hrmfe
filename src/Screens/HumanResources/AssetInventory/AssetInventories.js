import { SettingOutlined } from '@ant-design/icons'
import { Popover } from 'antd'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import TableBox from '../../../Components/TableBox/TableBox'
import FilterLayout from '../../../Layout/FilterLayout'
import TableLayout from '../../../Layout/TableLayout'
import apiClient from '../../../Util/apiClient'
import { GET_DATA, SET_DATA, validateAccess } from '../../../Util/Util'
import AssetInventoryFilter from './AssetInventoryFilter'

export default function AssetInventories() {
  const [assetInventories, setAssetInventories] = useState([])
  const history = useHistory()

  useEffect(() => {
    getData(GET_DATA('assetInventories.filterData'))
  }, [])

  const getData = (params) => {
    const filterCache = GET_DATA('assetInventories.filterData') || {}
    params = { ...filterCache, ...params }

    apiClient.get('asset-inventory/all', { params }).then(({ status, data }) => {
      if (status === 200) {
        SET_DATA('assetInventories.filterData', { ...params, ...data.result.pageData })
        setAssetInventories(data.result.result)
      }
    })
  }

  const columns = [
    {
      title: 'Inv. Date',
      dataIndex: 'date',
      render: (date) => moment(date).format('DD-MM-YYYY')
    },
    {
      title: 'Inventory no.',
      dataIndex: 'inventoryNo'
    },
    {
      title: 'Description',
      dataIndex: 'description'
    },
    {
      title: 'Total Assets',
      dataIndex: 'totalAsset'
    },
    {
      title: 'Pending',
      dataIndex: 'pending',
      render: (v, r) => r?.totalAsset - r?.completed || '0'
    },
    {
      title: 'Completed',
      dataIndex: 'completed'
    },
    {
      title: 'Available',
      dataIndex: 'available'
    },
    {
      title: 'Not Available',
      dataIndex: 'notAvailable'
    },
    {
      title: 'Status',
      dataIndex: 'status'
    },
    {
      title: 'Action',
      dataIndex: 'custom_action',
      render: (text, row) => (
        <Popover placement="bottomRight" content={tableContent(row)} trigger="click">
          <div className="btn-group">
            <button type="button" className="btn glow dropdown-toggle">
              <SettingOutlined /> <span className="caret" />
            </button>
          </div>
        </Popover>
      )
    }
  ]

  const tableContent = (row) => (
    <div className="action-buttons">
      <ul>
        <li>
          <a onClick={() => history.push(`/app/view-asset-inventory/${row.id}`)}>
            <i className="flaticon-eye" /> View
          </a>
        </li>
        {validateAccess && row.status === 'In Progress' && (
          <li>
            <a onClick={() => history.push(`/app/asset-code-scan/${row.id}`)}>
              <i className="flaticon-edit-1" /> Edit
            </a>
          </li>
        )}
        <li />
      </ul>
    </div>
  )

  return (
    <FilterLayout
      addButton={{
        title: 'Add Inventory',
        onClick: () => history.push('/app/add-asset-inventory'),
        access: 'add-asset-inventory'
      }}
      filterData={GET_DATA('assetInventories.filterData')}
      filter={<AssetInventoryFilter onSubmit={getData} />}>
      <TableLayout title="Assets Inventory Overview">
        <TableBox
          dataSource={assetInventories}
          columns={columns}
          pageData={GET_DATA('assetInventories.filterData')}
          onChangePage={getData}
        />
      </TableLayout>
    </FilterLayout>
  )
}
