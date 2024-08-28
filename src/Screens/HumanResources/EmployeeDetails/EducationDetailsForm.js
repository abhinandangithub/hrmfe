import { Col, Row } from 'antd'
import React from 'react'
import { withTranslation } from 'react-i18next'
import Attachments from '../../../Components/Attachments'
import { Field, Form } from '../../../Components/Formik'

const EducationDetailsForm = (props) => {
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
        <Col xs={24} sm={24} md={24} lg={12}>
          <div className="form-field">
            <Field name="level" label={props.t('Level')} />
          </div>
        </Col>
        <Col xs={24} sm={24} md={12} lg={12}>
          <div className="form-field">
            <Field name="year" label={props.t('Year')} as="date" />
          </div>
        </Col>
        <Col xs={24} sm={24} md={12} lg={24}>
          <div className="form-field">
            <Field name="score" label={props.t('GPA/Score')} type="text" />
          </div>
        </Col>
        <Col xs={24} sm={24} md={24} lg={24}>
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

export default withTranslation()(EducationDetailsForm)
