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
import PassportForm from './PassportForm'

const Schema = Yup.object().shape({
  validFrom: Yup.date()
    .default(() => new Date())
    .required('Valid From date is required')
    .nullable(),
  validTo: Yup.date()
    .default(() => new Date('9999-12-31'))
    .nullable()
})

const PassportDetails = (props) => {
  const { resetForm, currentEmployee, handleValueChange, employeeId, setValues, values, errors } = props
  const [toggle, setToggle] = useState(false)
  const [passportData, setpassportData] = useState([])
  const [editData, setEditData] = useState(null)
  const [modalTitle, setModalTitle] = useState('Add')
  const [activeData, setActiveData] = useState(null)

  useEffect(() => {
    getDetails()
  }, [employeeId])

  useEffect(() => {
    const findActive = passportData.find((x) => x.isActive)
    setActiveData(findActive)
  }, [passportData])

  const getDetails = () => {
    apiClient.get(`employee-details/passport-details/get/${employeeId}`).then(({ data }) => {
      if (data && data.result) {
        setpassportData(data.result)
        setValues({ ...values, ...data.result, employee: employeeId })
      }
    })
  }

  const tablePosActions = (val) => {
    setModalTitle('Edit')
    setValues({ ...values, ...val })
    setEditData(val)
    setToggle(true)
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
      title: props.t('Passport issued Country'),
      dataIndex: 'passportIssuedCountry'
    },
    {
      title: props.t('Passport No'),
      dataIndex: 'passportNo'
    },
    {
      title: props.t('Name As In Passport'),
      dataIndex: 'nameAsInPassport'
    },
    {
      title: props.t('Passport Valid From'),
      dataIndex: 'passportValidFrom',
      render: (text) => (text ? moment(text).format('YYYY-MM-DD') : '')
    },
    {
      title: props.t('Passport Valid To'),
      dataIndex: 'passportValidTo',
      render: (text) => (text ? moment(text).format('YYYY-MM-DD') : '')
    },
    {
      title: props.t('Issue On'),
      dataIndex: 'issueOn',
      render: (text) => (text ? moment(text).format('YYYY-MM-DD') : '')
    },
    {
      title: props.t('Visa held for country'),
      dataIndex: 'visaHeldForCountry'
    },
    {
      title: props.t('Type of Visa'),
      dataIndex: 'typeOfVisa'
    },
    {
      title: props.t('Type Of Visa Entry'),
      dataIndex: 'typeOfVisaEntry'
    },
    {
      title: props.t('Visa Valid From'),
      dataIndex: 'visaValidFrom',
      render: (text) => (text ? moment(text).format('YYYY-MM-DD') : '')
    },
    {
      title: props.t('Visa Valid To'),
      dataIndex: 'visaValidTo',
      render: (text) => (text ? moment(text).format('YYYY-MM-DD') : '')
    },
    {
      title: props.t('Permit Country'),
      dataIndex: 'permitCountry'
    },
    {
      title: props.t('Permit No'),
      dataIndex: 'permitNo'
    },
    {
      title: props.t('Date of entry'),
      dataIndex: 'dateOfEntry',
      render: (text) => (text ? moment(text).format('YYYY-MM-DD') : '')
    },
    {
      title: props.t('Issued On'),
      dataIndex: 'issuedOn',
      render: (text) => (text ? moment(text).format('YYYY-MM-DD') : '')
    },
    {
      title: props.t('Action'),
      dataIndex: 'custom_action',
      render: (_, row) => (
        <Button onClick={() => tablePosActions(row)} className="btn glow dropdown-toggle">
          <EditOutlined />
        </Button>
      )
    }
  ]

  const handleModal = () => {
    setModalTitle('Add')
    setValues({ ...values, ...activeData })
    setToggle(true)
  }

  const onSavePos = async () => {
    try {
      console.log('errors', errors)
      if (isEmpty(errors)) {
        console.log('values', values)
        const param = {
          validFrom: values.validFrom,
          validTo: values.validTo,
          passportNo: values.passportNo,
          passportIssuedCountry: values.passportIssuedCountry,
          nameAsInPassport: values.nameAsInPassport,
          passportValidFrom: values.passportValidFrom,
          passportValidTo: values.passportValidTo,
          issueOn: values.issueOn,
          visaHeldForCountry: values.visaHeldForCountry,
          typeOfVisa: values.typeOfVisa,
          typeOfVisaEntry: values.typeOfVisaEntry,
          visaValidFrom: values.visaValidFrom,
          visaValidTo: values.visaValidTo,
          attachments: values.attachments,
          permitCountry: values.permitCountry,
          permitNo: values.permitNo,
          dateOfEntry: values.dateOfEntry,
          issuedOn: values.issuedOn,
          employee: employeeId
        }
        let result
        if (editData?.id) {
          result = await apiClient.put(`employee-details/passport-details/update/${editData?.id}`, param)
        } else {
          result = await apiClient.post('employee-details/passport-details/add', param)
        }

        if (result.data && result.data.result) {
          setToggle(false)
          getDetails()
          setEditData(null)
        }
      }
    } catch {}
  }

  return (
    <>
      <PanelLayout>
        <Panel
          title="Passport / Visa Details"
          button={
            <div className="align-right">
              <ButtonBox style={{ marginRight: 10 }} type="success" onClick={handleModal}>
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
                    dataSource={passportData}
                  />
                </div>
              </Col>
            </Row>
          </div>
        </Panel>
      </PanelLayout>
      <ModalBox
        title={`${props.t(modalTitle)} ${props.t('Passport Details')}`}
        visible={toggle}
        onCancel={() => {
          setToggle(false)
          resetForm()
        }}
        width={700}
        okText="Save"
        onOk={onSavePos}
        destroyOnClose>
        <PassportForm
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
    validFrom: new Date(),
    validTo: new Date('9999-12-31')
  }),
  validationSchema: Schema,
  handleSubmit: () => null
})(withTranslation()(PassportDetails))
