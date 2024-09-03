import { ArrowLeftOutlined } from '@ant-design/icons'
import { Col, message, Row } from 'antd'
import { withFormik } from 'formik'
import _ from 'lodash'
import React, { useEffect, useState } from 'react'
import * as Yup from 'yup'
import Button from '../../../Components/Button'
import { Field, FieldArray, Form } from '../../../Components/Formik'
import ModalBox from '../../../Components/ModalBox/ModalBox'
import Panel from '../../../Layout/Panel'
import PanelLayout from '../../../Layout/PanelLayout'
import apiClient from '../../../Util/apiClient'
import {
  BUSINESS_TYPE_OPTIONS,
  CLIENT_TYPE_OPTIONS,
  COUNTRIES,
  STATUS,
  TAX_OPTIONS
} from '../../../Util/Options'
import { convertSelectOptions } from '../../../Util/Util'
import { addressFieldSchema } from '../../../Util/validationSchema'
import { useTranslation } from 'react-i18next'



const {t} = useTranslation()


const Schema = Yup.object().shape({
  name: Yup.string().required(),
  type: Yup.string().required(),
  account: Yup.number().required(),
  businessType: Yup.string().required(),
  currency: Yup.string().required(),
  taxType: Yup.string().required(),
  taxNo: Yup.string().when('businessType', {
    is: (bt) => bt === 'Company',
    then: (schema) => schema.required()
  }),
  shippingAddress: Yup.object().when('businessType', {
    is: (bt) => bt === 'Company',
    then: () => addressFieldSchema
  }),
  billingAddress: Yup.object().when('businessType', {
    is: (bt) => bt === 'Company',
    then: () => addressFieldSchema
  }),
  contactPersons: Yup.array()
    .of(
      Yup.object().when('businessType', {
        is: (bt) => bt === 'Company',
        then: (schema) =>
          schema.shape({
            contactName: Yup.string().required(),
            contactEmail: Yup.string().required(),
            contactPhone: Yup.string().required()
          })
      })
    )
    .required(),
  banks: Yup.array()
    .of(
      Yup.object().when('businessType', {
        is: (bt) => bt === 'Company',
        then: (schema) =>
          schema.shape({
            bankAccountHolderName: Yup.string().required(),
            bankName: Yup.string().required(),
            bankAccountNo: Yup.string().required(),
            bankSwift: Yup.string().required(),
            bankCurrency: Yup.string().required(),
            bankAddress: Yup.string().required()
          })
      })
    )
    .required(),
  paymentTerm: Yup.number().when('businessType', {
    is: (bt) => bt === 'Company',
    then: (schema) => schema.required()
  }),
  status: Yup.string().required(),
  invitationEmail: Yup.string().email()
})

