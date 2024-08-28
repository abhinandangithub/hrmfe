import { withFormik } from 'formik'
import _ from 'lodash'
import React, { useEffect, useState } from 'react'
import * as Yup from 'yup'
import { Field, Form } from '../../../Components/Formik'
import ModalBoxFooter from '../../../Components/ModalBox/ModalBoxFooter'
import apiClient from '../../../Util/apiClient'
import { STATUS } from '../../../Util/Options'
import { convertSelectOptions, removeEmptyKeys } from '../../../Util/Util'

const Schema = Yup.object().shape({
  costCenterNo: Yup.string().required(),
  name: Yup.string().required(),
  status: Yup.string().required()
})

function CostCenterForm(props) {
  const [employees, setEmployees] = useState([])

  useEffect(() => {
    apiClient.get('employees/get-active').then(({ data }) => {
      if (data && data.result) {
        setEmployees(convertSelectOptions(data.result, 'name', 'id'))
      }
    })
  }, [])

  const onSave = async () => {
    await props.submitForm()
    props.validateForm().then((err) => {
      if (_.isEmpty(err)) {
        const data = removeEmptyKeys(props.values)

        if (props.selectedData) {
          apiClient.put(`cost-centers/update/${props.selectedData.id}`, data).then(({ data }) => {
            if (data && data.result) {
              props.onCancel(data.result, 'Update')
            }
          })
        } else {
          data.parentId = props.parentData?.costCenterNo || null
          data.parentNodes = [...(props.parentData?.parentNodes || [])]

          if (data.parentId) {
            data.parentNodes.push(data.parentId)
          }

          apiClient.post('cost-centers/create', data).then(({ data }) => {
            if (data && data.result) {
              props.onCancel(data.result, 'Add')
            }
          })
        }
      }
    })
  }

  return (
    <Form>
      <div className="form-fields">
        <Field name="costCenterNo" label="Cost Center No" disabled={!!props.selectedData} />
      </div>
      <div className="form-fields">
        <Field name="name" label="Name" />
      </div>
      <div className="form-fields">
        <Field name="employee" label="Employee" as="select" options={employees} />
      </div>
      <div className="form-fields">
        <Field name="status" label="Status" as="select" options={STATUS} />
      </div>
      <div className="form-fields">
        <ModalBoxFooter
          okText={props.selectedData ? 'Update' : 'Add'}
          onOk={() => onSave()}
          onCancel={() => props.onCancel()}
        />
      </div>
    </Form>
  )
}

export default withFormik({
  mapPropsToValues: ({ selectedData = {} }) => ({
    costCenterNo: selectedData?.costCenterNo || '',
    name: selectedData?.name || '',
    employee: selectedData?.employee || '',
    status: selectedData?.status || 'Active'
  }),

  handleSubmit: () => null,
  validationSchema: Schema
})(CostCenterForm)
