import { withFormik } from 'formik'
import React, { useEffect } from 'react'
import Button from '../../../Components/Button'
import { Field, Form } from '../../../Components/Formik'

function POSOptionFilter({ values, setValues, filterData }) {
  useEffect(() => {
    setValues({ ...values, ...filterData })
  }, [])

  return (
    <Form>
      <div className="form-fields">
        <Field name="category" label="Category" />
      </div>
      <div className="form-fields">
        <Field name="subCategory" label="Sub Category" />
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
    category: '',
    subCategory: ''
  }),
  handleSubmit: (values, { props: { onSubmit } }) => onSubmit(values)
})(POSOptionFilter)
