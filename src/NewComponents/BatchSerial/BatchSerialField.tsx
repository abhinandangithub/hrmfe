import { memo, useState } from 'react'
import apiClient from '../../Util/apiClient'
import { Field } from '../Form'
import type { TAutoComplete, TOption } from '../Form/types'
import type { TBatchSerial, TGenerateType } from './types'

export type BatchSerialOption = TBatchSerial & TOption

export type BatchSerialFieldProps<
  Option extends BatchSerialOption,
  TFieldName extends string,
  TTextArea extends boolean
> = {
  type: TGenerateType
  materialCode: string
  warehouse: string
  location?: string
  rack?: string
} & TAutoComplete<Option, TFieldName, TTextArea>

function BatchSerialField<
  Option extends BatchSerialOption,
  TFieldName extends string,
  TTextArea extends boolean
>({
  type,
  materialCode,
  warehouse,
  location,
  rack,
  onSearch,
  ...props
}: BatchSerialFieldProps<Option, TFieldName, TTextArea>) {
  const [batchSerialField, setBatchSerialField] = useState<Option[]>([])
  const [search, setSearch] = useState('')

  const getBatchSerialField = (code: string) => {
    onSearch?.(code)
    setSearch(code)

    if (!(code.startsWith(search) && batchSerialField.length)) {
      apiClient
        .get<Option[]>(`stocks/search-batch-serial-stock/${type}`, {
          params: { code, materialCode, warehouse, location, rack }
        })
        .then(({ status, data }) => {
          if (status === 200) {
            const batchSerials = (data || []).map((item) => ({
              ...item,
              label: type === 'batch' ? item.batchNo : item.serialNo,
              value: type === 'batch' ? item.batchNo : item.serialNo
            }))

            const match = batchSerials.find((item) => item.value === code)

            if (match) {
              props.onSelect?.(match.value, match as Option)
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