function ClientForm({
  match: {
    params: { id }
  },
  history,
  values,
  setValues,
  setFieldValue,
  submitForm,
  validateForm
}) {
  const [currencies, setCurrencies] = useState([])
  const [options, setOptions] = useState({})
  const [accountOptions, setAccountOptions] = useState([])

  const [toggle, setToggle] = useState(false)

  const getData = () => {
    if (id) {
      apiClient.get(`clients/get/${id}`).then(({ data }) => {
        if (data && data.result) {
          setValues({ ...values, ...data.result })
        }
      })
    }

    apiClient.get('currencies/getAllActive').then(({ data }) => {
      if (data && data.result) {
        const currencyOptions = data.result.map((val) => {
          val.label = `${val.code} - ${val.name}`
          val.value = val.code

          return val
        })
        setCurrencies(currencyOptions)
      }
    })
    apiClient.get('options/get-by-types', { params: { type: ['PaymentType'] } }).then(({ data }) => {
      if (data && data.result) {
        setOptions(data.result)
      }
    })
  }

  useEffect(() => {
    getData()
  }, [id])

  useEffect(() => {
    if (values.type) {
      const accountCode = values.type === 'Customer' ? 'CUSACC' : 'SUPACC'
      apiClient.get(`chart-of-accounts/options/${accountCode}`).then(({ data }) => {
        if (data?.result) {
          setAccountOptions(convertSelectOptions(data.result, ['accountCode', '-', 'name'], 'code'))
        }
      })
    }
  }, [values.type])

  const onInvite = async () => {
    if (values.invitationEmail && values.invitationEmail !== '') {
      await submitForm()
      validateForm().then((err) => {
        if (_.isEmpty(err)) {
          apiClient
            .put('clients/invitation-to-collaborate', { email: values.invitationEmail, client: id })
            .then(({ data }) => {
              if (data && data.result) {
                message.success('Invitation Sent')
                setToggle(false)
              }
            })
        }
      })
    } else {
      message.error('Please enter email')
    }
  }

  const selectAfter = (
    <Field
      as="select"
      name="discountFormat"
      options={[
        { label: '%', value: '%' },
        { label: '№', value: '' }
      ]}
      className="select-after"
      showArrow={false}
    />
  )

  const onSameAsShipping = () => {
    setFieldValue('billingAddress', values.shippingAddress)
  }

  return (
    <Form>
      <Row justify="center" className="inner-contents">
        <Col xs={22} sm={22} md={20} lg={20}>
          <PanelLayout title={t('Business Partner Details')}>
            <Row gutter={[10, 10]} className="mb-4">
              <Col xs={12} sm={12} md={12} lg={8}>
                <div className="form-field">
                  <Field label="Client No" name="clientNo" disabled={!!id} />
                </div>
              </Col>
              <Col xs={12} sm={12} md={12} lg={8}>
                <div className="form-field">
                  <Field label="Name" name="name" altInput />
                </div>
              </Col>
              <Col xs={12} sm={12} md={12} lg={4}>
                <div className="form-field">
                  <Field
                    label="Type"
                    name="type"
                    as="select"
                    options={CLIENT_TYPE_OPTIONS}
                    disabled={id && values.type}
                  />
                </div>
              </Col>
              <Col xs={12} sm={12} md={12} lg={4}>
                <div className="form-field">
                  <Field
                    label="Business Type"
                    name="businessType"
                    as="select"
                    options={BUSINESS_TYPE_OPTIONS}
                  />
                </div>
              </Col>
              <Col xs={12} sm={12} md={12} lg={4}>
                <div className="form-field">
                  <Field label="Currency" name="currency" as="select" options={currencies} />
                </div>
              </Col>
              <Col xs={12} sm={12} md={12} lg={4}>
                <div className="form-field">
                  <Field label="Tax Type" name="taxType" as="select" options={TAX_OPTIONS} />
                </div>
              </Col>
              <Col xs={12} sm={12} md={12} lg={4}>
                <div className="form-field">
                  <Field label={`${values.taxType} No`} name="taxNo" altInput />
                </div>
              </Col>
              <Col xs={12} sm={12} md={12} lg={6}>
                <div className="form-field">
                  <Field label="Company Reg No" name="crNo" altInput />
                </div>
              </Col>
              <Col xs={12} sm={12} md={12} lg={6}>
                <div className="form-field">
                  <Field label="Account" name="account" as="select" options={accountOptions} />
                </div>
              </Col>
              {values.type === 'Vendor' && (
                <Col xs={12} sm={12} md={12} lg={8}>
                  <div className="form-field mt-4 pt-1 mb-3">
                    <Field as="checkbox" name="forwarder" label="Is Forwarder" />
                  </div>
                </Col>
              )}
            </Row>

            <Panel title={t('Shipping Address Details')}>
              <Row gutter={[10, 10]}>
                <Col xs={12} sm={12} md={12} lg={4}>
                  <div className="form-field">
                    <Field label="Building No" name="shippingAddress.buildingNo" altInput />
                  </div>
                </Col>
                <Col xs={12} sm={12} md={12} lg={4}>
                  <div className="form-field">
                    <Field label="Street" name="shippingAddress.street" altInput />
                  </div>
                </Col>
                <Col xs={12} sm={12} md={12} lg={4}>
                  <div className="form-field">
                    <Field label="Additional Street" name="shippingAddress.additionalStreet" altInput />
                  </div>
                </Col>
                <Col xs={12} sm={12} md={12} lg={4}>
                  <div className="form-field">
                    <Field label="City" name="shippingAddress.city" altInput />
                  </div>
                </Col>
                <Col xs={12} sm={12} md={12} lg={4}>
                  <div className="form-field">
                    <Field label="State" name="shippingAddress.state" altInput />
                  </div>
                </Col>
                <Col xs={12} sm={12} md={12} lg={4}>
                  <div className="form-field">
                    <Field label="Postal Code" name="shippingAddress.postalCode" altInput />
                  </div>
                </Col>
                <Col xs={12} sm={12} md={12} lg={4}>
                  <div className="form-field">
                    <Field
                      label="Country"
                      name="shippingAddress.country"
                      as="select"
                      options={COUNTRIES}
                      altInput
                    />
                  </div>
                </Col>
                <Col xs={12} sm={12} md={12} lg={4}>
                  <div className="form-field">
                    <Field label="Additional No" name="shippingAddress.additionalNo" altInput />
                  </div>
                </Col>
                <Col xs={12} sm={12} md={12} lg={4}>
                  <div className="form-field">
                    <Field label="Neighbourhood" name="shippingAddress.neighbourhood" altInput />
                  </div>
                </Col>
              </Row>
            </Panel>

            <Panel title={t('Billing Address Details')}>
              <div className="same-as-shipping-container" onClick={onSameAsShipping}>
                <i className="flaticon-plus" /> Same as Shipping Address
              </div>
              <Row gutter={[10, 10]}>
                <Col xs={12} sm={12} md={12} lg={4}>
                  <div className="form-field">
                    <Field label="Building No" name="billingAddress.buildingNo" altInput />
                  </div>
                </Col>
                <Col xs={12} sm={12} md={12} lg={4}>
                  <div className="form-field">
                    <Field label="Street" name="billingAddress.street" altInput />
                  </div>
                </Col>
                <Col xs={12} sm={12} md={12} lg={4}>
                  <div className="form-field">
                    <Field label="Additional Street" name="billingAddress.additionalStreet" altInput />
                  </div>
                </Col>
                <Col xs={12} sm={12} md={12} lg={4}>
                  <div className="form-field">
                    <Field label="City" name="billingAddress.city" altInput />
                  </div>
                </Col>
                <Col xs={12} sm={12} md={12} lg={4}>
                  <div className="form-field">
                    <Field label="State" name="billingAddress.state" altInput />
                  </div>
                </Col>
                <Col xs={12} sm={12} md={12} lg={4}>
                  <div className="form-field">
                    <Field label="Postal Code" name="billingAddress.postalCode" altInput />
                  </div>
                </Col>
                <Col xs={12} sm={12} md={12} lg={4}>
                  <div className="form-field">
                    <Field
                      label="Country"
                      name="billingAddress.country"
                      as="select"
                      options={COUNTRIES}
                      altInput
                    />
                  </div>
                </Col>
                <Col xs={12} sm={12} md={12} lg={4}>
                  <div className="form-field">
                    <Field label="Additional No" name="billingAddress.additionalNo" altInput />
                  </div>
                </Col>
                <Col xs={12} sm={12} md={12} lg={4}>
                  <div className="form-field">
                    <Field label="Neighbourhood" name="billingAddress.neighbourhood" altInput />
                  </div>
                </Col>
              </Row>
            </Panel>

            <Panel title={t('Contact Person Details')}>
              <FieldArray
                name="contactPersons"
                editable
                allowEmpty
                defaultValues={{
                  contactName: '',
                  contactEmail: '',
                  contactPhone: ''
                }}>
                {ContactPersonDetails}
              </FieldArray>
            </Panel>

            {values.type !== 'Customer' && (
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
            )}
            <Row gutter={[10, 10]} className="mb-4">
              <Col xs={12} sm={12} md={12} lg={4}>
                <div className="form-field">
                  <Field label="Payment Term(No of Days)" name="paymentTerm" />
                </div>
              </Col>
              <Col xs={12} sm={12} md={12} lg={4}>
                <div className="form-field">
                  <Field label="Default Discount" name="discount" addonAfter={selectAfter} />
                </div>
              </Col>
              <Col xs={12} sm={12} md={12} lg={4}>
                <div className="form-field">
                  <Field
                    label="Payment Type"
                    name="paymentType"
                    as="select"
                    options={options.PaymentType || []}
                  />
                </div>
              </Col>
              <Col xs={12} sm={12} md={12} lg={8}>
                <div className="form-field">
                  <Field label="Notes" name="notes" />
                </div>
              </Col>
              <Col xs={12} sm={12} md={12} lg={4}>
                <div className="form-field">
                  <Field label="Status" name="status" as="select" options={STATUS} />
                </div>
              </Col>
            </Row>
          </PanelLayout>
          <div className="save-changes">
            <Button type="submit" variant="primary">
              {id ? 'Update' : 'Save'}
            </Button>
            {id && !values.clientCompany && (
              <Button variant="primary" onClick={() => setToggle(true)}>
                Invite for Collaboration
              </Button>
            )}
            <Button onClick={() => history.goBack()}>
              <ArrowLeftOutlined /> Back
            </Button>
          </div>
        </Col>
      </Row>
      <ModalBox
        title="Send Invitation"
        visible={toggle}
        onOk={onInvite}
        onCancel={() => setToggle(false)}
        destroyOnClose>
        <Field name="invitationEmail" label="Invitation Email" />
      </ModalBox>
    </Form>
  )
}

