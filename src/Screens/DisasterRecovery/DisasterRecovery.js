import { Col, Row } from 'antd'
import React from 'react'
import DisasterRecoveryServerimg from '../../assets/images/cloud-based-erp.svg'
import DisasterRecoveryImg from '../../assets/images/disaster-recovery.svg'

export default class DisasterRecovery extends React.PureComponent {
  render() {
    return (
      <>
        {/* Breadcrum starts */}
        <section className="breadcrum-title only-heading">
          <div className="container-fluid">
            <Row justify="center">
              <Col span={21}>
                <Row justify="left">
                  <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 12 }}>
                    <div className="breadcrum-content">
                      <h1>Disaster Recovery</h1>
                    </div>
                  </Col>
                  <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 12 }}>
                    <img src={DisasterRecoveryImg} alt="Data Security" />
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
                  <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 18 }} lg={{ span: 17 }}>
                    <p>
                      In the event of a disaster, we will be able to retrieve the data up to the last second
                      the application was active. The DRM server in Frankfurt, Germany will be immediately
                      restored into the Saudi Cloud and the application will be active as soon as the natural
                      calamities are settled.{' '}
                    </p>
                    <p>
                      As the DRM server is based in AWS cloud, there is another level of DRM done by AWS in a
                      server that is not in Frankfurt. So, there is multiple level of security to the data and
                      can be restored in less than 60 minutes.
                    </p>
                    <img src={DisasterRecoveryServerimg} alt="Cloud ERP" />
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
