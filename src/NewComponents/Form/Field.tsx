/* eslint-disable @typescript-eslint/no-explicit-any */
import { SelectValue } from 'antd/lib/select'
import React, { memo } from 'react'
import { Controller, FieldValues, get, Path, useFormContext, useWatch } from 'react-hook-form'
import { TAltInput } from '../../Components/Formik/types'
import { FieldLoader } from '../../Components/LoaderBox/Loader'
import type {
  AltInputTypes,
  TAttachment,
  TAutoComplete,
  TCheckbox,
  TDatePicker,
  TDateRangePicker,
  TDurationPicker,
  TInput,
  TInputChip,
  TOption,
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
const AltInput = FieldLoader(() => import(/* webpackPrefetch: true */ '../../Components/AltInput'))

type FieldConfig = {
  as?: React.ForwardRefExoticComponent<any>
  name: string
  value?: any
  innerRef?: (instance: any) => void
} & any

function FormField({ name, children, as, ...props }: FieldConfig) {
  return React.createElement(as, { name, ...props }, children)
}

type TFieldAs<Option extends TOption, Value extends SelectValue, TFieldName extends string> =
  | ({
      as: 'auto-complete'
    } & Partial<TAutoComplete<Option, TFieldName, boolean>>)
  | ({
      as: 'checkbox'
    } & Partial<TCheckbox<TFieldName>>)
  | ({
      as: 'radio-group'
    } & Partial<TRadioGroup>)
  | ({
      as: 'date'
    } & Partial<TDatePicker<TFieldName>>)
  | ({
      as: 'date-range'
    } & Partial<TDateRangePicker<TFieldName>>)
  | ({
      as: 'textarea'
    } & Partial<TTextArea>)
  | ({
      as: 'select'
    } & Partial<TSelect<Option, Value, TFieldName>>)
  | ({
      as: 'paged-select'
    } & Partial<TPagedSelect<Option, Value, TFieldName>>)
  | ({
      as: 'input-chip'
    } & Partial<TInputChip>)
  | ({
      as: 'rich-text'
    } & Partial<TRichText<TFieldName>>)
  | ({
      as: 'duration'
    } & Partial<TDurationPicker>)
  | ({
      as: 'attachment'
    } & Partial<TAttachment>)
  | ({
      as: 'alt'
    } & Partial<TAltInput>)
  | ({
      as?: 'input'
    } & Partial<TInput<TFieldName>>)

export type TField<
  TFieldValues extends FieldValues = FieldValues,
  TFieldName extends Path<TFieldValues> = Path<TFieldValues>,
  Option extends TOption = TOption,
  Value extends SelectValue = SelectValue
> = {
  name: TFieldName
} & TFieldAs<Option, Value, TFieldName>

function Field<
  TFieldValues extends FieldValues = FieldValues,
  TFieldName extends Path<TFieldValues> = Path<TFieldValues>,
  Option extends TOption = TOption,
  Value extends SelectValue = SelectValue
>({ name, as = 'input', ...props }: TField<TFieldValues, TFieldName, Option, Value>) {
  const {
    control,
    setValue,
    formState: { errors }
  } = useFormContext()
  const inputFormatValue = useWatch({ name: `${name}Format`, disabled: as !== 'input' })
  const altValue = useWatch({
    name: `${name}Alt`,
    disabled: !['alt', 'auto-complete', 'textarea', 'input', 'select', 'date'].includes(as)
  })
  const [value, errorFields] = useWatch({
    name: [name, '__errorFields']
  })

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { ref, onChange, ...field } }) => (
        <FormField
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
              case 'alt':
                return AltInput
              default:
                return Input
            }
          })()}
          {...field}
          required={errorFields?.includes(field.name)}
          innerRef={ref}
          error={get(errors, `${name}.message`)?.replace(/\[(\d+)\]\./g, '.$1.')}
          {...(['auto-complete', 'input'].includes(as) && {
            onScan: setValue
          })}
          {...(as === 'input' &&
            (props as TInput<TFieldName>).inputFormat && {
              inputFormatValue,
              onChangeInputFormat: setValue
            })}
          {...(['auto-complete', 'textarea', 'input', 'select', 'date'].includes(as) &&
            (props as AltInputTypes).altInput && {
              altValue,
              onChangeAlt: setValue
            })}
          {...(as === 'alt' && {
            altValue
          })}
          onChange={(n: string, v: unknown) => onChange(v)}
          value={value}
          {...props}
        />
      )}
    />
  )
}

export default memo(Field)
