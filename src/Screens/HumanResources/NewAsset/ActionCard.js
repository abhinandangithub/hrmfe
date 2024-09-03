import clsx from 'clsx'
import { history } from '../../../Routes'
import './ActionCard.scss'

export default function ActionCard(props) {
  return (
    <div
      className={clsx('action-card', props.item.disabled && 'bg-muted')}
      style={{ backgroundColor: props.item.color }}
      onClick={() => !props.item.disabled && history(props.item.link)}>
      {props.item.name}
    </div>
  )
}
