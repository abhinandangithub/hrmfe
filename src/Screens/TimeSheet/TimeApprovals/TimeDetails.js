import { Col, Row } from 'antd'
import moment from 'moment'
import React from 'react'
import { connect } from 'react-redux'
import { convertMinutesToHours } from '../../../Util/Util'
import '../TimeSheet.scss'

class TimeDetails extends React.Component {
  constructor() {
    super()
    this.state = {
      // entriesByWeek: []
    }
  }

  getlist = () => {
    const dateObj = {}
    this.props.entries.forEach((val) => {
      const dateStr = `${val.year}-${val.month}-${val.date}`

      if (dateObj[dateStr]) {
        dateObj[dateStr].entries.push(val)
      } else {
        dateObj[dateStr] = { label: moment(dateStr).format('YYYY-MM-DD'), entries: [val] }
      }
    })

    return Object.values(dateObj)
  }

  render() {
    const lists = this.getlist()

    return (
      <>
        {lists.map((val, i) => (
          <div key={i} className="view-timesheet-details-days">
            <div className="date-heading"> {moment(val.label).format('DD-MMM-YYYY')}</div>
            {val.entries.map((entry, i2) => {
              const clientName = entry.clientData ? entry.clientData.name : this.props.companyInfo.name

              return (
                <div key={i2} className="day-view-entry">
                  <Row gutter={[24]}>
                    <Col
                      xs={{ span: 24 }}
                      sm={{ span: 24 }}
                      md={{ span: 16 }}
                      lg={{ span: 16 }}
                      className="left-section">
                      <div className="entry-info">
                        <div className="project-client">
                          <span className="project">{entry.projectData.name}</span>{' '}
                          <span className="client">({clientName})</span>
                        </div>
                        <div className="task-notes">
                          <span className="notes">
                            {entry.description ? (
                              <p>{entry.description}</p>
                            ) : (
                              <i style={{ color: 'gray' }}>No description</i>
                            )}
                          </span>
                        </div>
                      </div>
                    </Col>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 8 }}>
                      <div className="entry-action-timer">{convertMinutesToHours(entry.totalMinutes)}</div>
                    </Col>
                  </Row>
                </div>
              )
            })}
          </div>
        ))}
      </>
    )
  }
}

function mapStateToProps(state) {
  return {
    userInfo: state.users.userInfo,
    companyInfo: state.users.companyInfo
  }
}

export default connect(mapStateToProps)(TimeDetails)