export default withFormik({
  mapPropsToValues: () => ({
    clientNo: '',
    name: '',
    type: '',
    businessType: 'Company',
    currency: '',
    taxType: 'VAT',
    taxNo: '',
    crNo: '',
    account: '',
    shippingAddress: {
      buildingNo: '',
      street: '',
      additionalStreet: '',
      city: '',
      state: '',
      postalCode: '',
      country: '',
      additionalNo: '',
      neighbourhood: ''
    },
    billingAddress: {
      buildingNo: '',
      street: '',
      additionalStreet: '',
      city: '',
      state: '',
      postalCode: '',
      country: '',
      additionalNo: '',
      neighbourhood: ''
    },
    contactPersons: [
      {
        contactName: '',
        contactEmail: '',
        contactPhone: ''
      }
    ],
    banks: [],
    paymentTerm: 1,
    discount: '',
    discountFormat: '%',
    paymentType: '',
    notes: '',
    status: 'Active'
  }),
  validationSchema: Schema,
  handleSubmit: (
    data,
    {
      props: {
        history,
        match: {
          params: { id }
        }
      }
    }
  ) => {
    if (id) {
      data.contactPersons = data.contactPersons.filter((v) => v.contactName)
      data.banks = data.banks.filter((v) => v.bankAccountNo)
      apiClient.put(`clients/update/${id}`, data).then(({ data }) => {
        if (data && data.result) {
          history('/app/clients')
        }
      })
    } else {
      apiClient.post('clients/add', data).then(({ data }) => {
        if (data && data.result) {
          history('/app/clients')
        }
      })
    }
  }
})(ClientForm)

