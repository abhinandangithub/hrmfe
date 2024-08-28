import { Col, Row, Space } from 'antd'
import { withFormik } from 'formik'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import FooterActions from '../../../Components/FooterActions'
import { Field, Form } from '../../../Components/Formik'
import { useSelector } from '../../../Hooks/redux'
import PanelLayout from '../../../Layout/PanelLayout'
import apiClient from '../../../Util/apiClient'
import { convertSelectOptions } from '../../../Util/Util'
import ValueCard from './ValueCard'

function Impairment({
  setValues,
  values,
  match: {
    params: { id }
  },
  history
}) {
  const [fixedAssetAccount, setFixedAssetAccount] = useState([])
  const [impairmentLossAccount, setImpairmentLossAccount] = useState([])
  const { users } = useSelector((state) => state)
  const { currency } = users.companyInfo
  const { t } = useTranslation()

  const getData = (params) => {
    apiClient.get(`asset-impairment/by-asset-id/${id}`).then(({ data }) => {
      if (data && data?.result) {
        if (data.accumulated === undefined) {
          data.accumulated = { accumulated: 0 }
        }

        setValues({
          ...values,
          ...data.result,
          ...data?.result?.assetData,
          accumulated: data?.accumulated?.accumulated
        })
      } else {
        apiClient.get(`new-asset/byId/${id}`, { params }).then(({ status, data }) => {
          if (status === 200) {
            if (data.accumulated === undefined) {
              data.accumulated = { accumulated: 0 }
            }

            setValues({ ...values, ...data.result, accumulated: data?.accumulated?.accumulated })
          }
        })
      }
    })
    apiClient.get('chart-of-accounts/options/FAACC').then(({ data }) => {
      if (data?.result) {
        setFixedAssetAccount(convertSelectOptions(data.result, 'name', 'code'))
      }
    })
    apiClient.get('chart-of-accounts/options/IMPACC').then(({ data }) => {
      if (data?.result) {
        setImpairmentLossAccount(convertSelectOptions(data.result, 'name', 'code'))
      }
    })
  }

  useEffect(() => {
    getData()
  }, [])

  const card = [
    {
      name: 'Original Asset Value',
      cost: `${currency} ${values.originalCost}`
    },
    {
      name: 'Accumulated Depreciations',
      cost: `${currency} ${values.accumulated.toFixed(2)}`
    },
    {
      name: 'Current Asset Value',
      cost: `${currency} ${values.currAsset}`
    }
  ]

  return (
    <Row justify="center" className="inner-contents">
      <Col xs={22}>
        <PanelLayout title={t('Asset Impairment')}>
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
              <Col xs={12} sm={6} lg={4} className="font-weight-bold text-right">
                Currency
              </Col>
              <Col xs={12} sm={6} lg={4}>
                {values.currency}
              </Col>
            </Row>
            <hr />
            <Row gutter={[20, 10]} style={{ justifyContent: 'center', padding: 10 }}>
              {card.map((item, i) => (
                <Col xs={24} sm={12} lg={8} xl={5} key={i}>
                  <ValueCard item={item} />
                </Col>
              ))}
            </Row>
            <Form className="w-100">
              <Row gutter={[20, 10]}>
                <Col xs={24} md={12} lg={6}>
                  <div className="form-field">
                    <Field name="impairmentDate" label="Impairment Date" as="date" />
                  </div>
                </Col>
                <Col xs={24} md={12} lg={6}>
                  <div className="form-field">
                    <Field name="amount" label="Impairment Amount" />
                  </div>
                </Col>
                <Col xs={24} md={12} lg={6}>
                  <div className="form-field">
                    <Field
                      name="fixedAssetAccount"
                      label="Fixed Asset Account"
                      as="select"
                      options={fixedAssetAccount}
                    />
                  </div>
                </Col>
                <Col xs={24} md={12} lg={6}>
                  <div className="form-field">
                    <Field
                      name="loss"
                      label="Impairment Loss Account"
                      as="select"
                      options={impairmentLossAccount}
                    />
                  </div>
                </Col>
              </Row>
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
                    label: 'Impairment',
                    type: 'submit'
                  }
                ]}
                rightActions={[
                  {
                    prefix: 'flaticon-security',
                    label: `${id ? 'Update' : 'Save'} & Post`
                  }
                ]}
              />
            </Form>
          </Space>
        </PanelLayout>
      </Col>
    </Row>
  )
}

export default withFormik({
  mapPropsToValues: () => ({
    impairmentDate: moment().startOf('day'),
    amount: '',
    fixedAssetAccount: '',
    loss: '',
    accumulated: 0
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
      apiClient.put(`asset-impairment/by-asset-id/${id}`, values).then(({ status }) => {
        if (status === 200) {
          history.push('/app/new-assets')
        }
      })
    }
  }
})(Impairment)
