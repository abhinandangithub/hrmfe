import { EditOutlined, PlusCircleFilled } from '@ant-design/icons'
import { useEffect, useState } from 'react'
import Button from '../../../Components/Button'
import ModalBox from '../../../Components/ModalBox/ModalBox'
import TableBox from '../../../Components/TableBox/TableBox'
import FilterLayout from '../../../Layout/FilterLayout'
import TableLayout from '../../../Layout/TableLayout'
import apiClient from '../../../Util/apiClient'
import { GET_DATA } from '../../../Util/Util'
import Filter from './CostCenterFilter'
import CostCenterForm from './CostCenterForm'

const flatToNested = (list) => {
  const map = {}
  const roots = []
  list.forEach((node, i) => {
    map[list[i].costCenterNo] = i
    node.key = node.costCenterNo

    if (node.parentId && list[map[node.parentId]]) {
      if (list[map[node.parentId]].children) {
        list[map[node.parentId]].children.push(node)
      } else {
        list[map[node.parentId]].children = [node]
      }
    } else {
      roots.push(node)
    }
  })
  console.log('roots', roots)

  return roots
}

function CostCenters({ companyInfo }) {
  const [costCenters, setCostCenters] = useState([])
  const [openForm, setOpenForm] = useState(false)
  const [parentData, setParentData] = useState(null)

  useEffect(() => {
    onFilter()
  }, [])

  const onFilter = (params = {}) => {
    apiClient.get('cost-centers/get', { params }).then(({ data }) => {
      if (data.result) {
        setCostCenters(flatToNested(data.result))
      }
    })
  }

  const onAdd = (row) => {
    setParentData(row.costCenterNo !== companyInfo?.name ? row : false)
    setOpenForm(true)
  }

  const columns = [
    {
      title: 'Cost Center No',
      dataIndex: 'costCenterNo',
      render: (v) => (
        <div>
          <b>{v}</b>
        </div>
      )
    },
    { title: 'Name', dataIndex: 'name' },
    { title: 'Responsible', dataIndex: 'employeeData', render: (v) => v?.name || '' },
    { title: 'Status', dataIndex: 'status' },
    {
      title: 'Action',
      dataIndex: 'custom_action',

      render: (text, row) => (
        <div className="btn-group">
          <Button
            onClick={() => setOpenForm(row)}
            className="btn glow dropdown-toggle"
            disabled={row.costCenterNo === companyInfo?.name}>
            <EditOutlined />
          </Button>

          <Button className="ml-2 btn-glow" success onClick={() => onAdd(row)}>
            <PlusCircleFilled />
          </Button>
        </div>
      )
    }
  ]

  const onCancel = (type) => {
    if (type) {
      onFilter(GET_DATA('costCenters.filterData'))
      setParentData(false)
      setOpenForm(false)
    } else {
      setOpenForm(false)
      setParentData(false)
    }
  }

  const dataSource = [{ costCenterNo: companyInfo?.name, name: companyInfo?.name, children: costCenters }]

  return (
    <FilterLayout
      title="Cost Centers"
      filterData={GET_DATA('incomes.filterData')}
      filter={<Filter onFilter={onFilter} />}>
      <TableLayout title="Cost Centers">
        <TableBox dataSource={dataSource} columns={columns} defaultExpandAllRows />
      </TableLayout>
      <ModalBox
        title="Cost Center"
        visible={!!openForm}
        footer={null}
        onCancel={() => onCancel()}
        destroyOnClose>
        <CostCenterForm
          onCancel={onCancel}
          parentData={parentData}
          selectedData={typeof openForm === 'object' ? openForm : false}
        />
      </ModalBox>
    </FilterLayout>
  )
}

export default CostCenters
