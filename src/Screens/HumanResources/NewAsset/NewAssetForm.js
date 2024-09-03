import { Col, message, Row, Space } from 'antd'
import { withFormik } from 'formik'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { getOptionsByType } from '../../../Actions/UserAction'
import FooterActions from '../../../Components/FooterActions'
import { Field, Form } from '../../../Components/Formik'
import { useSelector } from '../../../Hooks/redux'
import PanelLayout from '../../../Layout/PanelLayout'
import { useNavigate } from 'react-router-dom';
import apiClient from '../../../Util/apiClient'
import { ASSET_TYPE, DEPRECIATION_METHOD, TRACKING_TYPE } from '../../../Util/Options'
import { convertSelectOptions } from '../../../Util/Util'
import { newAssetSchema } from '../../../Util/validationSchema'
import ActionCard from './ActionCard'
import ValueCard from './ValueCard'

function NewAssetForm({
  setValues,
  values,
  match: {
    params: { id }
  }
}) {
  const [assetGroups, setAssetGroups] = useState([])
  const [costCenterOptions, setCostCenterOptions] = useState([])
  const [fixedAssetAccount, setFixedAssetAccount] = useState([])
  const [currencies, setCurrencies] = useState([])
  const [cap, setCap] = useState(false)

  const { users } = useSelector((state) => state)
  const { currency } = users.companyInfo

  const { t } = useTranslation()

  const getData = () => {
    getOptionsByType({
      type: ['AssetGroup']
    }).then(({ AssetGroup = [] }) => {
      setAssetGroups(AssetGroup)
    })

    if (id) {
      apiClient.get(`new-asset/byId/${id}`).then(({ status, data }) => {
        if (status === 200) {
          if (data.accumulated === undefined) {
            data.accumulated = { accumulated: 0 }
          }

          if (data.capitalizationDate !== undefined) {
            setCap(true)
          }

          setValues({
            ...values,
            ...data.result,
            accumulated: data?.accumulated?.accumulated,
            depreciation: data.depreciation
          })
        }
      })
    }

    apiClient.get('cost-centers/get').then(({ data }) => {
      if (data && data.result) {
        setCostCenterOptions(convertSelectOptions(data.result, 'name', 'costCenterNo'))
      }
    })
    apiClient.get('chart-of-accounts/options/FAACC').then(({ data }) => {
      if (data?.result) {
        setFixedAssetAccount(convertSelectOptions(data.result, ['code', '-', 'name'], 'code'))
      }
    })

    apiClient.get('currencies/getAllActive').then(({ data }) => {
      if (data?.result) {
        setCurrencies(convertSelectOptions(data.result, ['code', '-', 'name'], 'code'))
      }
    })
  }

  useEffect(() => {
    getData()
  }, [id])

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
  const buttons = [
    {
      name: 'Capitalization',
      link: `/app/new-assets/capitalization/${id}`,
      color: '#7e57c2',
      disabled: values.receiptNo && cap
    },
    {
      name: 'Depreciation',
      link: `/app/new-assets/depreciation/${id}`,
      color: 'var(--dark-blue)',
      disabled: !cap
    },

    {
      name: 'Impairment',
      link: `/app/new-assets/impairment/${id}`,
      color: '#ffc107'
    },
    {
      id: 6,
      name: 'Disposal',
      link: `/app/new-assets/disposal/${id}`,
      color: 'var(--secondary)'
    }
  ]

  return (
    <Form className="new-asset-form">
      <Row justify="center" className="inner-contents">
        <Col xs={22}>
          <PanelLayout title={t('Asset information')}>
            <Row gutter={[20, 10]}>
              <Col xs={id ? 18 : 24}>
                <Row gutter={[20, 10]}>
                  <Col xs={12} md={12} lg={8}>
                    <div className="form-field">
                      <Field name="assetNo" label="Asset No" disabled />
                    </div>
                  </Col>
                  <Col xs={24} md={12} lg={8}>
                    <div className="form-field">
                      <Field name="name" label="Asset Name" />
                    </div>
                  </Col>
                  <Col xs={24} md={12} lg={8}>
                    <div className="form-field">
                      <Field name="assetDesc" label="Asset Description" />
                    </div>
                  </Col>

                  <Col xs={24} md={12} lg={8}>
                    <div className="form-field">
                      <Field as="select" name="assetGroup" label="Asset Group" options={assetGroups} />
                    </div>
                  </Col>

                  <Col xs={24} md={12} lg={8}>
                    <div className="form-field">
                      <Field as="select" name="type" label="Asset Type" options={ASSET_TYPE} />
                    </div>
                  </Col>
                  <Col xs={24} md={12} lg={8}>
                    <div className="form-field">
                      <Field name="location" label="Asset Location" />
                    </div>
                  </Col>

                  <Col xs={12} md={12} lg={8}>
                    <div className="form-field">
                      <Field name="modelNo" label="Model No" />
                    </div>
                  </Col>
                  <Col xs={24} md={12} lg={8}>
                    <div className="form-field">
                      <Field as="input-chip" name="serialNo" label="Serial Numbers" />
                    </div>
                  </Col>
                  <Col xs={24} md={12} lg={8}>
                    <div className="form-field">
                      <Field name="noOfAssets" label="No of Assets" type="number" />
                    </div>
                  </Col>

                  <Col xs={24} md={12} lg={8}>
                    <div className="form-field">
                      <Field
                        name="supplier"
                        label="Supplier"
                        endPoint="clients/get-vendor-names"
                        as="paged-select"
                        optionValue="_id"
                      />
                    </div>
                  </Col>

                  <Col xs={24} md={12} lg={8}>
                    <div className="form-field">
                      <Field name="purchaseDate" label="Purchase Date" as="date" />
                    </div>
                  </Col>
                  <Col xs={24} md={12} lg={8}>
                    <div className="form-field">
                      <Field
                        name="buyerName"
                        label="Buyer Name"
                        as="paged-select"
                        endPoint="users/get-active-by-company"
                        optionValue="user"
                      />
                    </div>
                  </Col>

                  <Col xs={12} md={12} lg={8}>
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
                      <Field name="assetTag" label="Asset Tag" />
                    </div>
                  </Col>
                  <Col xs={24} md={12} lg={8}>
                    <div className="form-field">
                      <Field as="select" name="trackingType" label="Tracking Type" options={TRACKING_TYPE} />
                    </div>
                  </Col>

                  <Col xs={24} md={12} lg={8}>
                    <div className="form-field">
                      <Field
                        name="originalCost"
                        label="Current Book Value"
                        type="number"
                        disabled={values.depreciation}
                      />
                    </div>
                  </Col>
                  <Col xs={24} md={12} lg={8}>
                    <div className="form-field">
                      <Field name="originalPurchaseValue" label="Original Purchase Value" type="number" />
                    </div>
                  </Col>

                  <Col xs={24} md={12} lg={8}>
                    <div className="form-field">
                      <Field
                        name="salvageValue"
                        label="Salvage Value"
                        type="number"
                        disabled={values.depreciation}
                      />
                    </div>
                  </Col>
                  <Col xs={24} md={12} lg={4}>
                    <div className="form-field">
                      <Field
                        name="usefulLife"
                        label="Useful Life"
                        type="number"
                        disabled={values.depreciation}
                      />
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
                        disabled={values.depreciation}
                      />
                    </div>
                  </Col>
                  <Col xs={24} md={12} lg={8}>
                    <div className="form-field">
                      <Field
                        as="select"
                        name="depreciationMethod"
                        label="Depreciation Method"
                        options={DEPRECIATION_METHOD}
                        disabled={values.depreciation}
                      />
                    </div>
                  </Col>
                  <Col xs={24} md={12} lg={8}>
                    <div className="form-field">
                      <Field name="currency" label="Currency" as="select" options={currencies} />
                    </div>
                  </Col>
                  <Col xs={24} md={12} lg={8}>
                    <div className="form-field">
                      <Field name="costCenter" label="Cost Center" as="select" options={costCenterOptions} />
                    </div>
                  </Col>
                  <Col xs={24} md={12} lg={8}>
                    <div className="form-field">
                      <Field name="poNo" label="Purchase order number" disabled={cap} />
                    </div>
                  </Col>
                  <Col xs={24} md={12} lg={8}>
                    <div className="form-field">
                      <Field name="receiptNo" label="Good receipt number" disabled={cap} />
                    </div>
                  </Col>
                  <Col xs={24} md={12} lg={8}>
                    <div className="form-field">
                      <Field name="receiptPosition" label="Good receipt position" disabled={cap} />
                    </div>
                  </Col>
                </Row>
              </Col>

              {id && (
                <Col xs={6}>
                  <Space size="large" direction="vertical" className="w-100">
                    {buttons.map((item, i) => (
                      <ActionCard key={i} item={item} />
                    ))}
                    {card.map((item, i) => (
                      <ValueCard key={i} item={item} />
                    ))}
                  </Space>
                </Col>
              )}
            </Row>
            {/* {id && (
              <Row gutter={[40, 10]} style={{ justifyContent: 'center', padding: 10 }}>
              </Row>
            )} */}
          </PanelLayout>
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
                type: 'submit',
                dontShow: !!cap
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
    assetNo: '',
    accumulated: 0,
    name: '',
    assetDesc: '',
    assetGroup: '',
    type: '',
    location: '',
    mobileNo: '',
    serialNo: '',
    noOfAssets: '',
    supplier: '',
    purchaseDate: '',
    buyerName: '',
    fixedAssetAccount: '',
    assetTag: '',
    trackingType: '',
    originalCost: '',
    originalPurchaseValue: '',
    salvageValue: '',
    usefulLife: '',
    usefulUnit: '',
    depreciationMethod: '',
    currency: '',
    costCenter: '',
    poNo: '',
    receiptNo: '',
    receiptPosition: ''
  }),
  validationSchema: newAssetSchema,
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
    if (values.serialNo) {
      values.serialNo.map((item) => String(item))
    }

    values.currAsset = values.originalCost - values.accumulated

    if (id) {
      apiClient.put(`new-asset/update/${id}`, values).then(({ status }) => {
        if (status === 200) {
          history('/app/new-assets')
        }
      })
    } else {
      apiClient.post('new-asset/add', values).then(({ status, data }) => {
        if (status === 200 && data && data.success) {
          history(`/app/edit-new-asset/${data.result.id}`)
        } else {
          message.error(data?.message || '')
        }
      })
    }
  }
})(NewAssetForm)
