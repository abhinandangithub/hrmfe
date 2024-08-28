import React, { memo } from 'react'
import { useDrag, useDrop } from 'react-dnd'
import './index.scss'

export const Card = memo((props) => {
  const { id, accept, moveCard, findIndexById, children } = props
  const originalIndex = findIndexById(id)
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: accept,
      item: { id, originalIndex },
      collect: (monitor) => ({
        isDragging: monitor.isDragging()
      }),
      end: (item, monitor) => {
        const { id: droppedId, originalIndex } = item
        const didDrop = monitor.didDrop()

        if (!didDrop) {
          moveCard(droppedId, originalIndex)
        }
      },
      canDrag: () => props.type !== 'Page'
    }),
    [id, originalIndex, moveCard]
  )
  const [, drop] = useDrop(
    () => ({
      accept,
      canDrop: () => false,
      hover({ id: draggedId }) {
        if (draggedId !== id) {
          const overIndex = findIndexById(id)
          moveCard(draggedId, overIndex)
        }
      }
    }),
    [findIndexById, moveCard]
  )
  const opacity = isDragging ? 0 : 1

  return (
    <>
      {props.itemRef && <span className={`template-itemref ${props.itemRef}-start`} />}
      <div className="drag-container" ref={(node) => drag(drop(node))} style={{ opacity }}>
        {children}
      </div>
      {props.itemRef && <span className={`template-itemref ${props.itemRef}-end`} />}
    </>
  )
})
