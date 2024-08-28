import { Card, Col, Row } from 'antd'
import moment from 'moment'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import EmailInbox from '../../assets/images/dashboard/email-color.svg'
import { useSelector } from '../../Hooks/redux'
import apiClient from '../../Util/apiClient'
import './Dashboard.scss'

// const column = [
//   {
//     title: 'SERVICE MANAGEMENT',
//     name: 'services',
//     cards: [
//       {
//         label: 'Employees',
//         value: 'employeesCount',
//         icon: employeesIcon
//       },
//       {
//         label: 'Active Projects',
//         value: 'projectsCount',
//         icon: activeProjectsIcon
//       },
//       {
//         label: 'Service Products',
//         value: 'productsCount',
//         icon: serviceProductsIcon
//       }
//     ],
//     graphs: [
//       {
//         title: 'Employee Revenues Productivity',
//         label: 'Billing hours',
//         name: 'timeEntries'
//       },
//       {
//         title: 'Customer Billing trend',
//         label: 'Timesheet invoices',
//         name: 'timeSheetInvoices'
//       }
//     ]
//   },
//   {
//     title: 'LOGISTICS -  SALES',
//     name: 'sales',
//     cards: [
//       {
//         label: 'Customers',
//         value: 'customerCount',
//         icon: CustomersIcon
//       },
//       {
//         label: 'Total Sales',
//         value: 'totalSalesOrders',
//         icon: totalSalesIcon
//       },
//       {
//         label: 'Open Sales Orders',
//         value: 'openSales',
//         icon: openSalesIcon
//       },
//       {
//         label: 'Realized Revenues',
//         value: 'realizedRevenues',
//         icon: realizedRevenuesIcon
//       },
//       {
//         label: 'Outstanding invoices',
//         value: 'outstandingInvoices',
//         icon: outstandingInvoicesIcon
//       }
//     ],
//     graphs: [
//       {
//         title: 'Sales this year',
//         label: 'Sales order amount',
//         name: 'orders'
//       },
//       {
//         title: 'Realized revenues',
//         label: 'Sales order invoices amount',
//         name: 'invoices'
//       }
//     ]
//   },
//   {
//     title: 'LOGISTICS -  PURCHASE',
//     name: 'purchase',
//     cards: [
//       {
//         label: 'Suppliers',
//         value: 'vendorCount',
//         icon: suppliersIcon
//       },
//       {
//         label: 'Total Purchase',
//         value: 'totalPurchaseOrders',
//         icon: totalPurchaseIcon
//       },
//       {
//         label: 'Open Purchase Orders',
//         value: 'openPurchase',
//         icon: openPurchaseOrdersIcon
//       },
//       {
//         label: 'Payments Executed',
//         value: 'paymentsExecuted',
//         icon: paymentsExecutedIcon
//       },
//       {
//         label: 'Outstanding payments',
//         value: 'outstandingPayments',
//         icon: outstandingPaymentsIcon
//       }
//     ],
//     graphs: [
//       {
//         title: 'Purchase this year',
//         label: 'Purchase order amount',
//         name: 'orders'
//       },
//       {
//         title: 'Payments Executed',
//         label: 'Purchase order invoices amount',
//         name: 'invoices'
//       }
//     ]
//   },
//   {
//     title: 'LOGISTICS -  STOCKS',
//     name: 'stocks',
//     cards: [
//       {
//         label: 'Materials',
//         value: 'materialCount',
//         icon: materialCountIcon
//       },
//       {
//         label: 'Current Stock Value',
//         value: 'stockValues',
//         icon: stockValuesIcon
//       },
//       {
//         label: 'Stock receipts this FY',
//         value: 'totalGoodsReceipts',
//         icon: totalGoodsReceiptsIcon
//       },
//       {
//         label: 'Stock issues this FY',
//         value: 'totalGoodsIssues',
//         icon: totalGoodsIssuesIcon
//       }
//     ],
//     graphs: [
//       {
//         title: 'Stock Receipts trends',
//         label: 'Stock receipts',
//         name: 'receipts'
//       },
//       {
//         title: 'Stock Issues trends',
//         label: 'Stock issues',
//         name: 'issues'
//       }
//     ]
//   },
//   {
//     title: 'FINANCE MANAGEMENT',
//     name: 'finances',
//     cards: [
//       {
//         label: 'Total Revenues',
//         value: 'totalRevenues',
//         icon: totalRevenuesIcon
//       },
//       {
//         label: 'Revenues Paid',
//         value: 'revenuesPaid',
//         icon: totalExpensesIcon
//       },
//       {
//         label: 'Outstanding Revenues',
//         value: 'outstandingInvoices',
//         icon: outstandingInvoicesIcon
//       },
//       {
//         label: 'Total Credits',
//         value: 'totalCredits',
//         icon: totalCreditsIcon
//       },

