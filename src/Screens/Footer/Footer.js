import { BackTop, Col, Row } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'
import logoWhite from '../../assets/images/logo-white.png'
import './Footer.scss'

export default class Footer extends React.PureComponent {
  render() {
    return (
      <div>
        <footer>
          <div className="container-fluid">
            <Row justify="center">
              <Col span={20}>
                <Row>
                  <Col
                    xs={{ span: 24, order: 1 }}
                    sm={{ span: 12, order: 1 }}
                    md={{ span: 12, order: 1 }}
                    lg={{ span: 6, order: 1 }}>
                    <div className="basic-info">
                      <img src={logoWhite} alt="Accqrate" />
                      <p>
                        A flexible cloud based ERP for your business needs. An expensive ERP is not always the
                        right choice. Per per usage, digitise your business and track your transactions at
                        your desk
                      </p>
                      <div className="social-icons">
                        <a
                          href="https://www.facebook.com/Accqrate-108829815029878"
                          target="_blank"
                          rel="noreferrer">
                          <i className="flaticon-facebook-1" />
                        </a>
                        <a href="https://www.linkedin.com/showcase/accqrate" target="_blank" rel="noreferrer">
                          <i className="flaticon-linkedin" aria-hidden="true" />
                        </a>
                        <a href="https://twitter.com/accqrate_erp" target="_blank" rel="noreferrer">
                          <i className="flaticon-twitter-2" aria-hidden="true" />
                        </a>
                        <a href="https://www.instagram.com/accqrateerp/" target="_blank" rel="noreferrer">
                          <i className="flaticon-instagram" aria-hidden="true" />
                        </a>
                      </div>
                    </div>
                  </Col>
                  <Col
                    xs={{ span: 24, order: 2 }}
                    sm={{ span: 12, order: 2 }}
                    md={{ span: 12, order: 2 }}
                    lg={{ span: 6, order: 2 }}>
                    <div className="links padding-left">
                      <h4>Important Links</h4>
                      <ul>
                        <li>
                          <Link to="/about-us">About us</Link>
                        </li>
                        <li>
                          <Link to="/careers">Careers</Link>
                        </li>
                        <li>
                          <Link to="/demo-videos">Demo Videos</Link>
                        </li>
                        <li>
                          <Link to="/contact-us">Contact Us</Link>
                        </li>
                      </ul>
                    </div>
                  </Col>
                  <Col
                    xs={{ span: 24, order: 3 }}
                    sm={{ span: 12, order: 3 }}
                    md={{ span: 12, order: 3 }}
                    lg={{ span: 6, order: 3 }}>
                    <div className="links">
                      <h4>Featured Modules</h4>
                      <ul>
                        <li>
                          <Link to="">Service Management</Link>
                        </li>
                        <li>
                          <Link to="">Finance Management</Link>
                        </li>
                        <li>
                          <Link to="">Logistics Management</Link>
                        </li>
                        <li>
                          <Link to="">HR & Payroll</Link>
                        </li>
                        <li>
                          <Link to="">E-invoicing via Blockchain</Link>
                        </li>
                      </ul>
                    </div>
                  </Col>
                  <Col
                    xs={{ span: 24, order: 4 }}
                    sm={{ span: 12, order: 4 }}
                    md={{ span: 12, order: 4 }}
                    lg={{ span: 6, order: 4 }}>
                    <div className="links">
                      <h4>Informations</h4>
                      <ul>
                        <li>
                          <Link to="/data-security">Data Security</Link>
                        </li>
                        <li>
                          <Link to="/disaster-recovery">Disaster Recovery</Link>
                        </li>
                        <li>
                          <Link to="/enhancements-and-upgrades">Enhancements and upgrades</Link>
                        </li>
                        <li>
                          <Link to="/application-support-and-maintenance">
                            Application Support and Maintenance
                          </Link>
                        </li>
                      </ul>
                    </div>
                    <div className="links">
                      <h4>Contact Details</h4>
                      <div className="contact-list">
                        <span>Email</span>
                        erp@accqrate.com
                      </div>
                    </div>
                  </Col>
                </Row>

                <Row>
                  <div className="bottom-footer">
                    <Row>
                      <Col xs={{ span: 24 }} sm={{ span: 12 }} md={{ span: 12 }} lg={{ span: 12 }}>
                        <div className="copyright-text">
                          <p>
                            © Copyright 2021 <Link to="">Accqrate</Link>, All Rights Reserved.
                          </p>
                        </div>
                      </Col>
                      <Col xs={{ span: 24 }} sm={{ span: 12 }} md={{ span: 12 }} lg={{ span: 12 }}>
                        <div className="copyright-links">
                          <ul>
                            <li>
                              <Link to="/privacy-policy">Privacy Policy</Link>
                            </li>
                            <li>
                              <Link to="/terms-and-conditions">Terms and Condition</Link>
                            </li>
                          </ul>
                        </div>
                      </Col>
                    </Row>
                  </div>
                </Row>
              </Col>
            </Row>
          </div>
        </footer>

        <BackTop />
      </div>
    )
  }
}
