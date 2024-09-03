import { Col, Row } from 'antd'
import { withFormik } from 'formik'
import { useTranslation } from 'react-i18next'
import FooterActions from '../../../Components/FooterActions'
import { Field, Form } from '../../../Components/Formik'
import Panel from '../../../Layout/Panel'
import PanelLayout from '../../../Layout/PanelLayout'

const GoalsAssignmentForm = (props) => {
  const { t } = useTranslation()
  return (
    <Form>
      <Row justify="center" className="inner-contents">
        <Col xs={{ span: 22 }} sm={{ span: 22 }} md={{ span: 18 }} lg={{ span: 20 }}>
          <PanelLayout title={t('Assign Goal')} className="mb-5">
            <Panel title={t('Assign Goal Details')}>
              <Row justify="left" gutter={(20, 24)}>
                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 12 }}>
                  <div className="form-fields">
                    <Field name="goalName" label="Goal Name" as="select" />
                  </div>
                </Col>
                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 12 }}>
                  <div className="form-fields">
                    <Field name="employeeName" label="Employee Name" as="select" mode="multiple" />
                  </div>
                </Col>
                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 12 }}>
                  <div className="form-fields">
                    <Field name="show" label="Show(Yes/No)" as="select" />
                  </div>
                </Col>
                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 12 }}>
                  <div className="form-fields">
                    <Field name="hrRating" label="HR Rating" as="textarea" />
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
            label: 'Back to Assign Goals List',
            onClick: () => props.history('/app/goal-assignment')
          }
        ]}
        centerActions={[
          {
            label: 'Save'
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
    goalName: '',
    employeeName: '',
    show: '',
    hrRating: ''
  }),
  handleSubmit: () => null
  // validationSchema: Schema
})(GoalsAssignmentForm)
