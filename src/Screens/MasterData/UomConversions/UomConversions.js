import { EditOutlined } from '@ant-design/icons'
import { Col, Row } from 'antd'
import React, { useEffect, useState } from 'react'
import { useNavigate  } from 'react-router-dom'
import Button from '../../../Components/Button'
import TableBox from '../../../Components/TableBox/TableBox'
import FilterLayout from '../../../Layout/FilterLayout'
import apiClient from '../../../Util/apiClient'
import { GET_DATA, SET_DATA, validateAccess } from '../../../Util/Util'
import Filter from './UomConversionFilter'

export default function UomConversions() {
  const history = useNavigate()

  const [uomConversions, setUomConversions] = useState([])

  useEffect(() => {
    onFilter(GET_DATA('uomConversions.filterData'))
  }, [])

  const onFilter = (obj = {}) => {
    apiClient.get('uom-conversions/get', { params: obj }).then(({ data }) => {
      if (data && data.result) {
        SET_DATA('uomConversions.filterData', { ...obj, ...data.pageData })
        setUomConversions(data.result)
      }
    })
  }

  const onChangePage = (pageData) => {
    const filterCache = GET_DATA('uomConversions.filterData')
    onFilter({ ...(filterCache || {}), ...pageData })
  }

  const columns = [
    {
      title: 'From UOM',
      dataIndex: 'fromUom'
    },
    {
      title: 'From UOM Decimal',
      dataIndex: 'fromUomDecimal'
    },
    {
      title: 'To UOM',
      dataIndex: 'toUom'
    },
    {
      title: 'To UOM Decimal',
      dataIndex: 'toUomDecimal'
    },
    {
      title: 'Conversion',
      dataIndex: 'conversion'
    },
    {
      title: 'Status',
      dataIndex: 'status'
    },
    {
      ...(validateAccess('edit-uom-conversion') && {
        title: 'Action',
        dataIndex: 'custom_action',
        render: (text, row) => (
          <div className="btn-group">
            <Button
              onClick={() => history(`/app/edit-uom-conversion/${row.id}`)}
              className="btn glow dropdown-toggle">
              <EditOutlined />
            </Button>
          </div>
        )
      })
    }
  ]

  return (
    <FilterLayout filter={<Filter onFilter={onFilter} />}>
      <Row>
        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 12 }}>
          <div className="top-filter-options">
            <h2>UOM Conversions</h2>
          </div>
        </Col>
      </Row>
      <TableBox
        dataSource={uomConversions}
        columns={columns}
        pageData={GET_DATA('uomConversions.filterData')}
        onChangePage={onChangePage}
      />
    </FilterLayout>
  )
}
