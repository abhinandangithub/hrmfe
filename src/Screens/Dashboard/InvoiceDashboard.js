import { Col, Modal, Row } from 'antd'
import moment from 'moment'
import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { getIncomeDashboardData } from '../../Actions/InvoiceAction'
import { amountSeparator } from '../../Util/Util'
import AddInvoice from '../InvoiceData/AddInvoice'
import './Dashboard.scss'

class InvoiceDashboard extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      opacity: {
        income: 1,
        expences: 1
      },

      // year: 2021,

      incomeTotalAmount: 0.0,
      incomeTotalCollected: 0.0,
      incomeTotalOutstanding: 0.0,
      incomeTotalCount: 0,
      incomeMonths: [],

      expenseTotalAmount: 0.0,
      expenseTotalCollected: 0.0,
      expenseTotalOutstanding: 0.0,
      expenseTotalCount: 0,
      expenseMonths: [],

      openAddInvoice: false
    }
  }

  componentDidMount() {
    const { startDate, endDate } = this.props
    getIncomeDashboardData({
      startDate: moment(startDate).format('YYYY-MM-DD'),
      endDate: moment(endDate).format('YYYY-MM-DD')
    }).then((invoiceData) => {
      if (invoiceData) {
        this.setState({
          incomeTotalAmount: invoiceData.totalAmount,
          incomeTotalCollected: invoiceData.totalCollected,
          incomeTotalOutstanding: invoiceData.totalOutstanding,
          incomeTotalCount: invoiceData.totalCount,
          incomeMonths: invoiceData.months
        })
      }
    })
    getIncomeDashboardData({
      startDate: moment(startDate).format('YYYY-MM-DD'),
      endDate: moment(endDate).format('YYYY-MM-DD')
    }).then((invoiceData) => {
      if (invoiceData) {
        this.setState({
          expenseTotalAmount: invoiceData.totalAmount,
          expenseTotalCollected: invoiceData.totalCollected,
          expenseTotalOutstanding: invoiceData.totalOutstanding,
          expenseTotalCount: invoiceData.totalCount,
          expenseMonths: invoiceData.months
        })
      }
    })
  }

  handleMouseEnter = (o) => {
    const { dataKey } = o
    const { opacity } = this.state

    this.setState({
      opacity: { ...opacity, [dataKey]: 0.5 }
    })
  }

  handleMouseLeave = (o) => {
    const { dataKey } = o
    const { opacity } = this.state

    this.setState({
      opacity: { ...opacity, [dataKey]: 1 }
    })
  }

  render() {
    const { opacity } = this.state
    const { companyInfo } = this.props

    return (
      <>
        <Row gutter={(24, 20)}>
          <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 12 }}>
            <div className="overview card">
              <div className="heading">
                {/* filter starts */}
                <Row>
                  <Col xs={{ span: 12 }} sm={{ span: 12 }} md={{ span: 12 }} lg={{ span: 12 }}>
                    <h2>Income Overview</h2>
                  </Col>
                  <Col
                    xs={{ span: 12 }}
                    sm={{ span: 12 }}
                    md={{ span: 12 }}
                    lg={{ span: 12 }}
                    style={{ textAlign: 'right' }}>
                    <div
                      onClick={() => this.setState({ openAddInvoice: 'inc' })}
                      className="btn-glow primary">
                      Create Income Invoice
                    </div>
                  </Col>
                </Row>
                {/* filter ends */}
              </div>
              <Row gutter={(16, 20)}>
                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 12 }}>
                  <div className="overall-details collected">
                    <div className="icon">
                      <i className="flaticon-wallet" />
                    </div>
                    <div className="details">
                      <h3>
                        {companyInfo.currency} {amountSeparator(this.state.incomeTotalAmount)}
                      </h3>
                      <p>Total Amount</p>
                    </div>
                  </div>
                </Col>
                {/* collected ends here */}
                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 12 }}>
                  <div className="overall-details outstanding">
                    <div className="icon">
                      <i className="flaticon-invoice-1" />
                    </div>
                    <div className="details">
                      <h3>
                        {companyInfo.currency} {amountSeparator(this.state.incomeTotalCollected)}
                      </h3>
                      <p>Total Collected</p>
                    </div>
                  </div>
                </Col>
                {/* outstanding ends here */}
                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 12 }}>
                  <div className="overall-details overdue">
                    <div className="icon">
                      <i className="flaticon-incomes" />
                    </div>
                    <div className="details">
                      <h3>
                        {companyInfo.currency} {amountSeparator(this.state.incomeTotalOutstanding)}
                      </h3>
                      <p>Total Outstanding</p>
                    </div>
                  </div>
                </Col>
                {/* Overdue ends here */}
                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 12 }}>
                  <div className="overall-details clients">
                    <div className="icon">
                      <i className="flaticon-checklist-6" />
                    </div>
                    <div className="details">
                      <h3>{this.state.incomeTotalCount}</h3>
                      <p>Total Count</p>
                    </div>
                  </div>
                </Col>
                {/* clients ends here */}

                <Link to="/app/income">View All Income</Link>
              </Row>
            </div>

            <Row>
              <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 24 }}>
                <div className="income-and-expences card">
                  <div className="heading">
                    <h2>Income Chart</h2>
                  </div>
                  <div className="chart-view">
                    <ResponsiveContainer>
                      <LineChart
                        width={800}
                        height={300}
                        data={this.state.incomeMonths}
                        margin={{
                          top: 5,
                          right: 30,
                          left: 20,
                          bottom: 5
                        }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Legend onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave} />
                        <Line
                          type="monotone"
                          dataKey="total"
                          strokeOpacity={opacity.pv}
                          stroke="#8884d8"
                          activeDot={{ r: 8 }}
                        />
                        <Line
                          type="monotone"
                          dataKey="collected"
                          strokeOpacity={opacity.uv}
                          stroke="#82ca9d"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </Col>
            </Row>
            {/* chart view ends here */}
          </Col>
          {/* income section starts */}

          <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 12 }}>
            <div className="overview card">
              <div className="heading">
                {/* filter starts */}
                <Row>
                  <Col xs={{ span: 12 }} sm={{ span: 12 }} md={{ span: 12 }} lg={{ span: 12 }}>
                    <h2>Expences Overview</h2>
                  </Col>
                  <Col
                    xs={{ span: 12 }}
                    sm={{ span: 12 }}
                    md={{ span: 12 }}
                    lg={{ span: 12 }}
                    style={{ textAlign: 'right' }}>
                    <div
                      onClick={() => this.setState({ openAddInvoice: 'exp' })}
                      className="btn-glow primary">
                      Create Expence invoice
                    </div>
                  </Col>
                </Row>
                {/* filter ends */}
              </div>
              <Row gutter={(16, 20)}>
                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 12 }}>
                  <div className="overall-details collected">
                    <div className="icon">
                      <i className="flaticon-wallet" />
                    </div>
                    <div className="details">
                      <h3>
                        {companyInfo.currency} {amountSeparator(this.state.expenseTotalAmount)}
                      </h3>
                      <p>Total Amount</p>
                    </div>
                  </div>
                </Col>
                {/* collected ends here */}
                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 12 }}>
                  <div className="overall-details outstanding">
                    <div className="icon">
                      <i className="flaticon-invoice-1" />
                    </div>
                    <div className="details">
                      <h3>
                        {companyInfo.currency} {amountSeparator(this.state.expenseTotalCollected)}
                      </h3>
                      <p>Total Collected</p>
                    </div>
                  </div>
                </Col>
                {/* outstanding ends here */}
                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 12 }}>
                  <div className="overall-details overdue">
                    <div className="icon">
                      <i className="flaticon-incomes" />
                    </div>
                    <div className="details">
                      <h3>
                        {companyInfo.currency} {amountSeparator(this.state.expenseTotalOutstanding)}
                      </h3>
                      <p>Total Outstanding</p>
                    </div>
                  </div>
                </Col>
                {/* Overdue ends here */}
                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 12 }}>
                  <div className="overall-details clients">
                    <div className="icon">
                      <i className="flaticon-checklist-6" />
                    </div>
                    <div className="details">
                      <h3>{this.state.expenseTotalCount}</h3>
                      <p>Total Count</p>
                    </div>
                  </div>
                </Col>
                {/* clients ends here */}
                <Link to="/app/expense">View All expense</Link>
              </Row>
            </div>

            <Row>
              <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 24 }}>
                <div className="income-and-expences card">
                  <div className="heading">
                    <h2>Expences Chart</h2>
                  </div>
                  <div className="chart-view">
                    <ResponsiveContainer>
                      <LineChart
                        width={800}
                        height={300}
                        data={this.state.expenseMonths}
                        margin={{
                          top: 5,
                          right: 30,
                          left: 20,
                          bottom: 5
                        }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Legend onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave} />
                        <Line
                          type="monotone"
                          dataKey="total"
                          strokeOpacity={opacity.pv}
                          stroke="#8884d8"
                          activeDot={{ r: 8 }}
                        />
                        <Line
                          type="monotone"
                          dataKey="collected"
                          strokeOpacity={opacity.uv}
                          stroke="#82ca9d"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </Col>
            </Row>
            {/* chart view ends here */}
          </Col>
          {/* Expences section starts */}
        </Row>
        <Modal
          title={this.state.openAddInvoice === 'inc' ? 'Add New Income' : 'Add New Expense'}
          visible={!!this.state.openAddInvoice}
          onCancel={() => this.setState({ openAddInvoice: false })}
          width={1000}
          footer={false}>
          <AddInvoice
            type={this.state.openAddInvoice}
            onCancel={() => this.setState({ openAddInvoice: false })}
          />
        </Modal>
      </>
    )
  }
}

function mapStateToProps(state) {
  return {
    userInfo: state.users.userInfo,
    companyInfo: state.users.companyInfo
  }
}

export default connect(mapStateToProps)(InvoiceDashboard)
