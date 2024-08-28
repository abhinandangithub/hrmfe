import { Col, Row } from 'antd'
import React from 'react'
import Attachments from '../../../Components/Attachments'
import { Field, Form } from '../../../Components/Formik'

const WorkExperienceForm = (props) => {
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
        <Col xs={24} sm={24} md={24} lg={24}>
          <div className="form-field">
            <Field name="companyName" label="Company" />
          </div>
        </Col>
        <Col xs={24} sm={24} md={24} lg={24}>
          <div className="form-field">
            <Field name="jobTitle" label="Job Title" />
          </div>
        </Col>
        <Col xs={24} sm={24} md={12} lg={12}>
          <div className="form-field">
            <Field name="from" label="From Date" as="date" />
          </div>
        </Col>
        <Col xs={24} sm={24} md={12} lg={12}>
          <div className="form-field">
            <Field name="to" label="To Date" as="date" />
          </div>
        </Col>
        <Col xs={24} sm={24} md={24} lg={24}>
          <div className="form-field">
            <Field name="comment" label="Comment" as="textarea" />
          </div>
        </Col>
        <Col xs={24} sm={24} md={24} lg={24}>
          <div className="form-field">
            <label>Attachments</label>
            <Attachments
              name="dependentsAttachments"
              value={currentDetails?.attachments || []}
              title="Attach Files"
              description="You can upload a maximum of 3 files, 5MB each"
              acceptFile={['image', 'pdf']}
              onUpload={onUploadAttachement}
            />
          </div>
        </Col>
      </Row>
    </Form>
  )
}

export default WorkExperienceForm
