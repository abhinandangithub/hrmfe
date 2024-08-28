import React, { memo } from 'react'
import { useDrag } from 'react-dnd'

const style = {
  border: '1px dashed #d3d3d3',
  backgroundColor: 'white',
  padding: 3,
  cursor: 'move'
}
export const Box = memo((props) => {
  const [{ opacity }, drag] = useDrag(
    () => ({
      type: 'DND',
      item: { ...props, drop: true },
      collect: (monitor) => ({
        opacity: monitor.isDragging() ? 0.4 : 1
      })
    }),
    [props.name, props.type]
  )

  return (
    <div ref={drag} style={{ ...style, opacity, width: '100%' }}>
      {props.isDropped ? <s>{props.name}</s> : props.name}
    </div>
  )
})
