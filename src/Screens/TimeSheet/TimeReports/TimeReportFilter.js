import { withFormik } from 'formik'
import _ from 'lodash'
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import Button from '../../../Components/Button'
import { Field, Form } from '../../../Components/Formik'
import apiClient from '../../../Util/apiClient'
import { convertSelectOptions, GET_DATA, SET_DATA, validateAccess } from '../../../Util/Util'

function Filter(props) {
  const { submitForm, validateForm, values, onFilter } = props

  const [userOptions, setUserOptions] = useState([])
  const [projectOptions, setProjectOptions] = useState([])
  const [clientOptions, setClientOptions] = useState([])

  useEffect(() => {
    let params = {}

    if (validateAccess('time-reports-all')) {
      params = {}
    } else {
      params.user = props.userInfo.id
    }

    apiClient.get('employees/forTimeReport', { params }).then(({ data }) => {
      if (data && data.result) {
        setUserOptions(convertSelectOptions(data.result || [], 'name', 'user'))
      }
    })

    if (params.user) {
      apiClient.get('projects/get-clients-by-user').then(({ data }) => {
        if (data && data.result) {
          setClientOptions(convertSelectOptions(data.result, 'name', 'id'))
        }
      })
      apiClient.get('projects/get-projects-by-user').then(({ data }) => {
        if (data && data.result) {
          const projects = data.result.map((val) => {
            const { projectData } = val
            projectData.label = val.projectData.name
            projectData.value = val.projectData.id

            return projectData
          })
          setProjectOptions(projects)
        }
      })
    } else {
      apiClient.get('clients/getAllActive').then(({ data }) => {
        if (data && data.result) {
          setClientOptions(convertSelectOptions(data.result || [], 'name', 'id'))
        }
      })
      apiClient.get('projects/getAllActive').then(({ data }) => {
        if (data && data.result) {
          setProjectOptions(convertSelectOptions(data.result || [], 'name', 'id'))
        }
      })
    }
  }, [])

  const onSubmitForm = async () => {
    await submitForm()
    validateForm().then((err) => {
      if (_.isEmpty(err)) {
        onFilter(values)
        SET_DATA('timeReport.filterData', values)
      }
    })
  }

  return (
    <Form>
      <div className="form-fields">
        <Field name="date" label="Month" as="date" picker="month" />
      </div>
      <div className="form-fields">
        <Field name="user" label="Employees" as="select" mode="multiple" options={userOptions} />
      </div>
      <div className="form-fields">
        <Field name="clientIds" label="Client" as="select" options={clientOptions} allowClear />
      </div>
      <div className="form-fields">
        <Field name="projectIds" label="Project" as="select" mode="multiple" options={projectOptions} />
      </div>
      <div className="form-fields">
        <Button onClick={() => onSubmitForm()} variant="primary" className="search">
          Show
        </Button>
      </div>
    </Form>
  )
}

const formikComp = withFormik({
  mapPropsToValues: () => {
    const filterObj = GET_DATA('timeReport.filterData')

    return {
      date: filterObj?.date || '',
      user: filterObj?.user || [],
      project: filterObj?.project || []
    }
  },
  handleSubmit: () => null
})(Filter)

function mapStateToProps(state) {
  return {
    userInfo: state.users.userInfo
  }
}

export default connect(mapStateToProps)(formikComp)
