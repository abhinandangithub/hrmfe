import { confirmAlert } from 'react-confirm-alert'
import 'react-confirm-alert/src/react-confirm-alert.css'
import ButtonBox from '../ButtonBox/ButtonBox'
import './ConfirmationBox.scss'

export default function ConfirmationBox(
  {
    title,
    description,
    acceptText,
    acceptFn,
    acceptText1 = false,
    acceptFn1 = false,
    cancelText
    // cancelFn = false
  },
  onAcceptFn,
  onCancelFn
) {
  return confirmAlert({
    closeOnClickOutside: false,
    customUI: ({ onClose }) => (
      <div className="confirmation-container">
        <h1>{title}</h1>
        <h3>{description}</h3>
        <div style={{ paddingTop: 10 }}>
          <ButtonBox
            style={{ marginRight: 10 }}
            type="secondary"
            onClick={() => {
              if (onCancelFn) {
                onCancelFn()
              }
              // else {
              //   cancelFn()
              // }

              onClose()
            }}>
            {cancelText || 'No'}
          </ButtonBox>
          {acceptFn1 && (
            <ButtonBox
              style={{ marginRight: 10 }}
              onClick={() => {
                acceptFn1()
                onClose()
              }}>
              {acceptText1 || 'Yes'}
            </ButtonBox>
          )}
          <ButtonBox
            onClick={() => {
              if (onAcceptFn) {
                onAcceptFn()
              } else {
                acceptFn()
              }

              onClose()
            }}>
            {acceptText || 'Yes'}
          </ButtonBox>
        </div>
      </div>
    )
  })
}
