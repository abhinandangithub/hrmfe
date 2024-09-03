import { Col, Row } from 'antd'
import { useEffect, useState } from 'react'
import { Field, Form } from '../../../../Components/Formik'
import apiClient from '../../../../Util/apiClient'

function CompanyCalendarLeaveDesc() {
  const [locationOptions, setLocationOptions] = useState([])

  const getData = () => {
    apiClient.get('location/getlocations').then(({ data }) => {
      if (data?.result) {
        setLocationOptions(data.result.map((x) => ({ label: x.name, value: x.id })))
      }
    })
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <Form>
      <Row justify="left" gutter={(12, 10)}>
        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 18 }}>
          <div className="form-field">
            <Field name="leavedescription" label="Leave Description" />
          </div>
        </Col>
        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 18 }}>
          <div className="form-field">
            <Field
              name="dependentId"
              label="Select Location"
              as="select"
              options={locationOptions}
              mode="multiple"
            />
          </div>
        </Col>
      </Row>
    </Form>
  )
}

export default CompanyCalendarLeaveDesc
