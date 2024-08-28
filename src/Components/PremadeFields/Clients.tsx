import { PlusOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import clsx from 'clsx'
import { Formik, FormikState, FormikValues, useFormikContext } from 'formik'
import React, { memo, useEffect, useState } from 'react'
import * as Yup from 'yup'
import apiClient from '../../Util/apiClient'
import { Field } from '../Formik'
import Form from '../Formik/Form'
import type { TOptions, TSelect } from '../Formik/types'
import ModalBox from '../ModalBox/ModalBox'

type Props = {
  type?: 'Customer' | 'Vendor'
  forwarder?: boolean
  defaultOptions?: TOptions[]
  add?: boolean
} & TSelect

type TClient = {
  id: string
  name: string
  clientNo: string
  label: string
  value: string
}

type TResult = {
  result: TClient[]
}

type TClientForm = {
  name: string
  type?: 'Customer' | 'Vendor'
  businessType: string
  address: {
    street: string
    additionalStreet: string
    city: string
    postalCode: string
    country: string
  }
  contactPersons: {
    contactEmail: string
    contactPhone: string
  }[]
}

function Clients({ add, type, forwarder, defaultOptions = [], ...props }: Props) {
  const [clients, setClients] = useState<TClient[]>([])
  const [open, setOpen] = useState(false)
  const { setFieldValue } = useFormikContext<FormikState<FormikValues>>()

  const getClients = () => {
    apiClient.get<TResult>('clients/getAllActive', { params: { forwarder, type } }).then(({ data }) => {
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

  const onAdd = ({ address, ...values }: TClientForm) => {
    apiClient
      .post('clients/add', {
        billingAddress: address,
        shippingAddress: address,
        ...values
      })
      .then(({ data }) => {
        if (data && data.result) {
          setFieldValue(props.name, data.result._id)
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
          <Formik
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
          </Formik>
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
