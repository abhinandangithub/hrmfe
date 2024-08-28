import { Controller } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { FormInputProps } from './formInputProps'

export const FormInputText = ({ name, control, label, placeholder, type = 'text', pattern }: FormInputProps) => {
  const { t } = useTranslation()

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => (
        <div>
          <label className="" htmlFor={name} style={{ fontSize: '' }}>
            {t(label || '')}
          </label>
          <input
            type={type}
            className="form-control custom-border mt-1"
            id={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            pattern={pattern}
            style={{ border: '1px solid #ccc ' }}
          />
        </div>
      )}
    />
  )
}

