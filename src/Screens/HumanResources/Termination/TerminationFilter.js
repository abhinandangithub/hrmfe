import { withFormik } from 'formik'
import _ from 'lodash'
import moment from 'moment'
import React from 'react'
import { useNavigate  } from 'react-router-dom'
import Button from '../../../Components/Button'
import { Field, Form } from '../../../Components/Formik'
import { GET_DATA, removeEmptyKeys, SET_DATA, validateAccess } from '../../../Util/Util'

function Filter(props) {
  const history = useNavigate()

  const onSubmitForm = async () => {
    props.validateForm().then((err) => {
      if (_.isEmpty(err)) {
        const params = removeEmptyKeys(props.values)

        if (params.terminationDate) {
          params.terminationDate = moment(params.terminationDate).format('YYYY-MM-DD')
        }

        if (params.lastWorkingDate) {
          params.lastWorkingDate = moment(params.lastWorkingDate).format('YYYY-MM-DD')
        }

        props.onFilter(params)

        SET_DATA('Termination.filterData', props.values)
      }
    })
  }

  const onClear = () => {
    props.resetForm({})
    props.onFilter({})
  }

  return (
    <>
      {validateAccess('add-termination') && (
        <Button onClick={() => history('/app/add-termination')} variant="primary" className="btn-block">
          <i className="flaticon-plus" />
          Add Terminations
        </Button>
      )}
      <Form>
        <div className="form-fields">
          <Field name="employee" label="Employee" as="select" mode="multiple" />
        </div>
        <div className="form-fields">
          <Field name="terminationDate" label="Termination Date" as="date" />
        </div>
        <div className="form-fields">
          <Field name="RefNo" label="Reference Number" />
        </div>
        <div className="form-fields">
          <Field name="lastWorkingDate" label="Last Working Date" as="date" />
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
    const filterObj = GET_DATA('Termination.filterData')

    return {
      employee: filterObj?.employee || '',
      terminationDate: filterObj?.terminationDate || '',
      lastWorkingDate: filterObj?.lastWorkingDate || '',
      RefNo: filterObj?.RefNo || ''
    }
  },
  handleSubmit: () => null
  // validationSchema: Schema
})(Filter)
