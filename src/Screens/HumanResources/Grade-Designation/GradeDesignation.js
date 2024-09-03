import { EditOutlined } from '@ant-design/icons'
import { useEffect, useState } from 'react'
import { useNavigate  } from 'react-router-dom'
import Button from '../../../Components/Button'
import TableBox from '../../../Components/TableBox/TableBox'
import FilterLayout from '../../../Layout/FilterLayout'
import apiClient from '../../../Util/apiClient'
import { GRADE } from '../../../Util/Options'
import { GET_DATA, SET_DATA, validateAccess } from '../../../Util/Util'
import GradeFilter from './GradeDesignationFilter'

export default function Grade() {
  const [employees, setEmployees] = useState([])
  const history = useNavigate()

  const onFilter = (params = {}) => {
    apiClient.get('grade/get', { params }).then(({ data }) => {
      if (data && data.result) {
        SET_DATA('grade.filterData', { ...params, ...data.pageData })
        setEmployees(data.result)
      }
    })
  }

  useEffect(() => {
    onFilter(GET_DATA('grade.filterData'))
  }, [])

  const onChangePage = (pageData) => {
    const filterCache = GET_DATA('grade.filterData')
    onFilter({ ...(filterCache || {}), ...pageData })
  }

  const columns = [
    {
      title: 'Grade',
      dataIndex: 'grade',
      render: (v) => GRADE.find((g) => g.value === v)?.label || ''
    },
    {
      title: 'Designation',
      dataIndex: 'designation',
      render: (v) => v?.join(', ')
    },

    {
      ...(validateAccess('edit-Grade-Designation') && {
        title: 'Action',
        dataIndex: 'custom_action',
        render: (text, row) => (
          <div className="btn-group">
            <Button
              onClick={() => history(`/app/edit-Grade-Designation/${row.id}`)}
              className="btn glow dropdown-toggle">
              <EditOutlined />
            </Button>
          </div>
        )
      })
    }
  ]

  return (
    <FilterLayout filter={<GradeFilter onFilter={onFilter} />}>
      <div className="top-filter-options">
        <h2>Grade Overview</h2>
      </div>
      <TableBox
        dataSource={employees}
        columns={columns}
        pageData={GET_DATA('grade.filterData')}
        onChangePage={onChangePage}
      />
    </FilterLayout>
  )
}
