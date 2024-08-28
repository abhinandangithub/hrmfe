import React, { memo, useEffect, useState } from 'react'
import apiClient from '../../Util/apiClient'
import { convertSelectOptions } from '../../Util/Util'
import { Field } from '../Formik'
import { TSelect } from '../Formik/types'

type Props = {
  code?: string
} & TSelect

function Accounts({ code, ...props }: Props) {
  const [accountOptions, setAccountOptions] = useState([])

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
