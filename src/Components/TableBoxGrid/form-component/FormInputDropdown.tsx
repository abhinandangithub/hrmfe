import React, { useEffect, useState } from 'react'
import { Controller } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import apiClient from '../../../Util/apiClient'
import { FormInputProps } from './formInputProps'

export const FormInputDropdown: React.FC<FormInputProps> = ({ name, control, label, select }) => {
  const [selectOption, setSelectOption] = useState<any[]>([])
  const { t } = useTranslation()

  useEffect(() => {
    if (select) {
      if (select.type === 'API') {
        const end: any = select.endpoint
        apiClient.get(end).then(({ data }: any) => {
          if (data?.result?.length) {
            setSelectOption([])
            const tempArr = []
            for (const obj of data.result) {
              const objVal = {
                label: '',
                value: ''
              }

              if (select.keys?.object) {

                const parentObj: any = select.keys?.object
                const parent1Child = obj[parentObj]
                const chiledKey: any = select.keys?.key
                const dummyObj: any = parent1Child[chiledKey]
                // const key: any = obj[dummyObj]

                const dummyval: any = select.keys?.value
                const lab: any = parent1Child[dummyval]
                objVal.label = lab
                objVal.value = dummyObj
              } else {
                const dummyObj: any = select.keys?.key
                const key: any = obj[dummyObj]

                const dummyval: any = select.keys?.value
                const lab: any = obj[dummyval]
                objVal.label = lab
                objVal.value = key
              }
              tempArr.push(objVal)
            }
            setSelectOption(tempArr)

          }
        })
      }
      if (select.type === 'LOCAL') {
        setSelectOption(select?.options ? select.options : [])
      }
    }
  }, [])

  const generateSingleOptions = () =>
    selectOption.map((option: any) => (
      <option key={option.value} value={option.value}>
        {' '}
        {option.label}
      </option>
    ))
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => (
        <div>
          <label className="" htmlFor={name} style={{ fontSize: '' }}>
            {t(label || '')}
          </label>
          <select
            style={{ border: '1px solid #ccc ' }}
            className="form-control custom-border mt-1"
            id={name}
            value={value}
            onChange={onChange}>
            <option value=""> Please choose a option</option>
            {generateSingleOptions()}
          </select>
        </div>
      )}
    />
  )
}
