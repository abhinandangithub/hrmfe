import { InfoCircleOutlined } from '@ant-design/icons'
import { Col, message, Row, Tooltip } from 'antd'
import { ErrorMessage, Formik, FormikProps } from 'formik'
import _ from 'lodash'
import moment from 'moment'
import { OptionData } from 'rc-select/lib/interface/index'
import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from '../../Hooks/redux'
import { DEFAULT_BATCH_SERIAL_FIELDS, TBatchSerial } from '../../NewComponents/BatchSerial/types'
import { selectBatchSerialSchema } from '../../Util/validationSchema'
import Button from '../Button'
import { Field, Form } from '../Formik'
import ModalBox from '../ModalBox/ModalBox'
import TableBox, { ColumnsType } from '../TableBox/TableBox'
import { BatchSerialField } from './index'

type Props = {
  name: string
  quantity: TNumber
  materialCode: string
  materialDescription: string
  warehouse: string
  location: string
  rack: string
  batch: boolean
  serial: boolean
  disabled?: boolean
  returns?: boolean
  batchSerials: TBatchSerial[]
  onChange?: (name: string, value: TBatchSerial[]) => void
}

export default function SelectBatchSerial({
  name,
  disabled,
  returns,
  materialCode,
  materialDescription,
  warehouse,
  location,
  rack,
  quantity,
  batch,
  serial,
  batchSerials = [],
  onChange
}: Props) {
  const [show, setShow] = useState(false)
  const formik = useRef<FormikProps<{ batchSerials: TBatchSerial[] }>>(null)
  const {
    userInfo,
    companyInfo: { configurations }
  } = useSelector((state) => state.users)
  const currentRole = userInfo.roleData?.name || userInfo.userType

  useEffect(() => {
    if (show && batchSerials.length) {
      setTimeout(() => {
        formik.current?.setFieldValue(
          'batchSerials',
          returns
            ? batchSerials
            : batchSerials.map((item) => ({ ...item, stockQuantity: item.stockQuantity || item.quantity }))
        )
      }, 0)
    }
  }, [show])

  const addRow = (batchSerials = formik.current?.values.batchSerials) => {
    if (batchSerials) {
      formik.current?.setFieldValue('batchSerials', [...batchSerials, DEFAULT_BATCH_SERIAL_FIELDS])
    }
  }

  const handleChange = (name: string, index: number, option: OptionData) => {
    const batchSerials = formik.current?.values.batchSerials.map((batchSerial, i) => {
      if (i === index) {
        batchSerial = {
          ...DEFAULT_BATCH_SERIAL_FIELDS,
          ...(serial && { quantity: 1 }),
          ..._.pick(option, ['batchNo', 'serialNo', 'manufacturingDate', 'expiryDate', 'price']),
          stockQuantity: _.get(option, 'quantity', 0)
        }
      }

      return batchSerial
    })

    if (name === 'batchNo') {
      formik.current?.setFieldValue('batchSerials', batchSerials)
      document.getElementsByName(`batchSerials[${index}].quantity`)[0]?.focus()
    } else {
      addRow(batchSerials)
    }
  }

  return (
    <div>
      <ModalBox
        title="Batch/ Serial"
        width={900}
        visible={show}
        onCancel={() => setShow(false)}
        onOk={() => formik.current?.submitForm()}
        {...(disabled && { footer: false })}>
        <Formik
          innerRef={formik}
          initialValues={{ batchSerials: [{ ...DEFAULT_BATCH_SERIAL_FIELDS, stockQuantity: 0 }] }}
          onSubmit={(values) => {
            if (
              _.sumBy(values.batchSerials, (batchSerial) => Number(batchSerial.quantity || 0)) ===
              Number(quantity)
            ) {
              onChange?.(
                name,
                values.batchSerials.filter((item) => item.quantity)
              )
              setShow(false)
            } else {
              message.error('Required Qty and Total Batch / Serial Qty not equal')
            }
          }}
          validationSchema={selectBatchSerialSchema}>
          {({ values, setFieldValue }) => (
            <Form>
              <Row gutter={[20, 2]} className="form-field">
                <Col>
                  <label>Material Code : </label>
                  {materialCode}
                </Col>
                <Col>
                  <label>Material Description : </label>
                  {materialDescription}
                </Col>
                {warehouse && (
                  <Col>
                    <label>Warehouse : </label>
                    {warehouse}
                  </Col>
                )}
                {location && (
                  <Col>
                    <label>Location : </label>
                    {location}
                  </Col>
                )}
                {rack && (
                  <Col>
                    <label>Rack : </label>
                    {rack}
                  </Col>
                )}
              </Row>
              <TableBox
                columns={(() => {
                  const columns: ColumnsType<TBatchSerial>[] = [
                    {
                      dataIndex: 'batchNo',
                      title: 'Batch No.',
                      ...(!returns && {
                        width: 180,
                        render: (v, r, i) => (
                          <BatchSerialField
                            autoFocus={batch && !serial}
                            type="batch"
                            {...{ materialCode, warehouse, location, rack }}
                            name={`batchSerials[${i}].batchNo`}
                            label="Batch No."
                            onSelect={(v, o) => {
                              if (values.batchSerials.some((batchSerial) => batchSerial.batchNo === v)) {
                                message.error('Batch No already exist')
                              } else {
                                handleChange('batchNo', i, o as OptionData)
                              }
                            }}
                            hideLabel
                          />
                        )
                      })
                    },
                    {
                      dataIndex: 'serialNo',
                      title: 'Serial No',
                      ...(!returns && {
                        width: 180,
                        render: (v, r, i) => (
                          <BatchSerialField
                            autoFocus={serial}
                            type="serial"
                            {...{ materialCode, warehouse, location, rack }}
                            name={`batchSerials[${i}].serialNo`}
                            label="Serial No."
                            onSelect={(v, o) => {
                              if (values.batchSerials.some((batchSerial) => batchSerial.serialNo === v)) {
                                message.error('Serial No already exist')
                              } else {
                                handleChange('serialNo', i, o as OptionData)
                              }
                            }}
                            hideLabel
                          />
                        )
                      })
                    },
                    {
                      dataIndex: 'stockQuantity',
                      title: 'Available Qty.'
                    },
                    {
                      dataIndex: 'quantity',
                      title: 'Quantity',
                      width: 80,
                      render: (v, r, i) => (
                        <Field
                          type="number"
                          name={`batchSerials[${i}].quantity`}
                          label="Qty."
                          hideLabel
                          onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                              addRow()
                            }
                          }}
                        />
                      )
                    },
                    {
                      dataIndex: 'manufacturingDate',
                      title: 'Mfg. Date',
                      render: (date) => date && moment(date).format('YYYY-MM-DD')
                    },
                    {
                      dataIndex: 'expiryDate',
                      title: 'Expiry Date',
                      render: (date) => date && moment(date).format('YYYY-MM-DD')
                    },
                    {
                      dataIndex: 'price',
                      title: 'Price',
                      align: 'right',
                      dontShow: !(
                        !configurations.stockPriceAccess?.length ||
                        configurations.stockPriceAccess?.includes(currentRole)
                      )
                    }
                  ]

                  if (values.batchSerials.length > 1) {
                    columns.push({
                      fixed: 'right',
                      width: '30px',
                      render: (v, r, index) => (
                        <Button
                          variant="primary"
                          className="btn-glow delete-field d-flex justify-content-center"
                          style={{ width: '23px' }}
                          onClick={() => {
                            setFieldValue(
                              'batchSerials',
                              values.batchSerials.filter((item, i) => index !== i)
                            )
                          }}>
                          <i className="flaticon-delete-2 mr-0" />
                        </Button>
                      )
                    })
                  }

                  return columns
                    .filter((item) => !disabled || item.dataIndex !== 'stockQuantity')
                    .map((item) => {
                      if (
                        disabled &&
                        !['manufacturingDate', 'expiryDate'].includes(item.dataIndex as string)
                      ) {
                        delete item.render
                      }

                      return item
                    })
                })()}
                dataSource={values.batchSerials.map((item, i) => ({ ...item, key: i }))}
                scroll={{ x: '100%' }}
                pagination={false}
              />
              {!disabled && (
                <>
                  {!returns && (
                    <div className="d-flex justify-content-end pt-2">
                      <Button
                        success
                        onClick={() => {
                          addRow()
                        }}>
                        <i className="flaticon-plus" /> Add
                      </Button>
                    </div>
                  )}
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
                      <span>
                        {_.sumBy(values.batchSerials, (batchSerial) => Number(batchSerial.quantity || 0))}
                      </span>
                    </Col>
                  </Row>
                </>
              )}
              {(!configurations.stockPriceAccess?.length ||
                configurations.stockPriceAccess?.includes(currentRole)) && (
                <Row gutter={[20, 10]} className="mt-2">
                  <Col xs={12} sm={8}>
                    <h4 className="mb-0">Total Value:</h4>
                  </Col>
                  <Col xs={3}>
                    <span>
                      {_.sumBy(
                        values.batchSerials,
                        (batchSerial) => Number(batchSerial.quantity || 0) * Number(batchSerial.price || 0)
                      )}
                    </span>
                  </Col>
                </Row>
              )}
            </Form>
          )}
        </Formik>
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
          <ErrorMessage name={name} render={(error) => error.replace(name, 'Batch/Serial')} />
        </div>
      )}
    </div>
  )
}
