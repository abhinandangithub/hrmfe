import { Col, Row } from 'antd'
import React from 'react'
import './Dashboard.scss'
import SellerOverview from './SellerOverview'

class SellerDashboard extends React.PureComponent {
  render() {
    return (
      <div className="accounting-dashboard">
        <Row justify="center">
          <Col
            xs={{ span: 23, order: 1 }}
            sm={{ span: 22, order: 1 }}
            md={{ span: 22, order: 1 }}
            lg={{ span: 22, order: 1 }}>
            <h1>Seller Dashboard</h1>
          </Col>

          <Col
            xs={{ span: 23, order: 1 }}
            sm={{ span: 22, order: 1 }}
            md={{ span: 22, order: 1 }}
            lg={{ span: 22, order: 1 }}>
            <SellerOverview />
          </Col>
        </Row>
      </div>
    )
  }
}

export default SellerDashboard
