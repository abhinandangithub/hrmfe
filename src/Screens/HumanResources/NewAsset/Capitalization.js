import { Col, Row, Space } from 'antd'
import { withFormik } from 'formik'
import _ from 'lodash'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import FooterActions from '../../../Components/FooterActions'
import { Field, Form } from '../../../Components/Formik'
import PanelLayout from '../../../Layout/PanelLayout'
import { history } from '../../../Routes'
import apiClient from '../../../Util/apiClient'
import { convertSelectOptions } from '../../../Util/Util'

function Capitalization({
  setValues,
  values,
  setFieldValue,
  match: {
    params: { id }
  }
}) {
  const [capitalization, setCapitalization] = useState([])
  const [payFrom, setPayFrom] = useState([])
  const [fixedAssetAccount, setFixedAssetAccount] = useState([])
  const [capitalizationCreated, setCapitalizationCreated] = useState(false)

  const { t } = useTranslation()

  const getData = (params) => {
    apiClient.get('chart-of-accounts/options/FAACC').then(({ data }) => {
      if (data?.result) {
        setFixedAssetAccount(convertSelectOptions(data.result, 'name', 'code'))
      }
    })
    apiClient.get('chart-of-accounts/options/PAYFROM').then(({ data }) => {
      if (data?.result) {
        setPayFrom(convertSelectOptions(data.result, 'name', 'code'))
      }
    })

    apiClient.get(`asset-capitalization/by-asset-id/${id}`).then(({ data }) => {
      setCapitalizationCreated(data && data?.result)

      if (data && data?.result) {
        console.log('check data 2', data?.result)
        setCapitalization(data?.result?.assetData)
        setValues({ ...values, ..._.omit(data?.result, ['id', '_id']) })
        setFieldValue('fixedAssetAccount', data?.result?.assetData?.fixedAssetAccount)
        setFieldValue('originalCost', data?.result?.assetData?.originalCost)
      } else {
        apiClient.get(`new-asset/byId/${id}`, { params }).then(({ status, data }) => {
          if (status === 200) {
            console.log('data result', data.result)
            setValues({ ...values, ..._.omit(data.result, ['id', '_id']) })

            setCapitalization(data.result)
          }
        })
      }
    })
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <Row justify="center" className="inner-contents">
      <Col xs={22}>
        <PanelLayout title={t('Asset Capitalization')}>
          <Space size="large" direction="vertical" className="w-100">
            <Row gutter={[20, 10]}>
              <Col xs={12} sm={6} lg={4} className="font-weight-bold text-right">
                Asset no
              </Col>
              <Col xs={12} sm={6} lg={4}>
                {capitalization.assetNo}
              </Col>

              <Col xs={12} sm={6} lg={4} className="font-weight-bold text-right">
                Model no
              </Col>
              <Col xs={12} sm={6} lg={4}>
                {capitalization.modelNo}
              </Col>

              <Col xs={12} sm={6} lg={4} className="font-weight-bold text-right">
                Asset name
              </Col>
              <Col xs={12} sm={6} lg={4}>
                {capitalization.name}
              </Col>

              <Col xs={12} sm={6} lg={4} className="font-weight-bold text-right">
                Serial no
              </Col>
              <Col xs={12} sm={6} lg={4}>
                {capitalization.serialNo}
              </Col>
              <Col xs={12} sm={6} lg={4} className="font-weight-bold text-right">
                Asset Group
              </Col>
              <Col xs={12} sm={6} lg={4}>
                {capitalization.assetGroup}
              </Col>
              <Col xs={12} sm={6} lg={4} className="font-weight-bold text-right">
                no of Asset
              </Col>
              <Col xs={12} sm={6} lg={4}>
                {capitalization.noOfAssets}
              </Col>
              <Col xs={12} sm={6} lg={4} className="font-weight-bold text-right">
                Asset Type
              </Col>
              <Col xs={12} sm={6} lg={4}>
                {capitalization.type}
              </Col>
              <Col xs={12} sm={6} lg={4} className="font-weight-bold text-right">
                Asset Tag
              </Col>
              <Col xs={12} sm={6} lg={4}>
                {capitalization.assetTag}
              </Col>
              <Col xs={12} sm={6} lg={4} className="font-weight-bold text-right">
                Asset Location
              </Col>
              <Col xs={12} sm={6} lg={4}>
                {capitalization.location}
              </Col>
              <Col xs={12} sm={6} lg={4} className="font-weight-bold text-right">
                Depreciation Method
              </Col>
              <Col xs={12} sm={6} lg={4}>
                {capitalization.depreciationMethod}
              </Col>
              <Col xs={12} sm={6} lg={4} className="font-weight-bold text-right">
                Currency
              </Col>
              <Col xs={12} sm={6} lg={4}>
                {capitalization.currency}
              </Col>
            </Row>
            <hr />
            <Form className="w-100">
              <Row gutter={[20, 10]}>
                <Col xs={24} md={12} lg={6}>
                  <div className="form-field">
                    <Field name="capitalizationDate" label="Capitalization Date" as="date" />
                  </div>
                </Col>
                <Col xs={24} md={12} lg={6}>
                  <div className="form-field">
                    <Field name="originalCost" label="Original Cost" />
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
                    <Field name="paymentFrom" label="Payment From" as="select" options={payFrom} />
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
                    label: 'Capitalize',
                    type: 'submit',
                    dontShow: capitalizationCreated
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
    capitalizationDate: moment().endOf('day'),
    originalCost: '',
    fixedAssetAccount: '',
    paymentFrom: ''
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
      apiClient.put(`asset-capitalization/by-asset-id/${id}`, values).then(({ status }) => {
        if (status === 200) {
          history.push('/app/new-assets')
        }
      })
    }
  }
})(Capitalization)
