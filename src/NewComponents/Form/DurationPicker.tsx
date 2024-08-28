import { Col, Input as InputField, Row } from 'antd'
import moment from 'moment'
import React, { Fragment, memo } from 'react'
import type { TDurationPicker } from './types'

type DurationType = 'days' | 'hours' | 'minutes' | 'seconds'

const durationOptions: Array<DurationType> = ['days', 'hours', 'minutes', 'seconds']

function DurationPicker({ onChange, label, hideLabel, error, required, name, value }: TDurationPicker) {
  const durationMoment = moment.duration(value, 'seconds')

  const duration = {
    days: Math.floor(durationMoment.asDays()),
    hours: Math.floor(durationMoment.asHours() % 24),
    minutes: Math.floor(durationMoment.asMinutes() % 60),
    seconds: Math.floor(durationMoment.asSeconds() % 60)
  }

  const handleChange = (n: DurationType, v: string) => {
    onChange?.(
      name,
      moment
        .duration()
        .add({ ...duration, [n]: parseInt(v, 10) || 0 })
        .asSeconds()
    )
  }

  return (
    <div className="position-relative">
      {label && !hideLabel && (
        <label style={{ textAlign: 'left', width: 'fit-content' }}>
          {label} {required && <span className="required">*</span>}
        </label>
      )}

      <Row gutter={[10, 0]}>
        {durationOptions.map((item, i) => (
          <Fragment key={i}>
            <Col xs={5}>
              <InputField
                type="number"
                value={duration[item] || ''}
                onChange={(e) => handleChange(item, e.target.value)}
              />
            </Col>
            <div className="d-flex align-items-center">{i === 0 ? '-' : i < 3 && ':'}</div>
          </Fragment>
        ))}
      </Row>

      {error && (
        <div style={{ fontSize: 10, color: 'red', textAlign: 'right' }}>
          {error.replace(name, label || '')}
        </div>
      )}
    </div>
  )
}

export default memo(DurationPicker)
