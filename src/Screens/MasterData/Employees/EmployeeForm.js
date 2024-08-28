import { ArrowLeftOutlined } from '@ant-design/icons'
import { Col, Row } from 'antd'
import { withFormik } from 'formik'
import _ from 'lodash'
import { useEffect } from 'react'
import { useHistory } from 'react-router'
import { Link } from 'react-router-dom'
import * as Yup from 'yup'
import Button from '../../../Components/Button'
import { Field, Form } from '../../../Components/Formik'
import apiClient from '../../../Util/apiClient'
import { STATUS, WAGE_MODE } from '../../../Util/Options'
import { removeEmptyKeys } from '../../../Util/Util'

const Schema = Yup.object().shape({
  employeeNo: Yup.string().when('id', {
    is: (id) => id !== undefined,
    then: (schema) => schema.required()
  }),
  name: Yup.string().required(),
  role: Yup.string().required(),
  reporter: Yup.string().required(),
  wageType: Yup.string().required(),
  email: Yup.string().required(),
  joiningDate: Yup.date().required()
})

function EmployeeForm({
  setValues,
  submitForm,
  validateForm,
  values,
  match: {
    params: { id }
  }
}) {
  const history = useHistory()

  const getData = () => {
    if (id) {
      apiClient.get(`employees/get/${id}`).then(({ data }) => {
        if (data && data.result) {
          if (!data.result.reporter) {
            data.result.reporter = 'Self'
          }

          setValues(data.result)
        }
      })
    }
  }

  useEffect(() => {
    getData()
  }, [])

  const onSave = async (invite) => {
    await submitForm()
    validateForm().then((err) => {
      if (_.isEmpty(err)) {
        const data = removeEmptyKeys(values)
        data.reporter = data.reporter === 'Self' ? null : data.reporter
        data.status = invite ? 'Active' : data.status
        data.invite = invite

        if (id) {
          apiClient.put(`employees/update/${id}`, { ...data }).then(({ data }) => {
            if (data && data.result) {
              history.push('/app/employees')
            }
          })
        } else {
          apiClient.post('employees/add', data).then(({ data }) => {
            if (data && data.result) {
              history.push('/app/employees')
            }
          })
        }
      }
    })
  }

  return (
    <Form>
      <Row justify="center" className="inner-contents">
        <Col xs={{ span: 22 }} sm={{ span: 22 }} md={{ span: 20 }} lg={{ span: 20 }}>
          <div className="panel-layout">
            <h2 className="panel-title">Employees Definition</h2>

            <div className="panel-design">
              <div className="panel-header">
                <h3>Employee Details</h3>
              </div>
              <div className="panel-body">
                <Row gutter={[20, 10]}>
                  <Col xs={24} sm={24} md={12} lg={6}>
                    <div className="form-field">
                      <Field name="employeeNo" label="Employee No" />
                    </div>
                  </Col>
                  <Col xs={24} sm={24} md={12} lg={6}>
                    <div className="form-field">
                      <Field name="name" label="Name" />
                    </div>
                  </Col>
                  <Col xs={24} sm={24} md={12} lg={6}>
                    <div className="form-field">
                      <Field name="role" label="Role" as="paged-select" endPoint="roles/get-active" />
                    </div>
                  </Col>
                  <Col xs={24} sm={24} md={12} lg={6}>
                    <div className="form-field">
                      <Field
                        name="reporter"
                        label="Reporting To"
                        as="paged-select"
                        endPoint="users/get-active-by-company"
                        defaultOptions={[{ label: 'Self', value: 'Self' }]}
                        optionValue="user"
                      />
                    </div>
                  </Col>
                  <Col xs={24} sm={24} md={12} lg={6}>
                    <div className="form-field">
                      <Field name="wageType" label="Wage Type" as="select" options={WAGE_MODE} />
                    </div>
                  </Col>
                  <Col xs={24} sm={24} md={12} lg={18}>
                    <div className="form-field">
                      <Field
                        name="timesheetViewAccess"
                        label="Timesheet View Access To"
                        as="paged-select"
                        mode="multiple"
                        endPoint="users/get-active-by-company"
                        optionValue="user"
                      />
                    </div>
                  </Col>
                </Row>
              </div>
            </div>

            <div className="panel-design">
              <div className="panel-header">
                <h3>Personal Details</h3>
              </div>
              <div className="panel-body">
                <Row gutter={[20, 10]}>
                  <Col xs={24} sm={24} md={12} lg={6}>
                    <div className="form-field">
                      <Field name="email" label="Email" disabled={!!id} />
                    </div>
                  </Col>
                  <Col xs={24} sm={24} md={12} lg={6}>
                    <div className="form-field">
                      <Field name="phone" label="Phone" />
                    </div>
                  </Col>
                  <Col xs={24} sm={24} md={12} lg={6}>
                    <div className="form-field">
                      <Field name="dob" label="DOB" as="date" />
                    </div>
                  </Col>
                  <Col xs={24} sm={24} md={12} lg={6}>
                    <div className="form-field">
                      <Field name="socialId" label="Social ID" />
                    </div>
                  </Col>
                </Row>
              </div>
            </div>

            <div className="panel-design">
              <div className="panel-header">
                <h3>Address Details</h3>
              </div>
              <div className="panel-body">
                <Row gutter={[20, 10]}>
                  <Col xs={24} sm={24} md={12} lg={8}>
                    <div className="form-field">
                      <Field name="street" label="Street" />
                    </div>
                  </Col>
                  <Col xs={24} sm={24} md={12} lg={4}>
                    <div className="form-field">
                      <Field name="city" label="City" />
                    </div>
                  </Col>
                  <Col xs={24} sm={24} md={12} lg={4}>
                    <div className="form-field">
                      <Field name="state" label="State" />
                    </div>
                  </Col>
                  <Col xs={24} sm={24} md={12} lg={4}>
                    <div className="form-field">
                      <Field name="postalCode" label="Postal Code" />
                    </div>
                  </Col>
                  <Col xs={24} sm={24} md={12} lg={4}>
                    <div className="form-field">
                      <Field name="country" label="Country" />
                    </div>
                  </Col>
                </Row>
              </div>
            </div>

            <div className="panel-design">
              <div className="panel-header">
                <h3>Bank Details</h3>
              </div>
              <div className="panel-body">
                <Row gutter={[20, 10]}>
                  <Col xs={24} sm={24} md={12} lg={6}>
                    <div className="form-field">
                      <Field name="bankName" label="Bank Name" />
                    </div>
                  </Col>
                  <Col xs={24} sm={24} md={12} lg={6}>
                    <div className="form-field">
                      <Field name="bankAccountNo" label="Bank Account No" />
                    </div>
                  </Col>
                  <Col xs={24} sm={24} md={12} lg={6}>
                    <div className="form-field">
                      <Field name="bankSwift" label="Bank Swift" />
                    </div>
                  </Col>
                  <Col xs={24} sm={24} md={12} lg={6}>
                    <div className="form-field">
                      <Field name="currency" label="Currency" />
                    </div>
                  </Col>
                </Row>
              </div>
            </div>
            <div className="panel-design">
              <div className="panel-header">
                <h3>Validity</h3>
              </div>
              <div className="panel-body">
                <Row gutter={[20, 10]}>
                  <Col xs={24} sm={24} md={12} lg={6}>
                    <div className="form-field">
                      <Field name="joiningDate" label="Joining Date" as="date" />
                    </div>
                  </Col>
                  <Col xs={24} sm={24} md={12} lg={6}>
                    <div className="form-field">
                      <Field name="exitDate" label="Exit Date" as="date" />
                    </div>
                  </Col>
                  {id && (
                    <Col xs={24} sm={24} md={12} lg={6}>
                      <div className="form-field">
                        <Field name="status" label="Status" as="select" options={STATUS} />
                      </div>
                    </Col>
                  )}
                </Row>
              </div>
            </div>
          </div>

          <div className="save-changes">
            {!id && (
              <Button variant="secondary" onClick={() => onSave(true)}>
                Save & Invite
              </Button>
            )}
            <Button variant="primary" onClick={() => onSave()}>
              {id ? 'Update' : 'Save'}
            </Button>
            <span>or</span>
            <Link to="/app/employees">
              <Button>
                <ArrowLeftOutlined /> Back to employees
              </Button>
            </Link>
          </div>
        </Col>
      </Row>
    </Form>
  )
}

export default withFormik({
  mapPropsToValues: () => ({
    employeeNo: '',
    name: '',
    role: '',
    reporter: '',

    wageType: '',
    timesheetViewAccess: [],
    email: '',
    phone: '',
    dob: '',
    socialId: '',
    street: '',
    city: '',
    state: '',
    postalCode: '',
    country: '',
    bankName: '',
    bankAccountNo: '',
    bankSwift: '',
    currency: '',
    joiningDate: '',
    exitDate: '',
    status: 'Active'
  }),
  validationSchema: Schema,
  handleSubmit: () => null
})(EmployeeForm)
