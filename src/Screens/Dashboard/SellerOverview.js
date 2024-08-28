import { Col, Row } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'
import TableBox from '../../Components/TableBox/TableBox'
// import BlockExplorer from './BlockExplorer'
import './Dashboard.scss'

class SellerOverview extends React.Component {
  constructor() {
    super()
    this.state = {
      // collapsed: false,
      // sample: '',
      // sample_select: '',
      viewType: 'table',
      pendingReceipts: [],
      transmitted: []
      // filterview: 'filter'
    }
  }

  render() {
    const pendingreceipts = [
      {
        title: 'Invoice Id',
        dataIndex: 'invoiceId'
      },
      {
        title: 'Buyer Name',
        dataIndex: 'buyerName'
      },
      {
        title: 'Invoice Date',
        dataIndex: 'invocieDate'
      },
      {
        title: 'Amount',
        dataIndex: 'amount'
      }
    ]
    // pending receipts table ends here
    const transmittedTable = [
      {
        title: 'Invoice Id',
        dataIndex: 'invoiceId'
      },
      {
        title: 'Buyer Name',
        dataIndex: 'buyerName'
      },
      {
        title: 'Invoice Date',
        dataIndex: 'invocieDate'
      },
      {
        title: 'Amount',
        dataIndex: 'amount'
      }
    ]
    // transmitted table ends here

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
                      <h3>123</h3>
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
                      <h3>123456</h3>
                      <p>Total Amount</p>
                    </div>
                  </div>
                </Col>
                {/* Total Amount ends here */}

                <Link to="/app/income">View Transmissions</Link>
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
                      <h3>123</h3>
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
                      <h3>CHF 123457</h3>
                      <p>Total Amount</p>
                    </div>
                  </div>
                </Col>
                {/* Total Amount ends here */}

                <a>View Pending Receipts</a>
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
                  <div className="list">
                    <div className="date-time">
                      <i className="flaticon-calendar-2" /> 2021-06-10{' '}
                      <span className="time-details">
                        <i className="flaticon-back-in-time" /> 10:15:17
                      </span>
                    </div>
                    <div className="title">
                      <h3>User seller1@mcbitss.com</h3>
                    </div>
                    <div className="description">
                      <p>Successfully Logged in as a seller</p>
                    </div>
                  </div>
                  {/* list ends here */}
                  <div className="list">
                    <div className="date-time">
                      <i className="flaticon-calendar-2" /> 2021-06-10{' '}
                      <span className="time-details">
                        <i className="flaticon-back-in-time" /> 10:15:17
                      </span>
                    </div>
                    <div className="title">
                      <h3>User seller1@mcbitss.com</h3>
                    </div>
                    <div className="description">
                      <p>Successfully Logged in as a seller</p>
                    </div>
                  </div>
                  {/* list ends here */}
                </div>
              </div>
            </div>
            {/* Notification view ends here */}
          </Col>
          {/* Transmitted ends starts */}
        </Row>

        <Row gutter={(24, 20)}>
          <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 12 }}>
            <div className="income-and-expences card">
              <div className="heading">
                <h2>Pending Receipts</h2>
              </div>
              <div className="table-view">
                <TableBox
                  viewType={this.state.viewType}
                  dataSource={this.state.pendingReceipts}
                  columns={pendingreceipts}
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
                  viewType={this.state.viewType}
                  dataSource={this.state.transmitted}
                  columns={transmittedTable}
                  actionIndex="custom_action"
                  cardHeaderIndex="status"
                  cardFirstLabelIndex="docno"
                />
              </div>
            </div>
          </Col>

          <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 24 }}>
            <div className="income-and-expences card">
              <div className="heading">
                <h2>Block Explorer</h2>
              </div>
              <div className="explorer-information">{/* <BlockExplorer /> */}</div>
            </div>
          </Col>
        </Row>
        {/* Transmitted ends here */}
      </>
    )
  }
}
export default SellerOverview
