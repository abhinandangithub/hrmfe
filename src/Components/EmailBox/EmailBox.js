import React from 'react'
import './EmailBox.scss'

export default class EmailBox extends React.Component {
  constructor() {
    super()
    this.state = {
      items: [],
      value: ''
    }
  }

  onBlur = (evt) => {
    evt.preventDefault()
    const value = this.state.value.trim()

    if (value && this.isValid(value)) {
      this.setState({
        items: [...this.state.items, this.state.value],
        value: ''
      })
    } else {
      this.setState({ value: '' })
    }
  }

  handleKeyDown = (evt) => {
    if (['Enter', 'Tab', ','].includes(evt.key)) {
      evt.preventDefault()

      const value = this.state.value.trim()

      if (value && this.isValid(value)) {
        this.setState({
          items: [...this.state.items, this.state.value],
          value: ''
        })
      } else {
        this.setState({ value: '' })
      }
    }
  }

  handleChange = (evt) => {
    evt.preventDefault()
    this.setState({
      value: evt.target.value,
      error: null
    })
  }

  handleDelete = (item) => {
    this.setState({
      items: this.state.items.filter((i) => i !== item)
    })
  }

  handlePaste = (evt) => {
    evt.preventDefault()

    const paste = evt.clipboardData.getData('text')
    const emails = paste.match(/[\w\d.-]+@[\w\d.-]+\.[\w\d.-]+/g)

    if (emails) {
      const toBeAdded = emails.filter((email) => !this.isInList(email))

      this.setState({
        items: [...this.state.items, ...toBeAdded]
      })
    }
  }

  isValid(email) {
    let error = null

    if (this.isInList(email)) {
      error = `${email} has already been added.`
    }

    if (!this.isEmail(email)) {
      error = `${email} is not a valid email address.`
    }

    if (error) {
      return false
    }

    return true
  }

  isInList(email) {
    return this.state.items.includes(email)
  }

  isEmail() {
    return !this.props.emailCheck || this.state.value.match(/[\w\d.-]+@[\w\d.-]+\.[\w\d.-]+/g)
  }

  render() {
    return (
      <div className="email-chip">
        {this.state.items.map((item) => (
          <div className="tag-item" key={item}>
            {item}
            <button type="button" className="button" onClick={() => this.handleDelete(item)}>
              &times;
            </button>
          </div>
        ))}

        <input
          autoComplete={false}
          className={`input ${this.state.error && ' has-error'}`}
          value={this.state.value}
          placeholder={this.props.placeholder}
          onKeyDown={this.handleKeyDown}
          onChange={this.handleChange}
          onBlur={this.onBlur}
          onPaste={this.handlePaste}
        />
      </div>
    )
  }
}
