import { withFormik } from 'formik'
import _ from 'lodash'
import React from 'react'
import { useHistory } from 'react-router-dom'
import Button from '../../../Components/Button'
import { Field, Form } from '../../../Components/Formik'
import { MASTER_OPTION_TYPES } from '../../../Util/Options'
import { GET_DATA, SET_DATA, validateAccess } from '../../../Util/Util'

function Filter(props) {
  const history = useHistory()

  const onSubmitForm = async () => {
    props.validateForm().then((err) => {
      if (_.isEmpty(err)) {
        props.onFilter(_(props.values).omitBy(_.isEmpty).value())
        SET_DATA('options.filterData', props.values)
      }
    })
  }

  const onClear = () => {
    props.resetForm({})
    props.onFilter({})
  }

  return (
    <>
      {validateAccess('add-option') && (
        <Button onClick={() => history.push('/app/add-option')} variant="primary" className="btn-block">
          <i className="flaticon-plus" /> Add Value Help
        </Button>
      )}
      <Form>
        <div className="form-fields">
          <Field name="label" label="Label" />
        </div>
        <div className="form-fields">
          <Field name="value" label="Value" />
        </div>
        <div className="form-fields">
          <Field as="select" name="type" label="Type" options={MASTER_OPTION_TYPES} />
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
    const filterObj = GET_DATA('options.filterData')

    return {
      label: filterObj?.label || '',
      value: filterObj?.value || '',
      type: filterObj?.type || ''
    }
  },
  handleSubmit: () => null
})(Filter)
