import { LoadingOutlined } from '@ant-design/icons'
import { Col, Row } from 'antd'
import moment from 'moment'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Button from '../../Components/Button'
import ModalBox from '../../Components/ModalBox/ModalBox'
import TableBox from '../../Components/TableBox/TableBox'
import apiClient from '../../Util/apiClient'

const flatToNested = (list) => {
  const map = {}
  const roots = []
  list.forEach((node, i) => {
    map[list[i].id] = i
    node.key = node.id

    if (node.parentId && list[map[node.parentId]]) {
      // if (cond) {
      if (list[map[node.parentId]].children) {
        list[map[node.parentId]].children.push(node)
      } else {
        list[map[node.parentId]].children = [node]
      }
    } else {
      roots.push(node)
    }
  })

  return roots
}

export default function DocumentFlows(props) {
  const [toggle, setToggle] = useState(false)

  return (
    <>
      <Button className="ml-2" style={{ backgroundColor: '#8bc34a' }} onClick={() => setToggle(true)}>
        <i className="m-auto text-white fa flaticon-people" />
      </Button>
      <ModalBox
        title="Document Flow"
        visible={!!toggle}
        onOk={() => null}
        onCancel={() => setToggle(false)}
        footer={null}
        destroyOnClose>
        <DocumentFlow {...props} />
      </ModalBox>
    </>
  )
}

function DocumentFlow({ documentFlowReference, documentFlowType = 'sales' }) {
  const [documents, setDocuments] = useState([])
  const [loading, setLoading] = useState('Loading document flow!')

  useEffect(() => {
    apiClient.get(`document-flows/${documentFlowType}/${documentFlowReference}`).then(({ data }) => {
      if (data?.result) {
        setDocuments(flatToNested(data.result))
      }

      setLoading(false)
    })
  }, [])

  const getPath = (r) => {
    switch (r.type) {
      case 'Quotation':
        return `/app/sales-quotations/${r.id}`
      case 'Sales Order':
        return `/app/sales-orders/${r.id}`
      case 'Delivery':
        return `/app/sales-deliveries/${r.id}`
      case 'Delivery Return':
        return `/app/delivery-returns/${r.id}`
      case 'Sales Invoice':
        return `/app/incomes/${r.id}`
      case 'Advance':
        return `/app/customer-advances/${r.id}`
      case 'Receipt':
        return `/app/invoice-receipts/${r.id}`
      case 'Credit Invoice':
        return `/app/credit-invoices/${r.id}`

      case 'Purchase Request':
        return `/app/purchase-request/${r.id}`
      case 'Purchase Order':
        return `/app/purchase-orders/${r.id}`
      case 'Purchase Receipt':
        return `/app/purchase-receipts/${r.id}`
      case 'Goods Return':
        return `/app/goods-returns/${r.id}`
      case 'Custom Clearance':
        return `/app/customs-clearances/${r.id}`
      case 'Purchase Invoice':
        return `/app/expenses/${r.id}`
      case 'Payment':
        return `/app/expense-payments/${r.id}`
      case 'Debit Invoice':
        return `/app/debit-invoices/${r.id}`

      default:
        return ''
    }
  }

  const invoiceColumns = [
    {
      title: 'Doc No',
      dataIndex: 'documentNo',
      render: (v, r) => (
        <div>
          {r.type}{' '}
          <Link to={getPath(r)} target="_blank">
            {v}
          </Link>
        </div>
      )
    },
    {
      title: 'Date',
      dataIndex: 'date',
      render: (v) => moment(v).format('YYYY-DD-MM')
    },
    {
      title: 'Status',
      dataIndex: 'status'
    }
  ]

  return (
    <div>
      <Row>
        {}
        {!loading ? (
          <Col lg={24}>
            <TableBox dataSource={documents} columns={invoiceColumns} defaultExpandAllRows />
          </Col>
        ) : (
          <div>
            <LoadingOutlined /> {loading}
          </div>
        )}
      </Row>
    </div>
  )
}
