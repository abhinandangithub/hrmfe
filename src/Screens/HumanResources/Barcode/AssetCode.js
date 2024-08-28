import { Col, Row, Space } from 'antd'
import _ from 'lodash'
import moment from 'moment'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import FooterActions from '../../../Components/FooterActions'
import ModalBox from '../../../Components/ModalBox/ModalBox'
import TableBox from '../../../Components/TableBox/TableBox'
import PanelLayout from '../../../Layout/PanelLayout'
import TableLayout from '../../../Layout/TableLayout'
import { history } from '../../../Routes'
import apiClient from '../../../Util/apiClient'
import { convertSelectOptions } from '../../../Util/Util'
import InventoryCard from '../AssetInventory/InventoryCard'
import AssetCodeForm from './AssetCodeForm'

// const Schema = Yup.object().shape({
//   level: Yup.string().required(),
//   score: Yup.number().required(),
//   year: Yup.date().required(),
//   attachments: Yup.array()
// })

function AssetCode({
  setFieldValue,
  values,
  match: {
    params: { id }
  }
}) {
  // const [total, setTotal] = useState([])
  const [code, setCode] = useState({ assetInv: [] })
  const [viewLogs, setViewLogs] = useState(false)

  const { t } = useTranslation()

  const [costCenterOptions, setCostCenterOptions] = useState([])

  const getData = (params) => {
    apiClient.get(`asset-inventory/by-id/${id}`, { params }).then(({ status, data }) => {
      if (status === 200) {
        setCode(data?.result)
      }
    })
    apiClient.get('cost-centers/get').then(({ data }) => {
      if (data && data.result) {
        setCostCenterOptions(convertSelectOptions(data.result, 'name', 'costCenterNo'))
      }
    })
    //   apiClient.get('new-asset/get-all', { params: { ...values } }).then(({ status, data }) => {
    //     if (status === 200) {
    //       setTotal(data.result)
    //     }
    //   })
  }

  function handleValueChange(val) {
    setFieldValue({ ...values, ...val })
  }

  useEffect(() => {
    getData()
  }, [])

  const columns = [
    {
      title: 'Asset No.',
      dataIndex: 'assetData',
      render: (v, row) => {
        // console.log('row', row.status)

        if (row.status === undefined) {
          return (
            <div>
              <a onClick={() => setViewLogs(row)}>{v?.assetNo}</a>
            </div>
          )
        }

        return <div>{v?.assetNo}</div>
      }
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
    }
  ]

  const buttons = [
    {
      title: 'Total Assets',
      value: _.sumBy(code.assetInv, (item) => item.assetData.noOfAssets),
      color: '#7e57c2'
    },
    {
      title: 'Total Inventory Value',
      value: _.sumBy(code.assetInv, (item) => item.assetData.currAsset),
      color: 'var(--dark-blue)'
    }
  ]

  return (
    <>
      <ModalBox
        title="Track Assets by Code"
        visible={!!viewLogs}
        onCancel={() => setViewLogs(false)}
        footer={false}
        destroyOnClose>
        {viewLogs && (
          <AssetCodeForm
            currentDetails={viewLogs}
            inventoryDetails={code}
            id={id}
            costCenter={costCenterOptions}
            handleValueChange={handleValueChange}
            setFieldValue={setFieldValue}
            onCancel={() => setViewLogs(false)}
          />
        )}
      </ModalBox>
      <Row justify="center" className="inner-contents">
        <Col xs={20}>
          <PanelLayout title={t('Track Asset by Code')}>
            <Row>
              <Col xs={18}>
                <Row gutter={[20, 10]} style={{ justifyContent: 'flex-start', padding: 5 }}>
                  <Col xs={12} md={12} lg={4}>
                    <div className="form-field">{moment(code.date).format('DD-MM-YYYY')}</div>
                  </Col>
                  <Col xs={24} md={12} lg={4}>
                    <div className="form-field">{code.assetInv[0]?.assetData.assetGroup}</div>
                  </Col>
                </Row>
                <Row gutter={[20, 10]} style={{ justifyContent: 'flex-start', padding: 5 }}>
                  <Col xs={6} md={12} lg={4}>
                    <div className="form-field">Q2.Inventory</div>
                  </Col>
                  <Col xs={6} md={12} lg={4}>
                    <div className="form-field">{code.assetInv[0]?.assetData.type}</div>
                  </Col>
                </Row>
                <Row gutter={[20, 10]} style={{ justifyContent: 'flex-start', padding: 5 }}>
                  <Col xs={12} md={12} lg={4}>
                    <div className="form-field">Asset Stock for {code.inventoryNo}</div>
                  </Col>
                  <Col xs={12} md={12} lg={4}>
                    <div className="form-field">{code.assetInv[0]?.assetData.location}</div>
                  </Col>
                </Row>
                <Row gutter={[20, 10]} style={{ justifyContent: 'flex-start', padding: 5 }}>
                  <Col xs={12} md={12} lg={4}>
                    <div className="form-field">{code.assetInv[0]?.assetData.trackingType}</div>
                  </Col>
                  <Col xs={24} md={12} lg={4}>
                    <div className="form-field">{code.status}</div>
                  </Col>
                </Row>
              </Col>
              <hr />
              <Col xs={6}>
                <Space size="large" direction="vertical" className="w-100">
                  {buttons.map((item, i) => (
                    <InventoryCard key={i} item={item} />
                  ))}
                </Space>
              </Col>
            </Row>
            <TableLayout>
              <TableBox columns={columns} dataSource={code.assetInv} />
            </TableLayout>
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
        />
      </Row>
    </>
  )
}

export default AssetCode
