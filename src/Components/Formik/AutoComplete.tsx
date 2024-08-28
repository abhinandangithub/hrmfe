import { ScanOutlined } from '@ant-design/icons'
import loadable from '@loadable/component'
import { AutoComplete as AutoCompleteField, Col, Input, Row, Space } from 'antd'
import { getIn } from 'formik'
import { memo, useState } from 'react'
import useDebounceEffect from '../../Hooks/useDebounceEffect'
import useDidUpdateEffect from '../../Hooks/useDidUpdateEffect'
import apiClient from '../../Util/apiClient'
import { arabicRegex } from '../../Util/Options'
import { convertSelectOptions, removeEmptyKeys } from '../../Util/Util'
import type { TAutoComplete } from './types'

const AltInput = loadable(() => import(/* webpackPrefetch: true */ '../AltInput'))
const ScanModal = loadable(() => import(/* webpackPrefetch: true */ './ScanModal'))

const AutoComplete = ({
  label,
  error,
  required,
  onChange,
  onChangeAlt,
  onScan,
  onSearch,
  onBlur,
  onSelect,
  defaultScan,
  textArea,
  rows,
  style,
  value,
  hideLabel,
  altValue,
  altInput,
  endPoint,
  params,
  optionLabel = 'name',
  optionValue = 'id',
  queryName,
  options,
  scanInput,
  scanType,
  rightContent,
  ...props
}: TAutoComplete) => {
  const [val, setValue] = useDebounceEffect((v: string | undefined) => onSearch?.(v || ''), value, 100)
  const [internalOptions, setInternalOptions] = useState([])
  const [scanModal, setScanModal] = useState(defaultScan)

  useDidUpdateEffect(() => {
    if (endPoint) {
      onSearchFilter(val || '')
    }
  }, [val, params])

  const onSearchFilter = (v: string) => {
    if (v) {
      const updatedParams = removeEmptyKeys(params || {})
      const queryParams = { ...updatedParams, [queryName || props.name]: v }
      apiClient.get(endPoint || '', { params: queryParams }).then(({ data }) => {
        if (data && data.result) {
          setInternalOptions(convertSelectOptions(data.result || [], optionLabel, optionValue))
        }
      })
    } else {
      setInternalOptions([])
    }
  }

  options = options || internalOptions

  const changedValue =
    getIn(
      options?.find((item) => item.value === val),
      'label',
      ''
    ) || val

  const inputProps = {
    dir: arabicRegex.test(changedValue?.toString()) ? 'rtl' : 'ltr',
    ...(scanInput && {
      suffix: <ScanOutlined onClick={() => setScanModal(true)} />
    })
  }

  return (
    <div className="custom-input-box position-relative">
      {scanModal && (
        <ScanModal
          {...props}
          {...{ label, hideLabel, scanType, onChange: onScan }}
          onClose={() => setScanModal(false)}
        />
      )}
      <Row gutter={[10, 0]} justify="space-between">
        <Col>
          {label && !hideLabel && (
            <label style={{ textAlign: 'left', width: 'fit-content' }}>
              {label} {required && <span className="required">*</span>}
            </label>
          )}
        </Col>
        <Col>
          <Space>
            {rightContent}
            {altInput && (
              <AltInput {...props} {...{ label, hideLabel, altValue, altInput, onChange: onChangeAlt }} />
            )}
          </Space>
        </Col>
      </Row>
      <AutoCompleteField
        style={{
          width: '100%',
          ...style
        }}
        onSearch={setValue}
        onChange={(v) => {
          if (!v) {
            onChange?.(props.name, v)
          }
        }}
        onSelect={(v) =>
          onSelect?.(
            v,
            options?.find((item) => item.value === v)
          ) ||
          onChange?.(
            props.name,
            v,
            options?.find((item) => item.value === v)
          )
        }
        filterOption={(input, option) =>
          String(option?.label)?.toLowerCase?.().indexOf(input.toLowerCase()) >= 0
        }
        onBlur={() => onBlur?.(props.name, val || '')}
        value={changedValue}
        options={options.map((item) => ({
          label: item.label,
          value: item.value
        }))}
        {...props}>
        {textArea ? <Input.TextArea rows={rows} {...inputProps} /> : <Input {...inputProps} />}
      </AutoCompleteField>
      {error && (
        <div style={{ fontSize: 10, color: 'red', textAlign: 'right' }}>
          {error.replace(props.name, label || props.placeholder || '')}
        </div>
      )}
    </div>
  )
}

export default memo(AutoComplete)
