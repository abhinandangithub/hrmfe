import { Col, Row } from 'antd'
import { useEffect, useState } from 'react'
import { withTranslation } from 'react-i18next'
import Attachments from '../../../Components/Attachments'
import { Field, Form } from '../../../Components/Formik'
import apiClient from '../../../Util/apiClient'

const InsuranceDetailForm = (props) => {
  const { currentDetails, handleValueChange } = props
  const [options, setOptions] = useState({})

  const fetchDropdownValues = () => {
    apiClient
      .get('options/get-by-types', {
        params: { type: ['Relationship'] }
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
        <Col xs={24} sm={24} md={24} lg={12}>
          <div className="form-field">
            <Field name="insuranceNo" label={props.t('Insurance No')} />
          </div>
        </Col>
        <Col xs={24} sm={24} md={24} lg={12}>
          <div className="form-field">
            <Field name="insuranceGrade" label={props.t('Insurance Grade')} />
          </div>
        </Col>
        <Col xs={24} sm={24} md={12} lg={12}>
          <div className="form-field">
            <Field name="insurerName" label={props.t('Insurer Name')} />
          </div>
        </Col>
        <Col xs={24} sm={24} md={12} lg={12}>
          <div className="form-field">
            <Field name="insuredName" label={props.t('Insured Name')} />
          </div>
        </Col>
        <Col xs={24} sm={24} md={12} lg={24}>
          <div className="form-field">
            <Field
              name="relationship"
              label={props.t('Relationship')}
              as="select"
              options={options.Relationship?.map?.((opt) => ({ ...opt, label: props.t(opt.label) })) || []}
            />
          </div>
        </Col>

        <Col xs={24} sm={24} md={24} lg={24}>
          <div className="form-field">
            <label>Attachments</label>
            <Attachments
              name="educationAttachments"
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

export default withTranslation(InsuranceDetailForm)
