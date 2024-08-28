import { Card, Col, Row } from 'antd'
import React from 'react'
import KeyPoint from '../../assets/images/partners/key-points.png'
import WafaiCloud from '../../assets/images/partners/wafai-cloud.png'
import T from '../../Components/Translate/Translate'
import './Home.scss'

export default class Partners extends React.PureComponent {
  render() {
    return (
      <section className="our-partners">
        <div className="container-fluid">
          <Row justify="center">
            <Col xs={{ span: 22 }} sm={{ span: 22 }} md={{ span: 21 }} lg={{ span: 21 }}>
              <h2>
                <T>Our Partners</T>
              </h2>
              <div className="partners-list">
                <Card size="small" className="mb-3">
                  <img src={KeyPoint} alt="KeyPoint" />
                </Card>
                <Card size="small" className="mb-3">
                  <img src={WafaiCloud} alt="WafaiCloud" />
                </Card>
              </div>
            </Col>
          </Row>
        </div>
      </section>
    )
  }
}
