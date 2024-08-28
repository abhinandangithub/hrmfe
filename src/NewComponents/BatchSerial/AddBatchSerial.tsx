import { InfoCircleOutlined } from '@ant-design/icons'
import { Col, message, Row, Tooltip } from 'antd'
import _ from 'lodash'
import moment from 'moment'
import React, { memo, useEffect, useRef, useState } from 'react'
import { useFormContext, useWatch } from 'react-hook-form'
import Button from '../../Components/Button'
import ModalBox from '../../Components/ModalBox/ModalBox'
import TableBox, { ColumnsType } from '../../Components/TableBox/TableBox'
import { useSelector } from '../../Hooks/redux'
import useDidUpdateEffect from '../../Hooks/useDidUpdateEffect'
import { parseAmount } from '../../Util/Util'
import { addBatchSerialSchema } from '../../Util/validationSchema'
import { ErrorMessage, Field, Form, FormProvider, FormProviderBag } from '../Form'
import GenerateBatchSerial from './GenerateBatchSerial'
import { DEFAULT_BATCH_SERIAL_FIELDS, TBatchSerial } from './types'

export type TAddBatchSerial<TFieldName extends string = string> = {
  name: TFieldName
  quantity: TNumber
  price: TNumber
  disabled?: boolean
  batch?: boolean
  serial?: boolean
  batchSerials: TBatchSerial[]
  materialCode: string
  materialDescription?: string
  warehouse?: string
  location?: string
  rack?: string
  onChange?: (name: TFieldName, value: TBatchSerial[]) => void
}

type TFormValues = {
  batch?: boolean
  serial?: boolean
  batchSerials: TBatchSerial[]
}

function AddBatchSerial<TFieldName extends string = string>({
  batchSerials = [],
  onChange,
  ...props
}: TAddBatchSerial<TFieldName>) {
  const { name, batch, price, serial, disabled, quantity } = props
  const [show, setShow] = useState(false)
  const form = useRef<FormProviderBag<TFormValues>>(null)

  const defaultBatchSerial = {
    ...DEFAULT_BATCH_SERIAL_FIELDS,
    batch,
    serial
  }

  useEffect(() => {
    if (show && batchSerials?.length) {
      setTimeout(() => {
        form.current?.setValue(
          'batchSerials',
          disabled
            ? batchSerials
            : batchSerials.map((batchSerial) => ({
                ...batchSerial,
                price,
                batch,
                serial
              }))
        )
      }, 0)
    }
  }, [show])

  useDidUpdateEffect(() => {
    onChange?.(
      name,
      batchSerials.filter((item) => item.quantity).map((item) => ({ ...item, price }))
    )
  }, [price])

  return (
    <div>
      <ModalBox
        title="Batch/ Serial"
        width={900}
        visible={show}
        onCancel={() => setShow(false)}
        onOk={() => form.current?.submitForm()}
        {...(disabled && { footer: false })}>
        <FormProvider
          innerRef={form}
          initialValues={{
            batch,
            serial,
            batchSerials: [defaultBatchSerial]
          }}
          onSubmit={(values) => {
            if (
              _.sumBy(values.batchSerials, (batchSerial) => Number(batchSerial.quantity || 0)) ===
              Number(quantity)
            ) {
              onChange?.(
                name,
                values.batchSerials.filter((item) => item.quantity).map((item) => ({ ...item, price }))
              )
              setShow(false)
            } else {
              message.error('Required Qty and Total Batch / Serial Qty not equal')
            }
          }}
          validationSchema={addBatchSerialSchema}>
          <AddBatchSerialForm defaultBatchSerial={defaultBatchSerial} {...props} />
        </FormProvider>
      </ModalBox>
      <Tooltip title="Batch/ Serial">
        <Button
          icon={<InfoCircleOutlined className="d-flex justify-content-center" />}
          size="small"
          onClick={() => setShow(true)}
        />
      </Tooltip>
      {!disabled && (
        <div style={{ fontSize: 10, color: 'red', textAlign: 'right' }}>
          <ErrorMessage name={name} render={(error) => error?.replace(name, 'Batch/Serial')} />
        </div>
      )}
    </div>
  )
}

