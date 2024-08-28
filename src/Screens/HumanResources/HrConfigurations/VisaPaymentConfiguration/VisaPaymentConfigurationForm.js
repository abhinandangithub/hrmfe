import { Col, Row } from 'antd'
import { withFormik } from 'formik'
import _ from 'lodash'
import React from 'react'
import * as Yup from 'yup'
import { Field, Form } from '../../../../Components/Formik'
import ModalBoxFooter from '../../../../Components/ModalBox/ModalBoxFooter'

const Schema = Yup.object().shape({
  noOfMonths: Yup.string().required(),
  visaCost: Yup.number().required(),
  medicalCost: Yup.number().required()
})

function LabourMinistryRegulatoryForm({
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
            <Field name="noOfMonths" label="No Of Months" />
          </div>
        </Col>
        <Col lg={24}>
          <div className="form-field">
            <Field name="visaCost" label="Visa Cost" />
          </div>
        </Col>
        <Col lg={24}>
          <div className="form-field">
            <Field name="medicalCost" label="Medical Cost" />
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
    noOfMonths: selectedConfig?.noOfMonths || '',
    visaCost: selectedConfig?.visaCost || '',
    medicalCost: selectedConfig?.medicalCost || ''
  }),
  validationSchema: Schema,
  handleSubmit: () => null
})(LabourMinistryRegulatoryForm)
