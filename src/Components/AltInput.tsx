import { Col, Input as InputField, Modal, Row } from 'antd'
import { useState } from 'react'
import { arabicRegex } from '../Util/Options'
import type { TAltInput } from './Formik/types'

export default function AltInput<TFieldName extends string = string>({
  text,
  name,
  altValue,
  onChange,
  label,
  hideLabel,
  disabled,
  value
}: TAltInput<TFieldName>) {
  const [altText, setAltText] = useState(altValue || '')
  const [toggle, setToggle] = useState(false)

  const onOk = () => {
    onChange?.(`${name}Alt`, altText)
    setToggle(false)
  }

  const oncancel = () => {
    setAltText(altText)
    setToggle(false)
  }

  return (
    <>
      <Row
        gutter={[8, 0]}
        justify="end"
        style={{
          ...(hideLabel && { position: 'absolute', top: '-19px', right: '5px' })
        }}>
        {text && <Col>{typeof text === 'function' ? text(value) : text}</Col>}
        <Col>
          <i
            title="Add alternate text"
            className="flaticon-plus d-inline-flex"
            style={{
              color: altValue ? '#73cb57' : '#a3a3a3',
              cursor: 'pointer'
            }}
            onClick={() => {
              setToggle(true)
              setAltText(altValue || '')
            }}
          />
        </Col>
      </Row>
      <Modal
        visible={toggle}
        title={`Alternate ${label}`}
        onOk={onOk}
        onCancel={oncancel}
        maskClosable={false}
        destroyOnClose>
        <InputField
          disabled={disabled}
          value={altText}
          dir={arabicRegex.test(altText?.toString()) ? 'rtl' : 'ltr'}
          onChange={(e) => setAltText(e.target.value)}
        />
      </Modal>
    </>
  )
}
