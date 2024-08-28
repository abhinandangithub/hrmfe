import { Col, Row, Space } from 'antd'
import { withFormik } from 'formik'
import _ from 'lodash'
import moment from 'moment'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { getOptionsByType } from '../../../Actions/UserAction'
import Button from '../../../Components/Button'
import FooterActions from '../../../Components/FooterActions'
import { Field, Form } from '../../../Components/Formik'
import TableBox from '../../../Components/TableBox/TableBox'
import PanelLayout from '../../../Layout/PanelLayout'
import TableLayout from '../../../Layout/TableLayout'
import apiClient from '../../../Util/apiClient'
import { ASSET_TYPE, TRACKING_TYPE } from '../../../Util/Options'
import InventoryCard from './InventoryCard'

function AssetInventoryForm({
  values,
  history,
  setFieldValue,
  match: {
    params: { id }
  }
}) {
  const [assetGroups, setAssetGroups] = useState([])
  const [inventory, setInventory] = useState([])

  const { t } = useTranslation()

  const getData = () => {
    getOptionsByType({
      type: ['AssetGroup']
    }).then(({ AssetGroup = [] }) => {
      setAssetGroups(AssetGroup)
    })
  }

  const onSave = (values) => {
    apiClient.get('new-asset/gen-asset', { params: { ...values } }).then(({ status, data }) => {
      if (status === 200) {
        setInventory(data.result)
        setFieldValue('totalAsset', _.sumBy(data.result, 'noOfAssets'))
        setFieldValue('totalValue', parseInt(_.sumBy(data.result, 'currAsset'), 10))
      }
    })
  }

  const onRelease = () => {
    if (inventory.length > 0) {
      apiClient
        .post('asset-inventory/add', {
          ...values,
          assetInv: inventory.map((item) => ({ assetTag: item.assetTag }))
        })
        .then(({ status, data }) => {
          if (status === 200) {
            history.push(`/app/view-asset-inventory/${data.result._id}`)
          }
        })
    }
  }

  useEffect(() => {
    getData()
  }, [])
  const columns = [
    {
      title: 'Asset no.',
      dataIndex: 'assetNo'
    },
    {
      title: 'Asset Desc.',
      dataIndex: 'assetDesc'
    },
    {
      title: 'Asset Tag',
      dataIndex: 'assetTag'
    },
    {
      title: 'Location',
      dataIndex: 'location'
    },

    {
      title: 'Inv. Taken on',
      dataIndex: 'takenOn'
    },
    {
      title: 'Available?',
      dataIndex: 'available'
    },
    {
      title: 'Status',
      dataIndex: 'status'
    },
    {
      title: 'Taken by',
      dataIndex: 'takenBy'
    }
  ]
  const buttons = [
    {
      title: 'Total Assets',
      value: _.sumBy(inventory, 'noOfAssets'),
      color: '#7e57c2'
    },
    {
      title: 'Total Inventory Value',
      value: `₹${parseInt(_.sumBy(inventory, 'currAsset'), 10)}`,
      color: 'var(--dark-blue)'
    }
  ]
  console.log('inc', inventory)

  return (
    <Form className="new-asset-form">
      <Row justify="center" className="inner-contents">
        <Col xs={22}>
          <PanelLayout title={t('Add Inventory')}>
            <Row gutter={[20, 10]}>
              <Col xs={18}>
                <Row gutter={[20, 10]}>
                  <Col xs={12} md={12} lg={8}>
                    <div className="form-field">
                      <Field name="date" label="Inventory Date" as="date" />
                    </div>
                  </Col>
                  <Col xs={24} md={12} lg={8}>
                    <div className="form-field">
                      <Field name="inventoryNo" label="Inventory Number" />
                    </div>
                  </Col>
                  <Col xs={24} md={12} lg={8}>
                    <div className="form-field">
                      <Field name="description" label="Inventory Description" />
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
                      <Field name="trackingType" label="Tracking Type" as="select" options={TRACKING_TYPE} />
                    </div>
                  </Col>
                  <Col xs={12} md={12} lg={8}>
                    <div style={{ padding: '25px' }}>
                      <Button variant="primary" onClick={() => onSave(values)}>
                        Generate
                      </Button>
                    </div>
                  </Col>
                </Row>
              </Col>

              <Col xs={6}>
                <Space size="large" direction="vertical" className="w-100">
                  {buttons.map((item, i) => (
                    <InventoryCard key={i} item={item} />
                  ))}
                </Space>
              </Col>
            </Row>
            <TableLayout title="Assets Inventory Overview" detailed exportUrl="asset-inventoryForm/export">
              <TableBox columns={columns} dataSource={inventory} />
            </TableLayout>
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
                label: id ? 'Update' : 'Release for stock taking',
                onClick: () => onRelease()
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
    date: moment(),
    inventoryNo: '',
    description: '',
    type: '',
    assetGroup: '',
    location: '',
    trackingType: '',
    totalAsset: 0,
    totalValue: 0
  }),
  handleSubmit: () => null
})(AssetInventoryForm)
