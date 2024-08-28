import { SettingOutlined } from '@ant-design/icons'
import { Col, message, Popconfirm, Popover, Row } from 'antd'
import { withFormik } from 'formik'
import { isEmpty } from 'lodash'
import moment from 'moment'
import { useEffect, useState } from 'react'
import { withTranslation } from 'react-i18next'
import * as Yup from 'yup'
import { getSalaryHistoryDetailsByEmployeeID } from '../../../Actions/EmployeeActions'
import ButtonBox from '../../../Components/ButtonBox/ButtonBox'
import FooterActions from '../../../Components/FooterActions'
import { Form } from '../../../Components/Formik'
import ModalBox from '../../../Components/ModalBox/ModalBox'
import TableBox from '../../../Components/TableBox/TableBox'
import Panel from '../../../Layout/Panel'
import PanelLayout from '../../../Layout/PanelLayout'
import apiClient from '../../../Util/apiClient'
import SalaryHistoryForm from './SalaryHistoryForm'

const Schema = Yup.object().shape({
  payGrade: Yup.string().required(),
  annualBasicPay: Yup.number().required(),
  currency: Yup.string().required(),
  earnings: Yup.string().required(),
  from: Yup.date().required(),
  to: Yup.date().required()
})

const SalaryHistory = (props) => {
  const [toggle, setToggle] = useState(false)
  const [salaryHistory, setSalaryHistory] = useState([])
  const {
    currentEmployee,
    dispatch,
    values,
    setValues,
    submitForm,
    errors,
    resetForm,
    history,
    restrictPage
  } = props

  useEffect(() => {
    if (currentEmployee?.id) {
      dispatch(getSalaryHistoryDetailsByEmployeeID(currentEmployee.id))
    }
  }, [currentEmployee?.id])

  useEffect(() => {
    if (currentEmployee?.id) {
      getSalaryHistory()
    }
  }, [currentEmployee?.id])

  const getSalaryHistory = () => {
    apiClient.get(`employee-details/salary-history/get-all/${currentEmployee?.id}`).then(({ data }) => {
      if (data && data.result) {
        setSalaryHistory(data.result)
      }
    })
  }

  const handleAddNewDetails = () => {
    if (currentEmployee?.id) {
      setToggle(true)
      setValues({
        from: '',
        to: '',
        payGrade: '',
        annualBasicPay: '',
        currency: '',
        earnings: '',
        comment: '',
        deductions: ''
      })
    } else {
      message.error('Please select an employee to continue!')
    }
  }

  const handleEditRow = (row) => () => {
    setToggle(row)
    setValues({ ...row })
  }

  const handleValueChange = (val) => {
    setValues({ ...values, ...val })
  }

  const deleteRow = (row) => () => {
    apiClient
      .put(`employee-details/salary-history/update/${row.id}`, { status: 'Inactive' })
      .then(({ data }) => {
        if (data && data.result) {
          getSalaryHistory()
          setToggle(false)
        }
      })
  }

  const onSave = () => {
    submitForm()

    if (isEmpty(errors)) {
      const { id, ...rest } = values
      const payload = {
        category: rest.category,
        type: rest.type,
        payGrade: rest.payGrade,
        annualBasicPay: rest.annualBasicPay,
        currency: rest.currency,
        earnings: rest.earnings,
        comment: rest.comment,
        deductions: rest.deductions,
        employee: currentEmployee.id,
        from: rest.from,
        to: rest.to
      }

      if (id) {
        apiClient.put(`employee-details/salary-history/update/${id}`, payload).then(({ data }) => {
          if (data && data.result) {
            getSalaryHistory()
            setToggle(false)
          }
        })
      } else {
        apiClient.post('employee-details/salary-history/add', payload).then(({ data }) => {
          if (data && data.result) {
            getSalaryHistory()
            setToggle(false)
          }
        })
      }
    }
  }

  const columns = [
    {
      title: props.t('From Date'),
      dataIndex: 'from',
      render: (text) => moment(text).format('DD-MMM-YYYY')
    },
    {
      title: props.t('To Date'),
      dataIndex: 'to',
      render: (text) => moment(text).format('DD-MMM-YYYY')
    },
    {
      title: props.t('Category'),
      dataIndex: 'category'
    },
    {
      title: props.t('Type'),
      dataIndex: 'type'
    },
    {
      title: props.t('Pay Grade'),
      dataIndex: 'payGrade'
    },
    {
      title: props.t('Annual Basic Payment'),
      dataIndex: 'annualBasicPay'
    },
    {
      title: props.t('Currency'),
      dataIndex: 'currency'
    },
    {
      title: props.t('Earnings'),
      dataIndex: 'earnings'
    },
    {
      title: props.t('Deductions'),
      dataIndex: 'deductions'
    },
    {
      title: props.t('Comment'),
      dataIndex: 'comment'
    },
    {
      title: props.t('Action'),
      dataIndex: 'custom_action',
      render: (text, row) => (
        <Popover placement="bottomRight" content={tableActions(row)} trigger="click">
          <div className="btn-group">
            <button type="button" className="btn glow dropdown-toggle">
              {' '}
              <SettingOutlined /> <span className="caret" />
            </button>
          </div>
        </Popover>
      )
    }
  ]

  const tableActions = (row) => (
    <div className="action-buttons">
      <ul>
        <li onClick={handleEditRow(row)}>
          <i className="flaticon-edit-1" /> {props.t('Edit')}
        </li>
        <li>
          <Popconfirm title="Sure to delete?" onConfirm={deleteRow(row)}>
            <i className="flaticon-delete-2" /> {props.t('Delete')}
          </Popconfirm>
        </li>
      </ul>
    </div>
  )

  return (
    <Form>
      <PanelLayout>
        <Panel title={props.t('Salary History')}>
          <div className="panel-with-border">
            <Row justify="left" gutter={(12, 10)}>
              <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 24 }}>
                <div className="mb-3 align-right">
                  <ButtonBox style={{ marginRight: 10 }} type="success" onClick={handleAddNewDetails}>
                    <i className="flaticon-plus" /> {props.t('Add')}
                  </ButtonBox>
                  {/* <ButtonBox type="primary">
                    {' '}
                    <i className="flaticon-delete-3" /> Delete{' '}
                  </ButtonBox> */}
                </div>
                <div className="table-view">
                  <TableBox
                    columns={columns}
                    actionIndex="custom_action"
                    cardHeaderIndex="status"
                    cardFirstLabelIndex="docno"
                    dataSource={salaryHistory}
                  />
                </div>
              </Col>
            </Row>
          </div>
        </Panel>
      </PanelLayout>

      <ModalBox
        title={`${props.t(typeof toggle === 'object' ? 'Edit' : 'Add')} ${props.t('Salary History Details')}`}
        visible={toggle}
        onCancel={() => {
          setToggle(false)
          resetForm()
        }}
        width={700}
        okText={props.t('Save')}
        cancelText={props.t('Cancel')}
        onOk={onSave}
        destroyOnClose>
        <SalaryHistoryForm currentDetails={values} handleValueChange={handleValueChange} />
      </ModalBox>

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
      />
    </Form>
  )
}

export default withFormik({
  mapPropsToValues: () => ({
    from: '',
    to: '',
    payGrade: '',
    annualBasicPay: '',
    currency: '',
    earnings: '',
    comment: '',
    deductions: ''
  }),
  handleSubmit: () => null,
  validationSchema: Schema
})(withTranslation()(SalaryHistory))
