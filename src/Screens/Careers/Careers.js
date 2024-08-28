import { Col, Collapse, Row, Space } from 'antd'
import React from 'react'
import hiring from '../../assets/images/hiring.svg'
import './Careers.scss'

const { Panel } = Collapse

export default class Careers extends React.PureComponent {
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
                      <h1>Join Our Team</h1>
                      <p>We are hiring!</p>
                    </div>
                  </Col>
                  <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 12 }}>
                    <img src={hiring} alt="" />
                  </Col>
                </Row>
              </Col>
            </Row>
          </div>
        </section>
        {/* breadcrum ends here */}

        <section className="inner-pages careers">
          <div className="container-fluid">
            <Row justify="center">
              <Col span={20}>
                <Row justify="center" gutter={[20]}>
                  <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 18 }} lg={{ span: 18 }}>
                    <Space direction="vertical">
                      {/* <Collapse collapsible="header" defaultActiveKey={['1']} expandIconPosition="right">
                        <Panel header="Full stack developers" key="1">
                          <p>
                              Interested candidates email your resume to
                              <a href="mailto:erp@accqrate.com">erp@accqrate.com</a>
                            </p>
                        </Panel>
                      </Collapse> */}
                      <Collapse collapsible="header" defaultActiveKey={['2']} expandIconPosition="right">
                        <Panel header="React js developers" key="2">
                          <div className="details">
                            <p>
                              We’re looking for a candidate with 3 years of experience with a passion for
                              technology, self-motivated and results oriented individual with the ability to
                              work effectively with other team members.
                            </p>
                            <h2>Strong experience in ReactJs Development</h2>
                            <ul>
                              <li>
                                Excellent knowledge of HTML5, CSS, JavaScript and front-end frameworks ReactJS
                              </li>
                              <li>Experience with popular React.js workflows such as Flux or Redux</li>
                              <li>Experience with the Redux data pattern and NGRX</li>
                              <li>
                                Experience working with server-client architectures, consuming JSON data from
                                API’s
                              </li>
                              <li>Curiosity and a highly collaborative work style</li>
                            </ul>
                            <p>
                              Interested candidates email your resume to
                              <a href="mailto:erp@accqrate.com">erp@accqrate.com</a>
                            </p>
                          </div>
                        </Panel>
                      </Collapse>

                      <Collapse expandIconPosition="right">
                        <Panel header="NodeJs developers" key="4">
                          <div className="details">
                            <p>
                              <b>Node.js Backend Developer</b>&nbsp;that will focus on back-end development.
                              You will be involved in a wide range of backend development tasks, including:
                            </p>
                            <ul>
                              <li>Creating and supporting development of backend API</li>
                              <li>
                                Designing and building backend API micro services, supporting client-side
                                applications
                              </li>
                              <li>Integration of components and remote systems into the platform</li>
                              <li>Software design and documentation</li>
                              <li>
                                Communication with our partners, customers and vendors in an effective way to
                                understand and implement optimal solutions
                              </li>
                              <li>Internal support, knowledge sharing and mentoring</li>
                            </ul>
                            <h2>Skills and experience required</h2>
                            <ul>
                              <p>3 years+ of enterprise-level development experience with the following:</p>
                              <li>Building micro services using Node.js and JavaScript</li>
                              <li>
                                Using multiple JavaScript frameworks, build systems, tools and deployment
                                mechanisms
                              </li>
                              <li>Developing RESTful APIs using Node.js</li>
                              <li>ECMAScript 6, JavaScript</li>
                              <li>SCM using Git, Git workflows</li>
                              <li>Docker, software containerization and micro services architectures</li>
                              <li>Excellent analytical and communication skills</li>
                              <li>Proven ability to be a self-starter</li>
                              <li>Experience with AGILE development methodologies</li>
                            </ul>
                            <p>
                              Interested candidates email your resume to{' '}
                              <a href="mailto:erp@accqrate.com">erp@accqrate.com</a>
                            </p>
                          </div>
                        </Panel>
                      </Collapse>

                      <Collapse expandIconPosition="right">
                        <Panel header="React native developers" key="5">
                          <div className="details">
                            <p>
                              We are looking for a candidate with 3 years of experience in mobile app
                              development.
                            </p>
                            <p>
                              In this position you’ll be working with technologies like React Native, Redux,
                              RX Observables, Type Script etc.
                            </p>
                            <h3>Skills & Qualifications :</h3>
                            <ul>
                              <li>Good mobile app development experience (2-3 years)</li>
                              <li>Strong knowledge of React Native</li>
                              <li>Strong Javascript knowledge</li>
                              <li>Strong attention to detail in UX &amp; interactions</li>
                              <li>Familiar with Javascript ES6/ES7</li>
                              <li>Experience integrating REST APIs.</li>
                              <li>Good knowledge of Git, Gitlab/bitbucket/Github etc.</li>
                            </ul>
                            <ul>
                              <li>Good mobile app development experience (2-3 years)</li>
                              <li>Strong knowledge of React Native</li>
                              <li>Strong Javascript knowledge</li>
                              <li>Strong attention to detail in UX &amp; interactions</li>
                              <li>Familiar with Javascript ES6/ES7</li>
                              <li>Experience integrating REST APIs.</li>
                              <li>Good knowledge of Git, Gitlab/bitbucket/Github etc.</li>
                            </ul>
                            <p>
                              Interested candidates email your resume to{' '}
                              <a href="mailto:erp@accqrate.com">erp@accqrate.com</a>
                            </p>
                          </div>
                        </Panel>
                      </Collapse>
                      <Collapse expandIconPosition="right">
                        <Panel header="AWS cloud specialists" key="5">
                          <p>
                            Interested candidates email your resume to
                            <a href="mailto:erp@accqrate.com">erp@accqrate.com</a>
                          </p>
                        </Panel>
                      </Collapse>
                    </Space>
                  </Col>
                </Row>
              </Col>
            </Row>
          </div>
        </section>

        <section className="erp-software-cta full-width-section">
          <div className="container-fluid">
            <Row justify="center">
              <Col span={21}>
                <h3>If you cannot find a suitable position</h3>
                <a href="mailto:erp@accqrate.com" className="btn-large btn-white">
                  Mail us your resume
                </a>
              </Col>
            </Row>
          </div>
        </section>
      </>
    )
  }
}
