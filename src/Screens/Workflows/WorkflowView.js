import { Col, message, Row, Tabs } from 'antd'
import moment from 'moment'
import React from 'react'
import { connect } from 'react-redux'
import { approveWorkflow, rejectWorkflow } from '../../Actions/WorkflowAction'
import ConfirmationBox from '../../Components/ConfirmationBox/ConfirmationBox'
import InputBox from '../../Components/InputBox/InputBox'
import ModalBox from '../../Components/ModalBox/ModalBox'
import ExpenseClaimList from '../ExpensesClaim/ExpenseClaimApprovals/ExpenseClaimList'
import LeaveRequestView from '../HumanResources/AbsenceManagement/LeaveRequestGeneration/LeaveRequestView'
import Logs from '../Logs/Logs'
import TimeApprovalTable from '../TimeSheet/TimeApprovals/TimeApprovalTable'
import './Workflows.scss'

const { TabPane } = Tabs

class WorkflowView extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      selectedWorkflow: props.selectedWorkflow,
      reason: ''
    }
  }

  onApprove = () => {
    const { selectedWorkflow } = this.state
    ConfirmationBox(
      {
        title: 'Approve',
        description: 'Are you sure! Do you want to approve?',
        acceptText: 'Approve',
        cancelText: 'Cancel'
      },
      () => {
        approveWorkflow(selectedWorkflow.id).then((workFlow) => {
          if (workFlow) {
            this.setState({ selectedWorkflow: workFlow })
            this.props.onUpdateWorkflow(workFlow)
          }
        })
      }
    )
  }

  onReject = () => {
    const { selectedWorkflow, reason } = this.state

    if (reason === '') {
      message.error('Please enter reason')

      return true
    }

    rejectWorkflow(selectedWorkflow.id, { reason }).then((workFlow) => {
      if (workFlow) {
        this.setState({ selectedWorkflow: workFlow, open: false })
        this.props.onUpdateWorkflow(workFlow)
      }
    })
  }

  onChangeText = (value, type) => {
    this.setState({ [type]: value })
  }

  onCancel = () => {
    this.setState({ open: false })
  }

  render() {
    const { selectedWorkflow } = this.state

    if (selectedWorkflow) {
      return (
        <div>
          <div className="workflow-view-container">
            <Row>
              <Col xs={{ span: 24 }} sm={{ span: 18 }} md={{ span: 18 }} lg={{ span: 18 }}>
                <div className="title">
                  <h2>{selectedWorkflow.subject}</h2>

                  <div className="date-and-time">
                    <i className="flaticon-calendar" />
                    {moment(selectedWorkflow.updatedAt).format('DD-MMM-YYYY hh:mm a')}
                  </div>
                  <div className="from-details">
                    <b>From: </b>
                    <span>{selectedWorkflow.fromUserData ? selectedWorkflow.fromUserData.name : ''}</span>
                  </div>
                  {selectedWorkflow?.toUserData?.length > 0 && (
                    <div className="to-details">
                      <b>To: </b>
                      <span>
                        {selectedWorkflow.toUserData
                          ? selectedWorkflow.toUserData.map((v) => v.name)?.join(', ') || ''
                          : ''}
                      </span>
                    </div>
                  )}
                  {selectedWorkflow?.ccUserData?.length > 0 && (
                    <div className="to-details">
                      <b>Cc: </b>
                      <span>
                        {selectedWorkflow.ccUserData
                          ? selectedWorkflow.ccUserData.map((v) => v.name)?.join(', ') || ''
                          : ''}
                      </span>
                    </div>
                  )}
                </div>
              </Col>
              <Col xs={{ span: 24 }} sm={{ span: 6 }} md={{ span: 6 }} lg={{ span: 6 }}>
                <div className="print">
                  <button type="button" className="pds-button-link pds-button-icon">
                    <i className="flaticon-printer-1" />
                  </button>
                </div>
              </Col>
            </Row>
            <div className="worflow-view-content">
              <Tabs defaultActiveKey={this.state.defaultActiveKey} onChange={this.onChangeTab}>
                <TabPane tab="Overview" key="Overview">
                  {selectedWorkflow.entityType === 'Timesheet' && (
                    <TimeApprovalTable weekId={selectedWorkflow.entityId} {...this.props} />
                  )}
                  {selectedWorkflow.entityType === 'ExpenseClaim' && (
                    <ExpenseClaimList weekId={selectedWorkflow.entityId} {...this.props} />
                  )}

                  {selectedWorkflow.entityType === 'LeaveRequest' && (
                    <LeaveRequestView
                      match={{ params: { id: selectedWorkflow.entityId } }}
                      noEdit
                      {...this.props}
                    />
                  )}
                </TabPane>
                <TabPane tab="Logs" key="Timelogs">
                  {selectedWorkflow && (
                    <Logs entityId={selectedWorkflow.entityId} entityType={selectedWorkflow.entityType} />
                  )}
                </TabPane>
              </Tabs>
            </div>

            <ModalBox
              title="Reject Time"
              visible={this.state.open}
              onOk={this.onReject}
              onCancel={this.onCancel}
              okText="Reject"
              destroyOnClose>
              <div className="form-fields">
                <InputBox
                  label="Reason"
                  value={this.state.reason}
                  id="reason"
                  onChangeText={this.onChangeText}
                  textArea
                  isSubmit={this.state.isSubmit}
                />
              </div>
            </ModalBox>
          </div>
          <div style={{ position: 'relative' }}>
            {selectedWorkflow.status === 'Submitted' &&
              selectedWorkflow.createdFor.indexOf(this.props.userInfo.id) >= 0 && (
                <div className="fixed-action-area" style={{ position: 'absolute' }}>
                  <button type="button" onClick={this.onApprove} className="btn-glow primary">
                    Approve
                  </button>
                  <span>or</span>
                  <button type="button" onClick={() => this.setState({ open: true })} className="btn-glow">
                    Reject
                  </button>
                </div>
              )}
          </div>
        </div>
      )
    }

    return null
  }
}

function mapStateToProps(state) {
  return {
    userInfo: state.users.userInfo,
    companyInfo: state.users.companyInfo
  }
}

export default connect(mapStateToProps)(WorkflowView)
