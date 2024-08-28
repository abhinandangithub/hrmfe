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
import InsuranceDetailsForm from './InsuranceDetailForm'

const Schema = Yup.object().shape({
  insuranceNo: Yup.string().required(),
  insurerName: Yup.string().required(),
  insuredName: Yup.string().required(),
  relationship: Yup.string().required(),
  attachments: Yup.array()
})

const InsuranceDetails = (props) => {
  const [toggle, setToggle] = useState(false)
  const [insuranceDetails, setInsuranceDetails] = useState([])
  const { currentEmployee, values, setValues, submitForm, errors, resetForm, history, restrictPage } = props

  useEffect(() => {
    if (currentEmployee?.id) {
      getInsuranceDetails()
    }
  }, [currentEmployee?.id])

  const getInsuranceDetails = () => {
    apiClient.get(`employee-details/insurance-details/get-all/${currentEmployee?.id}`).then(({ data }) => {
      if (data && data.result) {
        setInsuranceDetails(data.result)
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
      .put(`employee-details/insurance-details/update/${row.id}`, { status: 'Inactive' })
      .then(({ data }) => {
        if (data && data.result) {
          getInsuranceDetails()
          setToggle(false)
        }
      })
  }

  const onSave = () => {
    submitForm()

    if (isEmpty(errors)) {
      const { id, ...rest } = values
      const payload = {
        insuranceNo: rest?.insuranceNo,
        insuranceGrade: rest.insuranceGrade,
        insurerName: rest?.insurerName,
        insuredName: rest?.insuredName,
        relationship: rest?.relationship,
        attachments: rest?.attachments.filter((attachment) => attachment !== ''),
        employee: currentEmployee.id
      }

      if (id) {
        apiClient.put(`employee-details/insurance-details/update/${id}`, payload).then(({ data }) => {
          if (data && data.result) {
            getInsuranceDetails()
            setToggle(false)
          }
        })
      } else {
        apiClient.post('employee-details/insurance-details/add', payload).then(({ data }) => {
          if (data && data.result) {
            getInsuranceDetails()
            setToggle(false)
          }
        })
      }
    }
  }

  const columns = [
    {
      title: props.t('Insurance No'),
      dataIndex: 'insuranceNo'
    },
    {
      title: props.t('Insurance Grade'),
      dataIndex: 'insuranceGrade'
    },
    {
      title: props.t('Insurer Name'),
      dataIndex: 'insurerName'
    },
    {
      title: props.t('Insured Name'),
      dataIndex: 'insuredName'
    },
    {
      title: props.t('Relationship'),
      dataIndex: 'relationship'
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
        <Panel title={props.t('Insurance Details')}>
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
                    dataSource={insuranceDetails}
                  />
                </div>
              </Col>
            </Row>
          </div>
        </Panel>
      </PanelLayout>

      <ModalBox
        title={`${props.t(typeof toggle === 'object' ? 'Edit' : 'Add')} ${props.t('Insurance Details')}`}
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
        <InsuranceDetailsForm currentDetails={values} handleValueChange={handleValueChange} />
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
    insuranceNo: '',
    insuranceGrade: '',
    insurerName: '',
    insuredName: '',
    relationship: '',
    attachments: []
  }),
  handleSubmit: () => null,
  validationSchema: Schema
})(withTranslation()(InsuranceDetails))
