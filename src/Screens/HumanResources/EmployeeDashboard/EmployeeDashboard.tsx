import { EditOutlined } from '@ant-design/icons'
import { Col, Row } from 'antd'
import { ColumnType } from 'antd/lib/table'
import { useEffect, useState } from 'react'
import { useNavigate  } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Button from '../../../Components/Button'
import TableBox from '../../../Components/TableBox/TableBox'
import FilterLayout from '../../../Layout/FilterLayout'
import Panel from '../../../Layout/Panel'
import PanelLayout from '../../../Layout/PanelLayout'
import apiClient from '../../../Util/apiClient'
import { GET_DATA, SET_DATA, validateAccess } from '../../../Util/Util'
import Generate from '../AbsenceManagement/LeaveBalanceGeneration/Generate'
import LeaveBalance from './LeavesBalance'
import TaggedAssets from './TaggedAssets'

type TRecord = Record<string, unknown>

type TResult = {
  id: string
  amount: string
  repaymentPeriod: string
  deductionPerMonth: string
  deducted: string
  balance: string
  employeeData?: {
    employeeNo: string
    name: string
    email: string
  }
}

type TLoan = {
  result: TResult[]
  pageData: {
    page: number
    perPage: number
    totalCount: number
  }
}

export default function EmployeeDashboard() {
  const [employeeLoans, setEmployeeLoans] = useState<TResult[]>([])

  const { t } = useTranslation()

  const history = useNavigate()

  const getData = (params?: TRecord) => {
    const filterCache: TRecord = GET_DATA('employeeLoans.filterData') || {}
    params = { ...filterCache, ...params }

    apiClient.get<TLoan>('loan/get-all', { params }).then(({ status, data }) => {
      if (status === 200) {
        SET_DATA('employeeLoans.filterData', { ...params, ...data.pageData })
        console.log('first', data.result)
        setEmployeeLoans(data.result)
      }
    })
  }

  useEffect(() => {
    getData()
  }, [])

  const columns: ColumnType<TResult>[] = [
    {
      title: 'Emp no.',
      dataIndex: 'employeeNo',
      render: (text, row) => row.employeeData?.employeeNo
    },
    {
      title: 'Name',
      dataIndex: 'name',
      render: (text, row) => row.employeeData?.name
    },
    {
      title: 'Email',
      dataIndex: 'email',
      render: (text, row) => row.employeeData?.email
    },
    {
      title: 'Loan Amount',
      dataIndex: 'amount'
    },
    {
      title: 'Period Months',
      dataIndex: 'repaymentPeriod'
    },
    {
      title: 'Deduction Per Month',
      dataIndex: 'deductionPerMonth'
    },
    {
      title: 'Deducted So Far',
      dataIndex: 'deducted'
    },
    {
      title: 'Balance Due',
      dataIndex: 'balance'
    },
    {
      ...(validateAccess('edit-employee-loan') && {
        title: 'Action',
        dataIndex: 'custom_action',
        render: (text, row) => (
          <div className="btn-group">
            <Button onClick={() => history(`/app/edit-employee-loan/${row.id}`)} className="btn-glow">
              <EditOutlined />
            </Button>
          </div>
        )
      })
    }
  ]

  return (
    <FilterLayout filter={<Generate />}>
      <Row justify="center" className="mt-2 mb-2">
        <Col xs={22}>
          <PanelLayout title={t('Employee Dashboard')}>
            <Panel noBottom={false} title="Leave Balance">
              <LeaveBalance />
            </Panel>
            <Panel noBottom={false} title="Tagged Assets">
              <TaggedAssets />
            </Panel>
            <Panel noBottom={false} title="Loans and Advances">
              <TableBox
                dataSource={employeeLoans}
                columns={columns}
                pageData={GET_DATA('employeeLoans.filterData')}
                onChangePage={getData}
              />
            </Panel>
          </PanelLayout>
        </Col>
      </Row>
    </FilterLayout>
  )
}
