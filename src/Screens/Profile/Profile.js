import { Checkbox, Col, Row } from 'antd'
import React from 'react'
import { connect } from 'react-redux'
import InputBox from '../../Components/InputBox/InputBox'
import { avatarLetter } from '../../Util/Util'
import './Profile.scss'
import ProfileNavigation from './ProfileNavigation'

function onChange(e) {
  console.log(`checked = ${e.target.checked}`)
}

class Profile extends React.Component {
  constructor() {
    super()
    this.state = {
      // open: false,
      // timezone: '',
      // timezoneList: []
    }
  }

  onChangeText = (value, type) => {
    this.setState({ [type]: value })
  }

  render() {
    return (
      <div className="inner-contents">
        <Row justify="center">
          <Col xs={{ span: 23 }} sm={{ span: 23 }} md={{ span: 22 }} lg={{ span: 18 }}>
            <Row justify="center" gutter={[20, 20]}>
              <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6 }} lg={{ span: 6 }}>
                <ProfileNavigation {...this.props} />
              </Col>
              <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 18 }} lg={{ span: 18 }}>
                <section className="user-profile">
                  <div className="top-title-section">
                    <h2>Your Basic Info</h2>
                  </div>
                  <hr />
                  <div className="profile-field">
                    <div className="column-3">
                      <label>Name</label>
                    </div>
                    <div className="column-6">
                      <InputBox id="name" value={this.props.userInfo.name} onChangeText={this.onChangeText} />
                    </div>
                  </div>
                  <div className="profile-field">
                    <div className="column-3">
                      <label>Work Email</label>
                    </div>
                    <div className="column-6">
                      <InputBox
                        id="workEmail"
                        value={this.props.userInfo.email}
                        onChangeText={this.onChangeText}
                      />
                    </div>
                  </div>
                  <div className="profile-field">
                    <div className="column-3">
                      <label>Phone Number</label>
                    </div>
                    <div className="column-6">
                      <InputBox id="phoneNumber" onChangeText={this.onChangeText} />
                    </div>
                  </div>
                  <hr />
                  <div className="profile-field">
                    <div className="column-3">
                      <label>Role</label>
                    </div>
                    <div className="column-6">
                      <InputBox
                        id="role"
                        value={
                          this.props.userInfo.roleData ? this.props.userInfo.roleData.name : 'Client Admin'
                        }
                        onChangeText={this.onChangeText}
                      />
                    </div>
                  </div>
                  <hr />
                  {/* <div className="profile-field">
                                            <div className="column-3">
                                                <label>Timezone </label>
                                            </div>
                                            <div className="column-6">
                                                <SelectBox refs={(ref) => this.timezone = ref} id="timezone" value={this.state.timezone} options={this.state.timezoneList} onChangeText={this.onChangeText} />
                                            </div>
                                        </div> */}
                  <div className="profile-field">
                    <div className="column-3">
                      <label>Photo </label>
                    </div>
                    <div className="column">
                      <div className="profile-name">
                        <span>{avatarLetter(this.props.userInfo.name)}</span>
                      </div>
                      {/* <div className="profile-image">
                                                    <img src={import('../../assets/images/profile-pic.png')} alt="Profile Picture" />
                                                </div> */}
                      <div className="remove-pic">
                        <Checkbox onChange={onChange}>Remove photo</Checkbox>
                      </div>
                      <div className="upload-image">
                        {/* <Upload previewFile fileList={attachmentList} onRemove={this.deleteAttachment} action={null} onDownload={this.downloadFile} onChange={this.onFileChange}>
                                                    <Button icon={<UploadOutlined />}>Browse</Button>
                                                </Upload> */}
                        <div className="form-field-notes">Suggested size: 100x100</div>
                      </div>
                    </div>
                  </div>
                  {/* <hr />
                                        <div className="action-buttons">
                                            <button className="pds-button pds-button-success">Update Info</button>
                                            <button className="pds-button pds-button-secondary">Cancel</button>
                                        </div> */}
                </section>
              </Col>
            </Row>
          </Col>
        </Row>
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

export default connect(mapStateToProps)(Profile)
