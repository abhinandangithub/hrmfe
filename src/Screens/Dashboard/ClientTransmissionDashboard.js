import { Col, Popover, Row } from 'antd'
import moment from 'moment'
import React from 'react'
import { Link } from 'react-router-dom'
import {
  getClientInvoices,
  getClientTrasmissionDashboardData,
  getInvoiceTransmissionLogs
} from '../../Actions/UserAction'
import BlockExplorerBox from '../../Components/BlockExplorerBox/BlockExplorerBox'
import TableBox from '../../Components/TableBox/TableBox'
import { amountSeparator } from '../../Util/Util'
import './Dashboard.scss'

let logTimer

class ClientTransmissionDashboard extends React.Component {
  constructor() {
    super()
    this.state = {
      transmittedCurrency: '',
      transmittedCount: 0,
      transmittedAmount: '0.00',
      pendingCurrency: '',
      pendingCount: 0,
      pendingAmount: '0.00',

      transmitted: [],
      pendingTransmission: [],

      showBlockExplorer: false,
      logs: []
    }
    this.getLogs(0)
  }

  componentDidMount() {
    const { startDate, endDate } = this.props
    getClientTrasmissionDashboardData({
      startDate: moment(startDate).format('YYYY-MM-DD'),
      endDate: moment(endDate).format('YYYY-MM-DD')
    }).then((transData) => {
      if (transData) {
        this.setState({
          transmittedCurrency: transData.transmitted ? transData.transmitted.currency : '',
          transmittedCount: transData.transmitted ? transData.transmitted.count : 0,
          transmittedAmount: transData.transmitted ? transData.transmitted.total : '0.00',

          pendingCurrency: transData.transmitted ? transData.pending.currency : '',
          pendingCount: transData.pending ? transData.pending.count : 0,
          pendingAmount: transData.pending ? transData.pending.total : '0.00'
        })
      }
    })
    getClientInvoices({
      type: 'inc',
      transmission: 'Transmitted',
      issueDate: `${moment(startDate).format('YYYY-MM-DD')}, ${moment(endDate).format('YYYY-MM-DD')}`
    }).then((invoices) => {
      if (invoices) {
        this.setState({ transmitted: invoices })
      }
    })
    getClientInvoices({
      type: 'inc',
      transmission: 'Pending',
      issueDate: `${moment(startDate).format('YYYY-MM-DD')}, ${moment(endDate).format('YYYY-MM-DD')}`
    }).then((invoices) => {
      if (invoices) {
        this.setState({ pendingTransmission: invoices })
      }
    })
  }

  componentWillUnmount() {
    if (logTimer) {
      clearTimeout(logTimer)
      logTimer = false
    }
  }

  getLogs = (time) => {
    logTimer = setTimeout(() => {
      getInvoiceTransmissionLogs().then((logs) => {
        if (logs) {
          this.setState({ logs })
        }
      })
      this.getLogs(5000)
    }, time)
  }

  delayedDays = (days) => <div>Payment Delayed days - {days}</div>

  getLinkRecord = (text, record) => {
    if (record.status !== 'Paid' && record.paymentDueDate) {
      const days = moment().diff(moment(record.paymentDueDate), 'days')

      if (days > 0) {
        return (
          <Link to={`/app/customer-transmissions/${record.id}`}>
            <Popover placement="bottom" content={() => this.delayedDays(days)} trigger="hover">
              <a style={{ color: 'red' }}>{text}</a>
            </Popover>
          </Link>
        )
      }

      return <Link to={`/app/customer-transmissions/${record.id}`}>{text}</Link>
    }

    return <Link to={`/app/customer-transmissions/${record.id}`}>{text}</Link>
  }

  onShowBlockExplorer = (showBlockExplorer) => {
    this.setState({ showBlockExplorer: false }, () => {
      this.setState({ showBlockExplorer })
    })
  }

