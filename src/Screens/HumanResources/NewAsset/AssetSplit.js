import { Col, Row } from 'antd'
import { withFormik } from 'formik'
import React from 'react'
import { useTranslation } from 'react-i18next'
import Button from '../../../Components/Button'
import { Field, Form } from '../../../Components/Formik'
import PanelLayout from '../../../Layout/PanelLayout'
import ValueCard from './ValueCard'

const card = [
  {
    name: 'Original Asset Value',
    cost: '$424324'
  },
  {
    name: 'Accumulated Depreciations',
    cost: '$424324'
  },
  {
    name: 'Current Asset Value',
    cost: '$424324'
  }
]

function AssetSplit() {
  const { t } = useTranslation()
  return (
    <Row justify="center" className="inner-contents">
      <Col xs={16}>
        <PanelLayout title={t('Asset Splits')}>
          <Row gutter={[20, 10]}>
            <Col xs={4} className="font-weight-bold text-right">
              Asset no
            </Col>
            <Col xs={8}>from previous screen</Col>

            <Col xs={4} className="font-weight-bold text-right">
              Asset name
            </Col>
            <Col xs={8}>from previous screen</Col>

            <Col xs={4} className="font-weight-bold text-right">
              Serial no
            </Col>
            <Col xs={8}>from previous screen</Col>
            <Col xs={4} className="font-weight-bold text-right">
              Asset Group
            </Col>
            <Col xs={8}>from previous screen</Col>

            <Col xs={4} className="font-weight-bold text-right">
              Asset Type
            </Col>
            <Col xs={8}>from previous screen</Col>

            <Col xs={4} className="font-weight-bold text-right">
              Asset Location
            </Col>
            <Col xs={8}>from previous screen</Col>
            <Col xs={4} className="font-weight-bold text-right">
              No of Assets
            </Col>
            <Col xs={8}>from previous screen</Col>
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
            <Row gutter={[20, 10]} style={{ justifyContent: 'center' }}>
              <Col xs={4} md={12} lg={10}>
                <div className="form-field">
                  <Field name="noOfSplits" label="No of Splits" />
                </div>
              </Col>
            </Row>
            <Row>
              <Col xs={12}>
                <PanelLayout title={t('Set 1')}>
                  <Row gutter={[20, 10]} style={{ justifyContent: 'center' }}>
                    <Col xs={4} md={12} lg={10}>
                      <div className="form-field">
                        <Field name="noOfSplits" label="No of Splits" />
                      </div>
                    </Col>
                    <Col xs={24} md={12} lg={10}>
                      <div className="form-field">
                        <Field name="splitOriginalAmount" label="Split Original Amount" />
                      </div>
                    </Col>
                    <Col xs={4} md={12} lg={10}>
                      <div className="form-field">
                        <Field name="assetTag" label="Asset Tag" />
                      </div>
                    </Col>
                    <Col xs={24} md={12} lg={10}>
                      <div className="form-field">
                        <Field name="splitDepreciationAmount" label="Split Depr. Amount" />
                      </div>
                    </Col>
                    <Col xs={4} md={12} lg={10}>
                      <div className="form-field">
                        <Field name="originalAmount" label="Original Amount" />
                      </div>
                    </Col>
                    <Col xs={24} md={12} lg={10}>
                      <div className="form-field">
                        <Field name="splitAccDepreciation" label="Split Acc. Depr" />
                      </div>
                    </Col>
                    <Col xs={4} md={12} lg={10}>
                      <div className="form-field">
                        <Field name="totalPeriod" label="Total Period" />
                      </div>
                    </Col>
                    <Col xs={24} md={12} lg={10}>
                      <div className="form-field">
                        <Field name="splitCurrentValue" label="Split Current Value" />
                      </div>
                    </Col>
                    <Col xs={24} md={12} lg={10}>
                      <div className="form-field">
                        <Field name="splitPercentage" label="% Split" />
                      </div>
                    </Col>
                    <Col xs={4} md={12} lg={10}>
                      <div className="form-field">
                        <Field name="newAssetNumber" label="New Asset no." />
                      </div>
                    </Col>
                    <Col xs={4} md={12} lg={10}>
                      <div style={{ display: 'flex', justifyContent: 'center', padding: 25 }}>
                        <Button variant="primary">Split Assets</Button>
                      </div>
                    </Col>
                    <Col xs={24} md={12} lg={10}>
                      <div className="form-field">
                        <Field name="fixedAssetAccount" label="Fixed Asset Account" />
                      </div>
                    </Col>
                  </Row>
                </PanelLayout>
              </Col>
              <Col xs={12}>
                <PanelLayout title={t('Set 2')}>
                  <Row gutter={[20, 10]} style={{ justifyContent: 'center' }}>
                    <Col xs={4} md={12} lg={10}>
                      <div className="form-field">
                        <Field name="noOfSplits" label="No of Splits" />
                      </div>
                    </Col>
                    <Col xs={24} md={12} lg={10}>
                      <div className="form-field">
                        <Field name="splitOriginalAmount" label="Split Original Amount" />
                      </div>
                    </Col>
                    <Col xs={4} md={12} lg={10}>
                      <div className="form-field">
                        <Field name="assetTag" label="Asset Tag" />
                      </div>
                    </Col>
                    <Col xs={24} md={12} lg={10}>
                      <div className="form-field">
                        <Field name="splitDepreciationAmount" label="Split Depr. Amount" />
                      </div>
                    </Col>
                    <Col xs={4} md={12} lg={10}>
                      <div className="form-field">
                        <Field name="originalAmount" label="Original Amount" />
                      </div>
                    </Col>
                    <Col xs={24} md={12} lg={10}>
                      <div className="form-field">
                        <Field name="splitAccDepreciation" label="Split Acc. Depr" />
                      </div>
                    </Col>
                    <Col xs={4} md={12} lg={10}>
                      <div className="form-field">
                        <Field name="totalPeriod" label="Total Period" />
                      </div>
                    </Col>
                    <Col xs={24} md={12} lg={10}>
                      <div className="form-field">
                        <Field name="splitCurrentValue" label="Split Current Value" />
                      </div>
                    </Col>
                    <Col xs={24} md={12} lg={10}>
                      <div className="form-field">
                        <Field name="splitPercentage" label="% Split" />
                      </div>
                    </Col>
                    <Col xs={4} md={12} lg={10}>
                      <div className="form-field">
                        <Field name="newAssetNumber" label="New Asset no." />
                      </div>
                    </Col>
                    <Col xs={4} md={12} lg={10}>
                      <div style={{ display: 'flex', justifyContent: 'center', padding: 25 }}>
                        <Button variant="primary">Split Assets</Button>
                      </div>
                    </Col>
                    <Col xs={24} md={12} lg={10}>
                      <div className="form-field">
                        <Field name="fixedAssetAccount" label="Fixed Asset Account" />
                      </div>
                    </Col>
                  </Row>
                </PanelLayout>
              </Col>
            </Row>
          </Form>
        </PanelLayout>
      </Col>
    </Row>
  )
}

export default withFormik({
  mapPropsToValues: () => ({
    noOfSplits: '',
    splitOriginalAmount: '',
    assetTag: '',
    splitDepreciationAmount: '',
    originalAmount: '',
    splitAccDepreciation: '',
    totalPeriod: '',
    splitCurrentValue: '',
    splitPercentage: '',
    newAssetNumber: '',
    fixedAssetAccount: ''
  }),
  handleSubmit: (values, { props: { onSubmit } }) => onSubmit(values)
})(AssetSplit)
