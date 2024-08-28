import { withFormik } from 'formik'
import _ from 'lodash'
import React from 'react'
import Button from '../../../Components/Button'
import { Field, Form } from '../../../Components/Formik'
import { GET_DATA, SET_DATA, validateAccess } from '../../../Util/Util'

function Filter(props) {
  const onSubmitForm = async () => {
    props.validateForm().then((err) => {
      if (_.isEmpty(err)) {
        props.onFilter(_(props.values).omitBy(_.isEmpty).value())
        SET_DATA('numberingSeries.filterData', props.values)
      }
    })
  }

  const onClear = () => {
    props.resetForm({})
    props.onFilter({})
  }

  return (
    <>
      {validateAccess('numbering-series') && (
        <Button onClick={() => props.onAdd()} variant="primary" className="btn-block">
          <i className="flaticon-plus" /> Add Numbering Series
        </Button>
      )}
      <Form>
        <div className="form-fields">
          <Field name="module" label="Module" />
        </div>
        <div className="form-fields">
          <Field name="transaction" label="Transaction" />
        </div>
        <div className="form-fields">
          <Field name="prefix" label="Prefix" />
        </div>
        <div className="form-fields">
          <Field name="startNo" label="StartNo" />
        </div>
        <div className="form-fields">
          <Field name="suffix" label="suffix" />
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
    const filterObj = GET_DATA('numberingSeries.filterData')

    return {
      name: filterObj?.name || '',
      currency: filterObj?.currency || ''
    }
  },
  handleSubmit: () => null
})(Filter)
