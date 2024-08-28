import { ArrowLeftOutlined } from '@ant-design/icons'
import { Col, message, Row } from 'antd'
import { withFormik } from 'formik'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import * as Yup from 'yup'
import Button from '../../../Components/Button'
import { Field, FieldArray, Form } from '../../../Components/Formik'
import UploadBox from '../../../Components/UploadBox/UploadBox'
import Panel from '../../../Layout/Panel'
import PanelLayout from '../../../Layout/PanelLayout'
import apiClient from '../../../Util/apiClient'
import { COUNTRIES, TAX_OPTIONS, TIMEZONES } from '../../../Util/Options'

const Schema = Yup.object().shape({
  name: Yup.string().required(),
  country: Yup.string().required(),
  currency: Yup.string().required(),
  crNo: Yup.string().required(),
  timeZone: Yup.string().required(),
  taxType: Yup.string().required(),
  taxNo: Yup.string().required(),
  tax: Yup.number().required(),
  email: Yup.string().required(),
  phone: Yup.string().required(),
  street: Yup.string().required(),
  city: Yup.string().required(),
  postalCode: Yup.string().required(),
  banks: Yup.array()
    .of(
      Yup.object().shape({
        bankAccountHolderName: Yup.string().required(),
        bankName: Yup.string().required(),
        bankAccountNo: Yup.string().required(),
        bankSwift: Yup.string().required(),
        bankCurrency: Yup.string().required(),
        bankAddress: Yup.string().required()
      })
    )
    .required()
})

function CompanyForm({
  match: {
    params: { id }
  },
  history,
  values,
  setValues,
  setFieldValue,
  ...props
}) {
  const [currencies, setCurrencies] = useState([])
  const { t } = useTranslation()

  const getData = () => {
    if (id) {
      apiClient.get(`companies/get/${id}`).then(({ data }) => {
        if (data && data.result) {
          setValues({ ...values, ...data.result })
        }
      })
    }

    apiClient.get('currencies/getMaster').then(({ data }) => {
      if (data && data.result) {
        const currencyOptions = data.result.map((val) => {
          val.label = `${val.code} - ${val.name}`
          val.value = val.code

          return val
        })
        setCurrencies(currencyOptions)
      }
    })
  }

  useEffect(() => {
    getData()
  }, [])

  const selectAfter = (
    <Field
      as="select"
      name="taxFormat"
      options={[
        { label: '%', value: '%' },
        { label: '№', value: '' }
      ]}
      className="select-after"
      showArrow={false}
    />
  )

  return (
    <Form>
      <Row justify="center" className="inner-contents">
        <Col xs={22} sm={22} md={20} lg={20}>
          <PanelLayout title={t(`Company Details (DNID - ${props?.userInfo?.network})`)}>
            <Row gutter={[10, 10]} className="mb-4">
              <Col xs={12} sm={12} md={12} lg={12}>
                <div className="form-field">
                  <Field label="Name" name="name" altInput />
                </div>
              </Col>
              <Col xs={12} sm={12} md={12} lg={4}>
                <div className="form-field">
                  <Field label="Country" name="country" as="select" options={COUNTRIES} altInput />
                </div>
              </Col>
              <Col xs={12} sm={12} md={12} lg={4}>
                <div className="form-field">
                  <Field label="Currency" name="currency" as="select" options={currencies} disabled={id} />
                </div>
              </Col>
              <Col xs={12} sm={12} md={12} lg={4}>
                <div className="form-field">
                  <UploadBox
                    id="logo"
                    label="Upload logo"
                    value={values.logo}
                    onUpload={(v) => setFieldValue('logo', v)}
                    height={100}
                    width={300}
                  />
                </div>
              </Col>
              <Col xs={12} sm={12} md={12} lg={8}>
                <div className="form-field">
                  <Field label="Company Reg No" name="crNo" altInput />
                </div>
              </Col>
              <Col xs={12} sm={12} md={12} lg={8}>
                <div className="form-field">
                  <Field label="Time Zone" name="timeZone" as="select" options={TIMEZONES} />
                </div>
              </Col>
            </Row>

            <Panel title={t('Tax Details')}>
              <Row gutter={[10, 10]}>
                <Col xs={12} sm={12} md={12} lg={8}>
                  <div className="form-field">
                    <Field label="Tax Type" name="taxType" as="select" options={TAX_OPTIONS} />
                  </div>
                </Col>
                <Col xs={12} sm={12} md={12} lg={8}>
                  <div className="form-field">
                    <Field label={`${values.taxType} No`} name="taxNo" altInput />
                  </div>
                </Col>
                <Col xs={12} sm={12} md={12} lg={8}>
                  <div className="form-field">
                    <Field label={`${values.taxType}`} name="tax" addonAfter={selectAfter} />
                  </div>
                </Col>
              </Row>
            </Panel>

            <Row gutter={[10, 10]} className="mb-4">
              <Col xs={12} sm={12} md={12} lg={8}>
                <div className="form-field">
                  <Field label="Email" name="email" />
                </div>
              </Col>
              <Col xs={12} sm={12} md={12} lg={8}>
                <div className="form-field">
                  <Field label="Phone" name="phone" />
                </div>
              </Col>
            </Row>

            <Panel title={t('Address Details')}>
              <Row gutter={[10, 10]}>
                <Col xs={12} sm={12} md={12} lg={4}>
                  <div className="form-field">
                    <Field label="Building No" name="buildingNo" altInput />
                  </div>
                </Col>
                <Col xs={12} sm={12} md={12} lg={8}>
                  <div className="form-field">
                    <Field label="Street" name="street" altInput />
                  </div>
                </Col>
                <Col xs={12} sm={12} md={12} lg={8}>
                  <div className="form-field">
                    <Field label="Additional Street" name="additionalStreet" altInput />
                  </div>
                </Col>
                <Col xs={12} sm={12} md={12} lg={4}>
                  <div className="form-field">
                    <Field label="City" name="city" altInput />
                  </div>
                </Col>
                <Col xs={12} sm={12} md={12} lg={6}>
                  <div className="form-field">
                    <Field label="State" name="state" altInput />
                  </div>
                </Col>
                <Col xs={12} sm={12} md={12} lg={6}>
                  <div className="form-field">
                    <Field label="Postal Code" name="postalCode" altInput />
                  </div>
                </Col>
                <Col xs={12} sm={12} md={12} lg={4}>
                  <div className="form-field">
                    <Field label="Additional No" name="additionalNo" altInput />
                  </div>
                </Col>
                <Col xs={12} sm={12} md={12} lg={4}>
                  <div className="form-field">
                    <Field label="Neighbourhood" name="neighbourhood" altInput />
                  </div>
                </Col>
              </Row>
            </Panel>

            <Panel title={t('Bank Details')}>
              <FieldArray
                name="banks"
                editable
                allowEmpty
                defaultValues={{
                  bankAccountHolderName: '',
                  bankName: '',
                  bankAccountNo: '',
                  bankSwift: '',
                  bankCurrency: '',
                  bankAddress: ''
                }}>
                {BankDetails}
              </FieldArray>
            </Panel>
          </PanelLayout>
          <div className="save-changes">
            <Button type="submit" variant="primary">
              {id ? 'Update' : 'Save'}
            </Button>
            <Button onClick={() => history.goBack()}>
              <ArrowLeftOutlined /> Back
            </Button>
          </div>
        </Col>
      </Row>
    </Form>
  )
}

