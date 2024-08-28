import { Col, Row } from 'antd'
import React from 'react'
import './TermsandConditions.scss'

export default class TermsandConditions extends React.PureComponent {
  render() {
    return (
      <>
        {/* Breadcrum starts */}
        <section className="breadcrum-title only-heading">
          <div className="container-fluid">
            <Row justify="center">
              <Col span={21}>
                <Row justify="left">
                  <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 24 }}>
                    <div className="breadcrum-content">
                      <h1>Terms and Conditions</h1>
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
                    <h1>SOFTWARE AS A SERVICE AGREEMENT</h1>
                    <h3>1. DEFINITIONS</h3>
                    <p>
                      <strong>&ldquo;Administrator User&rdquo;</strong> means each Customer employee
                      designated by Customer to serve as technical administrator of the SaaS Services on
                      Customer&rsquo;s behalf. Each Administrator User must complete training and
                      qualification requirements reasonably required by Accqrate.
                    </p>
                    <p>
                      <strong>&ldquo;Customer Content&rdquo;</strong> means all data and materials provided by
                      Customer to Accqrate for use in connection with the SaaS Services, including, without
                      limitation, customer applications, data files, and graphics.
                    </p>
                    <p>
                      <strong>&ldquo;Documentation&rdquo;</strong> means the user guides, online help, release
                      notes, training materials and other documentation provided or made available by Accqrate
                      to Customer regarding the use or operation of the SaaS Services.
                    </p>
                    <p>
                      <strong>&ldquo;Host&rdquo;</strong> means the computer equipment on which the Software
                      is installed, which is owned and operated by Accqrate or its subcontractors.
                    </p>
                    <p>
                      <strong>&nbsp;&ldquo;Maintenance Services&rdquo;</strong> means the support and
                      maintenance services provided by Accqrate to Customer pursuant to this SaaS Agreement
                      and Exhibit B.
                    </p>
                    <p>
                      <strong>&ldquo;Other Services&rdquo;</strong> means all technical and non-technical
                      services performed or delivered by Accqrate under this SaaS Agreement, including,
                      without limitation, implementation services and other professional services, training
                      and education services but excluding the SaaS Services and the Maintenance Services.
                      Other Services will be provided on a time and material basis at such times or during
                      such periods, as may be specified in a Schedule and mutually agreed to by the parties.
                      All Other Services will be provided on a non-work for hire basis.
                    </p>
                    <p>
                      <strong>&ldquo;Schedule&rdquo;</strong> is a written document attached to this SaaS
                      Agreement under Exhibit A or executed separately by Accqrate and Customer for the
                      purpose of purchasing SaaS Services under the terms and conditions of this SaaS
                      Agreement
                    </p>
                    <p>
                      <strong>&ldquo;Software&rdquo;</strong> means the object code version of any software to
                      which Customer is provided access as part of the Service, including any updates or new
                      versions.
                    </p>
                    <p>
                      <strong>&ldquo;SaaS Services&rdquo;</strong> refer to the specific Accqrate&rsquo;s
                      internet-accessible service identified in a Schedule that provides use of
                      Accqrate&rsquo;s identity/access management Software that is hosted by Accqrate or its
                      services provider and made available to Customer over a network on a term-use basis.
                    </p>
                    <p>
                      <strong>&ldquo;Subscription Term&rdquo;</strong> shall mean that period specified in a
                      Schedule during which Customer will have on-line access and use of the Software through
                      Accqrate&rsquo;s SaaS Services. The Subscription Term shall renew every month unless
                      either party delivers written notice of non-renewal to the other party at least 21 days
                      prior to the expiration of the then-current Subscription Term.
                    </p>
                    <h3>2. SAAS SERVICES</h3>
                    <p>
                      During the Subscription Term, Customer will receive a nonexclusive, non-assignable,
                      royalty free, worldwide right to access and use the SaaS Services solely for your
                      internal business operations subject to the terms of this Agreement.
                    </p>
                    <h3>3. RESTRICTIONS</h3>
                    <p>Customer shall not, and shall not permit anyone to:</p>
                    <ul>
                      <li>copy or republish the SaaS Services or Software,</li>
                      <li>make the SaaS Services available to any person other than authorized users</li>
                      <li>
                        use or access the SaaS Services to provide service bureau, time-sharing or other
                        computer hosting services to third parties
                      </li>
                      <li>modify or create derivative works based upon the SaaS Services or Documentation</li>
                      <li>
                        remove, modify or obscure any copyright, trademark or other proprietary notices
                        contained in the software used to provide the SaaS Services or in the Documentation
                      </li>
                      <li>
                        reverse engineer, decompile, disassemble, or otherwise attempt to derive the source
                        code of the Software used to provide the SaaS Services, except and only to the extent
                        such activity is expressly permitted by applicable law
                      </li>
                      <li>
                        access the SaaS Services or use the Documentation in order to build a similar product
                        or competitive product. Subject to the limited licenses granted herein, Accqrate shall
                        own all right, title and interest in and to the Software, services, Documentation, and
                        other deliverables provided under this SaaS Agreement, including all modifications,
                        improvements, upgrades, derivative works and feedback related thereto and intellectual
                        property rights therein. Customer agrees to assign all right, title and interest it
                        may have in the foregoing to Accqrate.
                      </li>
                    </ul>
                    <h3>4. PARTNERS&rsquo; RESPONSIBILITIES </h3>
                    <p>
                      4.1. <strong>Assistance</strong>. Customer shall provide commercially reasonable
                      information and assistance to Accqrate to enable Accqrate to deliver the SaaS Services.
                      Upon request from Accqrate, Customer shall promptly deliver Customer Content to Accqrate
                      in an electronic file format specified and accessible by Accqrate. Customer acknowledges
                      that Accqrate&rsquo;s ability to deliver the SaaS Services in the manner provided in
                      this SaaS Agreement may depend upon the accuracy and timeliness of such information and
                      assistance. Accqrate will ensure that the product is upgraded regularly and address the
                      security concerns. Also follows the standard norms for the transactions and customise it
                      to local laws.
                    </p>
                    <p>
                      4.2. <strong>Compliance with Laws. </strong>Customer shall comply with all applicable
                      local, state, national and foreign laws in connection with its use of the SaaS Services,
                      including those laws related to data privacy, international communications, and the
                      transmission of technical or personal data. Customer acknowledges that Accqrate
                      exercises no control over the content of the information transmitted by Customer or the
                      users through the SaaS Services. Customer shall not upload, post, reproduce or
                      distribute any information, software or other material protected by copyright, privacy
                      rights, or any other intellectual property right without first obtaining the permission
                      of the owner of such rights.
                    </p>
                    <p>
                      4.3. <strong>Unauthorized Use; False Information</strong>. Customer shall: (a) notify
                      Accqrate immediately of any unauthorized use of any password or user id or any other
                      known or suspected breach of security, (b) report to Accqrate immediately and use
                      reasonable efforts to stop any unauthorized use of the SaaS Services that is known or
                      suspected by Customer or any Identity Cube user, and (c) not provide false identity
                      information to gain access to or use the SaaS Services.
                    </p>
                    <p>
                      4.4. <strong>Administrator Access </strong>Customer shall be solely responsible for the
                      acts and omissions of its Administrator Users. Accqrate shall not be liable for any loss
                      of data or functionality caused directly or indirectly by the Administrator Users.
                    </p>
                    <p>
                      4.5.&nbsp;<strong>Customer Input. </strong>Customer is solely responsible for
                      collecting, inputting and updating all Customer Content stored on the Host, and for
                      ensuring that the Customer Content does not (i) include anything that actually or
                      potentially infringes or misappropriates the copyright, trade secret, trademark or other
                      intellectual property right of any third party, or (ii) contain anything that is
                      obscene, defamatory, harassing, offensive or malicious. Customer shall: (i) notify
                      Accqrate immediately of any unauthorized use of any password or user id or any other
                      known or suspected breach of security, (ii) report to Accqrate immediately and use
                      reasonable efforts to stop any unauthorized use of the Service that is known or
                      suspected by Customer or any user, and (iii) not provide false identity information to
                      gain access to or use the Service.
                    </p>
                    <p>
                      4.6. <strong>&nbsp;Licence from Customer. </strong>Subject to the terms and conditions
                      of this SaaS Agreement, Customer shall grant to Accqrate a limited, non-exclusive and
                      non-transferable license, to copy, store, configure, perform, display and transmit
                      Customer Content solely as necessary to provide the SaaS Services to Customer.
                    </p>
                    <h3>5. ORDERS AND PAYMENT </h3>
                    <p>
                      5.1. <strong>Orders</strong>. Customer shall order SaaS Services pursuant to a Schedule.
                      All services acquired by Customer shall be governed exclusively by this SaaS Agreement
                      and the applicable Schedule. In the event of a conflict between the terms of a Schedule
                      and this SaaS Agreement, the terms of the Schedule shall take precedence.
                    </p>
                    <p>
                      5.2. &nbsp;<strong>Invoicing and Payment.</strong> Unless otherwise provided in the
                      Schedule, Accqrate shall invoice Customer for all fees on the Schedule effective date.
                      Customer shall pay all undisputed invoices within 7 days after Customer receives the
                      invoice. Except as expressly provided otherwise, fees are non-refundable. All fees are
                      stated in Saudi Riyals, and must be paid by Customer to Accqrate in Saudi Riyals
                    </p>
                    <p>
                      5.3. <strong>Expenses</strong>. Customer will reimburse Accqrate for its reasonable,
                      out-of-pocket travel and related expenses incurred in performing the Other Services.
                      Accqrate shall notify Customer prior to incurring any such expense. Accqrate shall
                      comply with Customer&rsquo;s travel and expense policy if made available to Accqrate
                      prior to the required travel.
                    </p>
                    <p>
                      5.4. <strong>Taxes</strong>. Accqrate shall bill Customer for applicable taxes as a
                      separate line item on each invoice. Customer shall be responsible for payment of all
                      sales and use taxes, value added taxes (VAT), or similar charges relating to
                      Customer&rsquo;s purchase and use of the services. Customer shall not be liable for
                      taxes based on Accqrate&rsquo;s net income, capital or corporate franchise.
                    </p>
                    <h3>6. TERM AND TERMINATION </h3>
                    <p>
                      6.1. <strong>Term of SaaS Agreement</strong>. The term of this SaaS Agreement shall
                      begin on the Effective Date and shall continue until terminated by either party as
                      outlined in this Section.
                    </p>
                    <p>
                      6.2. &nbsp;<strong>Termination</strong>. Either party may terminate this SaaS Agreement
                      immediately upon a material breach by the other party that has not been cured within
                      thirty (30) days after receipt of notice of such breach.
                    </p>
                    <p>
                      6.3. &nbsp;<strong>Suspension for Non-Payment</strong>. Accqrate reserves the right to
                      suspend delivery of the SaaS Services if Customer fails to timely pay any undisputed
                      amounts due to Accqrate under this SaaS Agreement, but only after Accqrate notifies
                      Customer of such failure and such failure continues for fifteen (15) days. Suspension of
                      the SaaS Services shall not release Customer of its payment obligations under this SaaS
                      Agreement. Customer agrees that Accqrate shall not be liable to Customer or to any third
                      party for any liabilities, claims or expenses arising from or relating to suspension of
                      the SaaS Services resulting from Customer&rsquo;s nonpayment.
                    </p>
                    <p>
                      6.4. &nbsp;<strong>Suspension for Ongoing Harm</strong>. Accqrate reserves the right to
                      suspend delivery of the SaaS Services if Accqrate reasonably concludes that Customer or
                      user&rsquo;s use of the SaaS Services is causing immediate and ongoing harm to Accqrate
                      or others. In the extraordinary case that Accqrate must suspend delivery of the SaaS
                      Services, Accqrate shall immediately notify Customer of the suspension and the parties
                      shall diligently attempt to resolve the issue. Accqrate shall not be liable to Customer
                      or to any third party for any liabilities, claims or expenses arising from or relating
                      to any suspension of the SaaS Services in accordance with this Section 6.4. Nothing in
                      this Section 6.4 will limit Accqrate&rsquo;s rights under Section 6.5 below
                    </p>
                    <p>&nbsp;</p>
                    <p>
                      6.5. &nbsp;<strong>Effect of Termination.</strong>
                    </p>
                    <p>
                      (a) &nbsp;Upon termination of this SaaS Agreement or expiration of the Subscription
                      Term, Accqrate shall immediately cease providing the SaaS Services and all usage rights
                      granted under this SaaS Agreement shall terminate.
                    </p>
                    <p>
                      (b) &nbsp;If Accqrate terminates this SaaS Agreement due to a breach by Customer, then
                      Customer shall immediately pay to Accqrate all amounts then due under this SaaS
                      Agreement and to become due during the remaining term of this SaaS Agreement, but for
                      such termination.
                    </p>
                    <p>
                      (c) &nbsp;If Customer terminates this SaaS Agreement due to a breach by Accqrate, then
                      Accqrate shall immediately repay to Customer all pre-paid amounts for any unperformed
                      SaaS Services scheduled to be delivered after the termination date.
                    </p>
                    <p>
                      (d) &nbsp;Upon termination of this SaaS Agreement and upon subsequent written request by
                      the disclosing party, the receiving party of tangible Confidential Information shall
                      immediately return such information or destroy such information and provide written
                      certification of such destruction, provided that the receiving party may permit its
                      legal counsel to retain one archival copy of such information in the event of a
                      subsequent dispute between the parties.
                    </p>
                    <h3>7. SERVICE LEVEL AGREEMENT </h3>
                    <p>
                      The Service Level SaaS Agreement (&ldquo;SLA&rdquo;) for the SaaS Services is set forth
                      in Exhibit B hereto. The SLA sets forth Customer&rsquo;s sole remedies for availability
                      or quality of the SaaS Services including any failure to meet any guarantee set forth in
                      the SLA.
                    </p>
                    <h3>8. WARRANTIES </h3>
                    <p>
                      <strong>Warranty</strong>. Accqrate represents and warrants that it will provide the
                      SaaS Services in a professional manner consistent with general industry standards and
                      that the SaaS Services will perform substantially in accordance with the Documentation.
                      For any beach of a warranty, Customer&rsquo;s exclusive remedy shall be as provided in
                      Section 6, Term and Termination.
                    </p>
                    <p>
                      Accqrate warrants that the SaaS services will perform in all material respects in
                      accordance with the documentation. Accqrate does not guarantee that the Saas services
                      will be performed error-free or uninterrupted, or that Accqrate does not control the
                      transfer of data over communications facilities, including the internet, and that the
                      SaaS service may be subject to limitations, delays and other problems inherent in the
                      use of such communications facilities. This section sets forth that sole and exclusive
                      warranty given by Accqrate (express or implied) with respect to the subject matter of
                      this agreement. Neither Accqrate nor any of its licensors or other suppliers warrant or
                      guarantee that the operation of the subscription service will be uninterrupted, virus
                      free or error free, nor shall accqrate or any of its service providers be liable for
                      unauthorised alternation, theft or destruction of customer&rsquo;s or any user&rsquo;s
                      data, files or programs
                    </p>
                    <h3>9. LIMITATIONS OF LIABILITY </h3>
                    <p>
                      Neither party (nor any licensor or other supplier of Accqrate) shall be liable for
                      indirect, incidental, special or consequential damages including, without limitation,
                      damages for lost business profits, data or use of any service incurred by either party
                      or any third party in connection with this SaaS agreement, regardless of the nature of
                      the claim (including negligence), even if foreseeable or the other party has been
                      advised of the possibility of such damages. Neither party&rsquo;s aggregate liability
                      for damages under this SaaS agreement, regardless of the nature of the claim (including
                      negligence), shall exceed the fees paid or payable by customer under this SaaS agreement
                      during the 12 months preceding the date the claim arose. The foregoing limitations shall
                      not apply to the parties&rsquo; obligations (or any breach thereof) under Sections
                      entitled &ldquo;Restriction&rdquo;, &ldquo;Indemnification&rdquo;, or
                      &ldquo;Confidentiality&rdquo;.
                    </p>
                    <h3>10. INDEMNIFICATION </h3>
                    <p>
                      10.1. &nbsp;<strong>Indemnification by Accqrate.</strong> If a third party makes a claim
                      against Customer that the SaaS Services infringes any patent, copyright or trademark, or
                      misappropriates any trade secret, or that Accqrate&rsquo;s negligence or wilful
                      misconduct has caused bodily injury or death, Accqrate shall defend Customer and its
                      directors, officers and employees against the claim at Accqrate&rsquo;s expense and
                      Accqrate shall pay all losses, damages and expenses (including reasonable
                      attorneys&rsquo; fees) finally awarded against such parties or agreed to in a written
                      settlement agreement signed by Accqrate, to the extent arising from the claim. Accqrate
                      shall have no liability for any claim based on (a) the Customer Content, (b)
                      modification of the SaaS Services not authorized by Accqrate, or (c) use of the SaaS
                      Services other than in accordance with the Documentation and this SaaS Agreement.
                      Accqrate may, at its sole option and expense, procure for Customer the right to continue
                      use of the SaaS Services, modify the SaaS Services in a manner that does not materially
                      impair the functionality, or terminate the Subscription Term and repay to Customer any
                      amount paid by Customer with respect to the Subscription Term following the termination
                      date.
                    </p>
                    <p>
                      10.2.&nbsp;<strong>Indemnification by Customer</strong>. If a third party makes a claim
                      against Accqrate that the Customer Content infringes any patent, copyright or trademark,
                      or misappropriates any trade secret, Customer shall defend Accqrate and its directors,
                      officers and employees against the claim at Customer&rsquo;s expense and Customer shall
                      pay all losses, damages and expenses (including reasonable attorneys&rsquo; fees)
                      finally awarded against such parties or agreed to in a written settlement agreement
                      signed by Customer, to the extent arising from the claim.
                    </p>
                    <p>
                      10.3. &nbsp;<strong>Conditions for Indemnification.</strong> A party seeking
                      indemnification under this section shall (a) promptly notify the other party of the
                      claim, (b) give the other party sole control of the defense and settlement of the claim,
                      and (c) provide, at the other party&rsquo;s expense for out-of-pocket expenses, the
                      assistance, information and authority reasonably requested by the other party in the
                      defense and settlement of the claim.
                    </p>
                    <h3>11. CONFIDENTIALITY </h3>
                    <p>
                      11.1. &nbsp;<strong>Definition</strong>.
                      <strong>&ldquo;Confidential Information&rdquo;</strong> means any information disclosed
                      by a party to the other party, directly or indirectly, which, (a) if in written,
                      graphic, machine-readable or other tangible form, is marked as
                      &ldquo;confidential&rdquo; or &ldquo;proprietary,&rdquo; (b) if disclosed orally or by
                      demonstration, is identified at the time of initial disclosure as confidential and is
                      confirmed in writing to the receiving party to be &ldquo;confidential&rdquo; or
                      &ldquo;proprietary&rdquo; within 30 days of such disclosure, (c) is specifically deemed
                      to be confidential by the terms of this SaaS Agreement, or (d) reasonably appears to be
                      confidential or proprietary because of the circumstances of disclosure and the nature of
                      the information itself. Confidential Information will also include information disclosed
                      by third parties to a disclosing party under an obligation of confidentiality. Subject
                      to the display of Customer Content as contemplated by this SaaS Agreement, Customer
                      Content is deemed Confidential Information of Customer. Accqrate software and
                      Documentation are deemed Confidential Information of Accqrate.
                    </p>
                    <p>
                      11.2. <strong>Confidentiality</strong>. During the term of this SaaS Agreement and for 5
                      years thereafter (perpetually in the case of software), each party shall treat as
                      confidential all Confidential Information of the other party, shall not use such
                      Confidential Information except to exercise its rights and perform its obligations under
                      this SaaS Agreement, and shall not disclose such Confidential Information to any third
                      party. Without limiting the foregoing, each party shall use at least the same degree of
                      care, but not less than a reasonable degree of care, it uses to prevent the disclosure
                      of its own confidential information to prevent the disclosure of Confidential
                      Information of the other party. Each party shall promptly notify the other party of any
                      actual or suspected misuse or unauthorized disclosure of the other party&rsquo;s
                      Confidential Information. Neither party shall reverse engineer, disassemble or decompile
                      any prototypes, software or other tangible objects which embody the other party&rsquo;s
                      Confidential Information and which are provided to the party hereunder. Each party may
                      disclose Confidential Information of the other party on a need-to-know basis to its
                      contractors who are subject to confidentiality agreements requiring them to maintain
                      such information in confidence and use it only to facilitate the performance of their
                      services on behalf of the receiving party.
                    </p>
                    <p>
                      11.3. <strong>Exceptions</strong>. Confidential Information excludes information that:
                      (a) is known publicly at the time of the disclosure or becomes known publicly after
                      disclosure through no fault of the receiving party, (b) is known to the receiving party,
                      without restriction, at the time of disclosure or becomes known to the receiving party,
                      without restriction, from a source other than the disclosing party not bound by
                      confidentiality obligations to the disclosing party, or (c) is independently developed
                      by the receiving party without use of the Confidential Information as demonstrated by
                      the written records of the receiving party. The receiving party may disclose
                      Confidential Information of the other party to the extent such disclosure is required by
                      law or order of a court or other governmental authority, provided that the receiving
                      party shall use reasonable efforts to promptly notify the other party prior to such
                      disclosure to enable the disclosing party to seek a protective order or otherwise
                      prevent or restrict such disclosure. Each party may disclose the existence of this SaaS
                      Agreement and the relationship of the parties, but agrees that the specific terms of
                      this SaaS Agreement will be treated as Confidential Information; provided, however, that
                      each party may disclose the terms of this SaaS Agreement to those with a need to know
                      and under a duty of confidentiality such as accountants, lawyers, bankers and investors.
                    </p>
                    <h3>12. GENERAL PROVISIONS</h3>
                    <p>
                      12.1 &nbsp;<strong>Non-Exclusive Service</strong>. Customer acknowledges that SaaS
                      Services is provided on a non-exclusive basis. Nothing shall be deemed to prevent or
                      restrict Accqrate&rsquo;s ability to provide the SaaS Services or other technology,
                      including any features or functionality first developed for Customer, to other parties.
                    </p>
                    <p>
                      12.2. <strong>Personal Data.</strong> Customer hereby acknowledges and agrees that
                      Accqrate&rsquo;s performance of this SaaS Agreement may require Accqrate to process,
                      transmit and/or store Customer personal data or the personal data of Customer employees
                      and Affiliates. By submitting personal data to Accqrate, Customer agrees that Accqrate
                      and its Affiliates may process, transmit and/or store personal data only to the extent
                      necessary for, and for the sole purpose of, enabling Accqrate to perform its obligations
                      to under this SaaS Agreement. In relation to all Personal Data provided by or through
                      Customer to Accqrate, Customer will be responsible as sole Data Controller for complying
                      with all applicable data protection or similar laws such as EU Directive 95/46/EC and
                      laws implementing that Directive that regulate the processing of Personal Data and
                      special categories of data as such terms are defined in that Directive. Customer agrees
                      to obtain all necessary consents and make all necessary disclosures before including
                      Personal Data in Content and using the Enabling Software and Accqrate SaaS. Customer
                      confirms that Customer is solely responsible for any Personal Data that may be contained
                      in Content, including any information which any Accqrate SaaS User shares with third
                      parties on Customer&rsquo;s behalf. Customer is solely responsible for determining the
                      purposes and means of processing Customer Personal Data by Accqrate under this
                      Agreement, including that such processing according to Customer&rsquo;s instructions
                      will not place Accqrate in breach of applicable data protection laws. Prior to
                      processing, Customer will inform Accqrate about any special categories of data contained
                      within Customer Personal Data and any restrictions or special requirements in the
                      processing of such special categories of data, including any cross border transfer
                      restrictions. Customer is responsible for ensuring that the Accqrate SaaS meets such
                      restrictions or special requirements. Accqrate to process any Personal Data that meets
                      the requirements set forth in this Section according to these Terms of Use.
                    </p>
                    <p>
                      12.3.&nbsp;<strong>Accqrate Personal Data Obligations</strong>. In performing the SaaS
                      Services, Accqrate will comply with the Accqrate Services Privacy Policy, which is
                      available at http://www.Accqrate.com/privacy-policy and incorporated herein by
                      reference. The Accqrate Services Privacy Policy is subject to change at Accqrate&rsquo;s
                      discretion; however, Accqrate policy changes will not result in a material reduction in
                      the level of protection provided for Customer data during the period for which fees for
                      the services have been paid. The services policies referenced in this SaaS Agreement
                      specify our respective responsibilities for maintaining the security of Customer data in
                      connection with the SaaS Services. Accqrate reserves the right to provide the SaaS
                      Services from Host locations, and/or through use of subcontractors, worldwide. Customer
                      agrees to provide any notices and obtain any consent related to Accqrate&rsquo;s use of
                      the data for provisioning the SaaS Services, including those related to the collection,
                      use, processing, transfer and disclosure of personal information. Customer shall have
                      sole responsibility for the accuracy, quality, integrity, legality, reliability,
                      appropriateness and retains ownership of all of Customer data.
                    </p>
                    <p>
                      12.4. <strong>Assignment</strong>. Neither party may assign this SaaS Agreement or any
                      right under this SaaS Agreement, without the consent of the other party, which consent
                      shall not be unreasonably withheld or delayed; provided however, that either party may
                      assign this SaaS Agreement to an acquirer of all or substantially all of the business of
                      such party to which this SaaS Agreement relates, whether by merger, asset sale or
                      otherwise. This SaaS Agreement shall be binding upon and inure to the benefit of the
                      parties&rsquo; successors and permitted assigns. Either party may employ subcontractors
                      in performing its duties under this SaaS Agreement, provided, however, that such party
                      shall not be relieved of any obligation under this SaaS Agreement.
                    </p>
                    <p>
                      12.5.&nbsp;<strong>Notices.</strong> Except as otherwise permitted in this SaaS
                      Agreement, notices under this SaaS Agreement shall be in writing and shall be deemed to
                      have been given (a) five (5) business days after mailing if sent by registered or
                      certified U.S. mail, (b) when transmitted if sent by facsimile, provided that a copy of
                      the notice is promptly sent by another means specified in this section, or (c) when
                      delivered if delivered personally or sent by express courier service. All notices shall
                      be sent to the other party at the address set forth on the cover page of this SaaS
                      Agreement.
                    </p>
                    <p>
                      12.6. <strong>Force Majeure</strong>. Each party will be excused from performance for
                      any period during which, and to the extent that, such party or any subcontractor is
                      prevented from performing any obligation or Service, in whole or in part, as a result of
                      causes beyond its reasonable control, and without its fault or negligence, including
                      without limitation, acts of God, strikes, lockouts, riots, acts of terrorism or war,
                      epidemics, communication line failures, and power failures.
                    </p>
                    <p>
                      12.7. &nbsp;<strong>Waiver</strong>. No waiver shall be effective unless it is in
                      writing and signed by the waiving party. The waiver by either party of any breach of
                      this SaaS Agreement shall not constitute a waiver of any other or subsequent breach.
                    </p>
                    <p>
                      12.8. &nbsp;<strong>Severability</strong>. If any term of this SaaS Agreement is held to
                      be invalid or unenforceable, that term shall be reformed to achieve as nearly as
                      possible the same effect as the original term, and the remainder of this SaaS Agreement
                      shall remain in full force.
                    </p>
                    <p>
                      12.9. &nbsp;<strong>Entire SaaS Agreement</strong>. This SaaS Agreement (including all
                      Schedules and exhibits) contains the entire agreement of the parties and supersedes all
                      previous oral and written communications by the parties, concerning the subject matter
                      of this SaaS Agreement. This SaaS Agreement may be amended solely in a writing signed by
                      both parties. Standard or printed terms contained in any purchase order or sales
                      confirmation are deemed rejected and shall be void unless specifically accepted in
                      writing by the party against whom their enforcement is sought; mere commencement of work
                      or payment against such forms shall not be deemed acceptance of the terms.
                    </p>
                    <p>
                      12.10.&nbsp;<strong>Survival</strong>. Sections 3, 6, and 8 through 12 of this SaaS
                      Agreement shall survive the expiration or termination of this SaaS Agreement for any
                      reason.
                    </p>
                    <p>
                      12.11.&nbsp;<strong>Publicity</strong>. Accqrate may include Customer&rsquo;s name and
                      logo in its customer lists and on its website. Upon signing, Accqrate may issue a
                      high-level press release announcing the relationship and the manner in which Customer
                      will use the Accqrate solution. Accqrate shall coordinate its efforts with appropriate
                      communications personnel in Customer&rsquo;s organization to secure approval of the
                      press release if necessary.
                    </p>
                    <p>
                      12.12. &nbsp;<strong>Export Regulations</strong>. Export laws and regulations of the
                      Saudi Arabia and any other relevant local export laws and regulations apply to the SaaS
                      Services. Customer agrees that such export control laws govern its use of the SaaS
                      Services (including technical data) and any services deliverables provided under this
                      Agreement, and Customer agrees to comply with all such export laws and regulations.
                      Customer agrees that no data, information, software programs and/or materials resulting
                      from services (or direct product thereof) will be exported, directly or indirectly, in
                      violation of these laws.
                    </p>
                    <p>
                      12.13<strong>.&nbsp; No Third Party Beneficiaries</strong>. This SaaS Agreement is an
                      agreement between the parties, and confers no rights upon either party&rsquo;s
                      employees, agents, contractors, partners of customers or upon any other person or
                      entity.
                    </p>
                    <p>
                      12.14 &nbsp;<strong>Independent Contractor</strong>. The parties have the status of
                      independent contractors, and nothing in this SaaS Agreement nor the conduct of the
                      parties will be deemed to place the parties in any other relationship. Except as
                      provided in this SaaS Agreement, neither party shall be responsible for the acts or
                      omissions of the other party or the other party&rsquo;s personnel.
                    </p>
                    <p>
                      12.15. &nbsp;<strong>Statistical Information</strong>. Accqrate may anonymously compile
                      statistical information related to the performance of the Services for purposes of
                      improving the SaaS service, provided that such information does not identify
                      Customer&rsquo;s data or include Customer&rsquo;s name.
                    </p>
                    <p>
                      12.16. <strong>Governing Law</strong>. This SaaS Agreement shall be governed by the laws
                      of Saudi Arabia, excluding its conflict of law principles. The United Nations Convention
                      on Contracts for the International Sale of Goods shall not apply.
                    </p>
                    <p>
                      12.17. <strong>Compliance with Laws</strong>. Accqrate shall comply with all applicable
                      local, state, national and foreign laws in connection with its delivery of the SaaS
                      Services, including those laws related to data privacy, international communications,
                      and the transmission of technical or personal data
                    </p>
                    <p>
                      12.18.<strong>&nbsp;Dispute Resolution</strong>. Customer&rsquo;s satisfaction is an
                      important objective to Accqrate in performing its obligations under this SaaS Agreement.
                      Except with respect to intellectual property rights, if a dispute arises between the
                      parties relating to the interpretation or performance of this SaaS Agreement or the
                      grounds for the termination hereof, the parties agree to hold a meeting within fifteen
                      (15) days of written request by either party, attended by individuals with
                      decision-making authority, regarding the dispute, to attempt in good faith to negotiate
                      a resolution of the dispute prior to pursuing other available remedies. If, within 15
                      days after such meeting, the parties have not succeeded in resolving the dispute, either
                      party may protect its interests by any lawful means available to it.
                    </p>
                    <p>
                      12.19 &nbsp;<strong>Signatures</strong>. This SaaS Agreement may be executed in multiple
                      counterparts, each of which when executed will be an original, and all of which, when
                      taken together, will constitute one agreement. Delivery of an executed counterpart of a
                      signature page of this SaaS Agreement by facsimile or other electronic transmission
                      (including via pdf) will be effective as delivery of a manually executed counterpart.
                    </p>
                    <h3>13. Support and Maintenance Services </h3>
                    <p>
                      Support and Maintenance Services are included in the SaaS Service subscription in
                      Exhibit A and entitles Customer to the following:
                    </p>
                    <p>
                      (a) &nbsp;Telephone or electronic support in order to help Customer locate and correct
                      problems with the Software.
                    </p>
                    <p>
                      (b) &nbsp;Bug fixes and code corrections to correct Software malfunctions in order to
                      bring such Software into substantial conformity with the operating specifications.
                    </p>
                    <p>
                      (c) &nbsp;All extensions, enhancements and other changes that Accqrate, at its sole
                      discretion, makes or adds to the Software and which Accqrate furnishes, without charge,
                      to all other Subscribers of the SaaS Service. (d) &nbsp;Up to five (5) dedicated
                      contacts designated by Customer in writing that will have access to support services.
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
