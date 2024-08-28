import React, { memo, useEffect, useState } from 'react'
import { getOptionsByType } from '../../Actions/UserAction'
import { Field } from '../Form'
import type { TOption, TSelect } from '../Form/types'

type Props = {
  code?: string
}

function SetupOptions<Option extends TOption>({ code, ...props }: Props & TSelect<Option>) {
  const [options, setOptions] = useState<Option[]>([])

  const getData = () => {
    if (code) {
      getOptionsByType({
        type: [code]
      }).then((orderType) => {
        setOptions(orderType[code] || [])
      })
    }
  }

  useEffect(() => {
    if (!props.options) {
      getData()
    }
  }, [])

  return <Field as="select" options={options} {...props} />
}

export default memo(SetupOptions)
