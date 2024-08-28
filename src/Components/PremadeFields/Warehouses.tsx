import React, { memo, useState } from 'react'
import { getWarehouseCodes } from '../../Actions/UserAction'
import { Field } from '../Formik'
import type { TAutoComplete } from '../Formik/types'

function Warehouses(props: TAutoComplete) {
  const [warehouses, setWarehouses] = useState([])
  const [search, setSearch] = useState('')

  const getWarehouses = (warehouse: string) => {
    setSearch(warehouse)

    if (!(warehouse.startsWith(search) && warehouses.length)) {
      getWarehouseCodes({ warehouse }).then((data) => {
        setWarehouses(data)
      })
    }
  }

  return <Field as="auto-complete" onSearch={getWarehouses} options={warehouses} {...props} />
}

export default memo(Warehouses)
