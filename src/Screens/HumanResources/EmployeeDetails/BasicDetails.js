// import { COUNTRIES, GENDER } from '../../../Util/Options'
// import { getImageUrl } from '../../../Util/Util'
import { EditOutlined } from '@ant-design/icons'
import { Col, message, Row } from 'antd'
import { withFormik } from 'formik'
import moment from 'moment'
import { useEffect, useState } from 'react'
import { withTranslation } from 'react-i18next'
import * as Yup from 'yup'
import Button from '../../../Components/Button'
import ButtonBox from '../../../Components/ButtonBox/ButtonBox'
import FooterActions from '../../../Components/FooterActions'
import { Form } from '../../../Components/Formik'
import ModalBox from '../../../Components/ModalBox/ModalBox'
import TableBox from '../../../Components/TableBox/TableBox'
import Panel from '../../../Layout/Panel'
import PanelLayout from '../../../Layout/PanelLayout'
import apiClient from '../../../Util/apiClient'
import ContactDetails from './ContactDetails'
import PassportDetails from './PassportDetails'
import PersonalDetailsForm from './PersonalDetailsForm'
import StatusDetails from './StatusDetails'

// const { Panel } = Collapse
const Schema = Yup.object().shape({
  employee: Yup.string().required(),
  dateOfBirth: Yup.date()
    .default(() => new Date())
    .required(),
  phone: Yup.string()
    .matches(/^\d{10}$/, 'Phone number must be exactly 10 digits')
    .required('Phone number is required'),
  email: Yup.string()
    .email('Invalid email format')
    .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Invalid email format')
    .required('Email is required'),
  alternatePhone: Yup.string()
    .matches(/^\d{10}$/, 'Alternate Phone number must be exactly 10 digits')
    .required('Alternate Phone number is required'),
  alternateEmail: Yup.string()
    .email('Invalid email format')
    .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Invalid email format')
    .required('Alternate is required'),
  validFrom: Yup.date()
    .default(() => new Date())
    .required('Valid From date is required')
    .nullable(),
  validTo: Yup.date()
    .default(() => new Date('9999-12-31'))
    .nullable()
})

