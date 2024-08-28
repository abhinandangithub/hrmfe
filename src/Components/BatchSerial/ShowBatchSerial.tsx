/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { InfoCircleOutlined } from '@ant-design/icons'
import { Tooltip } from 'antd'
import type { TablePaginationConfig } from 'antd/lib/table'
import type { SorterResult } from 'antd/lib/table/interface'
import { flatten } from 'flat'
import _ from 'lodash'
import moment from 'moment'
import { memo, useEffect, useState } from 'react'
import { useSelector } from '../../Hooks/redux'
import { TBatchSerial } from '../../NewComponents/BatchSerial/types'
import { parseAmount } from '../../Util/Util'
import apiClient from '../../Util/apiClient'
import Button from '../Button'
import ModalBox from '../ModalBox/ModalBox'
import TableBox, { PageData } from '../TableBox/TableBox'

type Props = {
  materialCode: string
  warehouse: string
  location: string
  rack: string
}

function ShowBatchSerial({ materialCode, warehouse, location, rack }: Props) {
  const [show, setShow] = useState(false)
  const [filter, setFilter] = useState<PageData>()
  const [params, setParams] = useState<TablePaginationConfig>()
  const [sortOrder, setSortOrder] = useState<SorterResult<TBatchSerial>>()
  const [batchSerials, setBatchSerials] = useState<TBatchSerial[]>([])
  const {
    userInfo,
    companyInfo: { configurations }
  } = useSelector((state) => state.users)
  const currentRole = userInfo.roleData?.name || userInfo.userType

  const getData = (pageData?: PageData) => {
    const _params: Record<string, unknown> = { ...filter, ...params, ...pageData }

    if (sortOrder) {
      if (sortOrder.field === 'stockQuantity') {
        sortOrder.field = 'quantity'
      }

      _params.sortOrder = _.pick(sortOrder, ['field', 'order'])
    }

    apiClient
      .get('stocks/get-batch-serial-stocks', {
        params: flatten({ ..._params, materialCode, warehouse, location, rack })
      })
      .then(({ status, data }) => {
        if (status === 200) {
          setBatchSerials(data.result || [])
          setFilter({ ..._params, ...data.pageData })
        }
      })
  }

  useEffect(() => {
    if (show) {
      getData()
    }
  }, [show, params, sortOrder])

  return (
    <div>
      <ModalBox
        title="Batch/ Serial"
        width={800}
        visible={show}
        onCancel={() => setShow(false)}
        footer={false}>
        <TableBox
          columns={[
            {
              dataIndex: 'batchNo',
              title: 'Batch No',
              sorter: true
            },
            {
              dataIndex: 'serialNo',
              title: 'Serial No',
              sorter: true
            },
            {
              dataIndex: 'unit',
              title: 'UOM'
            },
            {
              dataIndex: 'quantity',
              title: 'Quantity',
              align: 'right'
            },
            {
              dataIndex: 'warehouse',
              title: 'Warehouse'
            },
            {
              dataIndex: 'location',
              title: 'Location'
            },
            {
              dataIndex: 'rack',
              title: 'Rack'
            },
            {
              dataIndex: 'manufacturingDate',
              title: 'Mfg. Date',
              sorter: true,
              render: (date: any) => moment(date).format('YYYY-MM-DD')
            },
            {
              dataIndex: 'expiryDate',
              title: 'Expiry Date',
              sorter: true,
              render: (date: any) => moment(date).format('YYYY-MM-DD')
            },
            {
              dataIndex: 'price',
              title: 'Price',
              align: 'right',
              render: (text: any) => parseAmount(text),
              dontShow: !(
                !configurations.stockPriceAccess?.length ||
                configurations.stockPriceAccess?.includes(currentRole)
              )
            }
          ]}
          dataSource={batchSerials}
          pageData={filter}
          onChange={(params, filter, sortOrder) => {
            setParams(params)
            setSortOrder(sortOrder as SorterResult<TBatchSerial>)
          }}
          onChangePage={getData}
        />
      </ModalBox>
      <Tooltip title="Batch/ Serial">
        <Button
          icon={<InfoCircleOutlined className="d-flex justify-content-center" />}
          size="small"
          onClick={() => setShow(true)}
        />
      </Tooltip>
    </div>
  )
}

export default memo(ShowBatchSerial)
