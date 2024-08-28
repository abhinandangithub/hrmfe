import { Col, Row } from 'antd'
import { withFormik } from 'formik'
import { isEmpty } from 'lodash'
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { getBankDetailsByEmployeeID } from '../../../Actions/EmployeeActions'
import Attachments from '../../../Components/Attachments'
import FooterActions from '../../../Components/FooterActions'
import { Field, Form } from '../../../Components/Formik'
import Panel from '../../../Layout/Panel'
import PanelLayout from '../../../Layout/PanelLayout'
import { useTranslation } from 'react-i18next'


// TODO: API is incorrect, asked the other developer to give correct APIS
// Have to integrate update functionality
// Completed: Salaray Bank Details view
// Pending: Salaray Bank Details Update, Alternate Bank Details View and Update


const {t} = useTranslation()


const BankDetails = (props) => {
  const {
    currentEmployee,
    bankDetails,
    dispatch,
    values,
    setValues
    // submitForm,
  } = props
  const [editable, setEditable] = useState(false)

  useEffect(() => {
    if (currentEmployee?.id) {
      dispatch(getBankDetailsByEmployeeID(currentEmployee.id))
    }
  }, [currentEmployee?.id])

  const salaryBank = bankDetails?.type === 'Salary Bank' ? bankDetails : {}
  const alternateBank = bankDetails?.type !== 'Salary Bank' ? bankDetails : {}

  const onUploadAttachement = (key, attachments) => {
    setValues({ ...values, attachments: attachments.filter((attachment) => attachment !== '') })
  }

  return (
    <Form>
      {!editable && (
        <div>
          <PanelLayout>
            <Panel title={t('Salary Bank Details')}>
              <div className="panel-with-border">
                <Row justify="left" gutter={(12, 10)}>
                  <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 8 }}>
                    <span>Bank Name</span>
                    <p>{!isEmpty(salaryBank) ? salaryBank.bankName : 'N/A'}</p>
                  </Col>
                  <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 8 }}>
                    <span>A/C Number</span>
                    <p>{!isEmpty(salaryBank) ? salaryBank.accNum : 'N/A'}</p>
                  </Col>
                  <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 8 }}>
                    <span>Branch Name</span>
                    <p>{!isEmpty(salaryBank) ? salaryBank.branchName : 'N/A'}</p>
                  </Col>
                  <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 8 }}>
                    <span>IFSC Code</span>
                    <p>{!isEmpty(salaryBank) ? salaryBank.ifscCode : 'N/A'}</p>
                  </Col>
                  <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 8 }}>
                    <span>Attachments</span>
                    <div className="attachments-preview">
                      <a>
                        {!isEmpty(salaryBank)
                          ? salaryBank.attachments.map((attachment) => attachment.name).join(', ')
                          : 'N/A'}
                      </a>
                    </div>
                  </Col>
                </Row>
              </div>
            </Panel>
          </PanelLayout>
          {/* View Salary Bank Details ends */}
          <PanelLayout className="mb-3">
            <Panel title={t('Alternate Bank Details')}>
              <div className="panel-with-border">
                <Row justify="left" gutter={(12, 10)}>
                  <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 8 }}>
                    <span>Bank Name</span>
                    <p>{!isEmpty(alternateBank) ? alternateBank.bankName : 'N/A'}</p>
                  </Col>
                  <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 8 }}>
                    <span>A/C Number</span>
                    <p>{!isEmpty(alternateBank) ? alternateBank.accNum : 'N/A'}</p>
                  </Col>
                  <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 8 }}>
                    <span>Branch Name</span>
                    <p>{!isEmpty(alternateBank) ? alternateBank.accNum : 'N/A'}</p>
                  </Col>
                  <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 8 }}>
                    <span>IFSC Code</span>
                    <p>{!isEmpty(alternateBank) ? alternateBank.accNum : 'N/A'}</p>
                  </Col>
                  <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 8 }}>
                    <span>Attachments</span>
                    <div className="attachments-preview">
                      <a>
                        {!isEmpty(alternateBank)
                          ? alternateBank.attachments.map((attachment) => attachment.name).join(', ')
                          : 'N/A'}
                      </a>
                    </div>
                  </Col>
                </Row>
              </div>
            </Panel>
          </PanelLayout>
          {/* view Salary Bank Details ends */}
        </div>
      )}
      {editable && (
        <div>
          <PanelLayout className="mb-3">
            <Panel title={t('Salary Bank Details')}>
              <Row justify="left" gutter={(12, 10)}>
                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 8 }}>
                  <div className="form-field">
                    <Field name="bankName" label="Bank Name" type="number" />
                  </div>
                  <div className="form-field">
                    <Field name="accNum" label="A/C Number" type="number" />
                  </div>
                </Col>
                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 8 }}>
                  <div className="form-field">
                    <Field name="branchName" label="Branch Name" type="text" />
                  </div>
                  <div className="form-field">
                    <Field name="ifscCode" label="IFSC Code" type="text" />
                  </div>
                </Col>
                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 8 }}>
                  <div className="form-field">
                    <label>Attachments</label>
                    <Attachments
                      name="attachments"
                      value={values.attachments}
                      title="Attach Files"
                      description="You can upload a maximum of 3 files, 5MB each"
                      acceptFile={['image', 'pdf']}
                      onUpload={onUploadAttachement}
                    />
                  </div>
                </Col>
              </Row>
            </Panel>
          </PanelLayout>
          {/* Edit Salary Bank Details ends */}
          <PanelLayout className="mb-3">
            <Panel title={t('Alternate Bank Details')}>
              <Row justify="left" gutter={(12, 10)}>
                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 8 }}>
                  <div className="form-field">
                    <Field name="alternateBankAccount" label="Bank Name" type="text" />
                  </div>
                  <div className="form-field">
                    <Field name="alternateAcNumber" label="A/C Number" type="number" />
                  </div>
                </Col>
                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 8 }}>
                  <div className="form-field">
                    <Field name="alternateBranchName" label="Branch Name" type="text" />
                  </div>
                  <div className="form-field">
                    <Field name="alternateIFSCCode" label="IFSC Code" type="text" />
                  </div>
                </Col>
                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 8 }}>
                  <div className="form-field">
                    <label>Attachments</label>
                    <Attachments
                      name="attachments"
                      value={values.attachments}
                      title="Attach Files"
                      description="You can upload a maximum of 3 files, 5MB each"
                      acceptFile={['image', 'pdf']}
                    />
                  </div>
                </Col>
              </Row>
            </Panel>
          </PanelLayout>
          {/* Edit Salary Bank Details ends */}
        </div>
      )}
      <FooterActions
        leftActions={[
          {
            prefix: 'flaticon-back',
            label: 'Back to employee list'
          }
        ]}
        centerActions={[
          {
            prefix: 'flaticon-play',
            label: 'Save',
            dontShow: !editable,
            onClick: () => setEditable(false)
          }
        ]}
        rightActions={[
          {
            prefix: 'flaticon-edit-1',
            label: 'Edit',
            dontShow: editable,
            onClick: () => setEditable(true)
          }
        ]}
      />
    </Form>
  )
}

const mapStateToProps = (state) => ({
  bankDetails: state.employee.employeeDetails.bankDetails
})

export default connect(
  mapStateToProps,
  null
)(
  withFormik({
    mapPropsToValues: () => ({
      bankName: '',
      accNum: '',
      branchName: '',
      ifscCode: '',
      attachments: [],
      type: ''
    }),
    handleSubmit: () => null
    // validationSchema: Schema
  })(BankDetails)
)
