import { Col, Row } from 'antd'
import { withFormik } from 'formik'
import { useTranslation } from 'react-i18next'
import FooterActions from '../../../Components/FooterActions'
import { Field, Form } from '../../../Components/Formik'
import Panel from '../../../Layout/Panel'
import PanelLayout from '../../../Layout/PanelLayout'

const ChangeJob = (props) => {
  const { t } = useTranslation()
  return (
    <Form>
      <Row justify="center" className="inner-contents">
        <Col xs={{ span: 22 }} sm={{ span: 22 }} md={{ span: 18 }} lg={{ span: 20 }}>
          <PanelLayout title={t('Change Job')} className="mb-5">
            <Panel title={t('Change Job Details')}>
              <Row justify="left" gutter={(20, 24)}>
                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 24 }}>
                  <div className="form-fields">
                    <Field name="employee" label="Employee" as="select" mode="multiple" />
                  </div>
                </Col>
                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 8 }}>
                  <div className="form-fields">
                    <Field name="positionNumber" label="Position Number" />
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
                    <Field name="effectiveDate" label="Effective Date" as="date" />
                  </div>
                </Col>
                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 8 }}>
                  <div className="form-fields">
                    <Field name="manager" label="Manager" as="select" />
                  </div>
                </Col>
                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 8 }}>
                  <div className="form-fields">
                    <Field name="payChange" label="Pay Change" as="select" />
                  </div>
                </Col>
                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 24 }}>
                  <div className="form-fields">
                    <Field name="changeJobReason" label="Job Change Reason" as="textarea" />
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
            onClick: () => props.history.push('/app/employees')
          }
        ]}
        centerActions={[
          {
            prefix: 'flaticon-user',
            label: 'Change Job'
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
    positionNumber: '',
    jobTitle: '',
    organizationUnit: '',
    effectiveDate: '',
    manager: '',
    changeJobReason: '',
    endDate: '',
    payChange: ''
  }),
  handleSubmit: () => null
  // validationSchema: Schema
})(ChangeJob)
