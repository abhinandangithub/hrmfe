import React from 'react'
import { getEmployees } from '../../../Actions/UserAction'
import DateBox from '../../../Components/DateBox/DateBox'

// const options = [
//   // {
//   //   value: 'forAll',
//   //   label: 'For All'
//   // },
//   {
//     value: 'individual',
//     label: 'Individual'
//   }
// ]
export default class GeneratePayrollFilter extends React.Component {
  constructor() {
    super()
    this.state = {
      // defaultActiveKey: '1',
      // value1: 'forAll',
      // employees: [],
      selectMonth: ''
      // empid: ''
    }
  }

  componentDidMount() {
    getEmployees().then((employees) => {
      if (employees) {
        console.log('employees33', employees)
        // const employeeList = employees.map((data) => ({ label: data.name, value: data.employeeNo }))
        // this.setState({ employees: employeeList })
      }
    })
  }

  onChangeText = (value, type) => {
    this.setState({ [type]: value })
  }

  onChange1 = (e) => {
    console.log('radio1 checked', e.target.value)
    // this.setState({
    //   value1: e.target.value
    // })
  }

  generatePayroll = () => {
    this.props.getToRun({ selectMonth: this.state.selectMonth })
  }

  render() {
    return (
      <>
        {/* <Tabs
            defaultActiveKey={this.state.defaultActiveKey}
            onChange={(defaultActiveKey) => this.setState({ defaultActiveKey })}>
            <TabPane tab="Run" key="1"> */}
        <form action="">
          <div className="form-fields">
            <DateBox
              label="Payroll month"
              id="selectMonth"
              optional
              onChangeText={this.onChangeText}
              picker="month"
            />
          </div>
          {/* <div className="form-fields">
                  <Radio.Group options={options} onChange={this.onChange1} value={this.state.value1} />
                </div>
                <div className="form-fields">
                  <SelectBox
                    label="Select Employee"
                    refs={(ref) => (this.status = ref)}
                    id="empid"
                    optional
                    value={this.state.status}
                    options={this.state.employees}
                    onChangeText={this.onChangeText}
                    isSubmit={this.state.isSubmit}
                    disabled={this.state.value1 === 'forAll'}
                  />
                </div> */}

          <div className="form-fields">
            <button
              type="button"
              className="btn-glow btn-block primary"
              onClick={() => this.generatePayroll()}>
              Run
            </button>
          </div>
        </form>
        {/* </TabPane>
            <TabPane tab="Re run" key="2">
              <form action="">
                <div className="form-fields">
                  <DateBox
                    label="Payroll month"
                    id="name"
                    optional
                    onChangeText={this.onChangeText}
                    picker="month"
                  />
                </div>
                <div className="form-fields">
                  <DateBox label="TO" id="name" optional onChangeText={this.onChangeText} picker="month" />
                </div>
                <div className="form-fields">
                  <SelectBox
                    label="For"
                    refs={(ref) => (this.status = ref)}
                    id="for"
                    optional
                    value={this.state.status}
                    options={this.state.employees}
                    onChangeText={this.onChangeText}
                    isSubmit={this.state.isSubmit}
                  />
                </div>
                <InputNumberBox
                  label="Run No"
                  refs={(ref) => (this.runNo = ref)}
                  id="runNo"
                  value={this.state.runNo}
                  onChangeText={(value, type) => this.onChangeText(value, type)}
                />

                <div className="form-fields">
                  <button type="button" className="btn-glow btn-block primary">
                    Run
                  </button>
                </div>
              </form>
            </TabPane>
          </Tabs> */}
      </>
    )
  }
}
