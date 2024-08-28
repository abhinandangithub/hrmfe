import { Col, Row } from 'antd'
import React from 'react'
import Footer from '../Footer/Footer'
import Header from '../Header/Header'
import './Legal.scss'

export default class Legal extends React.PureComponent {
  render() {
    return (
      <>
        <Header />

        {/* Breadcrum starts */}
        <section className="breadcrum-title">
          <div className="container-fluid">
            <Row justify="center">
              <Col span={21}>
                <Row justify="left">
                  <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 24 }}>
                    <div className="breadcrum-content">
                      <h1>Legal</h1>
                    </div>
                  </Col>
                </Row>
              </Col>
            </Row>
          </div>
        </section>
        {/* breadcrum ends here */}

        <section className="inner-pages">
          <div className="container-fluid">
            <Row justify="center">
              <Col span={20}>
                <Row justify="left" gutter={[20]}>
                  <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 24 }}>
                    <p>
                      Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
                      has been the industry&apos;s standard dummy text ever since the 1500s, when an unknown
                      printer took a galley of type and scrambled it to make a type specimen book. It has
                      survived not only five centuries, but also the leap into electronic typesetting,
                      remaining essentially unchanged. It was popularised in the 1960s with the release of
                      Letraset sheets containing Lorem Ipsum passages, and more recently with desktop
                      publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                    </p>
                    <p>
                      Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
                      has been the industry&apos;s standard dummy text ever since the 1500s, when an unknown
                      printer took a galley of type and scrambled it to make a type specimen book. It has
                      survived not only five centuries, but also the leap into electronic typesetting,
                      remaining essentially unchanged. It was popularised in the 1960s with the release of
                      Letraset sheets containing Lorem Ipsum passages, and more recently with desktop
                      publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                    </p>
                    <p>
                      Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
                      has been the industry&apos;s standard dummy text ever since the 1500s, when an unknown
                      printer took a galley of type and scrambled it to make a type specimen book. It has
                      survived not only five centuries, but also the leap into electronic typesetting,
                      remaining essentially unchanged. It was popularised in the 1960s with the release of
                      Letraset sheets containing Lorem Ipsum passages, and more recently with desktop
                      publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                    </p>
                  </Col>
                </Row>
              </Col>
            </Row>
          </div>
        </section>

        <Footer />
      </>
    )
  }
}
