import { withFormik } from 'formik'
import _ from 'lodash'
import React from 'react'
import { useNavigate  } from 'react-router-dom'
import Button from '../../../Components/Button'
import { Field, Form } from '../../../Components/Formik'
import { STATUS } from '../../../Util/Options'
import { GET_DATA, SET_DATA, validateAccess } from '../../../Util/Util'

function Filter(props) {
  const history = useNavigate()

  const onSubmitForm = async () => {
    props.validateForm().then((err) => {
      if (_.isEmpty(err)) {
        props.onFilter(_(props.values).omitBy(_.isEmpty).value())
        SET_DATA('clients.filterData', props.values)
      }
    })
  }

  const onClear = () => {
    props.resetForm({})
    props.onFilter({})
  }

  return (
    <>
      {validateAccess('add-client') && (
        <Button onClick={() => history('/app/add-client')} variant="primary" className="btn-block">
          <i className="flaticon-plus" /> Add Business Partner
        </Button>
      )}
      <Form>
        <div className="form-fields">
          <Field name="clientNo" label="Client No" />
        </div>
        <div className="form-fields">
          <Field name="name" label="Name" />
        </div>
        <div className="form-fields">
          <Field name="type" label="Type" />
        </div>
        <div className="form-fields">
          <Field name="currency" label="Currency" />
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
    </>
  )
}

export default withFormik({
  mapPropsToValues: () => {
    const filterObj = GET_DATA('clients.filterData')

    return {
      clientNo: filterObj?.clientNo || '',
      name: filterObj?.name || '',
      type: filterObj?.type || '',
      currency: filterObj?.currency || '',
      status: filterObj?.status || ''
    }
  },
  handleSubmit: () => null
})(Filter)
