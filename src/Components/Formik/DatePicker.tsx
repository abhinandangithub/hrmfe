import loadable from '@loadable/component'
import { Col, DatePicker as DatePickerField, Row } from 'antd'
import moment from 'moment'
import React, { memo } from 'react'
import { useTranslation } from 'react-i18next'
import { checkMoment } from '../../Util/Util'
import type { TDatePicker } from './types'

const AltInput = loadable(() => import(/* webpackPrefetch: true */ '../AltInput'))

function DatePicker({
  label,
  error,
  required,
  onChange,
  onChangeAlt,
  onBlur,
  value,
  style,
  hideLabel,
  altValue,
  altInput,
  ...props
}: TDatePicker) {
  const { t } = useTranslation()
  return (
    <div className="position-relative">
      <Row gutter={[10, 0]} justify="space-between">
        <Col>
          {label && !hideLabel && (
            <label style={{ textAlign: 'left', width: 'fit-content' }}>
              {t(label)} {required && <span className="required">*</span>}
            </label>
          )}
        </Col>
        <Col>
          {altInput && (
            <AltInput {...props} {...{ label, hideLabel, altValue, altInput, onChange: onChangeAlt }} />
          )}
        </Col>
      </Row>
      <DatePickerField
        style={{
          width: '100%',
          ...style
        }}
        onChange={(val) => onChange?.(props.name, val)}
        onBlur={(elem: React.FocusEvent<HTMLInputElement>) => {
          if (props.showTime) {
            const value = moment(elem.target.value)

            if (value?.isValid()) {
              onChange?.(props.name, value)
            }
          }

          onBlur?.(props.name, moment(value) || null)
        }}
        value={checkMoment(value)}
        {...props}
      />
      {error && (
        <div style={{ fontSize: 10, color: 'red', textAlign: 'right' }}>
          {error.replace(props.name, label || '')}
        </div>
      )}
    </div>
  )
}

export default memo(DatePicker)
