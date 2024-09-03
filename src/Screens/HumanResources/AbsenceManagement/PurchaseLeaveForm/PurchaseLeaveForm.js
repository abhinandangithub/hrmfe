import { Col, message, Row } from 'antd'
// import { isEmpty } from 'lodash'
import html2canvas from 'html2canvas'
import { PDFDocument } from 'pdf-lib'
import { useEffect, useState } from 'react'
// import { useTranslation, withTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import FooterActions from '../../../../Components/FooterActions'
import apiClient from '../../../../Util/apiClient'
import '../AnnualLeaveCashOut/Leaveform.css'

const PurchaseLeave = (props) => {
  // const { t } = useTranslation()
  const { id } = useParams()

  const [loaderText, setLoaderText] = useState(id ? 'Loading..' : false)
  const [currentEmployee, setCurrentEmployee] = useState(null)
  const [restrictPage, setRestrictPage] = useState(true)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const [formData, setFormData] = useState({
    associateFirstName: '',
    assosiateLastName: '',
    cashoutAmount: '',
    week: '',
    employeeSignDate: '',
    ManagerName: '',
    ManagerSign: '',
    ManagerSignDate: '',
    startDate: '',
    endDate: ''
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(isSubmitted)
    const employeeName = currentEmployee.name
    const employeeSign = currentEmployee.name
    const formDataFinal = { ...formData, employeeName, employeeSign }
    console.log(formDataFinal)
    const input = document.getElementById('purchaseForm')
    const canvas = await html2canvas(input)
    const imgData = canvas.toDataURL('image/png')

    const pdfDoc = await PDFDocument.create()
    const signImage = await pdfDoc.embedPng(imgData)
    const page = pdfDoc.addPage([850, 900])
    page.drawImage(signImage, {})
    const pdfDataUri = await pdfDoc.saveAsBase64({ dataUri: true })

    apiClient
      .post('documents/addworkflow', { reason: pdfDataUri, title: 'Purchase Leave Form' })
      .then(({ data }) => {
        console.log('data', data)
        setIsSubmitted(false)
        message.success('Purshase form submitted successfully')
      })
  }

  useEffect(() => {
    const roleData = props.userInfo?.roleData
    const roleBase = ['Employee', 'Manager']
    const findRole = roleBase.includes(roleData?.name)

    setRestrictPage(!findRole)
    setCurrentEmployee(props.userInfo)

    if (id) {
      checkEmployee(id)
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

  console.log(restrictPage)
  console.log(currentEmployee)

  return (
    <Row justify="center" className="inner-contents individual-employee-details">
      <Col xs={{ span: 23 }} sm={{ span: 23 }} md={{ span: 22 }} lg={{ span: 22 }}>
        {/* <Row>
          <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 18 }} lg={{ span: 20 }}>
            <h2 className="panel-title">
              {t('Purchase Leave Form')} */}
        {/* <span style={{ color: '#000' }}>
                {!isEmpty(currentEmployee)
                  ? `(${currentEmployee?.employeeNo} - ${currentEmployee?.name})`
                  : null}
              </span> */}
        {/* </h2>
          </Col>
        </Row> */}
        {loaderText ? (
          <p>{loaderText}</p>
        ) : (
          <div className="form-wrapper w-75 mx-auto bg-white p-5" style={{ maxWidth: '750px' }}>
            <form className="forms-leave p-5" id="purchaseForm">
              <h1 className="mb-3 pur-leave">Purchase Leave Form</h1>
              <h5 className="mb-3 pur-leave">Associate’s Details</h5>
              <div className="d-flex mb-3">
                <span className="text-no-wrap mr-3">Full Name</span>
                <input
                  type="text"
                  placeholder="firstname"
                  className="form-control leave-form mr-3"
                  id="associateFirstName"
                  name="associateFirstName"
                  onChange={handleChange}
                />
                <input
                  type="text"
                  placeholder="lastname"
                  className="form-control leave-form"
                  id="associateLastName"
                  name="associateLastName"
                  onChange={handleChange}
                />
              </div>
              <div className="purchase-details">
                <h5 className="mb-3 pur-leave">Purchase Leave Details</h5>
                <ul>
                  <li>
                    Purchased leave requests and approvals must be completed by 31st January (for leave taken
                    within the year of purchase).
                  </li>
                  <li>
                    Associates may purchase up to 4 weeks’ additional leave (in multiples of full weeks).
                  </li>
                  <li>
                    Purchased leave is to be taken within the year of purchase which has been pre- agreed in
                    writing between the Associate and their manager.
                  </li>
                  <li>Purchased leave must be entered in euHReka.</li>
                </ul>
                <div className="d-flex">
                  <span>I wish to apply purchase leave for:</span>
                  <div className="datepicker ml-auto mb-2 d-flex">
                    <input
                      className="leave-form-purchase"
                      type="date"
                      name="startDate"
                      placeholder="DD/MM/YYYY"
                      onChange={handleChange}
                      // {...register('employeeRepSignDate', { required: true })}
                    />
                    <input
                      className="leave-form-purchase"
                      type="date"
                      name="endDate"
                      placeholder="DD/MM/YYYY"
                      onChange={handleChange}
                      // {...register('employeeRepSignDate', { required: true })}
                    />
                  </div>
                </div>
              </div>
              <div className="checklist mb-2">
                <div className="radio">
                  <label>
                    <input
                      type="radio"
                      name="week"
                      value="1 week (pre-tax salary deduction of 2.1% per month
                    over 11 months)"
                      onChange={handleChange}
                    />{' '}
                    1 week (pre-tax salary deduction of 2.1% per month over 11 months)
                  </label>
                </div>
                <div className="radio">
                  <label>
                    <input
                      type="radio"
                      name="week"
                      value="2 weeks (pre-tax salary deduction of 4.2% per month
                    over 11 months)"
                      onChange={handleChange}
                    />{' '}
                    2 weeks (pre-tax salary deduction of 4.2% per month over 11 months)
                  </label>
                </div>
                <div className="radio">
                  <label>
                    <input
                      type="radio"
                      name="week"
                      value="3 weeks (pre-tax salary deduction of 6.3% per month
                    over 11 months)"
                      onChange={handleChange}
                    />{' '}
                    3 weeks (pre-tax salary deduction of 6.3% per month over 11 months)
                  </label>
                </div>
                <div className="radio">
                  <label>
                    <input
                      type="radio"
                      name="week"
                      value="4 weeks (pre-tax salary deduction of 8.4% per month
                    over 11 months)"
                      onChange={handleChange}
                    />{' '}
                    4 weeks (pre-tax salary deduction of 8.4% per month over 11 months)
                  </label>
                </div>
              </div>
              <div>
                <p>
                  <i>
                    Note: Purchased leave will be reflected as a negative allowance on your pay slip rather
                    than as a reduced salary amount. Therefore, the reduction will not affect your other
                    benefits or incentives.
                  </i>
                </p>
              </div>
              <h5 className="mb-3 pur-leave">Acknowledgement & Authorisation</h5>
              <div className="mb-2">
                <label className="checkbox-inline">
                  <input type="checkbox" name="purchaseCondition" onChange={handleChange} />I have read and
                  understood the purchase leave conditions as outlined in the Leave Policy.
                </label>
              </div>
              <div>
                <div className="mb-3 d-flex justify-content-between align-items-center">
                  <span>Employee</span>
                  <input
                    type="text"
                    placeholder="Employee name"
                    className="form-control leave-form-purchase mr-3"
                    id="employeeName"
                    name="employeeName"
                    value={currentEmployee?.name ? currentEmployee?.name : ''}
                    disabled
                    style={{ width: '150px' }}
                  />
                  <input
                    type="text"
                    placeholder="Employee Signature"
                    className="form-control leave-form-purchase"
                    name="employeeSign"
                    value={currentEmployee?.name ? currentEmployee?.name : ''}
                    disabled
                    style={{ width: '150px' }}
                  />
                  <input
                    className="form-control leave-form-purchase"
                    type="date"
                    id="employeeSignDate"
                    name="employeeSignDate"
                    placeholder="DD/MM/YYYY"
                    onChange={handleChange}
                    style={{ width: '150px' }}
                  />
                </div>
                <div className="d-flex justify-content-between align-item-center">
                  <span className="text-nowrap">Manager Approval</span>
                  <input
                    type="text"
                    placeholder="Manager name"
                    className="form-control leave-form-purchase mr-3"
                    id="managerName"
                    name="managerName"
                    onChange={handleChange}
                    style={{ width: '150px' }}
                  />
                  <input
                    type="text"
                    placeholder="Manager Signature"
                    className="form-control leave-form-purchase"
                    name="managerSign"
                    onChange={handleChange}
                    style={{ width: '150px !important' }}
                  />
                  <input
                    className="form-control leave-form-purchase"
                    type="date"
                    id="managerSignDate"
                    placeholder="DD/MM/YYYY"
                    name="managerSignDate"
                    onChange={handleChange}
                    style={{ width: '150px !important' }}
                  />
                </div>
              </div>
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
export default PurchaseLeave
// export default withTranslation()(PurchaseLeave)
