import { ChangeEvent, useState } from 'react'
import { ColorResult, SketchPicker } from 'react-color'

type ColorPickerProps = {
  color: string
  onChange: (color: ColorResult, event?: ChangeEvent<HTMLInputElement>) => void
}

function ColorPicker({ color, onChange }: ColorPickerProps) {
  const [displayColorPicker, setDisplayColorPicker] = useState(false)
  const [localColor, setLocalColor] = useState(color)

  const handleClick = () => {
    setDisplayColorPicker((prevState) => !prevState)
  }

  const handleClose = () => {
    setDisplayColorPicker(false)
  }

  const handleChange = (color: ColorResult) => {
    setLocalColor(color.hex)
    onChange(color)
  }

  return (
    <div>
      <div
        style={{
          padding: '5px',
          background: '#fff',
          borderRadius: '1px',
          boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
          display: 'inline-block',
          cursor: 'pointer'
        }}
        onClick={handleClick}>
        <div
          style={{
            width: '36px',
            height: '14px',
            borderRadius: '2px',
            backgroundColor: color
          }}
        />
      </div>
      {displayColorPicker ? (
        <div style={{ position: 'absolute', zIndex: 2 }}>
          <div
            style={{ position: 'fixed', top: '0px', right: '0px', bottom: '0px', left: '0px' }}
            onClick={handleClose}
          />
          <SketchPicker color={localColor} onChange={handleChange} />
        </div>
      ) : null}
    </div>
  )
}

export default ColorPicker
