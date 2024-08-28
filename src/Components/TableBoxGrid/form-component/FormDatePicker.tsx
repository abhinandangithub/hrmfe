import moment from 'moment'
import { Controller } from 'react-hook-form'
import { FormInputProps } from './formInputProps'

export const FormDatePicker = ({ name, control, label, placeholder, type = 'text' }: FormInputProps) => (
  <Controller
    name={name}
    control={control}
    render={({ field: { onChange, value } }) => (
      <div>
        <label className="" htmlFor={name} style={{ fontSize: '' }}>
          {label}
        </label>
        <input
          type={type}
          className="form-control custom-border mt-1"
          id={name}
          onBlur={(elem: React.FocusEvent<HTMLInputElement>) => {
            const value = moment(elem.target.value)

            if (value?.isValid()) {
              onChange?.(name, value)
            }

            // onBlur?.(name, moment(value) || null)
          }}
          //   value={checkMoment(value)}
          onChange={onChange}
          placeholder={placeholder}
          style={{ border: '1px solid #ccc ', color: '#ccc' }}
        />
      </div>
    )}
  />
)
