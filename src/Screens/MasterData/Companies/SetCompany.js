import { Col, Layout, Radio, Row, Space } from 'antd'
import React from 'react'
import { connect } from 'react-redux'
import { updateUser } from '../../../Actions/UserAction'
import Button from '../../../Components/Button'
import ButtonBox from '../../../Components/ButtonBox/ButtonBox'
import Input from '../../../Components/Formik/Input'
import LoaderBox from '../../../Components/LoaderBox/LoaderBox'
import ModalBox from '../../../Components/ModalBox/ModalBox'
import SelectBox from '../../../Components/SelectBox/SelectBox'
import TableBox from '../../../Components/TableBox/TableBox'
import apiClient from '../../../Util/apiClient'
import { CLEAR_DATA } from '../../../Util/Util'
import './Companies.scss'
import CopyCompany from './CopyCompany'

const { Content } = Layout

class SetCompany extends React.Component {
  constructor() {
    super()
    this.state = {
      companyAccess: [],
      loader: true,
      addAccess: [],
      networks: [],
      network: '',
      copiedCompany: '',
      view: localStorage.getItem('manage_company_view') || 'grid'
    }
    this.getData()
  }

  getData = () => {
    apiClient.get('companies/by-user').then(({ data }) => {
      if (data && data.result) {
        const { network, addAccess, result } = data
        const networks = data.networks.map((v) => {
          v.label = v.name || v.customerName
          v.value = v.id

          return v
        })
        this.setState({ networks, network, addAccess, companyAccess: result, loader: false })
      } else {
        this.setState({ loader: false })
      }
    })
  }

  onChangeText = (value, type) => {
    this.setState({ [type]: value })
  }

  onSelectCompany = (val) => {
    const { userInfo } = this.props
    this.props.dispatch(updateUser(userInfo.id, { company: val.company })).then((user) => {
      if (user) {
        CLEAR_DATA()
        this.props.history.push('/app/dashboard')
      }
    })
  }

  onAddCompany = (network) => {
    this.props.dispatch({ type: 'SET_USER_REDUCER', payload: { network } })
    this.props.history.push('/app/add-company')
  }

  onChangeNetwork = (value, type) => {
    const { userInfo } = this.props
    this.props.dispatch(updateUser(userInfo.id, { network: value, company: null })).then((user) => {
      if (user) {
        CLEAR_DATA()
        this.getData()
      }
    })
    this.setState({ [type]: value })
  }

  onCancel = () => {
    this.setState({ copiedCompany: false })
  }

  renderList = (companies) => (
    <TableBox
      columns={[
        {
          title: 'Company',
          dataIndex: 'companyName'
        },
        {
          title: 'UDID',
          dataIndex: 'network'
        },
        {
          title: 'Company ID',
          dataIndex: 'company'
        },
        {
          title: 'Access',
          dataIndex: 'userType'
        },
        {
          title: 'Action',
          dataIndex: 'action',
          render: (text, record) => (
            <Button
              variant="secondary"
              style={{ height: 'inherit' }}
              size="small"
              onClick={() => this.onSelectCompany(record)}>
              Go to Company
            </Button>
          )
        }
      ]}
      dataSource={companies}
    />
  )

  renderGrid = (companies) =>
    companies.map((access, i) => (
      <div className="list" key={i}>
        <div className="details">
          <Row>
            <Col lg={{ span: 6 }} style={{ margin: 'auto 0' }}>
              <i className="flaticon-company-1 company" />
            </Col>
            <Col lg={{ span: 18 }}>
              <h4 title={access.companyName} className="ellipsis">
                {access.companyName}
              </h4>
              <div
                className="other-specs ellipsis"
                title={`${access.companyCity}, ${access.companyState}, ${access.companyCountry}`}>
                {access.companyCity}, {access.companyState}, {access.companyCountry}
              </div>
              <div className="other-specs">
                UDID: <b>{access.network}</b>
              </div>
              <div className="other-specs">
                Company ID: <b>{access.company}</b>
              </div>
              <div className="other-specs">
                You have <b>{access.userType === 'User' ? access.roleName || '' : 'Admin'}</b> access in this
                company
              </div>
              <ButtonBox type="secondary" onClick={() => this.onSelectCompany(access)}>
                Go to Company
              </ButtonBox>
              &nbsp;&nbsp;
              {access.company === '62ac72631139910033804baf' && (
                <ButtonBox onClick={() => this.setState({ copiedCompany: access })}>Copy</ButtonBox>
              )}
            </Col>
          </Row>
        </div>
      </div>
    ))

