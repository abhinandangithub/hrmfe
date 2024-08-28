import React, { memo, useState } from 'react'
import { getLocationsByWarehouse } from '../../Actions/UserAction'
import { Field } from '../Form'
import type { TAutoComplete, TOption } from '../Form/types'

export type LocationProps<Option extends TOption, TFieldName extends string> = {
  warehouse: string
} & TAutoComplete<Option, TFieldName>

function Locations<Option extends TOption, TFieldName extends string>({
  warehouse,
  ...props
}: LocationProps<Option, TFieldName>) {
  const [locations, setLocations] = useState<Option[]>([])
  const [search, setSearch] = useState('')

  const getLocations = (location: string) => {
    setSearch(location)

    if (!(location.startsWith(search) && locations.length)) {
      getLocationsByWarehouse({ warehouse, location }).then((data) => {
        setLocations(data)
      })
    }
  }

  return <Field as="auto-complete" onSearch={getLocations} options={locations} {...props} />
}

export default memo(Locations)
