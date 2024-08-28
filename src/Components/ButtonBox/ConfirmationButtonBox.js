import { Button, Popconfirm } from 'antd'
import React, { Component } from 'react'

class ConfirmationButtonBox extends Component {
  componentDidMount() {
    this.props.refs?.(this)
  }

  componentWillUnmount() {
    this.props.refs?.(null)
  }

  render() {
    const { children, type, loader, style, placement, title, onConfirm } = this.props

    return (
      <Popconfirm placement={placement} title={title} onConfirm={onConfirm} okText="Yes" cancelText="No">
        <Button style={style} type={type || 'primary'} loading={loader}>
          {children}
        </Button>
      </Popconfirm>
    )
  }
}

export default ConfirmationButtonBox
