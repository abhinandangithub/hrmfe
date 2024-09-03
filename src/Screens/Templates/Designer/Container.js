import { arrayMoveImmutable } from 'array-move';
import React, { memo, useCallback, useState } from 'react'
import { useDrop } from 'react-dnd'
import { generateId } from '../../../Util/Util'
import { updateStyle } from '../TemplateProperties'
import { Card } from './Card'
import ResizableContainer from './ResizableContainer'

const Container = function (props) {
  let tempState = false
  const [cards, setCards] = useState(props.items)
  const findIndexById = (id) => cards.findIndex((c) => c.id === id)
  const findIdByIndex = (idx) => cards.find((c, ind) => ind === idx)?.id
  const moveCard = useCallback(
    (id, atIndex) => {
      const index = findIndexById(id)
      const newData = arrayMoveImmutable(cards, index, atIndex);

      setCards(newData)
    },
    [cards, findIndexById]
  )
  const accepts = props.type === 'MainContainer' ? [props.id] : [props.id, 'DND']
  const [{ isOver }, drop] = useDrop(
    () => ({
      accept: accepts,
      drop(item, monitor) {
        const isOver = monitor.isOver()

        if (isOver && item.drop) {
          tempState = false
          const id = `${generateId()}_${generateId()}`
          const obj = {
            id,
            refId: props.id,
            style: { height: 40, width: 100, padding: item.type === 'TextBox' ? 3 : 0 },
            ...item
          }
          const newData = [...cards, obj]
          setCards(newData)
          const updateData = { ...props, items: newData }
          props.onUpdateItem(updateData)
        } else {
          const updateData = { ...props, items: cards }
          props.onUpdateItem(updateData)
        }
      },
      collect: (monitor) => ({
        isOver: monitor.isOver(),
        isOverCurrent: monitor.isOver({ shallow: true })
      }),
      canDrop: () => true
    }),
    [findIdByIndex, tempState]
  )
  let backgroundColor = false

  if (isOver) {
    backgroundColor = '#fccba5'
  }

  const onUpdateItem = useCallback((updatedData) => {
    if (updatedData) {
      const newItems = [...(tempState && tempState.items ? tempState.items : cards)]
      newItems[findIndexById(updatedData.id)] = updatedData
      setCards(newItems)
      const updateData = { ...props, items: newItems }
      tempState = updateData
      props.onUpdateItem(updateData)
    }
  })

  const onDeleteCurrentItem = useCallback((item) => {
    const newItems = (tempState && tempState.items ? tempState.items : cards).filter(
      (val) => val.id !== item.id
    )
    setCards(newItems)
    const updateData = { ...props, items: newItems }
    tempState = updateData
    props.onUpdateItem(updateData)
  })

  const onDuplicateCurrentItem = (currentId, updatedData) => {
    if (updatedData) {
      const newItems = [...cards]
      newItems.splice(findIndexById(currentId) + 1, 0, updatedData)
      setCards(newItems)
      const updateData = { ...props, items: newItems }
      props.onUpdateItem(updateData)
    }
  }

  const rendercellContainer = (cells) => {
    const parentWidth = props.style?.width || 0
    const splitCells = []
    let tempCells = []
    let cellsWidth = 0
    cells.forEach((v) => {
      cellsWidth += v.style.width

      if (cellsWidth >= parentWidth && tempCells.length > 0) {
        splitCells.push([tempCells])
        tempCells = []
        cellsWidth = v.style.width
      }

      tempCells.push(v)
    })

    if (tempCells.length > 0) {
      splitCells.push([tempCells])
    }

    return splitCells.map((c, ind) => (
      <div key={ind} className="container-row">
        {c.map((bd) =>
          bd.map((cd) => {
            const card = cd[0] ? cd[0] : cd

            return (
              <Card
                key={card.id}
                id={`${card.id}`}
                moveCard={moveCard}
                findIndexById={findIndexById}
                accept={props.id}
                itemRef={card.itemRef}
                style={card.style || {}}
                type={card.type}>
                <ResizableContainer
                  {...card}
                  onUpdateItem={onUpdateItem}
                  onDeleteCurrentItem={onDeleteCurrentItem}
                  onDuplicateCurrentItem={onDuplicateCurrentItem}
                />
              </Card>
            )
          })
        )}
      </div>
    ))
  }

  const { alignContent, justifyContent } = props.style || {}
  const display =
    (alignContent && alignContent !== '') || (justifyContent && justifyContent !== '') ? 'flex' : 'block'
  const height =
    (alignContent && alignContent !== '') || (justifyContent && justifyContent !== '') ? 'auto' : 'auto'

  return (
    <div
      className="dashed-border"
      id={props.id}
      ref={drop}
      style={{
        padding: props.style?.padding || 0,
        alignContent: props.style?.alignContent || 'flex-start',
        clear: 'none',
        height,
        ...updateStyle(props.style),
        backgroundColor: backgroundColor || props.style?.backgroundColor,
        display,
        flexWrap: 'wrap !important',
        width: '100%'
      }}>
      {rendercellContainer(cards)}
    </div>
  )
}

export default memo(Container)
