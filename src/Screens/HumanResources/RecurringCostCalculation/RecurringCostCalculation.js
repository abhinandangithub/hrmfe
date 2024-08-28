import { Tabs } from 'antd'
import React, { useState } from 'react'
import FilterLayout from '../../../Layout/FilterLayout'
import TableLayout from '../../../Layout/TableLayout'
import { GET_DATA, SET_DATA } from '../../../Util/Util'
import LabourMinistryRegulatoryAuthoritiesPayments from './LabourMinistryRegulatoryAuthoritiesPayments'
import PensionFundContribution from './PensionFundContribution'
import RecurringCostCalculationFilter from './RecurringCostCalculationFilter'
import VisaPayments from './VisaPayments'

const { TabPane } = Tabs

export default function RecurringCostCalculation(props) {
  const cacheData = GET_DATA('recurringCostCalculation')
  const [filterData, setFilterData] = useState(cacheData?.filterData || {})
  const [activeTab, setActiveTab] = useState(cacheData?.activeTab || 'PensionFund')

  const onChangeTab = (currentTab) => {
    SET_DATA('recurringCostCalculation.activeTab', currentTab)
    setActiveTab(currentTab)
  }

  return (
    <FilterLayout filter={<RecurringCostCalculationFilter onFilter={setFilterData} />}>
      <TableLayout title="Recurring Cost Calculation">
        <Tabs defaultActiveKey={activeTab} onChange={onChangeTab}>
          <TabPane tab="Pension Fund Contribution" key="PensionFund" />
          <TabPane tab="Labour Ministry Regulatory Authorities" key="LabourMinistry" />
          <TabPane tab="Visa Payments" key="VisaPayments" />
        </Tabs>
        {activeTab === 'PensionFund' && <PensionFundContribution filterData={filterData} {...props} />}
        {activeTab === 'LabourMinistry' && (
          <LabourMinistryRegulatoryAuthoritiesPayments filterData={filterData} {...props} />
        )}
        {activeTab === 'VisaPayments' && <VisaPayments filterData={filterData} {...props} />}
      </TableLayout>
    </FilterLayout>
  )
}
