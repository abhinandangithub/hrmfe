import { EditOutlined } from '@ant-design/icons'
import { Col, Modal, Row } from 'antd'
import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import Button from '../../../Components/Button'
import ButtonBox from '../../../Components/ButtonBox/ButtonBox'
import TableBox from '../../../Components/TableBox/TableBox'
import FilterLayout from '../../../Layout/FilterLayout'
import apiClient from '../../../Util/apiClient'
import { GET_DATA, SET_DATA, textToBase64Barcode, validateAccess } from '../../../Util/Util'
import NewAssetFilter from './NewAssetFilter'

export default function NewAssets() {
  const [selectedRows, setSelectedRows] = useState([])
  const history = useHistory()
  const [newAssets, setNewAssets] = useState([])

  useEffect(() => {
    getData(GET_DATA('newAssets.filterData'))
  }, [])

  const onChangePage = (pageData) => {
    getData({ ...pageData })
  }

  const getData = (params) => {
    const filterCache = GET_DATA('newAssets.filterData') || {}
    params = { ...filterCache, ...params }

    // console.log('params', params)AA

    apiClient.get('new-asset/get-all', { params }).then(({ data }) => {
      if (data && data.result) {
        SET_DATA('newAssets.filterData', { ...params, ...data.pageData })

        setNewAssets(data.result)
      }
    })
  }

  const columns = [
    {
      title: 'Asset no.',
      dataIndex: 'assetNo'
    },
    {
      title: 'Name',
      dataIndex: 'name'
    },
    {
      title: 'Type',
      dataIndex: 'type'
    },
    {
      title: 'Location',
      dataIndex: 'location'
    },
    {
      title: 'No of Assets',
      dataIndex: 'noOfAssets'
    },
    {
      title: 'Currency',
      dataIndex: 'currency'
    },
    {
      title: 'Ori Cost',
      dataIndex: 'originalCost'
    },
    {
      title: 'Acc. Dep.',
      dataIndex: 'depreciationMethod'
    },
    {
      title: 'Current Asset ',
      dataIndex: 'currAsset'
    },
    {
      title: 'Salvage Value',
      dataIndex: 'salvageValue'
    },
    {
      title: 'Useful Life',
      dataIndex: 'usefulLife'
    },
    {
      ...(validateAccess('edit-new-asset') && {
        title: 'Action',
        dataIndex: 'custom_action',
        render: (text, row) => (
          <div className="btn-group">
            <Button onClick={() => history.push(`/app/edit-new-asset/${row.id}`)} className="btn-glow">
              <EditOutlined />
            </Button>
          </div>
        )
      })
    }
  ]

  const onSend = (values) => {
    if (selectedRows.length > 0) {
      apiClient
        .post('new-asset/label', {
          tags: values.map((item) => item)
        })
        .then(({ data }) => {
          if (data?.result) {
            Modal.info({
              width: 600,
              icon: null,
              content: (
                <div>
                  {data.result.map((item, i) => (
                    <div key={i}>
                      <Row gutter={[20, 20]} align="middle">
                        <Col xs={14}>
                          {item.trackingType === 'QRcode' && (
                            <img alt="" src={item.qrCode} height={100} width={100} />
                          )}
                          {item.trackingType === 'Barcode' && (
                            <img alt="" src={textToBase64Barcode(item.assetTag)} width="100%" />
                          )}
                        </Col>
                        <Col xs={10}>
                          <h4>Asset Name:{item.name}</h4>
                          <h4>Asset Number:{item.assetNo}</h4>
                        </Col>
                      </Row>
                    </div>
                  ))}
                </div>
              )
            })
            // data.result.map((item, i) => {
            //   if (item.trackingType === 'Barcode') {
            //     generateBr('br', i)
            //   }

            //   return null
            // })
          }
        })
      setSelectedRows([])
    }
  }

  return (
    <FilterLayout
      addButton={{
        title: 'Add Asset',
        onClick: () => history.push('/app/add-new-asset'),
        access: 'add-new-asset'
      }}
      filterData={GET_DATA('newAssets.filterData')}
      filter={<NewAssetFilter onSubmit={getData} />}>
      <div className="top-filter-options">
        <Row>
          <Col
            xs={{ span: 24, order: 1 }}
            sm={{ span: 24, order: 1 }}
            md={{ span: 12, order: 1 }}
            lg={{ span: 12, order: 1 }}>
            <h2>Asset Overview</h2>
          </Col>

          <Col
            xs={{ span: 24, order: 2 }}
            sm={{ span: 24, order: 2 }}
            md={{ span: 12, order: 2 }}
            lg={{ span: 12, order: 2 }}>
            {selectedRows.length > 0 && (
              <div style={{ float: 'right', marginLeft: '100px', alignItems: 'flex-end' }}>
                <ButtonBox variant="primary" onClick={() => onSend(selectedRows)}>
                  Label Printing
                </ButtonBox>
              </div>
            )}
          </Col>
        </Row>
      </div>
      <TableBox
        dataSource={newAssets}
        columns={columns}
        pageData={GET_DATA('newAssets.filterData')}
        onSelect={(selectedRows) => setSelectedRows(selectedRows)}
        selectedRows={selectedRows}
        onChangePage={onChangePage}
      />
    </FilterLayout>
  )
}