type AddBatchSerialFormProps = {
  defaultBatchSerial: Pick<TFormValues, 'batch' | 'serial'> & TBatchSerial
} & Omit<TAddBatchSerial, 'batchSerials' | 'onChange'>

const AddBatchSerialForm = ({
  defaultBatchSerial,
  disabled,
  materialCode,
  materialDescription,
  warehouse,
  location,
  rack,
  quantity,
  price,
  batch,
  serial,
  name
}: AddBatchSerialFormProps) => {
  const {
    userInfo,
    companyInfo: { configurations }
  } = useSelector((state) => state.users)
  const currentRole = userInfo.roleData?.name || userInfo.userType

  const { setValue, control } = useFormContext<TFormValues>()
  const batchSerials = useWatch({
    name: 'batchSerials',
    control
  })

  return (
    <Form>
      {!disabled && (
        <GenerateBatchSerial
          key={quantity}
          quantity={quantity}
          onGenerate={(type, batchNo, manufacturingDate, expiryDate, series) => {
            setValue('batchSerials', [
              ...batchSerials.filter((item) => item.batchNo || item.serialNo),
              ...series.map((item) => ({
                ...defaultBatchSerial,
                manufacturingDate,
                expiryDate,
                quantity: type === 'serial' ? 1 : ('' as const),
                batchNo,
                price,
                [`${type}No`]: item
              }))
            ])
          }}
        />
      )}
      <Row gutter={[20, 2]} className="form-field">
        <Col>
          <label>Material Code</label> : {materialCode}
        </Col>
        <Col>
          <label>Material Description</label> : {materialDescription}
        </Col>
        <Col>
          <label>Warehouse</label> : {warehouse}
        </Col>
        {location && (
          <Col>
            <label>Location</label> : {location}
          </Col>
        )}
        {rack && (
          <Col>
            <label>Rack</label> : {rack}
          </Col>
        )}
      </Row>
      <TableBox
        columns={(() => {
          const columns: ColumnsType<TBatchSerial>[] = [
            {
              dataIndex: 'batchNo',
              title: 'Batch No',
              width: 150,
              render: (v, r, i) => (
                <Field
                  autoFocus={batch && !serial}
                  name={`batchSerials.${i}.batchNo` as const}
                  label="Batch No"
                  scanInput
                  scanType="barcode"
                  onScan={(n, v) => {
                    if (batchSerials.some((batchSerial) => batchSerial.batchNo === v)) {
                      message.error('Batch No already exist')
                    } else {
                      setValue(n, v)
                      document.getElementsByName(`batchSerials.${i}.quantity`)[0]?.focus()
                    }
                  }}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      document.getElementsByName(`batchSerials.${i}.quantity`)[0]?.focus()
                    }
                  }}
                  hideLabel
                />
              )
            },
            {
              dataIndex: 'serialNo',
              title: 'Serial No',
              width: 150,
              render: (v, r, i) => (
                <Field
                  autoFocus={serial}
                  name={`batchSerials.${i}.serialNo` as const}
                  label="Serial No"
                  scanInput
                  scanType="barcode"
                  onScan={(n, v) => {
                    if (batchSerials.some((batchSerial) => batchSerial.serialNo === v)) {
                      message.error('Serial No already exist')
                    } else {
                      setValue(n, v)

                      if (serial) {
                        setValue(`batchSerials.${i}.quantity`, 1)
                      }

                      document.getElementsByName(`batchSerials.${i}.manufacturingDate`)[0]?.focus()
                    }
                  }}
                  onChange={(n, v) => {
                    setValue(n, v as string)

                    if (serial) {
                      setValue(`batchSerials.${i}.quantity`, 1)
                    }
                  }}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && serial) {
                      document.getElementsByName(`batchSerials.${i}.manufacturingDate`)[0]?.focus()
                    }
                  }}
                  hideLabel
                />
              )
            },
            {
              dataIndex: 'quantity',
              title: 'Quantity',
              width: 120,
              render: (v, r, i) => (
                <Field
                  type="number"
                  name={`batchSerials.${i}.quantity` as const}
                  label="Qty."
                  onChange={(n, v) => {
                    setValue(`batchSerials.${i}.price`, price)

                    return setValue(n, Number(v || 0))
                  }}
                  hideLabel
                />
              )
            },
            {
              dataIndex: 'manufacturingDate',
              title: 'Mfg. Date',
              width: 150,
              render: (v, r, i) => (
                <Field as="date" name={`batchSerials.${i}.manufacturingDate`} label="Mfg. Date" hideLabel />
              )
            },
            {
              dataIndex: 'expiryDate',
              title: 'Expiry Date',
              width: 150,
              render: (v, r, i) => (
                <Field as="date" name={`batchSerials.${i}.expiryDate`} label="Expiry Date" hideLabel />
              )
            },
            {
              dataIndex: 'price',
              title: 'Price',
              width: 80,
              align: 'right',
              dontShow: !(
                !configurations.stockPriceAccess?.length ||
                configurations.stockPriceAccess?.includes(currentRole)
              )
            }
          ]

          if (disabled) {
            return columns.map((item) => {
              item = _.omit(item, 'render')

              if (/date/i.test(item.dataIndex?.toString() || '')) {
                item.render = (date) => moment(date).format('YYYY-MM-DD')
              }

              return item
            })
          }

          columns.push({
            fixed: 'right',
            width: '30px',
            render: (v, r, index) => (
              <Button
                variant="primary"
                className="btn-glow delete-field d-flex justify-content-center"
                style={{ width: '23px' }}
                onClick={() => {
                  setValue(
                    'batchSerials',
                    batchSerials.filter((item, i) => index !== i)
                  )
                }}>
                <i className="flaticon-delete-2 mr-0" />
              </Button>
            )
          })

          return columns
        })()}
        dataSource={batchSerials.map((item, i) => ({ ...item, key: i }))}
        scroll={{ x: '100%' }}
        pagination={false}
      />
      <div style={{ fontSize: 10, color: 'red' }}>
        <ErrorMessage
          name="batchSerials"
          render={(error) => {
            if (typeof error === 'string') {
              return error.replace(name, '')
            }

            return null
          }}
        />
      </div>
      {!disabled && (
        <>
          <div className="d-flex justify-content-end pt-2">
            <Button
              success
              onClick={() => {
                setValue('batchSerials', [...batchSerials, defaultBatchSerial])
              }}>
              <i className="flaticon-plus" /> Add
            </Button>
          </div>
          <Row gutter={[20, 10]} className="pt-3">
            <Col xs={12} sm={8}>
              <h4 className="mb-0">Required Qty:</h4>
            </Col>
            <Col xs={3}>
              <span>{quantity || 0}</span>
            </Col>
          </Row>
          <Row gutter={[20, 10]}>
            <Col xs={12} sm={8}>
              <h4 className="mb-0">Total Batch / Serial Qty:</h4>
            </Col>
            <Col xs={3}>
              <span>{_.sumBy(batchSerials, 'quantity')}</span>
            </Col>
          </Row>
          {(!configurations.stockPriceAccess?.length ||
            configurations.stockPriceAccess?.includes(currentRole)) && (
            <Row gutter={[20, 10]}>
              <Col xs={12} sm={8}>
                <h4 className="mb-0">Total Value:</h4>
              </Col>
              <Col xs={3}>
                <span>
                  {parseAmount(
                    _.sumBy(batchSerials, ({ quantity, price }) => Number(quantity) * Number(price))
                  )}
                </span>
              </Col>
            </Row>
          )}
        </>
      )}
    </Form>
  )
}

export default memo(AddBatchSerial)
