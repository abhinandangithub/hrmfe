import React, { Col, Row, Space } from 'antd'
import { withFormik } from 'formik'
import moment from 'moment'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import FooterActions from '../../../Components/FooterActions'
import { Field, Form } from '../../../Components/Formik'
import { useSelector } from '../../../Hooks/redux'
import PanelLayout from '../../../Layout/PanelLayout'
import apiClient from '../../../Util/apiClient'
import { convertSelectOptions } from '../../../Util/Util'
import ValueCard from './ValueCard'

function Disposal({
  setValues,
  values,
  match: {
    params: { id }
  },
  history
}) {
  const { t } = useTranslation()
  const [payFrom, setPayFrom] = useState([])
  const [accumulatedDepreciation, setAccumulatedDepreciation] = useState([])
  const [fixedAssetAccount, setFixedAssetAccount] = useState([])
  const [gainLossAccount, setGainLossAccount] = useState([])
  const { users } = useSelector((state) => state)
  const { currency } = users.companyInfo

  const getData = (params) => {
    apiClient.get(`asset-disposal/by-asset-id/${id}`).then(({ data }) => {
      if (data && data?.result) {
        if (data.accumulated === undefined) {
          data.accumulated = { accumulated: 0 }
        }

        setValues({ ...values, ...data.result, accumulated: data?.accumulated?.accumulated })
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
    apiClient.get('chart-of-accounts/options/PAYFROM').then(({ data }) => {
      if (data?.result) {
        setPayFrom(convertSelectOptions(data.result, 'name', 'code'))
      }
    })
    apiClient.get('chart-of-accounts/options/ACCDEP').then(({ data }) => {
      if (data?.result) {
        setAccumulatedDepreciation(convertSelectOptions(data.result, 'name', 'code'))
      }
    })
    apiClient.get('chart-of-accounts/options/FAACC').then(({ data }) => {
      if (data?.result) {
        setFixedAssetAccount(convertSelectOptions(data.result, 'name', 'code'))
      }
    })
    apiClient.get('chart-of-accounts/options/ACCPAL').then(({ data }) => {
      if (data?.result) {
        setGainLossAccount(convertSelectOptions(data.result, 'name', 'code'))
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
        <PanelLayout title={t('Asset Disposal')}>
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
                <Col xs={24} md={12} lg={8}>
                  <div className="form-field">
                    <Field name="disposalDate" label="Disposal Date" as="date" />
                  </div>
                </Col>
                <Col xs={24} md={12} lg={8}>
                  <div className="form-field">
                    <Field
                      name="reason"
                      label="Reason for disposal"
                      as="select"
                      options={[
                        { label: 'Sell Asset', value: 'sellAsset' },
                        { label: 'Scrap Asset', value: 'scrapAsset' }
                      ]}
                    />
                  </div>
                </Col>
                <Col xs={24} md={12} lg={8}>
                  <div className="form-field">
                    <Field
                      name="gOrL"
                      label="Gain or Loss"
                      as="select"
                      options={[
                        { label: 'Gain', value: 'Gain' },
                        { label: 'Loss', value: 'Loss' }
                      ]}
                    />
                  </div>
                </Col>

                <Col xs={24} md={12} lg={8}>
                  <div className="form-field">
                    <Field name="amount" label="Disposal Amount" />
                  </div>
                </Col>

                <Col xs={24} md={12} lg={8}>
                  <div className="form-field">
                    <Field name="cashAcc" label="Cash Account" as="select" options={payFrom} />
                  </div>
                </Col>
                <Col xs={24} md={12} lg={8}>
                  <div className="form-field">
                    <Field
                      name="gOrLAcc"
                      label="Gain or Loss Account"
                      as="select"
                      options={gainLossAccount}
                    />
                  </div>
                </Col>

                <Col xs={24} md={12} lg={8}>
                  <div className="form-field">
                    <Field
                      name="accumulatedDeptAccount"
                      label="Accumulated dept. Account"
                      as="select"
                      options={accumulatedDepreciation}
                    />
                  </div>
                </Col>

                <Col xs={24} md={12} lg={8}>
                  <div className="form-field">
                    <Field
                      name="fixedAssetAccount"
                      label="Fixed Asset Account"
                      as="select"
                      options={fixedAssetAccount}
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
                    label: 'Disposal',
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
    disposalDate: moment().startOf('day'),
    reason: '',
    amount: '',
    gOrL: '',
    cashAcc: '',
    gOrLAcc: '',
    accumulatedDeptAccount: '',
    fixedAssetAmount: '',
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
      apiClient.put(`asset-disposal/by-asset-id/${id}`, values).then(({ status }) => {
        if (status === 200) {
          history('/app/new-assets')
        }
      })
    }
  }
})(Disposal)
