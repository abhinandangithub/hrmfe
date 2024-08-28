import { DatePicker } from 'antd'
import moment from 'moment'
import React, { PureComponent } from 'react'

class SelectBox extends PureComponent {
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

    if ((nextProps.value && nextProps.value !== '' && this.error) || nextProps.value === 0) {
      this.validateInput(nextProps.value, true)
    }
  }

  componentWillUnmount() {
    this.props.refs?.(null)
  }

  validateInput = (value, setFalse) => {
    const { fromDate, checkValidate, toDate } = this.props

    switch (checkValidate) {
      case 'fromDate':
        this.error =
          moment(value) < moment(new Date(fromDate)) ? 'To date should grater than from date' : false
        break
      case 'toDate':
        this.error = moment(value) > moment(new Date(toDate)) ? 'From date should grater than to date' : false
        break

      default:
        this.error = setFalse ? false : this.error
        break
    }
  }

  onChange = (value) => {
    const { id, label, optional, onChangeText } = this.props

    if (value && value !== '') {
      onChangeText(moment(value).toISOString(), id)

      if (this.error) {
        this.error = false
      }

      this.validateInput(value)
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
      <div className="custom-date-box">
        {label && (
          <label>
            {label} <span className="required">{this.props.optional ? '' : '*'}</span>
          </label>
        )}
        <DatePicker
          style={{ width: '100%' }}
          value={value && value !== '' && value !== '0000-00-00' ? moment(value) : undefined}
          selected={value && value !== '' ? moment(value) : undefined}
          placeholder={this.props.placeholder || ''}
          onChange={this.onChange}
          disabled={this.props.disabled}
          picker={this.props.picker}
        />
        {this.error && this.props.isSubmit && (
          <div style={{ fontSize: 10, color: 'red', textAlign: 'right' }}>{this.error}</div>
        )}
      </div>
    )
  }
}

export default SelectBox
