import { Col, message, Row } from 'antd'
import { withFormik } from 'formik'
import { isEmpty } from 'lodash'
import moment from 'moment'
import { useEffect, useState } from 'react'
import { withTranslation } from 'react-i18next'
import * as Yup from 'yup'
import FooterActions from '../../../Components/FooterActions'
import { Field, FieldArray, Form } from '../../../Components/Formik'
import Panel from '../../../Layout/Panel'
import PanelLayout from '../../../Layout/PanelLayout'
import apiClient from '../../../Util/apiClient'
import { EMPLOYEE_GROUP, EMPLOYEE_SUBGROUP, JOB_LEVEL, LOCATIONS, WAGE_MODE } from '../../../Util/Options'
import { convertSelectOptions } from '../../../Util/Util'
import SupportingDetails from './SupportingDetails'

const Schema = Yup.object().shape({
  division: Yup.string().required(),
  department: Yup.string().required(),
  reporter: Yup.string().required(),
  manager: Yup.string().required(),
  joiningDate: Yup.string().required(),
  costCenter: Yup.string().required()
})

const OfficialDetails = (props) => {
  const { values, setValues, submitForm, errors, employeeId, onChangeEmployee, history, restrictPage } = props

  const [editable, setEditable] = useState(false)
  const [employeeCategoryOptions, setEmployeeCategoryOptions] = useState([])
  const [payRoll, setPayRoll] = useState([])

  useEffect(() => {
    getDetails()
  }, [employeeId])

  const getDetails = () => {
    apiClient.get(`employees/get/${employeeId}`).then(({ data }) => {
      if (data && data.result) {
        const employeeData = data.result

        apiClient.get(`/employee-details/approvers/get/${employeeId}`).then(({ data }) => {
          if (data) {
            setValues({ ...values, ...data.result, ...employeeData })
          }
        })
      }
    })

    apiClient.get('options/getAllActive', { params: { type: 'employeeCategory' } }).then(({ data }) => {
      if (data && data.result) {
        setEmployeeCategoryOptions(data.result)
      }
    })

    apiClient.get('customTemplates/getAll', { params: { type: 'Payroll' } }).then(({ data }) => {
      if (data && data.result) {
        setPayRoll(convertSelectOptions(data.result, 'name', 'id'))
      }
    })
  }

  // useEffect(() => {
  //   if (editable) {
  //     fetchDropdownValues()
  //   }
  // }, [props.editable])

  const onEdit = () => {
    if (values?.id) {
      setEditable(true)
    } else {
      message.error('Please select and employee to edit')
    }
  }

  const onSave = () => {
    submitForm()
    console.log('errors', errors)

    if (isEmpty(errors)) {
      values.name = `${values.firstName} ${values.middleName || ''} ${values.lastName} `
        .replace(/\s+/g, ' ')
        .trim()
      values.reporter = values.reporter === 'Self' ? null : values.reporter
      values.manager = values.manager === 'Self' ? null : values.manager
      values.division = values.division || null
      values.department = values.department || null
      // values.costCenter = values.costCenter || null

      if (employeeId) {
        apiClient.put(`employees/update/${employeeId}`, values).then(({ data }) => {
          if (data && data.result) {
            apiClient
              .put(`employee-details/approvers/update/${employeeId}`, {
                levels: values.levels,
                employee: employeeId,
                status: values?.status
              })
              .then(() => {
                getDetails()
                setEditable(false)
              })
          }
        })
      } else {
        apiClient.post('employees/add', values).then(({ data }) => {
          if (data && data.result) {
            onChangeEmployee(data.result.id)
            setEditable(false)
          }
        })
      }
    }
  }

  return (
    <Form>
      <PanelLayout className="mb-3">
        <Panel title={props.t('Employment details')}>
          {!editable && (
            <div className="panel-with-border">
              <Row justify="left" gutter={(12, 10)}>
                <Col xs={24} sm={24} md={8} lg={8}>
                  <span>{props.t('Division')}</span>
                  <p>{values?.divisionData?.name || '-'}</p>
                </Col>
                <Col xs={24} sm={24} md={8} lg={8}>
                  <span>{props.t('Department')}</span>
                  <p>{values?.departmentData?.name || '-'}</p>
                </Col>
                <Col xs={24} sm={24} md={8} lg={8}>
                  <span>{props.t('Role')}</span>
                  <p>{values?.roleData?.name || ''}</p>
                </Col>
                <Col xs={24} sm={24} md={8} lg={8}>
                  <span>{props.t('Grade')}</span>
                  <p>{values?.gradeData?.name || '-'}</p>
                </Col>
                <Col xs={24} sm={24} md={8} lg={8}>
                  <span>{props.t('Designation')}</span>
                  <p>{values?.designationData?.name}</p>
                </Col>
                <Col xs={24} sm={24} md={8} lg={8}>
                  <span>{props.t('Manager')}</span>
                  <p>{values?.managerData?.name || ''}</p>
                </Col>
                <Col xs={24} sm={24} md={8} lg={8}>
                  <span>{props.t('Matrix manager')}</span>
                  <p>{values?.reporterData?.name || ''}</p>
                </Col>
                <Col xs={24} sm={24} md={8} lg={8}>
                  <span>{props.t('Cost Center')}</span>
                  <p>{values?.costCenterData?.name || '-'}</p>
                </Col>
                <Col xs={24} sm={24} md={8} lg={8}>
                  <span>{props.t('Timesheet View Access')}</span>
                  <p>{values?.timesheetViewAccessData?.map((v) => v.name)?.join(', ') || '-'}</p>
                </Col>
                <Col xs={24} sm={24} md={8} lg={8}>
                  <span>{props.t('Role and Responsibility')}</span>
                  <p>{values?.roleAndResponsibility || '-'}</p>
                </Col>
                <Col xs={24} sm={24} md={8} lg={8}>
                  <span>{props.t('Wage Type')}</span>
                  <p>{values?.wageType || '-'}</p>
                </Col>
                <Col xs={24} sm={24} md={8} lg={8}>
                  <span>{props.t('Employee Category')}</span>
                  <p>{values?.employeeCategory || '-'}</p>
                </Col>
                <Col xs={24} sm={24} md={8} lg={8}>
                  <span>{props.t('Joining Date')}</span>
                  <p>{values?.joiningDate ? moment(values.joiningDate).format('DD-MMM-YYYY') : '-'}</p>
                </Col>
                <Col xs={24} sm={24} md={8} lg={8}>
                  <span>{props.t('Exit Date')}</span>
                  <p>{values?.exitDate ? moment(values.exitDate).format('DD-MMM-YYYY') : '-'}</p>
                </Col>
                <Col xs={24} sm={24} md={8} lg={8}>
                  <span>{props.t('Payroll Template')}</span>
                  <p>{values?.payrolltemplate || '-'}</p>
                </Col>
                <Col xs={24} sm={24} md={8} lg={8}>
                  <span>{props.t('Location')}</span>
                  <p>{values?.payrolltemplate || '-'}</p>
                </Col>
                <Col xs={24} sm={24} md={8} lg={8}>
                  <span>{props.t('Job Level')}</span>
                  <p>{values?.payrolltemplate || '-'}</p>
                </Col>
                <Col xs={24} sm={24} md={8} lg={8}>
                  <span>{props.t('Employee Group')}</span>
                  <p>{values?.payrolltemplate || '-'}</p>
                </Col>
                <Col xs={24} sm={24} md={8} lg={8}>
                  <span>{props.t('Employee Sub Group')}</span>
                  <p>{values?.payrolltemplate || '-'}</p>
                </Col>
              </Row>
            </div>
          )}
          {editable && (
            <Row justify="left" gutter={(12, 10)}>
              <Col xs={24} sm={24} md={8} lg={8}>
                <div className="form-field">
                  <Field name="division" label="Division" as="paged-select" endPoint="divisions/get-active" />
                </div>
              </Col>
              <Col xs={24} sm={24} md={8} lg={8}>
                <div className="form-field">
                  <Field
                    name="department"
                    label="Department"
                    as="paged-select"
                    endPoint="department/get-active"
                  />
                </div>
              </Col>
              <Col xs={24} sm={24} md={8} lg={8}>
                <div className="form-field">
                  <Field name="role" label="Role" as="paged-select" endPoint="roles/get-active" />
                </div>
              </Col>
              <Col xs={24} sm={24} md={8} lg={8}>
                <div className="form-field">
                  <Field name="grade" label="Grade" as="paged-select" endPoint="grades/get-active" />
                </div>
              </Col>
              <Col xs={24} sm={24} md={8} lg={8}>
                <div className="form-field">
                  <Field
                    name="designation"
                    label="Designation"
                    as="paged-select"
                    endPoint="designations/get-active"
                  />
                </div>
              </Col>
              <Col xs={24} sm={24} md={8} lg={8}>
                <div className="form-field">
                  <Field
                    name="manager"
                    label="Manager"
                    as="paged-select"
                    endPoint="users/get-active-by-company"
                    defaultOptions={[{ label: 'Self', value: 'Self' }]}
                    optionValue="user"
                  />
                </div>
              </Col>
              <Col xs={24} sm={24} md={8} lg={8}>
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
              <Col xs={24} sm={24} md={8} lg={8}>
                <div className="form-field">
                  <Field
                    name="costCenter"
                    label="Cost Center"
                    as="paged-select"
                    endPoint="cost-centers/get-active"
                  />
                </div>
              </Col>
              <Col xs={24} sm={24} md={8} lg={8}>
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
              <Col xs={24} sm={24} md={8} lg={8}>
                <div className="form-field">
                  <Field name="roleAndResponsibility" label="Role and Responsibility" />
                </div>
              </Col>
              <Col xs={24} sm={24} md={8} lg={8}>
                <div className="form-field">
                  <Field name="wageType" label="Wage Type" as="select" options={WAGE_MODE} />
                </div>
              </Col>

              <Col xs={24} sm={24} md={8} lg={8}>
                <div className="form-field">
                  <Field
                    name="employeeCategory"
                    label="Employee Category"
                    as="select"
                    options={employeeCategoryOptions}
                  />
                </div>
              </Col>
              <Col xs={24} sm={24} md={8} lg={8}>
                <div className="form-field">
                  <Field name="joiningDate" label="Joining Date" as="date" />
                </div>
              </Col>
              <Col xs={24} sm={24} md={8} lg={8}>
                <div className="form-field">
                  <Field name="exitDate" label="Exit Date" as="date" />
                </div>
              </Col>
              <Col xs={24} sm={24} md={8} lg={8}>
                <div className="form-field">
                  <Field name="payrollTemplate" label="Payroll Template" as="select" options={payRoll} />
                </div>
              </Col>
              <Col xs={24} sm={24} md={8} lg={8}>
                <div className="form-field">
                  <Field name="Location" label="Location" as="select" options={LOCATIONS} />
                </div>
              </Col>
              <Col xs={24} sm={24} md={8} lg={8}>
                <div className="form-field">
                  <Field name="Job Level" label="Job Level" as="select" options={JOB_LEVEL} />
                </div>
              </Col>
              <Col xs={24} sm={24} md={8} lg={8}>
                <div className="form-field">
                  <Field name="Employee Group" label="Employee Group" as="select" options={EMPLOYEE_GROUP} />
                </div>
              </Col>
              <Col xs={24} sm={24} md={8} lg={8}>
                <div className="form-field">
                  <Field
                    name="Employee Sub Group"
                    label="Employee Sub Group"
                    as="select"
                    options={EMPLOYEE_SUBGROUP}
                  />
                </div>
              </Col>
            </Row>
          )}
        </Panel>

        <Panel title={props.t('Approvers Detail')}>
          <div className="panel-with-border">
            <Row justify="left" gutter={(12, 10)}>
              <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 24 }}>
                <FieldArray
                  name="levels"
                  editable={editable}
                  additionalValues={{ editable }}
                  defaultValues={{
                    name: '',
                    approvers: []
                  }}>
                  {ApproverForm}
                </FieldArray>
              </Col>
            </Row>
          </div>
        </Panel>

        <SupportingDetails editable={editable} employeeId={employeeId} {...props} />
      </PanelLayout>

      <FooterActions
        leftActions={
          !restrictPage
            ? [
                {
                  prefix: 'flaticon-back',
                  label: 'Back to employee list',
                  onClick: () => history.push('/app/employees')
                }
              ]
            : []
        }
        centerActions={[
          {
            prefix: 'flaticon-play',
            label: 'Save',
            dontShow: !editable,
            onClick: onSave
          }
        ]}
        rightActions={
          !restrictPage
            ? [
                {
                  prefix: 'flaticon-edit-1',
                  label: 'Edit',
                  dontShow: editable,
                  onClick: onEdit
                },
                {
                  prefix: 'flaticon-delete',
                  label: 'Cancel',
                  dontShow: !editable,
                  onClick: () => setEditable(false)
                }
              ]
            : []
        }
      />
    </Form>
  )
}

