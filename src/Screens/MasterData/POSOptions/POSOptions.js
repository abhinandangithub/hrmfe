import { EditOutlined } from '@ant-design/icons'
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import Button from '../../../Components/Button'
import TableBox from '../../../Components/TableBox/TableBox'
import FilterLayout from '../../../Layout/FilterLayout'
import TableLayout from '../../../Layout/TableLayout'
import apiClient from '../../../Util/apiClient'
import { GET_DATA, SET_DATA, validateAccess } from '../../../Util/Util'
import POSOptionFilter from './POSOptionFilter'

export default function POSOptions() {
  const [options, setOptions] = useState([])
  const history = useHistory()

  const getData = (params) => {
    const filterCache = GET_DATA('POSOptions.filterData') || {}
    params = { ...filterCache, ...params }

    apiClient.get('pos-options', { params }).then(({ status, data }) => {
      if (status === 200) {
        SET_DATA('POSOptions.filterData', { ...params, ...data.pageData })
        setOptions(data.result)
      }
    })
  }

  useEffect(() => {
    getData()
  }, [])

  const columns = [
    {
      title: 'Category',
      dataIndex: 'category'
    },
    {
      title: 'Sub Category',
      dataIndex: 'subCategory'
    },
    {
      ...(validateAccess('edit-pos-option') && {
        title: 'Action',
        dataIndex: 'custom_action',
        render: (text, row) => (
          <div className="btn-group">
            <Button onClick={() => history.push(`/app/edit-pos-option/${row.id}`)} className="btn-glow">
              <EditOutlined />
            </Button>
          </div>
        )
      })
    }
  ]

  return (
    <FilterLayout
      addButton={{
        title: 'POS Option',
        onClick: () => history.push('/app/add-pos-option'),
        access: 'add-pos-option'
      }}
      filterData={GET_DATA('POSOptions.filterData')}
      filter={<POSOptionFilter onSubmit={getData} />}>
      <TableLayout title="POS Option Overview">
        <TableBox
          dataSource={options}
          columns={columns}
          pageData={GET_DATA('POSOptions.filterData')}
          onChangePage={getData}
        />
      </TableLayout>
    </FilterLayout>
  )
}
