import { withFormik } from 'formik'
import React, { useEffect } from 'react'
import Button from '../../../Components/Button'
import { Field, Form } from '../../../Components/Formik'
import { STATUS } from '../../../Util/Options'

function SalesPersonFilter({ values, setValues, filterData }) {
  useEffect(() => {
    setValues({ ...values, ...filterData })
  }, [])

  return (
    <Form>
      <div className="form-fields">
        <Field name="firstName" label="First Name" />
      </div>
      <div className="form-fields">
        <Field name="lastName" label="Last Name" />
      </div>
      <div className="form-fields">
        <Field name="email" label="Mail ID" />
      </div>
      <div className="form-fields">
        <Field name="contact" label="Contact" />
      </div>
      <div className="form-fields">
        <Field as="select" name="status" label="Status" options={STATUS} allowClear />
      </div>
      <div className="form-fields">
        <Button type="submit" variant="secondary" className="search">
          <i className="flaticon-search-interface-symbol" /> Search
        </Button>
        <Button type="reset" className="btn-block btn-glow search">
          Clear
        </Button>
      </div>
    </Form>
  )
}

export default withFormik({
  mapPropsToValues: () => ({
    firstName: '',
    lastName: '',
    email: '',
    contact: '',
    status: ''
  }),
  handleSubmit: (values, { props: { onSubmit } }) => onSubmit(values)
})(SalesPersonFilter)
