import { SettingOutlined } from '@ant-design/icons'
import { Col, message, Popconfirm, Popover, Row } from 'antd'
import { withFormik } from 'formik'
import { isEmpty } from 'lodash'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import * as Yup from 'yup'
import ButtonBox from '../../../Components/ButtonBox/ButtonBox'
import FooterActions from '../../../Components/FooterActions'
import { Form } from '../../../Components/Formik'
import ModalBox from '../../../Components/ModalBox/ModalBox'
import TableBox from '../../../Components/TableBox/TableBox'
import Panel from '../../../Layout/Panel'
import PanelLayout from '../../../Layout/PanelLayout'
import apiClient from '../../../Util/apiClient'
import WorkExperienceForm from './WorkExperienceForm'
import { useTranslation } from 'react-i18next'




const {t} = useTranslation()


const Schema = Yup.object().shape({
  companyName: Yup.string().required(),
  jobTitle: Yup.string().required(),
  from: Yup.date().required(),
  to: Yup.date().required(),
  comment: Yup.string().required(),
  attachments: Yup.array()
})

const WorkExperience = (props) => {
  const [toggle, setToggle] = useState(false)
  const [workExperience, setWorkExperience] = useState([])
  const { currentEmployee, values, setValues, submitForm, errors, resetForm } = props

  useEffect(() => {
    if (currentEmployee?.id) {
      getWorkExperience()
    }
  }, [currentEmployee?.id])

  const getWorkExperience = () => {
    apiClient.get(`employee-details/work-experience/get-all/${currentEmployee?.id}`).then(({ data }) => {
      if (data && data.result) {
        setWorkExperience(data.result)
      }
    })
  }

  const handleAddNewDetails = () => {
    if (currentEmployee?.id) {
      setToggle(true)
      setValues({
        companyName: '',
        jobTitle: '',
        from: '',
        to: '',
        comment: '',
        attachments: []
      })
    } else {
      message.error('Please select an employee to continue!')
    }
  }

  const handleEditRow = (row) => () => {
    setToggle(row)
    setValues({ ...row, companyName: row.companyName })
  }

  const handleValueChange = (val) => {
    setValues({ ...values, ...val })
  }

  const deleteRow = (row) => () => {
    apiClient
      .put(`employee-details/work-experience/update/${row.id}`, { status: 'Inactive' })
      .then(({ data }) => {
        if (data && data.result) {
          getWorkExperience()
          setToggle(false)
        }
      })
  }

  const onSave = () => {
    submitForm()

    if (isEmpty(errors)) {
      const { id, ...rest } = values
      const payload = {
        companyName: rest.companyName,
        jobTitle: rest.jobTitle,
        from: rest.from,
        to: rest.to,
        employee: currentEmployee.id,
        comment: rest.comment,
        attachments: rest.attachments.filter((attachment) => attachment !== '')
      }

      if (id) {
        apiClient.put(`employee-details/work-experience/update/${id}`, payload).then(({ data }) => {
          if (data && data.result) {
            getWorkExperience()
            setToggle(false)
          }
        })
      } else {
        apiClient.post('employee-details/work-experience/add', payload).then(({ data }) => {
          if (data && data.result) {
            getWorkExperience()
            setToggle(false)
          }
        })
      }
    }
  }

  const columns = [
    {
      title: 'Company',
      dataIndex: 'companyName'
    },
    {
      title: 'Job Title',
      dataIndex: 'jobTitle'
    },
    {
      title: 'From Date',
      dataIndex: 'fromDate',
      render: (text) => moment(text).format('DD-MMM-YYYY')
    },
    {
      title: 'To Date',
      dataIndex: 'toDate',
      render: (text) => moment(text).format('DD-MMM-YYYY')
    },
    {
      title: 'Comment',
      dataIndex: 'comment'
    },
    {
      title: 'Attachments',
      dataIndex: 'attachments',
      render: (text) => text.map((attachment) => attachment.name).join(', ')
    },
    {
      title: 'Action',
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
          <i className="flaticon-edit-1" /> Edit
        </li>
        <li>
          <Popconfirm title="Sure to delete?" onConfirm={deleteRow(row)}>
            <i className="flaticon-delete-2" /> Delete
          </Popconfirm>
        </li>
      </ul>
    </div>
  )

  return (
    <Form>
      <PanelLayout>
        <Panel title={t('Work Experience Details')}>
          <div className="panel-with-border">
            <Row justify="left" gutter={(12, 10)}>
              <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 24 }}>
                <div className="mb-3 align-right">
                  <ButtonBox style={{ marginRight: 10 }} type="success" onClick={handleAddNewDetails}>
                    <i className="flaticon-plus" /> Add
                  </ButtonBox>
                </div>
                <div className="table-view">
                  <TableBox
                    columns={columns}
                    actionIndex="custom_action"
                    cardHeaderIndex="status"
                    cardFirstLabelIndex="docno"
                    dataSource={workExperience}
                  />
                </div>
              </Col>
            </Row>
          </div>
        </Panel>
      </PanelLayout>

      <ModalBox
        title={`${typeof toggle === 'object' ? 'Edit' : 'Add'} Work Experience Details`}
        visible={toggle}
        onCancel={() => {
          setToggle(false)
          resetForm()
        }}
        width={700}
        okText="Save"
        onOk={onSave}
        destroyOnClose>
        <WorkExperienceForm currentDetails={values} handleValueChange={handleValueChange} />
      </ModalBox>

      <FooterActions
        leftActions={[
          {
            prefix: 'flaticon-back',
            label: 'Back to employee list'
          }
        ]}
      />
    </Form>
  )
}

export default withFormik({
  mapPropsToValues: () => ({
    companyName: '',
    jobTitle: '',
    from: '',
    to: '',
    comment: '',
    attachments: []
  }),
  handleSubmit: () => null,
  validationSchema: Schema
})(WorkExperience)
