import { Col, Row } from 'antd'
import { withFormik } from 'formik'
import React from 'react'
import { Field, Form } from '../../../Components/Formik'

function AbsenceManagementForm() {
  return (
    <Form>
      <Row gutter={[10, 5]}>
        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
          <div className="form-fields">
            <Field name="Date" label="Date" type="date" />
          </div>
        </Col>
        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
          <div className="form-fields">
            <Field as="select" name="leaveType" label="Leave Type" />
          </div>
        </Col>
        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
          <div className="form-fields">
            <Field name="balanceLeave" label="Balance Leave" type="number" />
          </div>
        </Col>
      </Row>
    </Form>
  )
}

export default withFormik({
  handleSubmit: () => null
})(AbsenceManagementForm)
