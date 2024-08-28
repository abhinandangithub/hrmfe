import React, { memo, useEffect, useState } from 'react'
import apiClient from '../../Util/apiClient'
import { convertSelectOptions } from '../../Util/Util'
import { Field } from '../Form'
import type { TOption, TSelect } from '../Form/types'

type Props = {
  params: {
    type: string
    for: string
  }
}

function Templates<Option extends TOption>({ params, ...props }: Props & TSelect<Option>) {
  const [templates, setTemplates] = useState<Option[]>([])

  const getData = () => {
    apiClient.get('customTemplates/getActive', { params }).then(({ data }) => {
      if (data && data.result) {
        const templates = [
          { label: 'Default', value: 'Default' } as Option,
          ...convertSelectOptions<Option>(data.result, 'name', 'id')
        ]
        setTemplates(templates)
      }
    })
  }

  useEffect(() => {
    if (!props.options) {
      getData()
    }
  }, [])

  return <Field as="select" label="Template" options={templates} {...props} />
}

export default memo(Templates)
