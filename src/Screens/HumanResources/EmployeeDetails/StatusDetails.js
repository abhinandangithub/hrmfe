import { EditOutlined } from '@ant-design/icons'
import { Col, Row } from 'antd'
import { withFormik } from 'formik'
import { isEmpty } from 'lodash'
import moment from 'moment'
import { useEffect, useState } from 'react'
import { withTranslation } from 'react-i18next'
import * as Yup from 'yup'
import Button from '../../../Components/Button'
import ButtonBox from '../../../Components/ButtonBox/ButtonBox'
import ModalBox from '../../../Components/ModalBox/ModalBox'
import TableBox from '../../../Components/TableBox/TableBox'
import Panel from '../../../Layout/Panel'
import PanelLayout from '../../../Layout/PanelLayout'
import apiClient from '../../../Util/apiClient'
import StatusDetailsForm from './StatusDetailsForm'

// const { Panel } = Collapse
const Schema = Yup.object().shape({
  citizenship: Yup.string().required(),
  maritalStatus: Yup.string().required(),
  militaryStatus: Yup.string().required(),
  disabilityStatus: Yup.string().required(),
  religion: Yup.string().required(),
  validFrom: Yup.date()
    .default(() => new Date())
    .required('Valid From date is required')
    .nullable(),
  validTo: Yup.date()
    .default(() => new Date('9999-12-31'))
    .nullable()
})

const StatusDetails = (props) => {
  const {
    values = {},
    resetForm,
    currentEmployee,
    handleValueChange,
    // submitForm,
    errors,
    employeeId,
    setValues
  } = props
  const [toggle, setToggle] = useState(false)
  const [statusDetails, setStatusDetails] = useState([])
  const [statusData, setStatusData] = useState(null)

  useEffect(() => {
    getDetails()

    // fetchDropdownValues()
  }, [employeeId])

  const getDetails = () => {
    apiClient.get(`employee-details/status-details/get/${employeeId}`).then(({ data }) => {
      if (data && data.result) {
        setStatusDetails(data.result)
        setValues({ ...values, ...data.result, employee: employeeId })
      }
    })
  }

  const columns = [
    {
      title: props.t('Valid From'),
      dataIndex: 'validFrom',
      render: (text) => (text ? moment(text).format('YYYY-MM-DD') : '')
    },
    {
      title: props.t('Valid To'),
      dataIndex: 'validTo',
      render: (text) => (text ? moment(text).format('YYYY-MM-DD') : '')
    },
    {
      title: props.t('Citizenship'),
      dataIndex: 'citizenshipData',
      render: (text) => text?.citizenship || ''
    },
    {
      title: props.t('Marital status'),
      dataIndex: 'maritalStatusData',
      render: (text) => text?.maritalstatus || ''
    },
    {
      title: props.t('Military Status'),
      dataIndex: 'militaryStatusData',
      render: (text) => text?.militaryStatusName || ''
    },
    {
      title: props.t('Disability Status'),
      dataIndex: 'disabilityStatusData',
      render: (text) => text?.disabilityName || ''
    },
    {
      title: props.t('Religion'),
      dataIndex: 'religionData',
      render: (text) => text?.religionName || ''
    },
    {
      title: props.t('Action'),
      dataIndex: 'custom_action',
      render: (_, row) => (
        <Button onClick={() => tableActions(row)} className="btn glow dropdown-toggle">
          <EditOutlined />
        </Button>
      )
    }
  ]

  const tableActions = (val) => {
    setValues({ ...values, ...val })
    setStatusData(val)
    setToggle(true)
  }

  const handleAddNewDetails = () => {
    const findActive = statusDetails.find((x) => x.isActive)

    if (findActive) {
      setValues({ ...values, ...findActive, employee: employeeId })
    } else {
      setValues({ ...values, employee: employeeId })
    }
    setStatusData(null)
    setToggle(true)
  }

  const onSave = async () => {
    try {
      console.log('errors', errors)
      if (isEmpty(errors)) {
        console.log('values', values)
        const param = {
          validFrom: values.validFrom,
          validTo: values.validTo,
          citizenship: values.citizenship,
          maritalStatus: values.maritalStatus,
          militaryStatus: values.militaryStatus,
          disabilityStatus: values.disabilityStatus,
          religion: values.religion,
          employee: values.employee
        }
        let result
        if (statusData?.id) {
          result = await apiClient.put(`employee-details/status-details/update/${statusData?.id}`, param)
        } else {
          result = await apiClient.post('employee-details/status-details/add', param)
        }
        console.log('result', result)
        if (result.data && result.data.result) {
          setToggle(false)
          getDetails()
        }
      }
    } catch {}
  }

  return (
    <>
      <PanelLayout>
        <Panel
          title="Status Details"
          button={
            <div className=" align-right">
              <ButtonBox style={{ marginRight: 10 }} type="success" onClick={handleAddNewDetails}>
                <i className="flaticon-plus" /> {props.t('Add')}
              </ButtonBox>
            </div>
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
                    dataSource={statusDetails}
                  />
                </div>
              </Col>
            </Row>
          </div>
        </Panel>
      </PanelLayout>
      <ModalBox
        title={`${props.t(typeof toggle === 'object' ? 'Edit' : 'Add')} ${props.t('Status Details')}`}
        visible={toggle}
        onCancel={() => {
          setToggle(false)
          resetForm()
        }}
        onOk={onSave}
        width={700}
        okText="Save"
        destroyOnClose>
        <StatusDetailsForm
          currentEmployee={currentEmployee}
          currentDetails={values}
          handleValueChange={handleValueChange}
        />
      </ModalBox>
    </>
  )
}

export default withFormik({
  mapPropsToValues: () => ({
    citizenship: '',
    maritalStatus: '',
    militaryStatus: '',
    disabilityStatus: '',
    religion: '',
    validFrom: new Date(),
    validTo: new Date('9999-12-31')
  }),
  validationSchema: Schema,
  handleSubmit: () => null
})(withTranslation()(StatusDetails))

// export default withTranslation()(StatusDetails)
