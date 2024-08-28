import { ArrowLeftOutlined } from '@ant-design/icons'
import { Col, Row } from 'antd'
import { withFormik } from 'formik'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import * as Yup from 'yup'
import Button from '../../../Components/Button'
import { Field, Form } from '../../../Components/Formik'
import Panel from '../../../Layout/Panel'
import PanelLayout from '../../../Layout/PanelLayout'
import apiClient from '../../../Util/apiClient'

const FORMAT_OPTIONS = [
  { label: '1,000,000', value: ',' },
  { label: "1'000'000", value: "'" },
  { label: '1 000 000', value: ' ' }
]

const Schema = Yup.object().shape({
  code: Yup.string().required(),
  name: Yup.string().required(),
  symbol: Yup.string().required(),
  unit: Yup.string().required(),
  decimalLength: Yup.number().required().max(3),
  format: Yup.string().required()
})

function CurrencyForm({
  setFieldValue,
  setValues,
  values,
  match: {
    params: { id }
  }
}) {
  const [currencyOptions, setCurrencyOptions] = useState([])
  const { t } = useTranslation()

  const getData = () => {
    if (id) {
      apiClient.get(`currencies/byId/${id}`).then(({ data }) => {
        if (data && data.result) {
          setValues({ ...values, ...data.result })
        }
      })
    }

    apiClient.get('currencies/getMaster').then(({ data }) => {
      if (data && data.result) {
        const currencyData = data.result.map((val) => {
          val.label = `${val.code} - ${val.name}`
          val.value = val.code

          return val
        })
        setCurrencyOptions(currencyData)
      }
    })
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <Form>
      <Row justify="center" className="inner-contents">
        <Col xs={{ span: 22 }} sm={{ span: 22 }} md={{ span: 20 }} lg={{ span: 20 }}>
          <PanelLayout title={t('Currency Definition')}>
            <Panel title={t('Currency')}>
              <Row gutter={[20, 10]}>
                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 8 }}>
                  <div className="form-field">
                    <Field
                      as="select"
                      name="code"
                      label="Code"
                      options={currencyOptions}
                      onChange={(n, v) => {
                        const selectedCur = currencyOptions.find((val) => val.code === v)
                        setFieldValue('name', selectedCur ? selectedCur.name : '')
                        setFieldValue('symbol', selectedCur ? selectedCur.symbol : '')
                        setFieldValue('unit', selectedCur ? selectedCur.unit : '')
                        setFieldValue('decimalLength', selectedCur ? selectedCur.decimalLength : '')
                        setFieldValue('format', selectedCur ? selectedCur.format : '')

                        return setFieldValue(n, v)
                      }}
                    />
                  </div>
                </Col>
                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 8 }}>
                  <div className="form-field">
                    <Field name="name" label="Name" />
                  </div>
                </Col>
                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 8 }}>
                  <div className="form-field">
                    <Field name="symbol" label="Symbol" />
                  </div>
                </Col>
                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 8 }}>
                  <div className="form-field">
                    <Field name="unit" label="Unit" />
                  </div>
                </Col>
                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 8 }}>
                  <div className="form-field">
                    <Field name="decimalLength" label="Decimal Length" />
                  </div>
                </Col>
                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 8 }}>
                  <div className="form-field">
                    <Field name="format" label="Format" as="select" options={FORMAT_OPTIONS} />
                  </div>
                </Col>
              </Row>
            </Panel>
          </PanelLayout>

          <div className="save-changes">
            <Button type="submit" variant="primary">
              {id ? 'Update' : 'Save'}
            </Button>
            <span>or</span>
            <Link to="/app/currencies">
              <Button>
                <ArrowLeftOutlined /> Back to currency list
              </Button>
            </Link>
          </div>
        </Col>
      </Row>
    </Form>
  )
}

export default withFormik({
  mapPropsToValues: () => ({
    code: '',
    name: '',
    symbol: '',
    unit: '',
    decimalLength: '',
    format: ''
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
      apiClient.put(`currencies/update/${id}`, data).then(({ data }) => {
        if (data && data.result) {
          history.push('/app/currencies')
        }
      })
    } else {
      apiClient.post('currencies/add', data).then(({ data }) => {
        if (data && data.result) {
          history.push('/app/currencies')
        }
      })
    }
  }
})(CurrencyForm)
