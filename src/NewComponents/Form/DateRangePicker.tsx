import { DatePicker } from 'antd'
import React, { memo } from 'react'
import { checkMoment } from '../../Util/Util'
import type { TDateRangePicker } from './types'

const { RangePicker } = DatePicker

function DateRangePicker<TFieldName extends string = string>({
  label,
  error,
  required,
  onChange,
  value,
  style,
  hideLabel,
  ...props
}: TDateRangePicker<TFieldName>) {
  return (
    <div>
      {label && !hideLabel && (
        <label>
          {label} {required && <span className="required">*</span>}
        </label>
      )}
      <RangePicker
        style={{
          width: '100%',
          ...style
        }}
        onChange={(val) => onChange?.(props.name, val)}
        value={value ? [checkMoment(value[0]), checkMoment(value[1])] : null}
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

export default memo(DateRangePicker)
