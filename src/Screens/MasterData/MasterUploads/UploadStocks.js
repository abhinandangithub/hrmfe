import { Alert, Col, message, Row } from 'antd'
import { getIn } from 'formik'
import _ from 'lodash'
import React from 'react'
import { connect } from 'react-redux'
import { masterUpload } from '../../../Actions/UserAction'
import ButtonBox from '../../../Components/ButtonBox/ButtonBox'
import LoaderBox from '../../../Components/LoaderBox/LoaderBox'
import TableBox from '../../../Components/TableBox/TableBox'
import AppConfig from '../../../config'
import { sanitize } from '../../../Util/Util'
import UploadArea from './UploadArea'

const { API_URL } = AppConfig

class UploadStocks extends React.Component {
  constructor() {
    super()
    this.state = {
      uploadData: [],
      errorField: false,
      loader: false,
      uploadErrors: []
    }
  }

  onUpload = (header, rowData) => {
    const validateFields = [
      { label: 'Material Code', value: 'materialCode' },
      { label: 'Quantity', value: 'quantity' },
      { label: 'Warehouse', value: 'warehouse' },
      { label: 'Price', value: 'price' },
      { label: 'Value', value: 'value' }
    ]
    const rows = []
    let errorField = ''
    rowData.forEach((val, ind) => {
      const obj = {}
      header.forEach((col, i) => {
        switch (col) {
          case 'Material Code':
            obj.materialCode = val[i]
            break
          case 'Material Description':
            obj.materialDescription = val[i]
            break
          case 'Material Description Alt':
            obj.materialDescriptionAlt = val[i]
            break
          case 'Part Number':
            obj.partNumber = val[i]
            break
          case 'Unit of Measurement':
            obj.unit = val[i]
            break
          case 'Quantity':
            obj.quantity = Number(val[i] || 0)
            break
          case 'Warehouse':
            obj.warehouse = val[i]
            break
          case 'Location':
            obj.location = val[i]
            break
          case 'Rack':
            obj.rack = val[i]
            break
          case 'Status':
            obj.status = val[i]
            break
          case 'Price':
            obj.price = Number(val[i] || 0)
            break
          case 'Value':
            obj.value = Number(val[i] || 0)
            break

          case 'Batch No': {
            if (val[i]) {
              obj.batchNo = val[i]
              obj.batch = true
            }

            break
          }

          case 'Serial No': {
            if (val[i]) {
              obj.serialNo = val[i]
              obj.serial = true
            }

            break
          }

          case 'Manufacturing Date':
            obj.manufacturingDate = val[i]
            break
          case 'Expiry Date':
            obj.expiryDate = val[i]
            break
          case 'Image URL':
            obj.imageURL = val[i]
            break
          default:
            break
        }
      })
      validateFields.forEach((field) => {
        if (!getIn(obj, field.value)) {
          errorField += `<div>${field.label} missing in line ${ind + 1}!</div>`
        }
      })
      rows.push(obj)
    })
    this.setState({
      uploadData: errorField === '' ? rows : [],
      errorField: errorField === '' ? false : errorField
    })
  }

  onUploadData = () => {
    const { uploadData, loader } = this.state

    if (uploadData.length > 0 && !loader) {
      this.setState({ loader: true }, () => {
        const batchSerials = _.map(
          _.groupBy(
            uploadData.filter((item) => item.batch || item.serial),
            (item) =>
              `${item.materialCode}_${item.warehouse}_${item.location}_${item.rack}_${item.batchNo}_${item.serialNo}`
          ),
          (group) => ({
            ..._.pick(group[0], [
              'materialCode',
              'materialDescription',
              'materialDescriptionAlt',
              'partNumber',
              'unit',
              'quantity',
              'warehouse',
              'location',
              'rack',
              'status',
              'price',
              'value',
              'batchNo',
              'batch',
              'serialNo',
              'serial',
              'manufacturingDate',
              'expiryDate',
              'imageURL'
            ]),
            quantity: _.sumBy(group, 'quantity'),
            value: _.sumBy(group, 'value')
          })
        )

        const mergedItems = _.map(
          _.groupBy(
            uploadData,
            (item) => `${item.materialCode}_${item.warehouse}_${item.location}_${item.rack}_${item.status}`
          ),
          (group) => ({
            ..._.pick(group[0], [
              'materialCode',
              'materialDescription',
              'materialDescriptionAlt',
              'partNumber',
              'unit',
              'quantity',
              'warehouse',
              'location',
              'rack',
              'status',
              'price',
              'value',
              'batch',
              'serial',
              'imageURL'
            ]),
            quantity: _.sumBy(group, 'quantity'),
            value: _.sumBy(group, 'value'),
            batchSerials: batchSerials.filter(
              (item) =>
                `${group[0].materialCode}_${group[0].warehouse}_${group[0].location}_${group[0].rack}_${group[0].status}` ===
                `${item.materialCode}_${item.warehouse}_${item.location}_${item.rack}_${item.status}`
            )
          })
        )

        masterUpload({ uploadType: 'Stocks', uploadData: mergedItems }).then((errors) => {
          this.setState({ loader: false, uploadData: [], uploadErrors: errors })
        })
      })
    } else {
      message.error('Please upload stocks')
    }
  }

