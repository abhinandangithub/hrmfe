import loadable from '@loadable/component'
import { SelectValue } from 'antd/lib/select'
import { ArrayPath, FieldValues, Path } from 'react-hook-form'
import { FieldLoader } from '../../Components/LoaderBox/Loader'
import { TField } from './Field'
import { TFieldArray } from './FieldArray'
import Form from './Form'
import type { FormProviderBag, FormProviderProps } from './FormProvider'
import FormProvider from './FormProvider'
import { TScanModal } from './ScanModal'
import { TCheckbox, TOption } from './types'
import withForm from './withForm'

const Field = FieldLoader(() => import(/* webpackPrefetch: true */ './Field')) as <
  TFieldValues extends FieldValues = FieldValues,
  TFieldName extends Path<TFieldValues> = Path<TFieldValues>,
  Option extends TOption = TOption,
  Value extends SelectValue = SelectValue
>(
  props: TField<TFieldValues, TFieldName, Option, Value>
) => JSX.Element

const FieldArray = loadable(() => import(/* webpackPrefetch: true */ './FieldArray')) as <
  TFieldValues extends FieldValues = FieldValues,
  TFieldArrayName extends ArrayPath<TFieldValues> = ArrayPath<TFieldValues>,
  TAdditionalValues extends FieldValues = FieldValues
>(
  props: TFieldArray<TFieldValues, TFieldArrayName, TAdditionalValues>
) => JSX.Element

const Attachment = FieldLoader(() => import(/* webpackPrefetch: true */ './Attachment'))
const AutoComplete = FieldLoader(() => import(/* webpackPrefetch: true */ './AutoComplete'))
const Checkbox = FieldLoader(() => import(/* webpackPrefetch: true */ './Checkbox')) as <
  TFieldName extends string = string
>(
  props: TCheckbox<TFieldName>
) => JSX.Element
const DatePicker = FieldLoader(() => import(/* webpackPrefetch: true */ './DatePicker'))
const DateRangePicker = FieldLoader(() => import(/* webpackPrefetch: true */ './DateRangePicker'))
const DurationPicker = FieldLoader(() => import(/* webpackPrefetch: true */ './DurationPicker'))
const Input = FieldLoader(() => import(/* webpackPrefetch: true */ './Input'))
const InputChip = FieldLoader(() => import(/* webpackPrefetch: true */ './InputChip'))
const PagedSelect = FieldLoader(() => import(/* webpackPrefetch: true */ './PagedSelect'))
const RadioGroup = FieldLoader(() => import(/* webpackPrefetch: true */ './RadioGroup'))
const RichText = FieldLoader(() => import(/* webpackPrefetch: true */ './RichText'))
const Select = FieldLoader(() => import(/* webpackPrefetch: true */ './Select'))
const TextArea = FieldLoader(() => import(/* webpackPrefetch: true */ './TextArea'))
const ScanModal = FieldLoader(() => import(/* webpackPrefetch: true */ './ScanModal')) as <
  TFieldName extends string = string
>(
  props: TScanModal<TFieldName>
) => JSX.Element
const ErrorMessage = loadable(() => import(/* webpackPrefetch: true */ './ErrorMessage'))

export {
  Attachment,
  AutoComplete,
  Checkbox,
  DatePicker,
  DateRangePicker,
  DurationPicker,
  Field,
  FieldArray,
  Form,
  FormProvider,
  Input,
  InputChip,
  PagedSelect,
  RadioGroup,
  RichText,
  ScanModal,
  Select,
  TextArea,
  withForm,
  ErrorMessage
}
export type { FormProviderBag, FormProviderProps }
