import React, { memo, useState } from 'react'
import { getLocationsByWarehouse } from '../../Actions/UserAction'
import { Field } from '../Formik'
import type { TAutoComplete } from '../Formik/types'

type Props = {
  warehouse: string
} & TAutoComplete

function Locations({ warehouse, ...props }: Props) {
  const [locations, setLocations] = useState([])
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
