import { withFormik } from 'formik'
import React from 'react'
import Button from '../../../Components/Button'
import { Field, Form } from '../../../Components/Formik'

function AppraisalReviewFilter() {
  return (
    <Form>
      <div className="form-fields">
        <Field name="GoallName" label="Goal Name" />
      </div>
      <div className="form-fields">
        <Field name="startAndEndDate" label="Start & End Date" as="date-range" />
      </div>
      <div className="form-fields">
        <Field name="addedBy" label="Added By" as="select" />
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
})(AppraisalReviewFilter)
