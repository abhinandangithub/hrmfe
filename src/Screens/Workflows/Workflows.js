import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons'
import { Layout, message, Tabs } from 'antd'
import moment from 'moment'
import React from 'react'
import { connect } from 'react-redux'
import { readWorkflow } from '../../Actions/WorkflowAction'
import emptyImg from '../../assets/images/login.png'
import ConfirmationBox from '../../Components/ConfirmationBox/ConfirmationBox'
import InputBox from '../../Components/InputBox/InputBox'
import ModalBox from '../../Components/ModalBox/ModalBox'
import PaginationBox from '../../Components/Pagination/PaginationBox'
import apiClient from '../../Util/apiClient'
import { avatarLetter } from '../../Util/Util'
import './Workflows.scss'
import WorkflowView from './WorkflowView'

const { TabPane } = Tabs

const { Sider, Content } = Layout

class Workflows extends React.Component {
  constructor() {
    super()
    this.state = {
      search: '',
      workflows: [],
      selectedWorkflow: false,
      activeTab: '',
      selectedRows: [],
      reason: '',
      toggleRejection: false
    }
    this.getWorkflows()
  }

  componentDidMount() {
    const workflowId = this.props.match?.params?.workflowId

    if (workflowId) {
      apiClient.get(`workflows/list/${workflowId}`).then(({ data }) => {
        if (data?.result) {
          this.setState({ selectedWorkflow: data.result })
        }
      })
    }
  }

  getWorkflows = (query = {}) => {
    const params = { ...query, search: this.state.search, status: this.state.activeTab }

    apiClient.get('workflows/my-workflows', { params }).then(({ data }) => {
      if (data && data.result) {
        this.setState({ workflows: data.result, pageData: data.pageData })
        document.getElementById('scroll-ref')?.scrollIntoView()
      }
    })
  }

  onSelectWorkflow = (selectedWorkflow) => {
    this.setState({ selectedWorkflow: false, selectedRows: [] }, () => {
      this.setState({ selectedWorkflow })
    })

    if (selectedWorkflow.unRead && selectedWorkflow.unRead.indexOf(this.props.userInfo.id) >= 0) {
      readWorkflow(selectedWorkflow.id).then((workflow) => {
        if (workflow) {
          const workflows = this.state.workflows.map((val) => {
            if (val.id === workflow.id) {
              return workflow
            }

            return val
          })
          this.setState({ workflows })
        }
      })
    }
  }

  onUpdateWorkflow = (workflow) => {
    const workflows = this.state.workflows.map((val) => {
      if (val.id === workflow.id) {
        return { ...val, ...workflow }
      }

      return val
    })
    this.setState({ workflows })
  }

  getColors = (status) => {
    if (status === 'Approved') {
      return '#4caf50'
    }

    if (status === 'Rejected') {
      return '#fa3729'
    }

    if (status === 'Returned') {
      return '#f56c00'
    }

    return '#210070'
  }

  onChangeText = (value, type) => {
    this.setState({ [type]: value }, () => {
      this.getWorkflows()
    })
  }

  onChangeTab = (activeTab) => {
    this.setState({ activeTab, selectedWorkflow: false, selectedRows: [] }, () => {
      this.getWorkflows()
    })
  }

  onSelect = (id) => {
    if (this.state.activeTab === 'Submitted') {
      const { selectedRows } = this.state
      const index = selectedRows.indexOf(id)

      if (index >= 0) {
        selectedRows.splice(index, 1)
        this.setState({ selectedWorkflow: false, selectedRows })
      } else {
        this.setState({ selectedWorkflow: false, selectedRows: [...selectedRows, id] })
      }
    }
  }

  onApprove = () => {
    const { selectedRows } = this.state
    ConfirmationBox(
      {
        title: 'Approve',
        description: 'Are you sure! Do you want to approve?',
        acceptText: 'Approve',
        cancelText: 'Cancel'
      },
      () => {
        apiClient.put('workflows/mass-approval', { workflowIds: selectedRows }).then(({ data }) => {
          if (data && data.result) {
            message.success('Workflows approved')
            this.getWorkflows()
          }
        })
      }
    )
  }

  onReject = () => {
    const { selectedRows, reason } = this.state

    if (reason && reason !== '') {
      apiClient.put('workflows/mass-rejection', { workflowIds: selectedRows, reason }).then(({ data }) => {
        if (data && data.result) {
          message.success('Workflows Rejected')
          this.getWorkflows()
        }
      })
    } else {
      message.error('Please enter reason')
    }
  }

  onCancel = () => {
    this.setState({ toggleRejection: false })
  }

