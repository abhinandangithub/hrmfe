import type { AutoCompleteProps } from 'antd/lib/auto-complete'
import type { CheckboxProps } from 'antd/lib/checkbox'
import type { DatePickerProps, RangePickerProps } from 'antd/lib/date-picker'
import type { InputProps, TextAreaProps } from 'antd/lib/input'
import type { RadioGroupProps } from 'antd/lib/radio'
import type { SelectProps, SelectValue } from 'antd/lib/select'
import type { TimePickerProps } from 'antd/lib/time-picker'
import type { Moment } from 'moment'
import type { RangeValue } from 'rc-picker/lib/interface'
import type { OptionData, OptionsType } from 'rc-select/lib/interface'
import { ReactNode } from 'react'

export type InputValueType = string | ReadonlyArray<string> | number

export type AltInputTypes = {
  altValue?: InputValueType
  altInput?: boolean
  text?: ((value: InputValueType | SelectValue | undefined) => ReactNode) | ReactNode
  additionalAlt?: ReactNode
}

export type InputFormat = {
  inputFormatValue?: string
  inputFormat?: boolean
  onChangeInputFormat?: (name: string, value: string) => void
}

export type ScanInputTypes = {
  scanType?: 'qrcode' | 'barcode'
  scanInput?: boolean
  defaultScan?: boolean
  onScan?: (name: string, value: string) => void
}

type BaseFormikTypes = {
  mode: any
  name: string
  label?: string
  error?: string
  required?: boolean
  hideLabel?: boolean
  onChangeAlt?: (name: string, value: InputValueType) => void
} & AltInputTypes

export type TInput = {
  step: any
  disable: any
  placeholder?: string
  max?: number
  min?: number
  prefix?: string | Element
  value: InputValueType
  onChange?: (name: string, value: InputValueType) => void
  onBlur?: (name: string, value: InputValueType) => void
  language?: string
} & BaseFormikTypes &
  ScanInputTypes &
  InputFormat &
  Omit<InputProps, 'onChange' | 'onBlur' | 'value'>

export type TInputChip = {
  placeholder?: string
  max?: number
  min?: number
  prefix?: string
  suffix?: string
  value: Array<string>
  emailValidation?: boolean
  onChange?: (name: string, value: InputValueType) => void
  onBlur?: (name: string, value: InputValueType) => void
} & BaseFormikTypes &
  Omit<InputProps, 'onChange' | 'onBlur' | 'value'>

export type TTextArea = {
  placeholder?: string
  value: InputValueType
  onChange?: (name: string, value: InputValueType) => void
  onBlur?: (name: string, value: InputValueType) => void
} & BaseFormikTypes &
  Omit<TextAreaProps, 'onChange' | 'onBlur' | 'type' | 'value'>

interface ISelect<VT> extends Omit<SelectProps<VT>, 'onChange' | 'onBlur' | 'onSelect'> {
  placeholder?: string
  withNone?: boolean | string
  options?: OptionData[]
  endPoint?: string
  optionLabel?: string
  searchKey?: string
  defaultOptions?: OptionData[]
  optionValue?: string
  onChange?: (name: string, value: SelectValue, option?: OptionsType[number] | OptionsType) => void
  onBlur?: (name: string, value: SelectValue) => void
  onSelect?: (value: SelectValue, option?: OptionsType[number]) => void
  params?: Record<string, unknown>
}

export type TSelect = ISelect<SelectValue> & BaseFormikTypes

export type TPagedSelect = ISelect<SelectValue> & Omit<BaseFormikTypes, keyof AltInputTypes>

export type TAutoComplete = {
  placeholder?: string
  textArea?: boolean
  rows?: number
  endPoint?: string
  params?: Record<string, string | number>
  optionLabel?: string
  optionValue?: string
  queryName?: string
  onChange?: (name: string, value: InputValueType, option?: OptionsType[number] | OptionsType) => void
  onBlur?: (name: string, value: InputValueType) => void
  onSelect?: (value: InputValueType, option?: OptionsType[number]) => void
  rightContent?: ReactNode
} & BaseFormikTypes &
  ScanInputTypes &
  Omit<AutoCompleteProps, 'onChange' | 'onBlur' | 'onSelect'>

export type TDatePicker = {
  showTime?: boolean
  onChange?: (name: string, value: Moment | null) => void
  onBlur?: (name: string, value: Moment | null) => void
} & BaseFormikTypes &
  Omit<DatePickerProps, 'onChange' | 'onBlur'>

export type TTimePicker = {
  onChange?: (name: string, value: Moment | null) => void
  onBlur?: (name: string, value: Moment | null) => void
} & BaseFormikTypes &
  Omit<TimePickerProps, 'onChange' | 'onBlur'>

export type TDateRangePicker = {
  onChange?: (name: string, value: RangeValue<Moment>) => void
  onBlur?: (name: string, value: RangeValue<Moment>) => void
} & BaseFormikTypes &
  Omit<RangePickerProps, 'onChange' | 'onBlur'>

export type TCheckbox = {
  value: boolean
  onChange?: (name: string, value: boolean) => void
} & BaseFormikTypes &
  Omit<CheckboxProps, 'onChange'>

export type TRichText = {
  name: string
  value: string
  onChange?: (name: string, value: string) => void
} & BaseFormikTypes

export type TRadioGroup = {
  value: string
  options: Array<{ label: string; value: string }>
  onChange?: (name: string, value: string) => void
} & BaseFormikTypes &
  Omit<RadioGroupProps, 'onChange'>

export type TDurationPicker = {
  value: number
  onChange?: (name: string, value: number) => void
} & BaseFormikTypes

export type TAttachment = {
  title?: string
  value: string[]
  description?: string
  endPoint?: string
  readOnly?: boolean
  fileObj?: boolean
  fileLength?: number
  size?: number
  noPreview?: boolean
  disabled?: boolean
  acceptFile: ('excel' | 'pdf' | 'image')[]
  onChange?: (name: string, value: string[]) => void
} & BaseFormikTypes

export type TAltInput<TFieldName extends string = string> = {
  name: TFieldName
  label?: string
  hideLabel?: boolean
  disabled?: boolean
  value?: InputValueType | SelectValue
  onChange?: (name: `${TFieldName}Alt`, value: InputValueType) => void
} & AltInputTypes

export type TOptions = {
  label: string
  value: string
} & OptionData