function ContactPersonDetails({ i }) {
  return (
    <Row gutter={[10, 5]}>
      <Col xs={12} sm={12} md={8} lg={8} xl={8}>
        <div className="form-field">
          <Field name={`contactPersons[${i}].contactName`} label="Name" altInput />
        </div>
      </Col>
      <Col xs={12} sm={12} md={8} lg={8} xl={8}>
        <div className="form-field">
          <Field name={`contactPersons[${i}].contactEmail`} label="Email" />
        </div>
      </Col>
      <Col xs={12} sm={12} md={8} lg={8} xl={8}>
        <div className="form-field">
          <Field name={`contactPersons[${i}].contactPhone`} label="Phone" />
        </div>
      </Col>
    </Row>
  )
}

function BankDetails({ i }) {
  return (
    <Row gutter={[10, 5]}>
      <Col xs={12} sm={12} md={8} lg={4} xl={4}>
        <div className="form-field">
          <Field name={`banks[${i}].bankAccountHolderName`} label="Account Holder Name" />
        </div>
      </Col>
      <Col xs={12} sm={12} md={8} lg={4} xl={4}>
        <div className="form-field">
          <Field name={`banks[${i}].bankName`} label="Bank Name" />
        </div>
      </Col>
      <Col xs={12} sm={12} md={8} lg={4} xl={4}>
        <div className="form-field">
          <Field name={`banks[${i}].bankAccountNo`} label="Bank Account No" />
        </div>
      </Col>
      <Col xs={12} sm={12} md={8} lg={4} xl={4}>
        <div className="form-field">
          <Field name={`banks[${i}].bankSwift`} label="Bank Swift" />
        </div>
      </Col>
      <Col xs={12} sm={12} md={8} lg={4} xl={4}>
        <div className="form-field">
          <Field name={`banks[${i}].bankCurrency`} label="Bank Currency" />
        </div>
      </Col>
      <Col xs={12} sm={12} md={8} lg={4} xl={4}>
        <div className="form-field">
          <Field name={`banks[${i}].bankAddress`} label="Bank Address" />
        </div>
      </Col>
    </Row>
  )
}
