import moment from 'moment'
import { useEffect, useState } from 'react'
import TableBox from '../../../../Components/TableBox/TableBox'
import TableLayout from '../../../../Layout/TableLayout'
import apiClient from '../../../../Util/apiClient'

function LeaveRequestView(props) {
  console.log('props', props)
  const [dataSource, setDataSource] = useState([])

  const colData = [
    {
      title: 'Calender Year',
      dataIndex: 'calenderYearData',
      key: 'calenderYearData',
      render: (v) => v.name
    },
    {
      title: 'Employee No - Name',
      dataIndex: 'employeeData',
      key: 'employeeData',
      render: (v) => `${v.employeeNo} - ${v.name}`
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      render: (v) => moment(v).format('YYYY-MM-DD')
    },
    {
      title: 'Reason',
      dataIndex: 'description',
      key: 'description'
    },
    {
      title: 'Leave Type',
      dataIndex: 'leaveType',
      key: 'leaveType'
    },
    {
      title: 'Duration',
      dataIndex: 'duration',
      key: 'duration'
    }
  ]

  const getData = () => {
    if (props.match.params.id) {
      let endpoint = `absence-management/by-entity-id/${props.match.params.id}`
      if (props.activeTab === 'Rejected') {
        endpoint = `absence-management/by-entity-id-reject/${props.match.params.id}`
      }
      apiClient.get(endpoint).then(({ data }) => {
        if (data && data.result) {
          setDataSource(data.result)
        }
      })
    }
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <TableLayout>
      <TableBox dataSource={dataSource} columns={colData} />
    </TableLayout>
  )
}

export default LeaveRequestView
