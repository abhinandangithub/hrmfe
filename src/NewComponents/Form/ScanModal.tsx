import { Modal } from 'antd'
import React, { lazy, memo, useEffect, useState } from 'react'
import type { ScanInputTypes } from './types'

const Scanner = lazy(() => import('../../Components/Scanner'))

export type TScanModal<TFieldName extends string = string> = {
  name: TFieldName
  label?: string
  onChange?: (name: TFieldName, value: string) => void
  onClose?: () => void
} & ScanInputTypes<TFieldName>

function ScanModal<TFieldName extends string = string>({
  name,
  label = '',
  scanType,
  onChange,
  onClose
}: TScanModal<TFieldName>) {
  const [mount, setMount] = useState(false)

  useEffect(() => {
    setMount(true)
  }, [])

  return mount ? (
    <Modal
      visible
      title={`Scan ${label}`}
      onCancel={onClose}
      footer={false}
      maskClosable={false}
      destroyOnClose>
      <Scanner
        onChange={(v) => {
          onChange?.(name, v)
          onClose?.()
        }}
        scanType={scanType}
      />
    </Modal>
  ) : null
}

export default memo(ScanModal)
