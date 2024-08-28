import { Col, Row } from 'antd'
import moment from 'moment'
import { useEffect } from 'react'
import { Field } from '../../../../Components/Formik'
import { LEAVE_APPLY_TYPES, LEAVE_TYPES } from '../../../../Util/Options'

function leavedescription(props) {
  console.log('props', props)
  useEffect(() => {
    const { fromDate, toDate } = props.currentDetails

    if (fromDate && toDate && !moment(fromDate).isSame(toDate)) {
      props.setFieldValue('duration', 'Full day')
    }
  }, [props.currentDetails.fromDate, props.currentDetails.toDate])

  return (
    <Row justify="left" gutter={(12, 10)}>
      {props.reportees.length > 0 && (
        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 24 }}>
          <div className="form-field">
            <Field as="radio-group" name="applyingFor" label="Applying For" options={LEAVE_APPLY_TYPES} />
          </div>
        </Col>
      )}
      {props.currentDetails.applyingFor === 'Reportee' && (
        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 24 }}>
          <div className="form-field">
            <Field name="reporteeUserId" label="Select Reportee" as="select" options={props.reportees} />
          </div>
        </Col>
      )}
      <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 24 }}>
        <div className="form-field">
          <Field name="fromDate" label="From Date" as="date" />
        </div>
        <div className="form-field">
          <Field name="toDate" label="To Date" as="date" />
        </div>
      </Col>
      {moment(props.currentDetails.fromDate).isSame(props.currentDetails.toDate) && (
        <div className="form-field">
          <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 24 }}>
            <Field as="radio-group" name="duration" label="Select Leave" options={LEAVE_TYPES} />
          </Col>
        </div>
      )}

      <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 24 }}>
        <div className="form-field">
          <Field name="description" label="Leave Description" />
        </div>
      </Col>
      <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 24 }}>
        <div className="form-field">
          <Field name="leaveType" label="Leave Type" as="select" options={props.leavetypes} />
        </div>
      </Col>
    </Row>
  )
}

export default leavedescription
