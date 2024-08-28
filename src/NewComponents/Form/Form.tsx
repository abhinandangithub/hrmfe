import React from 'react'

export default function Form({
  children,
  ...props
}: React.DetailedHTMLProps<React.FormHTMLAttributes<HTMLFormElement>, HTMLFormElement>) {
  return (
    <form onSubmit={(e) => e.preventDefault()} {...props}>
      {children}
      <button hidden type="submit">
        Submit
      </button>
    </form>
  )
}
