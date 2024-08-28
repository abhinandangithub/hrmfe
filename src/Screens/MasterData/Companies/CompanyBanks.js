import { Col, Row } from 'antd'
import React from 'react'
import { connect } from 'react-redux'
import InputBox from '../../../Components/InputBox/InputBox'
import SelectBox from '../../../Components/SelectBox/SelectBox'

class CompanyBanks extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      banks: props.banks && props.banks.length > 0 ? props.banks : []
    }
  }

  componentDidMount() {
    this.props.refs?.(this)
  }

  componentWillUnmount() {
    this.props.refs?.(null)
  }

  onChangeTextBanks = (value, type, ind) => {
    const changeObj = { ...this.state.banks[ind], [type]: value }
    const banks = this.state.banks.map((val, i) => (i === ind ? changeObj : val))
    this.setState({ banks })
  }

  onAddBanks = () => {
    const banks = [
      ...this.state.banks,
      {
        bankAccountHolderName: '',
        bankName: '',
        bankAccountNo: '',
        bankSwift: '',
        bankCurrency: '',
        bankAddress: ''
      }
    ]
    this.setState({ banks })
  }

  onGetBanks = () => {
    const { banks } = this.state
    const validateFields = []
    banks.map((val, ind) => {
      validateFields.push(
        `bankAccountHolderName${ind}`,
        `bankName${ind}`,
        `bankAccountNo${ind}`,
        `bankSwift${ind}`,
        `bankCurrency${ind}`,
        `bankAddress${ind}`
      )

      return true
    })
    let flag = true
    validateFields.forEach((data) => {
      if (this[data] && this[data].error) {
        flag = false
      }
    })

    if (flag) {
      return banks
    }

    this.setState({ isSubmit: true })

    return false
  }

  onRemoveItem = (ind, id) => {
    const banks = this.state.banks.filter((val, i) => i !== ind)
    this.setState({ banks })
    this.props.onChangeState({
      banks,
      removedBanks: id ? [...this.props.removedBanks, id] : this.props.removedBanks
    })
  }

  render() {
    return (
      <div className="invoice-section panel-design">
        <div className="list-details list-group-item">
          <Row>
            <Col xs={{ span: 12 }} sm={{ span: 12 }} md={{ span: 12 }} lg={{ span: 12 }}>
              <h3>Bank Details</h3>
            </Col>
          </Row>
        </div>

        <div className="list-group-item">
          {this.state.banks.map((item, ind) => (
            <div className="invoice-entries" key={ind}>
              <Row gutter={[10, 10]}>
                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 6 }}>
                  <div className="form-field">
                    <InputBox
                      label="Account Holder Name"
                      refs={(ref) => (this[`bankAccountHolderName${ind}`] = ref)}
                      id="bankAccountHolderName"
                      value={item.bankAccountHolderName}
                      onChangeText={(value, type) => this.onChangeTextBanks(value, type, ind)}
                      isSubmit={this.state.isSubmit}
                      disabled={this.props.disableFields}
                    />
                  </div>
                </Col>
                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 6 }}>
                  <div className="form-field">
                    <InputBox
                      label="Bank Name"
                      refs={(ref) => (this[`bankName${ind}`] = ref)}
                      id="bankName"
                      value={item.bankName}
                      onChangeText={(value, type) => this.onChangeTextBanks(value, type, ind)}
                      isSubmit={this.state.isSubmit}
                      disabled={this.props.disableFields}
                    />
                  </div>
                </Col>
                <Col xs={{ span: 12 }} sm={{ span: 12 }} md={{ span: 8 }} lg={{ span: 6 }}>
                  <div className="form-field">
                    <InputBox
                      label="Bank Account No"
                      refs={(ref) => (this[`bankAccountNo${ind}`] = ref)}
                      id="bankAccountNo"
                      value={item.bankAccountNo}
                      onChangeText={(value, type) => this.onChangeTextBanks(value, type, ind)}
                      isSubmit={this.state.isSubmit}
                      disabled={this.props.disableFields}
                    />
                  </div>
                </Col>
                <Col xs={{ span: 12 }} sm={{ span: 12 }} md={{ span: 8 }} lg={{ span: 6 }}>
                  <div className="form-field">
                    <InputBox
                      label="Swift"
                      refs={(ref) => (this[`bankSwift${ind}`] = ref)}
                      id="bankSwift"
                      value={item.bankSwift}
                      onChangeText={(value, type) => this.onChangeTextBanks(value, type, ind)}
                      isSubmit={this.state.isSubmit}
                      disabled={this.props.disableFields}
                    />
                  </div>
                </Col>
                <Col xs={{ span: 12 }} sm={{ span: 12 }} md={{ span: 8 }} lg={{ span: 8 }}>
                  <div className="form-field">
                    <SelectBox
                      label="Bank Currency"
                      refs={(ref) => (this[`bankCurrency${ind}`] = ref)}
                      id="bankCurrency"
                      value={item.bankCurrency}
                      options={this.props.currencyOptions || []}
                      onChangeText={(value, type) => this.onChangeTextBanks(value, type, ind)}
                      isSubmit={this.state.isSubmit}
                      disabled={this.props.disableFields}
                    />
                  </div>
                </Col>
                <Col xs={{ span: 12 }} sm={{ span: 12 }} md={{ span: 8 }} lg={{ span: 16 }}>
                  <div className="form-field">
                    <InputBox
                      label="Bank Address"
                      refs={(ref) => (this[`bankAddress${ind}`] = ref)}
                      id="bankAddress"
                      value={item.bankAddress}
                      onChangeText={(value, type) => this.onChangeTextBanks(value, type, ind)}
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
          <button type="button" className="btn-glow success" onClick={this.onAddBanks}>
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

export default connect(mapStateToProps)(CompanyBanks)
