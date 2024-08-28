import { Divider, message } from 'antd'
import { withFormik } from 'formik'
import _ from 'lodash'
import React from 'react'
import Button from '../../../Components/Button'
import ConfirmationBox from '../../../Components/ConfirmationBox/ConfirmationBox'
import { Field, Form } from '../../../Components/Formik'
import { GET_DATA, SET_DATA } from '../../../Util/Util'

function Filter(props) {
  const onSubmitForm = async (type) => {
    props.validateForm().then((err) => {
      if (_.isEmpty(err)) {
        const obj = _(props.values).omitBy(_.isEmpty).value()

        if (type === 'Calculate') {
          if (obj.date) {
            ConfirmationBox(
              {
                title: 'Generate',
                description:
                  'This will overwrite the exixting data if available for the selected period! Are you sure to continue?',
                acceptText: 'Yes, Continue',
                cancelText: 'Cancel'
              },
              () => {
                props.onFilter({ ...obj, type })
                SET_DATA('recurringCostCalculation.filterData', obj)
              }
            )
          } else {
            message.error('Please select period')
          }
        } else {
          props.onFilter({ ...obj, type })
          SET_DATA('recurringCostCalculation.filterData', obj)
        }
      }
    })
  }

  return (
    <Form>
      <div className="form-fields">
        <Field name="date" label="Period" as="date" picker="month" />
      </div>
      <div className="form-fields">
        <Button variant="primary" className="search" onClick={() => onSubmitForm('Search')}>
          <i className="flaticon-search-interface-symbol" />
          Search
        </Button>
        <Divider />
        <Button variant="secondary" onClick={() => onSubmitForm('Calculate')}>
          Calculate
        </Button>
      </div>
    </Form>
  )
}

export default withFormik({
  mapPropsToValues: () => {
    const filterObj = GET_DATA('recurringCostCalculation.filterData')

    return {
      date: filterObj?.date || ''
    }
  },
  handleSubmit: () => null
})(Filter)
