import React from 'react'
import { useHistory } from 'react-router-dom'
import TableBox from '../../../Components/TableBox/TableBox'
import FilterLayout from '../../../Layout/FilterLayout'
import TableLayout from '../../../Layout/TableLayout'
import AbsenceManagementFilter from './AbsenceManagementFilter'

export default function AbsenceManagement() {
  const history = useHistory()

  const columns = [
    {
      title: 'Date',
      dataIndex: 'date'
    },
    {
      title: 'Leave Type',
      dataIndex: 'leaveType'
    },
    {
      title: 'Leave Balance(Days)',
      dataIndex: 'leaveBalance'
    },
    {
      title: 'Status',
      dataIndex: 'status'
    }
  ]

  return (
    <FilterLayout
      addButton={{
        title: 'Add Absent',
        onClick: () => history.push('/app/apply-leave'),
        access: 'apply-leave'
      }}
      filter={<AbsenceManagementFilter />}>
      <TableLayout title="Employee Absence Management" exportUrl="asset/export">
        <TableBox
          columns={columns}
          actionIndex="custom_action"
          cardHeaderIndex="status"
          cardFirstLabelIndex="docno"
        />
      </TableLayout>
    </FilterLayout>
  )
}
