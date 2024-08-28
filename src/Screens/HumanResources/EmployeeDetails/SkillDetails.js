import { SettingOutlined } from '@ant-design/icons'
import { Col, message, Popconfirm, Popover, Row } from 'antd'
import { withFormik } from 'formik'
import { isEmpty } from 'lodash'
import React, { useEffect, useState } from 'react'
import { withTranslation } from 'react-i18next'
import * as Yup from 'yup'
import ButtonBox from '../../../Components/ButtonBox/ButtonBox'
import { Form } from '../../../Components/Formik'
import ModalBox from '../../../Components/ModalBox/ModalBox'
import TableBox from '../../../Components/TableBox/TableBox'
import Panel from '../../../Layout/Panel'
import PanelLayout from '../../../Layout/PanelLayout'
import apiClient from '../../../Util/apiClient'
import SkillDetailsForm from './SkillDetailsForm'

const Schema = Yup.object().shape({
  skill: Yup.string().required(),
  yearOfExperience: Yup.number().required()
})

const SkillDetails = (props) => {
  const [toggle, setToggle] = useState(false)
  const [skillDetails, setSkillDetails] = useState([])
  const { currentEmployee, values, setValues, submitForm, errors, resetForm } = props

  useEffect(() => {
    if (currentEmployee?.id) {
      getSkillDetails()
    }
  }, [currentEmployee?.id])

  const getSkillDetails = () => {
    apiClient.get(`employee-details/skill/get-all/${currentEmployee?.id}`).then(({ data }) => {
      if (data && data.result) {
        setSkillDetails(data.result)
      }
    })
  }

  const handleAddNewDetails = () => {
    if (currentEmployee?.id) {
      setToggle(true)
      setValues({
        skill: '',
        yearOfExperience: ''
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
    apiClient.put(`employee-details/skill/update/${row.id}`, { status: 'Inactive' }).then(({ data }) => {
      if (data && data.result) {
        getSkillDetails()
        setToggle(false)
      }
    })
  }

  const onSave = () => {
    submitForm()

    if (isEmpty(errors)) {
      const { id, ...rest } = values
      const payload = {
        skill: rest.skill,
        yearOfExperience: rest.yearOfExperience,
        employee: currentEmployee.id
      }

      if (id) {
        apiClient.put(`employee-details/skill/update/${id}`, payload).then(({ data }) => {
          if (data && data.result) {
            getSkillDetails()
            setToggle(false)
          }
        })
      } else {
        apiClient.post('employee-details/skill/add', payload).then(({ data }) => {
          if (data && data.result) {
            getSkillDetails()
            setToggle(false)
          }
        })
      }
    }
  }

  const columns = [
    {
      title: props.t('Skill'),
      dataIndex: 'skill'
    },
    {
      title: props.t('Year Of Experience'),
      dataIndex: 'yearOfExperience'
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
        <Panel title={props.t('Skill Details')}>
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
                    dataSource={skillDetails}
                  />
                </div>
              </Col>
            </Row>
          </div>
        </Panel>
      </PanelLayout>

      <ModalBox
        title={`${props.t(typeof toggle === 'object' ? 'Edit' : 'Add')} ${props.t('Skill Details')}`}
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
        <SkillDetailsForm currentDetails={values} handleValueChange={handleValueChange} />
      </ModalBox>
    </Form>
  )
}

export default withFormik({
  mapPropsToValues: () => ({
    skill: '',
    yearOfExperience: ''
  }),
  handleSubmit: () => null,
  validationSchema: Schema
})(withTranslation()(SkillDetails))
