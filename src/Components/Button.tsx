import { Button as AntdButton } from 'antd'
import type { ButtonHTMLType, ButtonProps, ButtonType } from 'antd/lib/button/button'
import clsx from 'clsx'
import Translate from './Translate/Translate'

export type TButton = {
  type?: ButtonHTMLType
  variant?: ButtonType | 'secondary'
  success?: boolean
} & Omit<ButtonProps, 'type' | 'htmlType'>

export default function Button({
  type = 'button',
  variant = 'default',
  className,
  success,
  ...props
}: TButton) {
  return (
    <AntdButton
      className={clsx(className, success && 'ant-btn-success')}
      htmlType={type}
      type={variant as ButtonType}
      {...props}>
      <Translate>{props.children}</Translate>
    </AntdButton>
  )
}
