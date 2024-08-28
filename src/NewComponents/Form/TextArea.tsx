import loadable from '@loadable/component'
import { Col, Input, Row } from 'antd'
import React, { FunctionComponent, memo } from 'react'
import useDebounceEffect from '../../Hooks/useDebounceEffect'
import { arabicRegex } from '../../Util/Options'
import type { InputValueType, TTextArea } from './types'

const AltInput = loadable(() => import(/* webpackPrefetch: true */ '../../Components/AltInput'))

const { TextArea: TextAreaField } = Input

const TextArea: FunctionComponent<TTextArea> = ({
  innerRef,
  rows,
  onChange,
  onChangeAlt,
  label,
  error,
  required,
  value,
  hideLabel,
  altValue,
  altInput,
  ...props
}) => {
  const [val, setValue] = useDebounceEffect((v: InputValueType) => onChange?.(props.name, v), value, 200)

  return (
    <div className="custom-input-box position-relative">
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
      <TextAreaField
        ref={innerRef}
        rows={rows}
        onChange={(e) => {
          if (!props.disabled && onChange) {
            setValue(e.target.value)
          }
        }}
        value={val}
        dir={arabicRegex.test(val?.toString()) ? 'rtl' : 'ltr'}
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

TextArea.defaultProps = {
  rows: 1
}

export default memo(TextArea)
