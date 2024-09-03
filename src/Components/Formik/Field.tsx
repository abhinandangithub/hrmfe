import {
  FastField as FormikFastField,
  Field as FormikField,
  FormikState,
  FormikValues,
  getIn,
  useFormikContext
} from 'formik'
import { memo } from 'react'
import { FieldLoader } from '../LoaderBox/Loader'
import type {
  TAttachment,
  TAutoComplete,
  TCheckbox,
  TDatePicker,
  TDateRangePicker,
  TDurationPicker,
  TInput,
  TInputChip,
  TPagedSelect,
  TRadioGroup,
  TRichText,
  TSelect,
  TTextArea
} from './types'

const Attachment = FieldLoader(() => import(/* webpackPrefetch: true */ './Attachment'))
const AutoComplete = FieldLoader(() => import(/* webpackPrefetch: true */ './AutoComplete'))
const Checkbox = FieldLoader(() => import(/* webpackPrefetch: true */ './Checkbox'))
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

type TFieldAs =
  | ({
    as: 'auto-complete'
  } & Partial<TAutoComplete>)
  | ({
    as: 'checkbox'
  } & Partial<TCheckbox>)
  | ({
    as: 'radio-group'
  } & Partial<TRadioGroup>)
  | ({
    as: 'date'
  } & Partial<TDatePicker>)
  | ({
    as: 'date-range'
  } & Partial<TDateRangePicker>)
  | ({
    as: 'textarea'
  } & Partial<TTextArea>)
  | ({
    as: 'select'
  } & Partial<TSelect>)
  | ({
    as: 'paged-select'
  } & Partial<TPagedSelect>)
  | ({
    as: 'input-chip'
  } & Partial<TInputChip>)
  | ({
    as: 'rich-text'
  } & Partial<TRichText>)
  | ({
    as: 'duration'
  } & Partial<TDurationPicker>)
  | ({
    as: 'attachment'
  } & Partial<TAttachment>)
  | ({
    as?: 'input'
  } & Partial<TInput>)

type TField = {
  step?: any
  mode?: any
  disable?: any
  name: string
  fast?: boolean
} & TFieldAs

function Field({ name, disable, mode, fast, as = 'input', ...props }: TField) {
  const { values, errors, touched, setFieldValue } = useFormikContext<FormikState<FormikValues>>()

  let Component

  if (fast) {
    Component = FormikFastField
  } else {
    Component = FormikField
  }

  return (
    <Component
      as={(() => {
        switch (as) {
          case 'auto-complete':
            return AutoComplete
          case 'textarea':
            return TextArea
          case 'select':
            return Select
          case 'paged-select':
            return PagedSelect
          case 'checkbox':
            return Checkbox
          case 'radio-group':
            return RadioGroup
          case 'date':
            return DatePicker
          case 'date-range':
            return DateRangePicker
          case 'input-chip':
            return InputChip
          case 'rich-text':
            return RichText
          case 'duration':
            return DurationPicker
          case 'attachment':
            return Attachment
          default:
            return Input
        }
      })()}
      name={name}
      mode={mode}
      disable={disable}
      error={getIn(touched, name) && getIn(errors, name)}
      value={getIn(values, name)}
      onChange={setFieldValue}
      required={Boolean(getIn(errors, name))}
      {...(['auto-complete', 'input'].includes(as) && {
        onScan: setFieldValue
      })}
      {...(as === 'input' && {
        inputFormatValue: getIn(values, `${name}Format`),
        onChangeInputFormat: setFieldValue
      })}
      {...(['auto-complete', 'textarea', 'input', 'select', 'date'].includes(as) && {
        altValue: getIn(values, `${name}Alt`),
        onChangeAlt: setFieldValue
      })}
      {...props}
    />
  )
}

export default memo(Field)
