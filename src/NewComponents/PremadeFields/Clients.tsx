import { PlusOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import { SelectValue } from 'antd/lib/select'
import clsx from 'clsx'
import React, { memo, useEffect, useState } from 'react'
import { useFormContext, useWatch } from 'react-hook-form'
import * as Yup from 'yup'
import ModalBox from '../../Components/ModalBox/ModalBox'
import useDidUpdateEffect from '../../Hooks/useDidUpdateEffect'
import apiClient from '../../Util/apiClient'
import { TContactPerson } from '../ContactPerson/ContactPerson'
import { Field, Form, FormProvider } from '../Form'
import type { TOption, TSelect } from '../Form/types'

export type Props<Option extends TClient, V extends SelectValue, TFieldName extends string> = {
  name: TFieldName
  type?: 'Customer' | 'Vendor'
  forwarder?: boolean
  add?: boolean
  defaultOptions?: Option[]
  onClientChange?: (option: TClient) => void
} & TSelect<Option, V, TFieldName>

export type TClient = {
  id: string
  name: string
  nameAlt: string
  clientNo: string
  currency: string
  billingAddress: Address
  shippingAddress: Address
  contactPersons: TContactPerson[]
  group: string
  paymentTerm: TNumber
  discount: number
  discountFormat: PercentageFormat
  payTermOption: string
  taxType: string
  taxNo: string
  clientCompany: string
} & TOption

type TResult<T> = {
  result: T[]
}

export type Address = {
  street: string
  additionalStreet: string
  city: string
  postalCode: string
  country: string
}

interface ClientForm {
  name: string
  type?: 'Customer' | 'Vendor'
  businessType: string
  address: Address
  contactPersons: TContactPerson[]
}

function Clients<Option extends TClient, V extends SelectValue, TFieldName extends string>({
  add,
  type,
  forwarder,
  defaultOptions = [],
  onClientChange,
  ...props
}: Props<Option, V, TFieldName>) {
  const [clients, setClients] = useState<Option[]>([])
  const [open, setOpen] = useState(false)
  const { setValue } = useFormContext()

  const clientId = useWatch({
    name: props.name
  })

  const getClients = () => {
    apiClient
      .get<TResult<Option>>('clients/getAllActive', { params: { forwarder, type } })
      .then(({ data }) => {
        if (data && data.result) {
          const clientOptions = data.result.map((v) => {
            v.label = `${v.clientNo} - ${v.name}`
            v.value = v.id

            return v
          })
          setClients(clientOptions)
        }
      })
  }

  useEffect(() => {
    if (!props.options) {
      getClients()
    }
  }, [])

  useDidUpdateEffect(() => {
    const client = clients.find((option) => option.id === clientId)

    if (client) {
      onClientChange?.(client)
    }
  }, [clients.length, clientId])

  const onAdd = ({ address, ...values }: ClientForm) => {
    apiClient
      .post('clients/add', {
        billingAddress: address,
        shippingAddress: address,
        ...values
      })
      .then(({ data }) => {
        if (data && data.result) {
          setValue(props.name, data.result._id)
          setOpen(false)

          if (!props.options) {
            setClients([
              ...clients,
              {
                label: `${data.result.clientNo} - ${data.result.name}`,
                value: data.result.id,
                ...data.result
              }
            ])
          }
        }
      })
  }

  const condition = add && !props.disabled

  return (
    <div className={clsx(condition && 'select-merge')}>
      {condition && (
        <ModalBox visible={open} title={`Add ${type}`} onCancel={() => setOpen(false)} footer={false}>
          <FormProvider
            initialValues={{
              name: '',
              type,
              businessType: 'Individual',
              newAccount: 'Yes',
              address: {
                street: '',
                additionalStreet: '',
                city: '',
                postalCode: '',
                country: ''
              },
              contactPersons: [
                {
                  contactName: '',
                  contactEmail: '',
                  contactPhone: ''
                }
              ]
            }}
            validationSchema={Yup.object().shape({
              name: Yup.string().required()
            })}
            onSubmit={onAdd}>
            <Form>
              <div className="form-field">
                <Field name="name" label={`${type} Name`} />
              </div>
              <div className="form-field">
                <Field name="address.street" label="Street" />
              </div>
              <div className="form-field">
                <Field name="address.additionalStreet" label="Additional Street" />
              </div>
              <div className="form-field">
                <Field name="address.city" label="City" />
              </div>
              <div className="form-field">
                <Field name="address.postalCode" label="Postal Code" />
              </div>
              <div className="form-field">
                <Field name="address.country" label="Country" />
              </div>
              <div className="form-field">
                <Field name="contactPersons[0].contactEmail" label="Contact Email" />
              </div>
              <div className="form-field">
                <Field name="contactPersons[0].contactPhone" label="Contact Phone" />
              </div>
              <div className="form-field mt-4">
                <Button type="primary" htmlType="submit">
                  Add
                </Button>
              </div>
            </Form>
          </FormProvider>
        </ModalBox>
      )}
      <div className="w-100">
        <Field as="select" options={[...defaultOptions, ...clients]} {...props} />
      </div>
      {condition && (
        <Button className="ant-btn-success" icon={<PlusOutlined />} onClick={() => setOpen(!open)} />
      )}
    </div>
  )
}

export default memo(Clients)
