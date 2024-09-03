import { Col, Row } from 'antd'
import { withFormik } from 'formik'
import { useTranslation } from 'react-i18next'
import FooterActions from '../../../Components/FooterActions'
import { Field, Form } from '../../../Components/Formik'
import Panel from '../../../Layout/Panel'
import PanelLayout from '../../../Layout/PanelLayout'

const Transfer = (props) => {
  const { t } = useTranslation()
  return (
    <Form>
      <Row justify="center" className="inner-contents">
        <Col xs={{ span: 22 }} sm={{ span: 22 }} md={{ span: 18 }} lg={{ span: 20 }}>
          <PanelLayout title={t('Employee Transfer')} className="mb-5">
            <Panel title={t('Transfer Details')}>
              <Row justify="left" gutter={(20, 24)}>
                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 24 }}>
                  <div className="form-fields">
                    <Field name="employee" label="Employee" as="select" mode="multiple" />
                  </div>
                </Col>
                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 8 }}>
                  <div className="form-fields">
                    <Field name="companyName" label="Company Name" />
                  </div>
                </Col>
                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 8 }}>
                  <div className="form-fields">
                    <Field name="country" label="Country" as="select" />
                  </div>
                </Col>
                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 8 }}>
                  <div className="form-fields">
                    <Field name="division" label="Division" as="select" />
                  </div>
                </Col>
                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 8 }}>
                  <div className="form-fields">
                    <Field name="Department" label="Department" as="select" />
                  </div>
                </Col>
                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 8 }}>
                  <div className="form-fields">
                    <Field name="positionNo" label="Position No." />
                  </div>
                </Col>
                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 8 }}>
                  <div className="form-fields">
                    <Field name="jobTitle" label="Job Title" />
                  </div>
                </Col>
                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 8 }}>
                  <div className="form-fields">
                    <Field name="organizationUnit" label="Organization Unit" as="select" />
                  </div>
                </Col>
                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 8 }}>
                  <div className="form-fields">
                    <Field name="transferReason" label="Transfer Reason" as="select" />
                  </div>
                </Col>
                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 8 }}>
                  <div className="form-fields">
                    <Field name="transferType" label="Transfer Type" as="select" />
                  </div>
                </Col>
                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 8 }}>
                  <div className="form-fields">
                    <Field name="endDate" label="End Date" as="date" />
                  </div>
                </Col>
                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 8 }}>
                  <div className="form-fields">
                    <Field name="payChange" label="Pay Change" as="select" />
                  </div>
                </Col>
              </Row>
            </Panel>
          </PanelLayout>
        </Col>
      </Row>

      <FooterActions
        leftActions={[
          {
            prefix: 'flaticon-back',
            label: 'Back to Employee List',
            onClick: () => props.history('/app/employees')
          }
        ]}
        centerActions={[
          {
            prefix: 'flaticon-user',
            label: 'Transfer Employee'
          }
        ]}
        rightActions={[
          {
            label: 'Cancel'
          }
        ]}
      />
    </Form>
  )
}

export default withFormik({
  mapPropsToValues: () => ({
    employee: '',
    country: '',
    companyName: '',
    Division: '',
    Department: '',
    positionNo: '',
    organizationUnit: '',
    jobTitle: '',
    effectiveDate: '',
    transferReason: '',
    transferType: '',
    endDate: '',
    payChange: ''
  }),
  handleSubmit: () => null
  // validationSchema: Schema
})(Transfer)
