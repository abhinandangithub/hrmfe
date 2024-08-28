import { EyeInvisibleOutlined, EyeTwoTone, ScanOutlined } from '@ant-design/icons'
import loadable from '@loadable/component'
import { Col, Input as InputField, Row, Select } from 'antd'
import React, { memo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { connect } from 'react-redux'
import useDebounceEffect from '../../Hooks/useDebounceEffect'
import { arabicRegex } from '../../Util/Options'
import Translate from '../Translate/Translate'
import type { InputValueType, TInput } from './types'

const { Option } = Select

const AltInput = loadable(() => import(/* webpackPrefetch: true */ '../AltInput'))
const ScanModal = loadable(() => import(/* webpackPrefetch: true */ './ScanModal'))

const Input = ({
  onChange,
  onChangeAlt,
  onChangeInputFormat,
  onBlur,
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
  disable,
  ...props
}: TInput) => {
  const { t } = useTranslation()
  const [showText, setShowText] = useState(false)
  const [scanModal, setScanModal] = useState(defaultScan)

  const parseValue = (value: string | number): string | number => {
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
    (v: InputValueType) => onChange?.(props.name, v),
    parseValue(value as string),
    500
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
      onSelect={(val) => onChangeInputFormat?.(`${props.name}Format`, val)}
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
              <Translate>{t(label)}</Translate> {required && <span className="required">*</span>}
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
        disabled={disable}
        onChange={handleChange}
        onBlur={() => onBlur?.(props.name, val)}
        value={val}
        dir={props.language === 'ar' || arabicRegex.test(val?.toString()) ? 'rtl' : 'ltr'}
        addonAfter={inputFormatter}
        {...props}
      />

      {error && (
        <div style={{ fontSize: 10, color: 'red', textAlign: 'right' }}>
          {error
            .replace(props.name, t(label || props.placeholder || ''))
            .replace('is a required field', t('is a required field'))}
        </div>
      )}
    </div>
  )
}

const defaultProps = {
  type: 'text'
}

Input.defaultProps = defaultProps

function mapStateToProps(state: { users: { language: string } }) {
  return {
    language: state.users.language
  }
}

export default connect(mapStateToProps)(memo(Input))
