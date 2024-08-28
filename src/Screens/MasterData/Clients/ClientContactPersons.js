import { Col, message, Row } from 'antd'
import React from 'react'
import { connect } from 'react-redux'
import InputBox from '../../../Components/InputBox/InputBox'

class ClientContactPersons extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      contactPersons:
        props.contactPersons && props.contactPersons.length > 0
          ? props.contactPersons
          : [{ contactName: '', contactEmail: '', contactPhone: '', contactPersonFor: 'Client' }]
    }
  }

  componentDidMount() {
    this.props.refs?.(this)
  }

  componentWillUnmount() {
    this.props.refs?.(null)
  }

  onChangeTextContactPersons = (value, type, ind) => {
    const changeObj = { ...this.state.contactPersons[ind], [type]: value }
    const contactPersons = this.state.contactPersons.map((val, i) => (i === ind ? changeObj : val))
    this.setState({ contactPersons })
  }

  onAddContactPersons = () => {
    const contactPersons = [
      ...this.state.contactPersons,
      { contactName: '', contactEmail: '', contactPhone: '', contactPersonFor: 'Client' }
    ]
    this.setState({ contactPersons })
  }

  onGetContactPersons = () => {
    const { contactPersons } = this.state
    const validateFields = []
    contactPersons.map((val, ind) => {
      validateFields.push(`contactName${ind}`, `contactEmail${ind}`, `contactPhone${ind}`)

      return true
    })
    let flag = true
    validateFields.forEach((data) => {
      if (this[data] && this[data].error) {
        flag = false
      }
    })

    if (flag) {
      return contactPersons
    }

    this.setState({ isSubmit: true })

    return false
  }

  onRemoveItem = (ind, id) => {
    if (this.state.contactPersons.length > 1) {
      const contactPersons = this.state.contactPersons.filter((val, i) => i !== ind)
      this.setState({ contactPersons })
      this.props.onChangeState({
        contactPersons,
        removedContactPersons: id
          ? [...this.props.removedContactPersons, id]
          : this.props.removedContactPersons
      })
    } else {
      message.error('Cannot delete! Atleast one entry required')
    }
  }

  render() {
    return (
      <div className="invoice-section panel-design">
        <div className="list-details list-group-item">
          <Row>
            <Col xs={{ span: 12 }} sm={{ span: 12 }} md={{ span: 12 }} lg={{ span: 12 }}>
              <h3>Contact Person Details</h3>
            </Col>
          </Row>
        </div>

        <div className="list-group-item">
          {this.state.contactPersons.map((item, ind) => (
            <div className="invoice-entries" key={ind}>
              <Row gutter={[10, 10]}>
                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 8 }}>
                  <div className="form-field">
                    <InputBox
                      label="Name"
                      refs={(ref) => (this[`contactName${ind}`] = ref)}
                      id="contactName"
                      value={item.contactName}
                      onChangeText={(value, type) => this.onChangeTextContactPersons(value, type, ind)}
                      isSubmit={this.state.isSubmit}
                      disabled={this.props.disableFields}
                    />
                  </div>
                </Col>
                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 8 }}>
                  <div className="form-field">
                    <InputBox
                      label="Email"
                      refs={(ref) => (this[`contactEmail${ind}`] = ref)}
                      id="contactEmail"
                      value={item.contactEmail}
                      onChangeText={(value, type) => this.onChangeTextContactPersons(value, type, ind)}
                      isSubmit={this.state.isSubmit}
                      disabled={this.props.disableFields}
                    />
                  </div>
                </Col>
                <Col xs={{ span: 12 }} sm={{ span: 12 }} md={{ span: 8 }} lg={{ span: 8 }}>
                  <div className="form-field">
                    <InputBox
                      label="Phone"
                      refs={(ref) => (this[`contactPhone${ind}`] = ref)}
                      id="contactPhone"
                      value={item.contactPhone}
                      onChangeText={(value, type) => this.onChangeTextContactPersons(value, type, ind)}
                      isSubmit={this.state.isSubmit}
                      disabled={this.props.disableFields}
                    />
                  </div>
                  {!this.props.disableFields && (
                    <div className="remove-column">
                      <button
                        type="button"
                        className="btn-glow delete-field"
                        onClick={() => this.onRemoveItem(ind, item.id)}>
                        <i className="flaticon-delete-2" />
                      </button>
                    </div>
                  )}
                </Col>
              </Row>
            </div>
          ))}
        </div>
        {!this.props.disableFields && (
          <button type="button" className="btn-glow success" onClick={this.onAddContactPersons}>
            <i className="flaticon-plus" /> Add
          </button>
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

export default connect(mapStateToProps)(ClientContactPersons)
