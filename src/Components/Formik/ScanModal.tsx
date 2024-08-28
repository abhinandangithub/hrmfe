import { Modal } from 'antd'
import React, { lazy, memo, useEffect, useState } from 'react'
import type { ScanInputTypes } from './types'

const Scanner = lazy(() => import('../Scanner'))

type Props = {
  name: string
  label?: string
  onChange?: (name: string, value: string) => void
  onClose?: () => void
} & ScanInputTypes

function ScanModal({ name, label = '', scanType, onChange, onClose }: Props) {
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
