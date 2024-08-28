import { EyeInvisibleOutlined, EyeTwoTone, ScanOutlined } from '@ant-design/icons'
import loadable from '@loadable/component'
import { Col, Input as InputField, Row, Select } from 'antd'
import React, { memo, useState } from 'react'
import { ScanModal } from '.'
import useDebounceEffect from '../../Hooks/useDebounceEffect'
import { arabicRegex } from '../../Util/Options'
import type { TInput } from './types'

const { Option } = Select

const AltInput = loadable(() => import(/* webpackPrefetch: true */ '../../Components/AltInput'))

function Input<TFieldName extends string = string>({
  innerRef,
  onChange,
  onChangeAlt,
  onChangeInputFormat,
  onScan,
  label,
  prefix,
  suffix,
  type,
  error,
  required,
  value,
  defaultScan,
  scanInput,
  scanType,
  hideLabel,
  altValue,
  altInput,
  inputFormat,
  inputFormatValue,
  delay = 200,
  ...props
}: TInput<TFieldName>) {
  const [showText, setShowText] = useState(false)
  const [scanModal, setScanModal] = useState(defaultScan)

  const parseValue = (value: string | TNumber): string | TNumber => {
    if (type === 'number') {
      const floatValue = parseFloat(String(value))

      return value !== '' && value !== null && value !== undefined
        ? !Number.isNaN(floatValue)
          ? Number.isInteger(floatValue)
            ? floatValue
            : value
          : value
        : ''
    }

    return value
  }

  const [val, setValue] = useDebounceEffect(
    (v: string | TNumber) => onChange?.(props.name, v),
    parseValue(value),
    delay
  )

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!props.disabled && onChange) {
      if (type === 'number') {
        setValue(parseValue(e.target.value))
      } else {
        setValue(e.target.value)
      }
    }
  }

  if (scanInput) {
    suffix = <ScanOutlined onClick={() => setScanModal(true)} />
  }

  const inputFormatter = inputFormat && (
    <Select
      disabled={props.disabled}
      onSelect={(val) => onChangeInputFormat?.(`${props.name}Format` as const, val)}
      value={inputFormatValue || ''}
      className="select-after"
      showArrow={false}>
      <Option value="%">%</Option>
      <Option value="">№</Option>
    </Select>
  )

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
      <InputField
        ref={innerRef}
        type={type === 'password' ? (showText ? 'text' : 'password') : type || 'text'}
        prefix={prefix && typeof prefix === 'string' ? <i className={prefix} /> : prefix}
        suffix={
          type === 'password' ? (
            showText ? (
              <EyeTwoTone onClick={() => setShowText(false)} />
            ) : (
              <EyeInvisibleOutlined onClick={() => setShowText(true)} />
            )
          ) : (
            suffix
          )
        }
        onChange={handleChange}
        value={val}
        dir={arabicRegex.test(val?.toString()) ? 'rtl' : 'ltr'}
        addonAfter={inputFormatter}
        {...props}
      />

      {error && (
        <div style={{ fontSize: 10, color: 'red', textAlign: 'right' }}>
          {error.replace(props.name, label || props.placeholder || '')}
        </div>
      )}
    </div>
  )
}

const defaultProps = {
  type: 'text'
}

Input.defaultProps = defaultProps

export default memo(Input)
