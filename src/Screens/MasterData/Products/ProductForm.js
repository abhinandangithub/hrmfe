import { Col, Row } from 'antd'
import { withFormik } from 'formik'
import _ from 'lodash'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import * as Yup from 'yup'
import FooterActions from '../../../Components/FooterActions'
import { Field, Form } from '../../../Components/Formik'
import Panel from '../../../Layout/Panel'
import apiClient from '../../../Util/apiClient'
import POSDetails from './POSDetails'

const Schema = Yup.object().shape({
  name: Yup.string().required(),
  unit: Yup.string().required(),
  unitPrice: Yup.number().required(),
  currency: Yup.string().required()
})

function ProductForm({
  setValues,
  setFieldValue,
  values,
  match: {
    params: { id }
  },
  history,
  setProductType
}) {
  const { t } = useTranslation()

  const getData = () => {
    if (id || values.duplicateId) {
      setProductType('Service')
      apiClient.get(`products/get/${id || values.duplicateId}`).then(({ data }) => {
        if (data && data.result) {
          if (values.duplicateId) {
            data.result = _.omit(data.result, [
              'id',
              '_id',
              'createdAt',
              'createdBy',
              'updatedAt',
              'updatedBy'
            ])
          }

          setValues({ ...values, ...data.result })
        }
      })
    }
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
      <Panel title={t('Product Details')}>
        <Row gutter={[20, 10]}>
          <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 8 }}>
            <div className="form-field">
              <Field name="name" label="Name" altInput />
            </div>
          </Col>
          <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 8 }}>
            <div className="form-field">
              <Field name="description" label="Description" as="textarea" rows={1} altInput />
            </div>
          </Col>
          <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 4 }}>
            <div className="form-field">
              <Field
                name="unit"
                label="Unit"
                as="paged-select"
                endPoint="/options/getAllActive"
                params={{ type: 'UnitOfMeasurement' }}
                optionLabel="label"
                optionValue="value"
              />
            </div>
          </Col>
          <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 4 }}>
            <div className="form-field">
              <Field name="unitPrice" label="Unit Price" />
            </div>
          </Col>
        </Row>
      </Panel>
      <Panel title={t('Other Details')}>
        <Row gutter={[20, 10]}>
          <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 4 }}>
            <div className="form-field">
              <Field name="discount" label="Discount" addonAfter={selectAfter} />
            </div>
          </Col>
          <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 4 }}>
            <div className="form-field">
              <Field name="charge" label="Charge" addonAfter={selectAfter} />
            </div>
          </Col>
          <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 4 }}>
            <div className="form-field">
              <Field name="tax" label="Tax" addonAfter={selectAfter} />
            </div>
          </Col>
          <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 6 }}>
            <div className="form-field">
              <Field
                name="currency"
                label="Currency"
                as="paged-select"
                endPoint="/currencies/getAllActive"
                optionValue="code"
              />
            </div>
          </Col>
          <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 6 }}>
            <div className="form-field">
              <Field name="notes" label="Notes" />
            </div>
          </Col>
        </Row>
      </Panel>
      <div className="form-field">
        <Field as="checkbox" name="pos" label="For POS" />
      </div>
      {values.pos && <POSDetails setFieldValue={setFieldValue} />}

      <FooterActions
        leftActions={[
          {
            prefix: 'flaticon-back',
            label: 'Back',
            onClick: () => history.goBack()
          }
        ]}
        centerActions={[
          {
            prefix: 'flaticon-writing',
            label: id ? 'Update' : 'Save',
            type: 'submit'
          }
        ]}
      />
    </Form>
  )
}

export default withFormik({
  mapPropsToValues: ({ location: { state } }) => ({
    name: '',
    unit: '',
    unitPrice: '',
    discount: '',
    discountFormat: '%',
    charge: '',
    chargeFormat: '%',
    tax: '',
    taxFormat: '%',
    currency: '',
    notes: '',
    pos: false,
    category: '',
    subCategory: '',
    images: [],
    duplicateId: state?.duplicateId
  }),
  validationSchema: Schema,
  handleSubmit: (
    data,
    {
      props: {
        match: {
          params: { id }
        },
        history
      }
    }
  ) => {
    if (id) {
      apiClient.put(`products/update/${id}`, data).then(({ data }) => {
        if (data && data.result) {
          history('/app/products')
        }
      })
    } else {
      apiClient.post('products/add', data).then(({ data }) => {
        if (data && data.result) {
          history('/app/products')
        }
      })
    }
  }
})(ProductForm)
