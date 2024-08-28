import { Col, Row } from 'antd'
import { withTranslation } from 'react-i18next'
import Attachments from '../../../Components/Attachments'
import { Field, Form } from '../../../Components/Formik'

const BankDetailsForm = (props) => {
  const { currentDetails, handleValueChange } = props

  const onUploadAttachement = (key, attachments) => {
    handleValueChange({
      ...currentDetails,
      attachments: attachments.filter((attachment) => attachment !== '')
    })
  }

  return (
    <Form>
      <Row justify="left" gutter={(12, 10)}>
        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 12 }}>
          <div className="form-field">
            <Field
              name="type"
              label={props.t('Bank Type')}
              as="select"
              options={[
                { label: props.t('Salary Bank'), value: 'Salary Bank' },
                { label: props.t('Alternate Bank'), value: 'Alternate Bank' }
              ]}
            />
          </div>
        </Col>
        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 12 }}>
          <div className="form-field">
            <Field name="bankName" label={props.t('Bank Name')} type="text" />
          </div>
        </Col>
        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 12 }}>
          <div className="form-field">
            <Field name="accNum" label={props.t('A/C Number')} type="number" />
          </div>
        </Col>
        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 12 }}>
          <div className="form-field">
            <Field name="branchName" label={props.t('Branch Name')} type="text" />
          </div>
        </Col>
        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 12 }}>
          <div className="form-field">
            <Field name="ifscCode" label={props.t('SA Number')} type="text" />
          </div>
        </Col>
        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 12 }}>
          <div className="form-field">
            <Field name="paymentElection" label={`${props.t('Payment Election')} %`} type="number" />
          </div>
        </Col>

        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 24 }}>
          <div className="form-field">
            <label>{props.t('Attachments')}</label>
            <Attachments
              name="educationAttachments"
              value={currentDetails?.attachments || []}
              title={props.t('Attach Files')}
              description={props.t('You can upload a maximum of 3 files, 5MB each')}
              acceptFile={['image', 'pdf']}
              onUpload={onUploadAttachement}
            />
          </div>
        </Col>
      </Row>
    </Form>
  )
}

export default withTranslation()(BankDetailsForm)
