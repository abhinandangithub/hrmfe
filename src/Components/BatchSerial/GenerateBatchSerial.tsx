import { Col, Row } from 'antd'
import { FormikProps, withFormik } from 'formik'
import React, { memo } from 'react'
import { TGenerateType } from '../../NewComponents/BatchSerial/types'
import apiClient from '../../Util/apiClient'
import { generateBatchSerialSchema } from '../../Util/validationSchema'
import Button from '../Button'
import { Field, Form } from '../Formik'
import ModalBox from '../ModalBox/ModalBox'

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

function GenerateBatchSerial({ values, setFieldValue, handleSubmit }: FormikProps<TValues>) {
  return (
    <div>
      <ModalBox
        title={`No. of ${values.type}`}
        width={800}
        visible={!!values.type}
        onCancel={() => setFieldValue('type', undefined)}
        onOk={() => handleSubmit()}>
        <Form>
          <Row gutter={[20, 2]} className="form-field">
            {values.type === 'batch' && (
              <Col xs={24} sm={12} md={8}>
                <Field type="number" name="count" label="Batch count" />
              </Col>
            )}
            {values.type === 'serial' && (
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
              <Button variant="primary" onClick={() => setFieldValue('type', 'batch')}>
                Generate Batch
              </Button>
            </Col>
            <Col xs={12}>
              <Button variant="primary" onClick={() => setFieldValue('type', 'serial')}>
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
  withFormik<Props, TValues>({
    mapPropsToValues: ({ quantity }) => ({
      count: quantity,
      batchNo: '',
      manufacturingDate: '',
      expiryDate: ''
    }),
    validationSchema: generateBatchSerialSchema,
    handleSubmit: (
      { count, type, batchNo, manufacturingDate, expiryDate },
      { props: { onGenerate }, resetForm }
    ) => {
      if (type) {
        apiClient.post(`stocks/generate-batch-serial/${type}`, { count }).then(({ status, data }) => {
          if (status === 200) {
            resetForm()
            onGenerate(type, batchNo, manufacturingDate, expiryDate, data)
          }
        })
      }
    }
  })(GenerateBatchSerial)
)
