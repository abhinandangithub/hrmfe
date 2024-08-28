import { EditOutlined } from '@ant-design/icons'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import Button from '../../../Components/Button'
import TableBox from '../../../Components/TableBox/TableBox'
import apiClient from '../../../Util/apiClient'
import { GET_DATA, SET_DATA, validateAccess } from '../../../Util/Util'

export default function TaggedAssets() {
  const [assetTransfers, setAssetTransfers] = useState([])
  const history = useHistory()

  const onFilter = (params = {}) => {
    apiClient.get('asset-transfers/get', { params }).then(({ data }) => {
      if (data.result) {
        SET_DATA('assetTransfers.filterData', { ...params, ...data.pageData })
        setAssetTransfers(data.result)
      }
    })
  }

  useEffect(() => {
    onFilter(GET_DATA('assetTransfers.filterData'))
  }, [])

  const onChangePage = (pageData) => {
    const filterCache = GET_DATA('assetTransfers.filterData')
    onFilter({ ...(filterCache || {}), ...pageData })
  }

  const columns = [
    {
      title: 'Asset No',
      dataIndex: 'assetData',
      render: (v) => v?.assetNo || ''
    },
    {
      title: 'Asset',
      dataIndex: 'assetData',
      render: (v) => v?.name || ''
    },
    {
      title: 'Employee No',
      dataIndex: 'employeeData',
      render: (v) => v?.employeeNo || ''
    },
    {
      title: 'Employee',
      dataIndex: 'employeeData',
      render: (v) => v?.name || ''
    },

    {
      title: 'Assigned Date',
      dataIndex: 'assignedDate',
      render: (v) => moment(v).format('YYYY-MM-DD')
    },
    {
      title: 'Purpose',
      dataIndex: 'purpose'
    },
    {
      title: 'Returned Date',
      dataIndex: 'returnedDate'
    },
    {
      title: 'Staus',
      dataIndex: 'status'
    },
    {
      ...(validateAccess('edit-asset-transfer') && {
        title: 'Action',
        dataIndex: 'custom_action',
        render: (text, row) => (
          <div className="btn-group">
            <Button
              onClick={() => history.push(`/app/edit-asset-transfer/${row.id}`)}
              className="btn-glow dropdown-toggle">
              <EditOutlined />
            </Button>
          </div>
        )
      })
    }
  ]

  return (
    <TableBox
      dataSource={assetTransfers}
      columns={columns}
      pageData={GET_DATA('assetTransfers.filterData')}
      onChangePage={onChangePage}
    />
  )
}
