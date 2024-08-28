import React, { memo, useState } from 'react'
import { getRacksByLocation } from '../../Actions/UserAction'
import { Field } from '../Formik'
import type { TAutoComplete } from '../Formik/types'

type Props = {
  warehouse: string
  location: string
} & TAutoComplete

function Racks({ warehouse, location, ...props }: Props) {
  const [racks, setRacks] = useState([])
  const [search, setSearch] = useState('')

  const getRacks = (rack: string) => {
    setSearch(rack)

    if (!(rack.startsWith(search) && racks.length)) {
      getRacksByLocation({ warehouse, location, rack }).then((data) => {
        setRacks(data)
      })
    }
  }

  return <Field as="auto-complete" onSearch={getRacks} options={racks} {...props} />
}

export default memo(Racks)
