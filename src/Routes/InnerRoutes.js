import { Modal } from 'antd'
import React from 'react'
import { connect } from 'react-redux'
import { Route, Routes } from 'react-router-dom'
import { getTimeEntryById, getUserByToken } from '../Actions/UserAction'
import { FullLoader, SideBarLoader } from '../Components/LoaderBox/Loader'
import LoaderBox from '../Components/LoaderBox/LoaderBox'
import Layout from '../Layout/Layout'
import AsyncRoute from './AsyncRoute'
import NotFound from './NotFound'
import ReleaseInfo from './ReleaseInfo'

const getRoutes = (url) => [
  { path: `${url}/dashboard`, component: FullLoader(() => import('../Screens/Dashboard/HrDashboard')) },
  {
    path: `${url}/changePassword`,
    component: FullLoader(() => import('../Screens/ChangePassword/ChangePassword'))
  },
  { path: `${url}/profile`, component: FullLoader(() => import('../Screens/Profile/Profile')) },
  {
    path: `${url}/manage-company`,
    component: FullLoader(() => import('../Screens/MasterData/Companies/SetCompany'))
  },
  {
    path: `${url}/notifications`,
    component: FullLoader(() => import('../Screens/Notifications/Notifications'))
  },
  {
    path: `${url}/inbox/:workflowId?`,
    component: FullLoader(() => import('../Screens/Workflows/Workflows'))
  },
  {
    path: `${url}/master-upload`,
    component: FullLoader(() => import('../Screens/MasterData/MasterUploads/MasterUploads'))
  }
]

