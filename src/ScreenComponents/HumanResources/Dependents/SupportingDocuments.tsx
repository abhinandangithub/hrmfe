import { SettingOutlined } from '@ant-design/icons'
import { Col, message, Popover, Row } from 'antd'
import { FormikProps, withFormik } from 'formik'
import { TFunction } from 'i18next'
import { isEmpty } from 'lodash'
import moment from 'moment'
import { useEffect, useState } from 'react'
import { withTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import * as Yup from 'yup'
import ButtonBox from '../../../Components/ButtonBox/ButtonBox'
import Form from '../../../Components/Formik/Form'
import ModalBox from '../../../Components/ModalBox/ModalBox'
import TableBox from '../../../Components/TableBox/TableBox'
import { IAttachment, IDependent, IDependentSupportingDoc } from '../../../Interfaces/IDependent'
import Panel from '../../../Layout/Panel'
import PanelLayout from '../../../Layout/PanelLayout'
import apiClient from '../../../Util/apiClient'
import { DEPENDENT_DOC_TYPES } from '../../../Util/Options'
import { convertSelectOptions } from '../../../Util/Util'
import SupportingDocumentForm from './SupportingDocumentForm'

const Schema = Yup.object().shape({
  dependentId: Yup.string().required(),
  docType: Yup.string().required(),
  docNumber: Yup.string().required(),
  validFrom: Yup.date().nullable().required(),
  validTo: Yup.date().nullable().required(),
  attachments: Yup.array().required()
})

type TSupportingDocumentsProps = {
  dependents: IDependent[]
}

type TProps = FormikProps<TSupportingDocumentsFormValues> &
  TSupportingDocumentsProps & { t: TFunction<'translation', undefined> }

const SupportingDocuments = (props: TProps) => {
  const { dependents, values, errors, setValues, submitForm, resetForm } = props
  const [toggle, setToggle] = useState(false)
  const [editDependentDoc, setEditDependentDoc] = useState<IDependentSupportingDoc | null>(null)
  const { id: employeeId } = useParams<{ id: string }>()
  const [allDependentsSupportingDocs, setAllDependentSupportingDocs] = useState<IDependentSupportingDoc[]>([])

  useEffect(() => {
    if (employeeId) {
      getDetails()
    }
  }, [employeeId])

  const getDetails = () => {
    apiClient
      .get(`/employee-details/dependents/other-supporting-docs/get-all/${employeeId}`)
      .then(({ data }) => {
        if (data && data.result) {
          setAllDependentSupportingDocs(data.result)
        }
      })
  }

  const handleAddNewDetails = () => {
    if (employeeId) {
      setToggle(true)
    } else {
      message.error('Please select an employee to continue!')
    }
  }

  const handleEditRow = (dependentDoc: IDependentSupportingDoc) => {
    setEditDependentDoc(dependentDoc)
    setValues({ ...dependentDoc })
    setToggle(true)
  }

  const handleDeleteRow = (dependentDoc: IDependentSupportingDoc) => {
    apiClient
      .delete(`/employee-details/dependents/other-supporting-docs/delete/${dependentDoc.id}`)
      .then(({ data }) => {
        if (data.success === true) {
          message.success('Dependent document has been deleted successfully.')
          getDetails()
        }
      })
  }

  const handleValueChange = (val: TSupportingDocumentsFormValues) => {
    setValues({ ...values, ...val })
  }

  const onSave = () => {
    submitForm()
    console.log(values, errors)

    if (isEmpty(errors)) {
      const payload = {
        ...values
        // saveReportsInDMS: companyInfo.configurations.saveReportsInDMS === 'Yes' ??? What is this? And should we consider this here?
      }

      if (editDependentDoc) {
        apiClient
          .put(`/employee-details/dependents/other-supporting-docs/update/${editDependentDoc.id}`, payload)
          .then(({ data }) => {
            if (data && data.result) {
              setToggle(false)
              resetForm()
              message.success('Dependent document has been updated successfully.')
              getDetails()
            }
          })
      } else {
        apiClient
          .post('/employee-details/dependents/other-supporting-docs/add', { ...payload, employeeId })
          .then(({ data }) => {
            if (data && data.result) {
              resetForm()
              setToggle(false)
              message.success('Dependent document has been added successfully.')
              getDetails()
            }
          })
      }
    }
  }

  const columns = [
    {
      title: props.t('Name'),
      dataIndex: 'name',
      render: (_: unknown, dependentDoc: IDependentSupportingDoc) => dependentDoc?.dependentInfo?.name
    },
    {
      title: props.t('Relationship'),
      dataIndex: 'relationship',
      render: (_: unknown, dependentDoc: IDependentSupportingDoc) => dependentDoc?.dependentInfo?.relationship
    },
    {
      title: props.t('Doc Type'),
      dataIndex: 'docType',
      render: (value: string) =>
        DEPENDENT_DOC_TYPES.find((doc) => doc.value.toLowerCase() === value.toLowerCase())?.label
    },
    {
      title: props.t('ID Number'),
      dataIndex: 'docNumber'
    },
    {
      title: props.t('Valid From'),
      dataIndex: 'validFrom',
      render: (text: Date) => (text ? moment(text).format('DD-MMM-YYYY') : '')
    },
    {
      title: props.t('Valid To'),
      dataIndex: 'validTo',
      render: (text: Date) => (text ? moment(text).format('DD-MMM-YYYY') : '')
    },
    {
      title: props.t('Attachments'),
      dataIndex: 'attachments',
      render: (text: IAttachment[]) => text.map((attachment) => attachment.name).join(', ')
    },
    {
      title: props.t('Action'),
      dataIndex: 'custom_action',
      render: (_: unknown, dependentDoc: IDependentSupportingDoc) => (
        <Popover placement="bottomRight" content={tableActions(dependentDoc)} trigger="click">
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

  const tableActions = (dependentDoc: IDependentSupportingDoc) => (
    <div className="action-buttons">
      <ul>
        <li onClick={() => handleEditRow(dependentDoc)}>
          <i className="flaticon-edit-1" /> {props.t('Edit')}
        </li>
        <li onClick={() => handleDeleteRow(dependentDoc)}>
          <i className="flaticon-delete-2" /> {props.t('Delete')}
        </li>
      </ul>
    </div>
  )

  return (
    <Form>
      <PanelLayout>
        <Panel title={props.t('Supporting IDs')}>
          <div style={{ position: 'absolute', top: -40, right: 15 }}>
            <ButtonBox style={{ marginRight: 10 }} type="success" onClick={handleAddNewDetails}>
              <i className="flaticon-plus" /> {props.t('Add')}
            </ButtonBox>
          </div>
          <div className="panel-with-border">
            <Row justify="start" gutter={[12, 10]}>
              <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 24 }}>
                <div className="table-view">
                  <TableBox columns={columns} dataSource={allDependentsSupportingDocs} />
                </div>
              </Col>
            </Row>
          </div>
        </Panel>
      </PanelLayout>

      <ModalBox
        title={`${props.t(editDependentDoc ? 'Edit' : 'Add')} ${props.t('Other Supporting ID')}`}
        visible={toggle}
        onCancel={() => {
          setToggle(false)
          setEditDependentDoc(null)
          resetForm()
        }}
        width={700}
        okText={props.t('Save')}
        cancelText={props.t('Cancel')}
        onOk={onSave}
        destroyOnClose>
        <SupportingDocumentForm
          dependentsOptionList={convertSelectOptions(dependents, 'name', 'id')}
          values={values}
          handleValueChange={handleValueChange}
          isEditing={Boolean(editDependentDoc)}
        />
      </ModalBox>
    </Form>
  )
}

export type TSupportingDocumentsFormValues = {
  dependentId: string
  docType: string
  docNumber: string
  validFrom: Date | null
  validTo: Date | null
  attachments: IAttachment[]
}

export default withFormik<TSupportingDocumentsProps, TSupportingDocumentsFormValues>({
  mapPropsToValues: () => ({
    dependentId: '',
    docType: '',
    docNumber: '',
    currentAddress: '',
    validFrom: null,
    validTo: null,
    attachments: []
  }),
  handleSubmit: () => null,
  validationSchema: Schema
})(withTranslation()(SupportingDocuments))
