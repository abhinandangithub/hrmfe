import React from 'react'
import './ValueCard.scss'

export default function ValueCard(props) {
  return (
    <div className="value-card">
      <div className="label"> {props.item.name}</div>
      <div className="cost">{props.item.cost}</div>
    </div>
  )
}
