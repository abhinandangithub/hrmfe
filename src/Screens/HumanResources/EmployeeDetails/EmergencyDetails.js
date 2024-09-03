import { SettingOutlined } from '@ant-design/icons'
import { Col, message, Popconfirm, Popover, Row } from 'antd'
import { withFormik } from 'formik'
import { useEffect, useState } from 'react'
import { useTranslation, withTranslation } from 'react-i18next'
import * as Yup from 'yup'
import ButtonBox from '../../../Components/ButtonBox/ButtonBox'
import FooterActions from '../../../Components/FooterActions'
import { Form } from '../../../Components/Formik'
import ModalBox from '../../../Components/ModalBox/ModalBox'
import TableBox from '../../../Components/TableBox/TableBox'
import Panel from '../../../Layout/Panel'
import PanelLayout from '../../../Layout/PanelLayout'
import apiClient from '../../../Util/apiClient'
import EmergencyDetailsForm from './EmergencyDetailsForm'

const Schema = Yup.object().shape({
  name: Yup.string().required(),
  relationship: Yup.string().required(),
  homeTelephone: Yup.string().required(),
  mobile: Yup.string().required(),
  workTelephone: Yup.string().required()
})

const EmergencyDetails = (props) => {
  const [modalTitle, setModalTitle] = useState('Add')
  const [toggle, setToggle] = useState(false)
  const [emergencyDetails, setEmergencyDetails] = useState([])
  // const { currentEmployee, values, setValues, submitForm, errors, resetForm, history, restrictPage } = props
  const { currentEmployee, values, setValues, submitForm, resetForm, history, restrictPage } = props

  const { t } = useTranslation()

  useEffect(() => {
    if (currentEmployee?.id) {
      getEmergencyDetails()
    }
  }, [currentEmployee?.id])

  const getEmergencyDetails = () => {
    apiClient.get(`employee-details/emergency-contacts/get-all/${currentEmployee?.id}`).then(({ data }) => {
      if (data && data.result) {
        setEmergencyDetails(data.result)
      }
    })
  }

  const handleAddNewDetails = () => {
    setModalTitle('Add')
    if (currentEmployee?.id) {
      setToggle(true)
      setValues({
        name: '',
        relationship: '',
        homeTelephone: '',
        mobile: '',
        workTelephone: ''
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
      .put(`employee-details/emergency-contacts/update/${row.id}`, { status: 'Inactive' })
      .then(({ data }) => {
        if (data && data.result) {
          getEmergencyDetails()
          setToggle(false)
        }
      })
  }

  const onSave = () => {
    submitForm()

    const { id, ...rest } = values
    const payload = {
      name: rest.name,
      relationship: rest.relationship,
      homeTelephone: rest.homeTelephone,
      mobile: rest.mobile,
      workTelephone: rest.workTelephone,
      employee: currentEmployee.id
    }

    if (id) {
      apiClient.put(`employee-details/emergency-contacts/update/${id}`, payload).then(({ data }) => {
        if (data && data.result) {
          getEmergencyDetails()
          setToggle(false)
        }
      })
    } else {
      apiClient.post('employee-details/emergency-contacts/add', payload).then(({ data }) => {
        if (data && data.result) {
          getEmergencyDetails()
          setToggle(false)
        }
      })
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
      title: props.t('Home Telephone'),
      dataIndex: 'homeTelephone'
    },
    {
      title: props.t('Mobile'),
      dataIndex: 'mobile'
    },
    {
      title: props.t('Work Telephone'),
      dataIndex: 'workTelephone'
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

  const tableActions = (row) => {
    setModalTitle('Edit')

    return (
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
  }

  return (
    <Form>
      <PanelLayout>
        <Panel
          title={t('Emergency contact information')}
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
                    dataSource={emergencyDetails}
                  />
                </div>
              </Col>
            </Row>
          </div>
        </Panel>
      </PanelLayout>

      <ModalBox
        title={`${props.t(modalTitle)} ${props.t('Emergency Details')}`}
        visible={toggle}
        onCancel={() => {
          setToggle(false)
          resetForm()
        }}
        width={800}
        okText={props.t('Save')}
        cancelText={props.t('Cancel')}
        onOk={onSave}
        destroyOnClose>
        <EmergencyDetailsForm
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
    name: '',
    relationship: '',
    homeTelephone: '',
    mobile: '',
    workTelephone: ''
  }),
  handleSubmit: () => null,
  validationSchema: Schema
})(withTranslation()(EmergencyDetails))
