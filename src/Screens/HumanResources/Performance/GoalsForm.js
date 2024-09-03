import { Col, Row } from 'antd'
import { withFormik } from 'formik'
import { useTranslation } from 'react-i18next'
import FooterActions from '../../../Components/FooterActions'
import { Field, Form } from '../../../Components/Formik'
import Panel from '../../../Layout/Panel'
import PanelLayout from '../../../Layout/PanelLayout'

const GoalsForm = (props) => {
  const { t } = useTranslation()
  return (
    <Form>
      <Row justify="center" className="inner-contents">
        <Col xs={{ span: 22 }} sm={{ span: 22 }} md={{ span: 18 }} lg={{ span: 20 }}>
          <PanelLayout title={t('Goal')} className="mb-5">
            <Panel title={t('Goal Details')}>
              <Row justify="left" gutter={(20, 24)}>
                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 8 }}>
                  <div className="form-fields">
                    <Field name="goalName" label="Goal Name" />
                  </div>
                </Col>
                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 8 }}>
                  <div className="form-fields">
                    <Field name="goalStartAndEndDate" label="Goal Start & End Date" as="date-range" />
                  </div>
                </Col>
                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 8 }}>
                  <div className="form-fields">
                    <Field
                      name="hrRatingStartAndEndDate"
                      label="HR Rating Start & End Date"
                      as="date-range"
                    />
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
            label: 'Back to Goals List',
            onClick: () => props.history('/app/goals')
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
    goalStartAndEndDate: '',
    hrRatingStartAndEndDate: ''
  }),
  handleSubmit: () => null
  // validationSchema: Schema
})(GoalsForm)
