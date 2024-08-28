import { message } from 'antd'
import moment from 'moment'
import { useEffect, useState } from 'react'
import TableBox from '../../../Components/TableBox/TableBox'
import apiClient from '../../../Util/apiClient'
import { GET_DATA, SET_DATA } from '../../../Util/Util'

const columnData = () => [
  {
    title: 'Calender Year',
    dataIndex: 'calenderYearData',
    key: 'calenderYear',
    render: (v) => v?.name
  },
  {
    title: 'Emp. No.',
    dataIndex: 'employeeNo',
    key: 'empNo'
  },
  {
    title: 'Emp. Name',
    dataIndex: 'employeeData',
    key: 'empname',
    render: (v) => v?.name
  },
  {
    title: 'Date of joining',
    dataIndex: 'employeeData',
    key: 'joiningDate',
    render: (v) => (v?.joiningDate ? moment(v?.joiningDate).format('YYYY-MM-DD') : '')
  },
  {
    title: 'Role',
    dataIndex: 'roleData',
    key: 'roleName',
    render: (v) => v?.name
  }
]

export default function LeaveBalance() {
  const [dataSource, setDataSource] = useState([])
  // const [employeesName, setEmployeesName] = useState([])
  const [columns, setColumns] = useState(columnData())

  const getData = async (filterObj, type) => {
    if (type === 'sync') {
      apiClient.post('/leave-balance/add-many', filterObj).then(({ data }) => {
        if (data && data.result) {
          message.success('Data Synced Successfully')
          getData(filterObj || {}, 'show')
        }
      })
    } else {
      apiClient.get('/leave-balance/by-calender-year', { params: filterObj }).then(({ data }) => {
        if (data && data.result) {
          SET_DATA('leaveBalance.filterData', { ...filterObj, ...data.pageData })

          if (data.result.length === 0) {
            message.info('No data for this Year')
            setDataSource([])
          } else {
            const columnObject = {}
            const tableData = data.result.map((value) => {
              const obj = { ...value }
              value.leaves.map((node) => {
                const type = node.type.replaceAll(' ', '')

                if (!columnObject[type]) {
                  if (type !== 'LossOfPay') {
                    columnObject[type] = {
                      title: node.type,
                      children: [
                        {
                          title: 'Total',
                          dataIndex: `total${type}`,
                          key: `total${type}`
                        },
                        {
                          title: 'Availed',
                          dataIndex: `availed${type}`,
                          key: `availed${type}`
                        },
                        {
                          title: 'Balance',
                          dataIndex: `balance${type}`,
                          key: `balance${type}`
                        }
                      ]
                    }
                  } else {
                    columnObject[type] = {
                      title: node.type,
                      children: [
                        {
                          title: 'Availed',
                          dataIndex: `availed${type}`,
                          key: `availed${type}`
                        }
                      ]
                    }
                  }
                }

                obj[`total${type}`] = node.total || 0
                obj[`availed${type}`] = node.availed || 0
                obj[`balance${type}`] = node.total - node.availed || 0

                return value
              })

              return obj
            })

            setColumns([...columnData(), ...Object.values(columnObject)])
            setDataSource(tableData)
          }

          return null
        }
      })

      // const filterObj2 = _.omit(filterObj, 'calenderYear')

      // apiClient.get('/', { params: filterObj2 }).then(({ data }) => {
      //   if (data && data.result) {
      //     setEmployeesName(convertSelectOptions(data.result || [], 'name', '_id'))
      //   }
      // })
    }
  }

  const onChangePage = (pageData) => {
    const filterCache = GET_DATA('leaveBalance.filterData')

    getData({ ...(filterCache || {}), ...pageData }, 'Show')
  }

  useEffect(() => {
    const filterCache = GET_DATA('leaveBalance.filterData')

    getData(filterCache || {}, 'Show')
  }, [])

  return (
    <TableBox
      dataSource={dataSource}
      columns={columns}
      bordered
      pageData={GET_DATA('leaveBalance.filterData')}
      onChangePage={onChangePage}
    />
  )
}
