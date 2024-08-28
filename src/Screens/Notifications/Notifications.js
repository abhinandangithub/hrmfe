import { Col, Popover, Row } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'
import './Notifications.scss'

class Notifications extends React.PureComponent {
  render() {
    const notificationAction = (
      <div className="action-items">
        <Link to="">
          <i className="flaticon-delete-2" /> Delete
        </Link>
        <Link to="">
          <i className="flaticon-dashboard-2" />
          Turn Off
        </Link>
      </div>
    )

    return (
      <>
        <Row justify="center">
          <Col xs={{ span: 23 }} sm={{ span: 23 }} md={{ span: 22 }} lg={{ span: 10 }}>
            <div className="top-title-section">
              <h2>Recent Notifications</h2>
            </div>
          </Col>
        </Row>
        <Row justify="center" style={{ paddingTop: 10 }}>
          <Col xs={{ span: 23 }} sm={{ span: 23 }} md={{ span: 22 }} lg={{ span: 10 }}>
            <section className="notification-section">
              <div className="notification-list unread">
                <div className="image">
                  <i className="flaticon-notification" />
                </div>
                <div className="details">
                  <h3>Timesheet Status changed to Approved</h3>
                  <p>
                    You have recently updated timesheet status to Approved. to manage timesheet click the
                    below link
                  </p>
                </div>
                <div className="time-delete">
                  <span>1h</span>
                  <Popover content={notificationAction} trigger="click">
                    <button type="button">
                      <i className="flaticon-more-2" />
                    </button>
                  </Popover>
                </div>
              </div>
              {/* notification list ends here */}
              <div className="notification-list">
                <div className="image">
                  <i className="flaticon-notification" />
                </div>
                <div className="details">
                  <h3>Timesheet Status changed to Approved</h3>
                  <p>
                    You have recently updated timesheet status to Approved. to manage timesheet click the
                    below link
                  </p>
                </div>
                <div className="time-delete">
                  <span>2h</span>
                  <Popover content={notificationAction} trigger="click">
                    <button type="button">
                      <i className="flaticon-more-2" />
                    </button>
                  </Popover>
                </div>
              </div>
              {/* notification list ends here */}
            </section>
          </Col>
        </Row>
      </>
    )
  }
}

export default Notifications
