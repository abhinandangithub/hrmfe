// import { message } from 'antd'
import { withFormik } from 'formik'
import _ from 'lodash'
import moment from 'moment'
import { useEffect } from 'react'
import Button from '../../../Components/Button'
import { Field, Form } from '../../../Components/Formik'
import { GET_DATA, removeEmptyKeys, SET_DATA } from '../../../Util/Util'

function Filter(props) {
  const { validateForm, values, onFilter, dataMonth, setFieldValue } = props

  // const onSync = async (type) => {
  //   validateForm().then((err) => {
  //     if (_.isEmpty(err)) {
  //       const params = removeEmptyKeys(values)

  //       if (params.date) {
  //         onFilter(params, type)
  //         SET_DATA('payrolls.filterData', params)
  //       } else {
  //         message.error('Please select month to sync')
  //       }
  //     }
  //   })
  // }

  useEffect(() => {
    setFieldValue(
      'date',
      moment()
        .month(dataMonth ? dataMonth - 1 : '')
        .format('YYYY-MM')
    )
  }, [dataMonth])

  const onSubmit = async (type) => {
    validateForm().then((err) => {
      if (_.isEmpty(err)) {
        const params = removeEmptyKeys(values)
        onFilter(params, type)
        SET_DATA('payrolls.filterData', params)
      }
    })
  }

  return (
    <Form>
      <div className="form-fields">
        <Field
          name="date"
          label="Month"
          as="date"
          picker="month"
          defaultValue={moment(new Date()).format('YYYY-MM')}
        />
      </div>
      <div className="form-fields">
        <Field name="employeeNo" label="Employee No" />
      </div>
      <div className="form-fields">
        <Field name="name" label="Name" />
      </div>
      <div className="form-fields">
        <Field name="email" label="Email" />
      </div>
      <div className="form-fields">
        <Button onClick={() => onSubmit('Show')} variant="primary" className="search">
          Show
        </Button>
        <Button type="reset" className="btn-block btn-glow search">
          Clear
        </Button>
      </div>
    </Form>
  )
}

export default withFormik({
  mapPropsToValues: () => {
    const filterObj = GET_DATA('payrolls.filterData')

    return {
      date: filterObj?.date || moment(new Date()).format('YYYY-MM'),
      employeeNo: filterObj?.employeeNo || '',
      name: filterObj?.name || '',
      email: filterObj?.email || ''
    }
  },
  handleSubmit: () => null
})(Filter)
