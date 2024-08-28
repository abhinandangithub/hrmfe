import { SettingOutlined } from '@ant-design/icons'
import { Col, message, Popconfirm, Popover, Row } from 'antd'
import { withFormik } from 'formik'
import { isEmpty } from 'lodash'
import moment from 'moment'
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
import JobHistoryForm from './JobHistoryForm'

const Schema = Yup.object().shape({
  effectiveDate: Yup.date().required(),
  endDate: Yup.date().required(),
  jobTitle: Yup.string().required(),
  employmentStatus: Yup.string().required(),
  jobCategory: Yup.string().required(),
  // location: Yup.string().required(),
  // comment: Yup.string().required(),
  contractStartDate: Yup.date().required(),
  contractEndDate: Yup.date().required(),
  attachments: Yup.array()
})

const JobHistory = (props) => {
  const [toggle, setToggle] = useState(false)
  const [jobHistory, setJobHistory] = useState([])
  const { currentEmployee, values, setValues, submitForm, errors, resetForm, history, restrictPage } = props

  useEffect(() => {
    if (currentEmployee?.id) {
      getJobHistory()
    }
  }, [currentEmployee?.id])

  const getJobHistory = () => {
    apiClient.get(`employee-details/job-history/get-all/${currentEmployee?.id}`).then(({ data }) => {
      if (data && data.result) {
        setJobHistory(data.result)
      }
    })
  }

  const handleAddNewDetails = () => {
    if (currentEmployee?.id) {
      setToggle(true)
      setValues({
        effectiveDate: '',
        endDate: '',
        jobTitle: '',
        employmentStatus: '',
        jobCategory: '',
        location: '',
        comment: '',
        contractStartDate: '',
        contractEndDate: '',
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
    apiClient
      .put(`employee-details/job-history/update/${row.id}`, { status: 'Inactive' })
      .then(({ data }) => {
        if (data && data.result) {
          getJobHistory()
          setToggle(false)
        }
      })
  }

  const onSave = () => {
    submitForm()

    if (isEmpty(errors)) {
      const { id, ...rest } = values
      const payload = {
        effectiveDate: rest.effectiveDate,
        endDate: rest.endDate,
        jobTitle: rest.jobTitle,
        employmentStatus: rest.employmentStatus,
        jobCategory: rest.jobCategory,
        location: rest.location,
        comment: rest.comment,
        contractStartDate: rest.contractStartDate,
        contractEndDate: rest.contractEndDate,
        employee: currentEmployee.id,
        attachments: rest.attachments.filter((attachment) => attachment !== '')
      }

      if (id) {
        apiClient.put(`employee-details/job-history/update/${id}`, payload).then(({ data }) => {
          if (data && data.result) {
            getJobHistory()
            setToggle(false)
          }
        })
      } else {
        apiClient.post('employee-details/job-history/add', payload).then(({ data }) => {
          if (data && data.result) {
            getJobHistory()
            setToggle(false)
          }
        })
      }
    }
  }

  const columns = [
    {
      title: props.t('Effective Date'),
      dataIndex: 'effectiveDate',
      render: (text) => moment(text).format('DD-MMM-YYYY')
    },
    {
      title: props.t('End Date'),
      dataIndex: 'endDate',
      render: (text) => moment(text).format('DD-MMM-YYYY')
    },
    {
      title: props.t('Job Title'),
      dataIndex: 'jobTitle'
    },
    {
      title: props.t('Employment Status'),
      dataIndex: 'employmentStatus'
    },
    {
      title: props.t('Job Category'),
      dataIndex: 'jobCategory'
    },
    {
      title: props.t('Location'),
      dataIndex: 'location'
    },
    {
      title: props.t('Comment'),
      dataIndex: 'comment'
    },
    {
      title: props.t('Contract Start Date'),
      dataIndex: props.t('contractStartDate'),
      render: (text) => moment(text).format('DD-MMM-YYYY')
    },
    {
      title: props.t('Contract End Date'),
      dataIndex: 'contractEndDate',
      render: (text) => moment(text).format('DD-MMM-YYYY')
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
        <Panel title={props.t('Job History')}>
          <div className="panel-with-border">
            <Row justify="left" gutter={(12, 10)}>
              <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 24 }}>
                <div className="mb-3 align-right">
                  <ButtonBox style={{ marginRight: 10 }} type="success" onClick={handleAddNewDetails}>
                    <i className="flaticon-plus" /> {props.t('Add')}
                  </ButtonBox>
                </div>
                <div className="table-view">
                  <TableBox
                    columns={columns}
                    actionIndex="custom_action"
                    cardHeaderIndex="status"
                    cardFirstLabelIndex="docno"
                    dataSource={jobHistory}
                  />
                </div>
              </Col>
            </Row>
          </div>
        </Panel>
      </PanelLayout>

      <ModalBox
        title={`${props.t(typeof toggle === 'object' ? 'Edit' : 'Add')} ${props.t('Job History Details')}`}
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
        <JobHistoryForm currentDetails={values} handleValueChange={handleValueChange} />
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
    effectiveDate: '',
    endDate: '',
    jobTitle: '',
    employmentStatus: '',
    jobCategory: '',
    location: '',
    comment: '',
    contractStartDate: '',
    contractEndDate: '',
    attachments: []
  }),
  handleSubmit: () => null,
  validationSchema: Schema
})(withTranslation()(JobHistory))
