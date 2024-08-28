import { withFormik } from 'formik'
import { useEffect } from 'react'
import Button from '../../../Components/Button'
import { Field, Form } from '../../../Components/Formik'

function EmployeeLoanFilter({ values, setValues, filterData }) {
  useEffect(() => {
    setValues({ ...values, ...filterData })
  }, [])

  return (
    <Form>
      <div className="form-fields">
        <Field name="employeeNo" label="Employee No" />
      </div>
      <div className="form-fields">
        <Field name="name" label="Name" />
      </div>

      <div className="form-fields">
        <Field name="email" label="Email" />
      </div>
      <div className="form-fields">
        <Field name="reporter" label="Reporter" />
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
    employeeNo: '',
    name: '',
    email: '',
    reporter: ''
  }),
  handleSubmit: (values, { props: { onSubmit } }) => onSubmit(values)
})(EmployeeLoanFilter)
