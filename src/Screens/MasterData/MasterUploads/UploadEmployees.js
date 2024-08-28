import { Alert, Col, message, Row } from 'antd'
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

class UploadEmployees extends React.Component {
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

  onChangeText = (value, type) => {
    this.setState({ [type]: value })
  }

  onUpload = (header, rowData) => {
    const validateFields = [
      { label: 'First Name', value: 'firstName' },
      { label: 'Last Name', value: 'lastName' },
      { label: 'Role', value: 'role' },
      { label: 'Reporting To', value: 'reportingTo' },
      { label: 'Email', value: 'email' },
      { label: 'Joining Date', value: 'joiningDate' }
    ]
    const rows = []
    let errorField = ''
    rowData.forEach((val, ind) => {
      if (!val.length) {
        return
      }
      const obj = { currentAddress: {}, permanentAddress: {} }
      header.forEach((col, i) => {
        if (col === 'EmployeeNo') {
          obj.employeeNo = val[i]
        } else if (col === 'FirstName') {
          obj.firstName = val[i]
        } else if (col === 'MiddleName') {
          obj.middleName = val[i]
        } else if (col === 'LastName') {
          obj.lastName = val[i]
        } else if (col === 'Role') {
          obj.role = val[i]
        } else if (col === 'ReportingTo(Email)') {
          obj.reportingTo = val[i]
        } else if (col === 'Email') {
          obj.email = val[i]
        } else if (col === 'Phone') {
          obj.phone = val[i]
        } else if (col === 'Designation') {
          obj.designation = val[i]
        } else if (col === 'Department') {
          obj.department = val[i]
        } else if (col === 'location') {
          obj.location = val[i]
        } else if (col === 'Level') {
          obj.level = val[i]
        } else if (col === 'PFNo') {
          obj.pfNo = val[i]
        } else if (col === 'RoleAndResponsibility') {
          obj.roleAndResponsibility = val[i]
        } else if (col === 'CostCenter') {
          obj.costCenter = val[i]
        } else if (col === 'FunctionalArea') {
          obj.functionalArea = val[i]
        } else if (col === 'JoiningDate(YYYY-MM-DD)') {
          obj.joiningDate = val[i]
        } else if (col === 'ExitDate(YYYY-MM-DD)') {
          obj.exitDate = val[i]
        } else if (col === 'SocialID') {
          obj.socialId = val[i]
        } else if (col === 'DOB(YYYY-MM-DD)') {
          obj.dob = val[i]
        } else if (col === 'BloodGroup') {
          obj.bloodGroup = val[i]
        } else if (col === 'DrivingLicenseNo') {
          obj.drivingLicenseNo = val[i]
        } else if (col === 'DrivingLicenseValidTo') {
          obj.drivingLicenseValidTo = val[i]
        } else if (col === 'Nationality') {
          obj.nationality = val[i]
        } else if (col === 'MaritalStatus') {
          obj.maritalStatus = val[i]
        } else if (col === 'Gender') {
          obj.gender = val[i]
        } else if (col === 'PanCardNo') {
          obj.panCardNo = val[i]
        } else if (col === 'AlternateEmail') {
          obj.alternateEmail = val[i]
        } else if (col === 'AlternatePhone') {
          obj.alternatePhone = val[i]
        } else if (col === 'CurrentAddressBuildingNo') {
          obj.currentAddress.buildingNo = val[i]
        } else if (col === 'CurrentAddressStreet') {
          obj.currentAddress.street = val[i]
        } else if (col === 'CurrentAddressAdditionalStreet') {
          obj.currentAddress.additionalStreet = val[i]
        } else if (col === 'CurrentAddressCity') {
          obj.currentAddress.city = val[i]
        } else if (col === 'CurrentAddressState') {
          obj.currentAddress.state = val[i]
        } else if (col === 'CurrentAddressPostalCode') {
          obj.currentAddress.postalCode = val[i]
        } else if (col === 'CurrentAddressCountry') {
          obj.currentAddress.country = val[i]
        } else if (col === 'CurrentAddressNeighbourhood') {
          obj.currentAddress.neighbourhood = val[i]
        } else if (col === 'CurrentAddressAdditionalNo') {
          obj.currentAddress.additionalNo = val[i]
        } else if (col === 'PermanentAddressBuildingNo') {
          obj.permanentAddress.buildingNo = val[i]
        } else if (col === 'PermanentAddressStreet') {
          obj.permanentAddress.street = val[i]
        } else if (col === 'PermanentAddressAdditionalStreet') {
          obj.permanentAddress.additionalStreet = val[i]
        } else if (col === 'PermanentAddressCity') {
          obj.permanentAddress.city = val[i]
        } else if (col === 'PermanentAddressState') {
          obj.permanentAddress.state = val[i]
        } else if (col === 'PermanentAddressPostalCode') {
          obj.permanentAddress.postalCode = val[i]
        } else if (col === 'PermanentAddressCountry') {
          obj.permanentAddress.country = val[i]
        } else if (col === 'PermanentAddressNeighbourhood') {
          obj.permanentAddress.neighbourhood = val[i]
        } else if (col === 'PermanentAddressAdditionalNo') {
          obj.permanentAddress.additionalNo = val[i]
        } else if (col === 'PassportNo') {
          obj.passportNo = val[i]
        } else if (col === 'NameAsPassport') {
          obj.nameAsPassport = val[i]
        } else if (col === 'PassportIssuedCountry') {
          obj.passportIssuedCountry = val[i]
        } else if (col === 'PassportValidFrom') {
          obj.passportValidFrom = val[i]
        } else if (col === 'PassportValidTo') {
          obj.passportValidTo = val[i]
        } else if (col === 'VisaHeldForCountry') {
          obj.visaHeldForCountry = val[i]
        } else if (col === 'TypeOfVisa') {
          obj.typeOfVisa = val[i]
        } else if (col === 'TypeOfVisaEntry') {
          obj.typeOfVisaEntry = val[i]
        } else if (col === 'VisaValidFrom') {
          obj.visaValidFrom = val[i]
        } else if (col === 'VisaValidTo') {
          obj.visaValidTo = val[i]
        }

        obj.name = `${obj.firstName} ${obj.middleName || ''} ${obj.lastName} `.replace(/\s+/g, ' ').trim()
      })
      obj.status = 'InActive'
      validateFields.forEach((field) => {
        if (!obj[field.value]) {
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
        masterUpload({ uploadType: 'Employees', uploadData }).then((errors) => {
          this.setState({ loader: false, uploadData: [], uploadErrors: errors })
        })
      })
    } else {
      message.error('Please upload employees')
    }
  }

  onDowloadTemplate = () => {
    const dowloadUrl = `${API_URL}/assets/defaultTemplate/Employees_Template.xlsx`
    const a = document.createElement('a')
    a.href = dowloadUrl
    a.download = 'Employees_Template'
    a.click()
  }

  render() {
    const columns = [
      {
        title: 'EmployeeNo',
        dataIndex: 'employeeNo'
      },
      {
        title: 'Name',
        dataIndex: 'name'
      },
      {
        title: 'Role',
        dataIndex: 'role'
      },
      {
        title: 'Reporting To',
        dataIndex: 'reportingTo'
      },
      {
        title: 'Email',
        dataIndex: 'email'
      },
      {
        title: 'Joining Date',
        dataIndex: 'joiningDate'
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
                      sheetName="Employees"
                      label="Click here or drag and drop file here to upload employees"
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
                        {this.state.errorField && (
                          <div
                            style={{ padding: 10, background: '#ffdfdf' }}
                            {...sanitize(this.state.errorField)}
                          />
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
                            <li>Upload employee not exists in employees</li>
                            <li>Add Role name exists in roles</li>
                            <li>
                              Add ReportingTo email id exits in employees or same email for both ReportingTo
                              and Email column
                            </li>
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

export default connect(mapStateToProps)(UploadEmployees)
