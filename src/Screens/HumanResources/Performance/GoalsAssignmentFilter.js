import { withFormik } from 'formik'
import React from 'react'
import Button from '../../../Components/Button'
import { Field, Form } from '../../../Components/Formik'

function GoalsAssignmentFilter() {
  return (
    <Form>
      <div className="form-fields">
        <Field name="goalName" label="Goal Name" />
      </div>
      <div className="form-fields">
        <Field name="employeeName" label="Employee Name" as="select" />
      </div>
      <div className="form-fields">
        <Field name="overallStatus" label="Overall Status" as="select" />
      </div>
      <div className="form-fields">
        <Field name="showYesNo" label="show(Yes/No)" as="select" />
      </div>
      <div className="form-fields">
        <Button variant="secondary" className="search">
          <i className="flaticon-search-interface-symbol" />
          Search
        </Button>
        <Button className="btn-block btn-glow search">Clear</Button>
      </div>
    </Form>
  )
}

export default withFormik({
  handleSubmit: () => null
})(GoalsAssignmentFilter)
