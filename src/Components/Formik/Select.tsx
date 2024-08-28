import loadable from '@loadable/component'
import { Col, Row, Select as SelectField } from 'antd'
import { memo } from 'react'
import { useTranslation } from 'react-i18next'
import type { TSelect } from './types'

const AltInput = loadable(() => import(/* webpackPrefetch: true */ '../AltInput'))

const { Option } = SelectField

function Select({
  label,
  options = [],
  error,
  required,
  withNone,
  style,
  onChange,
  onChangeAlt,
  onBlur,
  onSelect,
  hideLabel,
  altValue,
  altInput,
  ...props
}: TSelect) {
  const { t } = useTranslation()
  return (
    <div className="position-relative">
      <Row gutter={[10, 0]} justify="space-between">
        <Col>
          {label && !hideLabel && (
            <label style={{ textAlign: 'left', width: 'fit-content' }}>
              {t(label)} {required && <span className="required">*</span>}
            </label>
          )}
        </Col>
        <Col>
          {altInput && (
            <AltInput {...props} {...{ label, hideLabel, altValue, altInput, onChange: onChangeAlt }} />
          )}
        </Col>
      </Row>
      <SelectField
        showSearch
        style={{
          width: '100%',
          ...style
        }}
        filterOption={(input, option) =>
          String(option?.children)?.toLowerCase?.().indexOf(input.toLowerCase()) >= 0
        }
        onChange={(value = '') =>
          onChange?.(
            props.name,
            value,
            options?.find((item) => item.value === value)
          )
        }
        onBlur={() => onBlur?.(props.name, props.value || '')}
        onSelect={(v) =>
          onSelect?.(
            v,
            options?.find((item) => item.value === v)
          )
        }
        {...props}>
        {withNone && (
          <Option key="" value="">
            None
          </Option>
        )}
        {options
          .filter((x) => x?.label)
          .map((data) => (
            <Option key={data.value} value={data.value}>
              {data.label}
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

export default memo(Select)
