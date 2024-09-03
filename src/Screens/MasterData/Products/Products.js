import { SettingOutlined } from '@ant-design/icons'
import { message, Popover } from 'antd'
import { useEffect, useState } from 'react'
import { Link, useNavigate  } from 'react-router-dom'
import TableBox from '../../../Components/TableBox/TableBox'
import FilterLayout from '../../../Layout/FilterLayout'
import TableLayout from '../../../Layout/TableLayout'
import apiClient from '../../../Util/apiClient'
import { GET_DATA, SET_DATA, validateAccess } from '../../../Util/Util'
import ProductFilter from './ProductFilter'

export default function Products({ productType, setProductType }) {
  const history = useNavigate()
  const [products, setProducts] = useState([])

  const onFilter = (params = {}) => {
    apiClient.get('products/get', { params }).then(({ data }) => {
      if (data.result) {
        SET_DATA('products.filterData', { ...params, ...data.pageData })
        setProducts(data.result)
      }
    })
  }

  useEffect(() => {
    onFilter(GET_DATA('products.filterData'))
  }, [])

  const onChangePage = (pageData) => {
    const filterCache = GET_DATA('products.filterData')
    onFilter({ ...(filterCache || {}), ...pageData })
  }

  const onDelete = (id) => {
    apiClient.delete(`products/delete/${id}`).then(({ data }) => {
      if (data && data.result) {
        setProducts(products.filter((item) => item.id !== id))
        message.success('Product Deleted')
      }
    })
  }

  const onDuplicate = (row) => {
    history({ pathname: '/app/add-product', state: { duplicateId: row.id } })
  }

  const tableContent = (row) => (
    <div className="action-buttons">
      <ul>
        <li>
          <Link to={`/app/edit-product/${row.id}`}>
            <i className="flaticon-edit-1" /> Edit
          </Link>
        </li>
        {validateAccess('add-product') && (
          <li>
            <a onClick={() => onDuplicate(row)}>
              <i className="flaticon-copy" /> Duplicate
            </a>
          </li>
        )}
        <li>
          <li>
            <a onClick={() => onDelete(row.id)}>
              <i className="flaticon-delete-2" /> Delete
            </a>
          </li>
        </li>
      </ul>
    </div>
  )

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      render: (v, r) => <Link to={`/app/edit-product/${r.id}`}>{v}</Link>
    },
    {
      title: 'Unit',
      dataIndex: 'unit'
    },
    {
      title: 'Unit Price',
      dataIndex: 'unitPrice'
    },
    {
      title: 'Currency',
      dataIndex: 'currency'
    },
    {
      title: 'Notes',
      dataIndex: 'notes'
    },
    {
      ...(validateAccess('edit-product') && {
        title: 'Action',
        dataIndex: 'custom_action',
        render: (text, row) => (
          <Popover placement="bottomRight" content={tableContent(row)} trigger="click">
            <div className="btn-group">
              <button type="button" className="btn glow dropdown-toggle">
                {' '}
                <SettingOutlined /> <span className="caret" />
              </button>
            </div>
          </Popover>
        )
      })
    }
  ]

  return (
    <FilterLayout
      filter={
        <ProductFilter onFilter={onFilter} productType={productType} setProductType={setProductType} />
      }>
      <TableLayout title="Products (Service)" exportUrl="products/export">
        <TableBox
          dataSource={products}
          columns={columns}
          pageData={GET_DATA('products.filterData')}
          onChangePage={onChangePage}
        />
      </TableLayout>
    </FilterLayout>
  )
}