  onChangePage = (pageData) => {
    this.getWorkflows(pageData)
  }

  render() {
    const { selectedRows, workflows } = this.state

    return (
      <Layout className="workflow app-sidebar">
        <Sider width={300} trigger={null} collapsible collapsed={false} id="mobile-sider-menu">
          <div className="filter">
            <form>
              <div className="form-fields">
                <InputBox
                  refs={(ref) => (this.search = ref)}
                  id="search"
                  placeholder="Search"
                  value={this.state.search}
                  onChangeText={this.onChangeText}
                  isSubmit={this.state.isSubmit}
                  type="text"
                  inputType="text"
                  prefix={<i className="flaticon-loupe" />}
                />
              </div>
            </form>
          </div>
          <div style={{ padding: '0 15px' }}>
            <Tabs defaultActiveKey={this.state.activeTab} onChange={this.onChangeTab}>
              <TabPane tab="All" key="" />
              <TabPane tab="Submitted" key="Submitted" />
              <TabPane tab="Approved" key="Approved" />
              <TabPane tab="Rejected" key="Rejected" />
              <TabPane tab="Others" key="Others" />
            </Tabs>
          </div>
          <div className="workflow-container">
            <span id="scroll-ref" />
            {this.state.workflows.map((val, i) => {
              const unRead = val.unRead ? val.unRead.indexOf(this.props.userInfo.id) >= 0 : false
              const selected = selectedRows.includes(val.id)

              return (
                <div
                  key={i}
                  className="workflow-list"
                  style={{ backgroundColor: selected ? '#ececec' : '#fff' }}>
                  <div
                    className="avatar"
                    style={{ backgroundColor: selected ? 'var(--primary)' : 'var(--secondary)' }}
                    onClick={() => this.onSelect(val.id)}>
                    <div className="name-text">
                      {selected ? <i className="flaticon-tick-1" /> : avatarLetter(val.fromUserData.name)}
                    </div>
                  </div>
                  <div className="content" onClick={() => this.onSelectWorkflow(val)}>
                    <div className={`name ${unRead ? 'bold' : ''}`}>{val.fromUserData.name}</div>
                    <div className={`subject ${unRead ? 'bold' : ''}`}>{val.subject}</div>
                    <div className="time">
                      <i className="flaticon-back-in-time" />
                      {moment(val.updatedAt).format('DD-MMM-YYYY hh:mm a')}
                      {val.lastActionBy === this.props.userInfo.id ? (
                        <ArrowRightOutlined className="arrow" style={{ color: this.getColors(val.status) }} />
                      ) : (
                        <ArrowLeftOutlined className="arrow" style={{ color: this.getColors(val.status) }} />
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
            {this.state.pageData && (
              <PaginationBox
                size="small"
                showSizeChanger={false}
                pageData={workflows.length > 0 ? this.state.pageData : false}
                onChangePage={this.onChangePage}
              />
            )}
          </div>
        </Sider>
        <Layout className="site-layout">
          <Content className="site-layout-background">
            {this.state.selectedWorkflow && (
              <WorkflowView
                selectedWorkflow={this.state.selectedWorkflow}
                onUpdateWorkflow={this.onUpdateWorkflow}
                activeTab={this.state.activeTab}
              />
            )}
            {selectedRows.length > 0 && (
              <div className="selected-actions">
                <img src={emptyImg} alt="Workflows" />

                <div className="action-content">
                  <h2>{selectedRows.length} workflows selected</h2>
                  <div onClick={this.onApprove}>
                    <i className="flaticon-tick-1" /> Approve
                  </div>
                  <div onClick={() => this.setState({ toggleRejection: true })}>
                    <i className="flaticon-delete-2" /> Reject
                  </div>
                  <div onClick={() => this.setState({ selectedRows: [] })}>
                    <i className="flaticon-delete-1" /> Clear
                  </div>
                </div>
              </div>
            )}
          </Content>
          <ModalBox
            title="Reject Workflows"
            visible={this.state.toggleRejection}
            onOk={this.onReject}
            onCancel={this.onCancel}
            okText="Reject"
            destroyOnClose>
            <div className="form-fields">
              <InputBox
                label="Reason"
                value={this.state.reason}
                id="reason"
                onChangeText={(reason) => this.setState({ reason })}
                textArea
                rows={5}
              />
            </div>
          </ModalBox>
        </Layout>
      </Layout>
    )
  }
}

function mapStateToProps(state) {
  return {
    userInfo: state.users.userInfo
  }
}

export default connect(mapStateToProps)(Workflows)