  render() {
    const companies = this.state.companyAccess.filter((v) =>
      this.state.search ? v.companyName.toLowerCase().includes(this.state.search.toLowerCase()) : true
    )

    return (
      <Layout className="site-layout">
        <Content className="site-layout-background">
          <Row justify="center">
            <Col xs={{ span: 23 }} sm={{ span: 23 }} md={{ span: 22 }} lg={{ span: 18 }}>
              <div>
                {this.state.loader ? (
                  <LoaderBox loader="Loading Companies.." />
                ) : (
                  <div style={{ padding: 20 }}>
                    <Row className="margin-bottom20">
                      <Col xs={{ span: 23 }} sm={{ span: 23 }} md={{ span: 22 }} lg={{ span: 8 }}>
                        <div>
                          <h2 style={{ fontWeight: 600 }}>Manage Companies</h2>
                        </div>
                      </Col>
                      <Col xs={{ span: 23 }} sm={{ span: 23 }} md={{ span: 22 }} lg={{ span: 16 }}>
                        <div style={{ float: 'right' }}>
                          <Space>
                            <div>
                              <Input
                                placeholder="Search Company.."
                                name="search"
                                onChange={(n, v) => this.setState({ search: v })}
                              />
                            </div>
                            <div style={{ width: 240 }}>
                              <SelectBox
                                placeholder="Select Network"
                                id="network"
                                value={this.state.network}
                                options={this.state.networks}
                                onChangeText={this.onChangeNetwork}
                                isSubmit={this.state.isSubmit}
                              />
                            </div>

                            {this.state.addAccess && (
                              <div>
                                <ButtonBox
                                  type="primary"
                                  onClick={() => this.props.history.push('/app/add-company')}>
                                  <i className="flaticon-plus-1" />
                                  Add Company
                                </ButtonBox>
                              </div>
                            )}
                            <div>
                              <Radio.Group
                                value={this.state.view}
                                onChange={(e) => {
                                  localStorage.setItem('manage_company_view', e.target.value)
                                  this.setState({ view: e.target.value })
                                }}>
                                <Radio.Button value="grid">
                                  <i className="flaticon-grid" />
                                </Radio.Button>
                                <Radio.Button value="list">
                                  <i className="flaticon-list" />
                                </Radio.Button>
                              </Radio.Group>
                            </div>
                          </Space>
                        </div>
                      </Col>
                    </Row>
                    {this.state.companyAccess.length > 0 ? (
                      <div>
                        <div className="company-list">
                          {this.state.view === 'grid'
                            ? this.renderGrid(companies)
                            : this.renderList(companies)}
                        </div>
                        <ModalBox
                          title="Copy Company"
                          visible={!!this.state.copiedCompany}
                          onCancel={this.onCancel}
                          footer={null}
                          destroyOnClose>
                          <CopyCompany
                            copiedCompany={this.state.copiedCompany}
                            onCancel={this.onCancel}
                            onRefreshData={() => {
                              this.getData()
                              this.onCancel()
                            }}
                          />
                        </ModalBox>
                      </div>
                    ) : (
                      <center>
                        {this.props.userInfo.userType === 'Admin' ? (
                          <div
                            style={{ width: '100%', background: '#f3f3f3', borderRadius: 10, padding: 30 }}>
                            <h1 style={{ fontSize: 22 }}>No Company found! Please add company to continue</h1>
                          </div>
                        ) : (
                          <div
                            style={{
                              width: 'fit-content',
                              background: '#f3f3f3',
                              borderRadius: 10,
                              padding: 30
                            }}>
                            <h1 style={{ fontSize: 22 }}>
                              No Company found! Please select network or contact your administrator
                            </h1>
                          </div>
                        )}
                      </center>
                    )}
                  </div>
                )}
              </div>
            </Col>
          </Row>
        </Content>
      </Layout>
    )
  }
}

function mapStateToProps(state) {
  return {
    userInfo: state.users.userInfo
  }
}

export default connect(mapStateToProps)(SetCompany)
