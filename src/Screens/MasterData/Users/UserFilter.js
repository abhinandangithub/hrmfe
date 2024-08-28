import { withFormik } from 'formik'
import _ from 'lodash'
import React from 'react'
import Button from '../../../Components/Button'
import { Field, Form } from '../../../Components/Formik'
import apiClient from '../../../Util/apiClient'
import { STATUS } from '../../../Util/Options'
import { GET_DATA, removeEmptyKeys, SET_DATA, validateAccess } from '../../../Util/Util'

function Filter(props) {
  const onSubmitForm = async () => {
    props.validateForm().then((err) => {
      if (_.isEmpty(err)) {
        const params = removeEmptyKeys(props.values)
        props.onFilter(params)
        SET_DATA('users.filterData', props.values)
      }
    })
  }

  const onClear = () => {
    props.resetForm({})
    props.onFilter({})
  }

  const onDownload = async () => {
    props.validateForm().then((err) => {
      if (_.isEmpty(err)) {
        const params = _(props.values).omitBy(_.isEmpty).value()
        apiClient
          .post('download-data/users', params, { responseType: 'blob' })
          .then(({ status, data, headers }) => {
            if (status === 200) {
              const a = document.createElement('a')
              a.href = window.URL.createObjectURL(data)
              a.download = JSON.parse(headers['content-disposition'].split('filename=')[1].split(';')[0])
              document.body.appendChild(a)
              a.click()
              a.remove()
            }
          })
      }
    })
  }

  return (
    <>
      {validateAccess('add-user') && (
        <Button onClick={() => props.onOpen()} className="btn-block" variant="primary">
          <i className="flaticon-plus" /> Add User
        </Button>
      )}
      <Form>
        <div className="form-fields">
          <Field name="name" label="Name" />
        </div>
        <div className="form-fields">
          <Field name="email" label="Email" />
        </div>
        <div className="form-fields">
          <Field name="reporterName" label="Reporter" />
        </div>
        <div className="form-fields">
          <Field name="roleName" label="Role" />
        </div>
        <div className="form-fields">
          <Field name="phone" label="Phone" />
        </div>
        <div className="form-fields">
          <Field name="status" label="Status" as="select" options={STATUS} />
        </div>
        <div className="form-fields">
          <Button variant="secondary" className="search" onClick={onSubmitForm}>
            <i className="flaticon-search-interface-symbol" />
            Search
          </Button>
          <Button className="btn-block btn-glow search" onClick={onClear}>
            Clear
          </Button>
          <Button className="btn-block btn-glow search" onClick={onDownload}>
            Download
          </Button>
        </div>
      </Form>
    </>
  )
}

export default withFormik({
  mapPropsToValues: () => {
    const filterObj = GET_DATA('users.filterData')

    return {
      name: filterObj?.name || '',
      email: filterObj?.email || '',
      reporter: filterObj?.reporter || '',
      role: filterObj?.role || '',
      phone: filterObj?.phone || '',
      status: filterObj?.status || ''
    }
  },
  handleSubmit: () => null
})(Filter)
