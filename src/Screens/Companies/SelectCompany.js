import { Button, Modal } from 'antd'
import React from 'react'
import company from '../../assets/images/company.svg'
import './SelectCompany.scss'

export default class SelectCompany extends React.Component {
  // model popup starts
  constructor(props) {
    super(props)

    this.state = { visible: false }
  }

  showModal = () => {
    this.setState({
      visible: true
    })
  }

  handleOk = (e) => {
    console.log(e)
    this.setState({
      visible: false
    })
  }

  handleCancel = (e) => {
    console.log(e)
    this.setState({
      visible: false
    })
  }

  //   model popup ends
  render() {
    return (
      <>
        <Button type="primary" onClick={this.showModal}>
          Select Company Trigger
        </Button>
        <Modal
          title="Select Company"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          width={600}>
          <div className="company-list">
            <div className="list">
              <div className="details">
                <img src={company} alt="company" />
                <h4>Company Name</h4>
              </div>
            </div>
            {/* list ends here */}
            <div className="list">
              <div className="details">
                <img src={company} alt="company" />
                <h4>Company Name</h4>
              </div>
            </div>
            {/* list ends here */}
            <div className="list">
              <div className="details">
                <img src={company} alt="company" />
                <h4>Company Name</h4>
              </div>
            </div>
            {/* list ends here */}
          </div>
        </Modal>
      </>
    )
  }
}
