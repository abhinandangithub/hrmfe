import loadable from '@loadable/component'
import { Col, Row, TimePicker as TimePickerField } from 'antd'
import { memo } from 'react'
import { useTranslation } from 'react-i18next'
import type { TTimePicker } from './types'

const AltInput = loadable(() => import(/* webpackPrefetch: true */ '../AltInput'))

function TimePicker({
    label,
    error,
    required,
    onChange,
    onChangeAlt,
    onBlur,
    value,
    style,
    hideLabel,
    altValue,
    altInput,
    mode,
    ...props
}: TTimePicker) {
    const { t } = useTranslation()
    const disabledHours = () => {
        const hours = []
        for (let i = 0; i <= 24; i++) {
            hours.push(i)
        }
        return hours
    }
    const disabledSeconds = () => {
        const seconds = []
        for (let i = 0; i <= 60; i++) {
            seconds.push(i)
        }
        return seconds
    }

    return (
        <div className="position-relative">
            <Row gutter={[10, 0]} justify="space-between">
                <Col>
                    {label && !hideLabel && (
                        <label style={{ textAlign: 'left', width: 'fit-content', fontWeight: 'bold' }}>
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
            <TimePickerField
                value={value}
                onChange={(val) => onChange?.(props.name, val)}
                disabledHours={disabledHours}
                disabledSeconds={disabledSeconds}
            />
            {error && (
                <div style={{ fontSize: 10, color: 'red', textAlign: 'right' }}>
                    {error.replace(props.name, label || '')}
                </div>
            )}
        </div>
    )
}

export default memo(TimePicker)
