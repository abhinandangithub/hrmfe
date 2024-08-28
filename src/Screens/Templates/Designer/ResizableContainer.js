import _ from 'lodash'
import React from 'react'
import { connect } from 'react-redux'
import { Resizable } from 'react-resizable'
import { generateId } from '../../../Util/Util'
import Container from './Container'
import { ImageBox } from './ImageBox'
import './index.scss'
import { TextBox } from './TextBox'
import { UnderLineBox } from './UnderLineBox'

const ignoreObj = ['onDeleteCurrentItem', 'onDuplicateCurrentItem', 'onUpdateItem', 'refObj', 'selectedItems']

class ResizableContainer extends React.Component {
  constructor(props) {
    super(props)
    this.selected = false
    this.ignoreClick = false
    const newItem = { ...props }
    this.state = {
      item: newItem
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    const checkSelected = nextProps.selectedItems.findIndex((t) => t.id === this.props.id) >= 0

    if (nextState !== this.state || checkSelected || this.selected) {
      if (!checkSelected) {
        this.selected = false
      }

      return true
    }

    this.selected = false

    return false
  }

  onClick = (e) => {
    e.stopPropagation()

    if (this.ignoreClick) {
      this.ignoreClick = false

      return true
    }

    let selectedItems = [...(e.ctrlKey ? this.props.selectedItems : [])]

    if (this.selected) {
      selectedItems = selectedItems.filter((v) => v.id !== this.state.item.id)
    } else {
      selectedItems.push({ ...this.state.item, refObj: this })
      this.selected = true
    }

    this.props.dispatch({
      type: 'SET_TEMPLATE_DATA',
      payload: {
        selectedItems
      }
    })
  }

  onResize = (e, { size }) => {
    e.preventDefault()
    const style = { ...(this.state.item.style || {}), height: size.height, width: size.width }
    this.setState({ item: { ...this.state.item, style } })
  }

  onResizeStop = (e, { size }) => {
    e.preventDefault()
    const style = { ...(this.state.item.style || {}), height: size.height, width: size.width }
    this.onUpdateItem({ ...this.props, style })
    this.props.dispatch({
      type: 'SET_TEMPLATE_DATA',
      payload: { selectedItems: [{ ...this.state.item, style, refObj: this }] }
    })
    this.ignoreClick = true
  }

  onUpdateItem = (data) => {
    if (this.props.onUpdateItem) {
      this.props.onUpdateItem(_.omitBy(data, ignoreObj))
    }
  }

  onUpdateValues = (value, type) => {
    const updatedData = { ...this.props, [type]: value }
    this.setState({ item: updatedData })
    this.onUpdateItem(updatedData)
  }

  onDeleteItem = () => this.props.onDeleteCurrentItem(this.state.item)

  onDuplicateItem = () => {
    const newItem = { ...this.state.item }
    const resursiveFn = (items) =>
      items.map((val) => {
        if (val.items) {
          val.items = resursiveFn(val.items)
        }

        val.id = `${generateId()}_${generateId()}`

        return val
      })

    const [updateObj] = resursiveFn([newItem])
    this.props.onDuplicateCurrentItem(this.state.item.id, updateObj)
  }

  render() {
    const { item } = this.state
    const { height, width } = item.style || {}

    return (
      <Resizable
        height={parseFloat(height || 0)}
        width={parseFloat(width || 0)}
        onResize={this.onResize}
        onResizeStart={this.onResize}
        minConstraints={[1, 1]}
        onResizeStop={this.onResizeStop}>
        <div
          className={this.selected ? 'selected-cell' : ''}
          id={item.type === 'Page' ? 'template-page-top' : false}
          onClick={this.onClick}
          style={{
            width,
            clear: item.type === 'Underline' ? '' : 'none',
            height
          }}>
          {(item.type === 'Page' || item.type === 'Container') && (
            <Container {...item} items={item.items || []} onUpdateItem={this.onUpdateItem} />
          )}
          {item.type === 'TextBox' && <TextBox {...item} onUpdateValues={this.onUpdateValues} />}
          {item.type === 'Image' && <ImageBox {...item} onUpdateValues={this.onUpdateValues} />}
          {item.type === 'Underline' && <UnderLineBox {...item} onUpdateValues={this.onUpdateValues} />}
        </div>
      </Resizable>
    )
  }
}

function mapStateToProps(state) {
  return {
    selectedItems: state.templates.selectedItems
  }
}

export default connect(mapStateToProps)(ResizableContainer)
