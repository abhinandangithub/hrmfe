import { Col, Row } from 'antd'
import { withFormik } from 'formik'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import * as Yup from 'yup'
import FooterActions from '../../../Components/FooterActions'
import { Field, Form } from '../../../Components/Formik'
import Panel from '../../../Layout/Panel'
import PanelLayout from '../../../Layout/PanelLayout'
import apiClient from '../../../Util/apiClient'
import { STATUS, YES_NO_OPTIONS } from '../../../Util/Options'

const Schema = Yup.object().shape({
  fromUom: Yup.string().required(),
  fromUomDecimal: Yup.string().required(),
  toUom: Yup.string().required(),
  toUomDecimal: Yup.string().required(),
  conversion: Yup.number().decimal().required(),
  status: Yup.string().required()
})

function UomConversionForm({
  setValues,
  match: {
    params: { id }
  },
  history
}) {
  const [options, setOptions] = useState([])
  const [products, setProducts] = useState([])
  const { t } = useTranslation()

  const getData = () => {
    if (id) {
      apiClient.get(`uom-conversions/get/${id}`).then(({ status, data }) => {
        if (status === 200 && data.result) {
          setValues(data.result)
        }
      })
    }
  }

  useEffect(() => {
    getData()
    getOtions()
  }, [])

  const getOtions = () => {
    apiClient.get('options/get-by-types', { params: { type: ['UnitOfMeasurement'] } }).then(({ data }) => {
      if (data?.result) {
        setOptions(data.result?.UnitOfMeasurement || [])
      }
    })
    apiClient.get('warehouse-products/get-all-active').then(({ data }) => {
      if (data?.result) {
        const updatedProducts = data.result.map((v) => ({
          ...v,
          label: `${v.basic.materialCode} - ${v.basic.materialDescription}`,
          value: v.basic.materialCode
        }))
        setProducts(updatedProducts)
      }
    })
  }

  return (
    <Form>
      <Row justify="center" className="inner-contents">
        <Col xs={{ span: 22 }} sm={{ span: 22 }} md={{ span: 20 }} lg={{ span: 20 }}>
          <PanelLayout title={t('UOM Conversion')}>
            <Panel title={t('Currency')}>
              <Row gutter={[20, 10]}>
                <Col xs={24} md={11} lg={6}>
                  <div className="form-field">
                    <Field name="fromUom" label="From Uom" as="select" options={options} />
                  </div>
                </Col>
                <Col xs={24} md={11} lg={3}>
                  <div className="form-field">
                    <Field
                      name="fromUomDecimal"
                      label="From Uom Decimal"
                      as="select"
                      options={YES_NO_OPTIONS}
                    />
                  </div>
                </Col>
                <Col xs={24} sm={2} className="d-flex">
                  <i className="mx-auto mt-4 flaticon-arrow-pointing-to-right" style={{ fontSize: '20px' }} />
                </Col>
                <Col xs={24} md={11} lg={6}>
                  <div className="form-field">
                    <Field name="toUom" label="To Uom" as="select" options={options} />
                  </div>
                </Col>
                <Col xs={24} md={11} lg={3}>
                  <div className="form-field">
                    <Field name="toUomDecimal" label="To Uom Decimal" as="select" options={YES_NO_OPTIONS} />
                  </div>
                </Col>
                <Col xs={24} md={11} lg={4}>
                  <div className="form-field">
                    <Field name="conversion" label="Conversion" />
                  </div>
                </Col>
              </Row>
            </Panel>
            <Row gutter={[20, 10]}>
              <Col xs={24} sm={24} md={12} lg={8}>
                <div className="form-field">
                  <Field name="materialCode" label="Product (Material)" as="select" options={products} />
                </div>
              </Col>
              <Col xs={24} sm={24} md={12} lg={8}>
                <div className="form-field">
                  <Field name="status" label="Status" as="select" options={STATUS} />
                </div>
              </Col>
            </Row>
          </PanelLayout>

          <FooterActions
            leftActions={[
              {
                prefix: 'flaticon-back',
                label: 'Back',
                onClick: () => history('/app/uom-conversions')
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
        </Col>
      </Row>
    </Form>
  )
}

export default withFormik({
  mapPropsToValues: () => ({
    fromUom: '',
    fromUomDecimal: '',
    toUom: '',
    toUomDecimal: '',
    conversion: '',
    status: 'Active'
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
      apiClient.put(`uom-conversions/update/${id}`, data).then(({ data }) => {
        if (data && data.result) {
          history('/app/uom-conversions')
        }
      })
    } else {
      apiClient.post('uom-conversions/add', data).then(({ data }) => {
        if (data && data.result) {
          history('/app/uom-conversions')
        }
      })
    }
  }
})(UomConversionForm)
