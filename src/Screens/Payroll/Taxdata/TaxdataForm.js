import { ArrowLeftOutlined } from '@ant-design/icons'
import { Button, Col, Row } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'
import DateBox from '../../../Components/DateBox/DateBox'
import InputBox from '../../../Components/InputBox/InputBox'
import SelectBox from '../../../Components/SelectBox/SelectBox'

const options = [
  {
    value: 'Option 1',
    label: 'Option 1'
  },
  {
    value: 'Option 2',
    label: 'Option 2'
  },
  {
    value: 'Option 3',
    label: 'Option 3'
  }
]

export default class TaxdataForm extends React.Component {
  // constructor() {
  //     super()
  //     this.state = {
  //         product_name: '',
  //         uom: '',
  //         unit_price: '',
  //         tax: '',
  //         currency: ''
  //     };
  // }

  onChangeText = (value, type) => {
    this.setState({ [type]: value })
  }

  // onSave = () => {
  //     const { product_name, uom, unit_price, tax, currency
  //     } = this.state;
  //     const validateFields = ['product_name', 'uom', 'unit_price', 'tax', 'currency'];
  //     let flag = true;
  //     validateFields.map((data) => {
  //         if (this[data] && this[data].error) {
  //             flag = false;
  //         }
  //         return true
  //     })
  //     if (flag) {
  //         this.props.history('/app/products')
  //     } else {
  //         this.setState({ isSubmit: true });
  //     }
  // }

