import { Modal } from 'antd'
import type { ModalProps } from 'antd/lib/modal/Modal'
import React, { FunctionComponent } from 'react'

const ModalBox: FunctionComponent<ModalProps> = (props) => (
  <div>
    <Modal {...props}>{props.children}</Modal>
  </div>
)

ModalBox.defaultProps = {
  width: 600,
  maskClosable: false,
  destroyOnClose: true
}

export default ModalBox
