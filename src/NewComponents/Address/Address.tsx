import _ from 'lodash'
import { memo, useState } from 'react'
import { useFormContext, useWatch } from 'react-hook-form'
import ConfirmationBox from '../../Components/ConfirmationBox/ConfirmationBox'
import ModalBox from '../../Components/ModalBox/ModalBox'
import AddressFields from './AddressFields'

type TAddress = {
  addressType: string
  label: string
  disabled: boolean
  newForm?: boolean
  confirmationData?: CData
}
type CData = {
  title: string
  description: string
  acceptText: string
  cancelText: string
}

function Address({ addressType, label, disabled, newForm, confirmationData }: TAddress) {
  const {
    formState: { errors, touchedFields }
  } = useFormContext()
  const address = useWatch({ name: addressType })
  const [toggleAddress, setToggleAddress] = useState(false)

  const error = _.get(errors, addressType)

  const onOpen = () => {
    if (confirmationData) {
      ConfirmationBox(
        /* // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore: Unreachable code error */
        confirmationData,
        () => {
          setToggleAddress(true)
        }
      )
    } else {
      setToggleAddress(true)
    }
  }

  return (
    <>
      <ModalBox
        title="Update Address"
        visible={!!toggleAddress}
        onOk={() => setToggleAddress(false)}
        onCancel={() => setToggleAddress(false)}
        destroyOnClose>
        <AddressFields addressType={addressType} />
      </ModalBox>
      {(address?.street || address?.country || newForm) && (
        <div>
          <h2>
            {label}
            {Boolean(error) && <span className="required">*</span>}
            {!disabled && <i className="ml-2 flaticon-edit-1" onClick={() => onOpen()} />}
          </h2>
          <h4>{address.street}</h4>
          <div>{address.city}</div>
          <div>{address.state}</div>
          <div>
            {address.country}
            {address.postalCode && ' -'} {address.postalCode}
          </div>
        </div>
      )}
      {error && _.get(touchedFields, addressType) && (
        <div style={{ fontSize: 10, color: 'red' }}>{`${label} required`}</div>
      )}
    </>
  )
}

export default memo(Address)
