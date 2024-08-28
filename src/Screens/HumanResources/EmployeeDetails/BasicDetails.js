import { CaretRightOutlined } from '@ant-design/icons'
import { Col, Collapse, message, Row, Space } from 'antd'
import { withFormik } from 'formik'
import { isEmpty } from 'lodash'
import moment from 'moment'
import { useEffect, useState } from 'react'
import { withTranslation } from 'react-i18next'
import * as Yup from 'yup'
import FooterActions from '../../../Components/FooterActions'
import { Field, Form } from '../../../Components/Formik'
import UploadBox from '../../../Components/UploadBox/UploadBox'
import PanelLayout from '../../../Layout/PanelLayout'
import apiClient from '../../../Util/apiClient'
import { COUNTRIES, GENDER } from '../../../Util/Options'
import { getImageUrl } from '../../../Util/Util'
import ContactDetails from './ContactDetails'
import PassportDetails from './PassportDetails'

const { Panel } = Collapse
const Schema = Yup.object().shape({
  firstName: Yup.string().required(),
  lastName: Yup.string().required(),
  // employeeNo: Yup.string().required(),
  dob: Yup.string().required(),
  phone: Yup.string()
    .matches(/^\d{10}$/, 'Phone number must be exactly 10 digits')
    .required('Phone number is required'),
  maritalStatus: Yup.string().required(),
  nationality: Yup.string().required(),
  gender: Yup.string().required(),
  email: Yup.string()
    .email('Invalid email format')
    .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Invalid email format')
    .required('Email is required'),
  alternatePhone: Yup.string()
    .matches(/^\d{10}$/, 'Alternate Phone number must be exactly 10 digits')
    .required('Phone number is required'),
  alternateEmail: Yup.string()
    .email('Invalid email format')
    .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Invalid email format')
    .required('Alternate is required'),
  currentAddress: Yup.object().shape({
    street: Yup.string().required(),
    city: Yup.string().required(),
    postalCode: Yup.string()
      .matches(/^\d{5}(-\d{4})?$/, 'Postal Code must be either 5 digits or 5+4 digits with a hyphen')
      .required('Postal Code is required'),
    country: Yup.string().required(),
    // neighborhood: Yup.string().required(),
    state: Yup.string().required(),
    buildingNo: Yup.string().required()
  }),
  permanentAddress: Yup.object().shape({
    street: Yup.string().required(),
    city: Yup.string().required(),
    postalCode: Yup.string().required(),
    country: Yup.string().required(),
    // neighborhood: Yup.string().required(),
    state: Yup.string().required(),
    buildingNo: Yup.string().required()
  })
  // role: Yup.string().required(),
  // reporter: Yup.string().required(),
  // wageType: Yup.string().required(),
  // jobTitle: Yup.string().required(),
  // joiningDate: Yup.date().required()
})

