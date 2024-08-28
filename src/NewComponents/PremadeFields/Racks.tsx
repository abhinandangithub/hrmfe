import React, { memo, useState } from 'react'
import { getRacksByLocation } from '../../Actions/UserAction'
import { Field } from '../Form'
import type { TAutoComplete, TOption } from '../Form/types'

type Props = {
  warehouse: string
  location: string
}

function Racks<Option extends TOption, TFieldName extends string>({
  warehouse,
  location,
  ...props
}: Props & TAutoComplete<Option, TFieldName>) {
  const [racks, setRacks] = useState<Option[]>([])
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
