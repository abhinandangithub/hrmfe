import { SettingOutlined } from '@ant-design/icons'
import { Popover } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'
import TableBox from '../../../Components/TableBox/TableBox'
import FilterLayout from '../../../Layout/FilterLayout'
import TableLayout from '../../../Layout/TableLayout'
import AppraisalReviewFilter from './AppraisalReviewFilter'

export default function AppraisalReview() {
  const columns = [
    {
      title: 'Goal Name',
      dataIndex: 'goalName'
    },
    {
      title: 'Start Date',
      dataIndex: 'startDate'
    },
    {
      title: 'End Date',
      dataIndex: 'endDate'
    },
    {
      title: 'Expected Outcome',
      dataIndex: 'expectedOutcome'
    },
    {
      title: 'Weightage(%)',
      dataIndex: 'weightage'
    },
    {
      title: 'Added By',
      dataIndex: 'addedBy'
    },
    {
      title: 'Employee Rating',
      dataIndex: 'employeeRating'
    },
    {
      title: 'Employee Comment',
      dataIndex: 'employeeComment'
    },
    {
      title: 'Manager Rating',
      dataIndex: 'managerRating'
    },
    {
      title: 'Manager Comment',
      dataIndex: 'managerComment'
    },
    {
      title: 'Document',
      dataIndex: 'document '
    },
    {
      title: 'Action',
      dataIndex: 'custom_action',
      render: (text, row) => (
        <Popover placement="bottomRight" content={tableActions(row)} trigger="click">
          <div className="btn-group">
            <button type="button" className="btn glow dropdown-toggle">
              <SettingOutlined /> <span className="caret" />
            </button>
          </div>
        </Popover>
      )
    }
  ]

  const tableActions = () => (
    <div className="action-buttons">
      <ul>
        <li>
          <Link to="/add-appraisal-review">
            <i className="flaticon-edit-1" /> Add Review
          </Link>
        </li>
      </ul>
    </div>
  )

  return (
    <FilterLayout filter={<AppraisalReviewFilter />}>
      <TableLayout title="Appraisal Review" exportUrl="asset/export">
        <TableBox columns={columns} />
      </TableLayout>
    </FilterLayout>
  )
}
