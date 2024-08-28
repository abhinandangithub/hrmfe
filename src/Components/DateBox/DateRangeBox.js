import { DatePicker } from 'antd'
import moment from 'moment'
import React, { Component } from 'react'

const { RangePicker } = DatePicker

class DateRangeBox extends Component {
  constructor(props) {
    super(props)
    this.error = props.optional ? false : `${props.label} required`
  }

  componentDidMount() {
    this.props.refs?.(this)

    if (this.props.value && this.props.value !== '') {
      this.error = false
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.isSubmit === false && this.props.isSubmit === true) {
      this.error = nextProps.optional ? false : `${nextProps.label} required`
    }

    if (nextProps.value && nextProps.value !== '' && this.error) {
      this.error = false
    }
  }

  componentWillUnmount() {
    this.props.refs?.(null)
  }

  onChange = (value) => {
    const { id, label, optional, onChangeText } = this.props

    if (value && value !== '') {
      onChangeText(value, id)

      if (this.error) {
        this.error = false
      }
    } else {
      if (!optional) {
        this.error = `${label} required`
      }

      onChangeText(value, id)
    }
  }

  render() {
    const { label, value } = this.props
    const style = { width: '100%' }
    Object.assign(style, this.props.style || {})

    return (
      <div>
        {label && (
          <label>
            {label} <span className="required">{this.props.optional ? '' : '*'}</span>
          </label>
        )}
        <RangePicker
          value={value && value !== '' ? value.map((val) => moment(val)) : undefined}
          selected={value && value !== '' ? value.map((val) => moment(val)) : undefined}
          onChange={this.onChange}
          disabled={this.props.disabled}
        />
        {this.error && this.props.isSubmit && (
          <div style={{ fontSize: 10, color: 'red', textAlign: 'right' }}>{this.error}</div>
        )}
      </div>
    )
  }
}

export default DateRangeBox
