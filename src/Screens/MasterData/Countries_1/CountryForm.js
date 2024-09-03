import { ArrowLeftOutlined } from '@ant-design/icons'
import { Col, Row } from 'antd'
import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { addCountry, getCountryById, updateCountry } from '../../../Actions/UserAction'
import Button from '../../../Components/Button'
import InputBox from '../../../Components/InputBox/InputBox'

class CountryForm extends React.Component {
  constructor() {
    super()
    this.state = {
      code: '',
      name: '',
      id: false
    }
  }

  componentDidMount() {
    if (this.props.match.params.id) {
      getCountryById(this.props.match.params.id).then((country) => {
        if (country) {
          const { id, code, name } = country
          this.setState({ id, code, name })
        }
      })
    }
  }

  onChangeText = (value, type) => {
    this.setState({ [type]: value })
  }

  onSave = () => {
    const { id, code, name } = this.state
    const validateFields = ['code', 'name']
    let flag = true
    validateFields.map((data) => {
      if (this[data] && this[data].error) {
        flag = false
      }

      return true
    })

    if (flag) {
      if (id) {
        updateCountry(id, { code, name }).then((country) => {
          if (country) {
            this.props.history('/app/countries')
          }
        })
      } else {
        const company = this.props.companyInfo.id
        addCountry({ code, name, company }).then((country) => {
          if (country) {
            this.props.history('/app/countries')
          }
        })
      }
    } else {
      this.setState({ isSubmit: true })
    }
  }

  render() {
    return (
      <Row justify="center" className="inner-contents">
        <Col xs={{ span: 22 }} sm={{ span: 22 }} md={{ span: 20 }} lg={{ span: 20 }}>
          <div className="invoice-section">
            <h2>Country Details</h2>
            <Row gutter={[26, { xs: 8, sm: 16, md: 20, lg: 20 }]}>
              <Col xs={{ span: 24 }} sm={{ span: 12 }} md={{ span: 8 }} lg={{ span: 12 }}>
                <div className="form-field">
                  <InputBox
                    label="Country Code"
                    refs={(ref) => (this.code = ref)}
                    id="code"
                    value={this.state.code}
                    onChangeText={this.onChangeText}
                    isSubmit={this.state.isSubmit}
                  />
                </div>
              </Col>
              <Col xs={{ span: 24 }} sm={{ span: 12 }} md={{ span: 8 }} lg={{ span: 12 }}>
                <div className="form-field">
                  <InputBox
                    label="Name"
                    refs={(ref) => (this.name = ref)}
                    id="name"
                    value={this.state.name}
                    onChangeText={this.onChangeText}
                    isSubmit={this.state.isSubmit}
                  />
                </div>
              </Col>
            </Row>
          </div>
          {/* Product details ends */}

          <div className="save-changes">
            <button type="button" onClick={this.onSave} className="btn-glow primary">
              {this.state.id ? 'Update' : 'Save'}
            </button>
            <span>or</span>
            <Link to="/app/countries">
              <Button>
                <ArrowLeftOutlined /> Back to country list
              </Button>
            </Link>
          </div>
          {/* Invoice Information ends */}
        </Col>
      </Row>
    )
  }
}

function mapStateToProps(state) {
  return {
    companyInfo: state.users.companyInfo
  }
}

export default connect(mapStateToProps)(CountryForm)
