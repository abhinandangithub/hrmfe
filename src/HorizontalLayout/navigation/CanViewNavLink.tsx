// ** React Imports
import { ReactNode } from 'react'


// ** Types
import { NavLink } from '../types'

interface Props {
  navLink?: NavLink
  children: ReactNode
}

const CanViewNavLink = (props: Props) => {
  // ** Props
  const { children } = props

  return <div>{children}</div>
}

export default CanViewNavLink
