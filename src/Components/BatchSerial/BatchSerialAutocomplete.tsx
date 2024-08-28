import React, { memo, useState } from 'react'
import useDidUpdateEffect from '../../Hooks/useDidUpdateEffect'
import apiClient from '../../Util/apiClient'
import { Field } from '../Formik'
import { TAutoComplete, TOptions } from '../Formik/types'

type Props = {
  warehouse: string
  location: string
  rack: string
} & TAutoComplete

function BatchSerialAutocomplete({ warehouse, onSearch, onSelect, ...props }: Props) {
  const [batchSerialAutocomplete, setBatchSerialAutocomplete] = useState<TOptions[]>([])
  const [search, setSearch] = useState('')

  useDidUpdateEffect(() => {
    if (!props.value) {
      setBatchSerialAutocomplete([])
    }
  }, [props.value])

  const getBatchSerialAutocomplete = (code: string) => {
    onSearch?.(code)
    setSearch(code)

    if (!(code.startsWith(search) && batchSerialAutocomplete.length)) {
      apiClient
        .get<TOptions[]>('stocks/search-all-stock', {
          params: { code, warehouse }
        })
        .then(({ status, data }) => {
          if (status === 200) {
            const match = data.find((item) => item.label === code)

            if (match) {
              onSelect?.(match.materialCode, match)
            }

            setBatchSerialAutocomplete(data)
          }
        })
    }
  }

  return (
    <Field
      as="auto-complete"
      key={warehouse}
      scanInput
      scanType="barcode"
      onScan={(n, v) => getBatchSerialAutocomplete(v)}
      onSearch={getBatchSerialAutocomplete}
      options={batchSerialAutocomplete}
      onSelect={(v, o) => onSelect?.(o?.materialCode, o)}
      dropdownClassName="pos-orders"
      {...props}
    />
  )
}

export default memo(BatchSerialAutocomplete)
