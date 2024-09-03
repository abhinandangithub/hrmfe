import { withFormik } from 'formik'
import _ from 'lodash'
import React from 'react'
import { useNavigate  } from 'react-router-dom'
import Button from '../../../Components/Button'
import { Field, Form } from '../../../Components/Formik'
import { GET_DATA, SET_DATA, validateAccess } from '../../../Util/Util'

const STATUS = [
  { label: 'Assigned', value: 'Assigned' },
  { label: 'Returned', value: 'Returned' }
]

function Filter(props) {
  const history = useNavigate()

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

  return (
    <>
      {validateAccess('add-project-employee-rate') && (
        <Button
          onClick={() => history('/app/add-asset-transfer')}
          variant="primary"
          className="btn-block">
          <i className="flaticon-plus" /> Assign Asset
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
