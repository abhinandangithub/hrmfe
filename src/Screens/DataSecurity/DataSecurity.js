import { Col, Row } from 'antd'
import React from 'react'
import dataSecurityImg from '../../assets/images/data-security.svg'

export default class DataSecurity extends React.PureComponent {
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
                      <h1>Data Security</h1>
                    </div>
                  </Col>
                  <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 12 }}>
                    <img src={dataSecurityImg} alt="Data Security" />
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
              <Col span={21}>
                <Row justify="center" gutter={[20]}>
                  <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 18 }} lg={{ span: 18 }}>
                    <h3>Following are the steps taken for the data security</h3>
                    <ul>
                      <li>
                        Complete database is encrypted and stored. Only the application knows the key to
                        decrypt and show in the ERP
                      </li>
                      <li>All the user name and password details are hashed and stored.</li>
                      <li>
                        All the APIs of the ERP can only be authorised through private key which can only be
                        exchanged with ERP. It is not possible for the any external sources to call the APIs
                        without any authentication and correct protocol
                      </li>
                      <li>
                        Inbound user requests are initially handled by Domain Name Services, which route your
                        traffic to the proper infrastructure endpoints.
                      </li>
                      <li>
                        Content Delivery Networks provide the least latency and the highest speed to create an
                        exceptional end user experience for static application content.
                      </li>
                      <li>
                        Load Balancers allows configurability and flexibility to manage the traffic and
                        resource usage of server nodes in your environment so that no single device gets
                        overwhelmed.
                      </li>
                      <li>
                        The Web App Server component is the heart the web application, serving up core
                        application to end users. Cloud server infrastructure is built using high performance
                        containers on Cloud Foundry-based runtimes.
                      </li>
                      <li>
                        The User Registry Services enable authorization and authentication to secure resources
                        across application.
                      </li>
                      <li>
                        Session and Data Caching ensure low latency data access and prevents data loss for a
                        robust end-user experience. Additionally, Storage services allow to customize and have
                        total control over storage needs.
                      </li>
                      <li>Managed Database Services deliver high-perform</li>
                    </ul>
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