const BasicDetails = (props) => {
  const {
    values,
    setValues,
    // submitForm,
    errors,
    employeeId,
    history,
    resetForm,
    restrictPage,
    currentEmployee,
    handleValueChange
  } = props

  const [modalTitle, setModalTitle] = useState('Add')
  const [editable, setEditable] = useState(null)
  const [basicDetails, setBasicDetails] = useState([])
  const [toggle, setToggle] = useState(false)

  useEffect(() => {
    getDetails()
    // fetchDropdownValues()
  }, [employeeId])

  const getDetails = () => {
    apiClient.get(`employee-details/personal-details/get/${employeeId}`).then(({ data }) => {
      if (data && data.result) {
        setBasicDetails(data.result)
        setValues({ ...values, ...data.result, employee: employeeId })
      }
    })
  }

  const columns = [
    {
      title: props.t('Valid From'),
      dataIndex: 'validFrom',
      render: (text) => (text ? moment(text).format('YYYY-MM-DD') : '')
    },
    {
      title: props.t('Valid To'),
      dataIndex: 'validTo',
      render: (text) => (text ? moment(text).format('YYYY-MM-DD') : '')
    },

    {
      title: props.t('Date of Birth'),
      dataIndex: 'dateOfBirth',
      render: (text) => (text ? moment(text).format('YYYY-MM-DD') : '')
    },
    {
      title: props.t('Home Primary Email'),
      dataIndex: 'email'
    },
    {
      title: props.t('Home Alternative Email'),
      dataIndex: 'alternateEmail'
    },
    {
      title: props.t('Home Primary phone'),
      dataIndex: 'phone'
    },
    {
      title: props.t('Home alternative phone'),
      dataIndex: 'alternatePhone'
    },
    {
      title: props.t('Action'),
      dataIndex: 'custom_action',
      render: (_, row) => (
        <Button onClick={() => tableActions(row)} className="btn glow dropdown-toggle">
          <EditOutlined />
        </Button>
      )
    }
  ]

  const onEdit = () => {
    if (values?.id) {
      setEditable(true)
    } else {
      message.error('Please select and employee to edit')
    }
  }

  const tableActions = (val) => {
    setModalTitle('Edit')
    setValues({ ...values, ...val })
    setToggle(true)
  }

  const onSave = async () => {
    console.log('errors', errors)
    // submitForm()
    const {
      alternateEmail,
      alternatePhone,
      validTo,
      validFrom,
      dateOfBirth,
      email,
      employee,
      firstName,
      lastName,
      middleName,
      phone,
      title
    } = values

    const param = {
      alternateEmail,
      alternatePhone,
      dateOfBirth,
      validTo,
      validFrom,
      email,
      employee,
      firstName,
      lastName,
      middleName,
      phone,
      title
    }

    let result
    if (modalTitle === 'Edit') {
      result = await apiClient.put(`employee-details/personal-details/update/${values?.id}`, values)
    } else {
      result = await apiClient.post('employee-details/personal-details/add', param)
    }
    console.log('result', result)
    if (result.data && result.data.result) {
      setEditable(false)
      setToggle(false)
      getDetails()
    }
  }

  const handleAddNewDetails = () => {
    const lastIndex = basicDetails.length - 1
    // const findActive = basicDetails.find((x) => x.isActive)
    // if (findActive) {
    //   setValues({ ...values, ...findActive, employee: employeeId })
    // } else {
    //   setValues({ ...values, employee: employeeId })
    // }
    if (basicDetails.length > 0) {
      setValues({ ...values, ...basicDetails[lastIndex], employee: employeeId })
    }

    setToggle(true)
  }

  return (
    <Form>
      <PanelLayout>
        <Panel
          title="Contact Details"
          button={
            <div className="align-right">
              <ButtonBox
                style={{ marginRight: 10 }}
                type="success"
                onClick={() => {
                  handleAddNewDetails()
                  setModalTitle('Add')
                }}>
                <i className="flaticon-plus" /> {props.t('Add')}
              </ButtonBox>
            </div>
          }>
          <div className="panel-with-border">
            <Row justify="left" gutter={(12, 10)}>
              <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 24 }}>
                {(!editable || restrictPage) && (
                  <div className="table-view">
                    <TableBox
                      columns={columns}
                      actionIndex="custom_action"
                      cardHeaderIndex="status"
                      cardFirstLabelIndex="docno"
                      dataSource={basicDetails}
                    />
                  </div>
                )}
              </Col>
            </Row>
          </div>
        </Panel>
      </PanelLayout>
      <>
        <StatusDetails editable={editable} {...props} />
        <ContactDetails editable={editable} {...props} />
        <PassportDetails editable={editable} {...props} />
      </>

      <ModalBox
        title={`${props.t(modalTitle)} ${props.t('Personal Details')}`}
        visible={toggle}
        onCancel={() => {
          setToggle(false)
          resetForm()
        }}
        width={700}
        okText="Save"
        onOk={onSave}
        destroyOnClose>
        <PersonalDetailsForm
          currentEmployee={currentEmployee}
          currentDetails={values}
          handleValueChange={handleValueChange}
        />
      </ModalBox>

      <FooterActions
        leftActions={
          !restrictPage
            ? [
                {
                  prefix: 'flaticon-back',
                  label: 'Back to employee list',
                  onClick: () => history('/app/employees')
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
    employee: '',
    firstName: '',
    middleName: '',
    lastName: '',
    dob: '',
    email: '',
    title: '',
    phone: '',
    validFrom: new Date(),
    validTo: new Date('9999-12-31'),
    alternateEmail: '',
    alternatePhone: ''
  }),
  validationSchema: Schema,
  handleSubmit: () => null
})(withTranslation()(BasicDetails))
