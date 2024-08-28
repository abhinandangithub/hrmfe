import { withFormik } from 'formik'
import _ from 'lodash'
import moment from 'moment'
import React from 'react'
import { useHistory } from 'react-router-dom'
import Button from '../../../../Components/Button'
import { Field, Form } from '../../../../Components/Formik'
import { GET_DATA, removeEmptyKeys, SET_DATA, validateAccess } from '../../../../Util/Util'

function Filter(props) {
  const history = useHistory()

  const onSubmitForm = async () => {
    props.validateForm().then((err) => {
      if (_.isEmpty(err)) {
        const params = removeEmptyKeys(props.values)

        if (params.startDate) {
          params.startDate = moment(params.startDate).format('YYYY-MM-DD')
        }

        if (params.endDate) {
          params.endDate = moment(params.endDate).format('YYYY-MM-DD')
        }

        props.onFilter(params)

        SET_DATA('CompanyCalendar.filterData', props.values)
      }
    })
  }

  const onClear = () => {
    props.resetForm({})
    props.onFilter({})
  }

  return (
    <>
      {validateAccess('add-company-calendar') && (
        <Button
          onClick={() => history.push('/app/add-company-calendar')}
          variant="primary"
          className="btn-block">
          <i className="flaticon-plus" /> Add Company Calendar
        </Button>
      )}
      <Form>
        <div className="form-fields">
          <Field name="name" label="Calendar Year" />
        </div>
        <div className="form-fields">
          <Field name="startDate" label="From Month" as="date" />
        </div>
        <div className="form-fields">
          <Field name="endDate" label="To Month" as="date" />
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
    const filterObj = GET_DATA('CompanyCalendar.filterData')

    return {
      name: filterObj?.name || '',
      startDate: filterObj?.startDate || '',
      endDate: filterObj?.endDate || ''
    }
  },
  handleSubmit: () => null
  // validationSchema: Schema
})(Filter)
