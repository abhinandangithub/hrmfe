import { memo, ReactNode } from 'react'
import { get, useFormContext } from 'react-hook-form'

type Props = {
  name: string
  render?: (error?: string) => ReactNode
}

function ErrorMessage({ name, render }: Props) {
  const { formState } = useFormContext()

  const error = get(formState.errors, `${name}.message`)?.replace(/\[(\d+)\]\./g, '.$1.')

  return (
    <div className="mb-3" style={{ fontSize: 10, color: 'red' }}>
      {render?.(error) || error}
    </div>
  )
}

export default memo(ErrorMessage)