const getAsyncRoutes = (url) => [
  {
    path: `${url}/time-entries`,
    screen: FullLoader(() => import('../Screens/TimeSheet/TimeEntries/TimeEntries'))
  },
  {
    path: `${url}/time-reports`,
    screen: FullLoader(() => import('../Screens/TimeSheet/TimeReports/TimeReports'))
  },
  {
    path: `${url}/time-reports-view`,
    screen: FullLoader(() => import('../Screens/TimeSheet/TimeReports/TimeReportView'))
  },
  {
    path: `${url}/expense-claims`,
    screen: FullLoader(() => import('../Screens/ExpensesClaim/ExpensesEntries'))
  },

  {
    path: `${url}/companies`,
    screen: FullLoader(() => import('../Screens/MasterData/Companies/Companies'))
  },
  {
    path: `${url}/add-company`,
    screen: FullLoader(() => import('../Screens/MasterData/Companies/CompanyForm'))
  },
  {
    path: `${url}/edit-company/:id`,
    screen: FullLoader(() => import('../Screens/MasterData/Companies/CompanyForm'))
  },
  {
    path: `${url}/divisions`,
    screen: SideBarLoader(() => import('../Screens/MasterData/Divisions/Divisions'))
  },
  {
    path: `${url}/departments`,
    screen: SideBarLoader(() => import('../Screens/MasterData/Departments/Departments'))
  },
  {
    path: `${url}/add-division`,
    screen: FullLoader(() => import('../Screens/MasterData/Divisions/DivisionForm'))
  },
  {
    path: `${url}/edit-division/:id`,
    screen: FullLoader(() => import('../Screens/MasterData/Divisions/DivisionForm'))
  },
  {
    path: `${url}/add-departments`,
    screen: FullLoader(() => import('../Screens/MasterData/Departments/DepartmentsForm'))
  },
  {
    path: `${url}/edit-departments/:id`,
    screen: FullLoader(() => import('../Screens/MasterData/Departments/DepartmentsForm'))
  },
  { path: `${url}/users`, screen: SideBarLoader(() => import('../Screens/MasterData/Users/UsersNew')) },
  {
    path: `${url}/currencies`,
    screen: SideBarLoader(() => import('../Screens/MasterData/Currencies/Currencies'))
  },
  {
    path: `${url}/add-currency`,
    screen: FullLoader(() => import('../Screens/MasterData/Currencies/CurrencyForm'))
  },
  {
    path: `${url}/edit-currency/:id`,
    screen: FullLoader(() => import('../Screens/MasterData/Currencies/CurrencyForm'))
  },
  {
    path: `${url}/categories`,
    screen: SideBarLoader(() => import('../Screens/MasterData/Categories/Categories'))
  },
  {
    path: `${url}/add-category`,
    screen: FullLoader(() => import('../Screens/MasterData/Categories/CategoryForm'))
  },
  {
    path: `${url}/edit-category/:id`,
    screen: FullLoader(() => import('../Screens/MasterData/Categories/CategoryForm'))
  },
  {
    path: `${url}/products`,
    screen: SideBarLoader(() => import('../Screens/MasterData/Products/MergedProducts'))
  },
  {
    path: `${url}/add-product`,
    screen: FullLoader(() => import('../Screens/MasterData/Products/MergedProductForm'))
  },
  {
    path: `${url}/edit-product/:id`,
    screen: FullLoader(() => import('../Screens/MasterData/Products/MergedProductForm'))
  },
  {
    path: `${url}/customers`,
    screen: SideBarLoader(() => import('../Screens/MasterData/Clients/Customers'))
  },
  {
    path: `${url}/add-customer`,
    screen: FullLoader(() => import('../Screens/MasterData/Clients/CustomerForm'))
  },
  {
    path: `${url}/edit-customer/:id`,
    screen: FullLoader(() => import('../Screens/MasterData/Clients/CustomerForm'))
  },

  {
    path: `${url}/vendors`,
    screen: SideBarLoader(() => import('../Screens/MasterData/Clients/Vendors'))
  },
  {
    path: `${url}/add-vendor`,
    screen: FullLoader(() => import('../Screens/MasterData/Clients/VendorForm'))
  },
  {
    path: `${url}/edit-vendor/:id`,
    screen: FullLoader(() => import('../Screens/MasterData/Clients/VendorForm'))
  },

  { path: `${url}/options`, screen: SideBarLoader(() => import('../Screens/MasterData/Options/Options')) },
  { path: `${url}/add-option`, screen: FullLoader(() => import('../Screens/MasterData/Options/OptionForm')) },
  {
    path: `${url}/edit-option/:id`,
    screen: FullLoader(() => import('../Screens/MasterData/Options/OptionForm'))
  },
  {
    path: `${url}/employees`,
    screen: SideBarLoader(() => import('../Screens/MasterData/Employees/Employees'))
  },
  {
    path: `${url}/add-employee`,
    screen: FullLoader(() => import('../Screens/HumanResources/EmployeeDetails/EmployeeDetails'))
  },
  {
    path: `${url}/edit-employee/:id`,
    screen: FullLoader(() => import('../Screens/HumanResources/EmployeeDetails/EmployeeDetails')),
    access: 'edit-employee'
  },
  { path: `${url}/roles`, screen: FullLoader(() => import('../Screens/MasterData/Roles/Roles')) },
  { path: `${url}/rolesnew`, screen: FullLoader(() => import('../Screens/MasterData/Roles/RolesNew')) },
  {
    path: `${url}/add-role`,
    screen: FullLoader(() => import('../Screens/MasterData/Roles/RoleFormNew'))
  },
  {
    path: `${url}/grades`,
    screen: SideBarLoader(() => import('../Screens/HumanResources/Grades/Grades'))
  },
  {
    path: `${url}/add-grade`,
    screen: FullLoader(() => import('../Screens/HumanResources/Grades/GradeForm'))
  },
  {
    path: `${url}/edit-grade/:id`,
    screen: FullLoader(() => import('../Screens/HumanResources/Grades/GradeForm'))
  },

  {
    path: `${url}/designations`,
    screen: SideBarLoader(() => import('../Screens/HumanResources/Designations/Designations'))
  },
  {
    path: `${url}/add-designation`,
    screen: FullLoader(() => import('../Screens/HumanResources/Designations/DesignationForm'))
  },
  {
    path: `${url}/edit-designation/:id`,
    screen: FullLoader(() => import('../Screens/HumanResources/Designations/DesignationForm'))
  },

  {
    path: `${url}/employee-transfers`,
    screen: SideBarLoader(() => import('../Screens/HumanResources/EmployeeTransfers/EmployeeTransfers'))
  },
  {
    path: `${url}/add-employee-transfer`,
    screen: FullLoader(() => import('../Screens/HumanResources/EmployeeTransfers/EmployeeTransferForm'))
  },
  {
    path: `${url}/edit-employee-transfer/:id`,
    screen: FullLoader(() => import('../Screens/HumanResources/EmployeeTransfers/EmployeeTransferForm'))
  },
  {
    path: `${url}/termination`,
    screen: SideBarLoader(() => import('../Screens/HumanResources/Termination/TerminationNew'))
  },
  {
    path: `${url}/add-termination`,
    screen: FullLoader(() => import('../Screens/HumanResources/Termination/TerminationForm'))
  },
  {
    path: `${url}/edit-termination/:id`,
    screen: FullLoader(() => import('../Screens/HumanResources/Termination/TerminationForm'))
  },

  {
    path: `${url}/termination-checklists`,
    screen: SideBarLoader(() =>
      import('../Screens/HumanResources/TerminationChecklists/TerminationChecklists')
    )
  },
  {
    path: `${url}/add-termination-checklist`,
    screen: FullLoader(() =>
      import('../Screens/HumanResources/TerminationChecklists/TerminationChecklistForm')
    )
  },
  {
    path: `${url}/edit-termination-checklist/:id`,
    screen: FullLoader(() =>
      import('../Screens/HumanResources/TerminationChecklists/TerminationChecklistForm')
    )
  },

  {
    path: `${url}/job-sequences`,
    screen: SideBarLoader(() => import('../Screens/HumanResources/JobSequences/JobSequences'))
  },
  {
    path: `${url}/add-job-sequence`,
    screen: FullLoader(() => import('../Screens/HumanResources/JobSequences/JobSequenceForm'))
  },
  {
    path: `${url}/edit-job-sequence/:id`,
    screen: FullLoader(() => import('../Screens/HumanResources/JobSequences/JobSequenceForm'))
  },
  {
    path: `${url}/applied-jobs`,
    screen: SideBarLoader(() => import('../Screens/HumanResources/AppliedJobs/AppliedJobs'))
  },
  {
    path: `${url}/edit-applied-job/:id`,
    screen: FullLoader(() => import('../Screens/HumanResources/AppliedJobs/AppliedJobForm'))
  },
  {
    path: `${url}/applied-job-dashbord`,
    screen: FullLoader(() => import('../Screens/HumanResources/AppliedJobs/AppliedJobsDashboard'))
  },

  {
    path: `${url}/payroll-definitions`,
    screen: FullLoader(() => import('../Screens/Payroll/PayrollDefinitions/PayrollDefinitions'))
  },
  {
    path: `${url}/payroll-components`,
    screen: FullLoader(() => import('../Screens/Payroll/PayrollComponents'))
  },
  {
    path: `${url}/payroll-definitions/add`,
    screen: FullLoader(() => import('../Screens/Payroll/PayrollDefinitions/AddPayrollDefinition'))
  },
  {
    path: `${url}/payroll-definitions/edit/:id`,
    screen: FullLoader(() => import('../Screens/Payroll/PayrollDefinitions/AddPayrollDefinition'))
  },
  {
    path: `${url}/paymaster`,
    screen: FullLoader(() => import('../Screens/Payroll/Paymaster/Paymaster'))
  },
  {
    path: `${url}/paymaster/add`,
    screen: FullLoader(() => import('../Screens/Payroll/Paymaster/PaymasterForm'))
  },
  {
    path: `${url}/paymaster/edit/:id`,
    screen: FullLoader(() => import('../Screens/Payroll/Paymaster/PaymasterForm'))
  },
  { path: `${url}/taxdata`, screen: FullLoader(() => import('../Screens/Payroll/Taxdata/Taxdata')) },
  { path: `${url}/add-taxdata`, screen: FullLoader(() => import('../Screens/Payroll/Taxdata/TaxdataForm')) },
  {
    path: `${url}/exchange-rates`,
    screen: FullLoader(() => import('../Screens/Payroll/ExchangeRate/ExchangeRate'))
  },
  {
    path: `${url}/add-exchange-rate`,
    screen: FullLoader(() => import('../Screens/Payroll/ExchangeRate/ExchangeRateForm'))
  },
  {
    path: `${url}/edit-exchange-rate/:id`,
    screen: FullLoader(() => import('../Screens/Payroll/ExchangeRate/ExchangeRateForm'))
  },
  {
    path: `${url}/holiday-calendar`,
    screen: FullLoader(() => import('../Screens/Payroll/HolidayCalendar/HolidayCalendar'))
  },
  {
    path: `${url}/add-holiday-calendar`,
    screen: FullLoader(() => import('../Screens/Payroll/HolidayCalendar/HolidayCalendarForm'))
  },
  {
    path: `${url}/edit-holiday-calendar/:id`,
    screen: FullLoader(() => import('../Screens/Payroll/HolidayCalendar/HolidayCalendarForm'))
  },

  {
    path: `${url}/uom-conversions`,
    screen: SideBarLoader(() => import('../Screens/MasterData/UomConversions/UomConversions'))
  },
  {
    path: `${url}/add-uom-conversion`,
    screen: FullLoader(() => import('../Screens/MasterData/UomConversions/UomConversionForm'))
  },
  {
    path: `${url}/edit-uom-conversion/:id`,
    screen: FullLoader(() => import('../Screens/MasterData/UomConversions/UomConversionForm'))
  },
  { path: `${url}/projects`, screen: FullLoader(() => import('../Screens/ProjectData/Projects/Projects')) },
  {
    path: `${url}/add-project`,
    screen: FullLoader(() => import('../Screens/ProjectData/Projects/ProjectForm'))
  },
  {
    path: `${url}/edit-project/:id`,
    screen: FullLoader(() => import('../Screens/ProjectData/Projects/ProjectForm'))
  },
  {
    path: `${url}/project-employees`,
    screen: FullLoader(() => import('../Screens/ProjectData/ProjectAndEmployees/ProjectAndEmployees'))
  },
  {
    path: `${url}/add-project-employee`,
    screen: FullLoader(() => import('../Screens/ProjectData/ProjectAndEmployees/ProjectAndEmployeeForm'))
  },
  {
    path: `${url}/edit-project-employee/:id`,
    screen: FullLoader(() => import('../Screens/ProjectData/ProjectAndEmployees/ProjectAndEmployeeForm'))
  },
  {
    path: `${url}/project-employee-rates`,
    screen: FullLoader(() => import('../Screens/ProjectData/ProjectAndEmployeeRates/ProjectAndEmployeeRates'))
  },
  {
    path: `${url}/add-project-employee-rate`,
    screen: FullLoader(() =>
      import('../Screens/ProjectData/ProjectAndEmployeeRates/ProjectAndEmployeeRateForm')
    )
  },
  {
    path: `${url}/edit-project-employee-rate/:id`,
    screen: FullLoader(() =>
      import('../Screens/ProjectData/ProjectAndEmployeeRates/ProjectAndEmployeeRateForm')
    )
  },
  {
    path: `${url}/generate-payroll`,
    screen: FullLoader(() => import('../Screens/Payroll/GeneratePayroll/GeneratePayroll'))
  },

  { path: `${url}/payrolls`, screen: FullLoader(() => import('../Screens/Payroll/Payrolls/Payrolls')) },
  {
    path: `${url}/payrolls/:ids`,
    screen: FullLoader(() => import('../Screens/Payroll/Payrolls/PayrollView'))
  },
  // { path: `${url}/custom-templates`, screen: SideBarLoader(() => import('../Screens/Templates/Templates')) },
  {
    path: `${url}/custom-templates`,
    screen: SideBarLoader(() => import('../Screens/Templates/TemplateNew'))
  },
  { path: `${url}/custom-templates/:id`, screen: FullLoader(() => import('../Screens/Templates/editor')) },
  {
    path: `${url}/numbering-series`,
    screen: FullLoader(() => import('../Screens/MasterData/NumberingSeries/NumberSeriesNew'))
  },
  {
    path: `${url}/company-configurations`,
    screen: FullLoader(() => import('../Screens/MasterData/Companies/CompanyConfigurations'))
  },

  {
    path: `${url}/employee-details`,
    screen: FullLoader(() => import('../Screens/HumanResources/EmployeeDetails/EmployeeDetails'))
  },
  {
    path: `${url}/sales-persons`,
    screen: SideBarLoader(() => import('../Screens/MasterData/SalesPersons/SalesPersons'))
  },
  {
    path: `${url}/add-sales-person`,
    screen: FullLoader(() => import('../Screens/MasterData/SalesPersons/SalesPersonForm'))
  },
  {
    path: `${url}/edit-sales-person/:id`,
    screen: FullLoader(() => import('../Screens/MasterData/SalesPersons/SalesPersonForm'))
  },
  {
    path: `${url}/sales-person-by-clients`,
    screen: SideBarLoader(() => import('../Screens/MasterData/SalesPersonByClients/SalesPersonByClients'))
  },
  {
    path: `${url}/add-sales-person-by-client`,
    screen: FullLoader(() => import('../Screens/MasterData/SalesPersonByClients/SalesPersonByClientForm'))
  },
  {
    path: `${url}/edit-sales-person-by-client/:id`,
    screen: FullLoader(() => import('../Screens/MasterData/SalesPersonByClients/SalesPersonByClientForm'))
  },
  {
    path: `${url}/absence-management`,
    screen: FullLoader(() => import('../Screens/HumanResources/AbsenceManagement/AbsenceManagement'))
  },
  {
    path: `${url}/leave-generation`,
    screen: FullLoader(() => import('../Screens/HumanResources/AbsenceManagement/AbsenceLeaveGeneration'))
  },
  {
    path: `${url}/leave-configuration`,
    screen: FullLoader(() =>
      import('../Screens/HumanResources/AbsenceManagement/LeaveConfiguration/LeaveConfiguration')
    )
  },
  {
    path: `${url}/edit-leave-configuration/:id/:index`,
    screen: FullLoader(() =>
      import('../Screens/HumanResources/AbsenceManagement/LeaveConfiguration/LeaveConfigurationForm')
    )
  },
  {
    path: `${url}/add-leave-configuration`,
    screen: FullLoader(() =>
      import('../Screens/HumanResources/AbsenceManagement/LeaveConfiguration/LeaveConfigurationForm')
    )
  },
  {
    path: `${url}/company-calendar-old`,
    screen: FullLoader(() =>
      import('../Screens/HumanResources/AbsenceManagement/CompanyCalendar/CompanyCalendarOld')
    )
  },
  {
    path: `${url}/company-calendar`,
    screen: FullLoader(() =>
      import('../Screens/HumanResources/AbsenceManagement/CompanyCalendar/CompanyCalendar')
    )
  },
  {
    path: `${url}/edit-company-calendar/:id`,
    screen: FullLoader(() =>
      import('../Screens/HumanResources/AbsenceManagement/CompanyCalendar/CompanyCalendarForm')
    )
  },
  {
    path: `${url}/add-company-calendar`,
    screen: FullLoader(() =>
      import('../Screens/HumanResources/AbsenceManagement/CompanyCalendar/CompanyCalendarForm')
    )
  },
  {
    path: `${url}/leave-report`,
    screen: FullLoader(() => import('../Screens/HumanResources/AbsenceManagement/LeaveReport'))
  },
  {
    path: `${url}/apply-leave`,
    screen: FullLoader(() => import('../Screens/HumanResources/AbsenceManagement/ApplyLeave'))
  },
  {
    path: `${url}/leave-balance-generate-old`,
    screen: FullLoader(() =>
      import('../Screens/HumanResources/AbsenceManagement/LeaveBalanceGeneration/LeaveBalanceGeneration')
    )
  },
  {
    path: `${url}/leave-balance-generate`,
    screen: FullLoader(() =>
      import('../Screens/HumanResources/AbsenceManagement/LeaveBalanceGeneration/LeaveBalanceGenerationNew')
    )
  },
  { path: `${url}/assets`, screen: FullLoader(() => import('../Screens/HumanResources/Asset/Asset')) },
  { path: `${url}/add-asset`, screen: FullLoader(() => import('../Screens/HumanResources/Asset/AssetForm')) },
  {
    path: `${url}/edit-asset/:id`,
    screen: FullLoader(() => import('../Screens/HumanResources/Asset/AssetForm'))
  },

  {
    path: `${url}/asset-transfers`,
    screen: FullLoader(() => import('../Screens/HumanResources/AssetTransfers/AssetTransferNew'))
  },
  {
    path: `${url}/add-asset-transfer`,
    screen: FullLoader(() => import('../Screens/HumanResources/AssetTransfers/AssetTrasferForm'))
  },
  {
    path: `${url}/edit-asset-transfer/:id`,
    screen: FullLoader(() => import('../Screens/HumanResources/AssetTransfers/AssetTrasferForm'))
  },

  {
    path: `${url}/drive/:id?`,
    screen: FullLoader(() => import('../Screens/HumanResources/Drive/Drive'))
  },

  {
    path: `${url}/drive/search/:keywords`,
    screen: FullLoader(() => import('../Screens/HumanResources/Drive/Drive'))
  },

  {
    path: `${url}/transfer`,
    screen: FullLoader(() => import('../Screens/HumanResources/Transfer/Transfer'))
  },
  {
    path: `${url}/change-job`,
    screen: FullLoader(() => import('../Screens/HumanResources/ChangeJob/ChangeJob'))
  },
  {
    path: `${url}/change-compensation`,
    screen: FullLoader(() => import('../Screens/HumanResources/ChangeCompensation/ChangeCompensation'))
  },
  {
    path: `${url}/goals`,
    screen: SideBarLoader(() => import('../Screens/HumanResources/Performance/Goals'))
  },
  {
    path: `${url}/goal-assignment`,
    screen: FullLoader(() => import('../Screens/HumanResources/Performance/GoalsAssignment'))
  },
  {
    path: `${url}/appraisal-review`,
    screen: FullLoader(() => import('../Screens/HumanResources/Performance/AppraisalReview'))
  },
  {
    path: `${url}/add-appraisal-review`,
    screen: FullLoader(() => import('../Screens/HumanResources/Performance/AppraisalReviewForm'))
  },
  {
    path: `${url}/add-goal`,
    screen: FullLoader(() => import('../Screens/HumanResources/Performance/GoalsForm'))
  },
  {
    path: `${url}/assign-goal`,
    screen: FullLoader(() => import('../Screens/HumanResources/Performance/GoalsAssignmentForm'))
  },

  {
    path: `${url}/hr-configurations`,
    screen: FullLoader(() => import('../Screens/HumanResources/HrConfigurations/HrConfigurations'))
  },
  {
    path: `${url}/add-Grade-Designation`,
    screen: FullLoader(() => import('../Screens/HumanResources/Grade-Designation/GradeDesignationForm'))
  },
  {
    path: `${url}/Grade-Designation`,
    screen: FullLoader(() => import('../Screens/HumanResources/Grade-Designation/GradeDesignation'))
  },
  {
    path: `${url}/edit-Grade-Designation/:id`,
    screen: FullLoader(() => import('../Screens/HumanResources/Grade-Designation/GradeDesignationForm'))
  },
  {
    path: `${url}/recurring-cost-calculations`,
    screen: FullLoader(() =>
      import('../Screens/HumanResources/RecurringCostCalculation/RecurringCostCalculation')
    )
  },
  {
    path: `${url}/leave-request-generation`,
    screen: FullLoader(() =>
      import('../Screens/HumanResources/AbsenceManagement/LeaveRequestGeneration/LeaveGeneration')
    )
  },
  {
    path: `${url}/approvers`,
    screen: FullLoader(() => import('../Screens/MasterData/Approvers/Approvers'))
  },
  {
    path: `${url}/new-assets`,
    screen: SideBarLoader(() => import('../Screens/HumanResources/NewAsset/NewAssets'))
  },
  {
    path: `${url}/add-new-asset`,
    screen: FullLoader(() => import('../Screens/HumanResources/NewAsset/NewAssetForm'))
  },
  {
    path: `${url}/edit-new-asset/:id`,
    screen: FullLoader(() => import('../Screens/HumanResources/NewAsset/NewAssetForm'))
  },
  {
    path: `${url}/new-assets/capitalization/:id`,
    access: 'add-new-asset',
    screen: FullLoader(() => import('../Screens/HumanResources/NewAsset/Capitalization'))
  },
  {
    path: `${url}/new-assets/depreciation/:id`,
    access: 'add-new-asset',
    screen: FullLoader(() => import('../Screens/HumanResources/NewAsset/Depreciation'))
  },
  {
    path: `${url}/new-assets/revaluation/:id`,
    access: 'add-new-asset',
    screen: FullLoader(() => import('../Screens/HumanResources/NewAsset/Revaluation'))
  },
  {
    path: `${url}/new-assets/impairment/:id`,
    access: 'add-new-asset',
    screen: FullLoader(() => import('../Screens/HumanResources/NewAsset/Impairment'))
  },
  {
    path: `${url}/new-assets/disposal/:id`,
    access: 'add-new-asset',
    screen: FullLoader(() => import('../Screens/HumanResources/NewAsset/Disposal'))
  },
  {
    path: `${url}/new-assets/asset-split/:id`,
    access: 'add-new-asset',
    screen: FullLoader(() => import('../Screens/HumanResources/NewAsset/AssetSplit'))
  },
  {
    path: `${url}/asset-inventories`,
    access: 'asset-inventories',
    screen: SideBarLoader(() => import('../Screens/HumanResources/AssetInventory/AssetInventories'))
  },
  {
    path: `${url}/add-asset-inventory`,
    access: 'add-asset-inventory',
    screen: FullLoader(() => import('../Screens/HumanResources/AssetInventory/AssetInventoryForm'))
  },
  {
    path: `${url}/edit-asset-inventory/:id`,
    access: 'edit-asset-inventory',
    screen: FullLoader(() => import('../Screens/HumanResources/AssetInventory/AssetInventoryForm'))
  },
  {
    path: `${url}/view-asset-inventory/:id`,
    access: 'asset-inventories',
    screen: FullLoader(() => import('../Screens/HumanResources/AssetInventory/ViewInventory'))
  },
  {
    path: `${url}/barcode-scan`,
    screen: FullLoader(() => import('../Screens/HumanResources/Barcode/BarcodeScanner'))
  },
  {
    path: `${url}/tracked-assets/:tag`,
    access: 'asset-inventories',
    screen: FullLoader(() => import('../Screens/HumanResources/Barcode/trackedAssets'))
  },
  {
    path: `${url}/asset-code-scan/:id`,
    access: 'edit-asset-inventory',
    screen: FullLoader(() => import('../Screens/HumanResources/Barcode/AssetCode'))
  },
  {
    path: `${url}/employee-loans`,
    screen: SideBarLoader(() => import('../Screens/HumanResources/EmployeeLoan/EmployeeLoans'))
  },
  {
    path: `${url}/employee-dashboard`,
    screen: FullLoader(() => import('../Screens/HumanResources/EmployeeDashboard/EmployeeDashboard'))
  },
  {
    path: `${url}/add-employee-loan`,
    screen: FullLoader(() => import('../Screens/HumanResources/EmployeeLoan/EmployeeLoanForm'))
  },
  {
    path: `${url}/edit-employee-loan/:id`,
    screen: FullLoader(() => import('../Screens/HumanResources/EmployeeLoan/EmployeeLoanForm'))
  },

  {
    path: `${url}/pos-options`,
    screen: SideBarLoader(() => import('../Screens/MasterData/POSOptions/POSOptions'))
  },
  {
    path: `${url}/add-pos-option`,
    screen: FullLoader(() => import('../Screens/MasterData/POSOptions/POSOptionForm'))
  },
  {
    path: `${url}/edit-pos-option/:id`,
    screen: FullLoader(() => import('../Screens/MasterData/POSOptions/POSOptionForm'))
  },
  {
    path: `${url}/cost-center`,
    screen: FullLoader(() => import('../Screens/MasterData/CostCenters/CostCenters'))
  },
  {
    path: `${url}/cost-center-new`,
    screen: FullLoader(() => import('../Screens/HumanResources/CostCenters/CostCenter'))
  },

  {
    path: `${url}/translate`,
    screen: SideBarLoader(() => import('../Screens/Translator/Translator'))
  },
  {
    path: `${url}/add-translate`,
    screen: FullLoader(() => import('../Screens/Translator/TranslatorForm'))
  },
  {
    path: `${url}/edit-translate/:id`,
    screen: FullLoader(() => import('../Screens/Translator/TranslatorForm'))
  },
  {
    path: `${url}/cash-out-form`,
    screen: FullLoader(() =>
      import('../Screens/HumanResources/AbsenceManagement/AnnualLeaveCashOut/CashOutForm')
    ),
    access: 'cash-out-form'
  },
  {
    path: `${url}/purchase-leave-form`,
    screen: FullLoader(() =>
      import('../Screens/HumanResources/AbsenceManagement/PurchaseLeaveForm/PurchaseLeaveForm')
    ),
    access: 'purchase-leave-form'
  },
  {
    path: `${url}/location`,
    screen: FullLoader(() => import('../Screens/MasterData/Location/Location'))
    // access: 'purchase-leave-form'
  },
  {
    path: `${url}/work-schedules`,
    screen: SideBarLoader(() => import('../Screens/TimeSheet/WorkSchedules/WorkSchedules'))
  },
  {
    path: `${url}/add-work-schedules`,
    screen: FullLoader(() => import('../Screens/TimeSheet/WorkSchedules/WorkScheduleForm'))
  },
  {
    path: `${url}/edit-work-schedules/:id`,
    screen: FullLoader(() => import('../Screens/TimeSheet/WorkSchedules/WorkScheduleForm'))
  },
  {
    path: `${url}/add-employee-group`,
    screen: FullLoader(() => import('../Screens/MasterData/EmployeeGroups/EmployeeGroupForm'))
  },
  {
    path: `${url}/employee-groups`,
    screen: FullLoader(() => import('../Screens/MasterData/EmployeeGroups/EmployeeGroups'))
  },
  {
    path: `${url}/employee-groups/:id`,
    screen: FullLoader(() => import('../Screens/MasterData/EmployeeGroups/EmployeeGroupForm'))
  },
  {
    path: `${url}/add-gender`,
    screen: FullLoader(() => import('../Screens/MasterData/Genders/GenderForm'))
  },
  {
    path: `${url}/genders`,
    screen: FullLoader(() => import('../Screens/MasterData/Genders/Genders'))
  },
  {
    path: `${url}/genders/:id`,
    screen: FullLoader(() => import('../Screens/MasterData/Genders/GenderForm'))
  },
  {
    path: `${url}/add-wage-type`,
    screen: FullLoader(() => import('../Screens/MasterData/WageTypes/WageTypeFrom'))
  },
  {
    path: `${url}/wage-type/:id`,
    screen: FullLoader(() => import('../Screens/MasterData/WageTypes/WageTypeFrom'))
  },
  {
    path: `${url}/wage-types`,
    screen: FullLoader(() => import('../Screens/MasterData/WageTypes/WageTypes'))
  },
  {
    path: `${url}/add-organization-unit`,
    screen: FullLoader(() => import('../Screens/MasterData/OrganizationUnits/OrganizationUnitForm'))
  },
  {
    path: `${url}/organization-unit/:id`,
    screen: FullLoader(() => import('../Screens/MasterData/OrganizationUnits/OrganizationUnitForm'))
  },
  {
    path: `${url}/organization-units`,
    screen: FullLoader(() => import('../Screens/MasterData/OrganizationUnits/OrganizationUnits'))
  },
  {
    path: `${url}/add-position`,
    screen: FullLoader(() => import('../Screens/MasterData/Positions/PositionForm'))
  },
  {
    path: `${url}/position/:id`,
    screen: FullLoader(() => import('../Screens/MasterData/Positions/PositionForm'))
  },
  {
    path: `${url}/positions`,
    screen: FullLoader(() => import('../Screens/MasterData/Positions/Positions'))
  },
  {
    path: `${url}/add-job-level`,
    screen: FullLoader(() => import('../Screens/MasterData/JobLevels/JobLevelForm'))
  },
  {
    path: `${url}/job-level/:id`,
    screen: FullLoader(() => import('../Screens/MasterData/JobLevels/JobLevelForm'))
  },
  {
    path: `${url}/job-levels`,
    screen: FullLoader(() => import('../Screens/MasterData/JobLevels/JobLevels'))
  },
  {
    path: `${url}/add-employee-sub-group`,
    screen: FullLoader(() => import('../Screens/MasterData/EmployeeSubGroups/EmployeeSubGroupForm'))
  },
  {
    path: `${url}/employee-sub-group/:id`,
    screen: FullLoader(() => import('../Screens/MasterData/EmployeeSubGroups/EmployeeSubGroupForm'))
  },
  {
    path: `${url}/employee-sub-groups`,
    screen: FullLoader(() => import('../Screens/MasterData/EmployeeSubGroups/EmployeeSubGroups'))
  },
  {
    path: `${url}/add-operational-level-1`,
    screen: FullLoader(() => import('../Screens/MasterData/OperationalLevel1/OperationLevel1Form'))
  },
  {
    path: `${url}/operational-level-1/:id`,
    screen: FullLoader(() => import('../Screens/MasterData/OperationalLevel1/OperationLevel1Form'))
  },
  {
    path: `${url}/operational-level-1`,
    screen: FullLoader(() => import('../Screens/MasterData/OperationalLevel1/OperationalLevel1'))
  },
  {
    path: `${url}/add-operational-level-2`,
    screen: FullLoader(() => import('../Screens/MasterData/OperationalLevel2/OperationalLevel2Form'))
  },
  {
    path: `${url}/operational-level-2/:id`,
    screen: FullLoader(() => import('../Screens/MasterData/OperationalLevel2/OperationalLevel2Form'))
  },
  {
    path: `${url}/operational-level-2`,
    screen: FullLoader(() => import('../Screens/MasterData/OperationalLevel2/OperationalLevel2'))
  },
  {
    path: `${url}/add-operational-level-3`,
    screen: FullLoader(() => import('../Screens/MasterData/OperationalLevel3/OperationalLevel3Form'))
  },
  {
    path: `${url}/operational-level-3`,
    screen: FullLoader(() => import('../Screens/MasterData/OperationalLevel3/OperationalLevel3'))
  },
  {
    path: `${url}/operational-level-3/:id`,
    screen: FullLoader(() => import('../Screens/MasterData/OperationalLevel3/OperationalLevel3Form'))
  },
  {
    path: `${url}/add-disability`,
    screen: FullLoader(() => import('../Screens/MasterData/Disability/DisabilityForm'))
  },
  {
    path: `${url}/disability/:id`,
    screen: FullLoader(() => import('../Screens/MasterData/Disability/DisabilityForm'))
  },
  {
    path: `${url}/disabilities`,
    screen: FullLoader(() => import('../Screens/MasterData/Disability/Disablities'))
  },
  {
    path: `${url}/add-military`,
    screen: FullLoader(() => import('../Screens/MasterData/MilitaryStatus/MilitaryForm'))
  },
  {
    path: `${url}/military-status/:id`,
    screen: FullLoader(() => import('../Screens/MasterData/MilitaryStatus/MilitaryForm'))
  },
  {
    path: `${url}/military-status`,
    screen: FullLoader(() => import('../Screens/MasterData/MilitaryStatus/MilitaryStatus'))
  },
  {
    path: `${url}/add-title`,
    screen: FullLoader(() => import('../Screens/MasterData/Titles/TitleForm'))
  },
  {
    path: `${url}/title/:id`,
    screen: FullLoader(() => import('../Screens/MasterData/Titles/TitleForm'))
  },
  {
    path: `${url}/titles`,
    screen: FullLoader(() => import('../Screens/MasterData/Titles/Titles'))
  },
  {
    path: `${url}/add-citizenship`,
    screen: FullLoader(() => import('../Screens/MasterData/Citizenship/CitizenshipForm'))
  },
  {
    path: `${url}/citizenship`,
    screen: FullLoader(() => import('../Screens/MasterData/Citizenship/Citizenship'))
  },
  {
    path: `${url}/citizenship/:id`,
    screen: FullLoader(() => import('../Screens/MasterData/Citizenship/CitizenshipForm'))
  },
  {
    path: `${url}/add-religion`,
    screen: FullLoader(() => import('../Screens/MasterData/Religions/ReligionForm'))
  },
  {
    path: `${url}/religions`,
    screen: FullLoader(() => import('../Screens/MasterData/Religions/Religions'))
  },
  {
    path: `${url}/religion/:id`,
    screen: FullLoader(() => import('../Screens/MasterData/Religions/ReligionForm'))
  },
  {
    path: `${url}/add-job-band`,
    screen: FullLoader(() => import('../Screens/MasterData/JobBands/JobBandForm'))
  },

  {
    path: `${url}/job-bands`,
    screen: FullLoader(() => import('../Screens/MasterData/JobBands/JobBands'))
  },

  {
    path: `${url}/job-band/:id`,
    screen: FullLoader(() => import('../Screens/MasterData/JobBands/JobBandForm'))
  },
  {
    path: `${url}/add-paygroup`,
    screen: FullLoader(() => import('../Screens/MasterData/PayGroups/PayGroupForm'))
  },
  {
    path: `${url}/paygroups`,
    screen: FullLoader(() => import('../Screens/MasterData/PayGroups/PayGroups'))
  },
  {
    path: `${url}/paygroup/:id`,
    screen: FullLoader(() => import('../Screens/MasterData/PayGroups/PayGroupForm'))
  },
  {
    path: `${url}/add-contract-type`,
    screen: FullLoader(() => import('../Screens/MasterData/ContractTypes/ContractForm'))
  },
  {
    path: `${url}/contract-types`,
    screen: FullLoader(() => import('../Screens/MasterData/ContractTypes/ContractTypes'))
  },
  {
    path: `${url}/contract-type/:id`,
    screen: FullLoader(() => import('../Screens/MasterData/ContractTypes/ContractForm'))
  },
  {
    path: `${url}/add-region`,
    screen: FullLoader(() => import('../Screens/MasterData/Regions/RegionForm'))
  },
  {
    path: `${url}/regions`,
    screen: FullLoader(() => import('../Screens/MasterData/Regions/Regions'))
  },
  {
    path: `${url}/region/:id`,
    screen: FullLoader(() => import('../Screens/MasterData/Regions/RegionForm'))
  },
  {
    path: `${url}/add-payroll-area`,
    screen: FullLoader(() => import('../Screens/MasterData/PayrollAreas/PayrollAreasForm'))
  },
  {
    path: `${url}/payroll-areas`,
    screen: FullLoader(() => import('../Screens/MasterData/PayrollAreas/PayrollAreas'))
  },
  {
    path: `${url}/payroll-area/:id`,
    screen: FullLoader(() => import('../Screens/MasterData/PayrollAreas/PayrollAreasForm'))
  },
  {
    path: `${url}/add-marital-status`,
    screen: FullLoader(() => import('../Screens/MasterData/MaritalStatus/MaritalStatusForm'))
  },
  {
    path: `${url}/marital-status`,
    screen: FullLoader(() => import('../Screens/MasterData/MaritalStatus/MaritalStatus'))
  },
  {
    path: `${url}/marital-status/:id`,
    screen: FullLoader(() => import('../Screens/MasterData/MaritalStatus/MaritalStatusForm'))
  },
  {
    path: `${url}/countries`,
    screen: FullLoader(() => import('../Screens/MasterData/Countries/Countries'))
  },
  {
    path: `${url}/add-country`,
    screen: FullLoader(() => import('../Screens/MasterData/Countries/CountryForm'))
  },
  {
    path: `${url}/country/:id`,
    screen: FullLoader(() => import('../Screens/MasterData/Countries/CountryForm'))
  },
  {
    path: `${url}/master`,
    screen: FullLoader(() => import('../Screens/MasterData/Main'))
  },
  {
    path: `${url}/add-nationality`,
    screen: FullLoader(() => import('../Screens/MasterData/Nationality/NationalityForm'))
  },
  {
    path: `${url}/nationalities`,
    screen: FullLoader(() => import('../Screens/MasterData/Nationality/Nationalities'))
  },
  {
    path: `${url}/nationality/:id`,
    screen: FullLoader(() => import('../Screens/MasterData/Nationality/NationalityForm'))
  }
]

