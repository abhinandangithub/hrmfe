import { Divider } from 'antd'
import { withFormik } from 'formik'
import React from 'react'
import Button from '../../../Components/Button'
import { Field, Form } from '../../../Components/Formik'

function VisaPaymentsFilter() {
  return (
    <>
      <h3>Period selection</h3>
      <Form>
        <div className="form-fields">
          <Field name="periodSelection" label="Period" type="date" />
        </div>
        <div className="form-fields">
          <Button variant="primary">Calculate</Button>
        </div>
      </Form>

      <Divider />

      {/* filter form */}
      <h3>Filter Fields</h3>
      <Form>
        <div className="form-fields">
          <Field name="period" label="Period" type="date" />
        </div>
        <div className="form-fields">
          <Field name="noOfVisas" label="No of Visas" type="number" />
        </div>
        <div className="form-fields">
          <Field name="visaCost" label="Visa Cost" type="number" />
        </div>
        <div className="form-fields">
          <Field name="medicalCost" label="Medical Cost" type="number" />
        </div>
        <div className="form-fields">
          <Field name="totalinLocalCurrency" label="Total in Local Currency" type="number" />
        </div>
        <div className="form-fields">
          <Button variant="secondary" className="search">
            <i className="flaticon-search-interface-symbol" />
            Search
          </Button>
          <Button className="btn-block btn-glow search">Clear</Button>
        </div>
      </Form>
    </>
  )
}

export default withFormik({
  //   mapPropsToValues: () => {
  //     const filterObj = GET_DATA('AbsenceManagement.filterData')

  //     return {
  //       leaveDate: filterObj?.leaveDate || '',
  //       leaveType: filterObj?.leaveType || '',
  //       leaveBalance: filterObj?.leaveBalance || '',
  //       status: filterObj?.status || ''
  //     }
  //   },
  handleSubmit: () => null
})(VisaPaymentsFilter)
