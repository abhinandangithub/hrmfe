import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons'
import { InputNumber } from 'antd'
import React, { Component } from 'react'
import { emailValidate, numberValidate, urlValidate } from '../../Util/Util'

class InputNumberBox extends Component {
  constructor(props) {
    super(props)
    this.error = props.optional ? false : `${props.label || props.placeholder} required`
    this.state = {
      showPassword: false
    }
  }

  componentDidMount() {
    this.props.refs?.(this)

    if (this.props.value && this.props.value !== '') {
      this.error = false
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.isSubmit === false && this.props.isSubmit === true) {
      this.error = nextProps.optional ? false : `${nextProps.label || nextProps.placeholder} required`
    }

    if (nextProps.value && nextProps.value !== '' && this.error) {
      this.validateInput(nextProps.value, true)
    }
  }

  componentWillUnmount() {
    this.props.refs?.(null)
  }

  validateInput = (value, setFalse) => {
    const { inputType, label, placeholder } = this.props

    switch (inputType) {
      case 'email':
        this.error = emailValidate(value) ? `Invalid ${label || placeholder}` : false
        break
      case 'number':
        this.error = numberValidate(value) ? `Invalid ${label || placeholder}` : false
        break
      case 'url':
        this.error = urlValidate(value) ? `Invalid ${label || placeholder}` : false
        break
      case 'password':
        this.error =
          (value.length <= 4 && `Weak ${label || placeholder}`) ||
          (value.length >= 5 && value.length <= 7 && `Medium ${label || placeholder}`) ||
          false
        break
      case 'confirmPassword':
        this.error =
          this.props.password && this.props.password !== value
            ? `${label || placeholder} not matching with password`
            : false
        break
      default:
        this.error = setFalse ? false : this.error
        break
    }
  }

  onChange = (value) => {
    const { id, label, placeholder, optional, onChangeText } = this.props

    if (value && value !== '') {
      onChangeText(value, id)

      if (this.error) {
        this.error = false
      }

      this.validateInput(value)
    } else {
      if (!optional) {
        this.error = `${label || placeholder} required`
      }

      onChangeText(value, id)
    }
  }

  onBlur = (value) => {
    const { id, label, placeholder, optional, onBlur } = this.props

    if (onBlur) {
      if (value && value !== '') {
        onBlur(value, id)

        if (this.error) {
          this.error = false
        }

        this.validateInput(value)
      } else {
        if (!optional) {
          this.error = `${label || placeholder} required`
        }

        onBlur(value, id)
      }
    }
  }

  render() {
    const { label } = this.props

    return (
      <div className="custom-input-box">
        {label && (
          <label style={{ textAlign: 'left' }}>
            {label} <span className="required">{this.props.optional ? '' : '*'}</span>
          </label>
        )}
        <InputNumber
          title={this.props.title}
          id={this.props.id}
          name={this.props.name}
          placeholder={this.props.placeholder || ''}
          value={this.props.value ? parseFloat(this.props.value) : 0}
          className={this.props.className}
          onChange={this.onChange}
          onBlur={this.onBlur}
          disabled={this.props.disabled}
          // formatter={this.props.formatter ? (val) => val.replace(this.props.formatter, '') : null}
          formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
          // parser={value => value.replace(/\$\s?|(,*)/g, '')}
          type="number"
          prefix={this.props.prefix ? <i className={this.props.prefix} /> : null}
          suffix={
            this.props.type === 'password' ? (
              this.state.showPassword ? (
                <EyeTwoTone onClick={() => this.setState({ showPassword: !this.state.showPassword })} />
              ) : (
                <EyeInvisibleOutlined
                  onClick={() => this.setState({ showPassword: !this.state.showPassword })}
                />
              )
            ) : this.props.suffix ? (
              <i className={this.props.suffix} />
            ) : null
          }
        />

        {this.error && this.props.isSubmit && (
          <div style={{ fontSize: 10, color: 'red', textAlign: 'right' }}>{this.error}</div>
        )}
      </div>
    )
  }
}

export default InputNumberBox
