import { Col } from 'antd'
import React from 'react'
import { history } from '../../../Routes'
import './InventoryCard.scss'

export default function InventoryCard(props) {
  return props.item.children ? (
    // <Row className="flex-column" gutter={[20, 10]}>
    // {
    props.item.children.map((item, i) => (
      <Col
        flex={1}
        key={i}
        className="inventory-card"
        style={{ backgroundColor: item.color }}
        onClick={() => history.push(item.link)}>
        {item.title}
        <div className="value">{item.value}</div>
      </Col>
    ))
  ) : (
    // }
    // </Row>
    <div
      className="inventory-card flex-fill"
      style={{ backgroundColor: props.item.color }}
      onClick={() => history.push(props.item.link)}>
      {props.item.title}
      <div className="value"> {props.item.value}</div>
    </div>
  )
}
