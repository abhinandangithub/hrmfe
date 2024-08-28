import { withFormik } from 'formik'
import _ from 'lodash'
import React from 'react'
import Button from '../../../Components/Button'
import { Field, Form } from '../../../Components/Formik'
import { STATUS } from '../../../Util/Options'
import { GET_DATA, SET_DATA } from '../../../Util/Util'

function Filter(props) {
  const onSubmitForm = async () => {
    props.validateForm().then((err) => {
      if (_.isEmpty(err)) {
        props.onFilter(_(props.values).omitBy(_.isEmpty).value())
        SET_DATA('assets.filterData', props.values)
      }
    })
  }

  const onClear = () => {
    props.resetForm({})
    props.onFilter({})
  }

  return (
    <Form>
      <div className="form-fields">
        <Field name="assetNo" label="Asset No" />
      </div>
      <div className="form-fields">
        <Field name="name" label="name" />
      </div>
      <div className="form-fields">
        <Field name="category" label="Category" />
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
  )
}

export default withFormik({
  mapPropsToValues: () => {
    const filterObj = GET_DATA('assets.filterData')

    return {
      name: filterObj?.name || '',
      clientName: filterObj?.clientName || ''
    }
  },
  handleSubmit: () => null
})(Filter)
