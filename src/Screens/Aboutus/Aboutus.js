import { Col, Row } from 'antd'
import React from 'react'
import aboutusimage from '../../assets/images/about-us.svg'
import aboutUsimg from '../../assets/images/about.svg'
import ourapplication from '../../assets/images/application.svg'
import './Aboutus.scss'

export default class Aboutus extends React.PureComponent {
  render() {
    return (
      <>
        {/* Breadcrum starts */}
        <section className="breadcrum-title">
          <div className="container-fluid">
            <Row justify="center">
              <Col span={21}>
                <Row justify="left">
                  <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 12 }}>
                    <div className="breadcrum-content">
                      <h1>Get your Business digitised with ERP in 2 hours for $5 per month</h1>
                      <p>
                        Take a step forward to drive your Business with Cloud based ERP application. A compact
                        and easily configurable solution for Small and medium enterprises. Zero infrastructure
                        costs.
                      </p>
                    </div>
                  </Col>
                  <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 12 }}>
                    <img src={aboutUsimg} alt="" />
                  </Col>
                </Row>
              </Col>
            </Row>
          </div>
        </section>
        {/* breadcrum ends here */}

        <section className="inner-pages about-us">
          <div className="container-fluid">
            <Row justify="center">
              <Col span={20}>
                <Row justify="left" gutter={[20]}>
                  <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 12 }}>
                    <img src={aboutusimage} alt="About Accqrate" />
                  </Col>
                  <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 12 }}>
                    <p>
                      ERP has been always seen as a costly affair and with a perception that only large
                      enterprises can implement it. Our team from various industries and geographies made it
                      happen to provide small and medium enterprises with a comprehensive ERP for just the
                      cost of a Burger.
                    </p>
                    <p>
                      The companies have a proven track record in services, modernised web & mobile
                      developments and re-engineering projects. Accqrate ERP has been designed to cater to the
                      needs of small businesses that would like to digitise their business but with ignorable
                      costs
                    </p>
                  </Col>
                </Row>
              </Col>
              <Col span={20}>
                <div className="card-view mt-3">
                  <Row justify="left" gutter={[20]}>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 12 }}>
                      <p>
                        Accurate ERP has been designed with the state of art modernised technologies. The
                        speed of the application gives you a feeling like working in desktop. Following core
                      </p>
                      <h2>Modules are offered as part of the ERP</h2>
                      <ul>
                        <li>Finance Management</li>
                        <li>Logistics Management</li>
                        <li>Service Management</li>
                        <li>HR & Payroll</li>
                        <li>E-Invoicing via Blockchain</li>
                      </ul>
                      <p>
                        The application is cloud based and can be accessible anywhere anytime and also highly
                        responsive for mobiles. Continuous enhancements and features rollouts benefits the
                        customers.
                      </p>
                    </Col>

                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 12 }}>
                      <img src={ourapplication} alt="Our Application" />
                    </Col>
                  </Row>
                </div>
              </Col>
            </Row>
          </div>
        </section>
      </>
    )
  }
}
