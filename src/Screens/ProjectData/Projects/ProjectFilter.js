import { withFormik } from 'formik'
import _ from 'lodash'
import React from 'react'
import { useNavigate  } from 'react-router-dom'
import Button from '../../../Components/Button'
import { Field, Form } from '../../../Components/Formik'
import apiClient from '../../../Util/apiClient'
import { GET_DATA, SET_DATA, validateAccess } from '../../../Util/Util'

const YES_NO_OPTIONS = [
  { label: 'Yes', value: 'Yes' },
  { label: 'No', value: 'No' }
]

function Filter(props) {
  const history = useNavigate()

  const onSubmitForm = async () => {
    props.validateForm().then((err) => {
      if (_.isEmpty(err)) {
        props.onFilter(_(props.values).omitBy(_.isEmpty).value())
        SET_DATA('projects.filterData', props.values)
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
          .post('download-data/projects', params, { responseType: 'blob' })
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
      {validateAccess('add-project') && (
        <Button onClick={() => history('/app/add-project')} variant="primary" className="btn-block">
          <i className="flaticon-plus" /> Add Project
        </Button>
      )}
      <Form>
        <div className="form-fields">
          <Field name="name" label="name" />
        </div>
        <div className="form-fields">
          <Field name="clientName" label="Client Name" />
        </div>
        <div className="form-fields">
          <Field name="billable" label="Billable" as="select" options={YES_NO_OPTIONS} />
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
    const filterObj = GET_DATA('projects.filterData')

    return {
      name: filterObj?.name || '',
      clientName: filterObj?.clientName || ''
    }
  },
  handleSubmit: () => null
  // validationSchema: Schema
})(Filter)