export default withFormik({
  mapPropsToValues: () => ({
    levels: [{ name: '', approvers: [] }],
    employeeNo: '',
    firstName: '',
    attachments: [],
    middleName: '',
    lastName: '',
    dob: '',
    role: '',
    manager: '',
    reporter: '',
    wageType: '',
    timesheetViewAccess: [],
    email: '',
    jobTitle: '',
    phone: '',
    designation: null,
    division: null,
    department: null,
    location: '',
    level: '',
    pfNo: '',
    roleAndResponsibility: '',
    costCenter: null,
    functionalArea: '',
    employeeCategory: '',
    joiningDate: '',
    status: 'Active',
    bloodGroup: '',
    drivingLicenseNo: '',
    drivingLicenseExpiryDate: '',
    nationality: '',
    maritalStatus: '',
    gender: '',
    panCardNo: '',
    alternateEmail: '',
    alternatePhone: '',
    currentAddress: {
      buildingNo: '',
      street: '',
      additionalStreet: '',
      city: '',
      state: '',
      postalCode: '',
      country: '',
      neighbourhood: '',
      additionalNo: ''
    },
    permanentAddress: {
      buildingNo: '',
      street: '',
      additionalStreet: '',
      city: '',
      state: '',
      postalCode: '',
      country: '',
      neighbourhood: '',
      additionalNo: ''
    },
    document: '',
    validto: '',
    ValidFrom: '',
    number: '',
    doctype: '',
    curraddress: '',

    passportNo: '',
    nameAsPassport: '',
    passportValidFrom: '',
    passportValidTo: '',
    passportIssuedCountry: '',
    visa: 'No',
    visaHeldForCountry: '',
    typeOfVisa: '',
    visaValidFrom: '',
    visaValidTo: '',
    typeOfVisaEntry: ''
  }),
  validationSchema: Schema,
  handleSubmit: () => null
})(withTranslation()(OfficialDetails))

const ApproverForm = withTranslation()(({ i, editable, ...props }) => (
  // <>
  //   {editable && (
  <Row gutter={[16, 16]} align="middle">
    <Col xs={12} sm={12} md={8} lg={8}>
      <div className="form-field">
        <Field name={`levels[${i}].name`} label={props.t('Name / Description')} disabled={!editable} />
      </div>
    </Col>
    <Col xs={12} sm={12} md={8} lg={8}>
      <div className="form-field">
        <Field
          label={props.t('Approvers')}
          mode="multiple"
          as="paged-select"
          endPoint="users/get-active-by-company"
          optionValue="user"
          name={`levels[${i}].approvers`}
          disabled={!editable}
        />
      </div>
    </Col>
  </Row>
  // )}
  //   {!editable &&
  //     values?.levels.map((item, i) => (
  //       <Row gutter={[10, 5]} key={i}>
  //         <Col xs={12} sm={12} md={8} lg={8}>
  //           {item.name}
  //         </Col>
  //         <Col xs={12} sm={12} md={8} lg={16}>
  //           {item.approvers.map((leaf, i) => (
  //             <p key={i}>{leaf}</p>
  //           ))}
  //         </Col>
  //       </Row>
  //     ))}
  // </>
))
