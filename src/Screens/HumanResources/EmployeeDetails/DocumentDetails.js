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
import DocumentDetailsForm from './DocumentDetailsForm'

const Schema = Yup.object().shape({
  documentName: Yup.string().required(),
  attachments: Yup.array()
    .of(
      Yup.object().shape({
        name: Yup.string().required(),
        type: Yup.string().required(),
        size: Yup.number().required(),
        path: Yup.string().required()
      })
    )
    .required('Attachments are required')
    .min(1, 'At least one attachment is required')
})

const DocumentDetails = (props) => {
  const [toggle, setToggle] = useState(false)
  const [DocumentDetails, setDocumentDetails] = useState([])
  const { currentEmployee, values, setValues, submitForm, errors, resetForm, history } = props

  useEffect(() => {
    if (currentEmployee?.id) {
      getDocumentDetails()
    }
  }, [currentEmployee?.id])

  const getDocumentDetails = () => {
    apiClient.get(`employee-details/document-details/get-all/${currentEmployee?.id}`).then(({ data }) => {
      if (data && data.result) {
        setDocumentDetails(data.result)
      }
    })
  }

  const handleAddNewDetails = () => {
    if (currentEmployee?.id) {
      setToggle(true)
      setValues({
        documentName: '',
        documentType: '',
        signedDate: '',
        attachments: []
      })
    } else {
      message.error('Please select a document to continue!')
    }
  }

  const handleEditRow = (row) => () => {
    setToggle(row)
    console.log('handleEditRow', row)
    setValues({ ...row })
  }

  const handleValueChange = (val) => {
    setValues({ ...values, ...val })
  }

  const deleteRow = (row) => {
    apiClient
      .put(`employee-details/document-details/update/${row.id}`, { status: 'Inactive' })
      .then(({ data }) => {
        if (data && data.result) {
          getDocumentDetails()
          setToggle(false)
        }
      })
    setDocumentDetails(DocumentDetails.filter((d) => d.id === row.id))
  }
  const verifyRow = (row) => {
    const { id, ...rest } = row
    // const url = `${API_URL}/assets/${rest?.attachments?.[0]?.path}`
    const payload = {
      documentName: rest?.documentName,
      documentType: rest?.documentType,
      attachments: rest?.attachments.filter((attachment) => attachment !== ''),
      employee: currentEmployee?.id,
      email: currentEmployee.email,
      document: rest?.attachments?.[0]?.path,
      name: rest?.attachments?.[0]?.name
    }
    apiClient.post(`employee-details/document-details/verify/${id}`, payload).then(() => {
      getDocumentDetails()
    })
  }

  const onSave = () => {
    submitForm()

    if (isEmpty(errors)) {
      const { id, ...rest } = values
      const payload = {
        documentName: rest?.documentName,
        documentType: rest?.documentType,
        attachments: rest?.attachments.filter((attachment) => attachment !== ''),
        employee: currentEmployee?.id
      }

      if (id) {
        apiClient.put(`employee-details/document-details/update/${id}`, payload).then(({ data }) => {
          if (data && data.result) {
            getDocumentDetails()
            setToggle(false)
          }
        })
      } else {
        apiClient.post('employee-details/document-details/add', payload).then(({ data }) => {
          if (data && data.result) {
            getDocumentDetails()
            setToggle(false)
          }
        })
      }
    }
  }

  const columns = [
    {
      title: props.t('Name'),
      dataIndex: 'documentName'
    },
    {
      title: props.t('Email Sent'),
      dataIndex: 'sentDate',
      render: (text) => (text ? new Date(text)?.toLocaleDateString() : '')
    },
    {
      title: props.t('Signed Date'),
      dataIndex: 'signedDate'
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
          <Popconfirm title="Sure to delete?" onConfirm={() => deleteRow(row)}>
            <i className="flaticon-delete-2" /> {props.t('Delete')}
          </Popconfirm>
        </li>
        <li>
          <Popconfirm title="Sure to send?" onConfirm={() => verifyRow(row)}>
            <i className="flaticon-email" /> {props.t('Email')}
          </Popconfirm>
        </li>
      </ul>
    </div>
  )

  return (
    <Form>
      <PanelLayout>
        <Panel title={props.t('Document Details')}>
          <div className="panel-with-border">
            <Row justify="left" gutter={(12, 10)}>
              <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 24 }}>
                <div className="mb-3 align-right">
                  <ButtonBox style={{ marginRight: 10 }} type="success" onClick={handleAddNewDetails}>
                    <i className="flaticon-plus" /> {props.t('Add')}
                  </ButtonBox>
                  {/* <ButtonBox type="primary">
                    <i className="flaticon-delete-3" /> Delete{' '}
                  </ButtonBox> */}
                </div>
                <div className="table-view">
                  <TableBox
                    columns={columns}
                    actionIndex="custom_action"
                    cardHeaderIndex="status"
                    cardFirstLabelIndex="docno"
                    dataSource={DocumentDetails}
                  />
                </div>
              </Col>
            </Row>
          </div>
        </Panel>
      </PanelLayout>

      <ModalBox
        title={`${props.t(typeof toggle === 'object' ? 'Edit' : 'Add')} ${props.t('Document Details')}`}
        visible={toggle}
        onCancel={() => {
          setToggle(false)
          resetForm()
        }}
        width={700}
        okText="Save"
        onOk={onSave}
        destroyOnClose>
        <DocumentDetailsForm currentDetails={values} handleValueChange={handleValueChange} />
      </ModalBox>

      <FooterActions
        leftActions={[
          {
            prefix: 'flaticon-back',
            label: 'Back to employee list',
            onClick: () => history('/app/employees')
          }
        ]}
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
})(withTranslation()(DocumentDetails))
