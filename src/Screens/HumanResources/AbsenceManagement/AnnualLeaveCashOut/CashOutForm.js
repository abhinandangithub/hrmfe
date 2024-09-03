import { Col, message, Row } from 'antd'
// import { isEmpty } from 'lodash'
// import { useTranslation, withTranslation } from 'react-i18next'
import html2canvas from 'html2canvas'
import { PDFDocument } from 'pdf-lib'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import FooterActions from '../../../../Components/FooterActions'
import apiClient from '../../../../Util/apiClient'
import './Leaveform.css'

const CashOutLeave = (props) => {
  // const { t } = useTranslation()
  const { id } = useParams()

  const [loaderText, setLoaderText] = useState(id ? 'Loading..' : false)
  const [currentEmployee, setCurrentEmployee] = useState(null)
  const [restrictPage, setRestrictPage] = useState(true)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const [formData, setFormData] = useState({
    cashoutWeeksNo: '',
    leaveInHours: '',
    cashoutAmount: '',
    paymentDate: '',
    employeeSignDate: '',
    employerRepName: '',
    employerRepSign: '',
    employerRepSignDate: ''
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitted(true)
    console.log('enter this linse', formData)
    const employeeName = currentEmployee.name
    const formDataFinal = { ...formData, employeeName }
    console.log(formDataFinal)

    const input = document.getElementById('cashoutForm')
    const canvas = await html2canvas(input)
    const imgData = canvas.toDataURL('image/png')

    const pdfDoc = await PDFDocument.create()
    const signImage = await pdfDoc.embedPng(imgData)
    const page = pdfDoc.addPage([850, 1200])
    page.drawImage(signImage, {})
    const pdfDataUri = await pdfDoc.saveAsBase64({ dataUri: true })

    apiClient
      .post('documents/addworkflow', { reason: pdfDataUri, title: 'Cashout Form' })
      .then(({ data }) => {
        console.log('data', data)
        setIsSubmitted(false)
        message.success('cashout form submitted successfully')
      })
  }

  useEffect(() => {
    const roleData = props.userInfo?.roleData
    const roleBase = ['Employee', 'Manager']
    const findRole = roleBase.includes(roleData?.name)

    setRestrictPage(!findRole)

    setCurrentEmployee(props.userInfo)
    console.log('currrr', currentEmployee)

    if (id) {
      checkEmployee(props.userInfo?.id)
    }
  }, [id, props.userInfo])

  const checkEmployee = (employeeId) => {
    apiClient.get(`employees/get/${employeeId}`).then(({ data }) => {
      if (data && data.result) {
        setLoaderText(false)
        setCurrentEmployee(data.result)
      } else {
        setLoaderText('Invalid')
      }
    })
  }
  // const onSave = () => {
  //   handleSubmit()
  // }
  console.log(restrictPage)
  console.log(currentEmployee)

  return (
    <Row justify="center" className="inner-contents individual-employee-details">
      <Col xs={{ span: 23 }} sm={{ span: 23 }} md={{ span: 22 }} lg={{ span: 22 }}>
        {/* <Row>
          <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 18 }} lg={{ span: 20 }}>
            <h2 className="panel-title">
              {t('Cash Out Annual Leave')}
              {/* <span style={{ color: '#000' }}>
                {!isEmpty(currentEmployee)
                  ? `(${currentEmployee?.employeeNo} - ${currentEmployee?.name})`
                  : null}
              </span> */}
        {/* </h2>
          </Col>
        </Row>  */}
        {loaderText ? (
          <p>{loaderText}</p>
        ) : (
          <div className="form-wrapper mx-auto bg-white p-5" style={{ maxWidth: '750px' }}>
            <form
              // onSubmit={handleSubmit(onSubmit)}
              className="forms-leave p-3"
              id="cashoutForm">
              <div style={{ paddingLeft: '15px' }}>
                <h1 className="text-center mb-4">Application to Cash Out Annual Leave</h1>
                <div className="emp-details mb-5 text-color">
                  <Row style={{ width: '100%' }} className="bor border-bottom-0">
                    <Col xs={{ span: 12 }} sm={{ span: 12 }} md={{ span: 12 }} lg={{ span: 12 }}>
                      <Row>
                        <Col
                          xs={{ span: 12 }}
                          sm={{ span: 12 }}
                          md={{ span: 12 }}
                          lg={{ span: 12 }}
                          style={{ backgroundColor: 'lightgrey' }}>
                          <span className="px-3">Employee Name</span>
                        </Col>
                        <Col xs={{ span: 12 }} sm={{ span: 12 }} md={{ span: 12 }} lg={{ span: 12 }}>
                          <span className="px-3">{currentEmployee?.name ? currentEmployee?.name : '-'} </span>
                        </Col>
                      </Row>
                    </Col>
                    <Col xs={{ span: 12 }} sm={{ span: 12 }} md={{ span: 12 }} lg={{ span: 12 }}>
                      <Row>
                        <Col
                          xs={{ span: 12 }}
                          sm={{ span: 12 }}
                          md={{ span: 12 }}
                          lg={{ span: 12 }}
                          style={{ backgroundColor: 'lightgrey' }}>
                          <span className="px-3">Employee Number</span>
                        </Col>
                        <Col xs={{ span: 12 }} sm={{ span: 12 }} md={{ span: 12 }} lg={{ span: 12 }}>
                          <span className="px-3">
                            {currentEmployee?.userData?.employeeNo
                              ? currentEmployee?.userData?.employeeNo
                              : '-'}
                          </span>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                  <Row style={{ width: '100%' }} className="bor">
                    <Col xs={{ span: 12 }} sm={{ span: 12 }} md={{ span: 12 }} lg={{ span: 12 }}>
                      <Row>
                        <Col
                          xs={{ span: 12 }}
                          sm={{ span: 12 }}
                          md={{ span: 12 }}
                          lg={{ span: 12 }}
                          style={{ backgroundColor: 'lightgrey' }}>
                          <span className="px-3">Department</span>
                        </Col>
                        <Col xs={{ span: 12 }} sm={{ span: 12 }} md={{ span: 12 }} lg={{ span: 12 }}>
                          <span className="px-3"> - </span>
                        </Col>
                      </Row>
                    </Col>
                    <Col xs={{ span: 12 }} sm={{ span: 12 }} md={{ span: 12 }} lg={{ span: 12 }}>
                      <Row>
                        <Col
                          xs={{ span: 12 }}
                          sm={{ span: 12 }}
                          md={{ span: 12 }}
                          lg={{ span: 12 }}
                          style={{ backgroundColor: 'lightgrey' }}>
                          <span className="px-3">Cost Center</span>
                        </Col>
                        <Col xs={{ span: 12 }} sm={{ span: 12 }} md={{ span: 12 }} lg={{ span: 12 }}>
                          <span className="px-3"> - </span>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </div>

                <div className="entitle mb-3">
                  <div className="block-head px-3">Entilement</div>
                  <p>
                    Cashing out can occur up to a maximum of 2 weeks, if you have in excess of 4 weeks
                    accrued. However, you must retain an annual leave balance of at least 4 weeks.
                  </p>
                </div>
                <div className="entitle mb-3">
                  <div className="block-head px-3 mb-3 mx-auto">
                    <span>Agreement</span>
                  </div>
                  <p>
                    <b>
                      Cashing out of annual leave can only occur once in any 12 month period. Payment will be
                      made via a regular pay period. Please submit signed/e-signed form to Payroll for
                      processing.
                    </b>
                  </p>
                  <p>
                    I
                    <input
                      type="text"
                      className="form-control leave-form"
                      name="employeeName"
                      placeholder="Employee Name"
                      value={currentEmployee?.name ? currentEmployee?.name : ''}
                      onChange={handleChange}
                      disabled
                      // {...register('employeeName', { required: true })}
                    />
                    (employee name) and Company Pty Limited agree that I may cash out (be paid for){' '}
                    <input
                      type="number"
                      className="form-control leave-form"
                      id="cashoutweeksNo"
                      name="cashoutweeksNo"
                      placeholder="Number of Weeks"
                      onChange={handleChange}
                      disabled={isSubmitted}
                      // {...register('cashOutweeks', { required: true })}
                    />
                    week/s of my current annual leave entitlement. In entering this agreement the employee
                    acknowledges that:
                  </p>
                  <ul>
                    <li>
                      In electing to cash out a portion of my annual leave, I understand that I am unable to
                      take that amount of annual leave as leave;
                    </li>
                    <li>
                      I must keep at least the minimum applicable annual leave balance (or the equivalent
                      proportionate entitlement for part-time employees) to be taken as leave;
                    </li>
                    <li>
                      My employer will deduct the amount of annual leave I have cashed out from my accumulated
                      annual leave balance.
                    </li>
                  </ul>

                  <p>
                    Name of Employee:{' '}
                    <input
                      type="text"
                      className="form-control leave-form"
                      name="employeeName"
                      placeholder="Employee Name"
                      value={currentEmployee?.name ? currentEmployee?.name : ''}
                      disabled
                      // {...register('employeeName', { required: true })}
                    />
                  </p>
                  <p>Name of Employer: Company Pty Ltd</p>
                  <p>
                    <b>
                      The employer and employee agree to the employee cashing out a particular amount of the
                      employee’s accrued paid annual leave:
                    </b>
                  </p>
                  <p>
                    The amount of leave to be cashed out is:
                    <input
                      className="form-control leave-form"
                      type="number"
                      name="leaveInHours"
                      placeholder="hours/days"
                      onChange={handleChange}
                      disabled={isSubmitted}
                      // {...register('leaveWeeks', { required: true })}
                    />
                    hours/days
                  </p>
                  <p>
                    The payment to be made to the employee for the leave is: $
                    <input
                      className="form-control leave-form"
                      type="number"
                      id="cashoutAmount"
                      name="cashoutAmount"
                      placeholder="Amount"
                      onChange={handleChange}
                      disabled={isSubmitted}
                      // {...register('cashOutAmount', { required: true })}
                    />
                    subject to deduction of income tax/after deduction of income tax. The payment will be made
                    to the employee on:{' '}
                    <input
                      className="form-control leave-form"
                      type="date"
                      id="paymentDate"
                      name="paymentDate"
                      placeholder="DD/MM/YYYY"
                      onChange={handleChange}
                      disabled={isSubmitted}
                      // {...register('dateOfPayment', { required: true })}
                    />
                  </p>
                  <p>
                    Signature of Employee:{' '}
                    <input
                      className="form-control leave-form"
                      type="text"
                      name="employeeSignature"
                      placeholder="Signature"
                      value={currentEmployee?.name ? currentEmployee?.name : ''}
                      disabled
                    />
                  </p>
                  <p>
                    Date signed:{' '}
                    <input
                      className="form-control leave-form"
                      type="date"
                      id="employeeSignDate"
                      name="employeeSignDate"
                      placeholder="DD/MM/YYYY"
                      onChange={handleChange}
                      disabled={isSubmitted}
                      // {...register('employeeSignDate', { required: true })}
                    />
                  </p>
                  <p>
                    Name of Employer Representative:{' '}
                    <input
                      className="form-control leave-form"
                      type="text"
                      id="employerRepName"
                      name="employerRepName"
                      placeholder="Employer Rep Name"
                      onChange={handleChange}
                      disabled={isSubmitted}
                      // {...register('employerRepName', { required: true })}
                    />
                  </p>
                  <p>
                    Signature of Employer Representative:{' '}
                    <input
                      className="form-control leave-form"
                      type="text"
                      name="employerRepSign"
                      placeholder="Signature"
                      onChange={handleChange}
                      disabled={isSubmitted}
                    />
                  </p>
                  <p>
                    Date signed:{' '}
                    <input
                      className="leave-form"
                      type="date"
                      id="employerRepSignDate"
                      name="employerRepSignDate"
                      placeholder="DD/MM/YYYY"
                      onChange={handleChange}
                      disabled={isSubmitted}
                      // {...register('employeeRepSignDate', { required: true })}
                    />
                  </p>
                </div>
              </div>

              {/* <div className="text-center mt-5">
                <input type="submit" onClick={handleSubmit} className="btn mt-3" />
              </div> */}
            </form>
          </div>
        )}
        <FooterActions
          centerActions={[
            {
              prefix: 'flaticon-play',
              label: 'Submit',
              onClick: handleSubmit
            }
          ]}
        />
      </Col>
    </Row>
  )
}

// export default withTranslation()(CashOutLeave)
export default CashOutLeave
