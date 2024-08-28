import React, { Col, Row } from 'antd'
import { withFormik } from 'formik'
import moment from 'moment'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import FooterActions from '../../../Components/FooterActions'
import { Field, Form } from '../../../Components/Formik'
import { useSelector } from '../../../Hooks/redux'
import useDidUpdateEffect from '../../../Hooks/useDidUpdateEffect'
import PanelLayout from '../../../Layout/PanelLayout'
import apiClient from '../../../Util/apiClient'
import { convertSelectOptions } from '../../../Util/Util'
import ValueCard from './ValueCard'

function Revaluation({
  setValues,
  values,
  setFieldValue,
  match: {
    params: { id }
  },
  history
}) {
  const [fixedAssetAccount, setFixedAssetAccount] = useState([])
  const [revaluationReserve, setRevaluationReserve] = useState([])
  const { users } = useSelector((state) => state)
  const { currency } = users.companyInfo

  const { t } = useTranslation()

  const getData = (params) => {
    apiClient.get(`asset-revaluation/by-asset-id/${id}`).then(({ data }) => {
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

            setValues({
              ...values,
              ...data.result,
              accumulated: data?.accumulated?.accumulated
            })
          }
        })
      }
    })
    apiClient.get('chart-of-accounts/options/FAACC').then(({ data }) => {
      if (data?.result) {
        setFixedAssetAccount(convertSelectOptions(data.result, 'name', 'code'))
      }
    })
    apiClient.get('chart-of-accounts/options/REVRES').then(({ data }) => {
      if (data?.result) {
        setRevaluationReserve(convertSelectOptions(data.result, 'name', 'code'))
      }
    })
  }

  useEffect(() => {
    getData()
  }, [])
  useDidUpdateEffect(() => {
    if (values.value) {
      setFieldValue(
        'gainOrLoss',
        (parseInt(values.value, 10) || '') - (parseInt(values.originalCost, 10) || '')
      )
    }
  }, [values.value])

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
      <Col xs={16}>
        <PanelLayout title={t('Asset Revaluation')}>
          <Row gutter={[20, 10]}>
            <Col xs={4} className="font-weight-bold text-right">
              Asset no
            </Col>
            <Col xs={8}>{values.assetNo}</Col>

            <Col xs={4} className="font-weight-bold text-right">
              Model no
            </Col>
            <Col xs={8}>{values.modelNo}</Col>

            <Col xs={4} className="font-weight-bold text-right">
              Asset name
            </Col>
            <Col xs={8}>{values.name}</Col>

            <Col xs={4} className="font-weight-bold text-right">
              Serial no
            </Col>
            <Col xs={8}>{values.serialNo}</Col>
            <Col xs={4} className="font-weight-bold text-right">
              Asset Group
            </Col>
            <Col xs={8}>{values.assetGroup}</Col>
            <Col xs={4} className="font-weight-bold text-right">
              no of Asset
            </Col>
            <Col xs={8}>{values.noOfAssets}</Col>
            <Col xs={4} className="font-weight-bold text-right">
              Asset Type
            </Col>
            <Col xs={8}>{values.type}</Col>
            <Col xs={4} className="font-weight-bold text-right">
              Asset Tag
            </Col>
            <Col xs={8}>{values.assetTag}</Col>
            <Col xs={4} className="font-weight-bold text-right">
              Asset Location
            </Col>
            <Col xs={8}>{values.location}</Col>
            <Col xs={4} className="font-weight-bold text-right">
              Currency
            </Col>
            <Col xs={8}>{values.currency}</Col>
          </Row>
          <hr />

          <Row gutter={[20, 10]} style={{ justifyContent: 'center', padding: 10 }}>
            {card.map((item, i) => (
              <Col key={i}>
                <ValueCard item={item} />
              </Col>
            ))}
          </Row>
          <Form className="w-100">
            <Row gutter={[20, 10]}>
              <Col xs={24}>
                <Row gutter={[20, 10]}>
                  <Col xs={12} md={12} lg={8}>
                    <div className="form-field">
                      <Field name="revaluationDate" label="Revaluation Date" as="date" />
                    </div>
                  </Col>
                  <Col xs={24} md={12} lg={8}>
                    <div className="form-field">
                      <Field name="value" label="Revaluation Value" />
                    </div>
                  </Col>
                  <Col xs={24} md={12} lg={8}>
                    <div className="form-field">
                      <Field name="gainOrLoss" label="Gain or Loss" />
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

                  <Col xs={24} md={12} lg={8}>
                    <div className="form-field">
                      <Field
                        name="reserve"
                        label="Revaluation Reserve"
                        as="select"
                        options={revaluationReserve}
                      />
                    </div>
                  </Col>
                </Row>
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
                  label: 'Revaluate Asset',
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
        </PanelLayout>
      </Col>
    </Row>
  )
}

export default withFormik({
  mapPropsToValues: () => ({
    revaluationDate: moment().startOf('day'),
    gainOrLoss: '',
    fixedAssetAccount: '',
    reserve: '',
    value: '',
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
      apiClient.put(`asset-revaluation/by-asset-id/${id}`, values).then(({ status }) => {
        if (status === 200) {
          history.push('/app/new-assets')
        }
      })
    }
  }
})(Revaluation)
