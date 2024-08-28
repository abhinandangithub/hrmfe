import { withFormik } from 'formik'
import React, { useEffect } from 'react'
import Button from '../../../Components/Button'
import { Field, Form } from '../../../Components/Formik'

function AssetInventoryFilter({ values, setValues, filterData }) {
  useEffect(() => {
    setValues({ ...values, ...filterData })
  }, [])

  return (
    <Form>
      <div className="form-fields">
        <Field name="inventoryNumber" label="Inventory no." />
      </div>

      <div className="form-fields">
        <Field name="description" label="Description" />
      </div>
      <div className="form-fields">
        <Field name="fromDate" label="From Date" as="date" />
      </div>
      <div className="form-fields">
        <Field name="toDate" label="To Date" as="date" />
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
    inventoryNumber: '',
    description: '',
    fromDate: '',
    toDate: ''
  }),
  handleSubmit: (values, { props: { onSubmit } }) => onSubmit(values)
})(AssetInventoryFilter)
