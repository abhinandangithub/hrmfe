import { DatePicker } from 'antd'
import moment from 'moment'
import React from 'react'
import { Controller } from 'react-hook-form'
import { FormInputProps } from './formInputProps'

const { RangePicker } = DatePicker

export const FormDateRangePicker = ({ name, control, label }: FormInputProps) => (
  <Controller
    name={name}
    control={control}
    render={({ field: { onChange } }) => (
      <div>
        <label className="" htmlFor={name} style={{ fontSize: '' }}>
          {label}
        </label>

        <RangePicker
          style={{
            width: '100%',
            marginTop: '5px'
          }}
          onChange={onChange}
          onBlur={(elem: React.FocusEvent<HTMLInputElement>) => {
            const value = moment(elem.target.value)

            if (value?.isValid()) {
              onChange?.(name, value)
            }

            // onBlur?.(name, moment(value) || null)
          }}
        />
      </div>
    )}
  />
)
