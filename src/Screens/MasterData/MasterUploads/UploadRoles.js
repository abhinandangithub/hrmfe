import { Alert, Col, message, Row } from 'antd'
import React from 'react'
import { connect } from 'react-redux'
import { masterUpload } from '../../../Actions/UserAction'
import ButtonBox from '../../../Components/ButtonBox/ButtonBox'
import LoaderBox from '../../../Components/LoaderBox/LoaderBox'
import TableBox from '../../../Components/TableBox/TableBox'
import AppConfig from '../../../config'
import { ACCESS_ARR } from '../../../Util/Options'
import { sanitize } from '../../../Util/Util'
import UploadArea from './UploadArea'

const { API_URL } = AppConfig

class UploadRoles extends React.Component {
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
      if (!val.length) {
        return
      }
      const obj = { access: [] }
      header.forEach((col, i) => {
        if (col === 'Name') {
          obj.name = val[i]
        } else if (ACCESS_ARR.indexOf(col) >= 0 && parseFloat(val[i]) === 1) {
          obj.access.push(col)
        }
      })
      rows.push(obj)
    })
    this.setState({ uploadData: rows })
  }

  onUploadData = () => {
    const { uploadData, loader } = this.state

    if (uploadData.length > 0 && !loader) {
      this.setState({ loader: true }, () => {
        masterUpload({ uploadType: 'Roles', uploadData }).then((errors) => {
          this.setState({ loader: false, uploadData: [], uploadErrors: errors })
        })
      })
    } else {
      message.error('Please upload roles')
    }
  }

  onDowloadTemplate = () => {
    const dowloadUrl = `${API_URL}/assets/defaultTemplate/Roles_Template.xlsx`
    const a = document.createElement('a')
    a.href = dowloadUrl
    a.download = 'Roles_Template'
    a.click()
  }

  render() {
    const columns = [
      {
        title: 'Role',
        dataIndex: 'name'
      },
      {
        title: 'Access',
        dataIndex: 'access',
        render: (v) => (v ? v.join(', ') : '')
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
                      sheetName="Roles"
                      label="Click here or drag and drop file here to upload roles"
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
                        {/* {this.state.errorField && (
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
                        )} */}
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
                            <li>Upload role not exists in roles</li>
                            <li>Use 1 and 0 to give permission to role </li>
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

export default connect(mapStateToProps)(UploadRoles)
