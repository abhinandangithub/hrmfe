import { EditOutlined } from '@ant-design/icons'
import { Col, Row } from 'antd'
import { withFormik } from 'formik'
import { isEmpty } from 'lodash'
import moment from 'moment'
import { useEffect, useState } from 'react'
import { withTranslation } from 'react-i18next'
import * as Yup from 'yup'
import Button from '../../../Components/Button'
import ButtonBox from '../../../Components/ButtonBox/ButtonBox'
import FooterActions from '../../../Components/FooterActions'
import Form from '../../../Components/Formik/Form'
import ModalBox from '../../../Components/ModalBox/ModalBox'
import TableBox from '../../../Components/TableBox/TableBox'
import Panel from '../../../Layout/Panel'
import PanelLayout from '../../../Layout/PanelLayout'
import apiClient from '../../../Util/apiClient'
import HiringDetailsForm from './HiringDetailsForm'

const Schema = Yup.object().shape({
  employeeNo: Yup.string()
    .length(8, 'Employee Number must be exactly 8 characters')
    .required('Employee Number is required'),
  uniqueId: Yup.string()
    .length(10, 'Unique ID must be exactly 10 characters')
    .required('Unique ID is required'),
  email: Yup.string().email('Invalid email'),
  title: Yup.string().oneOf(['Mr', 'Mrs', 'Ms'], 'Invalid Title'),
  hireDate: Yup.date()
    .default(() => new Date())
    .required('Hire Date is required')
    .nullable(),
  originalHireDate: Yup.date()
    .default(() => new Date())
    .required('Original Hire Date is required')
    .nullable(),
  exitDate: Yup.date()
    .default(() => new Date('9999-12-31'))
    .nullable(),
  firstName: Yup.string().required('First Name is required'),
  middleName: Yup.string().nullable(),
  lastName: Yup.string().required('Last Name is required'),
  validFrom: Yup.date()
    .default(() => new Date())
    .required('Valid From date is required')
    .nullable(),
  validTo: Yup.date()
    .default(() => new Date('9999-12-31'))
    .nullable(),
  contractType: Yup.string().nullable(),
  hireId: Yup.string().nullable()
})

