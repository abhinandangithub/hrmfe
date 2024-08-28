import { Col, Row } from 'antd'
import { withFormik } from 'formik'
import _ from 'lodash'
import React, { useEffect, useState } from 'react'
import * as Yup from 'yup'
import { Field, Form } from '../../../../Components/Formik'
import ModalBoxFooter from '../../../../Components/ModalBox/ModalBoxFooter'
import apiClient from '../../../../Util/apiClient'

const Schema = Yup.object().shape({
  category: Yup.string().required(),
  employerContribution: Yup.number().required(),
  employeeContribution: Yup.number().required()
})

function LabourMinistryRegulatoryForm({
  selectedConfig,
  submitForm,
  validateForm,
  values,
  onUpdate,
  onCancel
}) {
  const [categoryOptions, setCategoryOptions] = useState([])

  useEffect(() => {
    apiClient.get('options/getAllActive', { params: { type: 'employeeCategory' } }).then(({ data }) => {
      if (data && data.result) {
        setCategoryOptions(data.result)
      }
    })
  }, [])

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
            <Field name="category" label="Cateory" as="select" options={categoryOptions} />
          </div>
        </Col>
        <Col lg={24}>
          <div className="form-field">
            <Field name="employerContribution" label="Employer Contribution" />
          </div>
        </Col>
        <Col lg={24}>
          <div className="form-field">
            <Field name="employeeContribution" label="Employee Contribution" />
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
    category: selectedConfig?.category || '',
    employerContribution: selectedConfig?.employerContribution || '',
    employeeContribution: selectedConfig?.employeeContribution || ''
  }),
  validationSchema: Schema,
  handleSubmit: () => null
})(LabourMinistryRegulatoryForm)
