import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import Button from '../../../Components/Button'
import TableBox from '../../../Components/TableBox/TableBox'
import apiClient from '../../../Util/apiClient'
import { SET_DATA } from '../../../Util/Util'

export default function VisaPayments({ filterData, companyInfo }) {
  const history = useHistory()
  const [tableData, setTableData] = useState([])

  useEffect(() => {
    const params = {}

    if (filterData.date) {
      params.year = moment(filterData.date).format('YYYY')
      params.month = moment(filterData.date).format('M')
    }

    if (filterData.type === 'Calculate') {
      apiClient.post('/recurring-cost-calculations/visa-payments/generate', params).then(({ data }) => {
        if (data?.result) {
          getData(params)
        }
      })
    } else {
      getData(params)
    }
  }, [filterData])

  const getData = (params = {}) => {
    apiClient.get('/recurring-cost-calculations/visa-payments/get', { params }).then(({ data }) => {
      if (data?.result) {
        setTableData(data.result)
      }
    })
  }

  const onGenerateExpense = () => {
    const month = moment(filterData.date).format('MMM')
    const year = moment(filterData.date).format('YYYY')

    const items = tableData.map((v) => ({
      type: '',
      product: 'Visa Payments',
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
      poNo: `Visa payments - ${month} - ${year}`,
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
    history.push('/app/add-expense/Invoice')
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
      title: 'No of visa',
      dataIndex: 'noOfVisa'
    },
    {
      title: 'Visa Cost',
      dataIndex: 'visaCost'
    },
    {
      title: 'Medical Cost',
      dataIndex: 'medicalCost'
    },
    {
      title: 'Total',
      dataIndex: 'amount'
    }
  ]

  return (
    <div>
      <TableBox columns={columns} dataSource={tableData} />
      {filterData.date && tableData.length > 0 && (
        <div style={{ float: 'right', padding: 20 }}>
          <Button variant="primary" onClick={() => onGenerateExpense()}>
            Generate Expense
          </Button>
        </div>
      )}
    </div>
  )
}
