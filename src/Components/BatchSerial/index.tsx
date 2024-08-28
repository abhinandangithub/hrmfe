import loadable from '@loadable/component'

const AddBatchSerial = loadable(() => import('./AddBatchSerial'))
const BatchSerialAutocomplete = loadable(() => import('./BatchSerialAutocomplete'))
const BatchSerialField = loadable(() => import('./BatchSerialField'))
const GenerateBatchSerial = loadable(() => import('./GenerateBatchSerial'))
const SelectBatchSerial = loadable(() => import('./SelectBatchSerial'))
const ShowBatchSerial = loadable(() => import('./ShowBatchSerial'))

export {
  AddBatchSerial,
  BatchSerialAutocomplete,
  BatchSerialField,
  GenerateBatchSerial,
  SelectBatchSerial,
  ShowBatchSerial
}
