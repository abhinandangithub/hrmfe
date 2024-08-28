import { Col, Divider, Row } from 'antd'
import React from 'react'
import { connect } from 'react-redux'
import ButtonBox from '../../../Components/ButtonBox/ButtonBox'
import InputBox from '../../../Components/InputBox/InputBox'
import SelectBox from '../../../Components/SelectBox/SelectBox'
import UploadBox from '../../../Components/UploadBox/UploadBox'

const justifyContentOptions = [
  { label: 'Default', value: '' },
  { label: 'Left', value: 'flex-start' },
  { label: 'Center', value: 'center' },
  { label: 'Right', value: 'flex-end' }
]
const alignContentOptions = [
  { label: 'Default', value: '' },
  { label: 'Top', value: 'flex-start' },
  { label: 'Center', value: 'center' },
  { label: 'Bottom', value: 'flex-end' },
  { label: 'Stretch', value: 'stretch' }
]

const directionOptions = [
  { label: 'Left To Right', value: 'ltr' },
  { label: 'Right To Left', value: 'rtl' }
]

const pageOrientationOptions = [
  { label: 'Potrait', value: 'potrait' },
  { label: 'landscape', value: 'landscape' }
]

class Properties extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  onChangeText = (value, type) => {
    const { selectedItems } = this.props
    const updatedItems = selectedItems.map((selectedItem) => {
      selectedItem.refObj.onUpdateValues(value, type)
      selectedItem[type] = value

      return selectedItem
    })
    this.props.dispatch({
      type: 'SET_TEMPLATE_DATA',
      payload: { selectedItems: updatedItems }
    })
  }

  onChangeStyle = (value, type) => {
    const { selectedItems } = this.props
    const updatedItems = selectedItems.map((selectedItem) => {
      const style = {
        ...(selectedItem.style || {}),
        [type]: value
      }
      selectedItem.refObj.onUpdateValues(style, 'style')
      selectedItem.style = style

      return selectedItem
    })
    this.props.dispatch({
      type: 'SET_TEMPLATE_DATA',
      payload: { selectedItems: updatedItems }
    })
  }

  onChangeStyleNum = (value, type) => {
    const { selectedItems } = this.props
    const updatedItems = selectedItems.map((selectedItem) => {
      const newValue = parseFloat(value)
      const newStyle = { ...(selectedItem.style || {}) }
      newStyle[type] = newValue || 0

      selectedItem.refObj.onUpdateValues(newStyle, 'style')
      selectedItem.style = newStyle

      return selectedItem
    })
    this.props.dispatch({
      type: 'SET_TEMPLATE_DATA',
      payload: { selectedItems: updatedItems }
    })
  }

  onChangeBorder = (value, type) => {
    const { selectedItem } = this.props

    const newStyle = { ...(selectedItem.style || {}) }

    if (type === 'borderColor') {
      newStyle[type] = value
    } else {
      const newValue = parseFloat(value)
      newStyle[type] = newValue ? `${newValue}px solid ${newStyle.borderColor || '#000'}` : false
    }

    selectedItem.refObj.onUpdateValues(newStyle, 'style')

    this.props.dispatch({
      type: 'SET_TEMPLATE_DATA',
      payload: { selectedItem: { ...selectedItem, style: newStyle } }
    })
  }

  onDeleteItem = async () => {
    const { selectedItems } = this.props
    selectedItems.map((selectedItem) => {
      selectedItem.refObj.onDeleteItem()

      return true
    })
    this.props.dispatch({
      type: 'SET_TEMPLATE_DATA',
      payload: { selectedItems: [] }
    })
  }

  onDuplicateItem = () => {
    const { selectedItems } = this.props
    selectedItems[0]?.refObj.onDuplicateItem()
  }

  render() {
    const { selectedItems } = this.props

    const selectedItem = selectedItems && selectedItems[0] ? selectedItems[0] : {}
    const style = selectedItem.style ? selectedItem.style : {}

    return (
      <div className="template-controls">
        <div className="top-save-button">
          <ButtonBox type="success" variable="secondary" onClick={this.props.onSave}>
            <i className="flaticon-master-drive" /> Save
          </ButtonBox>
        </div>
        <div className="template-name">{this.props.templateName}</div>
        <div className="customizable-fields">
          {selectedItems.length > 0 && (
            <Row>
              <Col lg={{ span: 24 }}>
                <div className="selected-item">
                  <b>Selected:</b> {selectedItem.name} {selectedItem.id}
                </div>
              </Col>
              <Col lg={{ span: 24 }}>
                <Divider orientation="center" plain>
                  General
                </Divider>
              </Col>
              <Col lg={{ span: 24 }}>
                <InputBox
                  label="Value"
                  id="value"
                  value={selectedItem.value}
                  onChangeText={this.onChangeText}
                  textArea
                  optional
                />
              </Col>
              {selectedItem.itemFor && (
                <Col lg={{ span: 24 }}>
                  <InputBox
                    label="Key"
                    id="itemKey"
                    value={selectedItem.itemKey}
                    onChangeText={this.onChangeText}
                    optional
                  />
                </Col>
              )}
              {selectedItem.itemFor && (
                <Col lg={{ span: 24 }}>
                  <SelectBox
                    label="Item For"
                    id="itemFor"
                    value={selectedItem.itemFor}
                    onChangeText={this.onChangeText}
                    options={[
                      { label: 'Employee', value: 'Employee' },
                      { label: 'Employer', value: 'Employer' }
                    ]}
                    optional
                  />
                </Col>
              )}
              {selectedItem.type === 'Image' && (
                <Col lg={{ span: 24 }}>
                  <UploadBox
                    id="value"
                    label="Upload"
                    value=""
                    onUpload={this.onChangeText}
                    height={300}
                    width={300}
                    uploadUrl="companies/uploadTemplateDocuments"
                    direct
                    showResizer
                    base64
                  />
                </Col>
              )}
              <Col lg={{ span: 24 }}>
                <SelectBox
                  label="Thousand Separator"
                  id="thousandSeparator"
                  value={selectedItem.thousandSeparator}
                  onChangeText={this.onChangeText}
                  options={[
                    { label: 'Yes', value: 'Yes' },
                    { label: 'No', value: 'No' }
                  ]}
                  optional
                />
              </Col>
              <Col lg={{ span: 24 }}>
                <SelectBox
                  label="Amount in Words"
                  id="amountInWords"
                  value={selectedItem.amountInWords}
                  onChangeText={this.onChangeText}
                  options={[
                    { label: 'Yes', value: 'Yes' },
                    { label: 'No', value: 'No' }
                  ]}
                  optional
                />
              </Col>
              <Col lg={{ span: 24 }}>
                <InputBox
                  label="Decimal Length"
                  id="decimalLength"
                  value={selectedItem.decimalLength}
                  onChangeText={this.onChangeText}
                  optional
                />
              </Col>
              <Col lg={{ span: 24 }}>
                <Divider orientation="center" plain>
                  Style
                </Divider>
              </Col>
              <Col lg={{ span: 24 }}>
                <InputBox
                  label="Height"
                  id="height"
                  value={style?.height}
                  onChangeText={this.onChangeStyleNum}
                  type="number"
                  optional
                />
              </Col>
              <Col lg={{ span: 24 }}>
                <InputBox
                  label="Width"
                  id="width"
                  value={style?.width}
                  onChangeText={this.onChangeStyleNum}
                  type="number"
                  optional
                />
              </Col>
              <Col lg={{ span: 24 }}>
                <InputBox
                  label="Color"
                  id="color"
                  value={style?.color}
                  onChangeText={this.onChangeStyle}
                  optional
                />
              </Col>
              <Col lg={{ span: 24 }}>
                <InputBox
                  label="Background Color"
                  id="backgroundColor"
                  value={style?.backgroundColor}
                  onChangeText={this.onChangeStyle}
                  optional
                />
              </Col>
              <Col lg={{ span: 24 }}>
                <InputBox
                  label="Background"
                  id="background"
                  value={style?.background}
                  onChangeText={this.onChangeStyle}
                  optional
                />
              </Col>
              <Col lg={{ span: 24 }}>
                <InputBox
                  label="Size"
                  id="fontSize"
                  value={style?.fontSize}
                  onChangeText={this.onChangeStyleNum}
                  optional
                />
              </Col>
              <Col lg={{ span: 24 }}>
                <InputBox
                  label="Bold"
                  id="fontWeight"
                  value={style?.fontWeight}
                  onChangeText={this.onChangeStyle}
                  optional
                />
              </Col>
              <Col lg={{ span: 24 }}>
                <SelectBox
                  label="Horizontal Align"
                  id="justifyContent"
                  value={style?.justifyContent}
                  onChangeText={this.onChangeStyle}
                  options={justifyContentOptions}
                  optional
                />
              </Col>
              <Col lg={{ span: 24 }}>
                <SelectBox
                  label="Vertical Align"
                  id="alignContent"
                  value={style?.alignContent}
                  onChangeText={this.onChangeStyle}
                  options={alignContentOptions}
                  optional
                />
              </Col>
              <Col lg={{ span: 24 }}>
                <InputBox
                  label="Font"
                  id="fontFamily"
                  value={style?.fontFamily}
                  onChangeText={this.onChangeStyle}
                  optional
                />
              </Col>

              <Col lg={{ span: 24 }}>
                <Divider orientation="center" plain>
                  Border Setup
                </Divider>
              </Col>
              <Col lg={{ span: 12 }}>
                <InputBox
                  label="Border"
                  id="border"
                  value={style?.border}
                  onChangeText={this.onChangeStyleNum}
                  optional
                />
              </Col>
              <Col lg={{ span: 12 }}>
                <InputBox
                  label="Border Color"
                  id="borderColor"
                  value={style?.borderColor}
                  onChangeText={this.onChangeStyle}
                  optional
                />
              </Col>
              <Col lg={{ span: 6 }}>
                <InputBox
                  label="Left"
                  id="borderLeft"
                  value={style?.borderLeft}
                  onChangeText={this.onChangeStyleNum}
                  optional
                />
              </Col>
              <Col lg={{ span: 6 }}>
                <InputBox
                  label="Right"
                  id="borderRight"
                  value={style?.borderRight}
                  onChangeText={this.onChangeStyleNum}
                  optional
                />
              </Col>
              <Col lg={{ span: 6 }}>
                <InputBox
                  label="Top"
                  id="borderTop"
                  value={style?.borderTop}
                  onChangeText={this.onChangeStyleNum}
                  optional
                />
              </Col>
              <Col lg={{ span: 6 }}>
                <InputBox
                  label="Bottom"
                  id="borderBottom"
                  value={style?.borderBottom}
                  onChangeText={this.onChangeStyleNum}
                  optional
                />
              </Col>
              <Col lg={{ span: 24 }}>
                <Divider orientation="center" plain>
                  Padding Setup
                </Divider>
              </Col>
              <Col lg={{ span: 24 }}>
                <InputBox
                  label="Padding"
                  id="padding"
                  value={style?.padding}
                  onChangeText={this.onChangeStyleNum}
                  optional
                />
              </Col>
              <Col lg={{ span: 6 }}>
                <InputBox
                  label="Left"
                  id="paddingLeft"
                  value={style?.paddingLeft}
                  onChangeText={this.onChangeStyleNum}
                  optional
                />
              </Col>
              <Col lg={{ span: 6 }}>
                <InputBox
                  label="Right"
                  id="paddingRight"
                  value={style?.paddingRight}
                  onChangeText={this.onChangeStyleNum}
                  optional
                />
              </Col>
              <Col lg={{ span: 6 }}>
                <InputBox
                  label="Top"
                  id="paddingTop"
                  value={style?.paddingTop}
                  onChangeText={this.onChangeStyleNum}
                  optional
                />
              </Col>
              <Col lg={{ span: 6 }}>
                <InputBox
                  label="Bottom"
                  id="paddingBottom"
                  value={style?.paddingBottom}
                  onChangeText={this.onChangeStyleNum}
                  optional
                />
              </Col>
              {selectedItem && selectedItem.type !== 'Psage' && (
                <>
                  <Col lg={{ span: 24 }}>
                    <Divider orientation="center" plain>
                      Margin Setup
                    </Divider>
                  </Col>
                  <Col lg={{ span: 24 }}>
                    <InputBox
                      label="Margin"
                      id="margin"
                      value={style?.margin}
                      onChangeText={this.onChangeStyleNum}
                      optional
                    />
                  </Col>
                  <Col lg={{ span: 6 }}>
                    <InputBox
                      label="Left"
                      id="marginLeft"
                      value={style?.marginLeft}
                      onChangeText={this.onChangeStyleNum}
                      optional
                    />
                  </Col>
                  <Col lg={{ span: 6 }}>
                    <InputBox
                      label="Right"
                      id="marginRight"
                      value={style?.marginRight}
                      onChangeText={this.onChangeStyleNum}
                      optional
                    />
                  </Col>
                  <Col lg={{ span: 6 }}>
                    <InputBox
                      label="Top"
                      id="marginTop"
                      value={style?.marginTop}
                      onChangeText={this.onChangeStyleNum}
                      optional
                    />
                  </Col>
                  <Col lg={{ span: 6 }}>
                    <InputBox
                      label="Bottom"
                      id="marginBottom"
                      value={style?.marginBottom}
                      onChangeText={this.onChangeStyleNum}
                      optional
                    />
                  </Col>
                </>
              )}
              <Col lg={{ span: 24 }}>
                <SelectBox
                  label="Direction"
                  id="direction"
                  value={style?.direction}
                  onChangeText={this.onChangeStyle}
                  options={directionOptions}
                  optional
                />
              </Col>
              {selectedItems.length === 1 && selectedItem.type === 'Page' && (
                <Col lg={{ span: 24 }}>
                  <SelectBox
                    label="Page Orientation"
                    id="pageOrientation"
                    value={style?.pageOrientation}
                    onChangeText={this.onChangeStyle}
                    options={pageOrientationOptions}
                    optional
                  />
                </Col>
              )}
              {selectedItems.length === 1 && selectedItem.type === 'Page' && (
                <Col lg={{ span: 24 }}>
                  <InputBox
                    label="Font CDN"
                    id="fontCDN"
                    value={style?.fontCDN}
                    onChangeText={this.onChangeStyle}
                    optional
                  />
                </Col>
              )}
            </Row>
          )}
        </div>
        <div className="footer-buttons">
          {selectedItems.length > 0 && selectedItem.type !== 'Page' && (
            <div>
              <ButtonBox onClick={this.onDeleteItem}>
                <i className="flaticon-delete-2" /> Delete
              </ButtonBox>
              {selectedItems.length === 1 && (
                <ButtonBox onClick={this.onDuplicateItem}>
                  <i className="flaticon-layers" />
                  Duplicate
                </ButtonBox>
              )}
            </div>
          )}
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    selectedItems: state.templates.selectedItems
  }
}

export default connect(mapStateToProps)(Properties)
