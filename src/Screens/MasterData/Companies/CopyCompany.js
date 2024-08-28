import { message } from 'antd'
import { withFormik } from 'formik'
import _ from 'lodash'
import React from 'react'
import * as Yup from 'yup'
import { Field, Form } from '../../../Components/Formik'
import ModalBoxFooter from '../../../Components/ModalBox/ModalBoxFooter'
import apiClient from '../../../Util/apiClient'
import { removeEmptyKeys } from '../../../Util/Util'

const Schema = Yup.object().shape({
  name: Yup.string().required(),
  userName: Yup.string().required(),
  email: Yup.string().email().required(),
  password: Yup.string().required()
})

function CopyCompany(props) {
  const onSave = async () => {
    await props.submitForm()
    props.validateForm().then((err) => {
      if (_.isEmpty(err)) {
        const data = removeEmptyKeys(props.values)
        data.company = props.copiedCompany.company

        apiClient.post('companies/copy-company', data).then(({ data }) => {
          if (data && data.result) {
            props.onRefreshData()
            message.success('Company Copied')
          }
        })
      }
    })
  }

  return (
    <Form>
      <div className="form-fields">
        <Field name="name" label="Company Name" />
      </div>
      <div className="form-fields">
        <Field name="userName" label="User Name" />
      </div>
      <div className="form-fields">
        <Field name="email" label="Email" />
      </div>
      <div className="form-fields">
        <Field name="password" label="Password" type="password" />
      </div>

      <div className="form-fields">
        <ModalBoxFooter okText="Copy Company" onOk={() => onSave()} onCancel={() => props.onCancel()} />
      </div>
    </Form>
  )
}

export default withFormik({
  mapPropsToValues: () => ({
    name: '',
    userName: '',
    email: '',
    password: 'Welcome123$'
  }),

  handleSubmit: () => null,
  validationSchema: Schema
})(CopyCompany)