const BasicDetails = (props) => {
  const {
    values,
    setValues,
    submitForm,
    errors,
    employeeId,
    onChangeEmployee,
    history,
    setFieldValue,
    restrictPage
  } = props

  const [editable, setEditable] = useState(!employeeId)

  useEffect(() => {
    getDetails()
    fetchDropdownValues()
  }, [employeeId])

  const getDetails = () => {
    apiClient.get(`employees/get/${employeeId}`).then(({ data }) => {
      if (data && data.result) {
        setValues({ ...values, ...data.result })
      }
    })
  }

  const [options, setOptions] = useState({})

  // useEffect(() => {
  //   if (editable) {
  //     fetchDropdownValues()
  //   }
  // }, [editable])

  const fetchDropdownValues = () => {
    apiClient
      .get('options/get-by-types', {
        params: { type: ['BloodGroup', 'Nationality', 'MaritalStatus', 'Gender'] }
      })
      .then(({ data }) => {
        console.log('data ==>', data)
        if (data && data.result) {
          setOptions(data.result)
        }
      })
  }

  const onEdit = () => {
    if (values?.id) {
      setEditable(true)
    } else {
      message.error('Please select and employee to edit')
    }
  }

  const onSave = () => {
    submitForm()

    if (isEmpty(errors)) {
      values.name = `${values.firstName} ${values.middleName || ''} ${values.lastName} `
        .replace(/\s+/g, ' ')
        .trim()
      values.reporter = values.reporter === 'Self' ? null : values.reporter

      if (employeeId) {
        apiClient.put(`employees/update/${employeeId}`, values).then(({ data }) => {
          if (data && data.result) {
            getDetails()
            setEditable(false)
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
  console.log('restrictPage', restrictPage)

  return (
    <Form>
      <PanelLayout className="mb-3">
        <Space direction="vertical" size="large" className="w-100">
          <Collapse
            defaultActiveKey="1"
            collapsible="header"
            expandIconPosition="right"
            expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 270 : 90} />}
            bordered>
            <Panel style={{ fontSize: 16, fontWeight: 'bold' }} header={props.t('Personal Details')} key="1">
              {(!editable || restrictPage) && (
                <div className="basic-details">
                  <Row justify="left" gutter={(12, 10)}>
                    <Col xs={24} sm={24} md={8} lg={8}>
                      <span>{props.t('Employee Number')}</span>
                      <p>{values?.employeeNo || '-'}</p>
                    </Col>
                    <Col xs={24} sm={24} md={8} lg={8} />
                    <Col xs={24} sm={24} md={8} lg={8}>
                      <img
                        style={{ width: 100, paddingBottom: 10 }}
                        src={getImageUrl(values?.profilePicPath)}
                        alt="Accounting software"
                      />
                    </Col>

                    <Col xs={24} sm={24} md={8} lg={8}>
                      <span>{props.t('First Name')}</span>
                      <p>{values?.firstName || '-'}</p>
                    </Col>
                    <Col xs={24} sm={24} md={8} lg={8}>
                      <span>{props.t('Middle Name')}</span>
                      <p>{values?.middleName || '-'}</p>
                    </Col>
                    <Col xs={24} sm={24} md={8} lg={8}>
                      <span>{props.t('Last Name')}</span>
                      <p>{values?.lastName || '-'}</p>
                    </Col>
                    <Col xs={24} sm={24} md={8} lg={8}>
                      <span>{props.t('Date of Birth')}</span>
                      <p>{values?.dob ? moment(values?.dob).format('YYYY-MM-DD') : '-'}</p>
                    </Col>
                    <Col xs={24} sm={24} md={8} lg={8}>
                      <span>{props.t('Home Primary Email')}</span>
                      <p>{values?.email || '-'}</p>
                    </Col>

                    <Col xs={24} sm={24} md={8} lg={8}>
                      <span>{props.t('Home Primary Phone')}</span>
                      <p>{values?.phone || '-'}</p>
                    </Col>
                    <Col xs={24} sm={24} md={8} lg={8}>
                      <span>{props.t('Nationality')}</span>
                      <p>{values?.nationality || '-'}</p>
                    </Col>
                    <Col xs={24} sm={24} md={8} lg={8}>
                      <span>{props.t('Marital Status')}</span>
                      <p>{values?.maritalStatus || '-'}</p>
                    </Col>
                    <Col xs={24} sm={24} md={8} lg={8}>
                      <span>{props.t('Gender')}</span>
                      <p>{values?.gender || '-'}</p>
                    </Col>
                    <Col xs={24} sm={24} md={8} lg={8}>
                      <span>{props.t('Alternate Email')}</span>
                      <p>{values?.alternateEmail || '-'}</p>
                    </Col>
                    <Col xs={24} sm={24} md={8} lg={8}>
                      <span>{props.t('Alternate Phone')}</span>
                      <p>{values?.alternatePhone || '-'}</p>
                    </Col>
                  </Row>
                </div>
              )}
              {editable && !restrictPage && (
                <Row justify="left" gutter={(12, 10)}>
                  <Col xs={24} sm={24} md={8} lg={8}>
                    <div className="form-field">
                      <Field name="employeeNo" label="Employee Number" type="number" />
                    </div>
                  </Col>
                  <Col xs={24} sm={24} md={8} lg={8} />
                  <Col xs={24} sm={24} md={8} lg={8}>
                    <UploadBox
                      id="profilePicPath"
                      label="Upload Photo"
                      value={values.logo}
                      onUpload={(v) => setFieldValue('profilePicPath', v)}
                      height={100}
                      width={300}
                    />
                  </Col>

                  <Col xs={24} sm={24} md={8} lg={8}>
                    <div className="form-field">
                      <Field name="firstName" label="First Name" />
                    </div>
                  </Col>
                  <Col xs={24} sm={24} md={8} lg={8}>
                    <div className="form-field">
                      <Field name="middleName" label="Middle Name" />
                    </div>
                  </Col>
                  <Col xs={24} sm={24} md={8} lg={8}>
                    <div className="form-field">
                      <Field name="lastName" label="Last Name" />
                    </div>
                  </Col>
                  <Col xs={24} sm={24} md={8} lg={8}>
                    <div className="form-field">
                      <Field name="dob" label="Date of Birth" as="date" />
                    </div>
                  </Col>
                  <Col xs={24} sm={24} md={8} lg={8}>
                    <div className="form-field">
                      <Field name="email" label="Email id" type="email" />
                    </div>
                  </Col>
                  <Col xs={24} sm={24} md={8} lg={8}>
                    <div className="form-field">
                      <Field name="phone" label="Phone no" type="number" maxlength="10" pattern="\d{10}" />
                    </div>
                  </Col>
                  <Col xs={24} sm={24} md={8} lg={8}>
                    <div className="form-field">
                      <Field name="nationality" label="Nationality" as="select" options={COUNTRIES} />
                    </div>
                  </Col>
                  <Col xs={24} sm={24} md={8} lg={8}>
                    <div className="form-field">
                      <Field
                        name="maritalStatus"
                        label="Marital Status"
                        as="select"
                        options={options.MaritalStatus || []}
                      />
                    </div>
                  </Col>
                  <Col xs={24} sm={24} md={8} lg={8}>
                    <div className="form-field">
                      <Field name="gender" label="Gender" as="select" options={GENDER || []} />
                    </div>
                  </Col>

                  <Col xs={24} sm={24} md={8} lg={8}>
                    <div className="form-field">
                      <Field name="alternateEmail" label="Alternate Email" />
                    </div>
                  </Col>
                  <Col xs={24} sm={24} md={8} lg={8}>
                    <div className="form-field">
                      <Field name="alternatePhone" label="Alternate Phone" />
                    </div>
                  </Col>
                  <Col xs={24} sm={24} md={8} lg={8}>
                    <div className="form-field">
                      <Field name="cprNo" label="CPR Number" />
                    </div>
                  </Col>
                </Row>
              )}
            </Panel>
          </Collapse>
          {/* <PersonalDetails editable={editable} {...props} /> */}
          <ContactDetails editable={editable} {...props} />
          <PassportDetails editable={editable} {...props} />
        </Space>
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
        rightActions={[
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
        ]}
      />
    </Form>
  )
}

export default withFormik({
  mapPropsToValues: () => ({
    employeeNo: '',
    firstName: '',
    profilePicPath: '',
    middleName: '',
    lastName: '',
    dob: '',

    wageType: '',
    timesheetViewAccess: [],
    email: '',
    jobTitle: '',
    phone: '',
    location: '',
    level: '',
    pfNo: '',
    roleAndResponsibility: '',
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
    cprNo: '',
    // currentAddress: {
    //   buildingNo: '',
    //   street: '',
    //   additionalStreet: '',
    //   city: '',
    //   state: '',
    //   postalCode: '',
    //   country: '',
    //   neighbourhood: '',
    //   additionalNo: ''
    // },
    // permanentAddress: {
    //   buildingNo: '',
    //   street: '',
    //   additionalStreet: '',
    //   city: '',
    //   state: '',
    //   postalCode: '',
    //   country: '',
    //   neighbourhood: '',
    //   additionalNo: ''
    // },

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
})(withTranslation()(BasicDetails))
