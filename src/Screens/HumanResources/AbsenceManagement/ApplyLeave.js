import { Col, Row } from 'antd'
import { withFormik } from 'formik'
import { useTranslation } from 'react-i18next'
import ApplyLeaveImg from '../../../assets/images/apply-leave.svg'
import FooterActions from '../../../Components/FooterActions'
import { Field, Form } from '../../../Components/Formik'
import Panel from '../../../Layout/Panel'
import PanelLayout from '../../../Layout/PanelLayout'

const { t } = useTranslation()

const ApplyLeave = (props) => (
  <Form>
    <Row justify="center" className="inner-contents">
      <Col xs={{ span: 22 }} sm={{ span: 22 }} md={{ span: 18 }} lg={{ span: 14 }}>
        <PanelLayout title={t('Apply For Leave')} className="mb-5">
          <Panel title={t('Leave Details')}>
            <Row justify="left" gutter={(20, 24)}>
              <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 12 }}>
                <img src={ApplyLeaveImg} style={{ width: '100%' }} alt="Accqrate Apply Leave form" />
              </Col>
              <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 12 }}>
                <div className="form-fields">
                  <label style={{ fontSize: 16 }}>
                    Casual Leave : <strong>6</strong>
                  </label>
                </div>
                <div className="form-fields">
                  <label style={{ fontSize: 16 }}>
                    Paid Leave : <strong>7</strong>
                  </label>
                </div>
                <div className="form-fields">
                  <h2 className="pb-2 mb-4 border-bottom" style={{ color: 'var(--primary)' }}>
                    Add Leave
                  </h2>
                </div>
                <div className="form-fields">
                  <Field name="leaveType" label="Leave Type" as="select" />
                </div>
                <div className="form-fields">
                  <Field name="leaveFromTo" label="Leave From and To" as="date-range" />
                </div>
                <div className="form-fields">
                  <label style={{ fontSize: 16 }}>
                    Reporting Person : <strong>Demo Manager</strong>
                  </label>
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
          label: 'Back to Employee Absence Management',
          onClick: () => props.history('/app/absence-management')
        }
      ]}
      centerActions={[
        {
          prefix: 'flaticon-writing',
          label: 'Apply Leave Now'
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

export default withFormik({
  mapPropsToValues: () => ({
    employeeNumber: '',
    terminationDate: '',
    referenceNumber: '',
    lastWorkingDate: '',
    remarks: ''
  }),
  handleSubmit: () => null
  // validationSchema: Schema
})(ApplyLeave)
