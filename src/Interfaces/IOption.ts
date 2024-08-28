export interface IOption<T> {
  company: string
  createdAt: Date
  id: string
  label: string
  network: string
  status: 'Active' | 'InActive'
  type: T
  updatedAt: Date
  value: string
}
