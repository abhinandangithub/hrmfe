import { Col, Row } from 'antd'
import { withTranslation } from 'react-i18next'
import Attachments from '../../../Components/Attachments'
import { Field, Form } from '../../../Components/Formik'

const DocumentDetailsForm = (props) => {
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
        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 12 }}>
          <div className="form-field">
            <Field name="documentName" label={props.t('Document Name')} type="text" />
          </div>
        </Col>

        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 24 }}>
          <div className="form-field">
            <label>{props.t('Attachments')}</label>
            <Attachments
              name="attachments"
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

export default withTranslation()(DocumentDetailsForm)