  onDownloadTemplate = () => {
    const downloadUrl = `${API_URL}/assets/defaultTemplate/Stock_Template.xlsx`
    const a = document.createElement('a')
    a.href = downloadUrl
    a.download = 'Stock_Template'
    a.click()
  }

  render() {
    const columns = [
      { title: 'Material Code', dataIndex: 'materialCode' },
      { title: 'Material Description', dataIndex: 'materialDescription' },
      { title: 'Unit of Measurement', dataIndex: 'unit' },
      { title: 'Quantity', dataIndex: 'quantity' },
      { title: 'Warehouse', dataIndex: 'warehouse' },
      { title: 'Location', dataIndex: 'location' },
      { title: 'Rack', dataIndex: 'rack' },
      { title: 'Status', dataIndex: 'status' },
      { title: 'Price', dataIndex: 'price' },
      { title: 'Value', dataIndex: 'value' },
      { title: 'Batch No', dataIndex: 'batchNo' },
      { title: 'Serial No', dataIndex: 'serialNo' },
      { label: 'Manufacturing Date', value: 'manufacturingDate' },
      { label: 'Expiry Date', value: 'expiryDate' }
    ]

    return (
      <div>
        {this.state.loader && <LoaderBox loader="Uploading in progress, Do not refresh! Please wait.." />}
        {!this.state.loader && (
          <Row justify="center" className="upload-invoice-expense">
            <Col xs={{ span: 23 }} sm={{ span: 23 }} md={{ span: 22 }} lg={{ span: 24 }}>
              <Row>
                {this.state.uploadData.length === 0 && (
                  <Col
                    xs={{ span: 23 }}
                    sm={{ span: 23 }}
                    md={{ span: 12 }}
                    lg={{ span: 12 }}
                    style={{ paddingRight: 10 }}>
                    <UploadArea
                      onUpload={this.onUpload}
                      sheetName="Stocks"
                      label="Click here or drag and drop file here to upload stocks"
                    />
                  </Col>
                )}
                {this.state.uploadData.length === 0 && (
                  <Col xs={{ span: 23 }} sm={{ span: 23 }} md={{ span: 12 }} lg={{ span: 12 }}>
                    <Row>
                      <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 24 }}>
                        {this.state.errorField && (
                          <div
                            style={{ padding: 10, background: '#ffdfdf' }}
                            {...sanitize(this.state.errorField)}
                          />
                        )}
                        {this.state.uploadErrors && (
                          <div style={{ padding: 10 }}>
                            {this.state.uploadErrors.map((v, i) =>
                              Object.keys(v).map((item, i2) => (
                                <Alert
                                  key={`${i}-${i2}`}
                                  message={`LineNo ${item}: ${v[item].join(', ')}`}
                                  type="error"
                                  closable
                                />
                              ))
                            )}
                          </div>
                        )}
                        <div className="upload-invoice-expense-note">
                          <div className="heading">
                            <h2>Note:</h2>
                          </div>
                          <div className="sample-template">
                            <ButtonBox onClick={this.onDownloadTemplate}>
                              <i className="flaticon-download" /> Download Sample Template
                            </ButtonBox>
                          </div>
                        </div>
                      </Col>
                    </Row>
                  </Col>
                )}
                {this.state.uploadData.length > 0 && !this.state.loader && (
                  <Col
                    xs={{ span: 24 }}
                    sm={{ span: 24 }}
                    md={{ span: 24 }}
                    lg={{ span: 24 }}
                    style={{ paddingRight: 10, paddingTop: 20 }}>
                    <div style={{ display: 'inline-table', paddingRight: 10 }}>
                      <ButtonBox onClick={this.onUploadData}>
                        {this.state.loader ? 'Uploading' : 'Upload'}
                      </ButtonBox>
                    </div>
                    <div style={{ display: 'inline-table' }}>
                      <ButtonBox type="default" onClick={() => this.setState({ uploadData: [] })}>
                        Cancel
                      </ButtonBox>
                    </div>
                  </Col>
                )}
                {this.state.uploadData.length > 0 && (
                  <Col
                    xs={{ span: 24 }}
                    sm={{ span: 24 }}
                    md={{ span: 24 }}
                    lg={{ span: 24 }}
                    style={{ marginTop: 20, paddingRight: 10 }}>
                    <TableBox dataSource={this.state.uploadData} columns={columns} />
                  </Col>
                )}
              </Row>
            </Col>
          </Row>
        )}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    userInfo: state.users.userInfo,
    companyInfo: state.users.companyInfo
  }
}

export default connect(mapStateToProps)(UploadStocks)
