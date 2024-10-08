import { InfoCircleOutlined, SettingOutlined } from '@ant-design/icons'
import { Space } from 'antd'
import { useEffect, useState } from 'react'
import { Link, useNavigate  } from 'react-router-dom'
import TableBox from '../../../Components/TableBox/TableBox'
import FilterLayout from '../../../Layout/FilterLayout'
import TableLayout from '../../../Layout/TableLayout'
import apiClient from '../../../Util/apiClient'
import { GET_DATA, SET_DATA, validateAccess } from '../../../Util/Util'
import LogsModal from '../../Logs/LogsModal'
import VendorFilter from './VendorFilter'

export default function Clients() {
  const [vendors, setVendors] = useState([])
  const [toggleLog, setToggleLog] = useState(false)

  const history = useNavigate()

  const onFilter = (params = {}) => {
    apiClient.get('clients/getAll', { params: { ...params, type: 'Vendor' } }).then(({ data }) => {
      if (data.result) {
        SET_DATA('vendors.filterData', { ...params, ...data.pageData })
        setVendors(data.result)
      }
    })
  }

  useEffect(() => {
    onFilter(GET_DATA('vendors.filterData'))
  }, [])

  const onChangePage = (pageData) => {
    const filterCache = GET_DATA('vendors.filterData')
    onFilter({ ...(filterCache || {}), ...pageData })
  }

  const columns = [
    {
      title: 'Client No',
      dataIndex: 'clientNo',
      render: (v, r) => <Link to={`/app/edit-vendor/${r.id}`}>{v}</Link>
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
      title: 'Group',
      dataIndex: 'group'
    },
    {
      title: 'Status',
      dataIndex: 'status'
    },
    validateAccess('edit-vendor')
      ? {
          title: 'Action',
          dataIndex: 'custom_action',
          render: (text, row) => (
            <div className="btn-group">
              <Space>
                <button
                  type="button"
                  onClick={() => history(`/app/edit-vendor/${row.id}`)}
                  className="btn glow dropdown-toggle">
                  {' '}
                  <SettingOutlined />
                </button>
                <button
                  type="button"
                  onClick={() => setToggleLog(row.id)}
                  className="btn glow dropdown-toggle">
                  <InfoCircleOutlined />
                </button>
              </Space>
            </div>
          )
        }
      : {}
  ]

  return (
    <FilterLayout filter={<VendorFilter onFilter={onFilter} />} filterData={{ type: 'Vendor' }}>
      <TableLayout title="Vendors Overview" exportUrl="clients/export">
        <TableBox
          dataSource={vendors}
          columns={columns}
          pageData={GET_DATA('vendors.filterData')}
          onChangePage={onChangePage}
        />
      </TableLayout>
      <LogsModal entityId={toggleLog} entityType="Vendor" onCancel={setToggleLog} />
    </FilterLayout>
  )
}
