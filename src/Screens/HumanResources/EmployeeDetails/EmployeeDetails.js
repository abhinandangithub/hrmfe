import { Col, Row, Tabs } from 'antd'
import { isEmpty } from 'lodash'
import React from 'react'
import { withTranslation } from 'react-i18next'
import FooterActions from '../../../Components/FooterActions'
import Dependents from '../../../ScreenComponents/HumanResources/Dependents/Dependents'
import apiClient from '../../../Util/apiClient'
import '../HumanResources.scss'
import BankDetails from './BankDetails'
import BasicDetails from './BasicDetails'
// import DocumentDetails from './DocumentDetails'
import EducationDetails from './EducationDetails'
import EmergencyDetails from './EmergencyDetails'
import HiringDetails from './HiringDetails'
import InsuranceDetails from './InsuranceDetails'
import JobHistory from './JobHistory'
import OfficialDetails from './OfficialDetails'
import SalaryHistory from './SalaryHistory'
import SkillDetails from './SkillDetails'

const { TabPane } = Tabs

class EmployeeDetails extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      defaultTab: 'HiringDetails',
      loaderText: props.match?.params?.id ? 'Loading..' : false,
      employeeId: props.match?.params?.id,
      restrictPage: true
    }
    console.log('props', props)

    const roleData = props.userInfo?.roleData
    const roleBase = ['Employee', 'Manager']
    const findrole = roleBase.find((x) => x === roleData?.name)

    if (findrole) {
      this.state.restrictPage = true
    } else {
      this.state.restrictPage = false
    }
  }

  componentDidMount() {
    if (this.props.match?.params?.id) {
      this.checkEmployee(this.props.match.params.id)
    }
  }

  checkEmployee = (id) => {
    apiClient.get(`employees/get/${id}`).then(({ data }) => {
      if (data && data.result) {
        this.setState({ loaderText: false, currentEmployee: data.result })
      } else {
        this.setState({ loaderText: 'Invalid' })
      }
    })
  }

  onChangeTab = (defaultTab) => {
    this.setState({ defaultTab })
  }

  onChangeEmployee = (employeeId) => {
    this.props.history(`/app/edit-employee/${employeeId}`)
    this.checkEmployee(employeeId)
    this.setState({ employeeId })
  }

  render() {
    const { currentEmployee, employeeId, loaderText } = this.state

    return (
      <Row justify="center" className="inner-contents individual-employee-details">
        <Col xs={{ span: 23 }} sm={{ span: 23 }} md={{ span: 22 }} lg={{ span: 22 }}>
          <Row>
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 18 }} lg={{ span: 20 }}>
              <h2 className="panel-title">
                {this.props.t('Employee Details')}
                <span style={{ color: '#000' }}>
                  {!isEmpty(currentEmployee)
                    ? `(${currentEmployee?.employeeNo} - ${
                        currentEmployee?.name || currentEmployee?.firstName
                      })`
                    : null}
                </span>
              </h2>
            </Col>
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6 }} lg={{ span: 4 }}>
              {/* <div className="form-field">
                <SelectBox
                  placeholder="Select Employee"
                  id="selectEmployee"
                  value={selectedEmployeeID}
                  options={this.getEmployeeOptions()}
                  onChangeText={this.onSelectEmployee}
                />
              </div> */}
            </Col>
          </Row>
          {loaderText ? (
            <p>{loaderText}</p>
          ) : (
            <div className="employee-details">
              <Tabs defaultActiveKey={this.state.defaultTab} onChange={this.onChangeTab}>
                <TabPane tab={this.props.t('Hiring Details')} key="HiringDetails">
                  <HiringDetails
                    currentEmployee={currentEmployee}
                    restrictPage={this.state.restrictPage}
                    {...this.props}
                    onChangeEmployee={this.onChangeEmployee}
                  />
                </TabPane>

                {/* <TabPane tab="Official Details" key="OfficialDetails">
                  <OfficialDetails
                  
                    currentEmployee={currentEmployee}
                    employeeId={employeeId}
                    onChangeEmployee={this.onChangeEmployee}
                    {...this.props}
                  />
                </TabPane> */}

                {employeeId && (
                  <>
                    <TabPane tab={this.props.t('Contact Details')} key="BasicDetails">
                      <BasicDetails
                        currentEmployee={currentEmployee}
                        employeeId={employeeId}
                        restrictPage={this.state.restrictPage}
                        {...this.props}
                      />
                    </TabPane>
                    <TabPane tab={this.props.t('Employment details')} key="OfficialDetails">
                      <OfficialDetails
                        currentEmployee={currentEmployee}
                        employeeId={employeeId}
                        restrictPage={this.state.restrictPage}
                        {...this.props}
                      />
                    </TabPane>

                    <TabPane tab={this.props.t('Bank Details')} key="BankDetails">
                      <BankDetails
                        currentEmployee={currentEmployee}
                        {...this.props}
                        restrictPage={this.state.restrictPage}
                      />
                    </TabPane>
                    <TabPane tab={this.props.t('Emergency contact information')} key="EmergencyDetails">
                      <EmergencyDetails
                        currentEmployee={currentEmployee}
                        {...this.props}
                        restrictPage={this.state.restrictPage}
                      />
                    </TabPane>
                    <TabPane tab={this.props.t('Insurance Details')} key="InsuranceDetails">
                      <InsuranceDetails
                        currentEmployee={currentEmployee}
                        {...this.props}
                        restrictPage={this.state.restrictPage}
                      />
                    </TabPane>
                    <TabPane tab={this.props.t('Dependents')} key="Dependents">
                      <Dependents
                        currentEmployee={currentEmployee}
                        {...this.props}
                        restrictPage={this.state.restrictPage}
                      />
                    </TabPane>
                    <TabPane tab={this.props.t('Qualification')} key="Qualification">
                      {/* <WorkExperience currentEmployee={currentEmployee} {...this.props} /> */}
                      <EducationDetails
                        currentEmployee={currentEmployee}
                        {...this.props}
                        restrictPage={this.state.restrictPage}
                      />
                      <SkillDetails
                        currentEmployee={currentEmployee}
                        {...this.props}
                        restrictPage={this.state.restrictPage}
                      />
                      <FooterActions
                        leftActions={
                          !this.state.restrictPage
                            ? [
                                {
                                  prefix: 'flaticon-back',
                                  label: 'Back to employee list',
                                  onClick: () => this.state.history('/app/employees')
                                }
                              ]
                            : []
                        }
                      />
                    </TabPane>
                    <TabPane tab={this.props.t('Job History')} key="JobHistory">
                      <JobHistory
                        currentEmployee={currentEmployee}
                        {...this.props}
                        restrictPage={this.state.restrictPage}
                      />
                    </TabPane>
                    <TabPane tab={this.props.t('Salary Details')} key="SalaryHistory">
                      <SalaryHistory
                        currentEmployee={currentEmployee}
                        {...this.props}
                        restrictPage={this.state.restrictPage}
                      />
                    </TabPane>
                    {/* <TabPane tab={this.props.t('Document Details')} key="DocumentDetails">
                      <DocumentDetails currentEmployee={currentEmployee} {...this.props} />
                    </TabPane> */}
                  </>
                )}
              </Tabs>
            </div>
          )}
        </Col>
      </Row>
    )
  }
}

export default withTranslation()(EmployeeDetails)