const HiringDetails = (props) => {
  const {
    currentEmployee,
    values,
    setValues,
    errors,
    submitForm,
    resetForm,
    history,
    restrictPage,
    onChangeEmployee
  } = props
  const [toggle, setToggle] = useState(false)
  const [activeData, setActiveData] = useState(null)
  const [dataSource, setDataSource] = useState([])

  const columns = [
    {
      title: props.t('Employee Number'),
      dataIndex: 'employeeNo'
    },
    {
      title: props.t('Unique ID'),
      dataIndex: 'uniqueId'
    },
    // {
    //   title: props.t('Email'),
    //   dataIndex: 'email',
    //   key: 'email'
    // },
    {
      title: props.t('Hire Date'),
      dataIndex: 'hireDate',
      render: (date) => moment(date).format('DD MMM YYYY') // Format date
    },
    {
      title: props.t('Original Hire Date'),
      dataIndex: 'originalHireDate',
      render: (date) => moment(date).format('DD MMM YYYY') // Format date
    },
    {
      title: props.t('Exit Date'),
      dataIndex: 'exitDate',
      render: (date) => moment(date).format('DD MMM YYYY') // Format date
    },
    {
      title: props.t('Title'),
      dataIndex: 'title'
    },
    {
      title: props.t('First Name'),
      dataIndex: 'firstName'
    },
    {
      title: props.t('Middle Name'),
      dataIndex: 'middleName'
    },
    {
      title: props.t('Last Name'),
      dataIndex: 'lastName'
    },
    {
      title: props.t('Valid From'),
      dataIndex: 'validFrom',
      render: (date) => moment(date).format('DD MMM YYYY') // Format date
    },
    {
      title: props.t('Valid To'),
      dataIndex: 'validTo',
      render: (date) => moment(date).format('DD MMM YYYY') // Format date
    },
    {
      title: props.t('Contract Type'),
      dataIndex: 'contractTypeData',
      render: (itm) => itm?.contractType || ''
    }
  ]

  if (!restrictPage) {
    columns.push({
      title: props.t('Action'),
      dataIndex: 'custom_action',
      render: (_, row) => (
        <Button onClick={() => tableActions(row)} className="btn glow dropdown-toggle">
          <EditOutlined />
        </Button>
      )
    })
  }

  useEffect(() => {
    console.log('currentEmployee', currentEmployee)
    if (currentEmployee?.id) {
      apiClient.get(`employees/hiring-details/get/${currentEmployee.id}`).then(({ status, data }) => {
        if (status === 200) {
          setDataSource(data.result)
        }
      })
    }
    const findActive = dataSource.find((x) => x.isActive)
    setActiveData(findActive)
  }, [currentEmployee?.id])

  const handleAddNewDetails = () => {
    setToggle(true)
    const lastIndex = dataSource.length - 1
    if (dataSource.length > 0) {
      setValues({
        employeeNo: dataSource[lastIndex].employeeNo,
        uniqueId: dataSource[lastIndex].uniqueId,
        title: dataSource[lastIndex].title,
        hireDate: new Date(),
        originalHireDate: new Date(),
        exitDate: new Date('9999-12-31'),
        firstName: dataSource[lastIndex].firstName,
        middleName: dataSource[lastIndex].middleName,
        lastName: dataSource[lastIndex].lastName,
        validFrom: moment(dataSource[lastIndex].validFrom),
        validTo: moment(dataSource[lastIndex].validTo),
        contractType: dataSource[lastIndex].contractTypeData.id,
        email: '',
        hireId: '',
        ...activeData
      })
    } else {
      setValues({
        employeeNo: '',
        uniqueId: '',
        title: '',
        hireDate: new Date(),
        originalHireDate: new Date(),
        exitDate: new Date('9999-12-31'),
        firstName: '',
        middleName: '',
        lastName: '',
        validFrom: new Date(),
        validTo: new Date('9999-12-31'),
        contractType: '',
        email: '',
        hireId: '',
        ...activeData
      })
    }
  }
  const handleValueChange = (val) => {
    setValues({ ...values, ...val })
  }

  const tableActions = (val) => {
    console.log('val', val)
    setValues({ ...values, ...val, hireId: val._id, email: props?.currentEmployee.email })
    setToggle(true)
  }

  const onSave = async () => {
    try {
      // Validate form
      await submitForm() // This should trigger Formik's validation

      console.log({ errors })
      // Check if there are any errors
      if (isEmpty(errors)) {
        const { id, ...rest } = values

        // Prepare the payload
        const payload = {
          employeeNo: rest?.employeeNo,
          uniqueId: rest?.uniqueId,
          hireDate: rest?.hireDate || null,
          originalHireDate: rest?.originalHireDate || null,
          exitDate: rest?.exitDate || null,
          title: rest?.title,
          firstName: rest?.firstName,
          middleName: rest?.middleName || null,
          lastName: rest?.lastName,
          validFrom: rest?.validFrom || null,
          validTo: rest?.validTo || null,
          contractType: rest?.contractType,
          employeeId: currentEmployee?._id,
          email: rest?.email
        }

        // Determine whether to update or create
        if (currentEmployee?._id) {
          // Update existing entry
          let data
          if (values.hireId) {
            data = await apiClient.put(`employees/update-hire/${values.hireId}`, payload)
          } else {
            data = await apiClient.post('employees/hiring-details', payload)
          }
          data = data.data

          if (data && data.result) {
            // getBankDetails()
            setToggle(false)
            onChangeEmployee(currentEmployee?._id)
          } else {
            console.error('Add failed')
          }
        } else {
          console.log('-')
          // Create new entry
          const { data } = await apiClient.post('employees/add', payload)
          if (data && data.result) {
            // getBankDetails()
            setToggle(false)
            history('/app/employees')
            console.log('new emp created')
          } else {
            console.error('Creting new employee failed')
          }
        }
      }
    } catch (error) {
      console.error('Error saving form:', error)
    }
  }
  return (
    <Form>
      <PanelLayout>
        <Panel
          title="Hiring Details"
          button={
            !restrictPage ? (
              <div className="align-right">
                <ButtonBox style={{ marginRight: 10 }} type="success" onClick={handleAddNewDetails}>
                  <i className="flaticon-plus" /> {props.t('Add')}
                </ButtonBox>
              </div>
            ) : null
          }>
          <div className="panel-with-border">
            <Row justify="left" gutter={(12, 10)}>
              <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 24 }}>
                <div className="table-view">
                  <TableBox
                    columns={columns}
                    actionIndex="custom_action"
                    cardHeaderIndex="status"
                    cardFirstLabelIndex="docno"
                    dataSource={dataSource}
                  />
                </div>
              </Col>
            </Row>
          </div>
        </Panel>
      </PanelLayout>
      <ModalBox
        title={`${props.t(values.hireId ? 'Edit' : 'Add')} ${props.t('Hiring Details')}`}
        visible={toggle}
        onCancel={() => {
          setToggle(false)
          resetForm()
        }}
        width={700}
        okText="Save"
        onOk={onSave}
        destroyOnClose>
        <HiringDetailsForm
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
      />
    </Form>
  )
}

export default withFormik({
  mapPropsToValues: () => ({
    employeeNo: '',
    uniqueId: '',
    hireDate: null,
    originalHireDate: null,
    exitDate: null,
    title: '',
    firstName: '',
    middleName: '',
    lastName: '',
    validFrom: null,
    validTo: null,
    contractType: '',
    email: ''
  }),

  handleSubmit: () => null,
  validationSchema: Schema
})(withTranslation()(HiringDetails))
