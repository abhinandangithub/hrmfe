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
import CurrentAddressForm from './CurrentAddressForm'
import PermanentAddressForm from './PermanentAddressForm'
// import { Field } from '../../../Components/Formik'
// import { COUNTRIES } from '../../../Util/Options'

const Schema = Yup.object().shape({
  buildingNo: Yup.string().required(),
  street: Yup.string().required(),
  additionalStreet: Yup.string().required(),
  city: Yup.string().required(),
  state: Yup.string().required(),
  country: Yup.string().required(),
  currentAddress: Yup.boolean(),
  permanentAddress: Yup.boolean(),
  postalCode: Yup.string().required(),

  neighborhood: Yup.string().nullable(),
  additionalNo: Yup.string().nullable(),
  validFrom: Yup.date()
    .default(() => new Date())
    .required('Valid From date is required')
    .nullable(),
  validTo: Yup.date()
    .default(() => new Date('9999-12-31'))
    .nullable()
})

const ContactDetails = (props) => {
  const {
    values = {},
    resetForm,
    currentEmployee,
    handleValueChange,
    submitForm,
    errors,
    employeeId,
    setValues
  } = props
  const [toggle, setToggle] = useState(false)
  const [toggle1, setToggle1] = useState(false)
  const [addressData, setAddressData] = useState(null)
  const [currentAddressData, setCurrentAddressData] = useState([])
  const [permAddressData, setPermAddressData] = useState([])
  const [activeData, setActiveData] = useState(null)
  const [activePerData, setActivePerData] = useState(null)

  useEffect(() => {
    getDetails()
  }, [employeeId])

  useEffect(() => {
    const findActive = currentAddressData.find((x) => x.isActive)
    const findPerActive = permAddressData.find((x) => x.isActive)

    if (findActive) {
      setActiveData(findActive)
    }
    if (findPerActive) {
      setActivePerData(findPerActive)
    }
  }, [currentAddressData, permAddressData])

  const getDetails = () => {
    apiClient.get(`employee-details/contact-details/get/${employeeId}`).then(({ data }) => {
      if (data && data.result) {
        const curAdd = data.result.filter((x) => x.currentAddress)
        setCurrentAddressData(curAdd)
        const perAdd = data.result.filter((x) => x.permanentAddress)
        setPermAddressData(perAdd)

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
      title: props.t('Building No'),
      dataIndex: 'buildingNo'
    },
    {
      title: props.t('Street'),
      dataIndex: 'street'
    },
    {
      title: props.t('Additional Street'),
      dataIndex: 'additionalStreet'
    },
    {
      title: props.t('City'),
      dataIndex: 'city'
    },
    {
      title: props.t('State'),
      dataIndex: 'state'
    },
    {
      title: props.t('PostalCode'),
      dataIndex: 'postalCode'
    },
    {
      title: props.t('Country'),
      dataIndex: 'country'
    },
    {
      title: props.t('Neighborhood'),
      dataIndex: 'neighborhood'
    },
    {
      title: props.t('Additional No'),
      dataIndex: 'additionalNo'
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
    console.log('val', val)
    setAddressData(val)
    if (val.currentAddress) {
      setToggle(true)
    }
    if (val.permanentAddress) {
      setToggle1(true)
    }
  }

  const handleCurrentAdd = () => {
    setValues({ ...values, ...activeData })
    setToggle(true)
  }

  const handlePermanentAdd = () => {
    setValues({ ...values, ...activePerData })
    setToggle1(true)
  }

  const onSave = async (type) => {
    console.log('type', type)
    try {
      // Validate form
      await submitForm() // This should trigger Formik's validation
      console.log('errors', errors)
      if (isEmpty(errors)) {
        console.log('values', values)
        const param = {
          validFrom: values.validFrom,
          validTo: values.validTo,
          buildingNo: values.buildingNo,
          street: values.street,
          additionalStreet: values.additionalStreet,
          city: values.city,
          state: values.state,
          country: values.country,
          currentAddress: type === 'CURRENT',
          permanentAddress: type === 'PER',
          postalCode: values.postalCode,
          neighborhood: values.neighborhood,
          additionalNo: values.additionalNo,
          employee: employeeId
        }
        let result
        if (addressData?.id) {
          result = await apiClient.put(`employee-details/contact-details/update/${addressData?.id}`, param)
        } else {
          result = await apiClient.post('employee-details/contact-details/add', param)
        }
        console.log('result', result)
        if (result.data && result.data.result) {
          if (type === 'CURRENT') {
            setToggle(false)
          } else if (type === 'PER') {
            setToggle1(false)
          }
          setAddressData(null)
          getDetails()
        }
      }
    } catch {}
  }

  return (
    <>
      <PanelLayout>
        <Panel
          title="Current Address"
          button={
            <div className="align-right">
              <ButtonBox style={{ marginRight: 10 }} type="success" onClick={handleCurrentAdd}>
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
                    dataSource={currentAddressData}
                  />
                </div>
              </Col>
            </Row>
          </div>
        </Panel>
        <Panel
          title="Permanent Address"
          button={
            <div className="align-right">
              <ButtonBox style={{ marginRight: 10 }} type="success" onClick={handlePermanentAdd}>
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
                    dataSource={permAddressData}
                  />
                </div>
              </Col>
            </Row>
          </div>
        </Panel>
      </PanelLayout>
      <ModalBox
        title={`${props.t(addressData ? 'Edit' : 'Add')} ${props.t('Current Address')}`}
        visible={toggle}
        onCancel={() => {
          setToggle(false)
          resetForm()
          setAddressData(null)
        }}
        width={700}
        okText="Save"
        onOk={() => onSave('CURRENT')}
        destroyOnClose>
        <CurrentAddressForm
          currentEmployee={currentEmployee}
          currentDetails={values}
          handleValueChange={handleValueChange}
        />
      </ModalBox>

      <ModalBox
        title={`${props.t(addressData ? 'Edit' : 'Add')} ${props.t('Permanent Address')}`}
        visible={toggle1}
        onCancel={() => {
          setToggle1(false)
          resetForm()
          setAddressData(null)
        }}
        width={700}
        okText="Save"
        onOk={() => onSave('PER')}
        destroyOnClose>
        <PermanentAddressForm
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
    buildingNo: '',
    street: '',
    additionalStreet: '',
    city: '',
    state: '',
    country: '',
    currentAddress: false,
    permanentAddress: false,
    postalCode: '',
    neighborhood: '',
    additionalNo: '',
    validFrom: new Date(),
    validTo: new Date('9999-12-31')
  }),
  validationSchema: Schema,
  handleSubmit: () => null
})(withTranslation()(ContactDetails))
