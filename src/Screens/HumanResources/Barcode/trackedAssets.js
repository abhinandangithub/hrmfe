import { Col, message, Row } from 'antd'
import { withFormik } from 'formik'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import FooterActions from '../../../Components/FooterActions'
import { Field, Form } from '../../../Components/Formik'
import PanelLayout from '../../../Layout/PanelLayout'
import apiClient from '../../../Util/apiClient'
import { convertSelectOptions } from '../../../Util/Util'

function trackedAssets({
  match: {
    params: { tag }
  },
  history,
  values,
  setValues,
  submitForm,
  setFieldValue
}) {
  const [defined, setDefined] = useState([])
  const [costCenterOptions, setCostCenterOptions] = useState([])
  const { t } = useTranslation()

  const getData = () => {
    apiClient.get(`new-asset/by-tag/${tag}`).then(({ data }) => {
      // console.log('data', data)

      if (data && data?.result) {
        // console.log('data', data)

        if (data?.result?.currInvData === null) {
          message.error('Inventory Not Associated')
          history.goBack()
        } else {
          // console.log(
          //   'vslur',
          //   data?.result?.currInvData?.assetInv.find((item) => item.assetTag === tag)
          // )
          setValues({
            ...values,
            ...data?.result?.currInvData?.assetInv.find((item) => item.assetTag === tag)
          })
          setFieldValue('location', data.result.location)
          setFieldValue('costCenter', data.result.costCenter)
        }

        setDefined({ ...data?.result, depreciated: data?.accumulated?.accumulated || 0 })
      } else {
        message.error(data.message)
        history.goBack()
      }
    })
    apiClient.get('cost-centers/get').then(({ data }) => {
      if (data && data.result) {
        setCostCenterOptions(convertSelectOptions(data.result, 'name', 'costCenterNo'))
      }
    })
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <Row justify="center" className="inner-contents">
      <Col xs={16}>
        <PanelLayout title={t('Tracked Assets')}>
          <Row gutter={[20, 10]}>
            <Col xs={4} className="font-weight-bold text-right">
              Asset Number
            </Col>
            <Col xs={8}>{defined.assetNo}</Col>

            <Col xs={4} className="font-weight-bold text-right">
              Asset name
            </Col>
            <Col xs={8}>{defined.name}</Col>

            <Col xs={4} className="font-weight-bold text-right">
              Serial Number
            </Col>
            <Col xs={8}>{defined.serialNo}</Col>
            <Col xs={4} className="font-weight-bold text-right">
              Buyer Name
            </Col>
            <Col xs={8}>{defined?.buyerData?.name}</Col>
            <Col xs={4} className="font-weight-bold text-right">
              Model Number
            </Col>
            <Col xs={8}>{defined.modelNo}</Col>
            <Col xs={4} className="font-weight-bold text-right">
              original Value
            </Col>
            <Col xs={8}>{defined.originalCost}</Col>
            <Col xs={4} className="font-weight-bold text-right">
              Current Value
            </Col>
            <Col xs={8}>{defined.currAsset}</Col>
            <Col xs={4} className="font-weight-bold text-right">
              Depreciated Value
            </Col>
            <Col xs={8}>{defined.depreciated}</Col>
            <Col xs={4} className="font-weight-bold text-right">
              Remaining Life
            </Col>
            <Col xs={8}>{`${defined.usefulLife} ${defined.usefulUnit}`}</Col>
            <Col xs={4} className="font-weight-bold text-right">
              Available
            </Col>
            <Col xs={8}>yes</Col>
          </Row>
          <hr />
          <Form className="w-100">
            <Row gutter={[20, 10]} style={{ justifyContent: 'center' }}>
              <Col xs={12} md={12} lg={6}>
                <div className="form-field">
                  <Field
                    name="status"
                    label="Status"
                    as="select"
                    options={[
                      { label: 'Good', value: 'Good' },
                      { label: 'For Sale', value: 'For Sale' },
                      { label: 'Damaged', value: 'Damaged' },
                      { label: 'Lost', value: 'Lost' }
                    ]}
                  />
                </div>
              </Col>
              <Col xs={12} md={12} lg={6}>
                <div className="form-field">
                  <Field
                    name="available"
                    label="Available"
                    as="select"
                    options={[
                      { label: 'true', value: true },
                      { label: 'false', value: false }
                    ]}
                  />
                </div>
              </Col>
              <Col xs={24} md={12} lg={6}>
                <div className="form-field">
                  <Field name="takenOn" label="Inventory Taken On" as="date" />
                </div>
              </Col>
            </Row>
            <Row gutter={[20, 10]} style={{ justifyContent: 'center' }}>
              <Col xs={12} md={12} lg={6}>
                <div className="form-field">
                  <Field name="location" label="Location" />
                </div>
              </Col>
              <Col xs={24} md={12} lg={6}>
                <div className="form-field">
                  <Field name="costCenter" label="Cost Center" as="select" options={costCenterOptions} />
                </div>
              </Col>
              <Col xs={24} md={12} lg={6}>
                <div className="form-field">
                  <Field
                    name="takenBy"
                    label="Inventory Taken by"
                    as="paged-select"
                    endPoint="users/get-active-by-company"
                    optionValue="user"
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
                  prefix: 'flaticon-writing',
                  label: 'Complete',
                  onClick: () => {
                    submitForm()
                  }
                }
              ]}
              rightActions={[
                {
                  prefix: 'flaticon-security',
                  label: `${tag ? 'Update' : 'Save'} & Post`
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
    status: '',
    takenOn: '',
    location: '',
    costCenter: '',
    available: true,
    takenBy: ''
  }),
  handleSubmit: (
    data,
    {
      props: {
        history,
        match: {
          params: { tag }
        }
      }
    }
  ) => {
    data.assetTag = tag
    // console.log('data', data)
    apiClient.put('asset-inventory/update', data).then(({ data }) => {
      if (data && data?.result) {
        message.success('Updated')
        history.goBack()
      }
    })
  }
})(trackedAssets)
