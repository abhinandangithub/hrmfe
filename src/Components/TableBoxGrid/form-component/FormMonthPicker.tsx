import { DatePicker as DatePickerField } from 'antd'
import { Controller } from 'react-hook-form'


export const FormMonthPicker = ({ name, control, label, }: any) => (
    <Controller
        name={name}
        control={control}
        render={({ field: { onChange } }) => (
            <div>
                <label className="" htmlFor={name} style={{ fontSize: '' }}>
                    {label}
                </label>

                <DatePickerField
                    name={name}
                    picker='month'
                    style={{
                        width: '100%',

                    }}
                    onChange={onChange}
                />


            </div>
        )}
    />
)
