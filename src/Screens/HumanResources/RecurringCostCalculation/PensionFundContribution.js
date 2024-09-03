import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { useNavigate  } from 'react-router-dom'
import Button from '../../../Components/Button'
import TableBox from '../../../Components/TableBox/TableBox'
import apiClient from '../../../Util/apiClient'
import { SET_DATA } from '../../../Util/Util'

export default function PensionFundContribution({ filterData, companyInfo }) {
  const history = useNavigate()
  const [pensionFunds, setPensionFunds] = useState([])

  useEffect(() => {
    const params = {}

    if (filterData.date) {
      params.year = moment(filterData.date).format('YYYY')
      params.month = moment(filterData.date).format('M')
    }

    if (filterData.type === 'Calculate') {
      apiClient.post('/recurring-cost-calculations/pension-funds/generate', params).then(({ data }) => {
        if (data?.result) {
          getData(params)
        }
      })
    } else {
      getData(params)
    }
  }, [filterData])

  const getData = (params = {}) => {
    apiClient.get('/recurring-cost-calculations/pension-funds/get', { params }).then(({ data }) => {
      if (data?.result) {
        setPensionFunds(data.result)
      }
    })
  }

  const onGenerateExpense = () => {
    const month = moment(filterData.date).format('MMM')
    const year = moment(filterData.date).format('YYYY')

    const items = pensionFunds.map((v) => ({
      type: '',
      product: `${v.category} - ${month} - ${year}`,
      description: '',
      quantity: 1,
      unit: 'Month',
      unitPrice: v.amount,
      discount: '',
      discountFormat: '%',
      retention: '',
      retentionFormat: '%',
      charge: '',
      chargeFormat: '%',
      tax: 0,
      taxFormat: '%',
      netAmount: '',
      grossAmount: '',
      taxType: 'Normal VAT',
      notes: '',
      account: ''
    }))
    const expenseObj = {
      kind: 'Invoice',
      poNo: `Pension Fund - ${month} - ${year}`,
      currency: companyInfo?.currency || '',
      issueDate: moment(),
      taxDate: moment(),
      taxCategory: 'Standard',
      items,
      exchangeRate: 1,
      dateOfSupply: moment(),
      paymentTerm: '',
      sentDate: moment(),
      paymentDueDate: '',
      paymentType: '',
      paymentDate: '',
      paidAmount: '',
      status: 'Pending',
      payments: [],

      bank: '',
      bankData: {}
    }
    SET_DATA('expenses.cacheData', expenseObj)
    history('/app/add-expense/Invoice')
  }

  const columns = [
    {
      title: 'Year',
      dataIndex: 'year'
    },
    {
      title: 'Month',
      dataIndex: 'month'
    },
    {
      title: 'Category',
      dataIndex: 'category'
    },
    {
      title: 'Employer Contribution',
      dataIndex: 'employerContribution'
    },
    {
      title: 'Employee Contribution',
      dataIndex: 'employeeContribution'
    },
    {
      title: 'Total',
      dataIndex: 'amount'
    }
  ]

  return (
    <div>
      <TableBox columns={columns} dataSource={pensionFunds} />
      {filterData.date && pensionFunds.length > 0 && (
        <div style={{ float: 'right', padding: 20 }}>
          <Button variant="primary" onClick={() => onGenerateExpense()}>
            Generate Expense
          </Button>
        </div>
      )}
    </div>
  )
}
