import { Col, Row } from 'antd'
import { withFormik } from 'formik'
import _ from 'lodash'
import React from 'react'
import * as Yup from 'yup'
import { Field, Form } from '../../../../Components/Formik'
import ModalBoxFooter from '../../../../Components/ModalBox/ModalBoxFooter'

const Schema = Yup.object().shape({
  visaStartCount: Yup.number().required(),
  visaEndCount: Yup.number().decimal().required(),
  cost: Yup.number().decimal().required()
})

function PensionFundConfigurationForm({
  selectedConfig,
  submitForm,
  validateForm,
  values,
  onUpdate,
  onCancel
}) {
  const onSave = async () => {
    await submitForm()
    validateForm().then((err) => {
      if (_.isEmpty(err)) {
        onUpdate(values, selectedConfig ? 'Update' : 'Add')
      }
    })
  }

  return (
    <Form>
      <Row gutter={[20, 10]}>
        <Col lg={24}>
          <div className="form-field">
            <Field name="visaStartCount" label="Visa Start Count" />
          </div>
        </Col>
        <Col lg={24}>
          <div className="form-field">
            <Field name="visaEndCount" label="Visa End Count" />
          </div>
        </Col>
        <Col lg={24}>
          <div className="form-field">
            <Field name="cost" label="Cost" />
          </div>
        </Col>
        <Col lg={24}>
          <div className="form-fields">
            <ModalBoxFooter
              okText={selectedConfig ? 'Update' : 'Add'}
              onOk={() => onSave()}
              onCancel={() => onCancel()}
            />
          </div>
        </Col>
      </Row>
    </Form>
  )
}

export default withFormik({
  mapPropsToValues: ({ selectedConfig }) => ({
    id: selectedConfig?.id || '',
    visaStartCount: selectedConfig?.visaStartCount || '',
    visaEndCount: selectedConfig?.visaEndCount || '',
    cost: selectedConfig?.cost || ''
  }),
  validationSchema: Schema,
  handleSubmit: () => null
})(PensionFundConfigurationForm)
