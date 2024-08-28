import { Col, Row } from 'antd'
import { withFormik } from 'formik'
import { useTranslation } from 'react-i18next'
import RatingImg from '../../../assets/images/rating.svg'
import Attachments from '../../../Components/Attachments'
import FooterActions from '../../../Components/FooterActions'
import { Field, Form } from '../../../Components/Formik'
import Panel from '../../../Layout/Panel'
import PanelLayout from '../../../Layout/PanelLayout'

const AppraisalReviewForm = (props) => {
  const { t } = useTranslation()
  return (
    <Form>
      <Row justify="center" className="inner-contents">
        <Col xs={{ span: 22 }} sm={{ span: 22 }} md={{ span: 18 }} lg={{ span: 14 }}>
          <PanelLayout title={t('Appraisal Rating')} className="mb-5">
            <Panel title={t('Review and assessment')}>
              <Row justify="left" gutter={(20, 24)}>
                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 12 }}>
                  <img src={RatingImg} style={{ width: '100%' }} alt="Employee / HR / Manager Rating" />
                </Col>
                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 12 }}>
                  <div className="form-fields">
                    <Field name="rating" label="Rating" as="select" />
                  </div>
                  <div className="form-fields">
                    <Field name="comment" label="Comment" rows={4} as="textarea" />
                  </div>
                  <div className="form-fields">
                    <Attachments
                      name="appraisalAttachments"
                      //   value={attachments}
                      title="Attach Files"
                      description="You can upload a maximum of 3 files, 5MB each"
                      acceptFile={['image', 'pdf']}
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
            label: 'Back to Appraisal Review',
            onClick: () => props.history.push('/app/appraisal-Rating')
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
    rating: '',
    comment: '',
    appraisalAttachments: []
  }),
  handleSubmit: () => null
  // validationSchema: Schema
})(AppraisalReviewForm)
