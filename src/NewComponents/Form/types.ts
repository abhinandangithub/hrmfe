import { Input, Select } from 'antd'
import type { AutoCompleteProps } from 'antd/lib/auto-complete'
import type { CheckboxProps } from 'antd/lib/checkbox'
import type { DatePickerProps, RangePickerProps } from 'antd/lib/date-picker'
import type { InputProps, TextAreaProps } from 'antd/lib/input'
import TextArea from 'antd/lib/input/TextArea'
import type { RadioGroupProps } from 'antd/lib/radio'
import type { SelectProps, SelectValue } from 'antd/lib/select'
import type { Moment } from 'moment'
import type { RangeValue } from 'rc-picker/lib/interface'
import type { SingleType } from 'rc-select/lib/interface/generator'
import type { ReactNode, Ref } from 'react'
import { FieldValues } from 'react-hook-form'

export type InputValueType = string | ReadonlyArray<string> | number

export type AltInputTypes = {
  altValue?: InputValueType
  altInput?: boolean
  text?: ReactNode
  additionalAlt?: ReactNode
}

export type InputFormat = {
  inputFormatValue?: string
  inputFormat?: boolean
  onChangeInputFormat?: (name: string, value: string) => void
}

export type ScanInputTypes<TFieldName extends string = string> = {
  scanType?: 'qrcode' | 'barcode'
  scanInput?: boolean
  defaultScan?: boolean
  onScan?: (name: TFieldName, value: string) => void
}

type BaseFormTypes<TFieldName extends string = string> = {
  name: TFieldName
  label?: string
  error?: string
  required?: boolean
  hideLabel?: boolean
  onChangeAlt?: (name: string, value: InputValueType) => void
}

export type TInput<TFieldName extends string = string> = {
  delay?: number
  innerRef?: Ref<Input>
  placeholder?: string
  max?: number
  min?: number
  prefix?: string | Element
  value: string | TNumber
  onChange?: (name: TFieldName, value: string | TNumber) => void
} & BaseFormTypes<TFieldName> &
  AltInputTypes &
  ScanInputTypes<TFieldName> &
  InputFormat &
  Omit<InputProps, 'onChange' | 'value'>

export type TInputChip = {
  innerRef?: Ref<Input>
  placeholder?: string
  max?: number
  min?: number
  prefix?: string
  suffix?: string
  value: Array<string>
  emailValidation?: boolean
  onChange?: (name: string, value: InputValueType) => void
} & BaseFormTypes &
  AltInputTypes &
  Omit<InputProps, 'onChange' | 'value'>

export type TTextArea = {
  innerRef?: Ref<TextArea>
  placeholder?: string
  value: InputValueType
  onChange?: (name: string, value: InputValueType) => void
} & BaseFormTypes &
  AltInputTypes &
  Omit<TextAreaProps, 'onChange' | 'type' | 'value'>

type GenericSelect<
  Option extends TOption = TOption,
  V extends SelectValue = SelectValue,
  TFieldName extends string = string
> = {
  innerRef?: Ref<Select<V>>
  placeholder?: string
  withNone?: string | boolean
  options?: Option[]
  onChange?: (name: TFieldName, value: V, option?: Option) => void
  onSelect?: (value: SingleType<V>, option?: Option) => void
} & Omit<SelectProps<V>, 'onChange' | 'onSelect' | 'options' | 'defaultOptions'> &
  BaseFormTypes<TFieldName>

export type TSelect<
  Option extends TOption = TOption,
  V extends SelectValue = SelectValue,
  TFieldName extends string = string
> = GenericSelect<Option, V, TFieldName> & AltInputTypes

export type TPagedSelect<
  T extends TOption = TOption,
  V extends SelectValue = SelectValue,
  TFieldName extends string = string
> = {
  optionLabel: keyof T | string[]
  optionValue: keyof T
  searchKey?: string
  endPoint?: string
  defaultOptions?: T[]
  params?: Record<string, unknown>
} & GenericSelect<T, V, TFieldName>

export type TAutoComplete<
  Option extends TOption = TOption,
  TFieldName extends string = string,
  TTextArea extends boolean = never
> = {
  textArea?: TTextArea
  rows?: TTextArea extends true ? number : never
  innerRef?: Ref<TTextArea extends true ? Input : TextArea>
  placeholder?: string
  options?: Option[]
  onChange?: (name: TFieldName, value: string, option?: Option) => void
  onSelect?: (value: string, option?: Option) => void
} & Omit<AutoCompleteProps, 'onChange' | 'onSelect' | 'options' | 'innerRef' | 'textArea'> &
  BaseFormTypes<TFieldName> &
  AltInputTypes &
  ScanInputTypes<TFieldName>

export type TDatePicker<TFieldName extends string = string> = {
  showTime?: boolean
  onChange?: (name: TFieldName, value: Moment | null) => void
} & BaseFormTypes<TFieldName> &
  AltInputTypes &
  Omit<DatePickerProps, 'onChange'>

export type TDateRangePicker<TFieldName extends string = string> = {
  onChange?: (name: TFieldName, value: RangeValue<Moment>) => void
} & BaseFormTypes<TFieldName> &
  AltInputTypes &
  Omit<RangePickerProps, 'onChange'>

export type TCheckbox<TFieldName extends string = string> = {
  value: boolean
  onChange?: (name: TFieldName, value: boolean) => void
} & BaseFormTypes<TFieldName> &
  AltInputTypes &
  Omit<CheckboxProps, 'onChange'>

export type TRichText<TFieldName extends string = string> = {
  name: TFieldName
  value: string
  onChange?: (name: TFieldName, value: string) => void
} & BaseFormTypes<TFieldName> &
  AltInputTypes

export type TRadioGroup = {
  value: string
  options: Array<{ label: string; value: string }>
  onChange?: (name: string, value: string) => void
} & BaseFormTypes &
  AltInputTypes &
  Omit<RadioGroupProps, 'onChange'>

export type TDurationPicker = {
  value: number
  onChange?: (name: string, value: number) => void
} & BaseFormTypes &
  AltInputTypes

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
} & BaseFormTypes &
  AltInputTypes

export type TOption = {
  label: string
  value: string
} & FieldValues
