import type { LabeledValue } from 'antd/lib/select'
import { OptionData } from 'rc-select/lib/interface/index'
import { memo, useState } from 'react'
import { TBatchSerial, TGenerateType } from '../../NewComponents/BatchSerial/types'
import apiClient from '../../Util/apiClient'
import { Field } from '../Formik'
import type { TAutoComplete } from '../Formik/types'

type Props = {
  type: TGenerateType
  materialCode: string
  warehouse: string
  location: string
  rack: string
} & TAutoComplete

function BatchSerialField({ type, materialCode, warehouse, location, rack, onSearch, ...props }: Props) {
  const [batchSerialField, setBatchSerialField] = useState<(LabeledValue & TBatchSerial)[]>([])
  const [search, setSearch] = useState('')

  const getBatchSerialField = (code: string) => {
    onSearch?.(code)
    setSearch(code)

    if (!(code.startsWith(search) && batchSerialField.length)) {
      apiClient
        .get<TBatchSerial[]>(`stocks/search-batch-serial-stock/${type}`, {
          params: { code, materialCode, warehouse, location, rack }
        })
        .then(({ status, data }) => {
          if (status === 200) {
            const batchSerials = (data || []).map((item) => ({
              label: type === 'batch' ? item.batchNo : item.serialNo,
              value: type === 'batch' ? item.batchNo : item.serialNo,
              ...item
            }))

            const match = batchSerials.find((item) => item.value === code)

            if (match) {
              props.onSelect?.(match.value, match as OptionData)
            }

            setBatchSerialField(batchSerials)
          }
        })
    }
  }

  const handleScan = (name: string, code: string) => {
    apiClient
      .get('stocks/get-batch-serial', {
        params: { [`${type}No`]: code, materialCode, warehouse, location, rack }
      })
      .then(({ status, data }) => {
        if (status === 200) {
          props.onSelect?.(code, data)
        }
      })
  }

  return (
    <Field
      as="auto-complete"
      scanInput
      scanType="barcode"
      onScan={handleScan}
      onSearch={getBatchSerialField}
      options={batchSerialField}
      {...props}
    />
  )
}

export default memo(BatchSerialField)
