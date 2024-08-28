import React from 'react'

export const UnderLineBox = function (props) {
  return (
    <div
      className="dashed-border"
      style={{
        ...props.style,
        width: '100%',
        border: 'none',
        minHeight: 1,
        backgroundColor: 'none',
        height: 'auto'
      }}>
      <div
        style={{ width: '100%', height: '100%', backgroundColor: props.style?.backgroundColor || 'gray' }}
      />
    </div>
  )
}
