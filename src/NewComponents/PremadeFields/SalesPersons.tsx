import React, { memo } from 'react'
import { Field } from '../Form'
import type { TOption, TSelect } from '../Form/types'

function SalesPersons<Option extends TOption>(props: TSelect<Option>) {
  return <Field as="paged-select" endPoint="sales-persons" {...props} />
}

export default memo(SalesPersons)
