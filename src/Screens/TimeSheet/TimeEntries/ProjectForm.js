import { Col, Row } from 'antd'
import React from 'react'
import { connect } from 'react-redux'
import { addProject, getActiveClients } from '../../../Actions/UserAction'
import InputBox from '../../../Components/InputBox/InputBox'
import ModalBoxFooter from '../../../Components/ModalBox/ModalBoxFooter'
import SelectBox from '../../../Components/SelectBox/SelectBox'

const BILLABLE_OPTIONS = [
  { label: 'Yes', value: 'Yes' },
  { label: 'No', value: 'No' }
]

class ProjectForm extends React.Component {
  constructor() {
    super()
    this.state = {
      name: '',
      client: '',
      billable: '',

      clientOptions: []
    }
  }

  componentDidMount() {
    getActiveClients().then((clients) => {
      if (clients) {
        const clientOptions = [{ label: 'Own Project', value: 'Self' }]
        clients.forEach((val) => {
          clientOptions.push({ label: val.name, value: val.id })
        })
        this.setState({ clientOptions })
      }
    })
  }

  onChangeText = (value, type) => {
    this.setState({ [type]: value })
  }

  onCreate = () => {
    const { name, client, billable } = this.state
    const validateFields = ['name', 'client', 'billable']
    let flag = true
    validateFields.map((data) => {
      if (this[data] && this[data].error) {
        flag = false
      }

      return true
    })

    if (flag) {
      const obj = {
        name,
        client: client === 'Self' ? null : client,
        billable,
        user: this.props.userInfo.id,
        company: this.props.companyInfo.id
      }
      addProject(obj).then((project) => {
        if (project) {
          this.props.dispatch({
            type: 'SET_USER_REDUCER',
            payload: { projects: [project, ...this.props.projects] }
          })
          this.props.onCancel()
        }
      })
    } else {
      this.setState({ isSubmit: true })
    }
  }

  render() {
    return (
      <Row gutter={[24]}>
        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 24 }}>
          <div className="form-fields">
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
        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 24 }}>
          <div className="form-fields">
            <SelectBox
              label="Client"
              refs={(ref) => (this.client = ref)}
              id="client"
              value={this.state.client}
              options={this.state.clientOptions}
              onChangeText={this.onChangeText}
              isSubmit={this.state.isSubmit}
            />
          </div>
        </Col>
        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 24 }}>
          <div className="form-fields">
            <SelectBox
              label="Billable"
              refs={(ref) => (this.billable = ref)}
              id="billable"
              value={this.state.billable}
              options={BILLABLE_OPTIONS}
              onChangeText={this.onChangeText}
              isSubmit={this.state.isSubmit}
            />
          </div>
        </Col>
        <Col xs={{ span: 24 }} sm={{ span: 8 }} md={{ span: 24 }} lg={{ span: 24 }}>
          <ModalBoxFooter
            loader={this.state.buttonLoader}
            okText="Add"
            onOk={this.onCreate}
            onCancel={() => this.props.onCancel()}
          />
        </Col>
      </Row>
    )
  }
}

function mapStateToProps(state) {
  return {
    userInfo: state.users.userInfo,
    companyInfo: state.users.companyInfo,
    projects: state.users.projects
  }
}

export default connect(mapStateToProps)(ProjectForm)
