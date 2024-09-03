import { EllipsisOutlined } from '@ant-design/icons'
import { Col, message, Popover, Row } from 'antd'
import { withFormik } from 'formik'
import { useEffect, useState } from 'react'
import { useNavigate , useParams } from 'react-router-dom'
import * as Yup from 'yup'
import { getCountries } from '../../../Actions/UserAction'
import FooterActions from '../../../Components/FooterActions'
import { Field, Form } from '../../../Components/Formik'
import TableLayout from '../../../Layout/TableLayout'
import apiClient from '../../../Util/apiClient'
import { STATUS } from '../../../Util/Options'
import ProfitLossTemplate from './ProfitLossTemplate'

const AddPayrollDefinition = ({ values, setValues }) => {
  const history = useNavigate()
  const { id } = useParams()
  const [dataSource, setDataSource] = useState([
    {
      key: 0,
      type: 'Component',
      code: '',
      title: '',
      unit: '',
      value: '',
      formula: ''
    }
  ])
  const [countries, setCountries] = useState([])
  const [activePayrollComponentsOptions, setActivePayrollComponentsOptions] = useState([])

  const getPayrollDefinition = () => {
    apiClient.get(`payroll-definitions/getById/${id}`).then(({ data }) => {
      if (data && data.result) {
        setDataSource(data.result?.profitAndLoss || [])
        setValues(data.result)
      }
    })
  }

  useEffect(() => {
    if (id) {
      getPayrollDefinition()
    }

    getCountries().then((countries) => {
      if (countries) {
        setCountries(countries)
      }
    })

    getActivePayrollComponents()
  }, [])

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
      }
    } catch (error) {
      console.error('GET_ALL_PAYROLL_COMPONENTS_ERROR', error)
    }
  }

  const handleAdd = (ind) => {
    const newData = {
      key: dataSource.length,
      type: 'Component',
      code: '',
      title: '',
      unit: '',
      value: '',
      formula: ''
    }
    const newDataSource = [...dataSource]

    newDataSource.splice(ind, 0, newData)
    setDataSource(newDataSource.map((v, i) => ({ ...v, key: i })))
  }

  const handleSave = (row) => {
    const updatedDataSource = dataSource.map((v) => (v.key === row.key ? row : v))
    setDataSource(updatedDataSource)
  }

  const onDelete = (row) => {
    const updatedDataSource = dataSource.filter((v) => v.key !== row.key)
    setDataSource(updatedDataSource)
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
        {dataSource?.length > 1 && (
          <li onClick={() => onDelete(row)}>
            <i className="flaticon-delete-2" /> Delete
          </li>
        )}
      </ul>
    </div>
  )

  const onSave = async () => {
    if (id) {
      try {
        const { data } = await apiClient.put('payroll-definitions/update', {
          ...values,
          profitAndLoss: dataSource
        })

        if (!data.success) {
          message.error(data.message)
        }

        if (data.success && data.result) {
          message.success('Payroll Defintion updated successfully')
          getPayrollDefinition()
          setValues({ ...data.result })
        }
      } catch (error) {
        console.error('UPDATE_PAYROLL_DEFINITION_ERROR', error)
        message.error('Something went wrong')
      }
    } else {
      try {
        const { data } = await apiClient.post('payroll-definitions/add', {
          ...values,
          profitAndLoss: dataSource
        })

        if (!data.success) {
          message.error(data.message)
        }

        if (data.success && data.result) {
          message.success('Payroll Defintion created successfully')
          setDataSource(data.result?.profitAndLoss)
          setValues({ ...data.result })
          history('/app/payroll-definitions')
        }
      } catch (error) {
        console.error('ADD_PAYROLL_DEFINITION_ERROR', error)
        message.error('Something went wrong')
      }
    }
  }

  const columns = [
    {
      title: '',
      dataIndex: 'action',
      render: (_, row) => (
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
      editable: true,
      options: activePayrollComponentsOptions,
      align: 'right'
    },
    {
      title: 'Formula',
      dataIndex: 'formula',
      editable: true,
      align: 'right'
    }
  ]

  return (
    <div style={{ padding: '0px 20px 160px' }}>
      <TableLayout title="Organisation Payroll Definition">
        <Form style={{ width: '100%' }}>
          <Row gutter={[20, 10]}>
            <Col xs={24} md={12} lg={6}>
              <div className="form-field">
                <Field name="payrollName" label="Payroll Name" />
              </div>
            </Col>
            <Col xs={24} md={12} lg={8}>
              <div className="form-field">
                <Field as="textarea" name="payrollDesc" label="Payroll Description" />
              </div>
            </Col>
            <Col xs={24} md={12} lg={5}>
              <div className="form-field">
                <Field
                  as="select"
                  name="country"
                  label="Country"
                  options={countries.map((country) => ({
                    label: country.name,
                    value: country.code
                  }))}
                />
              </div>
            </Col>
            <Col xs={24} md={12} lg={5}>
              <div className="form-field">
                <Field as="select" name="status" label="Status" options={STATUS} />
              </div>
            </Col>
          </Row>
        </Form>

        <Row style={{ paddingTop: 10 }}>
          <Col xs={24} sm={24} md={24} lg={24}>
            <ProfitLossTemplate payrollDefinition={dataSource} columns={columns} handleSave={handleSave} />
          </Col>
        </Row>

        <FooterActions
          leftActions={[
            {
              prefix: 'flaticon-back',
              label: 'Back to Payroll Definitions',
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
  )
}

const payrollDefinitionSchema = Yup.object().shape({
  payrollName: Yup.string().required('Payroll Name is required'),
  payrollDesc: Yup.string(),
  country: Yup.string().required('Please select a country'),
  status: Yup.string().required('Please select a status')
})

export default withFormik({
  mapPropsToValues: () => ({
    payrollName: '',
    payrollDesc: '',
    country: '',
    status: 'Active'
  }),
  validationSchema: payrollDefinitionSchema
})(AddPayrollDefinition)
