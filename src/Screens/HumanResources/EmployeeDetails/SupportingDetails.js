import { SettingOutlined } from '@ant-design/icons'
import { Col, message, Popover, Row } from 'antd'
import { withFormik } from 'formik'
import { isEmpty } from 'lodash'
import moment from 'moment'
import { useEffect, useState } from 'react'
import { useTranslation, withTranslation } from 'react-i18next'
import * as Yup from 'yup'
import ButtonBox from '../../../Components/ButtonBox/ButtonBox'
import FooterActions from '../../../Components/FooterActions'
import { Form } from '../../../Components/Formik'
import ModalBox from '../../../Components/ModalBox/ModalBox'
import TableBox from '../../../Components/TableBox/TableBox'
import { useSelector } from '../../../Hooks/redux'
import Panel from '../../../Layout/Panel'
import PanelLayout from '../../../Layout/PanelLayout'
import apiClient from '../../../Util/apiClient'
import SupportingDetailsForm from './SupportingDetailsForm'

const Schema = Yup.object().shape({
  attachments: Yup.array().required(),
  docType: Yup.string().required()
})

const SupportingDetails = (props) => {
  const { t } = useTranslation()
  const [toggle, setToggle] = useState(false)

  const [DSupportingDetails, setDSupportingDetails] = useState([])

  const { employeeId, values, setValues, submitForm, errors, resetForm } = props

  const { companyInfo } = useSelector((state) => state.users)

  useEffect(() => {
    if (employeeId) {
      getDetails()
    }
  }, [employeeId])

  const getDetails = () => {
    apiClient.get('/supporting-documents/get', { params: { employeeId } }).then(({ data }) => {
      if (data && data.result) {
        setDSupportingDetails(data.result)
      }
    })
  }

  const handleAddNewDetails = () => {
    if (employeeId) {
      setToggle(true)
      setValues({
        validFrom: '',
        validTo: '',
        docType: '',
        attachments: [],
        number: ''
      })
    } else {
      message.error('Please select an employee to continue!')
    }
  }

  const handleEditRow = (row) => () => {
    setToggle(row)
    setValues({ ...row })
  }

  const handleDeleteRow = (row) => () => {
    apiClient.delete(`supporting-documents/delete/${row.id}`).then(({ data }) => {
      if (data.success === true) {
        getDetails()
      }
    })
  }

  const handleValueChange = (val) => {
    setValues({ ...values, ...val })
  }

  //   const deleteRow = (row) => () => {
  //     apiClient
  //       .put(`employee-details/bank-details/update/${row.id}`, { status: 'Inactive' })
  //       .then(({ data }) => {
  //         if (data && data.result) {
  //           getBankDetails()
  //           setToggle(false)
  //         }
  //       })
  //   }

  const onSave = () => {
    submitForm()

    if (isEmpty(errors)) {
      const { id, ...rest } = values
      const payload = {
        notes: rest?.notes,
        docType: rest?.docType,
        number: rest?.number,
        validFrom: rest?.validFrom,
        validTo: rest?.validTo,
        attachments: rest?.attachments.filter((attachment) => attachment !== ''),
        saveReportsInDMS: companyInfo.configurations.saveReportsInDMS === 'Yes'
      }

      if (values.id) {
        apiClient.put(`supporting-documents/update/${values.id}`, payload).then(({ data }) => {
          if (data && data.result) {
            getDetails()
            setToggle(false)
          }
        })
      } else {
        apiClient.post('supporting-documents/add', { ...payload, employeeId }).then(({ data }) => {
          if (data && data.result) {
            setToggle(false)
            getDetails()
          }
        })
      }
    }
  }

  const columns = [
    {
      title: props.t('Doc Type'),
      dataIndex: 'docType'
    },
    {
      title: props.t('Number'),
      dataIndex: 'number',
      render: (v) => v || '-'
    },
    {
      title: props.t('Valid From'),
      dataIndex: 'validFrom',
      render: (text) => (text ? moment(text).format('DD-MMM-YYYY') : '-')
    },
    {
      title: props.t('Valid To'),
      dataIndex: 'validTo',
      render: (text) => (text ? moment(text).format('DD-MMM-YYYY') : '-')
    },
    {
      title: props.t('Attachments'),
      dataIndex: 'attachments',
      render: (text) => text.map((attachment) => attachment.name).join(', ')
    },
    {
      title: props.t('Attachments'),
      dataIndex: 'notes',
      render: (v) => v || '-'
    },
    {
      title: props.t('Action'),
      dataIndex: 'custom_action',
      render: (text, row) => (
        <div>
          {props.editable && (
            <Popover placement="bottomRight" content={tableActions(row)} trigger="click">
              <div className="btn-group">
                <button type="button" className="btn glow dropdown-toggle">
                  <SettingOutlined /> <span className="caret" />
                </button>
              </div>
            </Popover>
          )}
        </div>
      )
    }
  ]

  const tableActions = (row) => (
    <div className="action-buttons">
      <ul>
        <li onClick={handleEditRow(row)}>
          <i className="flaticon-edit-1" /> {props.t('Edit')}
        </li>
        <li onClick={handleDeleteRow(row)}>
          <i className="flaticon-delete-2" /> {props.t('Delete')}
        </li>
      </ul>
    </div>
  )

  return (
    <Form>
      <PanelLayout>
        <Panel title={t('Supporting Documents')}>
          <div className="panel-with-border">
            <Row justify="left" gutter={(12, 10)}>
              <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 24 }}>
                <div className="mb-3 align-right">
                  {props.editable && (
                    <ButtonBox style={{ marginRight: 10 }} type="success" onClick={handleAddNewDetails}>
                      <i className="flaticon-plus" /> {props.t('Add')}
                    </ButtonBox>
                  )}
                </div>
                <div className="table-view">
                  <TableBox
                    columns={columns}
                    actionIndex="custom_action"
                    cardHeaderIndex="status"
                    cardFirstLabelIndex="docno"
                    dataSource={DSupportingDetails}
                  />
                </div>
              </Col>
            </Row>
          </div>
        </Panel>
      </PanelLayout>

      <ModalBox
        title={`${typeof toggle === 'object' ? 'Edit' : 'Add'} Supporting Documents`}
        visible={toggle}
        onCancel={() => {
          setToggle(false)
          resetForm()
        }}
        width={700}
        okText="Save"
        onOk={onSave}
        destroyOnClose>
        <SupportingDetailsForm currentDetails={values} handleValueChange={handleValueChange} />
      </ModalBox>

      <FooterActions
        leftActions={[
          {
            prefix: 'flaticon-back',
            label: props.t('Back to employee list')
          }
        ]}
      />
    </Form>
  )
}

export default withFormik({
  mapPropsToValues: () => ({
    validFrom: '',
    validTo: '',
    docType: '',
    attachments: [],
    number: '',
    notes: ''
  }),
  handleSubmit: () => null,
  validationSchema: Schema
})(withTranslation(SupportingDetails))
