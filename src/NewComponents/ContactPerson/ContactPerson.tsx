import { Col, Row } from 'antd'
import _ from 'lodash'
import React, { memo, useState } from 'react'
import { useFormContext, useWatch } from 'react-hook-form'
import ModalBox from '../../Components/ModalBox/ModalBox'
import { Field } from '../Form'

export type TContactPerson = {
  contactName: string
  contactEmail: string
  contactPhone: string
}

type Props = {
  name?: string
  label?: string
  disabled: boolean
}

function ContactPerson({ name = 'contactPerson', label = 'Contact Person', disabled }: Props) {
  const {
    formState: { errors, touchedFields }
  } = useFormContext()
  const contactPerson: TContactPerson = useWatch({ name })
  const [toggle, setToggle] = useState(false)

  const error = _.get(errors, name)

  return (
    <>
      <ModalBox
        title="Update Contact Person"
        visible={toggle}
        onOk={() => setToggle(false)}
        onCancel={() => setToggle(false)}
        destroyOnClose>
        <Row gutter={[10, 5]}>
          <Col xs={24}>
            <div className="form-field">
              <Field name={`${name}.contactName`} label="Contact Name" altInput />
            </div>
          </Col>
          <Col xs={24}>
            <div className="form-field">
              <Field name={`${name}.contactEmail`} label="Contact Email" />
            </div>
          </Col>
          <Col xs={24}>
            <div className="form-field">
              <Field name={`${name}.contactPhone`} label="Contact Phone" />
            </div>
          </Col>
        </Row>
      </ModalBox>
      <div className="form-field">
        <div className="d-flex align-items-center">
          <label className="mb-0 w-auto">
            {label}
            {Boolean(error) && <span className="required">*</span>}
          </label>
          {!disabled && (
            <span style={{ fontSize: '19px', height: '28px' }}>
              <i className="ml-2 flaticon-edit-1" onClick={() => setToggle(true)} />
            </span>
          )}
        </div>
        {contactPerson ? (
          <div style={{ fontSize: '14px' }} className="d-flex align-items-center">
            {_.compact([
              contactPerson.contactName,
              contactPerson.contactEmail,
              contactPerson.contactPhone
            ]).join(', ')}
          </div>
        ) : (
          <div className="text-muted d-flex align-items-center">Enter Contact Person</div>
        )}
      </div>
      {error && _.get(touchedFields, name) && (
        <div style={{ fontSize: 10, color: 'red' }}>{`${label} required`}</div>
      )}
    </>
  )
}

export default memo(ContactPerson)
