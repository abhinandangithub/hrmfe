import loadable from '@loadable/component'
import { FieldValues, Path } from 'react-hook-form'
import type { TAddBatchSerial } from './AddBatchSerial'
import { TSelectBatchSerial } from './SelectBatchSerial'

const AddBatchSerial = loadable(() => import('./AddBatchSerial')) as <TFieldName extends string = string>(
  props: TAddBatchSerial<TFieldName>
) => JSX.Element
const BatchSerialField = loadable(() => import('./BatchSerialField'))
const SelectBatchSerial = loadable(() => import('./SelectBatchSerial')) as <
  TFieldValues extends FieldValues = FieldValues,
  TFieldName extends Path<TFieldValues> = Path<TFieldValues>
>(
  props: TSelectBatchSerial<TFieldValues, TFieldName>
) => JSX.Element
const GenerateBatchSerial = loadable(() => import('./GenerateBatchSerial'))

export { AddBatchSerial, BatchSerialField, SelectBatchSerial, GenerateBatchSerial }
