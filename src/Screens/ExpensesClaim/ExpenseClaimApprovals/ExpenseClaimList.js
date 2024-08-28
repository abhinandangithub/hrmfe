import { Col, Row } from 'antd'
import moment from 'moment'
import React from 'react'
import { getWeekAndExpenseClaims } from '../../../Actions/WorkflowAction'
import LoaderBox from '../../../Components/LoaderBox/LoaderBox'
import { amountSeparator } from '../../../Util/Util'
import '../Expenses.scss'

class ExpenseClaimList extends React.Component {
  constructor() {
    super()
    this.state = {
      // open: false,
      expenseClaimEntries: [],
      loader: true,
      weekData: false
    }
  }

  componentDidMount() {
    getWeekAndExpenseClaims(this.props.weekId).then((result) => {
      if (result) {
        const { weekData, expenseClaimEntries } = result
        this.setState({ weekData, expenseClaimEntries: expenseClaimEntries || [], loader: false })
      } else {
        this.setState({ loader: false })
      }
    })
  }

  onDownload = (att) => {
    const a = document.createElement('a')
    a.href = att.file
    a.download = att.name
    a.click()
  }

  render() {
    return (
      <>
        <LoaderBox loader={this.state.loader} noData={this.state.weekData ? false : 'No expense claims'} />
        {this.state.weekData && (
          <section className="expense-week-section">
            <div className="expenses-week-container border-top">
              <Row gutter={[20, 20]}>
                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 24 }}>
                  <div className="expenses-list-holder">
                    {this.state.expenseClaimEntries.map((val, i) => (
                      <div key={i} className="expenses-list">
                        <div className="expense-date">
                          <span>{moment(val.expenseDate).format('ddd, DD MMM')}</span>
                        </div>
                        <div className="project-expense">
                          <h3>
                            {val.projectData ? val.projectData.name : ''}{' '}
                            {/* <span className="badge">{val.isBillable ? 'Billable' : 'Non Billable'}</span> */}
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
                            <span className="category">{val.categoryData ? val.categoryData.name : ''}</span>{' '}
                            - {val.notes}
                          </div>
                        </div>
                        <div className="total-expenses">
                          <h5>
                            {val.currency || ''} {amountSeparator(val.amount || 0)}
                          </h5>
                        </div>
                        <div className="actons">
                          {/* <button className="pds-button pds-button-small"><i className="flaticon-edit"></i></button> */}
                        </div>
                      </div>
                    ))}
                  </div>
                </Col>
              </Row>
            </div>
          </section>
        )}
      </>
    )
  }
}

export default ExpenseClaimList
