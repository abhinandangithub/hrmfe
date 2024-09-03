import { withFormik } from 'formik'
import _ from 'lodash'
import React from 'react'
import { useNavigate  } from 'react-router-dom'
import Button from '../../../Components/Button'
import { Field, Form } from '../../../Components/Formik'
import apiClient from '../../../Util/apiClient'
import { GRADE } from '../../../Util/Options'
import { GET_DATA, removeEmptyKeys, SET_DATA, validateAccess } from '../../../Util/Util'

function Filter(props) {
  const history = useNavigate()

  const onSubmitForm = async () => {
    props.validateForm().then((err) => {
      if (_.isEmpty(err)) {
        const params = removeEmptyKeys(props.values)
        props.onFilter(params)
        SET_DATA('grade.filterData', props.values)
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
          .post('download-data/employees', params, { responseType: 'blob' })
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
      {validateAccess('add-Grade-Designation') && (
        <Button
          onClick={() => history('/app/add-Grade-Designation')}
          variant="primary"
          className="btn-block">
          <i className="flaticon-plus" /> Add Grade/Designation
        </Button>
      )}
      <Form>
        <div className="form-fields">
          <Field name="grade" label="Grade" as="select" options={GRADE} />
        </div>
        <div className="form-fields">
          <Field name="designation" label="Designation" />
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
    const filterObj = GET_DATA('grade.filterData')

    return {
      employeeNo: filterObj?.employeeNo || '',
      name: filterObj?.name || '',
      email: filterObj?.email || '',
      reporter: filterObj?.reporter || '',
      role: filterObj?.role || '',
      phone: filterObj?.phone || '',
      status: filterObj?.status || ''
    }
  },
  handleSubmit: () => null
  // validationSchema: Schema
})(Filter)
