export interface IPaymasterField {
  company: string
  createdAt: Date
  id: string | number
  key: string
  label: string
  length: number
  unit: string
  network: string
  required: boolean
  status: 'Active' | 'InActive'
  updatedAt: Date
}
