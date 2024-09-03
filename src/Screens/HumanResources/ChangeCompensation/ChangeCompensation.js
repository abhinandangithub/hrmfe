import { Col, Row } from 'antd'
import { withFormik } from 'formik'
import { useTranslation } from 'react-i18next'
import FooterActions from '../../../Components/FooterActions'
import { Field, Form } from '../../../Components/Formik'
import Panel from '../../../Layout/Panel'
import PanelLayout from '../../../Layout/PanelLayout'

const ChangeCompensation = (props) => {
  const { t } = useTranslation()

  return (
    <Form>
      <Row justify="center" className="inner-contents">
        <Col xs={{ span: 22 }} sm={{ span: 22 }} md={{ span: 18 }} lg={{ span: 20 }}>
          <PanelLayout title={t('Change Compensation')} className="mb-5">
            <Panel title={t('Change Compensation Details')}>
              <Row justify="left" gutter={(20, 24)}>
                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 24 }}>
                  <div className="form-fields">
                    <Field name="employee" label="Employee" as="select" mode="multiple" />
                  </div>
                </Col>
                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 6 }}>
                  <div className="form-fields">
                    <Field name="basicRate" label="Basic Rate" />
                  </div>
                </Col>

                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 6 }}>
                  <div className="form-fields">
                    <Field name="payChange" label="Pay Change" as="select" />
                  </div>
                </Col>
                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 6 }}>
                  <div className="form-fields">
                    <Field name="payFrequency" label="Pay frequency" as="select" />
                  </div>
                </Col>

                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 6 }}>
                  <div className="form-fields">
                    <Field name="effectiveFrom" label="Effective From" as="date" />
                  </div>
                </Col>
                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 24 }}>
                  <div className="form-fields">
                    <Field name="changeCompensationReason" label="Change Compensation Reason" as="textarea" />
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
    basicRate: '',
    payChange: '',
    payFrequency: '',
    effectiveFrom: '',
    changeCompensationReason: ''
  }),
  handleSubmit: () => null
  // validationSchema: Schema
})(ChangeCompensation)
