import { ScanOutlined } from '@ant-design/icons'
import loadable from '@loadable/component'
import { AutoComplete as AutoCompleteField, Col, Input, Row } from 'antd'
import TextArea from 'antd/lib/input/TextArea'
import { getIn } from 'formik'
import type { Ref } from 'react'
import React, { memo, useState } from 'react'
import useDebounceEffect from '../../Hooks/useDebounceEffect'
import { arabicRegex } from '../../Util/Options'
import type { TScanModal } from './ScanModal'
import type { TAutoComplete, TOption } from './types'

const AltInput = loadable(() => import(/* webpackPrefetch: true */ '../../Components/AltInput'))
const ScanModal = loadable(() => import(/* webpackPrefetch: true */ './ScanModal')) as <
  TFieldName extends string = string
>(
  props: TScanModal<TFieldName>
) => JSX.Element

function AutoComplete<
  Option extends TOption = TOption,
  TFieldName extends string = string,
  TTextArea extends boolean = never
>({
  innerRef,
  label,
  error,
  required,
  onChange,
  onChangeAlt,
  onScan,
  onSearch,
  onSelect,
  defaultScan,
  textArea,
  rows,
  style,
  value,
  hideLabel,
  altValue,
  altInput,
  options,
  scanInput,
  scanType,
  ...props
}: TAutoComplete<Option, TFieldName, TTextArea>) {
  const [val, setValue] = useDebounceEffect((v: string | undefined) => onSearch?.(v || ''), value, 300)
  const [scanModal, setScanModal] = useState(defaultScan)

  const changedValue =
    getIn(
      options?.find((item) => item.value === val),
      'label',
      ''
    ) || val

  const inputProps = {
    dir: arabicRegex.test(changedValue?.toString()) ? 'rtl' : 'ltr',
    ...(scanInput && {
      suffix: <ScanOutlined onClick={() => setScanModal(true)} />
    })
  }

  return (
    <div className="custom-input-box position-relative">
      {scanModal && (
        <ScanModal
          {...props}
          {...{ label, hideLabel, scanType, onChange: onScan }}
          onClose={() => setScanModal(false)}
        />
      )}
      <Row gutter={[10, 0]} justify="space-between">
        <Col>
          {label && !hideLabel && (
            <label style={{ textAlign: 'left', width: 'fit-content' }}>
              {label} {required && <span className="required">*</span>}
            </label>
          )}
        </Col>
        <Col>
          {altInput && (
            <AltInput {...props} {...{ label, hideLabel, altValue, altInput, onChange: onChangeAlt }} />
          )}
        </Col>
      </Row>
      <AutoCompleteField
        style={{
          width: '100%',
          ...style
        }}
        onSearch={setValue}
        onChange={(v) => {
          if (!v) {
            onChange?.(props.name, v)
          }
        }}
        onSelect={(v) =>
          onSelect?.(
            v,
            options?.find((item) => item.value === v)
          ) ||
          onChange?.(
            props.name,
            v,
            options?.find((item) => item.value === v)
          )
        }
        filterOption={(input, option) =>
          String(option?.label)?.toLowerCase?.().indexOf(input.toLowerCase()) >= 0
        }
        value={changedValue}
        options={options?.map((item) => ({
          label: item.label,
          value: item.value
        }))}
        {...props}>
        {textArea ? (
          <Input.TextArea ref={innerRef as Ref<TextArea>} rows={rows} {...inputProps} />
        ) : (
          <Input ref={innerRef as Ref<Input>} {...inputProps} />
        )}
      </AutoCompleteField>
      {error && (
        <div style={{ fontSize: 10, color: 'red', textAlign: 'right' }}>
          {error.replace(props.name, label || props.placeholder || '')}
        </div>
      )}
    </div>
  )
}

export default memo(AutoComplete)
