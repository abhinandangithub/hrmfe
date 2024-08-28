import {
    FormControl,
    FormControlLabel,
    FormLabel,
    Radio,
    RadioGroup,
} from '@mui/material'
import React from 'react'
import { Controller } from 'react-hook-form'
import { FormInputProps } from './formInputProps'


export const FormInputRadio: React.FC<FormInputProps> = ({
    name,
    control,
    label,
    radioOptions = []
}) => {
    const generateRadioOptions = () => radioOptions?.map((singleOption, index) => (
        <FormControlLabel
            key={index}
            value={singleOption.value}
            label={singleOption.label}
            control={<Radio />}
        />
    ))
    return (
        <FormControl component="fieldset">
            <FormLabel component="legend">{label}</FormLabel>
            <Controller
                name={name}
                control={control}
                render={({
                    field: { onChange, value },
                }) => (
                    <RadioGroup value={value} onChange={onChange}>
                        {generateRadioOptions()}
                    </RadioGroup>
                )}
            />
        </FormControl>
    )
}