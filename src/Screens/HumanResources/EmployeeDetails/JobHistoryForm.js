import { Col, Row } from 'antd'
import React, { useEffect, useState } from 'react'
import { withTranslation } from 'react-i18next'
import Attachments from '../../../Components/Attachments'
import { Field, Form } from '../../../Components/Formik'
import apiClient from '../../../Util/apiClient'

const JobHistoryForm = (props) => {
  const { currentDetails, handleValueChange } = props
  const [options, setOptions] = useState({})

  const fetchDropdownValues = () => {
    apiClient
      .get('options/get-by-types', {
        params: { type: ['EmploymentStatus', 'JobCategory'] }
      })
      .then(({ data }) => {
        if (data && data.result) {
          setOptions(data.result)
        }
      })
  }

  useEffect(() => {
    fetchDropdownValues()
  }, [])

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
            <Field name="effectiveDate" label={props.t('Effective Date')} as="date" />
          </div>
        </Col>
        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 12 }}>
          <div className="form-field">
            <Field name="endDate" label={props.t('End Date')} as="date" />
          </div>
        </Col>
        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 24 }}>
          <div className="form-field">
            <Field name="jobTitle" label={props.t('Job Title')} type="text" />
          </div>
        </Col>
        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 12 }}>
          <div className="form-field">
            <Field
              name="employmentStatus"
              label={props.t('Employment Status')}
              options={options.EmploymentStatus || []}
            />
          </div>
        </Col>
        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 12 }}>
          <div className="form-field">
            <Field name="jobCategory" label={props.t('Job Category')} options={options.JobCategory || []} />
          </div>
        </Col>
        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 12 }}>
          <div className="form-field">
            <Field name="location" label={props.t('Location')} type="text" />
          </div>
        </Col>
        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 12 }}>
          <div className="form-field">
            <Field name="comment" label={props.t('Comment')} type="text" />
          </div>
        </Col>
        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 12 }}>
          <div className="form-field">
            <Field name="contractStartDate" label={props.t('Contract Start Date')} as="date" />
          </div>
        </Col>
        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 12 }}>
          <div className="form-field">
            <Field name="contractEndDate" label={props.t('Contract End Date')} as="date" />
          </div>
        </Col>
        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 24 }}>
          <div className="form-field">
            <label>Attachments</label>
            <Attachments
              name="dependentsAttachments"
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

export default withTranslation()(JobHistoryForm)
