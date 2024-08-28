import { Col, Row } from 'antd'
import React from 'react'
import { Field, Form } from '../../../../Components/Formik'

function CompanyCalendarLeaveDesc() {
  return (
    <Form>
      <Row justify="left" gutter={(12, 10)}>
        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 18 }}>
          <div className="form-field">
            <Field name="leavedescription" label="Leave Description" />
          </div>
        </Col>
      </Row>
    </Form>
  )
}

export default CompanyCalendarLeaveDesc
