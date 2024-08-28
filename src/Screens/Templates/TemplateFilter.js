import { withFormik } from 'formik'
import React, { useEffect } from 'react'
import Button from '../../Components/Button'
import { Field, Form } from '../../Components/Formik'
import { YES_NO_OPTIONS } from '../../Util/Options'
import { removeEmptyKeys } from '../../Util/Util'

function Filter({ values, setValues, filterData, resetForm, onFilter }) {
  useEffect(() => {
    setValues({ ...values, ...filterData })
  }, [])

  const onClear = () => {
    resetForm({})
    onFilter({})
  }

  return (
    <Form>
      <div className="form-fields">
        <Field name="name" label="Name" />
      </div>
      <div className="form-fields">
        <Field name="description" label="Description" />
      </div>
      <div className="form-fields">
        <Field name="for" label="For" />
      </div>
      <div className="form-fields">
        <Field name="default" label="Default" as="select" options={YES_NO_OPTIONS} allowClear />
      </div>
      <div className="form-fields">
        <Button type="submit" variant="secondary" className="search">
          <i className="flaticon-search-interface-symbol" />
          Search
        </Button>
        <Button onClick={onClear} className="btn-block btn-glow search">
          Clear
        </Button>
      </div>
    </Form>
  )
}

export default withFormik({
  mapPropsToValues: () => ({
    name: '',
    description: ''
  }),
  handleSubmit: (values, { props: { onFilter } }) => onFilter(removeEmptyKeys(values))
})(Filter)
