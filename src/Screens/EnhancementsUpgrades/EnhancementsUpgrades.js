import { Col, Row } from 'antd'
import React from 'react'
import enhancementsUpgradesImg from '../../assets/images/enhancements-and-upgrades.svg'

export default class EnhancementsUpgrades extends React.PureComponent {
  render() {
    return (
      <>
        {/* Breadcrum starts */}
        <section className="breadcrum-title only-heading">
          <div className="container-fluid">
            <Row justify="center">
              <Col span={21}>
                <div className="breadcrum-content">
                  <h1>Enhancements and upgrades</h1>
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
                  <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 12 }}>
                    <img src={enhancementsUpgradesImg} alt="Enhancements and upgrades" />
                  </Col>
                  <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 12 }}>
                    <p>
                      Enhancements and upgrades are automatically done as part of the product agreement. The
                      rollouts will be done on a quarterly basis. Prior intimation of the enhancements or
                      upgrade lists will be provided with detailed documentation to the Client.
                    </p>
                    <p>
                      Accqrate will ensure that there is no impact on the functions or data due to the
                      enhancements or upgrades rollout.
                    </p>
                    <p>
                      Application will run without any issues even if it is not upgraded for long time. All
                      libraries can upgraded once in a six months. It can be tested in QC environment before
                      it is promoted to production. Entire upgrade may vary from 1 – 2 days without disrupting
                      the services.
                    </p>
                    <p>Entire upgrade activity can be carried out remotely provided access to environment.</p>
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
