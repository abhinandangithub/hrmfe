import { Col, Row, Tabs } from 'antd'
import React from 'react'
import UploadCategories from './UploadCategories'
import UploadClients from './UploadClients'
import UploadEmployees from './UploadEmployees'
import UploadOptions from './UploadOptions'
import UploadRoles from './UploadRoles'

const { TabPane } = Tabs

export default class MasterUpload extends React.Component {
  constructor() {
    super()
    this.state = {
      defaultTab: 'Roles'
    }
  }

  onChangeState = (state) => {
    this.setState(state)
  }

  onChangeTab = (defaultTab) => {
    this.setState({ defaultTab })
  }

  render() {
    return (
      <Row justify="center">
        <Col xs={{ span: 23 }} sm={{ span: 23 }} md={{ span: 22 }} lg={{ span: 18 }}>
          <div className="top-title-section">
            <h2>Master Upload</h2>
          </div>
          <div>
            <Tabs defaultActiveKey={this.state.defaultTab} onChange={this.onChangeTab}>
              <TabPane tab="Roles" key="Roles">
                <UploadRoles />
              </TabPane>
              <TabPane tab="Options" key="Options">
                <UploadOptions />
              </TabPane>
              <TabPane tab="Categories" key="Categories">
                <UploadCategories />
              </TabPane>
              <TabPane tab="Clients" key="Clients">
                <UploadClients />
              </TabPane>
              {/* <TabPane tab="Chart Of Accounts" key="ChartOfAccounts">
                <UploadChartOfAccounts />
              </TabPane> */}
              {/* <TabPane tab="Departments" key="Departments">
                                    <UploadDepartments />
                                </TabPane> */}
              <TabPane tab="Employees" key="Employees">
                <UploadEmployees />
              </TabPane>
              {/* <TabPane tab="Warehouses" key="Warehouses">
                <UploadWarehouses />
              </TabPane>
              <TabPane tab="Services" key="Services">
                <UploadServices />
              </TabPane>
              <TabPane tab="Materials" key="Materials">
                <UploadMaterials />
              </TabPane>
              <TabPane tab="SalesPersons" key="SalesPersons">
                <UploadSalesPersons />
              </TabPane>
              <TabPane tab="Stocks" key="Stocks">
                <UploadStocks />
              </TabPane> */}
            </Tabs>
          </div>
        </Col>
      </Row>
    )
  }
}
