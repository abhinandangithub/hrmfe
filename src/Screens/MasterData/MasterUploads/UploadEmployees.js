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

  assignNewMap = (rowData) => {
    const finalObj = {
      result: [],
      errorField: ''
    }
    const validateFields = [
      { label: 'EmployeeNo', value: 'employeeNo', required: true },
      { label: 'UniqueId', value: 'uniqueId', required: true },
      { label: 'Email', value: 'email', required: true },
      { label: 'Hire Date', value: 'hireDate', required: true },
      { label: 'Original Hire Date', value: 'originalHireDate', required: true },
      { label: 'Exit Date', value: 'exitDate' },
      { label: 'Title', value: 'title', required: true },
      { label: 'FirstName', value: 'firstName', required: true },
      { label: 'MiddleName', value: 'middleName' },
      { label: 'LastName', value: 'lastName', required: true },
      { label: 'Valid From', value: 'validFrom', required: true },
      { label: 'Valid To', value: 'validTo', required: true },
      { label: 'Contract Type', value: 'contractType', required: true }
    ]
    const [header = []] = rowData || []

    const finalResult = []
    let errorField = ''

    if (header.length > 0) {
      if (rowData.length > 1) {
        rowData.shift()

        rowData.forEach((val, ind) => {
          const assignObj = {}
          header.forEach((col, i) => {
            const findHed = validateFields.find((x) => x.label === col)
            if (findHed) {
              assignObj[findHed.value] = val[i]
              if (!val[i]) {
                if (findHed.required) {
                  console.log('-')
                  errorField += `<div>${findHed.label} missing in line ${ind + 1}!</div>`
                } else {
                  assignObj[findHed.value] = ''
                }
              }
            } else {
              errorField += `<div>${col} missing in line ${ind + 1}!</div>`
            }
          })
          finalResult.push(assignObj)
        })
      }
    }
    finalObj.errorField = errorField
    finalObj.result = finalResult
    return finalObj
  }

  onUpload = (rowData) => {
    const ObjectKey = Object.keys(rowData)
    let rowList = {}
    ObjectKey.map((x) => {
      switch (x) {
        case 'Hire': {
          const finalesult = this.assignNewMap(rowData.Hire)
          rowList = {
            ...rowList,
            HIRE: finalesult.result
          }

          break
        }

        default:
          break
      }
    })
    console.log('rowList', rowList)
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
                      sheetName="Hire"
                      label="Click here or drag and drop file here to upload employees"
                      multiple
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
