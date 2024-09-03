import { Col, Row } from 'antd'
import DatePicker from 'antd/es/date-picker' // Import Ant Design DatePicker component
import moment from 'moment' // Import moment for date formatting
import { useEffect, useState } from 'react'
import { withTranslation } from 'react-i18next'
import { Field, Form } from '../../../Components/Formik'
import apiClient from '../../../Util/apiClient'

const OrganizationalDetailsForm = (props) => {
  const [unitData, setUnitData] = useState([])
  const [divData, setDivData] = useState([])
  const [depData, setDepData] = useState([])
  const [op1Data, setOp1Data] = useState([])
  const [op2Data, setOp2Data] = useState([])
  const [op3Data, setOp3Data] = useState([])
  const [userData, setUserData] = useState([])

  useEffect(() => {
    getData()
  }, [])

  const getData = () => {
    apiClient.get('organization-units').then(({ status, data }) => {
      if (status === 200) {
        setUnitData(
          data.result.map((item) => ({
            label: item.organizationName,
            value: item.id,
            ...item
          }))
        )
      }
    })
    apiClient.get('divisions/get').then(({ status, data }) => {
      if (status === 200) {
        setDivData(
          data.result.map((item) => ({
            label: item.name,
            value: item.id,
            ...item
          }))
        )
      }
    })
    apiClient.get('department/get').then(({ status, data }) => {
      if (status === 200) {
        setDepData(
          data.result.map((item) => ({
            label: item.name,
            value: item.id,
            ...item
          }))
        )
      }
    })

    apiClient.get('operational-level1').then(({ status, data }) => {
      if (status === 200) {
        setOp1Data(
          data.result.map((item) => ({
            label: item.operationalLevel1Name,
            value: item.id,
            ...item
          }))
        )
      }
    })

    apiClient.get('operational-level-2').then(({ status, data }) => {
      if (status === 200) {
        setOp2Data(
          data.result.map((item) => ({
            label: item.operationalLevel2,
            value: item.id,
            ...item
          }))
        )
      }
    })

    apiClient.get('operational-level-3').then(({ status, data }) => {
      if (status === 200) {
        setOp3Data(
          data.result.map((item) => ({
            label: item.operationalLevel3Name,
            value: item.id,
            ...item
          }))
        )
      }
    })

    apiClient.get('employees/get-active').then(({ data }) => {
      if (data && data.result) {
        const employeeData = data.result
        console.log('employeeData', employeeData)
        setUserData(
          data.result.map((item) => ({
            label: item.name,
            value: item._id,
            ...item
          }))
        )
      }
    })
  }

  const DatePickerField = ({ field, form, ...props }) => {
    const { name, value } = field
    const { setFieldValue, setFieldTouched } = form

    return (
      <DatePicker
        {...props}
        value={value ? moment(value, 'YYYY-MM-DD') : null} // Ensure value is a moment object or null
        onChange={(date) => {
          setFieldValue(name, date ? date.format('YYYY-MM-DD') : '')
          setFieldTouched(name, true)
        }}
      />
    )
  }

  return (
    <Form>
      <Row justify="left" gutter={[12, 10]}>
        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 12 }}>
          <div className="form-field">
            <label>{props.t('Valid From')}</label>
            <Field name="validFrom" component={DatePickerField} />
          </div>
        </Col>
        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 12 }}>
          <div className="form-field">
            <label>{props.t('Valid To')}</label>
            <Field name="validTo" component={DatePickerField} />
          </div>
        </Col>
        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 12 }}>
          <div className="form-field">
            <Field
              name="organizationUnit"
              label={props.t('Organization Unit')}
              as="select"
              options={unitData}
            />
          </div>
        </Col>
        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 12 }}>
          <div className="form-field">
            <Field name="division" label={props.t('Division')} as="select" options={divData} />
          </div>
        </Col>
        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 12 }}>
          <div className="form-field">
            <Field name="department" label={props.t('Department')} as="select" options={depData} />
          </div>
        </Col>
        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 12 }}>
          <div className="form-field">
            <Field
              name="operationalManager"
              label={props.t('Operational Manager')}
              as="select"
              options={userData}
            />
          </div>
        </Col>
        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 12 }}>
          <div className="form-field">
            <Field name="matrixManager" label={props.t('Matrix Manager')} as="select" options={userData} />
          </div>
        </Col>
        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 12 }}>
          <div className="form-field">
            <Field name="hrManager" label={props.t('HR Manager')} as="select" options={userData} />
          </div>
        </Col>
        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 12 }}>
          <div className="form-field">
            <Field
              name="operationalLevel1"
              label={props.t('Operational Level 1')}
              as="select"
              options={op1Data}
            />
          </div>
        </Col>
        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 12 }}>
          <div className="form-field">
            <Field
              name="operationalLevel2"
              label={props.t('Operational Level 2')}
              as="select"
              options={op2Data}
            />
          </div>
        </Col>
        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 12 }}>
          <div className="form-field">
            <Field
              name="operationalLevel3"
              label={props.t('Operational Level 3')}
              as="select"
              options={op3Data}
            />
          </div>
        </Col>
      </Row>
    </Form>
  )
}

export default withTranslation()(OrganizationalDetailsForm)
