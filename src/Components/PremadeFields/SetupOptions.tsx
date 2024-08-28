import React, { memo, useEffect, useState } from 'react'
import { getOptionsByType } from '../../Actions/UserAction'
import { Field } from '../Formik'
import { TSelect } from '../Formik/types'

type Props = {
  code?: string
} & TSelect

function SetupOptions({ code, ...props }: Props) {
  const [options, setOptions] = useState([])

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
