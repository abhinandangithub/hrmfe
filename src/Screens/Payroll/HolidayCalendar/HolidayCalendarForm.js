import { ArrowLeftOutlined } from '@ant-design/icons'
import { Button, Col, message, Row } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'
import { addHolidayCalendar, getHolidayById, updateHolidayById } from '../../../Actions/UserAction'
import DateBox from '../../../Components/DateBox/DateBox'
import InputBox from '../../../Components/InputBox/InputBox'
import LoaderBox from '../../../Components/LoaderBox/LoaderBox'

export default class HolidaycalendarForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      date: '',
      region: '',
      description: '',
      isSubmit: false,

      loader: !!props.match.params.id,
      paramsId: ''
      // id: false
    }
  }

  componentDidMount() {
    if (this.props.match.params.id) {
      getHolidayById(this.props.match.params.id).then((holidayList) => {
        if (holidayList) {
          this.setState({ ...holidayList, paramsId: this.props.match.params.id, loader: false })
        } else {
          this.setState({ loader: false })
        }
      })
    }
  }

  onChangeText = (value, type) => {
    this.setState({ [type]: value })
  }

  onSave = () => {
    const { date, region, description, paramsId } = this.state
    const validateFields = ['date', 'region', 'description']
    let flag = true
    validateFields.map((data) => {
      if (this[data] && this[data].error) {
        flag = false
      }

      return true
    })

    if (flag) {
      if (paramsId.length) {
        updateHolidayById({ date, region, description, id: paramsId }).then((res) => {
          if (res) {
            message.success('Updates Successfully')
          }
        })
      } else {
        addHolidayCalendar({ date, region, description }).then((res) => {
          if (res) {
            message.success('Added Successfully')
          }
        })
      }
    } else {
      this.setState({ isSubmit: true })
    }
  }

  render() {
    return this.state.loader ? (
      <LoaderBox loader="Loading Holiday calendar..." />
    ) : (
      <Row justify="center" className="inner-contents">
        <Col xs={{ span: 22 }} sm={{ span: 22 }} md={{ span: 20 }} lg={{ span: 20 }}>
          <div className="panel-layout">
            <h2 className="panel-title">Holiday Calendar Details</h2>
            <Row gutter={[26, { xs: 10, sm: 16, md: 20, lg: 20 }]}>
              <Col xs={{ span: 24 }} sm={{ span: 12 }} md={{ span: 8 }} lg={{ span: 6 }}>
                <div className="form-field">
                  <DateBox
                    label="Day"
                    id="date"
                    refs={(ref) => (this.date = ref)}
                    onChangeText={this.onChangeText}
                    value={this.state.date}
                    isSubmit={this.state.isSubmit}
                  />
                </div>
              </Col>
              <Col xs={{ span: 24 }} sm={{ span: 12 }} md={{ span: 8 }} lg={{ span: 6 }}>
                <div className="form-field">
                  <InputBox
                    label="Region"
                    id="region"
                    onChangeText={this.onChangeText}
                    refs={(ref) => (this.region = ref)}
                    value={this.state.region}
                    isSubmit={this.state.isSubmit}
                  />
                </div>
              </Col>
            </Row>

            <div className="panel-design">
              <div className="panel-header">
                <h3>Description Details</h3>
              </div>
              <div className="panel-body">
                <Row gutter={[26, { xs: 8, sm: 16, md: 20, lg: 20 }]}>
                  <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 24 }}>
                    <div className="form-field">
                      <InputBox
                        label="Description"
                        id="description"
                        onChangeText={this.onChangeText}
                        refs={(ref) => (this.description = ref)}
                        value={this.state.description}
                        isSubmit={this.state.isSubmit}
                        textArea
                        inputType="textArea"
                      />
                    </div>
                  </Col>
                </Row>
              </div>
            </div>
          </div>

          <div className="save-changes">
            <Button onClick={this.onSave} type="primary">
              {this.state.paramsId.length ? 'Update' : 'Save'}
            </Button>
            <span>or</span>
            <Link to="/app/holiday-calendar">
              <Button type="standard">
                <ArrowLeftOutlined /> Back to Holiday Calendar
              </Button>
            </Link>
          </div>
          {/* Invoice Information ends */}
        </Col>
      </Row>
    )
  }
}
