import { SettingOutlined } from '@ant-design/icons'
import { Col, message, Popconfirm, Popover, Row } from 'antd'
import { FormikProps, withFormik } from 'formik'
import { TFunction } from 'i18next'
import { isEmpty } from 'lodash'
import moment from 'moment'
import { FC, useState } from 'react'
import { withTranslation } from 'react-i18next'
import * as Yup from 'yup'
import ButtonBox from '../../../Components/ButtonBox/ButtonBox'
import Form from '../../../Components/Formik/Form'
import ModalBox from '../../../Components/ModalBox/ModalBox'
import TableBox from '../../../Components/TableBox/TableBox'
import { IAttachment, IDependent } from '../../../Interfaces/IDependent'
import { IEmployee } from '../../../Interfaces/IEmployee'
import Panel from '../../../Layout/Panel'
import apiClient from '../../../Util/apiClient'
import DependentsForm from './DependentsForm'

const Schema = Yup.object().shape({
  id: Yup.string(),
  name: Yup.string().required(),
  relationship: Yup.string().required(),
  dateOfBirth: Yup.date().nullable().required(),
  attachments: Yup.array()
})

type TComponentProps = {
  dependents: IDependent[]
  currentEmployee: IEmployee
  getDependents: () => void
  restrictPage: boolean
}

type TProps = FormikProps<TDependentDetailsFormValues> &
  TComponentProps & { t: TFunction<'translation', undefined> }

const DependentsDetails: FC<TProps> = (props) => {
  const { dependents, currentEmployee, values, setValues, getDependents, resetForm, submitForm, errors, restrictPage } =
    props
  const [toggle, setToggle] = useState(false)

  const handleAddNewDetails = () => {
    if (currentEmployee?.id) {
      setToggle(true)
      setValues((values) => ({
        ...values,
        name: '',
        relationship: '',
        dateOfBirth: null,
        attachments: []
      }))
    } else {
      message.error('Please select an employee to continue!')
    }
  }

  const handleEditRow = (row: IDependent) => () => {
    setToggle(true)
    setValues({ ...values, ...row })
  }

  const handleValueChange = (val: TDependentDetailsFormValues) => {
    setValues({ ...values, ...val })
  }

  const deleteRow = (row: IDependent) => () => {
    apiClient.put(`employee-details/dependents/update/${row.id}`, { status: 'Inactive' }).then(({ data }) => {
      if (data && data.result) {
        getDependents()
      }
    })
  }

  const onSave = () => {
    submitForm()

    if (isEmpty(errors)) {
      const { id, ...rest } = values
      const payload = {
        attachments: rest.attachments.filter((attachment: IAttachment) => attachment),
        dateOfBirth: rest.dateOfBirth,
        employee: currentEmployee.id,
        name: rest.name,
        relationship: rest.relationship
      }

      if (id) {
        apiClient.put(`employee-details/dependents/update/${id}`, payload).then(({ data }) => {
          if (data && data.result) {
            getDependents()
            setToggle(false)
          }
        })
      } else {
        apiClient.post('employee-details/dependents/add', payload).then(({ data }) => {
          if (data && data.result) {
            getDependents()
            setToggle(false)
          }
        })
      }
    }
  }

  const columns = [
    {
      title: props.t('Name'),
      dataIndex: 'name'
    },
    {
      title: props.t('Relationship'),
      dataIndex: 'relationship'
    },
    {
      title: props.t('Date Of Birth'),
      dataIndex: 'dateOfBirth',
      render: (text: Date) => (text ? moment(text).format('DD-MMM-YYYY') : '')
    },
    {
      title: props.t('Attachments'),
      dataIndex: 'attachments',
      render: (text: IAttachment[]) => text.map((attachment: IAttachment) => attachment.name).join(', ')
    },
    {
      title: props.t('Action'),
      dataIndex: 'custom_action',
      render: (_: unknown, row: IDependent) => (
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

  const tableActions = (row: IDependent) => (
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
      <Panel title={props.t('Dependents Details')} noBottom={false}>
        {!restrictPage ?
          <div style={{ position: 'absolute', top: -40, right: 15 }}>
            <ButtonBox style={{ marginRight: 10 }} type="success" onClick={handleAddNewDetails}>
              <i className="flaticon-plus" /> {props.t('Add')}
            </ButtonBox>
          </div>
          : null}
        <Row justify="start" gutter={[12, 10]}>
          <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 24 }}>
            <div className="table-view">
              <TableBox columns={columns} dataSource={dependents} />
            </div>
          </Col>
        </Row>
      </Panel>
      <ModalBox
        title={`${props.t(typeof toggle === 'object' ? 'Edit' : 'Add')} ${props.t('Dependents Details')}`}
        visible={toggle}
        onCancel={() => {
          resetForm()
          setToggle(false)
        }}
        width={700}
        okText="Save"
        onOk={onSave}
        destroyOnClose>
        <DependentsForm values={values} handleValueChange={handleValueChange} />
      </ModalBox>
    </Form>
  )
}

export type TDependentDetailsFormValues = {
  attachments: IAttachment[]
  dateOfBirth: Date | null
  id?: string
  name: string
  relationship: string
}

export default withFormik<TComponentProps, TDependentDetailsFormValues>({
  mapPropsToValues: () => ({
    attachments: [],
    dateOfBirth: null,
    id: '',
    name: '',
    relationship: ''
  }),
  handleSubmit: () => null,
  validationSchema: Schema
})(withTranslation()(DependentsDetails))
