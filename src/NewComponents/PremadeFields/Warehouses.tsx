import React, { memo, useState } from 'react'
import { getWarehouseCodes } from '../../Actions/UserAction'
import { Field } from '../Form'
import type { TAutoComplete, TOption } from '../Form/types'

export type WarehouseProps<Option extends TOption, TFieldName extends string> = {
  venstk?: boolean
} & TAutoComplete<Option, TFieldName>

function Warehouses<Option extends TOption, TFieldName extends string>({
  venstk,
  ...props
}: WarehouseProps<Option, TFieldName>) {
  const [warehouses, setWarehouses] = useState<Option[]>([])
  const [search, setSearch] = useState('')

  const getWarehouses = (warehouse: string) => {
    setSearch(warehouse)

    if (!(warehouse.startsWith(search) && warehouses.length)) {
      getWarehouseCodes({ warehouse }).then((data) => {
        if (venstk) {
          data.push({ label: 'VENSTK', value: 'VENSTK' })
        }

        setWarehouses(data)
      })
    }
  }

  return <Field as="auto-complete" onSearch={getWarehouses} options={warehouses} {...props} />
}

export default memo(Warehouses)
