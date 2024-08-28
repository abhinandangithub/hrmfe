import { Card, Col, Row } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'
import cloud from '../../assets/images/home/cloud.svg'
import integration from '../../assets/images/home/integration.svg'
import training from '../../assets/images/home/training.svg'
import customerImage from '../../assets/images/icons/customer.svg'
import invoiceImage from '../../assets/images/icons/invoice.svg'
import usersImage from '../../assets/images/icons/users.svg'
import BlockchainManagement from '../../assets/images/modules/blockchain-management.svg'
import DigitalSignature from '../../assets/images/modules/digital-signature.svg'
import FinanceManagement from '../../assets/images/modules/finance-management.svg'
import HrPayrollManagement from '../../assets/images/modules/hr-payroll-management.svg'
import LogisticsManagement from '../../assets/images/modules/logistics-management.svg'
import ServiceManagement from '../../assets/images/modules/service-management.svg'
import RightsideBanner from '../../assets/images/right-side-banner-image.svg'
import securedApp from '../../assets/images/secured-app.png'
import ourApplication from '../../assets/images/service-management.png'
import statisticsImage from '../../assets/images/statistics.svg'
import videoThumbnail from '../../assets/images/video-thumbnail.svg'
import ModalBox from '../../Components/ModalBox/ModalBox'
import T from '../../Components/Translate/Translate'
import BookDemo from './BookDemo'
import './Home.scss'
import Partners from './Partners'
import Portfolio from './Portfolio'

