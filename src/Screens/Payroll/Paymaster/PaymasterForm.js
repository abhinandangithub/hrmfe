import { EllipsisOutlined } from '@ant-design/icons'
import { Button, Col, message, Modal, Popover, Row, Tabs } from 'antd'
import { withFormik } from 'formik'
import _, { isEmpty } from 'lodash'
import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import * as Yup from 'yup'
import FooterActions from '../../../Components/FooterActions'
import { Field, Form } from '../../../Components/Formik'
import TableLayout from '../../../Layout/TableLayout'
import apiClient from '../../../Util/apiClient'
import { STATUS } from '../../../Util/Options'
import { convertSelectOptions, GET_DATA, SET_DATA } from '../../../Util/Util'
import ProfitLossTemplate from '../PayrollDefinitions/ProfitLossTemplate'
import EmployeePayrollComponents from './EmployeePayrollComponents'
import GeneratePayslip from './GeneratePayslip'

function PaymasterForm({
  setValues,
  values,
  validateForm,
  setFieldValue,
  errors,
  submitForm,
  match: {
    params: { id }
  }
}) {
  const history = useHistory()
  const [openPayslipModal, setOpenPayslipModal] = useState(false)
  const [payrollDefinition, setPayrollDefinition] = useState([])
  const [payrollComponents, setPayrollComponents] = useState([])
  const [activePayrollComponentsOptions, setActivePayrollComponentsOptions] = useState([])
  const [employeesOptions, setEmployeesOptions] = useState([])
  const [payrollDefinitionsOptions, setPayrollDefinitonsOptions] = useState([])
  const cacheData = GET_DATA('employeePayroll')
  const [activeTab, setActiveTab] = useState(cacheData?.activeTab || 'payrollDefinition')
  const [currencies, setCurrencies] = useState([])

  const onChangeTab = (activeTab) => {
    SET_DATA('employeePayroll.activeTab', activeTab)
    setActiveTab(activeTab)
  }

  const getEmployeePaymaster = async () => {
    if (id) {
      try {
        const { data } = await apiClient.get(`employeePayMasters/byId/${id}`)

        if (data.result) {
          setValues({
            ...data.result,
            email: data.result?.employeeData?.email,
            role: data.result.role,
            joiningDate: data.result?.employeeData?.joiningDate,
            payrollDesc: data.result?.payrollDefinitionData?.payrollDesc,
            country: data.result?.payrollDefinitionData?.country
          })
          setEmployeesOptions([
            {
              label: `${data.result.employeeData.employeeNo} ${data.result.employeeData.name}`,
              value: data.result.user
            }
          ])
          setPayrollDefinitonsOptions([
            {
              label: `${data.result.payrollDefinitionData.payrollId} ${data.result.payrollDefinitionData.payrollName}`,
              value: data.result.payrollDefinitionData._id
            }
          ])
          setPayrollDefinition(data.result.payrollDefinition)
          setPayrollComponents(data.result.payrollComponents)
        }
      } catch (error) {
        console.error('GET_EMPLOYEE_PAYMASTER_ERROR', error)
      }
    } else {
      try {
        const { data } = await apiClient.get('employees/get-active')

        if (data && data.result) {
          setEmployeesOptions(convertSelectOptions(data.result || [], ['employeeNo', 'name'], 'user'))
        }
      } catch (error) {
        console.error('GET_EMPLOYEES_ERROR', error)
      }

      try {
        const { data } = await apiClient.get('payroll-definitions/getActive')

        if (data && data.result) {
          setPayrollDefinitonsOptions(
            convertSelectOptions(data.result || [], ['payrollId', 'payrollName'], 'id')
          )
        }
      } catch (error) {
        console.error('GET_PAYROLL_DEFINITIONS_ERROR', error)
      }
    }

    getActivePayrollComponents()
  }

  const getActivePayrollComponents = async () => {
    try {
      const { data } = await apiClient.get('/payroll-components/getActive')

      if (!data.success) {
        message.error(data.message)
      }

      if (data.result) {
        setActivePayrollComponentsOptions(
          data.result.map((component) => ({ label: component.key, value: component.key }))
        )
        setPayrollComponents((prevState) => _.uniqBy([...prevState, ...(data.result || [])], 'key'))
      }
    } catch (error) {
      console.error('GET_ALL_PAYROLL_COMPONENTS_ERROR', error)
    }
  }

  useEffect(() => {
    getEmployeePaymaster()

    apiClient.get('currencies/getAllActive').then(({ data }) => {
      if (data && data.result) {
        const currencyOptions = data.result.map((val) => {
          val.label = `${val.code} - ${val.name}`
          val.value = val.code

          return val
        })
        setCurrencies(currencyOptions)
      }
    })
  }, [])

  const onSave = async () => {
    await validateForm()
    submitForm()

    if (isEmpty(errors)) {
      if (id) {
        try {
          const { data } = await apiClient.put(`employeePayMasters/update/${id}`, {
            ...values,
            payrollDefinition,
            payrollComponents
          })

          if (!data.success) {
            message.error(data.message)
          }

          if (data.success) {
            message.success('Updated employee paymaster successfully')
            getEmployeePaymaster()
          }
        } catch (error) {
          console.error('EDIT_EMPLOYEE_PAYMASTER_ERROR', error)
        }
      } else {
        try {
          const { data } = await apiClient.post('employeePayMasters/add', {
            ...values,
            payrollDefinition,
            payrollComponents
          })

          if (!data.success) {
            message.error(data.message)
          }

          if (data.success) {
            message.success('Added employee paymaster successfully')
            history.push('/app/paymaster')
          }
        } catch (error) {
          console.error('ADD_EMPLOYEE_PAYMASTER_ERROR', error)
        }
      }
    }
  }

  const getEmployyePayrollId = async (userId, employeeNo) => {
    try {
      const { data } = await apiClient.post('/employeePayMasters/get-employee-payroll-id', { userId })

      if (!data.success) {
        message.error(data.message)
      }

      if (data.result) {
        setFieldValue('employeePayrollId', `${employeeNo}/${data.result?.employeePayrollIdCount + 1}`)
      }
    } catch (error) {
      console.error('GET_EMPLOYEE_PAYROLL_ID_ERROR', error)
      message.error('Something went wrong')
    }
  }

  const handleAdd = (ind) => {
    const newData = {
      key: payrollDefinition.length,
      type: 'Component',
      code: '',
      title: '',
      unit: '',
      value: '',
      formula: ''
    }
    const newDataSource = [...payrollDefinition]

    newDataSource.splice(ind, 0, newData)
    setPayrollDefinition(newDataSource.map((v, i) => ({ key: i, ...v })))
  }

  const handleSave = (row) => {
    const updatedDataSource = payrollDefinition.map((v) => (v.key === row.key ? row : v))
    setPayrollDefinition(updatedDataSource)
  }

  const handlePayrollComponentsSave = (components) => {
    setPayrollComponents(components)
  }

  const onDelete = (row) => {
    const updatedDataSource = payrollDefinition.filter((v) => v.key !== row.key)
    setPayrollDefinition(updatedDataSource)
  }

  const tableContent = (row) => (
    <div className="action-buttons">
      <ul>
        <li onClick={() => handleAdd(row.key)}>
          <i className="flaticon-plus" /> Add Before
        </li>
        <li onClick={() => handleAdd(row.key + 1)}>
          <i className="flaticon-plus" /> Add After
        </li>
        {payrollDefinition?.length > 1 && (
          <li onClick={() => onDelete(row)}>
            <i className="flaticon-delete-2" /> Delete
          </li>
        )}
      </ul>
    </div>
  )

  const columns = [
    {
      title: '',
      dataIndex: 'action',
      render: (rec, row) => (
        <Popover placement="rightTop" content={tableContent(row)} trigger="click">
          <div className="btn-group">
            <button type="button" className="btn glow dropdown-toggle">
              <EllipsisOutlined />
            </button>
          </div>
        </Popover>
      ),
      width: 50
    },
    {
      title: 'Type',
      dataIndex: 'type',
      editable: true,
      options: [
        { label: 'Heading', value: 'Heading' },
        { label: 'Component', value: 'Component' },
        { label: 'Calculation', value: 'Calculation' }
      ]
    },
    {
      title: 'Code',
      dataIndex: 'code',
      editable: true
    },
    {
      title: 'Title',
      dataIndex: 'title',
      editable: true
    },
    {
      title: 'Unit',
      dataIndex: 'unit',
      editable: true,
      options: activePayrollComponentsOptions,
      align: 'right'
    },
    {
      title: 'Value',
      dataIndex: 'value',
      options: activePayrollComponentsOptions,
      editable: true,
      align: 'right'
    },
    {
      title: 'Formula',
      dataIndex: 'formula',
      editable: true,
      options: [],
      align: 'right',
      render: (v) => (typeof v === 'object' ? v.join(', ') : v)
    }
  ]

  return (
    <>
      <Form>
        <div style={{ padding: 20, paddingBottom: 150 }}>
          <TableLayout
            title="Employee Paymaster"
            rightSection={
              <Button
                onClick={() => setOpenPayslipModal(true)}
                type="success"
                style={{
                  marginBottom: 16
                }}>
                <i className="flaticon-writing" />
                View Payslip
              </Button>
            }>
            <div className="panel-design">
              <div className="panel-body">
                <Row gutter={[20, 10]} style={{ padding: '8px 0' }}>
                  <Col xs={24} sm={24} md={12} lg={5}>
                    <div className="form-field">
                      <Field
                        as="select"
                        name="user"
                        label="Employee"
                        placeholder="Select Employee"
                        options={employeesOptions}
                        onChange={(name, value, option) => {
                          setFieldValue('employeeNo', option.employeeNo)
                          setFieldValue('name', option.name)
                          getEmployyePayrollId(option.user, option.employeeNo)
                          setFieldValue('email', option.email)
                          setFieldValue('role', option?.roleData?.name)
                          setFieldValue('joiningDate', option?.joiningDate)
                          setFieldValue(name, value)
                        }}
                        disabled={id}
                      />
                    </div>
                  </Col>
                  <Col xs={24} sm={24} md={12} lg={5}>
                    <div className="form-field">
                      <Field name="email" label="Email" placeholder="Email" disabled />
                    </div>
                  </Col>
                  <Col xs={24} sm={24} md={12} lg={4}>
                    <div className="form-field">
                      <Field name="role" label="Role" placeholder="Role" disabled />
                    </div>
                  </Col>
                  <Col xs={24} sm={24} md={12} lg={5}>
                    <div className="form-field">
                      <Field
                        as="date"
                        name="joiningDate"
                        label="Joining Date"
                        placeholder="Joining Date"
                        disabled
                      />
                    </div>
                  </Col>
                  <Col xs={24} sm={24} md={12} lg={5}>
                    <div className="form-field">
                      <Field
                        name="employeePayrollId"
                        label="Employee Payroll ID"
                        placeholder="Employee Payroll ID"
                        disabled
                      />
                    </div>
                  </Col>
                </Row>

                <Row gutter={[20, 10]} style={{ padding: '8px 0' }}>
                  <Col xs={24} sm={24} md={12} lg={4}>
                    <div className="form-field">
                      <Field
                        as="select"
                        name="payrollDefinitionId"
                        label="Payroll ID/Name"
                        placeholder="Select Payroll"
                        required
                        options={payrollDefinitionsOptions}
                        onChange={(name, value, option) => {
                          setFieldValue('payrollId', option.payrollId)
                          setFieldValue('payrollName', option.payrollName)
                          setFieldValue('payrollDesc', option.payrollDesc)
                          setFieldValue('country', option.country)
                          setPayrollDefinition(option.profitAndLoss)
                          setFieldValue(name, value)
                        }}
                        disabled={id}
                      />
                    </div>
                  </Col>
                  <Col xs={24} sm={24} md={12} lg={4}>
                    <div className="form-field">
                      <Field
                        as="textarea"
                        name="payrollDesc"
                        placeholder="Payroll Description"
                        label="Payroll Description"
                        disabled
                      />
                    </div>
                  </Col>
                  <Col xs={24} sm={24} md={12} lg={3}>
                    <div className="form-field">
                      <Field name="country" label="Country" placeholder="Country" disabled />
                    </div>
                  </Col>
                  <Col xs={24} sm={24} md={12} lg={3}>
                    <div className="form-field">
                      <Field as="select" name="status" label="Status" placeholder="Status" options={STATUS} />
                    </div>
                  </Col>
                  <Col xs={24} sm={24} md={12} lg={3}>
                    <div className="form-field">
                      <Field
                        as="date"
                        name="validFrom"
                        label="Valid From"
                        placeholder="Valid From"
                        disabledDate={(d) => !d || d.isAfter(values.validTo)}
                        format="YYYY-MM-DD"
                      />
                    </div>
                  </Col>
                  <Col xs={24} sm={24} md={12} lg={3}>
                    <div className="form-field">
                      <Field
                        as="date"
                        name="validTo"
                        label="Valid To"
                        placeholder="Valid To"
                        disabledDate={(d) => !d || d.isBefore(values.validFrom)}
                        format="YYYY-MM-DD"
                      />
                    </div>
                  </Col>
                  <Col xs={24} md={12} lg={4}>
                    <div className="form-field">
                      <Field
                        label="Currency"
                        name="currency"
                        placeholder="Select currency"
                        as="select"
                        options={currencies}
                      />
                    </div>
                  </Col>
                </Row>
              </div>
            </div>
            <Tabs defaultActiveKey={activeTab} onChange={onChangeTab}>
              <Tabs.TabPane tab="Payroll Definition" key="payrollDefinition" />
              <Tabs.TabPane tab="Payroll Components" key="payrollComponents" />
            </Tabs>
            <Row gutter={[20, 10]} style={{ padding: '0 8px' }}>
              {activeTab === 'payrollDefinition' && (
                <ProfitLossTemplate
                  payrollDefinition={payrollDefinition}
                  columns={columns}
                  handleSave={handleSave}
                />
              )}
              {activeTab === 'payrollComponents' && (
                <EmployeePayrollComponents
                  payrollComponents={payrollComponents}
                  handlePayrollComponentsSave={handlePayrollComponentsSave}
                />
              )}
            </Row>

            <FooterActions
              leftActions={[
                {
                  prefix: 'flaticon-back',
                  label: 'Back to Paymaster',
                  onClick: () => history.goBack()
                }
              ]}
              centerActions={[
                {
                  prefix: 'flaticon-writing',
                  label: id ? 'Update' : 'Save',
                  onClick: onSave
                }
              ]}
            />
          </TableLayout>
        </div>
      </Form>
      <Modal
        closable
        footer={null}
        visible={openPayslipModal}
        title="Payslip View"
        width="80%"
        onCancel={() => setOpenPayslipModal(false)}
        destroyOnClose>
        <GeneratePayslip
          payrollDefinition={payrollDefinition}
          payrollComponents={payrollComponents}
          employeeDetails={values}
        />
      </Modal>
    </>
  )
}

const Schema = Yup.object().shape({
  user: Yup.string().required('Please select a user'),
  employeePayrollId: Yup.string().required('Employee Payroll ID is required'),
  payrollDefinitionId: Yup.string().required('Please select a payroll definition'),
  status: Yup.string().required(),
  validFrom: Yup.date()
    .max(Yup.ref('validTo'), 'Should not exceed valid to date')
    .required('Please select a valid from date'),
  validTo: Yup.date()
    .min(Yup.ref('validFrom'), 'Should not be less than valid from date')
    .required('Please select a valid to date'),
  currency: Yup.string().required('Please select currency')
})

export default withFormik({
  mapPropsToValues: () => ({
    user: '',
    employeePayrollId: '',
    payrollDefinitionId: '',
    status: 'Active',
    validFrom: '',
    validTo: '',
    role: '',
    joiningDate: '',
    payrollDesc: '',
    country: '',
    currency: ''
  }),
  validationSchema: Schema,
  handleSubmit: () => null
})(PaymasterForm)
