import { Col, Row } from 'antd'
import _ from 'lodash'
import moment from 'moment'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import FooterActions from '../../../Components/FooterActions'
import TableBox from '../../../Components/TableBox/TableBox'
import PanelLayout from '../../../Layout/PanelLayout'
import TableLayout from '../../../Layout/TableLayout'
import { history } from '../../../Routes'
import apiClient from '../../../Util/apiClient'
import InventoryCard from './InventoryCard'

function ViewInventory({
  match: {
    params: { id }
  }
}) {
  const [stock, setStock] = useState({ assetInv: [] })
  const [total, setTotal] = useState([])
  const { t } = useTranslation()
  const assetData = [
    {
      title: 'Asset No.',
      dataIndex: 'assetData',
      render: (v) => v?.assetNo
    },
    {
      title: 'Asset Desc.',
      dataIndex: 'assetData',
      render: (v) => v?.assetDesc
    },
    {
      title: 'Asset Tag',
      dataIndex: 'assetData',
      render: (v) => v?.assetTag
    },
    {
      title: 'Location',
      dataIndex: 'assetData',
      render: (v) => v?.location
    },

    {
      title: 'Inv. Taken on',
      dataIndex: 'date',
      render: () => moment(stock.date).format('DD-MM-YYYY')
    },

    {
      title: 'Available?',
      dataIndex: 'available',
      render: (v) => {
        console.log('v', v)

        if (v) {
          return <i className="fi flaticon-tick" />
        }

        return <i className="fi flaticon-cross" />
      }
    },
    {
      title: 'Status',
      dataIndex: 'status'
    },
    {
      title: 'Taken by',
      dataIndex: 'takenBy',

      render: (v) => v?.name
    },
    {
      title: 'No of Asset',
      dataIndex: 'assetData',

      render: (v) => v?.noOfAssets
    }
  ]

  const getData = (params, values) => {
    apiClient.get(`asset-inventory/by-id/${id}`, { params }).then(({ status, data }) => {
      if (status === 200) {
        setStock(data?.result)
      }
    })
    apiClient.get('new-asset/get-all', { params: { ...values } }).then(({ status, data }) => {
      if (status === 200) {
        setTotal(data.result)
      }
    })
  }

  useEffect(() => {
    getData()
  }, [])
  console.log('total', total)

  const onSave = (data) => {
    const value = {
      ...data,
      status: 'Terminated'
    }
    apiClient.put(`asset-inventory/update-id/${id}`, value).then(({ status }) => {
      if (status === 200) {
        history.push('/app/asset-inventories')
      }
    })
  }

  const buttons = [
    {
      title: 'Total Inventory Value',
      value: _.sumBy(stock.assetInv, (item) => item.assetData.currAsset),
      color: 'var(--dark-blue)'
    },
    {
      title: 'Total Assets',
      value: _.sumBy(stock.assetInv, (item) => item.assetData.noOfAssets),
      color: '#7e57c2'
    },
    {
      children: [
        {
          title: 'Completed',
          value: stock.completed,
          color: '#5dbe45'
        },
        {
          title: 'Pending',
          value: _.sumBy(stock.assetInv, (item) => item.assetData.noOfAssets) - stock.completed,
          color: '#c85500'
        }
      ]
    },
    {
      title: 'Available',
      value: _.sumBy(stock.assetInv, (item) => (item.available ? item.assetData.noOfAssets : 0)),
      color: '#2f56c3'
    },
    {
      children: [
        {
          title: `Good - ${_.sumBy(stock.assetInv, (item) =>
            item.status === 'Good' ? item.assetData.noOfAssets : 0
          )}`,
          color: '#00c252'
        },
        {
          title: `Damaged - ${_.sumBy(stock.assetInv, (item) =>
            item.status === 'Damaged' ? item.assetData.noOfAssets : 0
          )}`,
          color: '#f79a05'
        },
        {
          title: `For Sale - ${_.sumBy(stock.assetInv, (item) =>
            item.status === 'For Sale' ? item.assetData.noOfAssets : 0
          )}`,
          color: '#80a5e0'
        },
        {
          title: `Lost - ${_.sumBy(stock.assetInv, (item) =>
            item.status === 'Lost' ? item.assetData.noOfAssets : 0
          )}`,
          color: '#c50000'
        }
        // {
        //   title: 'Damaged - 10',
        //   color: '#fccd00'
        // },
        // {
        //   title: 'For Sale - 10',
        //   color: '#80a5e0'
        // },
        // {
        //   title: 'Lost - 10',
        //   color: '#c50000'
        // }
      ]
    }
  ]

  return (
    <Row justify="center" className="inner-contents">
      <Col xs={20}>
        <PanelLayout title={t('View Inventory')}>
          <Row gutter={[20, 10]} style={{ justifyContent: 'flex-start', padding: 5 }}>
            <Col xs={12} md={12} lg={4}>
              <div className="form-field">{moment(stock.date).format('DD-MM-YYYY')}</div>
            </Col>
            <Col xs={24} md={12} lg={4}>
              <div className="form-field">{stock?.assetInv[0]?.assetData?.assetGroup || ''}</div>
            </Col>
          </Row>
          <Row gutter={[20, 10]} style={{ justifyContent: 'flex-start', padding: 5 }}>
            <Col xs={6} md={12} lg={4}>
              <div className="form-field">Q2.Inventory</div>
            </Col>
            <Col xs={6} md={12} lg={4}>
              <div className="form-field">{stock?.assetInv[0]?.assetData?.type || ''}</div>
            </Col>
          </Row>
          <Row gutter={[20, 10]} style={{ justifyContent: 'flex-start', padding: 5 }}>
            <Col xs={12} md={12} lg={4}>
              <div className="form-field">Asset Stock for {stock?.inventoryNo || ''}</div>
            </Col>
            <Col xs={12} md={12} lg={4}>
              <div className="form-field">{stock?.assetInv[0]?.assetData?.location || ''}</div>
            </Col>
          </Row>
          <Row gutter={[20, 10]} style={{ justifyContent: 'flex-start', padding: 5 }}>
            <Col xs={12} md={12} lg={4}>
              <div className="form-field">{stock?.assetInv[0]?.assetData?.trackingType || ''}</div>
            </Col>
            <Col xs={24} md={12} lg={4}>
              <div className="form-field">{stock?.status}</div>
            </Col>
          </Row>
          <hr />
          <TableLayout detailed exportUrl="asset-inventoryForm/export">
            <TableBox columns={assetData} dataSource={stock?.assetInv} />
          </TableLayout>
          <Row justify="center" gutter={[20, 10]} style={{ padding: 40 }}>
            {buttons.map((item, i) => (
              <Col xs={4} className="d-flex flex-column" key={i}>
                <InventoryCard item={item} />
              </Col>
            ))}
          </Row>
        </PanelLayout>
      </Col>
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
            label: 'Stop Inventory',
            onClick: () => onSave()
          }
        ]}
      />
    </Row>
  )
}

export default ViewInventory
