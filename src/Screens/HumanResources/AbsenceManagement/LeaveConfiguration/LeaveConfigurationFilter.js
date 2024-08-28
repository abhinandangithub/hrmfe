import { withFormik } from 'formik'
import _ from 'lodash'
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import Button from '../../../../Components/Button'
import { Field, Form } from '../../../../Components/Formik'
import apiClient from '../../../../Util/apiClient'
import { GET_DATA, removeEmptyKeys, SET_DATA } from '../../../../Util/Util'

function Filter(props) {
  const history = useHistory()
  const [yearIds, setYearIds] = useState([])
  const [yearname, setYearname] = useState([])

  const onSubmitForm = async () => {
    props.validateForm().then((err) => {
      if (_.isEmpty(err)) {
        const params = removeEmptyKeys(props.values)
        props.onFilter(params)
        SET_DATA('Leave.filterData', props.values)
      }
    })
  }

  const onClear = () => {
    props.resetForm({})
    props.onFilter({})
  }

  const getData = () => {
    apiClient.get('leave-types/get-unique-leave-types').then(({ data }) => {
      if (data && data.result) {
        setYearIds(
          data.result.map((item) => ({
            label: item.name,
            value: item.value
          }))
        )
      }
    })

    apiClient.get('leave-types/get-year-ids').then(({ data }) => {
      if (data && data.result) {
        setYearname(
          data.result.map((item) => ({
            label: item.calenderData.name,
            value: item.calenderData.name
          }))
        )
      }
    })
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <>
      <Button
        onClick={() => history.push('/app/add-leave-configuration')}
        variant="primary"
        className="btn-block">
        <i className="flaticon-plus" /> Add Leave Configuration
      </Button>

      <Form>
        <div className="form-fields">
          <Field name="calenderName" label="Calendar Year" as="select" options={yearname} />
        </div>
        <div className="form-fields">
          <Field name="type" label="Leave Type" as="select" options={yearIds} />
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
    const filterObj = GET_DATA('Leave.filterData')

    return {
      calenderName: filterObj?.calenderName || '',
      type: filterObj?.leaveTypes || ''
    }
  },
  handleSubmit: () => null
  // validationSchema: Schema
})(Filter)
