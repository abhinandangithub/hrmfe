import { EditOutlined } from '@ant-design/icons'
import moment from 'moment'
import { useEffect, useState } from 'react'
import { Link, useNavigate  } from 'react-router-dom'
import Button from '../../../../Components/Button'
import TableBox from '../../../../Components/TableBox/TableBox'
import FilterLayout from '../../../../Layout/FilterLayout'
import apiClient from '../../../../Util/apiClient'
import { GET_DATA, SET_DATA, validateAccess } from '../../../../Util/Util'
import CompanyCalendarFilter from './CompanyCalendarFilter'

export default function CompanyCalendar() {
  //   match: {
  //     params: { id }
  //   }
  // })
  const [calendar, setCalendar] = useState([])

  const history = useNavigate()

  const onFilter = (params = {}) => {
    apiClient.get('yearly-calender/get-year-ids', { params }).then(({ data }) => {
      if (data.result) {
        SET_DATA('CompanyCalendar.filterData', { ...params, ...data.pageData })

        setCalendar(data.result)
      }
    })
  }

  useEffect(() => {
    onFilter(GET_DATA('CompanyCalendar.filterData'))
  }, [])

  const onChangePage = (pageData) => {
    const filterCache = GET_DATA('CompanyCalendar.filterData')
    onFilter({ ...(filterCache || {}), ...pageData })
  }

  const columns = [
    {
      title: 'Calendar Year',
      dataIndex: 'name',
      render: (v, r) => <Link to={`/app/edit-company-calendar/${r.id}`}>{v}</Link>
    },
    {
      title: 'From Month',
      dataIndex: 'startDate',
      render: (text) => (text ? moment(text).format('YYYY-MM-DD') : '')
      // render: (v) => v?.join(', ')
    },
    {
      title: 'To Month',
      dataIndex: 'endDate',
      render: (text) => (text ? moment(text).format('YYYY-MM-DD') : '')
    },

    {
      ...(validateAccess('edit-company-calendar') && {
        title: 'Action',
        dataIndex: 'custom_action',
        render: (text, row) => (
          <div className="btn-group">
            <Button
              onClick={() => history(`/app/edit-company-calendar/${row.id}`)}
              className="btn glow dropdown-toggle">
              <EditOutlined />
            </Button>
          </div>
        )
      })
    }
  ]

  return (
    <FilterLayout filter={<CompanyCalendarFilter onFilter={onFilter} />}>
      <div className="top-filter-options">
        <h2>Company Calendar Overview</h2>
      </div>
      <TableBox
        dataSource={calendar}
        columns={columns}
        pageData={GET_DATA('CompanyCalendar.filterData')}
        onChangePage={onChangePage}
      />
    </FilterLayout>
  )
}