export default withFormik({
  mapPropsToValues: ({
    match: {
      params: { id }
    },
    userInfo
  }) => ({
    name: '',
    country: '',
    currency: '',
    crNo: '',
    timeZone: '',
    taxType: 'VAT',
    taxNo: '',
    tax: '',
    taxFormat: '%',

    email: id ? '' : userInfo.email,
    phone: '',

    buildingNo: '',
    street: '',
    additionalStreet: '',
    city: '',
    state: '',
    postalCode: '',
    additionalNo: '',
    neighbourhood: '',

    banks: []
  }),
  validationSchema: Schema,
  handleSubmit: (
    data,
    {
      props: {
        history,
        match: {
          params: { id }
        },
        dispatch
      }
    }
  ) => {
    if (id) {
      apiClient.put(`companies/update/${id}`, data).then(({ data }) => {
        if (data && data.result) {
          dispatch({ type: 'SET_USER_REDUCER', payload: { companyInfo: data.result } })
          message.success('Company Updated')
        }
      })
    } else {
      apiClient.post('companies/add', data).then(({ data }) => {
        if (data && data.result) {
          history.push('/app/manage-company')
        }
      })
    }
  }
})(CompanyForm)

function BankDetails({ i }) {
  return (
    <Row gutter={[10, 5]}>
      <Col xs={12} sm={12} md={8} lg={4} xl={4}>
        <div className="form-field">
          <Field name={`banks[${i}].bankAccountHolderName`} label="Account Holder Name" altInput />
        </div>
      </Col>
      <Col xs={12} sm={12} md={8} lg={4} xl={4}>
        <div className="form-field">
          <Field name={`banks[${i}].bankName`} label="Bank Name" altInput />
        </div>
      </Col>
      <Col xs={12} sm={12} md={8} lg={4} xl={4}>
        <div className="form-field">
          <Field name={`banks[${i}].bankAccountNo`} label="Bank Account No" altInput />
        </div>
      </Col>
      <Col xs={12} sm={12} md={8} lg={4} xl={4}>
        <div className="form-field">
          <Field name={`banks[${i}].bankSwift`} label="Bank Swift" altInput />
        </div>
      </Col>
      <Col xs={12} sm={12} md={8} lg={4} xl={4}>
        <div className="form-field">
          <Field name={`banks[${i}].bankCurrency`} label="Bank Currency" altInput />
        </div>
      </Col>
      <Col xs={12} sm={12} md={8} lg={4} xl={4}>
        <div className="form-field">
          <Field name={`banks[${i}].bankAddress`} label="Bank Address" altInput />
        </div>
      </Col>
    </Row>
  )
}
