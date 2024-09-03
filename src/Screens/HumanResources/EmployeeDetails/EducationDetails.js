import { SettingOutlined } from '@ant-design/icons'
import { Col, message, Popconfirm, Popover, Row } from 'antd'
import { withFormik } from 'formik'
import { isEmpty } from 'lodash'
import moment from 'moment'
import { useEffect, useState } from 'react'
import { useTranslation, withTranslation } from 'react-i18next'
import * as Yup from 'yup'
import ButtonBox from '../../../Components/ButtonBox/ButtonBox'
import { Form } from '../../../Components/Formik'
import ModalBox from '../../../Components/ModalBox/ModalBox'
import TableBox from '../../../Components/TableBox/TableBox'
import Panel from '../../../Layout/Panel'
import PanelLayout from '../../../Layout/PanelLayout'
import apiClient from '../../../Util/apiClient'
import EducationDetailsForm from './EducationDetailsForm'

const Schema = Yup.object().shape({
  level: Yup.string().required(),
  score: Yup.number().required(),
  year: Yup.date().required(),
  attachments: Yup.array()
})

const EducationDetails = (props) => {
  const [toggle, setToggle] = useState(false)
  const [educationDetails, setEducationDetails] = useState([])
  const { currentEmployee, values, setValues, submitForm, errors, resetForm, restrictPage } = props
  const { t } = useTranslation()

  useEffect(() => {
    if (currentEmployee?.id) {
      getEducationDetails()
    }
  }, [currentEmployee?.id])

  const getEducationDetails = () => {
    apiClient.get(`employee-details/education/get-all/${currentEmployee?.id}`).then(({ data }) => {
      if (data && data.result) {
        setEducationDetails(data.result)
      }
    })
  }

  const handleAddNewDetails = () => {
    if (currentEmployee?.id) {
      setToggle(true)
      setValues({
        level: '',
        score: '',
        year: '',
        attachments: []
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
    apiClient.put(`employee-details/education/update/${row.id}`, { status: 'Inactive' }).then(({ data }) => {
      if (data && data.result) {
        getEducationDetails()
        setToggle(false)
      }
    })
  }

  const onSave = () => {
    submitForm()

    if (isEmpty(errors)) {
      const { id, ...rest } = values
      const payload = {
        level: rest.level,
        score: rest.score,
        year: rest.year,
        employee: currentEmployee.id,
        attachments: rest.attachments.filter((attachment) => attachment !== '')
      }

      if (id) {
        apiClient.put(`employee-details/education/update/${id}`, payload).then(({ data }) => {
          if (data && data.result) {
            getEducationDetails()
            setToggle(false)
          }
        })
      } else {
        apiClient.post('employee-details/education/add', payload).then(({ data }) => {
          if (data && data.result) {
            getEducationDetails()
            setToggle(false)
          }
        })
      }
    }
  }

  const columns = [
    {
      title: props.t('Level'),
      dataIndex: 'level'
    },
    {
      title: props.t('Year'),
      dataIndex: 'year',
      render: (text) => moment(text).format('yyyy')
    },
    {
      title: props.t('GPA/Score'),
      dataIndex: 'score'
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
        <Panel
          title={t('Education Details')}
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
                    dataSource={educationDetails}
                  />
                </div>
              </Col>
            </Row>
          </div>
        </Panel>
      </PanelLayout>

      <ModalBox
        title={`${props.t(typeof toggle === 'object' ? 'Edit' : 'Add')} ${props.t('Education Details')}`}
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
        <EducationDetailsForm currentDetails={values} handleValueChange={handleValueChange} />
      </ModalBox>
    </Form>
  )
}

export default withFormik({
  mapPropsToValues: () => ({
    level: '',
    score: '',
    year: '',
    attachments: []
  }),
  handleSubmit: () => null,
  validationSchema: Schema
})(withTranslation()(EducationDetails))
