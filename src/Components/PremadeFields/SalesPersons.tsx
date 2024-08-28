import React, { memo } from 'react'
import { Field } from '../Formik'
import type { TSelect } from '../Formik/types'

function SalesPersons(props: TSelect) {
  return <Field as="paged-select" endPoint="sales-persons" {...props} />
}

export default memo(SalesPersons)