  render() {
    const columns = [
      {
        title: 'Doc No',
        dataIndex: 'invoiceNumber',
        render: (text, record) => this.getLinkRecord(text, record)
      },
      {
        title: 'PO / Reference No',
        dataIndex: 'poNumber'
      },
      {
        title: 'Net Price',
        dataIndex: 'net',
        render: (text, record) => `${amountSeparator(text)} ${record.currency}`
      },
      {
        title: 'Gross Price',
        dataIndex: 'gross',
        render: (text, record) => `${amountSeparator(text)} ${record.currency}`
      },
      {
        title: 'Issued Date',
        dataIndex: 'issueDate',
        render: (text) => (text && text !== '0000-00-00' ? moment(text).format('YYYY-MM-DD') : '')
      },
      {
        title: 'Info',
        dataIndex: '',
        render: (text, record) => (
          <i
            onClick={() => this.onShowBlockExplorer(record)}
            className="flaticon-info-2"
            style={{ cursor: 'pointer' }}
          />
        )
      }
    ]

    return (
      <>
        <Row gutter={(24, 20)} className="seller-dashboard">
          <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 8 }}>
            <div className="overview card">
              <div className="heading">
                {/* filter starts */}
                <Row>
                  <Col xs={{ span: 12 }} sm={{ span: 12 }} md={{ span: 12 }} lg={{ span: 12 }}>
                    <h2>Transmitted</h2>
                  </Col>
                  <Col
                    xs={{ span: 12 }}
                    sm={{ span: 12 }}
                    md={{ span: 12 }}
                    lg={{ span: 12 }}
                    style={{ textAlign: 'right' }}
                  />
                </Row>
                {/* filter ends */}
              </div>
              <Row gutter={(16, 20)}>
                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 12 }}>
                  <div className="overall-details clients">
                    <div className="icon">
                      <i className="flaticon-checklist-6" />
                    </div>
                    <div className="details">
                      <h3>{this.state.transmittedCount}</h3>
                      <p>Invoice Count</p>
                    </div>
                  </div>
                </Col>
                {/* Invoice Count ends here */}

                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 12 }}>
                  <div className="overall-details collected">
                    <div className="icon">
                      <i className="flaticon-wallet" />
                    </div>
                    <div className="details">
                      <h3>
                        {this.state.transmittedCurrency} {amountSeparator(this.state.transmittedAmount)}
                      </h3>
                      <p>Total Amount</p>
                    </div>
                  </div>
                </Col>
                {/* Total Amount ends here */}

                <Link to="/app/customer-transmissions">View Transmissions</Link>
              </Row>
            </div>
          </Col>

          <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 8 }}>
            <div className="overview card">
              <div className="heading">
                {/* filter starts */}
                <Row>
                  <Col xs={{ span: 12 }} sm={{ span: 12 }} md={{ span: 12 }} lg={{ span: 12 }}>
                    <h2>Pending Receipts</h2>
                  </Col>
                  <Col
                    xs={{ span: 12 }}
                    sm={{ span: 12 }}
                    md={{ span: 12 }}
                    lg={{ span: 12 }}
                    style={{ textAlign: 'right' }}
                  />
                </Row>
                {/* filter ends */}
              </div>
              <Row gutter={(16, 20)}>
                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 12 }}>
                  <div className="overall-details clients">
                    <div className="icon">
                      <i className="flaticon-checklist-6" />
                    </div>
                    <div className="details">
                      <h3>{this.state.pendingCount}</h3>
                      <p>Invoice Count</p>
                    </div>
                  </div>
                </Col>
                {/* Invoice Count ends here */}

                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 12 }}>
                  <div className="overall-details collected">
                    <div className="icon">
                      <i className="flaticon-wallet" />
                    </div>
                    <div className="details">
                      <h3>
                        {this.state.pendingCurrency} {amountSeparator(this.state.pendingAmount)}
                      </h3>
                      <p>Total Amount</p>
                    </div>
                  </div>
                </Col>
                {/* Total Amount ends here */}

                <Link to="/app/customer-transmissions">View Pending Transmissions</Link>
              </Row>
            </div>
          </Col>

          <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 8 }}>
            <div className="income-and-expences card">
              <div className="heading">
                <h2>Notification</h2>
              </div>
              <div className="seller-information">
                <div className="notification-view">
                  {this.state.logs.map((log, i) => (
                    <div className="list" key={i}>
                      <div className="description">
                        <p>
                          <b>{log.userData.name}</b> {log.status} an invoice {log.invoiceNumber}
                        </p>
                      </div>
                      <div className="date-time">
                        <i className="flaticon-calendar-2" />
                        {moment(log.createdAt).format('DD-MMM-YYYY')}{' '}
                        <span className="time-details">
                          <i className="flaticon-back-in-time" /> {moment(log.createdAt).format('HH:mm:ss')}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Col>
        </Row>

        <Row gutter={(24, 20)}>
          <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 12 }}>
            <div className="income-and-expences card">
              <div className="heading">
                <h2>Pending Receipts</h2>
              </div>
              <div className="table-view">
                <TableBox
                  dataSource={this.state.pendingTransmission}
                  columns={columns}
                  actionIndex="custom_action"
                  cardHeaderIndex="status"
                  cardFirstLabelIndex="docno"
                />
              </div>
            </div>
            {/* Notification view ends here */}
          </Col>
          {/* Transmitted ends starts */}

          {/* pending receipts starts */}

          <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 12 }}>
            <div className="income-and-expences card">
              <div className="heading">
                <h2>Transmitted</h2>
              </div>
              <div className="table-view">
                <TableBox
                  dataSource={this.state.transmitted}
                  columns={columns}
                  actionIndex="custom_action"
                  cardHeaderIndex="status"
                  cardFirstLabelIndex="docno"
                />
              </div>
            </div>
          </Col>
        </Row>
        {/* Transmitted ends here */}
        <BlockExplorerBox
          layout
          visible={this.state.showBlockExplorer}
          onCancel={() => this.setState({ showBlockExplorer: false })}
        />
      </>
    )
  }
}
export default ClientTransmissionDashboard
