export interface FormInputProps {
  name: string
  control: any
  label?: string
  placeholder?: string
  radioOptions?: any[]
  type?: string
  pattern?: string
  select?: {
    multiple?: boolean
    endpoint?: string
    type: 'API' | 'LOCAL'
    options?: any[]
    keys?: {
      key: string
      value: string
      object?: any
    }
  }
}
