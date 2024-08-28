import React, { memo } from 'react'
import Attachments from '../Attachments'
import type { TAttachment } from './types'

function Attachment({ onChange, label, error, hideLabel, required, ...props }: TAttachment) {
  return (
    <div>
      {label && !hideLabel && (
        <label style={{ textAlign: 'left', width: 'fit-content' }}>
          {label} {required && <span className="required">*</span>}
        </label>
      )}

      <Attachments onUpload={onChange} {...props} />

      {error && (
        <div style={{ fontSize: 10, color: 'red', textAlign: 'right' }}>
          {error.replace(props.name, label || '')}
        </div>
      )}
    </div>
  )
}

Attachment.defaultProps = {
  title: 'Attach Files'
}

export default memo(Attachment)
