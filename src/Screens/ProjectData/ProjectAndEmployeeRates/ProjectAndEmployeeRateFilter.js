import { withFormik } from 'formik'
import _ from 'lodash'
import React from 'react'
import { useHistory } from 'react-router-dom'
import Button from '../../../Components/Button'
import { Field, Form } from '../../../Components/Formik'
import apiClient from '../../../Util/apiClient'
import { GET_DATA, SET_DATA, validateAccess } from '../../../Util/Util'

function Filter(props) {
  const history = useHistory()

  const onSubmitForm = async () => {
    props.validateForm().then((err) => {
      if (_.isEmpty(err)) {
        props.onFilter(_(props.values).omitBy(_.isEmpty).value())
        SET_DATA('projectAndEmployees.filterData', props.values)
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
          .post('download-data/project-and-employees', params, { responseType: 'blob' })
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
      {validateAccess('add-project-employee-rate') && (
        <Button
          onClick={() => history.push('/app/add-project-employee-rate')}
          variant="primary"
          className="btn-block">
          <i className="flaticon-plus" /> Add project & employee
        </Button>
      )}
      <Form>
        <div className="form-fields">
          <Field name="employeeName" label="Employee Name" />
        </div>
        <div className="form-fields">
          <Field name="projectName" label="Project Name" />
        </div>
        <div className="form-fields">
          <Field name="clientName" label="Client Name" />
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
    const filterObj = GET_DATA('projectAndEmployees.filterData')

    return {
      employeeName: filterObj?.employeeName || '',
      projectName: filterObj?.projectName || '',
      clientName: filterObj?.clientName || ''
    }
  },
  handleSubmit: () => null
  // validationSchema: Schema
})(Filter)
