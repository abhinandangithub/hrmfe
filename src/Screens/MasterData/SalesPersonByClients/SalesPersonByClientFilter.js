import { withFormik } from 'formik'
import React, { useEffect } from 'react'
import Button from '../../../Components/Button'
import { Field, Form } from '../../../Components/Formik'
import { STATUS } from '../../../Util/Options'
import { SET_DATA } from '../../../Util/Util'

function SalesPersonFilter({ values, setValues, filterData, resetForm, onFilter }) {
  useEffect(() => {
    setValues({ ...values, ...filterData })
  }, [])

  const onClear = () => {
    SET_DATA('salesPersons.filterData', {})
    resetForm({})
    onFilter({})
  }

  const CV = [
    {
      label: 'Customer',
      value: 'Customer'
    },
    {
      label: 'Vendor',
      value: 'Vendor'
    }
  ]

  return (
    <Form>
      <div className="form-fields">
        <Field name="name" label="Name" />
      </div>
      <div className="form-fields">
        <Field name="clientName" label="Client" />
      </div>
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
        <Field as="select" name="type" label="Type" options={CV} />
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
        <Button className="btn-block btn-glow search" onClick={onClear}>
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
  handleSubmit: (values, { props: { onFilter } }) => onFilter(values)
})(SalesPersonFilter)
