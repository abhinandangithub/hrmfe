import { Col, Row } from 'antd'
import React, { memo } from 'react'
import { useWatch } from 'react-hook-form'
import Button from '../../Components/Button'
import ModalBox from '../../Components/ModalBox/ModalBox'
import apiClient from '../../Util/apiClient'
import { generateBatchSerialSchema } from '../../Util/validationSchema'
import { Field, Form, FormProviderBag, withForm } from '../Form'
import type { TGenerateType } from './types'

type Props = {
  quantity: TNumber
  onGenerate: (
    type: TGenerateType,
    batchNo: string,
    manufacturingDate: string,
    expiryDate: string,
    series: string[]
  ) => void
}

type TValues = {
  type?: TGenerateType
  batchNo: string
  count: TNumber
  manufacturingDate: string
  expiryDate: string
}

function GenerateBatchSerial({ setValue, submitForm, control }: FormProviderBag<TValues>) {
  const type = useWatch({ name: 'type', control })

  return (
    <div>
      <ModalBox
        title={`No. of ${type}`}
        width={800}
        visible={!!type}
        onCancel={() => setValue('type', undefined)}
        onOk={() => submitForm()}>
        <Form>
          <Row gutter={[20, 2]} className="form-field">
            {type === 'batch' && (
              <Col xs={24} sm={12} md={8}>
                <Field type="number" name="count" label="Batch count" />
              </Col>
            )}
            {type === 'serial' && (
              <Col xs={24} sm={12} md={8}>
                <Field name="batchNo" label="Batch No" />
              </Col>
            )}
            <Col xs={24} sm={12} md={8}>
              <Field as="date" name="manufacturingDate" label="Manufacturing Date" />
            </Col>
            <Col xs={24} sm={12} md={8}>
              <Field as="date" name="expiryDate" label="Expiry Date" />
            </Col>
          </Row>
        </Form>
      </ModalBox>
      <Row justify="end">
        <Col xs={24} sm={12}>
          <Row gutter={[20, 10]}>
            <Col xs={12}>
              <Button variant="primary" onClick={() => setValue('type', 'batch')}>
                Generate Batch
              </Button>
            </Col>
            <Col xs={12}>
              <Button variant="primary" onClick={() => setValue('type', 'serial')}>
                Generate Serial
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  )
}

export default memo(
  withForm<Props, TValues>({
    mapPropsToValues: ({ quantity }) => ({
      count: quantity,
      batchNo: '',
      manufacturingDate: '',
      expiryDate: ''
    }),
    validationSchema: generateBatchSerialSchema,
    handleSubmit: (
      { count, type, batchNo, manufacturingDate, expiryDate },
      { props: { onGenerate }, reset }
    ) => {
      if (type) {
        apiClient.post(`stocks/generate-batch-serial/${type}`, { count }).then(({ status, data }) => {
          if (status === 200) {
            reset()
            onGenerate(type, batchNo, manufacturingDate, expiryDate, data)
          }
        })
      }
    }
  })(GenerateBatchSerial)
)
