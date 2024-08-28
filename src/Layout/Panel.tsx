import clsx from 'clsx'
import { ReactNode } from 'react'

type TPanel = {
  title?: ReactNode
  noBottom?: boolean
  children: ReactNode
  bodyClassName?: string
}

export default function Panel({ title, noBottom, bodyClassName, children }: TPanel) {
  return (
    <div className={clsx('panel-design', noBottom && 'mb-0')}>
      {title && (
        <div className="panel-header">
          <h3>{title}</h3>
        </div>
      )}
      <div className={clsx('panel-body', bodyClassName)}>{children}</div>
    </div>
  )
}
