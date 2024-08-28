import { Col, Row } from 'antd'
import moment from 'moment'
import React from 'react'
import ModalBox from '../../Components/ModalBox/ModalBox'
import { amountSeparator, TIME_ENABLED_STATUS } from '../../Util/Util'
import '../TimeSheet/Day.scss'
import './Expenses.scss'
import ExpensesForm from './ExpensesForm'

class ExpensesDetails extends React.Component {
  constructor() {
    super()
    this.state = {
      open: false
    }
  }

  onCancel = () => {
    this.setState({ open: false })
  }

  onDownload = (att) => {
    const a = document.createElement('a')
    a.href = att.file
    a.download = att.name
    a.click()
  }

  render() {
    // let totalAmount = 0

    return (
      <>
        <section className="expense-week-section">
          <div className="expenses-week-container border-top">
            <Row gutter={[20, 20]}>
              <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 24 }}>
                <div className="expenses-list-holder">
                  {this.props.expenseClaimEntries.map((val, i) => (
                    // totalAmount += parseFloat(val.amount || 0)

                    <div className="expenses-list" key={i}>
                      <div className="expense-date">
                        <span>{moment(val.expenseDate).format('ddd, DD MMM')}</span>
                      </div>
                      <div className="project-expense">
                        <h3>
                          {val.projectData ? val.projectData.name : ''}{' '}
                          <span className="badge">{val.isBillable ? 'Billable' : 'Non Billable'}</span>
                          {val.attachmentData &&
                            val.attachmentData.attachments &&
                            val.attachmentData.attachments.map((att, ind) => (
                              <span
                                key={ind}
                                style={{ float: 'right', cursor: 'pointer' }}
                                className="badge"
                                onClick={() => this.onDownload(att)}>
                                <i className="flaticon-download" />
                              </span>
                            ))}
                        </h3>
                        <div className="detailed-notes">
                          <span className="category">{val.categoryData ? val.categoryData.name : ''}</span> -{' '}
                          {val.notes}
                        </div>
                      </div>
                      <div className="total-expenses">
                        <h5>
                          {val.currency || ''} {amountSeparator(val.amount || 0)}
                        </h5>
                      </div>

                      <div className="actons">
                        {TIME_ENABLED_STATUS.indexOf(this.props.weekStatus) >= 0 && (
                          <button
                            type="button"
                            onClick={() => this.setState({ open: val })}
                            className="pds-button pds-button-small">
                            <i className="flaticon-edit" />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                  {/* list ends here */}

                  <div className="expenses-view-summary">
                    {/* <div className="expenses-view-total">Total: <span> $ {parseFloat(totalAmount).toFixed(2)}</span></div> */}
                    <div className="expenses-view-total" />
                  </div>
                </div>
                {TIME_ENABLED_STATUS.indexOf(this.props.weekStatus) >= 0 &&
                  this.props.expenseClaimEntries.length > 0 && (
                    <div className="day-view-timesheet-submission">
                      <button
                        type="button"
                        className="pds-button pds-button-large"
                        onClick={this.props.onSubmitExpenseClaim}>
                        Submit Week for Approval
                      </button>
                    </div>
                  )}
              </Col>
            </Row>
          </div>
        </section>
        <ModalBox
          title="Update Expenses Claim"
          visible={!!this.state.open}
          width={800}
          onCancel={this.onCancel}
          footer={null}
          destroyOnClose>
          <ExpensesForm
            onCancel={this.onCancel}
            selectedEntry={this.state.open}
            getExpenseClaimEntries={this.props.getExpenseClaimEntries}
          />
        </ModalBox>
      </>
    )
  }
}

export default ExpensesDetails
