import { ArrowLeftOutlined } from '@ant-design/icons'
import { Col, Row } from 'antd'
import { withFormik } from 'formik'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import * as Yup from 'yup'
import Button from '../../../Components/Button'
import { Field, Form } from '../../../Components/Formik'
import apiClient from '../../../Util/apiClient'
import { STATUS } from '../../../Util/Options'

const Schema = Yup.object().shape({
  date: Yup.date().required(),
  baseCurrency: Yup.string().required(),
  toCurrency: Yup.string().required(),
  rate: Yup.number().required(),
  status: Yup.string().required()
})

function ExchangeRateForm({
  setValues,
  values,
  match: {
    params: { id }
  }
}) {
  const [currencies, setCurrencies] = useState([])

  const getData = () => {
    if (id) {
      apiClient.get(`exchange-rates/get/${id}`).then(({ status, data }) => {
        if (status === 200 && data.result) {
          setValues(data.result)
        }
      })
    }
  }

  useEffect(() => {
    getData()
    getCurrencies()
  }, [])

  const getCurrencies = () => {
    apiClient.get('currencies/getMaster').then(({ data }) => {
      if (data && data.result) {
        const currencies = data.result.map((val) => {
          val.label = `${val.code} - ${val.name}`
          val.value = val.code

          return val
        })
        console.log('currencies', currencies)
        setCurrencies(currencies)
      }
    })
  }

  return (
    <Form>
      <Row justify="center" className="inner-contents">
        <Col xs={{ span: 22 }} sm={{ span: 22 }} md={{ span: 20 }} lg={{ span: 20 }}>
          <div className="panel-layout">
            <h2 className="panel-title">Exchange Rate</h2>

            <div className="panel-design">
              <div className="panel-header">
                <h3>Currency</h3>
              </div>
              <div className="panel-body">
                <Row gutter={[20, 10]}>
                  <Col xs={24} lg={8}>
                    <div className="form-field">
                      <Field name="date" label="Date" as="date" />
                    </div>
                  </Col>
                  <Col xs={24} md={11} lg={7}>
                    <div className="form-field">
                      <Field name="toCurrency" label="From Currency" as="select" options={currencies} />
                    </div>
                  </Col>
                  <Col xs={24} sm={2} className="d-flex">
                    <i
                      className="mx-auto mt-4 flaticon-arrow-pointing-to-right"
                      style={{ fontSize: '20px' }}
                    />
                  </Col>
                  <Col xs={24} md={11} lg={7}>
                    <div className="form-field">
                      <Field name="baseCurrency" label="Base Currency" as="select" options={currencies} />
                    </div>
                  </Col>
                </Row>
              </div>
            </div>
            <div className="panel-design">
              <div className="panel-header">
                <h3>Rate</h3>
              </div>
              <div className="panel-body">
                <Row gutter={[20, 10]}>
                  <Col xs={24} sm={24} md={12} lg={8}>
                    <div className="form-field">
                      <Field
                        name="rate"
                        label={
                          values.toCurrency && values.baseCurrency
                            ? `Rate (${values.toCurrency} to ${values.baseCurrency})`
                            : 'Rate'
                        }
                      />
                    </div>
                  </Col>
                  <Col xs={24} sm={24} md={12} lg={8}>
                    <div className="form-field">
                      <Field name="status" label="Status" as="select" options={STATUS} />
                    </div>
                  </Col>
                </Row>
              </div>
            </div>
          </div>

          <div className="save-changes">
            <Button type="submit" variant="primary">
              {id ? 'Update' : 'Save'}
            </Button>
            <span>or</span>
            <Link to="/app/exchange-rates">
              <Button>
                <ArrowLeftOutlined /> Back
              </Button>
            </Link>
          </div>
          {/* Invoice Information ends */}
        </Col>
      </Row>
    </Form>
  )
}

export default withFormik({
  mapPropsToValues: ({ companyInfo }) => ({
    date: '',
    baseCurrency: companyInfo.currency || '',
    toCurrency: '',
    rate: '',
    status: ''
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
      apiClient.put(`exchange-rates/update/${id}`, data).then(({ data }) => {
        if (data && data.result) {
          history('/app/exchange-rates')
        }
      })
    } else {
      apiClient.post('exchange-rates/add', data).then(({ data }) => {
        if (data && data.result) {
          history('/app/exchange-rates')
        }
      })
    }
  }
})(ExchangeRateForm)
