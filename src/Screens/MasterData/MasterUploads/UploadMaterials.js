import { Alert, Col, message, Row } from 'antd'
import { getIn } from 'formik'
import React from 'react'
import { connect } from 'react-redux'
import { getOptionsByType, getWarehouseCodes, masterUpload } from '../../../Actions/UserAction'
import ButtonBox from '../../../Components/ButtonBox/ButtonBox'
import LoaderBox from '../../../Components/LoaderBox/LoaderBox'
import TableBox from '../../../Components/TableBox/TableBox'
import AppConfig from '../../../config'
import apiClient from '../../../Util/apiClient'
import { sanitize } from '../../../Util/Util'
import UploadArea from './UploadArea'

const { API_URL } = AppConfig

class UploadMaterials extends React.Component {
  constructor() {
    super()
    this.state = {
      uploadData: [],
      errorField: false,
      loader: false,
      materialTypes: [],
      materialGroups: [],
      divisions: [],
      units: [],
      costingTypes: [],
      warehouses: [],
      materialAttributes: [],
      uploadErrors: []
    }
  }

  componentDidMount() {
    getOptionsByType({
      type: ['MaterialType', 'MaterialGroup', 'UnitOfMeasurement', 'CostingType', 'MaterialAttribute']
    }).then(
      ({
        MaterialType = [],
        MaterialGroup = [],
        UnitOfMeasurement = [],
        CostingType = [],
        MaterialAttribute = []
      }) => {
        this.setState({
          materialTypes: MaterialType,
          materialGroups: MaterialGroup,
          units: UnitOfMeasurement,
          costingTypes: CostingType,
          materialAttributes: MaterialAttribute
        })
      }
    )

    getWarehouseCodes().then((data) => {
      this.setState({ warehouses: data })
    })

    if (this.props.companyInfo?.configurations?.division === 'Yes') {
      apiClient.get('divisions/get-by-user').then(({ data }) => {
        if (data && data.result) {
          this.setState({ divisions: data.result })
        }
      })
    }
  }

