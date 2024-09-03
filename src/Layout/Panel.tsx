import clsx from 'clsx'
import { ReactNode } from 'react'

type TPanel = {
  title?: ReactNode
  noBottom?: boolean
  children: ReactNode
  bodyClassName?: string
  button?: ReactNode
}

export default function Panel({ title, noBottom, bodyClassName, children, button }: TPanel) {
  return (
    <div className={clsx('panel-design', noBottom && 'mb-0')}>
      {title && (
        <div className="panel-header" style={{ display: 'flex', justifyContent: 'space-between' }}>
          <h3>{title}</h3>
          {button}
        </div>
      )}
      <div className={clsx('panel-body', bodyClassName)}>{children}</div>
    </div>
  )
}
