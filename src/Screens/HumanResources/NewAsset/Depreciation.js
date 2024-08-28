import React, { Col, message, Row, Space } from 'antd'
import { withFormik } from 'formik'
import moment from 'moment'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import Button from '../../../Components/Button'
import FooterActions from '../../../Components/FooterActions'
import { Field, Form } from '../../../Components/Formik'
import TableBox from '../../../Components/TableBox/TableBox'
import PanelLayout from '../../../Layout/PanelLayout'
import TableLayout from '../../../Layout/TableLayout'
import { history } from '../../../Routes'
import apiClient from '../../../Util/apiClient'
import { DEPRECIATION_METHOD } from '../../../Util/Options'
import { convertSelectOptions } from '../../../Util/Util'

function Depreciation({
  setValues,
  values,
  match: {
    params: { id }
  }
}) {
  const [available, setAvailable] = useState(true)

  const columns = [
    {
      title: 'Period',
      dataIndex: 'period'
    },
    {
      title: 'Period Date',
      dataIndex: 'date',
      render: (date) => moment(date).format('DD-MM-YYYY')
    },
    {
      title: 'Base Value',
      dataIndex: 'baseValue'
    },
    {
      title: 'Depreciation',
      dataIndex: 'depreciation'
    },
    {
      title: 'Accumulated Depreciation',
      dataIndex: 'accumulated'
    },

    {
      title: 'Book Value',
      dataIndex: 'value'
    },
    {
      title: 'Action',
      dataIndex: 'action',

      render: (text, row) => {
        if (text === 'Pending') {
          return (
            <div className="btn-group">
              <div style={{ textAlign: 'center' }}>{text}</div>
              <button type="button" className="btn glow dropdown-toggle" onClick={() => onSave(row)}>
                Post
              </button>
            </div>
          )
        }

        return (
          <div className="btn-group">
            <div style={{ textAlign: 'center' }}>{text}</div>
          </div>
        )
      }
    }
  ]

  const [depreciation, setDepreciation] = useState([])
  const [depreciationExpense, setDepreciationExpense] = useState([])
  const [accumulatedDepreciation, setAccumulatedDepreciation] = useState([])

  const {t} = useTranslation()

  const getData = (params) => {
    apiClient.get(`asset-depreciation/by-asset-id/${id}`, { params }).then(({ status, data }) => {
      if (status === 200 && data && data?.result) {
        setDepreciation(data.result?.depreciation || [])
        setValues({
          ...values,
          ...data.result,
          ...data?.result?.assetData,
          capitalizationDate: data.capitalizationDate
        })
        setAvailable(false)
      } else {
        apiClient.get(`new-asset/byId/${id}`, { params }).then(({ status, data }) => {
          if (status === 200) {
            setValues({ ...values, ...data.result, capitalizationDate: data.capitalizationDate })
          }
        })
      }
    })
    apiClient.get('chart-of-accounts/options/ACCDEP').then(({ data }) => {
      if (data?.result) {
        setAccumulatedDepreciation(convertSelectOptions(data.result, 'name', 'code'))
      }
    })
    apiClient.get('chart-of-accounts/options/DEPEXP').then(({ data }) => {
      if (data?.result) {
        setDepreciationExpense(convertSelectOptions(data.result, 'name', 'code'))
      }
    })
  }

  const onSave = (values) => {
    apiClient.put(`asset-depreciation/update/${id}`, values).then(({ status, data }) => {
      if (status === 200 && data.success) {
        getData()
      } else {
        message.error(data.message)
      }
    })
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <Row justify="center" className="inner-contents">
      <Col xs={22}>
        <PanelLayout title={t('Asset Depreciation')}>
          <Space size="large" direction="vertical" className="w-100">
            <Row gutter={[20, 10]}>
              <Col xs={12} sm={6} lg={4} className="font-weight-bold text-right">
                Asset no
              </Col>
              <Col xs={12} sm={6} lg={4}>
                {values.assetNo}
              </Col>

              <Col xs={12} sm={6} lg={4} className="font-weight-bold text-right">
                Model no
              </Col>
              <Col xs={12} sm={6} lg={4}>
                {values.modelNo}
              </Col>

              <Col xs={12} sm={6} lg={4} className="font-weight-bold text-right">
                Asset name
              </Col>
              <Col xs={12} sm={6} lg={4}>
                {values.name}
              </Col>

              <Col xs={12} sm={6} lg={4} className="font-weight-bold text-right">
                Serial no
              </Col>
              <Col xs={12} sm={6} lg={4}>
                {values.serialNo}
              </Col>
              <Col xs={12} sm={6} lg={4} className="font-weight-bold text-right">
                Asset Group
              </Col>
              <Col xs={12} sm={6} lg={4}>
                {values.assetGroup}
              </Col>
              <Col xs={12} sm={6} lg={4} className="font-weight-bold text-right">
                no of Asset
              </Col>
              <Col xs={12} sm={6} lg={4}>
                {values.noOfAssets}
              </Col>
              <Col xs={12} sm={6} lg={4} className="font-weight-bold text-right">
                Asset Type
              </Col>
              <Col xs={12} sm={6} lg={4}>
                {values.type}
              </Col>
              <Col xs={12} sm={6} lg={4} className="font-weight-bold text-right">
                Asset Tag
              </Col>
              <Col xs={12} sm={6} lg={4}>
                {values.assetTag}
              </Col>
              <Col xs={12} sm={6} lg={4} className="font-weight-bold text-right">
                Asset Location
              </Col>
              <Col xs={12} sm={6} lg={4}>
                {values.location}
              </Col>
              <Col xs={12} sm={6} lg={4} className="font-weight-bold text-right">
                Depreciation Method
              </Col>
              <Col xs={12} sm={6} lg={4}>
                {values.depreciationMethod}
              </Col>
            </Row>
            <hr />
            <Form className="w-100">
              <Row gutter={[20, 10]}>
                <Col xs={24}>
                  <Row gutter={[20, 10]}>
                    <Col xs={24} md={12} lg={8}>
                      <div className="form-field">
                        <Field name="originalCost" label="Original Cost" />
                      </div>
                    </Col>
                    <Col xs={24} md={12} lg={8}>
                      <div className="form-field">
                        <Field name="salvageValue" label="Salvage Value" />
                      </div>
                    </Col>
                    <Col xs={24} md={12} lg={4}>
                      <div className="form-field">
                        <Field name="usefulLife" label="Useful Life" />
                      </div>
                    </Col>
                    <Col xs={24} md={12} lg={4}>
                      <div className="form-field">
                        <Field
                          name="usefulUnit"
                          label="Useful Unit"
                          as="select"
                          options={[
                            { label: 'Month', value: 'month' },
                            { label: 'Year', value: 'year' }
                          ]}
                        />
                      </div>
                    </Col>

                    <Col xs={24} md={12} lg={8}>
                      <div className="form-field">
                        <Field
                          name="depreciationMethod"
                          label="Depreciation Method"
                          as="select"
                          options={DEPRECIATION_METHOD}
                        />
                      </div>
                    </Col>

                    <Col xs={24} md={12} lg={8}>
                      <div className="form-field">
                        <Field
                          name="depreciationExpenseAcc"
                          label="Depreciation Expense Acc"
                          as="select"
                          options={depreciationExpense}
                        />
                      </div>
                    </Col>
                    <Col xs={24} md={12} lg={8}>
                      <div className="form-field">
                        <Field
                          name="accumulatedDepreciationAcc"
                          label="Accumulated Depreciation Acc"
                          as="select"
                          options={accumulatedDepreciation}
                        />
                      </div>
                    </Col>
                  </Row>
                </Col>
              </Row>
              <div style={{ display: 'flex', justifyContent: 'center', padding: 30 }}>
                <Button variant="primary" type="submit" disabled={!available}>
                  Generate Depreciation Cycle
                </Button>
              </div>
            </Form>
            {depreciation.length > 0 && (
              <TableLayout title="Depreciation cycle overview">
                <TableBox columns={columns} dataSource={depreciation} />
              </TableLayout>
            )}
            <FooterActions
              leftActions={[
                {
                  prefix: 'flaticon-back',
                  label: 'Back',
                  onClick: () => history.goBack()
                }
              ]}
              // rightActions={[
              //   {
              //     prefix: 'flaticon-security',
              //     label: `${id ? 'Update' : 'Save'} & Post`
              //   }
              // ]}
            />
          </Space>
        </PanelLayout>
      </Col>
    </Row>
  )
}

export default withFormik({
  mapPropsToValues: () => ({
    salvageValue: '',
    originalCost: '',
    usefulLife: '',
    usefulUnit: '',
    depreciationMethod: '',
    depreciationExpenseAcc: '',
    accumulatedDepreciationAcc: '',
    depreciation: []
  }),
  handleSubmit: (
    values,

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
      values.depreciation = [...Array(Number(values.usefulLife))].map((item, i) => {
        const depreciation = (values.originalCost - values.salvageValue) / Number(values.usefulLife)
        const accumulated = depreciation * (i + 1)

        const usefulUnit = values.usefulUnit === 'month' ? 'M' : 'Y'
        const date = moment(values.capitalizationDate).add(i + 1, usefulUnit === 'M' ? 'M' : 'y')

        return {
          period: i + 1,
          date,
          baseValue: values.originalCost,
          depreciation,
          accumulated,
          value: values.originalCost - accumulated,
          action: 'Pending'
        }
      })
      apiClient.put(`asset-depreciation/by-asset-id/${id}`, values).then(({ status }) => {
        if (status === 200) {
          history.push(`/app/new-assets/depreciation/${id}`)
        }
      })
    }
  }
})(Depreciation)
