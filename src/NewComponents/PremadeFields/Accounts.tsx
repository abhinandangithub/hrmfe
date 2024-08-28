import React, { memo, useEffect, useState } from 'react'
import apiClient from '../../Util/apiClient'
import { convertSelectOptions } from '../../Util/Util'
import { Field } from '../Form'
import type { TOption, TSelect } from '../Form/types'

type Props = {
  code?: string
}

function Accounts<Option extends TOption>({ code, ...props }: Props & TSelect<TOption>) {
  const [accountOptions, setAccountOptions] = useState<Option[]>([])

  const getData = () => {
    if (code) {
      apiClient.get(`chart-of-accounts/options/${code}`).then(({ data }) => {
        if (data?.result) {
          setAccountOptions(convertSelectOptions(data.result, ['accountCode', '-', 'name'], 'code'))
        }
      })
    }
  }

  useEffect(() => {
    if (!props.options) {
      getData()
    }
  }, [])

  return <Field as="select" options={accountOptions} {...props} />
}

export default memo(Accounts)
