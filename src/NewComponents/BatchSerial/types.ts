export type TBatchSerial = {
  id?: string
  batchNo: string
  serialNo: string
  quantity: TNumber
  stockQuantity?: TNumber
  returnQuantity?: TNumber
  manufacturingDate: string | null
  expiryDate: string | null
  price: TNumber
}

export type TGenerateType = 'batch' | 'serial'

export const DEFAULT_BATCH_SERIAL_FIELDS: TBatchSerial = {
  batchNo: '',
  serialNo: '',
  quantity: '',
  manufacturingDate: null,
  expiryDate: null,
  price: 0
}
