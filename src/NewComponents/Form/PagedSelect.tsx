import { Divider, Select as SelectField } from 'antd'
import { SelectValue } from 'antd/lib/select'
import _ from 'lodash'
import type { OptionData } from 'rc-select/lib/interface/index'
import { memo, useEffect, useState } from 'react'
import PaginationBox from '../../Components/Pagination/PaginationBox'
import useDidUpdateEffect from '../../Hooks/useDidUpdateEffect'
import apiClient from '../../Util/apiClient'
import { convertSelectOptions } from '../../Util/Util'
import type { TOption, TPagedSelect } from './types'

const { Option } = SelectField

type TTOption = {
  name: string
  _id: string
} & TOption

function PagedSelect<
  Option extends TTOption,
  TValue extends SelectValue = SelectValue,
  TFieldName extends string = string
>({
  innerRef,
  label,
  error,
  required,
  withNone,
  style,
  onChange,
  onSelect,
  endPoint,
  hideLabel,
  searchKey = '',
  optionLabel = 'name',
  optionValue = '_id',
  defaultOptions = [],
  params = {},
  onChangeAlt,
  ...props
}: TPagedSelect<Option, TValue, TFieldName>) {
  const [options, setOptions] = useState<Option[]>([])
  const [pageData, setPageData] = useState({})
  const [selectedFlag, setSelectedFlag] = useState(true)
  const [loading, setLoading] = useState(false)
  const [search, setSearch] = useState('')

  const onOpen = (isOpen: boolean) => {
    if (isOpen) {
      setLoading(true)
      getOptionData()
    }
  }

  useEffect(() => {
    if (selectedFlag && props.value && !Array.isArray(props.value)) {
      getSelectedOption(props.value, options)
    }
  }, [props.value])

  useDidUpdateEffect(() => {
    if (selectedFlag && props.value && Array.isArray(props.value) && props.value.length) {
      getSelectedOption(props.value, options)
    }
  }, [JSON.stringify(props.value)])

  const getOptionData = (obj = {}) => {
    if (endPoint) {
      const queryParams = { ...obj, ...(params || {}) }
      apiClient
        .get(endPoint, {
          [searchKey || (typeof optionLabel === 'string' ? optionLabel : '')]: search,
          params: queryParams
        })
        .then(({ data }) => {
          if (data && data.result) {
            setOptions([
              ...defaultOptions,
              ...convertSelectOptions(data.result || [], optionLabel, optionValue)
            ])
            setPageData(data.pageData)
          }

          setLoading(false)
        })
    }
  }

  const getSelectedOption = (v: unknown, oldData: OptionData[]) => {
    if (endPoint) {
      apiClient
        .get(endPoint, { params: { [optionValue === 'id' ? '_id' : optionValue]: v } })
        .then(({ data }) => {
          if (data && data.result) {
            const optionData = _.uniqBy<Option>(
              convertSelectOptions([...oldData, ...data.result], optionLabel, optionValue),
              (v) => v[optionValue]
            )
            setOptions(optionData)
            setSelectedFlag(false)
          }
        })
    }
  }

  const onChangePage = (pageData: Record<string, unknown>) => {
    getOptionData(pageData)
    setSelectedFlag(false)
  }

  const onSearch = (v: string) => {
    setSearch(v)
    getOptionData({ [searchKey || (typeof optionLabel === 'string' ? optionLabel : '')]: v })
  }

  return (
    <div>
      {label && !hideLabel && (
        <label>
          {label} {required && <span className="required">*</span>}
        </label>
      )}
      <SelectField
        ref={innerRef}
        showSearch
        style={{
          width: '100%',
          ...style
        }}
        filterOption={false}
        dropdownRender={(menu) => (
          <div>
            {menu}
            <Divider style={{ margin: '4px 0' }} />
            {!loading ? (
              <PaginationBox
                size="small"
                showSizeChanger={false}
                pageData={pageData}
                onChangePage={onChangePage}
              />
            ) : (
              <div style={{ textAlign: 'center', fontWeight: 600 }}>Loading..</div>
            )}
          </div>
        )}
        onDropdownVisibleChange={onOpen}
        onChange={(value) => {
          onChange?.(
            props.name,
            value,
            options?.find((item) => item.value === value)
          )
          setSelectedFlag(false)
        }}
        onSelect={(v) =>
          onSelect?.(
            v,
            options?.find((item) => item.value === v)
          )
        }
        onSearch={onSearch}
        listHeight={320}
        {...props}>
        {withNone && (
          <Option key="" value="">
            {typeof withNone === 'string' ? withNone : 'None'}
          </Option>
        )}
        {options.map((data) => (
          <Option key={data.value} value={data.value}>
            {data?.label}
          </Option>
        ))}
      </SelectField>
      {error && (
        <div style={{ fontSize: 10, color: 'red', textAlign: 'right' }}>
          {error.replace(props.name, label || props.placeholder || '')}
        </div>
      )}
    </div>
  )
}

export default memo(PagedSelect)