  render() {
    return (
      <Row justify="center" className="inner-contents">
        <Col xs={{ span: 22 }} sm={{ span: 22 }} md={{ span: 20 }} lg={{ span: 20 }}>
          <div className="invoice-section">
            <h2>Taxdata Details</h2>
            <Row gutter={[26, { xs: 10, sm: 16, md: 20, lg: 20 }]}>
              <Col xs={{ span: 24 }} sm={{ span: 12 }} md={{ span: 8 }} lg={{ span: 8 }}>
                <div className="form-field">
                  <InputBox label="Employee ID" id="Employee ID" onChangeText={this.onChangeText} />
                </div>
              </Col>
              <Col xs={{ span: 24 }} sm={{ span: 12 }} md={{ span: 8 }} lg={{ span: 8 }}>
                <div className="form-field">
                  <InputBox label="Name" id="name" onChangeText={this.onChangeText} />
                </div>
              </Col>
              <Col xs={{ span: 24 }} sm={{ span: 12 }} md={{ span: 8 }} lg={{ span: 8 }}>
                <div className="form-field">
                  <SelectBox
                    label="Dept"
                    id="department"
                    options={options}
                    onChangeText={this.onChangeText}
                  />
                </div>
              </Col>
            </Row>

            <div className="invoice-section panel-design">
              <div className="list-details list-group-item">
                <h3>Personal Details</h3>
              </div>
              <div className="list-group-item">
                <Row gutter={[26, { xs: 8, sm: 16, md: 20, lg: 20 }]}>
                  <Col xs={{ span: 24 }} sm={{ span: 12 }} md={{ span: 8 }} lg={{ span: 6 }}>
                    <div className="form-field">
                      <InputBox label="Email ID" id="emailId" onChangeText={this.onChangeText} />
                    </div>
                  </Col>
                  <Col xs={{ span: 24 }} sm={{ span: 12 }} md={{ span: 8 }} lg={{ span: 6 }}>
                    <div className="form-field">
                      <InputBox label="Phone Number" id="phoneNumber" onChangeText={this.onChangeText} />
                    </div>
                  </Col>
                  <Col xs={{ span: 24 }} sm={{ span: 12 }} md={{ span: 8 }} lg={{ span: 6 }}>
                    <div className="form-field">
                      <DateBox label="DOB" id="dob" onChangeText={this.onChangeText} />
                    </div>
                  </Col>
                  <Col xs={{ span: 24 }} sm={{ span: 12 }} md={{ span: 8 }} lg={{ span: 6 }}>
                    <div className="form-field">
                      <InputBox label="Social ID" id="socialId" onChangeText={this.onChangeText} />
                    </div>
                  </Col>
                </Row>
              </div>
            </div>

            <div className="invoice-section panel-design">
              <div className="list-details list-group-item">
                <h3>Address Details</h3>
              </div>
              <div className="list-group-item">
                <Row gutter={[26, { xs: 8, sm: 16, md: 20, lg: 20 }]}>
                  <Col xs={{ span: 24 }} sm={{ span: 12 }} md={{ span: 8 }} lg={{ span: 6 }}>
                    <div className="form-field">
                      <InputBox label="Street" id="street" onChangeText={this.onChangeText} />
                    </div>
                  </Col>
                  <Col xs={{ span: 24 }} sm={{ span: 12 }} md={{ span: 8 }} lg={{ span: 6 }}>
                    <div className="form-field">
                      <InputBox label="City" id="city" onChangeText={this.onChangeText} />
                    </div>
                  </Col>
                  <Col xs={{ span: 24 }} sm={{ span: 12 }} md={{ span: 8 }} lg={{ span: 4 }}>
                    <div className="form-field">
                      <InputBox label="State" id="state" onChangeText={this.onChangeText} />
                    </div>
                  </Col>
                  <Col xs={{ span: 24 }} sm={{ span: 12 }} md={{ span: 8 }} lg={{ span: 4 }}>
                    <div className="form-field">
                      <InputBox label="Postal Code" id="postalCode" onChangeText={this.onChangeText} />
                    </div>
                  </Col>
                  <Col xs={{ span: 24 }} sm={{ span: 12 }} md={{ span: 8 }} lg={{ span: 4 }}>
                    <div className="form-field">
                      <InputBox label="Country" id="country" onChangeText={this.onChangeText} />
                    </div>
                  </Col>
                </Row>
              </div>
            </div>

            <div className="invoice-section panel-design">
              <div className="list-details list-group-item">
                <h3>Bank Details</h3>
              </div>
              <div className="list-group-item">
                <Row gutter={[26, { xs: 8, sm: 16, md: 20, lg: 20 }]}>
                  <Col xs={{ span: 24 }} sm={{ span: 12 }} md={{ span: 8 }} lg={{ span: 6 }}>
                    <div className="form-field">
                      <SelectBox
                        label="Wage Mode"
                        id="wageMode"
                        options={options}
                        onChangeText={this.onChangeText}
                      />
                    </div>
                  </Col>
                  <Col xs={{ span: 24 }} sm={{ span: 12 }} md={{ span: 8 }} lg={{ span: 6 }}>
                    <div className="form-field">
                      <InputBox label="Bank Account" id="bankAccount" onChangeText={this.onChangeText} />
                    </div>
                  </Col>
                  <Col xs={{ span: 24 }} sm={{ span: 12 }} md={{ span: 8 }} lg={{ span: 4 }}>
                    <div className="form-field">
                      <InputBox label="SWIFT" id="bankSwift" onChangeText={this.onChangeText} />
                    </div>
                  </Col>
                  <Col xs={{ span: 24 }} sm={{ span: 12 }} md={{ span: 8 }} lg={{ span: 4 }}>
                    <div className="form-field">
                      <SelectBox
                        label="Currency"
                        id="currency"
                        options={options}
                        onChangeText={this.onChangeText}
                      />
                    </div>
                  </Col>
                  <Col xs={{ span: 24 }} sm={{ span: 12 }} md={{ span: 8 }} lg={{ span: 4 }}>
                    <div className="form-field">
                      <DateBox label="Join date" id="joinDate" onChangeText={this.onChangeText} />
                    </div>
                  </Col>
                </Row>
              </div>
            </div>

            <Row gutter={[26, { xs: 10, sm: 16, md: 20, lg: 20 }]}>
              <Col xs={{ span: 24 }} sm={{ span: 12 }} md={{ span: 8 }} lg={{ span: 8 }}>
                <div className="form-field">
                  <DateBox label="Inactive On" id="inactiveOn" onChangeText={this.onChangeText} />
                </div>
              </Col>
              <Col xs={{ span: 24 }} sm={{ span: 12 }} md={{ span: 8 }} lg={{ span: 8 }}>
                <div className="form-field">
                  <SelectBox label="Active" id="active" options={options} onChangeText={this.onChangeText} />
                </div>
              </Col>
            </Row>
          </div>
          {/* Add Employee details ends */}

          <div className="save-changes">
            <Button onClick={this.onSave} type="primary">
              Save
            </Button>
            <span>or</span>
            <Link to="/app/products">
              <Button type="standard">
                <ArrowLeftOutlined /> Back to Products list
              </Button>
            </Link>
          </div>
          {/* Invoice Information ends */}
        </Col>
      </Row>
    )
  }
}