  onUpload = (header, rowData) => {
    const validateFields = [
      { label: 'Material Code', value: 'basic.materialCode' },
      { label: 'Material Description', value: 'basic.materialDescription' },
      { label: 'Material Type', value: 'basic.materialType' },
      { label: 'Material Group', value: 'basic.materialGroup' },
      ...(this.props.companyInfo?.configurations?.division === 'Yes'
        ? [{ label: 'Division', value: 'basic.division' }]
        : []),
      { label: 'UOM', value: 'basic.unit' },
      { label: 'Purchase UOM', value: 'stockInfo.purchaseUnit' },
      { label: 'Sales UOM', value: 'stockInfo.salesUnit' },
      { label: 'Sales Price', value: 'stockInfo.purchasePrice' },
      { label: 'Purchase Price', value: 'stockInfo.salesPrice' },
      { label: 'Costing Type', value: 'costInfo.type' },
      { label: 'Standard Cost', value: 'costInfo.cost' },
      { label: 'Moving Avg. Cost', value: 'costInfo.movingCost' },
      { label: 'Stock account (Local)', value: 'materialAccounts.stockAccountLocal' },
      { label: 'Stock account (Foreign)', value: 'materialAccounts.stockAccountForeign' },
      { label: 'Cogs account (Local)', value: 'materialAccounts.cogsAccountLocal' },
      { label: 'Cogs account (Foreign)', value: 'materialAccounts.cogsAccountForeign' }
    ]
    const rows = []
    let errorField = ''
    rowData.forEach((val, ind) => {
      const obj = { basic: {}, materialAccounts: {}, stockInfo: {}, costInfo: {} }
      header.forEach((col, i) => {
        switch (col) {
          case 'Material Code':
            obj.basic.materialCode = val[i]
            break
          case 'Material Description':
            obj.basic.materialDescription = val[i]
            break
          case 'Material Type':
            obj.basic.materialType = val[i]
            break
          case 'Material Group':
            obj.basic.materialGroup = val[i]
            break
          case 'Division':
            obj.basic.division = val[i]
            break
          case 'UOM':
            obj.basic.unit = val[i]
            break
          case 'Purchase UOM':
            obj.stockInfo.purchaseUnit = val[i]
            break
          case 'Sales UOM':
            obj.stockInfo.salesUnit = val[i]
            break
          case 'Sales Price':
            obj.stockInfo.purchasePrice = val[i]
            break
          case 'Purchase Price':
            obj.stockInfo.salesPrice = val[i]
            break
          case 'Costing Type':
            obj.costInfo.type = val[i]
            break
          case 'Standard Cost':
            obj.costInfo.cost = val[i]
            break
          case 'Moving Avg. Cost':
            obj.costInfo.movingCost = val[i]
            break
          case 'Default WH':
            obj.stockInfo.defaultWarehouse = val[i]
            break
          case 'Batch':
            obj.basic.batch = val[i] === 'Yes'
            break
          case 'Serial':
            obj.basic.serial = val[i] === 'Yes'
            break
          case 'Strength':
            obj.basic.strength = val[i]
            break
          case 'Strength Unit':
            obj.basic.strengthUnit = val[i]
            break
          case 'Material Attribute':
            obj.basic.attribute = val[i]
            break
          case 'Shelf Life':
            obj.basic.shelfLife = val[i]
            break
          case 'Shelf Life Unit':
            obj.basic.shelfLifeUnit = val[i]
            break
          case 'Notes':
            obj.basic.notes = val[i]
            break
          case 'Conditions':
            obj.basic.conditions = val[i]
            break
          case 'Stock account (Local)':
            obj.materialAccounts.stockAccountLocal = val[i]
            break
          case 'Stock account (Foreign)':
            obj.materialAccounts.stockAccountForeign = val[i]
            break
          case 'Cogs account (Local)':
            obj.materialAccounts.cogsAccountLocal = val[i]
            break
          case 'Cogs account (Foreign)':
            obj.materialAccounts.cogsAccountForeign = val[i]
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
        masterUpload({ uploadType: 'Materials', uploadData }).then((errors) => {
          this.setState({ loader: false, uploadData: [], uploadErrors: errors })
        })
      })
    } else {
      message.error('Please upload materials')
    }
  }

  onDowloadTemplate = () => {
    const dowloadUrl = `${API_URL}/assets/defaultTemplate/Material_Template.xlsx`
    const a = document.createElement('a')
    a.href = dowloadUrl
    a.download = 'Material_Template'
    a.click()
  }

  render() {
    const columns = [
      { title: 'Material Code', dataIndex: 'basic', render: (basic) => basic.materialCode },
      { title: 'Material Description', dataIndex: 'basic', render: (basic) => basic.materialDescription },
      { title: 'Material Type', dataIndex: 'basic', render: (basic) => basic.materialType },
      { title: 'Material Group', dataIndex: 'basic', render: (basic) => basic.materialGroup },
      {
        ...(this.props.companyInfo?.configurations?.division === 'Yes' && {
          title: 'Division',
          dataIndex: 'basic',
          render: (basic) => basic.division
        })
      },
      { title: 'UOM', dataIndex: 'basic', render: (basic) => basic.unit },
      {
        title: 'Purchase UOM',
        dataIndex: 'stockInfo',
        render: (stockInfo) => stockInfo.purchaseUnit
      },
      { title: 'Sales UOM', dataIndex: 'stockInfo', render: (stockInfo) => stockInfo.salesUnit },
      {
        title: 'Sales Price',
        dataIndex: 'stockInfo',
        render: (stockInfo) => stockInfo.purchasePrice
      },
      {
        title: 'Purchase Price',
        dataIndex: 'stockInfo',
        render: (stockInfo) => stockInfo.salesPrice
      },
      { title: 'Costing Type', dataIndex: 'costInfo', render: (costInfo) => costInfo.type },
      { title: 'Standard Cost', dataIndex: 'costInfo', render: (costInfo) => costInfo.cost },
      {
        title: 'Moving Avg. Cost',
        dataIndex: 'costInfo',
        render: (costInfo) => costInfo.movingCost
      },
      {
        title: 'Default WH',
        dataIndex: 'stockInfo',
        render: (stockInfo) => stockInfo.defaultWarehouse
      }
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
                      sheetName="Materials"
                      label="Click here or drag and drop file here to upload materials"
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
                            <ButtonBox onClick={this.onDowloadTemplate}>
                              <i className="flaticon-download" /> Download Sample Template
                            </ButtonBox>
                          </div>
                          <ul>
                            <li>Upload material not exists in materials</li>
                            <li>Available Material Types:</li>
                            <ul>
                              {this.state.materialTypes.map((val, i) => (
                                <li key={i}>{val.value}</li>
                              ))}
                            </ul>
                            <li>Available Material Groups:</li>
                            <ul>
                              {this.state.materialGroups.map((val, i) => (
                                <li key={i}>{val.value}</li>
                              ))}
                            </ul>
                            {this.props.companyInfo?.configurations?.division === 'Yes' && (
                              <>
                                <li>Available Divisions:</li>
                                <ul>
                                  {this.state.divisions.map((val, i) => (
                                    <li key={i}>{val.name}</li>
                                  ))}
                                </ul>
                              </>
                            )}
                            <li>Available UOM/ Purchase UOM/ Sales UOM/ Strength Unit/ Shelf Life Unit:</li>
                            <ul>
                              {this.state.units.map((val, i) => (
                                <li key={i}>{val.value}</li>
                              ))}
                            </ul>
                            <li>Available Costing Types:</li>
                            <ul>
                              {this.state.costingTypes.map((val, i) => (
                                <li key={i}>{val.value}</li>
                              ))}
                            </ul>
                            <li>Available Warehouses:</li>
                            <ul>
                              {this.state.warehouses.map((val, i) => (
                                <li key={i}>{val.value}</li>
                              ))}
                            </ul>
                            <li>Available Material Attributes:</li>
                            <ul>
                              {this.state.materialAttributes.map((val, i) => (
                                <li key={i}>{val.value}</li>
                              ))}
                            </ul>
                          </ul>
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

export default connect(mapStateToProps)(UploadMaterials)
