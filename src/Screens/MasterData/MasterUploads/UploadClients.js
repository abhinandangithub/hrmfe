import { Alert, Col, message, Row } from 'antd'
import { getIn } from 'formik'
import React from 'react'
import { connect } from 'react-redux'
import { masterUpload } from '../../../Actions/UserAction'
import ButtonBox from '../../../Components/ButtonBox/ButtonBox'
import LoaderBox from '../../../Components/LoaderBox/LoaderBox'
import TableBox from '../../../Components/TableBox/TableBox'
import AppConfig from '../../../config'
import { BUSINESS_TYPE_OPTIONS, CLIENT_TYPE_OPTIONS } from '../../../Util/Options'
import { sanitize } from '../../../Util/Util'
import UploadArea from './UploadArea'

const { API_URL } = AppConfig

class UploadClients extends React.Component {
  constructor() {
    super()
    this.state = {
      uploadData: [],
      // kind: '',
      errorField: false,
      uploadErrors: [],
      loader: false
    }
  }

  onUpload = (header, rowData) => {
    const validateFields = [
      { label: 'Name', value: 'name' },
      { label: 'Type', value: 'type' },
      { label: 'Currency', value: 'currency' }
    ]
    const optionTypes = CLIENT_TYPE_OPTIONS.map((val) => val.value)
    const rows = []
    let errorField = ''
    rowData.forEach((val, ind) => {
      if (!val.length) {
        return
      }
      const obj = { contactPersons: [] }
      const contactPersons = {}
      const shippingAddress = {}
      const billingAddress = {}
      header.forEach((col, i) => {
        if (col === 'Name') {
          obj.name = val[i]
        } else if (col === 'NameAlt') {
          obj.nameAlt = val[i]
        } else if (col === 'Type') {
          obj.type = val[i]
        } else if (col === 'BusinessType') {
          obj.businessType = val[i]
        } else if (col === 'Currency') {
          obj.currency = val[i]
        } else if (col === 'TaxNo') {
          obj.taxNo = val[i]
        } else if (col === 'TaxNoAlt') {
          obj.taxNoAlt = val[i]
        } else if (col === 'CrNo') {
          obj.crNo = val[i]
        } else if (col === 'CrNoAlt') {
          obj.crNoAlt = val[i]
        } else if (col === 'ShippingBuildingNo') {
          shippingAddress.buildingNo = val[i]
        } else if (col === 'ShippingStreet') {
          shippingAddress.street = val[i]
        } else if (col === 'ShippingAdditionalStreet') {
          shippingAddress.additionalStreet = val[i]
        } else if (col === 'ShippingCity') {
          shippingAddress.city = val[i]
        } else if (col === 'ShippingState') {
          shippingAddress.state = val[i]
        } else if (col === 'ShippingPostalCode') {
          shippingAddress.postalCode = val[i]
        } else if (col === 'ShippingCountry') {
          shippingAddress.country = val[i]
        } else if (col === 'ShippingAdditionalNo') {
          shippingAddress.additionalNo = val[i]
        } else if (col === 'ShippingNeighbourhood') {
          shippingAddress.neighbourhood = val[i]
        } else if (col === 'ShippingBuildingNoAlt') {
          shippingAddress.buildingNoAlt = val[i]
        } else if (col === 'ShippingStreetAlt') {
          shippingAddress.streetAlt = val[i]
        } else if (col === 'ShippingAdditionalStreetAlt') {
          shippingAddress.additionalStreetAlt = val[i]
        } else if (col === 'ShippingCityAlt') {
          shippingAddress.cityAlt = val[i]
        } else if (col === 'ShippingStateAlt') {
          shippingAddress.stateAlt = val[i]
        } else if (col === 'ShippingPostalCodeAlt') {
          shippingAddress.postalCodeAlt = val[i]
        } else if (col === 'ShippingCountryAlt') {
          shippingAddress.countryAlt = val[i]
        } else if (col === 'ShippingAdditionalNoAlt') {
          shippingAddress.additionalNoAlt = val[i]
        } else if (col === 'ShippingNeighbourhoodAlt') {
          shippingAddress.neighbourhoodAlt = val[i]
        } else if (col === 'BillingBuildingNo') {
          billingAddress.buildingNo = val[i]
        } else if (col === 'BillingStreet') {
          billingAddress.street = val[i]
        } else if (col === 'BillingAdditionalStreet') {
          billingAddress.additionalStreet = val[i]
        } else if (col === 'BillingCity') {
          billingAddress.city = val[i]
        } else if (col === 'BillingState') {
          billingAddress.state = val[i]
        } else if (col === 'BillingPostalCode') {
          billingAddress.postalCode = val[i]
        } else if (col === 'BillingCountry') {
          billingAddress.country = val[i]
        } else if (col === 'BillingAdditionalNo') {
          billingAddress.additionalNo = val[i]
        } else if (col === 'BillingNeighbourhood') {
          billingAddress.neighbourhood = val[i]
        } else if (col === 'BillingStreetAlt') {
          billingAddress.streetAlt = val[i]
        } else if (col === 'BillingCityAlt') {
          billingAddress.cityAlt = val[i]
        } else if (col === 'BillingStateAlt') {
          billingAddress.stateAlt = val[i]
        } else if (col === 'BillingPostalCodeAlt') {
          billingAddress.postalCodeAlt = val[i]
        } else if (col === 'BillingCountryAlt') {
          billingAddress.countryAlt = val[i]
        } else if (col === 'BillingAdditionalNoAlt') {
          billingAddress.additionalNoAlt = val[i]
        } else if (col === 'BillingNeighbourhoodAlt') {
          billingAddress.neighbourhoodAlt = val[i]
        } else if (col === 'ContactPersonName') {
          contactPersons.contactName = val[i]
        } else if (col === 'ContactPersonEmail') {
          contactPersons.contactEmail = val[i]
        } else if (col === 'ContactPersonPhone') {
          contactPersons.contactPhone = val[i]
        } else if (col === 'PaymentTerm(Days)') {
          obj.paymentTerm = val[i]
        } else if (col === 'DefaultDiscount(%)') {
          obj.discount = val[i]
        } else if (col === 'PaymentType') {
          obj.paymentType = val[i]
        } else if (col === 'Notes') {
          obj.notes = val[i]
        } else if (col === 'ClientNo') {
          obj.clientNo = val[i]
        } else if (col === 'Account') {
          obj.account = val[i]
        } else if (col === 'AddClientToAccount') {
          obj.addClientToAccount = val[i]
        }
      })
      obj.contactPersons.push(contactPersons)
      obj.shippingAddress = shippingAddress
      obj.billingAddress = billingAddress
      validateFields.forEach((field) => {
        if (!getIn(obj, field.value)) {
          errorField += `<div>${field.label} missing in line ${ind + 1}!</div>`
        } else if (field.value === 'type') {
          if (optionTypes.indexOf(obj[field.value]) === -1) {
            errorField += `<div>Invalid Type in line ${ind + 1}!</div>`
          }
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
        masterUpload({ uploadType: 'Clients', uploadData }).then((errors) => {
          this.setState({ loader: false, uploadData: [], uploadErrors: errors })
        })
      })
    } else {
      message.error('Please upload clients')
    }
  }

  onDowloadTemplate = () => {
    const dowloadUrl = `${API_URL}/assets/defaultTemplate/Clients_Template.xlsx`
    const a = document.createElement('a')
    a.href = dowloadUrl
    a.download = 'Clients_Template'
    a.click()
  }

  render() {
    const columns = [
      {
        title: 'Name',
        dataIndex: 'name'
      },
      {
        title: 'Type',
        dataIndex: 'type'
      },
      {
        title: 'Currency',
        dataIndex: 'currency'
      },
      {
        title: 'Contact Name',
        dataIndex: 'contactPersons',
        render: (contactPersons) => contactPersons[0].contactName
      },
      {
        title: 'Contact Email',
        dataIndex: 'contactPersons',
        render: (contactPersons) => contactPersons[0].contactEmail
      },
      {
        title: 'Contact Phone',
        dataIndex: 'contactPersons',
        render: (contactPersons) => contactPersons[0].contactPhone
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
                      sheetName="Clients"
                      label="Click here or drag and drop file here to upload clients"
                    />
                    {this.state.errorField && (
                      <div
                        style={{ padding: 10, background: '#ffdfdf' }}
                        {...sanitize(this.state.errorField)}
                      />
                    )}
                    {this.state.uploadErrors && (
                      <div style={{ paddingTop: 10 }}>
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
                  </Col>
                )}
                {this.state.uploadData.length === 0 && (
                  <Col xs={{ span: 23 }} sm={{ span: 23 }} md={{ span: 12 }} lg={{ span: 12 }}>
                    <Row>
                      <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 24 }}>
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
                            <li>Upload client not exists in clients</li>
                            <li>Available Types:</li>
                            <ul>
                              {CLIENT_TYPE_OPTIONS.map((val, i) => (
                                <li key={i}>{val.value}</li>
                              ))}
                            </ul>
                            <li>Business Types:</li>
                            <ul>
                              {BUSINESS_TYPE_OPTIONS.map((val, i) => (
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

export default connect(mapStateToProps)(UploadClients)
