import { SettingOutlined } from '@ant-design/icons'
import { Col, message, Popconfirm, Popover, Row } from 'antd'
import { withFormik } from 'formik'
import { isEmpty } from 'lodash'
import { useEffect, useState } from 'react'
import { withTranslation } from 'react-i18next'
import * as Yup from 'yup'
import ButtonBox from '../../../Components/ButtonBox/ButtonBox'
import FooterActions from '../../../Components/FooterActions'
import { Form } from '../../../Components/Formik'
import ModalBox from '../../../Components/ModalBox/ModalBox'
import TableBox from '../../../Components/TableBox/TableBox'
import Panel from '../../../Layout/Panel'
import PanelLayout from '../../../Layout/PanelLayout'
import apiClient from '../../../Util/apiClient'
import BankDetailsForm from './BankDetailsForm'

const Schema = Yup.object().shape({
  bankName: Yup.string().required(),
  accNum: Yup.number().required(),
  branchName: Yup.string().required(),
  ifscCode: Yup.string().required(),
  type: Yup.string().required(),
  paymentElection: Yup.string().required(),
  attachments: Yup.array()
})

const BankDetails = (props) => {
  const [toggle, setToggle] = useState(false)
  const [bankDetails, setBankDetails] = useState([])
  const { currentEmployee, values, setValues, submitForm, errors, resetForm, history, restrictPage } = props

  useEffect(() => {
    if (currentEmployee?.id) {
      getBankDetails()
    }
  }, [currentEmployee?.id])

  const getBankDetails = () => {
    apiClient.get(`employee-details/bank-details/get-all/${currentEmployee?.id}`).then(({ data }) => {
      if (data && data.result) {
        setBankDetails(data.result)
      }
    })
  }

  const handleAddNewDetails = () => {
    if (currentEmployee?.id) {
      setToggle(true)
      setValues({
        bankName: '',
        accNum: '',
        branchName: '',
        ifscCode: '',
        type: '',
        attachments: [],
        paymentElection: 0
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
      .put(`employee-details/bank-details/update/${row.id}`, { status: 'Inactive' })
      .then(({ data }) => {
        if (data && data.result) {
          getBankDetails()
          setToggle(false)
        }
      })
  }

  const onSave = () => {
    submitForm()

    if (isEmpty(errors)) {
      const { id, ...rest } = values
      const payload = {
        bankName: rest?.bankName,
        accNum: rest?.accNum,
        branchName: rest?.branchName,
        ifscCode: rest?.ifscCode,
        type: rest?.type,
        attachments: rest?.attachments.filter((attachment) => attachment !== ''),
        paymentElection: rest?.paymentElection,
        employee: currentEmployee?.id
      }

      if (id) {
        apiClient.put(`employee-details/bank-details/update/${id}`, payload).then(({ data }) => {
          if (data && data.result) {
            getBankDetails()
            setToggle(false)
          }
        })
      } else {
        apiClient.post('employee-details/bank-details/add', payload).then(({ data }) => {
          if (data && data.result) {
            getBankDetails()
            setToggle(false)
          }
        })
      }
    }
  }

  const columns = [
    {
      title: props.t('Bank Name'),
      dataIndex: 'bankName'
    },
    {
      title: props.t('Account Number'),
      dataIndex: 'accNum'
    },
    {
      title: props.t('Branch Name'),
      dataIndex: 'branchName'
    },
    {
      title: props.t('SA Number'),
      dataIndex: 'ifscCode'
    },
    {
      title: props.t('Type'),
      dataIndex: 'type'
    },
    {
      title: `${props.t('Payment Election')} %`,
      dataIndex: 'paymentElection'
    },
    {
      title: props.t('Attachments'),
      dataIndex: 'attachments',
      render: (text) => text.map((attachment) => attachment.name).join(', ')
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
        <Panel title={props.t('Bank Details')}>
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
                    dataSource={bankDetails}
                  />
                </div>
              </Col>
            </Row>
          </div>
        </Panel>
      </PanelLayout>

      <ModalBox
        title={`${props.t(typeof toggle === 'object' ? 'Edit' : 'Add')} ${props.t('Bank Details')}`}
        visible={toggle}
        onCancel={() => {
          setToggle(false)
          resetForm()
        }}
        width={700}
        okText="Save"
        onOk={onSave}
        destroyOnClose>
        <BankDetailsForm currentDetails={values} handleValueChange={handleValueChange} />
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
    bankName: '',
    accNum: '',
    branchName: '',
    ifscCode: '',
    type: '',
    attachments: [],
    paymentElection: 0
  }),
  handleSubmit: () => null,
  validationSchema: Schema
})(withTranslation()(BankDetails))
