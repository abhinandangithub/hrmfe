import { Alert, Col, message, Row, Table } from 'antd'
import React from 'react'
import { connect } from 'react-redux'
import { masterUpload } from '../../../Actions/UserAction'
import ButtonBox from '../../../Components/ButtonBox/ButtonBox'
import LoaderBox from '../../../Components/LoaderBox/LoaderBox'
import AppConfig from '../../../config'
import { sanitize } from '../../../Util/Util'
import UploadArea from './UploadArea'

const { API_URL } = AppConfig

class UploadChartOfAccounts extends React.Component {
  constructor() {
    super()
    this.state = {
      uploadData: [],
      errorField: false,
      uploadErrors: [],
      loader: false
    }
  }

  onUpload = (header, rowData) => {
    const rows = []
    rowData.forEach((val) => {
      const obj = { access: [] }
      header.forEach((col, i) => {
        if (col === 'Account') {
          obj.code = parseFloat(val[i])
        } else if (col === 'ParentAccount') {
          obj.parentId = parseFloat(val[i])
        } else if (col === 'ClientAccount') {
          obj.accountCode = val[i]
        } else if (col === 'Name') {
          obj.name = val[i]
        } else if (col === 'AddButton') {
          obj.addAccess = parseFloat(val[i]) === 1 ? 'Yes' : 'No'
        }

        const parentData = rows.find((v) => v.code === obj.parentId)
        obj.parentNodes = parentData ? [...parentData.parentNodes, parentData.code] : []
        obj.level = obj.parentNodes.length + 1
        obj.status = 'Active'
      })
      rows.push(obj)
    })
    const uploadData = rows.map((v) => {
      v.hasChild = rows.find((f) => f.parentNodes.includes(v.code)) ? 'Yes' : 'No'

      return v
    })
    this.setState({ uploadData })
  }

  onUploadData = () => {
    const { uploadData, loader } = this.state

    if (uploadData.length > 0 && !loader) {
      this.setState({ loader: true }, () => {
        masterUpload({ uploadType: 'ChartOfAccounts', uploadData }).then((errors) => {
          this.setState({ loader: false, uploadData: [], uploadErrors: errors })
        })
      })
    } else {
      message.error('Please upload chart of accounts')
    }
  }

  onDowloadTemplate = () => {
    const dowloadUrl = `${API_URL}/assets/defaultTemplate/Chart_Of_Accounts_Template.xlsx`
    const a = document.createElement('a')
    a.href = dowloadUrl
    a.download = 'Chart_Of_Accounts_Template'
    a.click()
  }

  render() {
    const columns = [
      {
        title: 'Account',
        dataIndex: 'code'
      },
      {
        title: 'Parent',
        dataIndex: 'parentId'
      },
      {
        title: 'Client Account',
        dataIndex: 'accountCode'
      },
      {
        title: 'Account',
        dataIndex: 'code'
      },
      {
        title: 'Name',
        dataIndex: 'name'
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
                      sheetName="ChartOfAccounts"
                      label="Click here or drag and drop file here to upload chart of accounts"
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
                          <ul />
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
                    <div className="custom-table">
                      <Table
                        dataSource={this.state.uploadData}
                        columns={columns}
                        pagination={{ position: ['bottomCenter'] }}
                      />
                    </div>
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

export default connect(mapStateToProps)(UploadChartOfAccounts)
