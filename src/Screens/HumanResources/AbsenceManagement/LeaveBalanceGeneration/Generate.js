import { Button, message } from 'antd'
import { withFormik } from 'formik'
import _ from 'lodash'
import React, { useEffect, useState } from 'react'
import { Field, Form } from '../../../../Components/Formik'
import apiClient from '../../../../Util/apiClient'
import { convertSelectOptions, GET_DATA, removeEmptyKeys, SET_DATA } from '../../../../Util/Util'

function Generate({ onFilter, values, validateForm }) {
  const [yearIds, setYearIds] = useState([])

  const onSync = async (type) => {
    validateForm().then((err) => {
      if (_.isEmpty(err)) {
        const params = removeEmptyKeys(values)

        if (params.calenderYear) {
          onFilter(params, type)
          SET_DATA('leaveBalance.filterData', params)
        } else {
          message.error('Please select year for sync')
        }
      }
    })
  }

  const onSubmit = async (type) => {
    validateForm().then((err) => {
      if (_.isEmpty(err)) {
        const params = removeEmptyKeys(values)

        if (params.fromDate !== undefined) {
          params.fromDate = params.fromDate.format('YYYY-MM-DD')
        }

        if (params.toDate !== undefined) {
          params.toDate = params.toDate.format('YYYY-MM-DD')
        }

        onFilter(params, type)
        SET_DATA('leaveBalance.filterData', params)
      }
    })
  }

  const getData = () => {
    apiClient.get('/yearly-calender/get-year-ids').then(({ data }) => {
      if (data && data.result) {
        setYearIds(convertSelectOptions(data.result || [], 'name', '_id'))
      }
    })
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <Form>
      <div className="form-fields">
        <Field name="calenderYear" label="Calender Year" as="select" id="calenderYear" options={yearIds} />
      </div>
      <div className="form-fields">
        <Field name="fromDate" label="From Date" as="date" />
      </div>
      <div className="form-fields">
        <Field name="toDate" label="To Date" as="date" />
      </div>
      <div className="form-fields">
        <Field
          name="employeeId"
          label="Search Employee"
          as="paged-select"
          endPoint="employees/get-active"
          optionValue="_id"
        />
      </div>
      <div className="form-fields">
        <Button variant="primary" onClick={() => onSubmit('show')}>
          Show
        </Button>
        <Button variant="primary" onClick={() => onSync('sync')}>
          Sync
        </Button>
      </div>
    </Form>
  )
}

export default withFormik({
  mapPropsToValues: () => {
    const generateObj = GET_DATA('leaveBalance.filterData')

    return {
      calenderYear: generateObj?.calenderYear,
      fromDate: generateObj?.fromDate,
      toDate: generateObj?.toDate,
      employeeId: generateObj?.employeeId
    }
  },
  handleSubmit: () => null
})(Generate)
