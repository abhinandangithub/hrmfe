import { Col, message, Row } from 'antd'
import { useEffect, useState } from 'react'
import TableBox from '../../../Components/TableBox/TableBox'
import FilterLayout from '../../../Layout/FilterLayout'
import apiClient from '../../../Util/apiClient'
import { GET_DATA, SET_DATA } from '../../../Util/Util'
import TaxdataFilter from './TaxdataFilter'

export default function Payrolls() {
  const [taxData, setTaxData] = useState([])

  useEffect(() => {
    onFilter(GET_DATA('taxData.filterData'))
  }, [])

  const onFilter = (obj = {}) => {
    apiClient.get('tax-data/getAll', { params: obj }).then(({ data }) => {
      if (data && data.result) {
        SET_DATA('taxData.filterData', { ...obj, ...data.pageData })
        setTaxData(data.result)

        if (data.result.length === 0) {
          message.info('No data for this month')
        }
      }
    })
  }

  const onChangePage = (pageData) => {
    const filterCache = GET_DATA('taxData.filterData')
    onFilter({ ...(filterCache || {}), ...pageData })
  }

  const columns = [
    {
      title: 'Tax Code',
      dataIndex: 'taxCode'
    },
    {
      title: 'From',
      dataIndex: 'from'
    },
    {
      title: 'To',
      dataIndex: 'to'
    },
    {
      title: 'Tax',
      dataIndex: 'tax'
    },
    {
      title: 'Year',
      dataIndex: 'year'
    },
    {
      title: 'State',
      dataIndex: 'state'
    }
  ]

  return (
    <FilterLayout filter={<TaxdataFilter onFilter={onFilter} />}>
      <Row>
        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 12 }}>
          <div className="top-filter-options">
            <h2>Tax Data Overview</h2>
          </div>
        </Col>
      </Row>
      <TableBox
        dataSource={taxData}
        columns={columns}
        pageData={GET_DATA('taxData.filterData')}
        onChangePage={onChangePage}
      />
    </FilterLayout>
  )
}