export default class Home extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      openVideo: false
    }
  }

  render() {
    return (
      <>
        <section className="accounting-software-banner">
          <div className="container-fluid">
            <Row justify="center">
              <Col span={21}>
                <Row justify="left">
                  <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 12 }}>
                    <h1>
                      <T>Get your Business enabled with E-Invoicing solutions</T>
                    </h1>
                    <ul className="text-white mb-3">
                      <li>
                        <T>A compact and easily configurable solution to use</T>
                      </li>
                      <li>
                        <T>End-to-end invoicing solutions for your Business</T>
                      </li>
                      <li>
                        <T>If you already have an ERP, integrate our e-invoicing solutions quickly</T>
                      </li>
                      <li>
                        <T>Automatic upload of invoices possible</T>
                      </li>
                      <li>
                        <T>Zero infrastructure costs</T>
                      </li>
                    </ul>
                    {/* <Link to="/login" className="btn-large btn-coloured btn-right-space">
                      Get free trial
                    </Link> */}
                    <Link to="/contact-us" className="btn-large btn-coloured">
                      <T>Get Quote</T>
                    </Link>

                    <div className="simple-message">
                      <span>
                        <i className="flaticon-curve-down-left-arrow" />
                      </span>
                      <T>Its easy and simple</T>
                    </div>
                  </Col>
                  <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 12 }}>
                    <img src={RightsideBanner} alt="Accqrate Improve your Finance and logistics solution" />
                  </Col>
                </Row>
              </Col>
            </Row>
          </div>
        </section>

        <section className="discover-erp-software">
          <div className="container-fluid">
            <Row justify="center">
              <Col xs={{ span: 22 }} sm={{ span: 22 }} md={{ span: 20 }} lg={{ span: 18 }}>
                <h2 className="mb-3 mt-0">
                  <T>Our solutions to your Business</T>
                </h2>
                <Row justify="center" gutter={(12, 24)} className="mb-3">
                  <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 8 }}>
                    <Card size="small" bordered={false} className="our-solution text-white mb-3">
                      <h3 className="text-white">
                        <T>Cloud ERP Solutions</T>
                      </h3>
                      <ul>
                        <li>
                          <T>Pay as you use.</T>
                        </li>
                        <li>
                          <T>Zero infrastructure cost</T>
                        </li>
                      </ul>
                      <div className="icon">
                        <img src={cloud} alt="Cloud ERP Solutions" />
                      </div>
                    </Card>
                  </Col>
                  <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 8 }}>
                    <Card size="small" bordered={false} className="our-solution text-white mb-3">
                      <h3 className="text-white">
                        <T>On Premises</T>
                      </h3>
                      <ul>
                        <li>
                          <T>ERP in your infrastructure</T>
                        </li>
                        <li>
                          <T>Training and support</T>
                        </li>
                      </ul>
                      <div className="icon">
                        <img src={training} alt="On Premises" />
                      </div>
                    </Card>
                  </Col>
                  <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 8 }}>
                    <Card size="small" bordered={false} className="our-solution text-white mb-3">
                      <h3 className="text-white">
                        <T>Interface with your ERP</T>
                      </h3>
                      <ul>
                        <li>
                          <T>If you have ERP, we can integrate our solutions</T>
                        </li>
                        <li>
                          <T>SAP, Navision, Dynamics</T>
                        </li>
                      </ul>
                      <div className="icon">
                        <img src={integration} alt="Interface with your ERP" />
                      </div>
                    </Card>
                  </Col>
                </Row>
              </Col>
            </Row>

            <Row justify="center">
              <Col xs={{ span: 23 }} sm={{ span: 23 }} md={{ span: 21 }} lg={{ span: 21 }}>
                <Row justify="center">
                  <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 20 }} lg={{ span: 16 }}>
                    <div className="images">
                      <img
                        src={ourApplication}
                        className="dashboard"
                        alt="Accqrate Improve your Finance and logistics solution"
                      />
                      <img src={securedApp} className="secured-app" alt="Accqrate Secured app" />
                    </div>
                  </Col>
                  <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 20 }} lg={{ span: 17 }}>
                    <h2>
                      <T>
                        Discover the Easy-to-Use Cloud ERP Software Built for Small and Medium Enterprise
                        Companies
                      </T>
                    </h2>
                    <p>
                      <T>
                        See how you can manage costs in real-time with the incredibly easy-to-use ERP designed
                        for mobile and desktop users. Built for the cloud and industry ready, get the power of
                        unlimited office and field teams connecting with financials, inventory, dashboards,
                        and more.
                      </T>
                    </p>
                  </Col>
                </Row>
              </Col>
            </Row>
          </div>
        </section>

        <section className="demo-vdeo">
          <div className="container-fluid">
            <Row justify="center">
              <Col xs={{ span: 21 }} sm={{ span: 21 }} md={{ span: 20 }} lg={{ span: 20 }}>
                <Row justify="left" gutter={(24, 24)}>
                  <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 10 }} lg={{ span: 10 }}>
                    <h2>
                      <T>E-Invoicing Solutions Demo</T>
                    </h2>
                    <ul>
                      <li>
                        <T>ZATCA Compliant templates</T>
                      </li>
                      <li>
                        <T>Integrated QR Code</T>
                      </li>
                      <li>
                        <T>On board your business in 2 hours</T>
                      </li>
                      <li>
                        <T>5 simple steps to enable your e-invoices</T>
                      </li>
                    </ul>
                    <Link
                      to=""
                      className="btn-large btn-coloured"
                      onClick={() => this.setState({ openVideo: true })}>
                      <i className="flaticon-play" style={{ marginRight: 10 }} />
                      <T>Play Video</T>
                    </Link>
                  </Col>
                  <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 14 }} lg={{ span: 14 }}>
                    <img src={videoThumbnail} alt="E-Invoicing Solutions Demo" />
                  </Col>
                </Row>
              </Col>
            </Row>
          </div>
        </section>

        <section id="our-modules" className="our-modules">
          <div className="container-fluid">
            <Row justify="center">
              <Col span={21}>
                <Row justify="left" gutter={(24, 24)}>
                  <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 12 }}>
                    <h4>
                      <T>Free up time, focus on growth</T>
                    </h4>
                    <p>
                      <T>
                        Accqrate streamlines your business and automates your Business processes. Scale your
                        business efficiently through a pick and pack model. Pay per usage with zero risks.
                      </T>
                    </p>
                  </Col>
                  <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6 }} lg={{ span: 6 }}>
                    <div className="module-list">
                      <div className="icon">
                        <img src={BlockchainManagement} alt="E-Invoicing" />
                      </div>
                      <h3>
                        <T>E-Invoicing Solution</T>
                      </h3>
                      <p>
                        <T>
                          Create e-invoices for your Business partners and tax authorities. We also integrate
                          with your existing ERP
                        </T>
                      </p>
                      <Link to="">
                        <T>See more details</T> <i className="flaticon-arrow-pointing-to-right" />
                      </Link>
                    </div>
                  </Col>
                  <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6 }} lg={{ span: 6 }}>
                    <div className="module-list">
                      <div className="icon">
                        <img src={DigitalSignature} alt="Digital signatures" />
                      </div>
                      <h3>
                        <T>Digital signatures</T>
                      </h3>
                      <p>
                        <T>
                          Digital signature through blockchain, send invoices to partners or tax authorities,
                          integration with SAP
                        </T>
                      </p>
                      <Link to="">
                        <T>See more details</T> <i className="flaticon-arrow-pointing-to-right" />
                      </Link>
                    </div>
                  </Col>
                  <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6 }} lg={{ span: 6 }}>
                    <div className="module-list">
                      <div className="icon">
                        <img src={FinanceManagement} alt="Finance Management" />
                      </div>
                      <h3>
                        <T>Finance Management</T>
                      </h3>
                      <p>
                        <T>
                          Chart of accounts, Account Setup, Financial books, Accounts receivable and payable,
                          General ledger and Dashboard
                        </T>
                      </p>
                      <Link to="">
                        <T>See more details</T> <i className="flaticon-arrow-pointing-to-right" />
                      </Link>
                    </div>
                  </Col>
                  <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6 }} lg={{ span: 6 }}>
                    <div className="module-list">
                      <div className="icon">
                        <img src={ServiceManagement} alt="Service Management" />
                      </div>
                      <h3>
                        <T>Service Management</T>
                      </h3>
                      <p>
                        <T>
                          Create your services, projects, timesheets, approvals, invoices, expense claims,
                          finance books, reports and dashboard
                        </T>
                      </p>
                      <Link to="">
                        <T>See more details</T> <i className="flaticon-arrow-pointing-to-right" />
                      </Link>
                    </div>
                  </Col>
                  <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6 }} lg={{ span: 6 }}>
                    <div className="module-list">
                      <div className="icon">
                        <img src={LogisticsManagement} alt="Logistics Management" />
                      </div>
                      <h3>
                        <T>Logistics Management</T>
                      </h3>
                      <p>
                        <T>
                          Order to cash, procure to pay, Materials management, Inventory Management,
                          Availability checks
                        </T>
                      </p>
                      <Link to="">
                        <T>See more details</T> <i className="flaticon-arrow-pointing-to-right" />
                      </Link>
                    </div>
                  </Col>
                  <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 7 }} lg={{ span: 6 }}>
                    <div className="module-list">
                      <div className="icon">
                        <img src={HrPayrollManagement} alt="HR and Payroll" />
                      </div>
                      <h3>
                        <T>HR and Payroll</T>
                      </h3>
                      <p>
                        <T>
                          Employee hire to retire, flexible payroll configuration, manage payslips, leave
                          management, workflows
                        </T>
                      </p>
                      <Link to="">
                        <T>See more details</T> <i className="flaticon-arrow-pointing-to-right" />
                      </Link>
                    </div>
                  </Col>
                </Row>
              </Col>
            </Row>
          </div>
        </section>

        <Portfolio {...this.props} />

        <section className="book-live-demo">
          <div className="container-fluid">
            <Row justify="center">
              <Col span={21}>
                <Row justify="left" gutter={(24, 24)}>
                  <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 12 }}>
                    <h2>
                      <T>Book a live demo, tailored to you</T>
                    </h2>
                    <p>
                      <T>
                        Fill in the form for the demo of the application with our experts. We can help you
                        decide whether Accqrate is the right choice for your business
                      </T>
                    </p>
                  </Col>
                  <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 12 }}>
                    <BookDemo />
                  </Col>
                </Row>
              </Col>
            </Row>
          </div>
        </section>

        <Partners {...this.props} />

        <section className="erp-software-cta">
          <div className="container-fluid">
            <Row justify="center">
              <Col xs={{ span: 21 }} sm={{ span: 21 }} md={{ span: 14 }} lg={{ span: 14 }}>
                <h3>
                  <T>A modern ERP application for startups, small and medium businesses.</T>
                </h3>
                <p>
                  <T>
                    Get the Cloud ERP solution that helps rapid-growth companies thrive in the digital economy
                  </T>
                </p>
                <Link to="/contact-us" className="btn-large btn-white mt-3">
                  <T>Get quote</T>
                </Link>
              </Col>
            </Row>
          </div>
        </section>

        {/* <section className="modules-pricings">
          <Row justify="center">
            <Col xs={{ span: 22 }} sm={{ span: 22 }} md={{ span: 17 }} lg={{ span: 17 }}>
              <h3>
                <T>Pricings & Subscription</T>
              </h3>
              <h4>{t("Choose a plan that's right for you.")}</h4>
            </Col>
            <Col xs={{ span: 22 }} sm={{ span: 23 }} md={{ span: 4 }} lg={{ span: 4 }} className="text-right">
              <Link to="/login" className="btn-large btn-coloured">
                <T>Try free trial</T>
              </Link>
            </Col>
          </Row>
          <Row justify="center">
            <Col xs={{ span: 23 }} sm={{ span: 23 }} md={{ span: 22 }} lg={{ span: 21 }}>
              <div className="pricing-table">
                <div className="pricing-list">
                  <div className="details">
                    <div className="heading">
                      <h5>
                        <T>E-Invoicing Solution</T>
                      </h5>
                      <div className="price-details">
                        $5
                        <div className="user">
                          <T>Per user Per company</T>
                        </div>
                        <div className="transaction">
                          <T>Billed Monthly</T>
                        </div>
                      </div>
                    </div>
                    <div className="features">
                      <ul>
                        <li>
                          <T>Digital invoices with tax compliance</T>
                        </li>
                        <li>
                          <T>QR code integration</T>
                        </li>
                        <li>
                          <T>Custom templates and easy to use</T>
                        </li>
                        <li>
                          <T>Upload of invoices from other ERP</T>
                        </li>
                        <li>
                          <T>Direct integration with other ERPs</T>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="pricing-list">
                  <div className="details">
                    <div className="heading">
                      <h5>
                        <T>Digital signatures</T>
                      </h5>
                      <div className="price-details">
                        <T>$0.01 / invoice</T>
                        <div className="user">
                          <T>1 to 100 Users</T>
                        </div>
                        <div className="transaction">
                          <T>Billed Monthly</T>
                        </div>
                      </div>
                    </div>
                    <div className="features">
                      <ul>
                        <li>
                          <T>Digitally signed invoices and pdf</T>
                        </li>
                        <li>
                          <T>Integrate with your existing ERP</T>
                        </li>
                        <li>
                          <T>Outbound transmission to partners</T>
                        </li>
                        <li>
                          <T>Inbound transmission to partners</T>
                        </li>
                        <li>
                          <T>Blockchain integrated solution</T>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="pricing-list">
                  <div className="details">
                    <div className="heading">
                      <h5>
                        <T>Finance Management</T>
                      </h5>
                      <div className="price-details">
                        $2
                        <div className="user">
                          <T>Per user Per company</T>
                        </div>
                        <div className="transaction">
                          <T>Billed Monthly</T>
                        </div>
                      </div>
                    </div>
                    <div className="features">
                      <ul>
                        <li>
                          <T>Financial Year, Account setups</T>
                        </li>
                        <li>
                          <T>Account groups & Chart of accounts</T>
                        </li>
                        <li>
                          <T>Invoices and Expenses</T>
                        </li>
                        <li>
                          <T>Invoice and Expense upload</T>
                        </li>
                        <li>
                          <T>Finance book, JV, P&L</T>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="pricing-list">
                  <div className="details">
                    <div className="heading">
                      <h5>
                        <T>Service Management</T>
                      </h5>
                      <div className="price-details">
                        $2
                        <div className="user">
                          <T>Per user Per company</T>
                        </div>
                        <div className="transaction">
                          <T>Billed Monthly</T>
                        </div>
                      </div>
                    </div>
                    <div className="features">
                      <ul>
                        <li>
                          <T>Business Partners</T>
                        </li>
                        <li>
                          <T>Service details</T>
                        </li>
                        <li>
                          <T>Project & Project rates</T>
                        </li>
                        <li>
                          <T>Project Management</T>
                        </li>
                        <li>
                          <T>Timesheet & Time reports</T>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="pricing-list">
                  <div className="details">
                    <div className="heading">
                      <h5>
                        <T>Logistics Management</T>
                      </h5>
                      <div className="price-details">
                        $5
                        <div className="user">
                          <T>Per user Per company</T>
                        </div>
                        <div className="transaction">
                          <T>Billed Monthly</T>
                        </div>
                      </div>
                    </div>
                    <div className="features">
                      <ul>
                        <li>
                          <T>Warehouse Management</T>
                        </li>
                        <li>
                          <T>Inventory Management</T>
                        </li>
                        <li>
                          <T>Order to Cash process</T>
                        </li>
                        <li>
                          <T>Procure to pay process</T>
                        </li>
                        <li>
                          <T>Stock reports and checks</T>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="pricing-list">
                  <div className="details">
                    <div className="heading">
                      <h5>
                        <T>HR & Payroll</T>
                      </h5>
                      <div className="price-details">
                        $2
                        <div className="user">
                          <T>Per user Per company</T>
                        </div>
                        <div className="transaction">
                          <T>Billed Monthly</T>
                        </div>
                      </div>
                    </div>
                    <div className="features">
                      <ul>
                        <li>
                          <T>Employees</T>
                        </li>
                        <li>
                          <T>Tax data</T>
                        </li>
                        <li>
                          <T>Holiday calendar</T>
                        </li>
                        <li>
                          <T>Employee paymaster</T>
                        </li>
                        <li>
                          <T>Payrolls</T>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </section> */}

        <section className="accqrate-statistics">
          <div className="container-fluid">
            <Row justify="center">
              <Col xs={{ span: 21 }} sm={{ span: 21 }} md={{ span: 8 }} lg={{ span: 8 }}>
                <Row justify="center" gutter={(24, 24)}>
                  <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 12 }}>
                    <div className="statistics">
                      <span className="count">
                        <T>50+</T>
                      </span>
                      <div className="title">
                        <T>Customers</T>
                      </div>
                      <div className="icon">
                        <img src={customerImage} alt="customer" />
                      </div>
                    </div>
                  </Col>
                  <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 12 }}>
                    <div className="statistics">
                      <span className="count">
                        <T>200+</T>
                      </span>
                      <div className="title">
                        <T>Users</T>
                      </div>
                      <div className="icon">
                        <img src={usersImage} alt="users" />
                      </div>
                    </div>
                  </Col>
                  <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 24 }}>
                    <div className="statistics">
                      <span className="count">
                        <T>10,000+</T>{' '}
                      </span>
                      <div className="title">
                        <T>E-Invoices per month</T>
                      </div>
                      <div className="icon">
                        <img src={invoiceImage} alt="invoice" />
                      </div>
                    </div>
                  </Col>
                </Row>
              </Col>
              <Col xs={{ span: 21 }} sm={{ span: 21 }} md={{ span: 13 }} lg={{ span: 13 }}>
                <img className="office" src={statisticsImage} alt="statistics" />
              </Col>
            </Row>
          </div>
        </section>
        {/* <section className="readyto-see-cta">
          <Row justify="center">
            <Col xs={{ span: 21 }} sm={{ span: 21 }} md={{ span: 18 }} lg={{ span: 16 }}>
              <h3>
                <T>Check the demo of the apps</T>
              </h3>
              <iframe
                width="100%"
                height="480"
                style={{ border: 'none' }}
                src="https://www.youtube.com/embed/8CENKuxzg3k"
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              />
              <Link className="btn-large btn-coloured">
                <T>View Demo video</T>
              </Link>
            </Col>
          </Row>
        </section> */}
        <ModalBox
          title="E-Invoicing Solutions Demo"
          visible={!!this.state.openVideo}
          onCancel={() => this.setState({ openVideo: false })}
          footer={null}
          width={900}
          destroyOnClose>
          <iframe
            className="invoice-video"
            width="100%"
            style={{ border: 'none' }}
            src="https://www.youtube.com/embed/8CENKuxzg3k?rel=0&autoplay=1"
            title="YouTube video player"
            allowFullScreen
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          />
        </ModalBox>
      </>
    )
  }
}
