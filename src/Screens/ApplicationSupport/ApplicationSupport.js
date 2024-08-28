import { Col, Row } from 'antd'
import React from 'react'
// import BusinessImpact from '../../assets/images/business-impact.svg'
import InternalTicketingSystem from '../../assets/images/internal-ticketing-system.svg'

export default class ApplicationSupport extends React.PureComponent {
  render() {
    return (
      <>
        {/* Breadcrum starts */}
        <section className="breadcrum-title only-heading">
          <div className="container-fluid">
            <Row justify="center">
              <Col span={21}>
                <div className="breadcrum-content">
                  <h1>Application Support and Maintenance</h1>
                </div>
              </Col>
            </Row>
          </div>
        </section>
        {/* breadcrum ends here */}

        <section className="inner-pages about-us">
          <div className="container-fluid">
            <Row justify="center">
              <Col span={21}>
                <Row justify="center" gutter={[20]}>
                  <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 19 }} lg={{ span: 19 }}>
                    <h3>The key focus of Application support will be </h3>
                    <ul>
                      <li>To recover the normal service as quickly as possible</li>
                      <li>Upgrade Support </li>
                      <li>Minimize any impact on the business</li>
                      <li>Reduce Support Costs</li>
                      <li>Development of Change Requests and Enhancements</li>
                      <li>Performance tuning to improve the concurrency and performance issues</li>
                      <li>L1,L2, L3 Support with Service Level Agreements</li>
                      <li>Need based Scale up and Scale down of resources</li>
                      <li>Root cause Analysis and Documentation</li>
                      <li>Service Requests Documentation</li>
                      <li>
                        Follow ITIL standards: Incident Management, Problem Management, Change Management,
                        Continuous Improvements
                        <p>Support team can be contacted through the following channels</p>
                        <p>
                          <strong>Mail,</strong> <strong>Phone,</strong> <strong>Ticketing system</strong>
                        </p>
                        <p>
                          Each issue will be created as a ticket in the internal ticketing system, classified
                          as Critical, high, medium or low and prioritised for fixes
                        </p>
                        <h3>Below is the way the issues are classified to follow the escalation mechanism</h3>
                        <img
                          style={{ width: '100%' }}
                          src={InternalTicketingSystem}
                          alt="internal ticketing system"
                          className="mb-3"
                        />
                      </li>
                      {/* <li>SLA are valid during service window period</li> */}
                    </ul>
                    {/* <img src={BusinessImpact} alt="Business Impact" /> */}
                  </Col>
                </Row>
              </Col>
            </Row>
          </div>
        </section>
      </>
    )
  }
}
