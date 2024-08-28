import { Checkbox as AntdCheckbox } from 'antd'
import React, { memo } from 'react'
import type { TCheckbox } from './types'

const Checkbox = ({ value, label, onChange, error, required, hideLabel, ...props }: TCheckbox) => (
  <div>
    <AntdCheckbox checked={value} onChange={(e) => onChange?.(props.name, e.target.checked)} {...props}>
      {label && !hideLabel && (
        <>
          {label} {required && <span className="required">*</span>}
        </>
      )}
    </AntdCheckbox>
    {error && (
      <div style={{ fontSize: 10, color: 'red', textAlign: 'right' }}>
        {error.replace(props.name, label || '')}
      </div>
    )}
  </div>
)

export default memo(Checkbox)
