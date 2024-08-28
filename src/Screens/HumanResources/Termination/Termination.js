import { EditOutlined } from '@ant-design/icons'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import Button from '../../../Components/Button'
import TableBox from '../../../Components/TableBox/TableBox'
import FilterLayout from '../../../Layout/FilterLayout'
import apiClient from '../../../Util/apiClient'
import { GET_DATA, SET_DATA, validateAccess } from '../../../Util/Util'
import TerminationFilter from './TerminationFilter'

export default function Termination() {
  //   match: {
  //     params: { id }
  //   }
  // })
  const [calendar, setCalendar] = useState([])

  const history = useHistory()

  const onFilter = (params = {}) => {
    apiClient.get('termination/get-all', { params }).then(({ data }) => {
      if (data && data.result) {
        SET_DATA('Termination.filterData', { ...params, ...data.pageData })

        setCalendar(data.result)
      }
    })
  }

  useEffect(() => {
    onFilter(GET_DATA('Termination.filterData'))
  }, [])

  const onChangePage = (pageData) => {
    const filterCache = GET_DATA('Termination.filterData')
    onFilter({ ...(filterCache || {}), ...pageData })
  }

  const columns = [
    {
      title: 'Employee',
      dataIndex: 'employee',
      render: (v, r) => <Link to={`/app/edit-termination/${r.id}`}>{v}</Link>
    },
    {
      title: 'Termination Date',
      dataIndex: 'terminationDate',
      render: (text) => (text ? moment(text).format('YYYY-MM-DD') : '')
      // render: (v) => v?.join(', ')
    },
    {
      title: 'Reference Number',
      dataIndex: 'RefNo'
    },
    {
      title: 'Last Working Date',
      dataIndex: 'lastWorkingDate',
      render: (text) => (text ? moment(text).format('YYYY-MM-DD') : '')
    },
    {
      title: 'Remarks',
      dataIndex: 'endDate'
    },

    {
      ...(validateAccess('edit-termination') && {
        title: 'Action',
        dataIndex: 'custom_action',
        render: (text, row) => (
          <div className="btn-group">
            <Button
              onClick={() => history.push(`/app/edit-termination/${row.id}`)}
              className="btn glow dropdown-toggle">
              <EditOutlined />
            </Button>
          </div>
        )
      })
    }
  ]

  return (
    <FilterLayout filter={<TerminationFilter onFilter={onFilter} />}>
      <div className="top-filter-options">
        <h2>Termination Overview</h2>
      </div>
      <TableBox
        dataSource={calendar}
        columns={columns}
        pageData={GET_DATA('Termination.filterData')}
        onChangePage={onChangePage}
      />
    </FilterLayout>
  )
}
