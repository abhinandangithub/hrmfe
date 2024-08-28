import { CaretRightOutlined } from '@ant-design/icons'
import { Col, Collapse, Row } from 'antd'
import React from 'react'
import Footer from '../Footer/Footer'
import Header from '../Header/Header'
import './FAQ.scss'

const { Panel } = Collapse
export default class TermsandConditions extends React.PureComponent {
  render() {
    return (
      <>
        <Header />

        {/* Breadcrum starts */}
        <section className="breadcrum-title only-heading">
          <div className="container-fluid">
            <Row justify="center">
              <Col span={21}>
                <Row justify="left">
                  <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 24 }}>
                    <div className="breadcrum-content">
                      <h1>Frequently asked question</h1>
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
                    <div className="faq">
                      <Collapse
                        bordered={false}
                        defaultActiveKey={['1']}
                        expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
                        className="site-collapse-custom-collapse">
                        <Panel
                          header="How to create a account in Accounting Software?"
                          key="1"
                          className="site-collapse-custom-panel">
                          <p>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
                            Ipsum has been the industry&apos;s standard dummy text ever since the 1500s, when
                            an unknown printer took a galley of type and scrambled it to make a type specimen
                            book. It has survived not only five centuries, but also the leap into electronic
                            typesetting, remaining essentially unchanged. It was popularised in the 1960s with
                            the release of Letraset sheets containing Lorem Ipsum passages, and more recently
                            with desktop publishing software like Aldus PageMaker including versions of Lorem
                            Ipsum.
                          </p>
                        </Panel>
                        <Panel
                          header="Is there any option to export the income and expenses reports?"
                          key="2"
                          className="site-collapse-custom-panel">
                          <p>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
                            Ipsum has been the industry&apos;s standard dummy text ever since the 1500s, when
                            an unknown printer took a galley of type and scrambled it to make a type specimen
                            book. It has survived not only five centuries, but also the leap into electronic
                            typesetting, remaining essentially unchanged. It was popularised in the 1960s with
                            the release of Letraset sheets containing Lorem Ipsum passages, and more recently
                            with desktop publishing software like Aldus PageMaker including versions of Lorem
                            Ipsum.
                          </p>
                        </Panel>
                        <Panel
                          header="what are all the export option available in the accounting software?"
                          key="3"
                          className="site-collapse-custom-panel">
                          <p>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
                            Ipsum has been the industry&apos;s standard dummy text ever since the 1500s, when
                            an unknown printer took a galley of type and scrambled it to make a type specimen
                            book. It has survived not only five centuries, but also the leap into electronic
                            typesetting, remaining essentially unchanged. It was popularised in the 1960s with
                            the release of Letraset sheets containing Lorem Ipsum passages, and more recently
                            with desktop publishing software like Aldus PageMaker including versions of Lorem
                            Ipsum.
                          </p>
                        </Panel>
                        <Panel
                          header="Can i export invoice in CSV format?"
                          key="4"
                          className="site-collapse-custom-panel">
                          <p>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
                            Ipsum has been the industry&apos;s standard dummy text ever since the 1500s, when
                            an unknown printer took a galley of type and scrambled it to make a type specimen
                            book. It has survived not only five centuries, but also the leap into electronic
                            typesetting, remaining essentially unchanged. It was popularised in the 1960s with
                            the release of Letraset sheets containing Lorem Ipsum passages, and more recently
                            with desktop publishing software like Aldus PageMaker including versions of Lorem
                            Ipsum.
                          </p>
                        </Panel>
                        <Panel header="Is our data safe?" key="5" className="site-collapse-custom-panel">
                          <p>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
                            Ipsum has been the industry&apos;s standard dummy text ever since the 1500s, when
                            an unknown printer took a galley of type and scrambled it to make a type specimen
                            book. It has survived not only five centuries, but also the leap into electronic
                            typesetting, remaining essentially unchanged. It was popularised in the 1960s with
                            the release of Letraset sheets containing Lorem Ipsum passages, and more recently
                            with desktop publishing software like Aldus PageMaker including versions of Lorem
                            Ipsum.
                          </p>
                        </Panel>
                        <Panel header="Are there any Ads?" key="6" className="site-collapse-custom-panel">
                          <p>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
                            Ipsum has been the industry&apos;s standard dummy text ever since the 1500s, when
                            an unknown printer took a galley of type and scrambled it to make a type specimen
                            book. It has survived not only five centuries, but also the leap into electronic
                            typesetting, remaining essentially unchanged. It was popularised in the 1960s with
                            the release of Letraset sheets containing Lorem Ipsum passages, and more recently
                            with desktop publishing software like Aldus PageMaker including versions of Lorem
                            Ipsum.
                          </p>
                        </Panel>
                        <Panel header="How do I get support?" key="7" className="site-collapse-custom-panel">
                          <p>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
                            Ipsum has been the industry&apos;s standard dummy text ever since the 1500s, when
                            an unknown printer took a galley of type and scrambled it to make a type specimen
                            book. It has survived not only five centuries, but also the leap into electronic
                            typesetting, remaining essentially unchanged. It was popularised in the 1960s with
                            the release of Letraset sheets containing Lorem Ipsum passages, and more recently
                            with desktop publishing software like Aldus PageMaker including versions of Lorem
                            Ipsum.
                          </p>
                        </Panel>
                        <Panel
                          header="Where can I find documentation?"
                          key="8"
                          className="site-collapse-custom-panel">
                          <p>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
                            Ipsum has been the industry&apos;s standard dummy text ever since the 1500s, when
                            an unknown printer took a galley of type and scrambled it to make a type specimen
                            book. It has survived not only five centuries, but also the leap into electronic
                            typesetting, remaining essentially unchanged. It was popularised in the 1960s with
                            the release of Letraset sheets containing Lorem Ipsum passages, and more recently
                            with desktop publishing software like Aldus PageMaker including versions of Lorem
                            Ipsum.
                          </p>
                        </Panel>
                        <Panel
                          header="Do you offer a self-hosted solution?"
                          key="9"
                          className="site-collapse-custom-panel">
                          <p>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
                            Ipsum has been the industry&apos;s standard dummy text ever since the 1500s, when
                            an unknown printer took a galley of type and scrambled it to make a type specimen
                            book. It has survived not only five centuries, but also the leap into electronic
                            typesetting, remaining essentially unchanged. It was popularised in the 1960s with
                            the release of Letraset sheets containing Lorem Ipsum passages, and more recently
                            with desktop publishing software like Aldus PageMaker including versions of Lorem
                            Ipsum.
                          </p>
                        </Panel>
                        <Panel
                          header="How many businesses use Accounting Software?"
                          key="10"
                          className="site-collapse-custom-panel">
                          <p>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
                            Ipsum has been the industry&apos;s standard dummy text ever since the 1500s, when
                            an unknown printer took a galley of type and scrambled it to make a type specimen
                            book. It has survived not only five centuries, but also the leap into electronic
                            typesetting, remaining essentially unchanged. It was popularised in the 1960s with
                            the release of Letraset sheets containing Lorem Ipsum passages, and more recently
                            with desktop publishing software like Aldus PageMaker including versions of Lorem
                            Ipsum.
                          </p>
                        </Panel>
                        <Panel
                          header="How many Company and Branches can we add?"
                          key="11"
                          className="site-collapse-custom-panel">
                          <p>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
                            Ipsum has been the industry&apos;s standard dummy text ever since the 1500s, when
                            an unknown printer took a galley of type and scrambled it to make a type specimen
                            book. It has survived not only five centuries, but also the leap into electronic
                            typesetting, remaining essentially unchanged. It was popularised in the 1960s with
                            the release of Letraset sheets containing Lorem Ipsum passages, and more recently
                            with desktop publishing software like Aldus PageMaker including versions of Lorem
                            Ipsum.
                          </p>
                        </Panel>
                      </Collapse>
                    </div>
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
