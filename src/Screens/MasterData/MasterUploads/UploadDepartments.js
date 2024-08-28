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

class UploadDepartments extends React.Component {
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
      { label: 'Name', value: 'name' },
      { label: 'ShortName', value: 'shortName' },
      { label: 'VAT', value: 'vat' },
      { label: 'Currency', value: 'currency' },
      { label: 'ContactPerson', value: 'contactPerson' },
      { label: 'Phone', value: 'phone' },
      { label: 'Email', value: 'email' },
      { label: 'ExpenseInvoiceApprover', value: 'expenseInvoiceApprover' },
      { label: 'IncomeInvoiceApprover', value: 'incomeInvoiceApprover' }
    ]
    const rows = []
    let errorField = ''
    rowData.forEach((val, ind) => {
      const obj = {}
      header.forEach((col, i) => {
        if (col === 'Name') {
          obj.name = val[i]
        } else if (col === 'ShortName') {
          obj.shortName = val[i]
        } else if (col === 'VAT') {
          obj.vat = val[i]
        } else if (col === 'Currency') {
          obj.currency = val[i]
        } else if (col === 'Street') {
          obj.street = val[i]
        } else if (col === 'City') {
          obj.city = val[i]
        } else if (col === 'State') {
          obj.state = val[i]
        } else if (col === 'PostalCode') {
          obj.postalCode = val[i]
        } else if (col === 'Country') {
          obj.country = val[i]
        } else if (col === 'ContactPerson') {
          obj.contactPerson = val[i]
        } else if (col === 'Phone') {
          obj.phone = val[i]
        } else if (col === 'Email') {
          obj.email = val[i]
        } else if (col === 'Bank') {
          obj.bank = val[i]
        } else if (col === 'BankAccount') {
          obj.bankAccount = val[i]
        } else if (col === 'Swift') {
          obj.bankSwift = val[i]
        } else if (col === 'InvoiceNoFormat') {
          obj.invoiceNoFormat = val[i]
        } else if (col === 'ProformaNoFormat') {
          obj.proformaNoFormat = val[i]
        } else if (col === 'InterCompanyNoFormat') {
          obj.interCompanyNoFormat = val[i]
        } else if (col === 'CreditNotesNoFormat') {
          obj.creditNotesNoFormat = val[i]
        } else if (col === 'Signature') {
          obj.signature = val[i]
        } else if (col === 'ExpenseInvoiceApprover') {
          obj.expenseInvoiceApprover = val[i]
        } else if (col === 'IncomeInvoiceApprover') {
          obj.incomeInvoiceApprover = val[i]
        }
      })
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
        masterUpload({ uploadType: 'Departments', uploadData }).then((errors) => {
          this.setState({ loader: false, uploadData: [], uploadErrors: errors })
        })
      })
    } else {
      message.error('Please upload departments')
    }
  }

  onDowloadTemplate = () => {
    const dowloadUrl = `${API_URL}/assets/defaultTemplate/Departments_Template.xlsx`
    const a = document.createElement('a')
    a.href = dowloadUrl
    a.download = 'Departments_Template'
    a.click()
  }

  render() {
    const columns = [
      {
        title: 'Name',
        dataIndex: 'name'
      },
      {
        title: 'Short Name',
        dataIndex: 'shortName'
      },
      {
        title: 'VAT',
        dataIndex: 'vat'
      },
      {
        title: 'Currency',
        dataIndex: 'currency'
      },
      {
        title: 'Phone',
        dataIndex: 'phone'
      },
      {
        title: 'Email',
        dataIndex: 'email'
      },
      {
        title: 'Income Invoice Approver',
        dataIndex: 'incomeInvoiceApprover'
      },
      {
        title: 'Expense Invoice Approver',
        dataIndex: 'expenseInvoiceApprover'
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
                      sheetName="Departments"
                      label="Click here or drag and drop file here to upload departments"
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
                            <li>Upload client not exists in departments</li>
                            <li>Add Expense Invoice Approver name exists in user</li>
                            <li>Add Income Invoice Approver name exists in user</li>
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

export default connect(mapStateToProps)(UploadDepartments)
