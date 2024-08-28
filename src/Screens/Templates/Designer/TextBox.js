import React from 'react'
import { arabicRegex } from '../../../Util/Options'
import { updateStyle } from '../TemplateProperties'

export const TextBox = function (props) {
  const onChange = (e) => {
    // if (!props.notEditable) {
    const { value } = e.target
    props.onUpdateValues(value === '"' ? "'" : value, 'value')
    // }
  }

  const getTextAlign = () => {
    const justifyContent = props.style?.justifyContent

    if (justifyContent) {
      return (
        (justifyContent === 'flex-start' && 'left') ||
        (justifyContent === 'flex-end' && 'right') ||
        justifyContent
      )
    }
  }

  const { fontSize, padding, paddingTop, paddingRight, paddingBottom, paddingLeft } = props.style
  const dir = arabicRegex.test(props.value?.toString()) ? 'rtl' : null
  const justifyContent =
    (props.style?.justifyContent === 'flex-start' && 'flex-end') ||
    (props.style?.justifyContent === 'flex-end' && 'flex-start') ||
    props.style?.justifyContent
  const checkPadding = paddingTop || paddingRight || paddingBottom || paddingLeft ? 0 : padding || 3
  const optPad = padding || checkPadding
  const paddingString = `${paddingTop || optPad}px ${paddingRight || optPad}px ${paddingBottom || optPad}px ${
    paddingLeft || optPad
  }px`

  return (
    <div
      className="dashed-border no-page-break"
      dir={dir}
      style={{
        ...updateStyle(props.style || {}),
        width: '100%',
        overflow: 'hidden',
        display: 'flex',
        outline: 'none',
        fontSize: fontSize || 12,
        textAlign: getTextAlign(),
        whiteSpace: 'pre-wrap',
        justifyContent: dir === 'rtl' ? justifyContent : props.style?.justifyContent,
        padding: paddingString
      }}>
      <span className="template-itemref cell-check-start" />
      {props.amountInWords === 'Yes' && <span className="template-itemref amt-wrds-start" />}
      {props.thousandSeparator === 'Yes' && <span className="template-itemref thsnd-sp-start" />}
      {props.decimalLength && <span id={props.id} className="template-itemref decimal-len-start" />}
      <textarea
        style={{
          fontWeight: props.style?.fontWeight,
          textAlign: getTextAlign(),
          outline: 'none',
          resize: 'none',
          border: 'none',
          overflow: 'hidden',
          width: '100%',
          height: 'inherit',
          background: 'none'
        }}
        dir={dir}
        value={props.value}
        onChange={onChange}
      />
      {props.decimalLength && <span id={props.id} className="template-itemref decimal-len-end" />}
      {props.thousandSeparator === 'Yes' && <span className="template-itemref thsnd-sp-end" />}
      {props.amountInWords === 'Yes' && <span className="template-itemref amt-wrds-end" />}
      <span className="template-itemref cell-check-end" />
    </div>
  )
}
