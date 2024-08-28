import { withFormik } from 'formik'
import React from 'react'
import Button from '../../../Components/Button'
import { Field, Form } from '../../../Components/Formik'
import ModalBox from '../../../Components/ModalBox/ModalBox'
import AbsenceManagementForm from './AbsenceManagementForm'

function AbsenceManagementFilter() {
  return (
    <div>
      <Form>
        <div className="form-fields">
          <Field name="Date" label="Date" type="date" />
        </div>
        <div className="form-fields">
          <Field as="select" name="leaveType" label="Leave Type" />
        </div>
        <div className="form-fields">
          <Field name="balanceLeave" label="Balance Leave" type="number" />
        </div>
        <div className="form-fields">
          <Field name="leaveStatus" label="Show Leave with Status" as="select" />
        </div>
        <div className="form-fields">
          <Button variant="secondary" className="search">
            <i className="flaticon-search-interface-symbol" />
            Search
          </Button>
          <Button className="btn-block btn-glow search">Clear</Button>
        </div>
      </Form>

      <ModalBox title="Update Address" visible={!!false} onOk={false} onCancel={false} destroyOnClose>
        <AbsenceManagementForm />
      </ModalBox>
    </div>
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
})(AbsenceManagementFilter)