class InnerRoutes extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loader: !props.userInfo
    }
  }

  componentDidMount() {
    if (!this.props.userInfo) {
      this.props.dispatch(getUserByToken(localStorage.getItem('ACCOUNTING_USER'))).then((user) => {
        if (user) {
          if (user && !user.company) {
            this.redirectToCompany()
          }

          this.checkTimer()
        }

        this.setState({ loader: false })
      })
    } else {
      if (this.props.userInfo && !this.props.userInfo.company) {
        this.redirectToCompany()
        this.setState({ loader: false })
      }

      this.checkTimer()
    }

    if (localStorage.getItem('release_version') !== '1.0.23') {
      Modal.info({
        width: '60%',
        title: 'Dear Customer',
        content: <ReleaseInfo />,
        onOk: () => localStorage.setItem('release_version', '1.0.23')
      })
    }
  }

  componentWillUnmount() {
    this.props.dispatch({ type: 'SET_TIMER_COUNT', payload: false })
  }

  checkTimer = () => {
    const { userInfo } = this.props

    if (userInfo.timeEntryId) {
      getTimeEntryById(userInfo.timeEntryId).then((entry) => {
        if (entry) {
          this.props.dispatch({ type: 'SET_TIMER_COUNT', payload: entry })
        }
      })
    }
  }

  redirectToCompany = () => {
    this.props.history('/app/manage-company')
  }

  render() {
    const {
      match: { url }
    } = this.props

    if (this.state.loader) {
      return (
        <div>
          <LoaderBox style={{ height: '100vh' }} loader="Loading.." />
        </div>
      )
    }

    return (
      <Layout {...this.props}>
        <Routes>
          {getRoutes(url).map((route) => (
            <Route key={route.path} path={route.path} element={<route.component {...route.props} />} />
          ))}

          {getAsyncRoutes(url).map(({ path, access, ...restProps }) => (
            <Route
              key={path}
              path={path}
              element={<AsyncRoute routeAccess={access} {...restProps} />}
            />
          ))}

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    )
  }
}

function mapStateToProps(state) {
  return {
    userInfo: state.users.userInfo,
    masterOptions: state.users.masterOptions
  }
}

export default connect(mapStateToProps)(InnerRoutes)
