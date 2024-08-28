import { Col, Row } from 'antd'
import React from 'react'
import './PrivacyPolicy.scss'

export default class PrivacyPolicy extends React.PureComponent {
  render() {
    return (
      <>
        {/* Breadcrum starts */}
        <section className="breadcrum-title only-heading">
          <div className="container-fluid">
            <Row justify="center">
              <Col span={21}>
                <Row justify="left" gutter={[20]}>
                  <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 24 }}>
                    <div className="breadcrum-content">
                      <h1>Privacy Policy</h1>
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
                    <h1>Privacy Statement</h1>
                    <h2>Introduction</h2>
                    <p>
                      While providing the Services, ACCQRATE (henceforth referred as ACCQRATE) collects
                      Personal Information about Individuals. This document describes how ACCQRATE collects,
                      stores, uses and discloses Personal Information.
                    </p>
                    <p>
                      It is ACCQRATE’s policy to respect your privacy regarding any information we may collect
                      while operating our website.
                    </p>
                    <h3>How information is collected</h3>
                    <p>
                      ACCQRATE will collect personal information by lawful and fair means and, where
                      appropriate, with the knowledge or consent of the individual concerned.
                    </p>
                    <p>ACCQRATE may collect Personal Information about Individuals:</p>
                    <ul>
                      <li>from customer surveys;</li>
                      <li>from ACCQRATE’s website;</li>
                      <li>from Interfaces;</li>
                      <li>
                        from any other digital infrastructure operated and maintained by ACCQRATE on behalf of
                        an Organisation;
                      </li>
                      <li>from applications developed by ACCQRATE or operated by ACCQRATE;</li>
                      <li>from Individuals’ communications with ACCQRATE; and</li>
                      <li>
                        through automated analysis of Individuals’ use of ACCQRATE and Organisations’
                        Services.
                      </li>
                    </ul>

                    <h3>How information is held and secured</h3>
                    <p>ACCQRATE may hold Personal Information using digital storage methods.</p>
                    <p>
                      ACCQRATE ensures that Personal Information is protected from unauthorised access by
                      industry standard data security techniques including firewalls, client authentication,
                      SSL and passwords.
                    </p>

                    <h3>Accessing information</h3>
                    <p>
                      Individuals have the right to contact ACCQRATE to modify or obtain any of their Personal
                      Information which is held by the ACCQRATE.
                    </p>

                    <p>Unknowingly collected information</p>
                    <p>
                      ACCQRATE acknowledges that from time to time, ACCQRATE may come into possession of
                      Personal Information without being aware of it, for example, when Organisations use
                      ACCQRATE’s Service to store data.
                    </p>

                    <h3>Disclosures during use of the services</h3>
                    <p>
                      During the use of the Services, ACCQRATE may disclose Personal Information to
                      Organisations and third party contractors such as Google Analytics and AWS. ACCQRATE
                      will make a good faith effort to ensure that such disclosures are clear to Individuals,
                      but how those Organisations handle Personal Information is beyond the control of
                      ACCQRATE.
                    </p>

                    <h3>Deletion of Personal Information</h3>
                    <p>ACCQRATE deletes Personal Information when:</p>
                    <ul>
                      <li>
                        It is determined by ACCQRATE or an Organisation that the Personal Information is no
                        longer needed; or
                      </li>
                      <li>Individuals request its deletion and it is reasonable to comply.</li>
                    </ul>

                    <h3>Changes to this policy</h3>
                    <p>
                      We are committed to conducting our business in accordance with these principles in order
                      to ensure that the confidentiality of personal information is protected and maintained.
                    </p>
                    <p>
                      ACCQRATE reserves the right to make changes to this privacy policy document from time to
                      time in the future, or to reflect changing business practices. It is the responsibility
                      of Individuals to regularly check this document for such changes.
                    </p>
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