//       {
//         label: 'Total Expenses',
//         value: 'totalExpenses',
//         icon: totalExpensesIcon
//       },
//       {
//         label: 'Expenses Paid',
//         value: 'revenuesPaid',
//         icon: totalExpensesIcon
//       },
//       {
//         label: 'Outstanding Expenses',
//         value: 'outstandingPayments',
//         icon: outstandingInvoicesIcon
//       },
//       {
//         label: 'Total Debits',
//         value: 'totalDebits',
//         icon: totalDebitsIcon
//       }
//     ],
//     graphs: [
//       {
//         title: 'Revenues – Current Financial Year',
//         label: 'Invoices',
//         name: 'revenues'
//       },
//       {
//         title: 'Expenses/payment – Current Financial Year',
//         label: 'Payments',
//         name: 'expenses'
//       }
//     ]
//   }
// ]

export default function NewDashboard() {
  const userInfo = useSelector((state) => state?.users?.userInfo)
  const [{ inbox }, setData] = useState({
    startDate: '',
    endDate: '',
    inbox: []
  })

  const getData = (n, dateString) => {
    let params = {}

    if (dateString) {
      params = {
        startDate: moment(dateString[0]).format('YYYY-MM-DD'),
        endDate: moment(dateString[1]).format('YYYY-MM-DD')
      }
    }

    if (!dateString || dateString.length === 2) {
      apiClient
        .get('dashboard', {
          params
        })
        .then(({ status, data }) => {
          if (status === 200) {
            setData(data)
          }
        })
    }
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <div>
      <div className="accqrate-welcome">
        <Row gutter={[20, 0]} justify="center">
          <Col xs={23} sm={22} lg={13} xl={13}>
            <Card size="small" bordered={false} className="profile-info">
              <h1>
                Welcome, <span>{userInfo ? userInfo.name : ''}</span>
              </h1>
              <p className="mb-0">
                You have <strong /> access in this company
              </p>
            </Card>
          </Col>
          <Col xs={23} sm={22} lg={8} xl={8}>
            <Card size="small" bordered={false} className="inbox-info">
              <div className="inbox-message">
                <div className="icon">
                  <img src={EmailInbox} alt="Inbox Notifications" />
                </div>
                <h3 className="m-0">inbox</h3>
                <p />
              </div>
              <div className="notifications pt-3">
                {inbox.map((item, index) => (
                  <div className="list" key={index}>
                    <h6>
                      {item.entityType} {item.entityRef} ({item.status})
                    </h6>
                    <p>{moment(item.createdAt).format('DD-MMM-YYYY hh:mm a')}</p>
                  </div>
                ))}
              </div>
              <div className="go-to-inbox">
                <Link to="/app/inbox">
                  Go to Inbox <i className="flaticon-arrow-pointing-to-right" />
                </Link>
              </div>
            </Card>
          </Col>
        </Row>
      </div>
      {/* <div className="accounting-dashboard">
        <Row justify="center">
          <Col xs={23} sm={22} lg={12} xl={17}>
            <h1 className="mb-2">Dashboard</h1>
          </Col>
          <Col xs={23} sm={22} lg={8} xl={5}>
            <div className="mb-3">
              <DateRangePicker value={[startDate, endDate]} onChange={getData} clearIcon={false} />
            </div>
          </Col>
          <Col xs={23} sm={22} className="modules-dashboard">
            <Space direction="vertical" className="w-100">
              {column.map(
                (item, i) => data[item.name] && <DashItem key={i} data={data[item.name]} {...item} />
              )}
            </Space>
          </Col>
        </Row>
      </div> */}
    </div>
  )
}
