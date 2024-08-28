import clsx from 'clsx'
import { CSSProperties, ReactNode } from 'react'

type TPanelLayout = {
  title?: ReactNode
  noBottom?: boolean
  children: ReactNode
  style?: CSSProperties
}

export default function PanelLayout({ title, children, noBottom, style }: TPanelLayout) {
  return (
    <div className={clsx('panel-layout', noBottom && 'mb-0')} style={style}>
      {title && (typeof title === 'string' ? <h2 className="panel-title">{title}</h2> : title)}
      {children}
    </div>
  )
}
