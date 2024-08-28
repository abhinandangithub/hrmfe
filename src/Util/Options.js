import moment from 'moment'

export const arabicRegex = /[\u0600-\u06FF]/

export const YES_NO_OPTIONS = [
  { label: 'Yes', value: 'Yes' },
  { label: 'No', value: 'No' }
]

export const TAX_OPTIONS = [
  { label: 'VAT', value: 'VAT' },
  { label: 'GST', value: 'GST' },
  { label: 'TPN', value: 'TPN' }
]

export const INVOICE_ENTRY_ITEM = [
  { label: 'Product', value: 'Product' },
  { label: 'Description', value: 'Description' }
]

export const KIND_OPTIONS = [
  { label: 'Invoice', value: 'INV' },
  { label: 'Proforma Invoice', value: 'PRO' },
  { label: 'Inter Company', value: 'INC' },
  { label: 'Credit Notes', value: 'CRD' },
  { label: 'Debit Notes', value: 'DBT' }
]

export const INCOME_KIND_OPTIONS = [
  { label: 'Simplified Tax Invoice', value: 'Simplified-Invoice' },
  { label: 'Direct Tax Invoice', value: 'Invoice' },
  { label: 'Sales Order Tax Invoice', value: 'Sales-Invoice' }
]

export const CREDIT_KIND_OPTIONS = [
  { label: 'Simplified invoice based Credit note', value: 'Simplified-Credit-Note' },
  { label: 'Direct Credit Note', value: 'Direct-Credit-Note' },
  { label: 'Tax Invoice based credit note', value: 'Credit-Note' }
]

export const EXPENSE_KIND_OPTIONS = [
  { label: 'Direct Supplier Invoice', value: 'Invoice' },
  { label: 'PO based Supplier Invoice', value: 'Purchase-Invoice' }
]

export const DEBIT_KIND_OPTIONS = [
  { label: 'Direct Debit Note', value: 'Direct-Debit-Note' },
  { label: 'Tax Invoice based debit note', value: 'Debit-Note' }
]

export const MASTER_OPTION_TYPES = [
  { label: 'Service Module', value: 'ServiceModule' },
  { label: 'Service Category', value: 'ServiceCategory' },
  { label: 'Service Type', value: 'ServiceType' },
  { label: 'Income Type', value: 'IncomeType' },
  { label: 'Expense Type', value: 'ExpenseType' },
  { label: 'Account Type', value: 'AccountType' },
  { label: 'Payment Type', value: 'PaymentType' },
  { label: 'Unit Of Measurement', value: 'UnitOfMeasurement' },
  { label: 'Material Type', value: 'MaterialType' },
  { label: 'Material Group', value: 'MaterialGroup' },
  { label: 'Weight Unit', value: 'WeightUnit' },
  { label: 'Volume Unit', value: 'VolumeUnit' },
  { label: 'Material Status', value: 'MaterialStatus' },
  { label: 'Language Code', value: 'LanguageCode' },
  { label: 'Costing Type', value: 'CostingType' },
  { label: 'Pay Term', value: 'PayTerm' },
  { label: 'Nationality', value: 'Nationality' },
  { label: 'Marital Status', value: 'MaritalStatus' },
  { label: 'Gender', value: 'Gender' },
  { label: 'Type Of Visa', value: 'TypeOfVisa' },
  { label: 'Type Of Visa Entry', value: 'TypeOfVisaEntry' },
  { label: 'Relationship', value: 'Relationship' },
  { label: 'Location', value: 'Location' },
  { label: 'Customs', value: 'Customs' },
  { label: 'Supplier Charges', value: 'SupplierCharges' },
  { label: 'Employee Category', value: 'employeeCategory' },
  { label: 'Purchase Request Type', value: 'PurchaseRequestType' },
  { label: 'Asset Group', value: 'AssetGroup' },
  { label: 'Color', value: 'Color' },
  { label: 'Product Line', value: 'ProductLine' },
  { label: 'Color Front', value: 'colorFront' },
  { label: 'Color Back', value: 'ColorBack' },
  { label: 'Print Mode', value: 'PrintMode' },
  { label: 'Customer Group', value: 'CustomerGroup' },
  { label: 'Vendor Group', value: 'VendorGroup' },
  { label: 'Resources', value: 'resources' },
  { label: 'Portfolio', value: 'portfolio' },
  { label: 'Campaign', value: 'campaign' },
  { label: 'CRM Sources', value: 'crm' },
  { label: 'Material Attribute', value: 'MaterialAttribute' },
  { label: 'Trade Term', value: 'TradeTerm' },
  { label: 'Cycle Count Reason', value: 'CycleCountReason' }
]

export const INVOICE_STATUS_OPTIONS = [
  { label: 'Pending', value: 'Pending' },
  { label: 'Sent', value: 'Sent' },
  { label: 'Partially Paid', value: 'PartiallyPaid' },
  { label: 'Paid', value: 'Paid' }
]

export const CLIENT_TYPE_OPTIONS = [
  { label: 'Customer', value: 'Customer' },
  { label: 'Vendor', value: 'Vendor' }
]

export const BUSINESS_TYPE_OPTIONS = [
  { label: 'Company', value: 'Company' },
  { label: 'Individual', value: 'Individual' },
  { label: 'OneTime', value: 'OneTime' }
]

export const WAGE_MODE = [
  { label: 'Hourly', value: 'Hourly' },
  { label: 'Daily', value: 'Daily' },
  { label: 'Monthly', value: 'Monthly' }
]

export const WAGE_TYPE = [
  { label: 'Basic', value: 'Basic' },
  { label: 'BasicDeduction', value: 'BasicDeduction' },
  { label: 'Allowance', value: 'Allowance' },
  { label: 'Addition', value: 'Addition' },
  { label: 'Calculation', value: 'Calculation' },
  { label: 'CalculateExempt', value: 'CalculateExempt' },
  { label: 'Deduction', value: 'Deduction' },
  { label: 'DeductionExempt', value: 'DeductionExempt' },
  { label: 'SubTotal', value: 'SubTotal' },
  { label: 'SubTotalEmployer', value: 'SubTotalEmployer' },
  { label: 'SubTotalBoth', value: 'SubTotalBoth' },
  { label: 'Tax', value: 'Tax' },
  { label: 'Total', value: 'Total' },
  { label: 'Header', value: 'Header' },
  { label: 'CalcEmployerContribution', value: 'CalcEmployerContribution' },
  { label: 'BaseWorkDays', value: 'BaseWorkDays' }
]

export const RATE_UNIT = [{ label: '%', value: '%' }]

export const BASE_FROM = [
  { label: 'AccidentInsUVG', value: 'AccidentInsUVG' },
  { label: 'AccidentInsUVGZ', value: 'AccidentInsUVGZ' },
  { label: 'Advance', value: 'Advance' },
  { label: 'AgencyDeduction', value: 'AgencyDeduction' },
  { label: 'ChildAllowance', value: 'ChildAllowance' },
  { label: 'DailyAllowance', value: 'DailyAllowance' },
  { label: 'DeductDailyAllowance', value: 'DeductDailyAllowance' },
  { label: 'ExpenseClaim', value: 'ExpenseClaim' },
  { label: 'LiabilityInsurance', value: 'LiabilityInsurance' },
  { label: 'LossOfPay', value: 'LossOfPay' },
  { label: 'LossOfPayDays ', value: 'LossOfPayDays' },
  { label: 'Mileage ', value: 'Mileage' },
  { label: 'NoOfChild ', value: 'NoOfChild' },
  { label: 'PensionFund ', value: 'PensionFund' },
  { label: 'PensionFundEmp ', value: 'PensionFundEmp' },
  { label: 'Rate ', value: 'Rate' },
  { label: 'SicknessPayInsurance ', value: 'SicknessPayInsurance' },
  { label: 'Others', value: 'Others' }
]
export const SWISS_STATES = [
  { label: 'Aargau', value: 'Aargau' },
  { label: 'Appenzell Ausserrhoden', value: 'Appenzell Ausserrhoden' },
  { label: 'Appenzell Innerrhoden', value: 'Appenzell Innerrhoden' },
  { label: 'Basel-Land', value: 'Basel-Land' },
  { label: 'Basel-Stadt', value: 'Basel-Stadt' },
  { label: 'Bern', value: 'Bern' },
  { label: 'Freiburg', value: 'Freiburg' },
  { label: 'Genf', value: 'Genf' },
  { label: 'Glarus', value: 'Glarus' },
  { label: 'Graubünden', value: 'Graubünden' },
  { label: 'Jura', value: 'Jura' },
  { label: 'Luzern', value: 'Luzern' },
  { labeL: 'Neuchatel', values: 'Neuchatel' },
  { label: 'Neuenburg', value: 'Neuenburg' },
  { label: 'Nidwalden', value: 'Nidwalden' },
  { label: 'Obwalden', value: 'Obwalden' },
  { label: 'Sankt Gallen', value: 'Sankt Gallen' },
  { label: 'Schaffhausen', value: 'Schaffhausen' },
  { label: 'Schwyz', value: 'Schwyz' },
  { label: 'Solothurn', value: 'Solothurn' },
  { label: 'Tessin', value: 'Tessin' },
  { label: 'Thurgau', value: 'Thurgau' },
  { label: 'Uri', value: 'Uri' },
  { label: 'Waadt', value: 'Waadt' },
  { label: 'Wallis', value: 'Wallis' },
  { label: 'Zug', value: 'Zug' },
  { label: 'Zürich', value: 'Zürich' }
]
export const STATUS = [
  { label: 'Active', value: 'Active' },
  { label: 'InActive', value: 'InActive' }
]

export const SHOW_HIDE_OPTIONS = [
  { label: 'Yes', value: 'Yes' },
  { label: 'No', value: 'No' }
]

export const USER_TYPE = [
  { label: 'Admin', value: 'Admin' },
  { label: 'User', value: 'User' }
]

export const INVOICE_ENTRY_TYPE = [
  { label: 'Product', value: 'Product' },
  { label: 'Description', value: 'Description' }
]

export const TAX_TYPE = [
  { label: 'VAT', value: 'VAT' },
  { label: 'GST', value: 'GST' }
]

export const CANTON_TYPE = [
  { label: 'Zurich', value: 'Zurich' },
  { label: 'Berne', value: 'Berne' },
  { label: 'Uri', value: 'Uri' },
  { label: 'Basel-Stadt', value: 'Basel-Stadt' }
]

export const ACCESS_ARR = [
  'add-company',
  'edit-company',
  'divisions',
  'add-division',
  'edit-division',
  'roles',
  'add-role',
  'edit-role',
  'users',
  'add-user',
  'edit-user',
  'currencies',
  'add-currency',
  'edit-currency',
  'exchange-rates',
  'add-exchange-rate',
  'edit-exchange-rate',
  'categories',
  'add-category',
  'edit-category',
  'options',
  'add-option',
  'edit-option',
  'custom-templates',
  'add-custom-template',
  'edit-custom-template',
  'master-upload',
  'numbering-series',
  'company-configurations',
  'clients',
  'add-client',
  'edit-client',
  'products',
  'add-product',
  'edit-product',
  'projects',
  'add-project',
  'edit-projects',
  'project-employee-rates',
  'add-project-employee-rate',
  'edit-project-employee-rate',
  'time-entries',
  'expense-claims',
  'time-reports',
  'time-reports-all',
  'warehouses',
  'add-warehouse',
  'edit-warehouse',
  'warehouse-products',
  'add-warehouse-product',
  'edit-warehouse-product',
  'customer-prices',
  'add-customer-price',
  'edit-customer-price',
  'sales-quotations',
  'add-sales-quotation',
  'edit-sales-quotation',
  'sales-orders',
  'add-sales-order',
  'edit-sales-order',
  'sales-deliveries',
  'add-sales-delivery',
  'edit-sales-delivery',
  'sales-invoices',
  'add-income',
  'edit-sales-invoice',
  'vendor-prices',
  'add-vendor-price',
  'edit-vendor-price',
  'purchase-orders',
  'add-purchase-order',
  'edit-purchase-order',
  'purchase-receipts',
  'add-purchase-receipt',
  'edit-purchase-receipt',
  'customs-clearances',
  'add-customs-clearance',
  'edit-customs-clearance',
  'purchase-invoices',
  'add-expense',
  'edit-purchase-invoice',
  'stock-receipts',
  'add-stock-receipt',
  'edit-stock-receipt',
  'stock-issues',
  'add-stock-issue',
  'edit-stock-issue',
  'stock-checks',
  'stock-transfers',
  'add-stock-transfer',
  'edit-stock-transfer',
  'material-reports',
  'open-sales-reports',
  'open-purchase-reports',
  'financial-years',
  'account-groups',
  'account-charts',
  'account-setups',
  'finance-report-configuration',
  'incomes',
  'add-income',
  'edit-income',
  'income-receipts',
  'from-timesheet',
  'expenses',
  'add-expense',
  'edit-expense',
  'expense-payments',
  'upload-income-invoices',
  'upload-expense-invoices',
  'generate-invoice',
  'finance-postings',
  'journal-vouchers',
  'add-journal-voucher',
  'edit-journal-voucher',
  'sales-persons',
  'add-sales-person',
  'edit-sales-person',
  'pol-pod',
  'add-pol-pod',
  'edit-pol-pod',
  'packages-types',
  'add-packages-type',
  'edit-packages-type',
  'price-charges',
  'add-price-charge',
  'edit-price-charge',
  'operations',
  'add-operation',
  'edit-operation',
  'terms-conditions',
  'add-terms-condition',
  'edit-terms-condition',
  'sales-call-entries',
  'add-sales-call-entry',
  'edit-sales-call-entry',
  'offers',
  'add-offer',
  'edit-offer',
  'bookings',
  'add-booking',
  'edit-booking',
  'job-creations',
  'add-job-creation',
  'edit-job-creation',
  'outbound-transmissions',
  'inbound-transmissions',
  'employees',
  'add-employee',
  'edit-employee',
  'asset',
  'transfer',
  'change-job',
  'change-compensation',
  'absence-management',
  'team-absence-application-list',
  'termination',
  'goals',
  'goal-assignment',
  'appraisal-review',
  'taxdata',
  'holiday-calendar',
  'MWST',
  'yearlyPayroll',
  'paymaster',
  'payrolls'
]

export const TRANSACTION_STATUS = [
  { label: 'Accepted', value: 'Accepted' },
  { label: 'Rejected', value: 'Rejected' }
]

export const STOCK_STATUS = [
  { label: 'Created', value: 'Created' },
  { label: 'Posted', value: 'Posted' }
]

export const DEFAULT_TRANSACTIONS = {
  materialCodeDesc: '',
  materialCode: '',
  materialDescription: '',
  materialDescriptionAlt: '',
  unit: '',
  batch: false,
  serial: false,
  quantity: '',
  warehouse: '',
  location: '',
  rack: '',
  cost: '',
  amount: 0,
  status: 'Accepted',
  account: '',
  batchSerials: []
}

export const ACCOUNT_TYPE = [
  { label: 'Assets', value: 'Assets' },
  { label: 'Liabilities', value: 'Liabilities' },
  { label: 'Equity', value: 'Equity' },
  { label: 'Revenue', value: 'Revenue' },
  { label: 'Cost of Goods Sold', value: 'Cost of Goods Sold' },
  { label: 'Operating Expenses', value: 'Operating Expenses' },
  { label: 'Taxes Paid', value: 'Taxes Paid' },
  { label: 'Other Expenses', value: 'Other Expenses' },
  { label: 'Depreciation/Tax/Interest', value: 'Depreciation-Tax-Interest' },
  { label: 'Fixed Assets', value: 'Fixed Assets' },
  { label: 'Intangibles', value: 'Intangibles' },
  { label: 'Investments', value: 'Investments' },
  { label: 'Trade and Other Debtors', value: 'Trade and Other Debtors' },
  { label: 'Bank and cash', value: 'Bank and cash' },
  { label: 'Trade and other creditors < 1 year', value: 'Trade and other creditors < 1 year' },
  { label: 'Creditors > 1 year', value: 'Creditors > 1 year' },
  { label: 'Provision for liabilities & charges', value: 'Provision for liabilities & charges' },
  { label: 'Share Capital', value: 'Share Capital' },
  { label: 'Reserves', value: 'Reserves' }
]

export const FINNACIAL_REPORT = [
  { label: 'Balance Sheet', value: 'Balance Sheet' },
  { label: 'Profit & Loss', value: 'Profit & Loss' }
]

export const NUMERIC_RANGE = [
  { label: '100-199', value: '100-199' },
  { label: '200-299', value: '200-299' },
  { label: '300-399', value: '300-399' },
  { label: '400-499', value: '400-499' },
  { label: '500-599', value: '500-599' },
  { label: '600-699', value: '600-699' },
  { label: '700-799', value: '700-799' },
  { label: '800-899', value: '800-899' }
]

export const getDefaultStockTransfer = (props) => ({
  batch: false,
  serial: false,
  materialCode: '',
  materialDescription: '',
  unit: '',
  quantity: '',
  status: 'Accepted',
  batchSerials: [],
  from: {
    warehouse: '',
    location: '',
    rack: '',
    ...props
  },
  to: {
    warehouse: '',
    location: '',
    rack: '',
    ...props
  }
})

export const DEFAULT_MATERIAL_TRANSFER = {
  position: 1,
  materialCode: '',
  materialCodeDesc: '',
  materialDescription: '',
  unit: '',
  retailPrice: '',
  price: '',
  standardCost: '',
  quantity: '',
  tax: '',
  taxFormat: '%',
  amount: '',
  stockQuantity: '',
  stockBatchSerials: '',
  batchSerials: []
}

export const TITLE = [
  { label: 'Mr', value: 'Mr' },
  { label: 'Ms', value: 'Ms' }
]

export const DEFAULT_ADDRESS_FIELDS = {
  street: '',
  additionalStreet: '',
  city: '',
  state: '',
  postalCode: '',
  country: ''
}

export const DEFAULT_CONTACT_PERSONS = {
  title: '',
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  primary: false
}

export const DEFAULT_JOB_ORDER_DETAILS = {
  position: 10,
  materialCode: '',
  quantity: '',
  warehouse: '',
  materialCodeDesc: '',
  unit: '',
  scrapQuantity: '',
  length: 100,
  breadth: 70
}
export const DEFAULT_BOM_DETAILS = {
  position: 10,
  materialCode: '',
  materialCodeDesc: '',
  materialDescription: '',
  unit: '',
  purchasePrice: '',
  salesPrice: '',
  quantity: '',
  averageQuantity: '',
  scrapPercentage: '',
  totalQuantity: '',
  warehouse: '',
  division: null,
  type: '',
  validFrom: '',
  validTo: ''
}
export const DEFAULT_RESOURCES_DETAILS = {
  stagePosition: 10,
  stageDescription: '',
  position: 10,
  description: '',
  supervisor: null,
  inspector: null,
  resourceCode: '',
  resourceDesc: '',
  division: null,
  type: '',
  capacity: '',
  quantityUnit: '',
  time: '',
  timeUnit: '',
  timePerCapacity: '',
  costPerHour: '',
  pricePerHour: '',
  efficiency: '',
  setupTime: '',
  waitTime: '',
  transferTime: '',
  reportingType: '',
  primary: false
}

export const DEFAULT_PRODUCTION_ORDER = {
  materialCode: '',
  materialCodeDesc: '',
  materialDescription: '',
  unit: '',
  quantity: '',
  warehouse: '',
  plannedStartDate: '',
  plannedEndDate: '',
  division: null,
  bomNo: '',
  routingNo: '',
  category: '',
  subCategory: '',
  serialNo: '',
  partNo: '',
  client: null,
  drawingNo: '',
  size: ''
}

export const MONTHS = [
  { label: 'Jan', value: 'Jan' },
  { label: 'Feb', value: 'Feb' },
  { label: 'Mar', value: 'Mar' },
  { label: 'Apr', value: 'Apr' },
  { label: 'May', value: 'May' },
  { label: 'Jun', value: 'Jun' },
  { label: 'Jul', value: 'Jul' },
  { label: 'Aug', value: 'Aug' },
  { label: 'Sep', value: 'Sep' },
  { label: 'Oct', value: 'Oct' },
  { label: 'Nov', value: 'Nov' },
  { label: 'Dec', value: 'Dec' }
]

export const ORDER_INVOICE_STATUS_OPTIONS = [
  { label: 'Created', value: 'Created' },
  { label: 'Partially Paid', value: 'PartiallyPaid' },
  { label: 'Paid', value: 'Paid' }
]

export const INVOICE_BASE_OPTIONS = [
  { label: 'Sales Order', value: 'Sales Order' },
  { label: 'Delivery', value: 'Delivery' }
]

export const SALES_DELIVERY_STATUS_OPTIONS = [
  { label: 'Draft', value: 'Draft' },
  { label: 'Delivered', value: 'Delivered' }
]

export const PURCHASE_RECEIPT_STATUS_OPTIONS = [
  { label: 'Draft', value: 'Draft' },
  { label: 'Received', value: 'Received' }
]

export const RETURN_STATUS_OPTIONS = [
  { label: 'Draft', value: 'Draft' },
  { label: 'Returned', value: 'Returned' }
]

export const DEFAULT_WAREHOUSES = {
  warehouse: '',
  description: '',
  location: '',
  locationDescription: '',
  rack: '',
  rackDescription: ''
}

export const SALES_TAX_CATEGORIES = [
  {
    label: 'Standard',
    value: 'Standard'
  },
  {
    label: 'Export',
    value: 'Export'
  },
  {
    label: 'Intercompany',
    value: 'Intercompany'
  }
]

export const PURCHASE_TAX_CATEGORIES = [
  {
    label: 'Standard',
    value: 'Standard'
  },
  {
    label: 'Import',
    value: 'Import'
  },
  {
    label: 'Intercompany',
    value: 'Intercompany'
  }
]

export const TIME_UNIT = [
  {
    label: 'Minutes',
    value: 'minutes'
  },
  {
    label: 'Hours',
    value: 'hours'
  },
  {
    label: 'Days',
    value: 'days'
  }
]
export const TAX_TYPES = [
  {
    label: 'Normal VAT',
    value: 'Normal VAT',
    categories: ['Standard']
  },
  {
    label: 'Exempt',
    value: 'Exempt',
    categories: ['Standard']
  },
  {
    label: 'Zero VAT',
    value: 'Zero VAT',
    categories: ['Standard', 'Export', 'Import', 'Intercompany']
  }
]

export const GET_TAX_TYPES = (c) => TAX_TYPES.filter((v) => v.categories.includes(c))

export const TIMEZONES = moment.tz
  .names()
  .map((item) => ({
    value: item,
    label: `(GMT${moment.tz(item).format('Z')}) ${new Date()
      .toLocaleDateString(undefined, { day: '2-digit', timeZone: item, timeZoneName: 'long' })
      .substring(4)} (${item})`
  }))
  .sort((a, b) => {
    const [ahh, amm] = a.label.split('GMT')[1].split(')')[0].split(':')
    const [bhh, bmm] = b.label.split('GMT')[1].split(')')[0].split(':')

    return +ahh * 60 + amm - (+bhh * 60 + bmm)
  })

export const PRICE_TYPES = [
  {
    label: 'Price',
    value: 'Price'
  },
  {
    label: 'Charge',
    value: 'Charge'
  }
]

export const OPERATION_TYPES = [
  {
    label: 'Air',
    value: 'Air'
  },
  {
    label: 'Sea',
    value: 'Sea'
  },
  {
    label: 'Land',
    value: 'Land'
  }
]

export const AIR_OPERATIONS = [
  {
    label: 'Back to Back',
    value: 'Back to Back'
  },
  {
    label: 'Direct',
    value: 'Direct'
  },
  {
    label: 'Deconsolidation',
    value: 'Deconsolidation'
  }
]

export const SEA_OPERATIONS = [
  {
    label: 'FCL',
    value: 'FCL'
  },
  {
    label: 'LCL',
    value: 'LCL'
  },
  {
    label: 'RORO',
    value: 'RORO'
  },
  {
    label: 'BULK',
    value: 'BULK'
  },
  {
    label: 'Others',
    value: 'Others'
  }
]

export const LAND_OPERATIONS = [
  {
    label: 'Overland (FTL, LTL)',
    value: 'Overland (FTL, LTL)'
  },
  {
    label: 'Inland (Containers, General Cargo)',
    value: 'Inland (Containers, General Cargo)'
  }
]

export const getOperationTypes = (type) => {
  switch (type) {
    case 'Air':
      return AIR_OPERATIONS
    case 'Sea':
      return SEA_OPERATIONS
    case 'Land':
      return LAND_OPERATIONS
    default:
      return []
  }
}

export const TERMS_CONDITIONS_DOCUMENT_TYPES = [
  {
    label: 'Offer',
    value: 'Offer'
  },
  {
    label: 'Booking',
    value: 'Booking'
  },
  {
    label: 'Bill of Landing',
    value: 'Bill of Landing'
  },
  {
    label: 'Job Creation',
    value: 'Job Creation'
  },
  {
    label: 'Sales Quotation',
    value: 'Sales Quotation'
  },
  {
    label: 'Invoice',
    value: 'Invoice'
  }
]

export const ACCOUNT_SETUP_TYPES = [
  {
    label: 'Invoice',
    value: 'Invoice'
  },
  {
    label: 'Credit Note',
    value: 'Credit-Note'
  },
  {
    label: 'Debit Note',
    value: 'Debit-Note'
  },
  {
    label: 'Expense',
    value: 'Expense'
  },
  {
    label: 'Invoice Receipt',
    value: 'Invoice Receipt'
  },
  {
    label: 'Credit Receipt',
    value: 'Credit Receipt'
  },
  {
    label: 'Expense Payment',
    value: 'Expense Payment'
  },
  {
    label: 'Debit Receipt',
    value: 'Debit Receipt'
  }
]
export const INVENTORY_STATUS = [
  {
    label: 'Good',
    value: 'Good'
  },
  {
    label: 'Damaged',
    value: 'Damaged'
  },
  {
    label: 'For Sale',
    value: 'For Sale'
  },
  {
    label: 'Lost',
    value: 'Lost'
  }
]

export const DEFAULT_PACKAGE_ITEMS = {
  description: '',
  quantity: '',
  unit: '',
  price: '',
  amount: 0,
  netAmount: '',
  currency: '',
  chargeType: '%',
  charge: '',
  taxType: '',
  tax: '',
  taxAmount: ''
}

export const DEFAULT_PACKAGE_DETAILS = {
  position: 10,
  packageType: '',
  length: '',
  breadth: '',
  height: '',
  unit: '',
  weight: '',
  weightUnit: '',
  volume: '',
  volumeUnit: '',
  items: [DEFAULT_PACKAGE_ITEMS]
}

export const LBH_UNITS = [
  {
    label: 'MT',
    value: 'MT'
  },
  {
    label: 'CM',
    value: 'CM'
  },
  {
    label: 'MM',
    value: 'MM'
  }
]

export const WEIGHT_UNITS = [
  {
    label: 'KG',
    value: 'KG'
  },
  {
    label: 'GM',
    value: 'GM'
  },
  {
    label: 'TO',
    value: 'TO'
  }
]

export const VOLUME_UNITS = [
  {
    label: 'M3',
    value: 'M3'
  },
  {
    label: 'CM3',
    value: 'CM3'
  },
  {
    label: 'MM3',
    value: 'MM3'
  }
]

export const PO_TYPES = [
  { label: 'Standard', value: 'Standard' },
  { label: 'Import', value: 'Import' }
]

export const DEFAULT_FORWARDER_CHARGES = {
  serviceProvider: '',
  name: '',
  referenceNo: '',
  chargeType: '',
  currency: '',
  amount: '',
  exchangeRate: 1,
  baseAmount: '',
  account: ''
}

export const DEFAULT_SUPPLIER_CHARGES = {
  serviceProvider: 'Supplier',
  referenceNo: '',
  chargeType: '',
  currency: '',
  amount: '',
  exchangeRate: 1,
  baseAmount: '',
  account: ''
}

export const TYPE_OF_PAYMENT = [
  { label: 'Payment', value: 'Payment' },
  { label: 'Advance', value: 'Advance' }
]

export const getCustomerStockNames = (type) => {
  const isCustomer = type === 'customer'
  const altType = 'client'

  return {
    type,
    isCustomer,
    typeName: type?.capitalize(),
    typeAltName: altType?.capitalize()
  }
}

export const getClientPriceNames = (type) => {
  const isCustomer = type === 'customer'
  const isVendor = type === 'vendor'
  const order = isCustomer ? 'sales' : isVendor ? 'purchase' : ''
  const altType = isVendor ? 'supplier' : type

  return {
    type,
    isCustomer,
    isVendor,
    typeName: type?.capitalize(),
    typeAltName: altType?.capitalize(),
    order,
    orderName: order?.capitalize()
  }
}

export const DEFAULT_CLIENT_PRICE = {
  materialCodeDesc: '',
  materialCode: '',
  materialDescription: '',
  unit: '',
  minQuantity: 1,
  maxQuantity: 999999,
  currency: '',
  price: '',
  exchangeRate: 1,
  basePrice: '',
  status: 'Active'
}

export const NUMBERING_MODULES_TRANSACTIONS = [
  {
    module: 'Services',
    transaction: 'Service Requests',
    code: 'service-requests',
    label: 'Services - Service Requests',
    value: 'Services - Service Requests'
  },
  {
    module: 'CRM',
    transaction: 'Lead Proposals',
    code: 'lead-proposals',
    label: 'Lead - Lead Proposals',
    value: 'Lead - Lead Proposals'
  },
  {
    module: 'CRM',
    transaction: 'Lead Lists',
    code: 'lead-lists',
    label: 'Lead - Lead Lists',
    value: 'Lead - Lead Lists'
  },
  {
    module: 'HR & Payroll',
    transaction: 'Payroll Definition',
    code: 'payroll-definition',
    label: 'Payroll - Payroll Definition',
    value: 'Payroll - Payroll Definition'
  },
  {
    module: 'Sales',
    transaction: 'Sales Orders',
    code: 'sales-orders',
    label: 'Sales - Sales Orders',
    value: 'Sales - Sales Orders'
  },
  {
    module: 'Purchase',
    transaction: 'Purchase Receipts',
    code: 'purchase-receipts',
    label: 'Purchase - Purchase Receipts',
    value: 'Purchase - Purchase Receipts'
  },
  {
    module: 'Stock',
    transaction: 'Stock Issues',
    code: 'stock-issues',
    label: 'Stock - Stock Issues',
    value: 'Stock - Stock Issues'
  },
  {
    module: 'Finance',
    transaction: 'Finance Postings',
    code: 'finance-postings',
    label: 'Finance - Finance Postings',
    value: 'Finance - Finance Postings'
  },
  {
    module: 'Clients',
    transaction: 'Customers',
    code: 'customers',
    label: 'Clients - Customers',
    value: 'Clients - Customers'
  },
  {
    module: 'Clients',
    transaction: 'Vendors',
    code: 'vendors',
    label: 'Clients - Vendors',
    value: 'Clients - Vendors'
  },
  {
    module: 'Purchase',
    transaction: 'Purchase Orders',
    code: 'purchase-orders',
    label: 'Purchase - Purchase Orders',
    value: 'Purchase - Purchase Orders'
  },
  {
    module: 'Sales',
    transaction: 'Sales Deliveries',
    code: 'sales-deliveries',
    label: 'Sales - Sales Deliveries',
    value: 'Sales - Sales Deliveries'
  },
  {
    module: 'Stock',
    transaction: 'Stock Receipts',
    code: 'stock-receipts',
    label: 'Stock - Stock Receipts',
    value: 'Stock - Stock Receipts'
  },
  {
    module: 'Stock',
    transaction: 'Stock Transfers',
    code: 'stock-transfers',
    label: 'Stock - Stock Transfers',
    value: 'Stock - Stock Transfers'
  },
  {
    module: 'Finance',
    transaction: 'Journal Voucher',
    code: 'journal-vouchers',
    label: 'Finance - Journal Voucher',
    value: 'Finance - Journal Voucher'
  },
  {
    module: 'Incomes',
    transaction: 'Invoice',
    code: 'Income-Invoice',
    label: 'Incomes - Invoice',
    value: 'Incomes - Invoice'
  },
  {
    module: 'Incomes',
    transaction: 'Credit Note',
    code: 'Income-Credit-Note',
    label: 'Incomes - Credit Note',
    value: 'Incomes - Credit Note'
  },
  {
    module: 'Expenses',
    transaction: 'Invoice',
    code: 'Expense-Invoice',
    label: 'Expenses - Invoice',
    value: 'Expenses - Invoice'
  },
  {
    module: 'Quotations',
    transaction: 'Quotations',
    code: 'quotations',
    label: 'Quotations - Quotations',
    value: 'Quotations - Quotations'
  },
  {
    module: 'Export',
    transaction: 'Offers',
    code: 'offers',
    label: 'Export - Offers',
    value: 'Export - Offers'
  },
  {
    module: 'Export',
    transaction: 'Bookings',
    code: 'bookings',
    label: 'Export - Bookings',
    value: 'Export - Bookings'
  },
  {
    module: 'Customs Clearance',
    transaction: 'Customs Clearance',
    code: 'customs-clearance',
    label: 'Customs Clearance - Customs Clearance',
    value: 'Customs Clearance - Customs Clearance'
  },
  {
    module: 'Export',
    transaction: 'Job Creation',
    code: 'job-creations',
    label: 'Export - Job Creation',
    value: 'Export - Job Creation'
  },
  {
    module: 'Sales',
    transaction: 'Sales Quotations',
    code: 'sales-quotations',
    label: 'Sales - Sales Quotations',
    value: 'Sales - Sales Quotations'
  },
  {
    module: 'HRMS',
    transaction: 'Assets',
    code: 'hrms-assets',
    label: 'HRMS - Assets',
    value: 'HRMS - Assets'
  },
  {
    module: 'Purchase',
    transaction: 'Purchase Request',
    code: 'purchase-request',
    label: 'Purchase - Purchase Request',
    value: 'Purchase - Purchase Request'
  },
  {
    module: 'Finance',
    transaction: 'Receipt',
    code: 'receipt',
    label: 'Finance - Receipt',
    value: 'Finance - Receipt'
  },
  {
    module: 'Finance',
    transaction: 'Payment',
    code: 'payment',
    label: 'Finance - Payment',
    value: 'Finance - Payment'
  },
  {
    module: 'Assets',
    transaction: 'Asset Creation',
    code: 'asset-creations',
    label: 'Assets',
    value: 'Assets'
  },
  {
    module: 'JobOrder',
    transaction: 'Job Order',
    code: 'job-order',
    label: 'Job Order',
    value: 'Job Order'
  },

  {
    module: 'GoldReturn',
    transaction: 'Gold Return',
    code: 'gold-return',
    label: 'Gold Return',
    value: 'Gold Return'
  },
  {
    module: 'BillOfMaterial',
    transaction: 'Bill Of Material',
    code: 'bom',
    label: 'BOM',
    value: 'BOM'
  },
  {
    module: 'Routing',
    transaction: 'Routing',
    code: 'routing',
    label: 'Routing',
    value: 'Routing'
  },
  {
    module: 'ProductionOrder',
    transaction: 'Production Order',
    code: 'production-order',
    label: 'Production Order',
    value: 'Production Order'
  },
  {
    module: 'POSInvoice',
    transaction: 'POS Invoice',
    code: 'POS-invoice',
    label: 'POS Invoice',
    value: 'POS Invoice'
  },
  {
    module: 'Gold',
    transaction: 'Gold Customer Stock',
    code: 'gold-customer-stock',
    label: 'Gold Customer Stock',
    value: 'Gold Customer Stock'
  },
  {
    module: 'Gold',
    transaction: 'Gold In-house Stock',
    code: 'gold-in-house-stock',
    label: 'Gold In-house Stock',
    value: 'Gold In-house Stock'
  },
  {
    module: 'Gold',
    transaction: 'Gold Additions Stock',
    code: 'gold-additions-stock',
    label: 'Gold Additions Stock',
    value: 'Gold Additions Stock'
  },
  {
    module: 'Finance',
    transaction: 'Proforma Invoice',
    code: 'proforma-invoice',
    label: 'Proforma Invoice',
    value: 'Proforma Invoice'
  },
  {
    module: 'Stock',
    transaction: 'Batch',
    code: 'batch',
    label: 'Batch',
    value: 'Batch'
  },
  {
    module: 'Stock',
    transaction: 'Serial',
    code: 'serial',
    label: 'Serial',
    value: 'Serial'
  },
  {
    module: 'Stock',
    transaction: 'Material Request/Return',
    code: 'material-transfers',
    label: 'Material Request/Return',
    value: 'Material Request/Return'
  },
  {
    module: 'Amortization',
    transaction: 'Invoice',
    code: 'amortization',
    label: 'Amortization',
    value: 'Amortization'
  },
  {
    module: 'Expenses',
    transaction: 'Debit-Note',
    code: 'Expense-Debit-Note',
    label: 'Expenses - Debit-Note',
    value: 'Expenses -  Debit-Note'
  },
  {
    module: 'Sales',
    transaction: 'Delivery Returns',
    code: 'delivery-returns',
    label: 'Delivery Returns',
    value: 'Delivery Returns'
  },
  {
    module: 'Purchase',
    transaction: 'Goods Returns',
    code: 'goods-returns',
    label: 'Goods Returns',
    value: 'Goods Returns'
  },
  {
    module: 'CycleCountPlans',
    transaction: 'Cycle Count Plans',
    code: 'cycle-count-plans',
    label: 'Cycle Count Plans',
    value: 'Cycle Count Plans'
  }
]

export const GENDER = [
  {
    label: 'female',
    value: 'female'
  },
  {
    label: 'male',
    value: 'male'
  },
  {
    label: 'others',
    value: 'others'
  }
]
export const COUNTRIES = [
  {
    label: 'Afghanistan',
    code: 'AF',
    value: 'Afghanistan'
  },
  {
    label: 'Åland Islands',
    code: 'AX',
    value: 'Åland Islands'
  },
  {
    label: 'Albania',
    code: 'AL',
    value: 'Albania'
  },
  {
    label: 'Algeria',
    code: 'DZ',
    value: 'Algeria'
  },
  {
    label: 'American Samoa',
    code: 'AS',
    value: 'American Samoa'
  },
  {
    label: 'AndorrA',
    code: 'AD',
    value: 'AndorrA'
  },
  {
    label: 'Angola',
    code: 'AO',
    value: 'Angola'
  },
  {
    label: 'Anguilla',
    code: 'AI',
    value: 'Anguilla'
  },
  {
    label: 'Antarctica',
    code: 'AQ',
    value: 'Antarctica'
  },
  {
    label: 'Antigua and Barbuda',
    code: 'AG',
    value: 'Antigua and Barbuda'
  },
  {
    label: 'Argentina',
    code: 'AR',
    value: 'Argentina'
  },
  {
    label: 'Armenia',
    code: 'AM',
    value: 'Armenia'
  },
  {
    label: 'Aruba',
    code: 'AW',
    value: 'Aruba'
  },
  {
    label: 'Australia',
    code: 'AU',
    value: 'Australia'
  },
  {
    label: 'Austria',
    code: 'AT',
    value: 'Austria'
  },
  {
    label: 'Azerbaijan',
    code: 'AZ',
    value: 'Azerbaijan'
  },
  {
    label: 'Bahamas',
    code: 'BS',
    value: 'Bahamas'
  },
  {
    label: 'Bahrain',
    code: 'BH',
    value: 'Bahrain'
  },
  {
    label: 'Bangladesh',
    code: 'BD',
    value: 'Bangladesh'
  },
  {
    label: 'Barbados',
    code: 'BB',
    value: 'Barbados'
  },
  {
    label: 'Belarus',
    code: 'BY',
    value: 'Belarus'
  },
  {
    label: 'Belgium',
    code: 'BE',
    value: 'Belgium'
  },
  {
    label: 'Belize',
    code: 'BZ',
    value: 'Belize'
  },
  {
    label: 'Benin',
    code: 'BJ',
    value: 'Benin'
  },
  {
    label: 'Bermuda',
    code: 'BM',
    value: 'Bermuda'
  },
  {
    label: 'Bhutan',
    code: 'BT',
    value: 'Bhutan'
  },
  {
    label: 'Bolivia',
    code: 'BO',
    value: 'Bolivia'
  },
  {
    label: 'Bosnia and Herzegovina',
    code: 'BA',
    value: 'Bosnia and Herzegovina'
  },
  {
    label: 'Botswana',
    code: 'BW',
    value: 'Botswana'
  },
  {
    label: 'Bouvet Island',
    code: 'BV',
    value: 'Bouvet Island'
  },
  {
    label: 'Brazil',
    code: 'BR',
    value: 'Brazil'
  },
  {
    label: 'British Indian Ocean Territory',
    code: 'IO',
    value: 'British Indian Ocean Territory'
  },
  {
    label: 'Brunei Darussalam',
    code: 'BN',
    value: 'Brunei Darussalam'
  },
  {
    label: 'Bulgaria',
    code: 'BG',
    value: 'Bulgaria'
  },
  {
    label: 'Burkina Faso',
    code: 'BF',
    value: 'Burkina Faso'
  },
  {
    label: 'Burundi',
    code: 'BI',
    value: 'Burundi'
  },
  {
    label: 'Cambodia',
    code: 'KH',
    value: 'Cambodia'
  },
  {
    label: 'Cameroon',
    code: 'CM',
    value: 'Cameroon'
  },
  {
    label: 'Canada',
    code: 'CA',
    value: 'Canada'
  },
  {
    label: 'Cape Verde',
    code: 'CV',
    value: 'Cape Verde'
  },
  {
    label: 'Cayman Islands',
    code: 'KY',
    value: 'Cayman Islands'
  },
  {
    label: 'Central African Republic',
    code: 'CF',
    value: 'Central African Republic'
  },
  {
    label: 'Chad',
    code: 'TD',
    value: 'Chad'
  },
  {
    label: 'Chile',
    code: 'CL',
    value: 'Chile'
  },
  {
    label: 'China',
    code: 'CN',
    value: 'China'
  },
  {
    label: 'Christmas Island',
    code: 'CX',
    value: 'Christmas Island'
  },
  {
    label: 'Cocos (Keeling) Islands',
    code: 'CC',
    value: 'Cocos (Keeling) Islands'
  },
  {
    label: 'Colombia',
    code: 'CO',
    value: 'Colombia'
  },
  {
    label: 'Comoros',
    code: 'KM',
    value: 'Comoros'
  },
  {
    label: 'Congo',
    code: 'CG',
    value: 'Congo'
  },
  {
    label: 'Congo, The Democratic Republic of the',
    code: 'CD',
    value: 'Congo, The Democratic Republic of the'
  },
  {
    label: 'Cook Islands',
    code: 'CK',
    value: 'Cook Islands'
  },
  {
    label: 'Costa Rica',
    code: 'CR',
    value: 'Costa Rica'
  },
  {
    label: "Cote D'Ivoire",
    code: 'CI',
    value: "Cote D'Ivoire"
  },
  {
    label: 'Croatia',
    code: 'HR',
    value: 'Croatia'
  },
  {
    label: 'Cuba',
    code: 'CU',
    value: 'Cuba'
  },
  {
    label: 'Cyprus',
    code: 'CY',
    value: 'Cyprus'
  },
  {
    label: 'Czech Republic',
    code: 'CZ',
    value: 'Czech Republic'
  },
  {
    label: 'Denmark',
    code: 'DK',
    value: 'Denmark'
  },
  {
    label: 'Djibouti',
    code: 'DJ',
    value: 'Djibouti'
  },
  {
    label: 'Dominica',
    code: 'DM',
    value: 'Dominica'
  },
  {
    label: 'Dominican Republic',
    code: 'DO',
    value: 'Dominican Republic'
  },
  {
    label: 'Ecuador',
    code: 'EC',
    value: 'Ecuador'
  },
  {
    label: 'Egypt',
    code: 'EG',
    value: 'Egypt'
  },
  {
    label: 'El Salvador',
    code: 'SV',
    value: 'El Salvador'
  },
  {
    label: 'Equatorial Guinea',
    code: 'GQ',
    value: 'Equatorial Guinea'
  },
  {
    label: 'Eritrea',
    code: 'ER',
    value: 'Eritrea'
  },
  {
    label: 'Estonia',
    code: 'EE',
    value: 'Estonia'
  },
  {
    label: 'Ethiopia',
    code: 'ET',
    value: 'Ethiopia'
  },
  {
    label: 'Falkland Islands (Malvinas)',
    code: 'FK',
    value: 'Falkland Islands (Malvinas)'
  },
  {
    label: 'Faroe Islands',
    code: 'FO',
    value: 'Faroe Islands'
  },
  {
    label: 'Fiji',
    code: 'FJ',
    value: 'Fiji'
  },
  {
    label: 'Finland',
    code: 'FI',
    value: 'Finland'
  },
  {
    label: 'France',
    code: 'FR',
    value: 'France'
  },
  {
    label: 'French Guiana',
    code: 'GF',
    value: 'French Guiana'
  },
  {
    label: 'French Polynesia',
    code: 'PF',
    value: 'French Polynesia'
  },
  {
    label: 'French Southern Territories',
    code: 'TF',
    value: 'French Southern Territories'
  },
  {
    label: 'Gabon',
    code: 'GA',
    value: 'Gabon'
  },
  {
    label: 'Gambia',
    code: 'GM',
    value: 'Gambia'
  },
  {
    label: 'Georgia',
    code: 'GE',
    value: 'Georgia'
  },
  {
    label: 'Germany',
    code: 'DE',
    value: 'Germany'
  },
  {
    label: 'Ghana',
    code: 'GH',
    value: 'Ghana'
  },
  {
    label: 'Gibraltar',
    code: 'GI',
    value: 'Gibraltar'
  },
  {
    label: 'Greece',
    code: 'GR',
    value: 'Greece'
  },
  {
    label: 'Greenland',
    code: 'GL',
    value: 'Greenland'
  },
  {
    label: 'Grenada',
    code: 'GD',
    value: 'Grenada'
  },
  {
    label: 'Guadeloupe',
    code: 'GP',
    value: 'Guadeloupe'
  },
  {
    label: 'Guam',
    code: 'GU',
    value: 'Guam'
  },
  {
    label: 'Guatemala',
    code: 'GT',
    value: 'Guatemala'
  },
  {
    label: 'Guernsey',
    code: 'GG',
    value: 'Guernsey'
  },
  {
    label: 'Guinea',
    code: 'GN',
    value: 'Guinea'
  },
  {
    label: 'Guinea-Bissau',
    code: 'GW',
    value: 'Guinea-Bissau'
  },
  {
    label: 'Guyana',
    code: 'GY',
    value: 'Guyana'
  },
  {
    label: 'Haiti',
    code: 'HT',
    value: 'Haiti'
  },
  {
    label: 'Heard Island and Mcdonald Islands',
    code: 'HM',
    value: 'Heard Island and Mcdonald Islands'
  },
  {
    label: 'Holy See (Vatican City State)',
    code: 'VA',
    value: 'Holy See (Vatican City State)'
  },
  {
    label: 'Honduras',
    code: 'HN',
    value: 'Honduras'
  },
  {
    label: 'Hong Kong',
    code: 'HK',
    value: 'Hong Kong'
  },
  {
    label: 'Hungary',
    code: 'HU',
    value: 'Hungary'
  },
  {
    label: 'Iceland',
    code: 'IS',
    value: 'Iceland'
  },
  {
    label: 'India',
    code: 'IN',
    value: 'India'
  },
  {
    label: 'Indonesia',
    code: 'ID',
    value: 'Indonesia'
  },
  {
    label: 'Iran, Islamic Republic Of',
    code: 'IR',
    value: 'Iran, Islamic Republic Of'
  },
  {
    label: 'Iraq',
    code: 'IQ',
    value: 'Iraq'
  },
  {
    label: 'Ireland',
    code: 'IE',
    value: 'Ireland'
  },
  {
    label: 'Isle of Man',
    code: 'IM',
    value: 'Isle of Man'
  },
  {
    label: 'Israel',
    code: 'IL',
    value: 'Israel'
  },
  {
    label: 'Italy',
    code: 'IT',
    value: 'Italy'
  },
  {
    label: 'Jamaica',
    code: 'JM',
    value: 'Jamaica'
  },
  {
    label: 'Japan',
    code: 'JP',
    value: 'Japan'
  },
  {
    label: 'Jersey',
    code: 'JE',
    value: 'Jersey'
  },
  {
    label: 'Jordan',
    code: 'JO',
    value: 'Jordan'
  },
  {
    label: 'Kazakhstan',
    code: 'KZ',
    value: 'Kazakhstan'
  },
  {
    label: 'Kenya',
    code: 'KE',
    value: 'Kenya'
  },
  {
    label: 'Kiribati',
    code: 'KI',
    value: 'Kiribati'
  },
  {
    label: "Korea, Democratic People'S Republic of",
    code: 'KP',
    value: "Korea, Democratic People'S Republic of"
  },
  {
    label: 'Korea, Republic of',
    code: 'KR',
    value: 'Korea, Republic of'
  },
  {
    label: 'Kuwait',
    code: 'KW',
    value: 'Kuwait'
  },
  {
    label: 'Kyrgyzstan',
    code: 'KG',
    value: 'Kyrgyzstan'
  },
  {
    label: "Lao People'S Democratic Republic",
    code: 'LA',
    value: "Lao People'S Democratic Republic"
  },
  {
    label: 'Latvia',
    code: 'LV',
    value: 'Latvia'
  },
  {
    label: 'Lebanon',
    code: 'LB',
    value: 'Lebanon'
  },
  {
    label: 'Lesotho',
    code: 'LS',
    value: 'Lesotho'
  },
  {
    label: 'Liberia',
    code: 'LR',
    value: 'Liberia'
  },
  {
    label: 'Libyan Arab Jamahiriya',
    code: 'LY',
    value: 'Libyan Arab Jamahiriya'
  },
  {
    label: 'Liechtenstein',
    code: 'LI',
    value: 'Liechtenstein'
  },
  {
    label: 'Lithuania',
    code: 'LT',
    value: 'Lithuania'
  },
  {
    label: 'Luxembourg',
    code: 'LU',
    value: 'Luxembourg'
  },
  {
    label: 'Macao',
    code: 'MO',
    value: 'Macao'
  },
  {
    label: 'Macedonia, The Former Yugoslav Republic of',
    code: 'MK',
    value: 'Macedonia, The Former Yugoslav Republic of'
  },
  {
    label: 'Madagascar',
    code: 'MG',
    value: 'Madagascar'
  },
  {
    label: 'Malawi',
    code: 'MW',
    value: 'Malawi'
  },
  {
    label: 'Malaysia',
    code: 'MY',
    value: 'Malaysia'
  },
  {
    label: 'Maldives',
    code: 'MV',
    value: 'Maldives'
  },
  {
    label: 'Mali',
    code: 'ML',
    value: 'Mali'
  },
  {
    label: 'Malta',
    code: 'MT',
    value: 'Malta'
  },
  {
    label: 'Marshall Islands',
    code: 'MH',
    value: 'Marshall Islands'
  },
  {
    label: 'Martinique',
    code: 'MQ',
    value: 'Martinique'
  },
  {
    label: 'Mauritania',
    code: 'MR',
    value: 'Mauritania'
  },
  {
    label: 'Mauritius',
    code: 'MU',
    value: 'Mauritius'
  },
  {
    label: 'Mayotte',
    code: 'YT',
    value: 'Mayotte'
  },
  {
    label: 'Mexico',
    code: 'MX',
    value: 'Mexico'
  },
  {
    label: 'Micronesia, Federated States of',
    code: 'FM',
    value: 'Micronesia, Federated States of'
  },
  {
    label: 'Moldova, Republic of',
    code: 'MD',
    value: 'Moldova, Republic of'
  },
  {
    label: 'Monaco',
    code: 'MC',
    value: 'Monaco'
  },
  {
    label: 'Mongolia',
    code: 'MN',
    value: 'Mongolia'
  },
  {
    label: 'Montserrat',
    code: 'MS',
    value: 'Montserrat'
  },
  {
    label: 'Morocco',
    code: 'MA',
    value: 'Morocco'
  },
  {
    label: 'Mozambique',
    code: 'MZ',
    value: 'Mozambique'
  },
  {
    label: 'Myanmar',
    code: 'MM',
    value: 'Myanmar'
  },
  {
    label: 'Namibia',
    code: 'NA',
    value: 'Namibia'
  },
  {
    label: 'Nauru',
    code: 'NR',
    value: 'Nauru'
  },
  {
    label: 'Nepal',
    code: 'NP',
    value: 'Nepal'
  },
  {
    label: 'Netherlands',
    code: 'NL',
    value: 'Netherlands'
  },
  {
    label: 'Netherlands Antilles',
    code: 'AN',
    value: 'Netherlands Antilles'
  },
  {
    label: 'New Caledonia',
    code: 'NC',
    value: 'New Caledonia'
  },
  {
    label: 'New Zealand',
    code: 'NZ',
    value: 'New Zealand'
  },
  {
    label: 'Nicaragua',
    code: 'NI',
    value: 'Nicaragua'
  },
  {
    label: 'Niger',
    code: 'NE',
    value: 'Niger'
  },
  {
    label: 'Nigeria',
    code: 'NG',
    value: 'Nigeria'
  },
  {
    label: 'Niue',
    code: 'NU',
    value: 'Niue'
  },
  {
    label: 'Norfolk Island',
    code: 'NF',
    value: 'Norfolk Island'
  },
  {
    label: 'Northern Mariana Islands',
    code: 'MP',
    value: 'Northern Mariana Islands'
  },
  {
    label: 'Norway',
    code: 'NO',
    value: 'Norway'
  },
  {
    label: 'Oman',
    code: 'OM',
    value: 'Oman'
  },
  {
    label: 'Pakistan',
    code: 'PK',
    value: 'Pakistan'
  },
  {
    label: 'Palau',
    code: 'PW',
    value: 'Palau'
  },
  {
    label: 'Palestinian Territory, Occupied',
    code: 'PS',
    value: 'Palestinian Territory, Occupied'
  },
  {
    label: 'Panama',
    code: 'PA',
    value: 'Panama'
  },
  {
    label: 'Papua New Guinea',
    code: 'PG',
    value: 'Papua New Guinea'
  },
  {
    label: 'Paraguay',
    code: 'PY',
    value: 'Paraguay'
  },
  {
    label: 'Peru',
    code: 'PE',
    value: 'Peru'
  },
  {
    label: 'Philippines',
    code: 'PH',
    value: 'Philippines'
  },
  {
    label: 'Pitcairn',
    code: 'PN',
    value: 'Pitcairn'
  },
  {
    label: 'Poland',
    code: 'PL',
    value: 'Poland'
  },
  {
    label: 'Portugal',
    code: 'PT',
    value: 'Portugal'
  },
  {
    label: 'Puerto Rico',
    code: 'PR',
    value: 'Puerto Rico'
  },
  {
    label: 'Qatar',
    code: 'QA',
    value: 'Qatar'
  },
  {
    label: 'Reunion',
    code: 'RE',
    value: 'Reunion'
  },
  {
    label: 'Romania',
    code: 'RO',
    value: 'Romania'
  },
  {
    label: 'Russian Federation',
    code: 'RU',
    value: 'Russian Federation'
  },
  {
    label: 'RWANDA',
    code: 'RW',
    value: 'RWANDA'
  },
  {
    label: 'Saint Helena',
    code: 'SH',
    value: 'Saint Helena'
  },
  {
    label: 'Saint Kitts and Nevis',
    code: 'KN',
    value: 'Saint Kitts and Nevis'
  },
  {
    label: 'Saint Lucia',
    code: 'LC',
    value: 'Saint Lucia'
  },
  {
    label: 'Saint Pierre and Miquelon',
    code: 'PM',
    value: 'Saint Pierre and Miquelon'
  },
  {
    label: 'Saint Vincent and the Grenadines',
    code: 'VC',
    value: 'Saint Vincent and the Grenadines'
  },
  {
    label: 'Samoa',
    code: 'WS',
    value: 'Samoa'
  },
  {
    label: 'San Marino',
    code: 'SM',
    value: 'San Marino'
  },
  {
    label: 'Sao Tome and Principe',
    code: 'ST',
    value: 'Sao Tome and Principe'
  },
  {
    label: 'Saudi Arabia',
    code: 'SA',
    value: 'Saudi Arabia'
  },
  {
    label: 'Senegal',
    code: 'SN',
    value: 'Senegal'
  },
  {
    label: 'Serbia and Montenegro',
    code: 'CS',
    value: 'Serbia and Montenegro'
  },
  {
    label: 'Seychelles',
    code: 'SC',
    value: 'Seychelles'
  },
  {
    label: 'Sierra Leone',
    code: 'SL',
    value: 'Sierra Leone'
  },
  {
    label: 'Singapore',
    code: 'SG',
    value: 'Singapore'
  },
  {
    label: 'Slovakia',
    code: 'SK',
    value: 'Slovakia'
  },
  {
    label: 'Slovenia',
    code: 'SI',
    value: 'Slovenia'
  },
  {
    label: 'Solomon Islands',
    code: 'SB',
    value: 'Solomon Islands'
  },
  {
    label: 'Somalia',
    code: 'SO',
    value: 'Somalia'
  },
  {
    label: 'South Africa',
    code: 'ZA',
    value: 'South Africa'
  },
  {
    label: 'South Georgia and the South Sandwich Islands',
    code: 'GS',
    value: 'South Georgia and the South Sandwich Islands'
  },
  {
    label: 'Spain',
    code: 'ES',
    value: 'Spain'
  },
  {
    label: 'Sri Lanka',
    code: 'LK',
    value: 'Sri Lanka'
  },
  {
    label: 'Sudan',
    code: 'SD',
    value: 'Sudan'
  },
  {
    label: 'Suriname',
    code: 'SR',
    value: 'Suriname'
  },
  {
    label: 'Svalbard and Jan Mayen',
    code: 'SJ',
    value: 'Svalbard and Jan Mayen'
  },
  {
    label: 'Swaziland',
    code: 'SZ',
    value: 'Swaziland'
  },
  {
    label: 'Sweden',
    code: 'SE',
    value: 'Sweden'
  },
  {
    label: 'Switzerland',
    code: 'CH',
    value: 'Switzerland'
  },
  {
    label: 'Syrian Arab Republic',
    code: 'SY',
    value: 'Syrian Arab Republic'
  },
  {
    label: 'Taiwan, Province of China',
    code: 'TW',
    value: 'Taiwan, Province of China'
  },
  {
    label: 'Tajikistan',
    code: 'TJ',
    value: 'Tajikistan'
  },
  {
    label: 'Tanzania, United Republic of',
    code: 'TZ',
    value: 'Tanzania, United Republic of'
  },
  {
    label: 'Thailand',
    code: 'TH',
    value: 'Thailand'
  },
  {
    label: 'Timor-Leste',
    code: 'TL',
    value: 'Timor-Leste'
  },
  {
    label: 'Togo',
    code: 'TG',
    value: 'Togo'
  },
  {
    label: 'Tokelau',
    code: 'TK',
    value: 'Tokelau'
  },
  {
    label: 'Tonga',
    code: 'TO',
    value: 'Tonga'
  },
  {
    label: 'Trinidad and Tobago',
    code: 'TT',
    value: 'Trinidad and Tobago'
  },
  {
    label: 'Tunisia',
    code: 'TN',
    value: 'Tunisia'
  },
  {
    label: 'Turkey',
    code: 'TR',
    value: 'Turkey'
  },
  {
    label: 'Turkmenistan',
    code: 'TM',
    value: 'Turkmenistan'
  },
  {
    label: 'Turks and Caicos Islands',
    code: 'TC',
    value: 'Turks and Caicos Islands'
  },
  {
    label: 'Tuvalu',
    code: 'TV',
    value: 'Tuvalu'
  },
  {
    label: 'Uganda',
    code: 'UG',
    value: 'Uganda'
  },
  {
    label: 'Ukraine',
    code: 'UA',
    value: 'Ukraine'
  },
  {
    label: 'United Arab Emirates',
    code: 'AE',
    value: 'United Arab Emirates'
  },
  {
    label: 'United Kingdom',
    code: 'GB',
    value: 'United Kingdom'
  },
  {
    label: 'United States',
    code: 'US',
    value: 'United States'
  },
  {
    label: 'United States Minor Outlying Islands',
    code: 'UM',
    value: 'United States Minor Outlying Islands'
  },
  {
    label: 'Uruguay',
    code: 'UY',
    value: 'Uruguay'
  },
  {
    label: 'Uzbekistan',
    code: 'UZ',
    value: 'Uzbekistan'
  },
  {
    label: 'Vanuatu',
    code: 'VU',
    value: 'Vanuatu'
  },
  {
    label: 'Venezuela',
    code: 'VE',
    value: 'Venezuela'
  },
  {
    label: 'Viet Nam',
    code: 'VN',
    value: 'Viet Nam'
  },
  {
    label: 'Virgin Islands, British',
    code: 'VG',
    value: 'Virgin Islands, British'
  },
  {
    label: 'Virgin Islands, U.S.',
    code: 'VI',
    value: 'Virgin Islands, U.S.'
  },
  {
    label: 'Wallis and Futuna',
    code: 'WF',
    value: 'Wallis and Futuna'
  },
  {
    label: 'Western Sahara',
    code: 'EH',
    value: 'Western Sahara'
  },
  {
    label: 'Yemen',
    code: 'YE',
    value: 'Yemen'
  },
  {
    label: 'Zambia',
    code: 'ZM',
    value: 'Zambia'
  },
  {
    label: 'Zimbabwe',
    code: 'ZW',
    value: 'Zimbabwe'
  }
]

export const DOCTYPE = [
  {
    label: 'Aramco ID',
    value: 'Aramco ID'
  },
  {
    label: 'Background form',
    value: 'Background form'
  },
  {
    label: 'CV',
    value: 'CV'
  },
  {
    label: 'Confidentiality',
    value: 'Confidentiality'
  },
  {
    label: 'Dependent Iqma',
    value: 'Dependent Iqma'
  },
  {
    label: 'Driving License',
    value: 'Driving License'
  },
  {
    label: 'Education Certificates',
    value: 'Education Certificates'
  },
  {
    label: 'Employment Agreement',
    value: 'Employment Agreement'
  },
  {
    label: 'Experience Certificates',
    value: 'Experience Certificates'
  },
  {
    label: 'ID',
    value: 'ID'
  },
  {
    label: 'Insurance',
    value: 'Insurance'
  },
  {
    label: 'Iqma',
    value: 'Iqma'
  },
  {
    label: 'Medical Record',
    value: 'Medical Record'
  },
  {
    label: 'Memo letter',
    value: 'Memo letter'
  },
  {
    label: 'Muqeem',
    value: 'Muqeem'
  },
  {
    label: 'Offer Letter',
    value: 'Offer Letter'
  },
  {
    label: 'Other Certificates',
    value: 'Other Certificates'
  },
  {
    label: 'Others',
    value: 'Others'
  },
  {
    label: 'PF number',
    value: 'PF number'
  },
  {
    label: 'Passport',
    value: 'Passport'
  },
  {
    label: 'Personal Action From',
    value: 'Personal Action From'
  },
  {
    label: 'Personal Documents',
    value: 'Personal Documents'
  },
  {
    label: 'Personal Information Sheet',
    value: 'Personal Information Sheet'
  },
  {
    label: 'Resignation Letter',
    value: 'Resignation Letter'
  },
  {
    label: 'SMP Action form',
    value: 'SMP Action form'
  },
  {
    label: 'Termination Letter',
    value: 'Termination Letter'
  },
  {
    label: 'Tickets',
    value: 'Tickets'
  },
  {
    label: 'Travel Form',
    value: 'Travel Form'
  }
]

export const DEPENDENT_DOC_TYPES = [
  {
    label: 'CPR',
    value: 'cpr'
  },
  {
    label: 'Passport',
    value: 'passport'
  },
  {
    label: 'Visa',
    value: 'visa'
  },
  {
    label: 'Driving License',
    value: 'drivingLicense'
  },
  {
    label: 'Insurance',
    value: 'insurance'
  }
]

export const GRADE = [
  {
    label: 'Grade O',
    value: 1
  },
  {
    label: 'Grade A+',
    value: 2
  },
  {
    label: 'Grade A',
    value: 3
  },
  {
    label: 'Grade B+',
    value: 4
  },
  {
    label: 'Grade B',
    value: '5'
  },
  {
    label: 'Grade C+',
    value: 6
  },
  {
    label: 'Grade C',
    value: 7
  },
  {
    label: 'Grade D+',
    value: 8
  },
  {
    label: 'Grade D',
    value: 9
  },
  {
    label: 'Grade E+',
    value: 10
  },
  {
    label: 'Grade E',
    value: 11
  }
]

export const LEAVE_APPLY_TYPES = [
  {
    label: 'Self',
    value: 'Self'
  },
  {
    label: 'Reportee',
    value: 'Reportee'
  }
]

export const LEAVE_TYPES = [
  {
    label: 'Half Day',
    value: 'Half day'
  },
  {
    label: 'Full Day',
    value: 'Full day'
  }
]

export const DEFAULT_LEAVE_TYPES = {
  type: '',
  description: '',
  roles: [],
  leavePerYear: '',
  location: [],
  jobLevel: [],
  employeeGroup: [],
  employeeSubgroup: []
}
export const ASSET_TYPE = [
  { label: 'Furniture & Fixtures', value: 'Furniture & Fixtures' },
  { label: 'Buildings', value: 'Buildings' },
  { label: 'Computer', value: 'Computer' },
  { label: 'Machinery & Equipment', value: 'Machinery & Equipment' },
  { label: 'Office Equipment', value: 'Office Equipment' },
  { label: 'Motor Vehicle', value: 'Motor Vehicle' },
  { label: 'Lease/Maintenance', value: 'Lease/Maintenance' },
  { label: 'Automotive Equipment', value: 'Automotive Equipment' }
]

export const TRACKING_TYPE = [
  {
    label: 'Barcode',
    value: 'Barcode'
  },
  {
    label: 'QRcode',
    value: 'QRcode'
  },
  {
    label: 'RFID',
    value: 'RFID'
  }
]
export const DEPRECIATION_METHOD = [
  { label: 'Straight Line', value: 'Straight Line' },
  { label: 'Accelerated or Sum of Remaining Years', value: 'Accelerated or Sum of Remaining Years' },
  { label: 'Units of Production', value: 'Units of Production' },
  { label: 'Double Declining Balance', value: 'Double Declining Balance' }
]

export const PAYMENT_TRANSACTION_TYPE = [
  { label: 'Wire', value: 'Wire' },
  { label: 'Cheque', value: 'Cheque' },
  { label: 'Post Dated Cheque', value: 'Post Dated Cheque' },
  { label: 'Cash', value: 'Cash' },
  { label: 'Other', value: 'Other' }
]

export const JOB_ORDER_TYPE = [
  { label: 'Sales Order', value: 'Sales Order' },
  { label: 'Job Order', value: 'Job Order' }
]

export const DEFAULT_GOLD_STOCK_DETAILS = {
  position: 10,
  materialCode: '',
  materialDescription: '',
  materialCodeDesc: '',
  unit: '',
  quantity: '',
  warehouse: '',
  amount: '',
  currency: ''
}

export const DEFAULT_LEAD_DETAILS = {
  additionalField1: '',
  additionalField2: '',
  additionalField3: '',
  additionalField4: '',
  additionalField5: ''
}
export const DEFAULT_LEAD_HISTORY = {
  status: '',
  assignedDate: null,
  assignedTo: null,
  forwardedTo: null,
  actionDate: null,
  probability: '',
  classification: '',
  selfNotes: '',
  forwardedNotes: '',
  isAdded: true
}
export const LEAD_STATUS = [
  { label: 'New', value: 'New' },
  { label: 'Contact Initiated', value: 'Contact Initiated' },
  { label: 'Trial Account Given', value: 'Trial Account Given' },
  { label: 'Demo Given', value: 'Demo Given' },
  { label: 'Awaiting Feedback', value: 'Awaiting Feedback' },
  { label: 'Not Reachable', value: 'Not Reachable' },
  { label: 'In Progress', value: 'In Progress' },
  { label: 'Follow Up', value: 'Follow Up' },
  { label: 'Won', value: 'Won' },
  { label: 'Lost', value: 'Lost' }
]
export const PROBABILITY = [
  { label: '0% - 25%', value: '0% - 25%' },
  { label: '26% - 50%', value: '26% - 50%' },
  { label: '51% - 75%', value: '51% - 75%' },
  { label: '76% - 100%', value: '76% - 100%' }
]
export const CLASSIFICATION = [
  { label: 'Hot', value: 'Hot' },
  { label: 'Warm', value: 'Warm' },
  { label: 'Cold', value: 'Cold' },
  { label: 'Frozen', value: 'Frozen' }
]

export const COUNTRY_CODE = [
  { label: '+93', value: '+93' },
  { label: '+358', value: '+358' },
  { label: '+355', value: '+355' },
  { label: '+213', value: '+213' },
  { label: '+1 684', value: '+1 684' },
  { label: '+376', value: '+376' },
  { label: '+244', value: '+244' },
  { label: '+1264', value: '+1264' },
  { label: '+672', value: '+672' },
  { label: '+1 268', value: '+1 268' },
  { label: '+54', value: '+54' },
  { label: '+374', value: '+374' },
  { label: '+297', value: '+297' },
  { label: '+61', value: '+61' },
  { label: '+43', value: '+43' },
  { label: '+994', value: '+994' },
  { label: '+1-242', value: '+1-242' },
  { label: '+973', value: '+973' },
  { label: '+880', value: '+880' },
  { label: '+1-246', value: '+1-246' },
  { label: '+375', value: '+375' },
  { label: '+32', value: '+32' },
  { label: '+501', value: '+501' },
  { label: '+229', value: '+229' },
  { label: '+1-441', value: '+1-441' },
  { label: '+975', value: '+975' },
  { label: '+591', value: '+591' },
  { label: '+387', value: '+387' },
  { label: '+267', value: '+267' },
  { label: '+47', value: '+47' },
  { label: '+55', value: '+55' },
  { label: '+246', value: '+246' },
  { label: '+673', value: '+673' },
  { label: '+359', value: '+359' },
  { label: '+226', value: '+226' },
  { label: '+257', value: '+257' },
  { label: '+855', value: '+855' },
  { label: '+237', value: '+237' },
  { label: '+1', value: '+1' },
  { label: '+238', value: '+238' },
  { label: '+1-345', value: '+1-345' },
  { label: '+236', value: '+236' },
  { label: '+235', value: '+235' },
  { label: '+56', value: '+56' },
  { label: '+86', value: '+86' },
  { label: '+61', value: '+61' },
  { label: '+61', value: '+61' },
  { label: '+57', value: '+57' },
  { label: '+269', value: '+269' },
  { label: '+242', value: '+242' },
  { label: '+243', value: '+243' },
  { label: '+682', value: '+682' },
  { label: '+506', value: '+506' },
  { label: '+225', value: '+225' },
  { label: '+385', value: '+385' },
  { label: '+53', value: '+53' },
  { label: '+357', value: '+357' },
  { label: '+420', value: '+420' },
  { label: '+45', value: '+45' },
  { label: '+253', value: '+253' },
  { label: '+1-767', value: '+1-767' },
  { label: '+593', value: '+593' },
  { label: '+20', value: '+20' },
  { label: '+503', value: '+503' },
  { label: '+240', value: '+240' },
  { label: '+291', value: '+291' },
  { label: '+372', value: '+372' },
  { label: '+251', value: '+251' },
  { label: '+500', value: '+500' },
  { label: '+298', value: '+298' },
  { label: '+679', value: '+679' },
  { label: '+358', value: '+358' },
  { label: '+33', value: '+33' },
  { label: '+594', value: '+594' },
  { label: '+689', value: '+689' },
  { label: '+262', value: '+262' },
  { label: '+241', value: '+241' },
  { label: '+220', value: '+220' },
  { label: '+995', value: '+995' },
  { label: '+49', value: '+49' },
  { label: '+233', value: '+233' },
  { label: '+350', value: '+350' },
  { label: '+30', value: '+30' },
  { label: '+299', value: '+299' },
  { label: '+1-473', value: '+1-473' },
  { label: '+590', value: '+590' },
  { label: '+1-671', value: '+1-671' },
  { label: '+502', value: '+502' },
  { label: '+44-1481', value: '+44-1481' },
  { label: '+224', value: '+224' },
  { label: '+245', value: '+245' },
  { label: '+592', value: '+592' },
  { label: '+509', value: '+509' },
  { label: '+672', value: '+672' },
  { label: '+379', value: '+379' },
  { label: '+504', value: '+504' },
  { label: '+852', value: '+852' },
  { label: '+36', value: '+36' },
  { label: '+354', value: '+354' },
  { label: '+91', value: '+91' },
  { label: '+62', value: '+62' },
  { label: '+98', value: '+98' },
  { label: '+964', value: '+964' },
  { label: '+353', value: '+353' },
  { label: '+44-1624', value: '+44-1624' },
  { label: '+972', value: '+972' },
  { label: '+39', value: '+39' },
  { label: '+1-876', value: '+1-876' },
  { label: '+81', value: '+81' },
  { label: '+44-1534', value: '+44-1534' },
  { label: '+962', value: '+962' },
  { label: '+7', value: '+7' },
  { label: '+254', value: '+254' },
  { label: '+686', value: '+686' },
  { label: '+850', value: '+850' },
  { label: '+82', value: '+82' },
  { label: '+965', value: '+965' },
  { label: '+996', value: '+996' },
  { label: '+856', value: '+856' },
  { label: '+371', value: '+371' },
  { label: '+961', value: '+961' },
  { label: '+266', value: '+266' },
  { label: '+231', value: '+231' },
  { label: '+218', value: '+218' },
  { label: '+', value: '+' },
  { label: '+423', value: '+423' },
  { label: '+352', value: '+352' },
  { label: '+853', value: '+853' },
  { label: '+389', value: '+389' },
  { label: '+261', value: '+261' },
  { label: '+265', value: '+265' },
  { label: '+60', value: '+60' },
  { label: '+960', value: '+960' },
  { label: '+223', value: '+223' },
  { label: '+356', value: '+356' },
  { label: '+692', value: '+692' },
  { label: '+596', value: '+596' },
  { label: '+222', value: '+222' },
  { label: '+230', value: '+230' },
  { label: '+262', value: '+262' },
  { label: '+52', value: '+52' },
  { label: '+691', value: '+691' },
  { label: '+373', value: '+373' },
  { label: '+377', value: '+377' },
  { label: '+976', value: '+976' },
  { label: '+1-664', value: '+1-664' },
  { label: '+212', value: '+212' },
  { label: '+258', value: '+258' },
  { label: '+95', value: '+95' },
  { label: '+264', value: '+264' },
  { label: '+674', value: '+674' },
  { label: '+977', value: '+977' },
  { label: '+31', value: '+31' },
  { label: '+599', value: '+599' },
  { label: '+687', value: '+687' },
  { label: '+64', value: '+64' },
  { label: '+505', value: '+505' },
  { label: '+227', value: '+227' },
  { label: '+234', value: '+234' },
  { label: '+683', value: '+683' },
  { label: '+672', value: '+672' },
  { label: '+1-670', value: '+1-670' },
  { label: '+47', value: '+47' },
  { label: '+968', value: '+968' },
  { label: '+92', value: '+92' },
  { label: '+680', value: '+680' },
  { label: '+970', value: '+970' },
  { label: '+507', value: '+507' },
  { label: '+675', value: '+675' },
  { label: '+595', value: '+595' },
  { label: '+51', value: '+51' },
  { label: '+63', value: '+63' },
  { label: '+64', value: '+64' },
  { label: '+48', value: '+48' },
  { label: '+351', value: '+351' },
  { label: '+974', value: '+974' },
  { label: '+262', value: '+262' },
  { label: '+40', value: '+40' },
  { label: '+7', value: '+7' },
  { label: '+250', value: '+250' },
  { label: '+290', value: '+290' },
  { label: '+1-869', value: '+1-869' },
  { label: '+1-758', value: '+1-758' },
  { label: '+508', value: '+508' },
  { label: '+1-784', value: '+1-784' },
  { label: '+685', value: '+685' },
  { label: '+378', value: '+378' },
  { label: '+239', value: '+239' },
  { label: '+966', value: '+966' },
  { label: '+221', value: '+221' },
  { label: '+381', value: '+381' },
  { label: '+248', value: '+248' },
  { label: '+232', value: '+232' },
  { label: '+65', value: '+65' },
  { label: '+421', value: '+421' },
  { label: '+386', value: '+386' },
  { label: '+677', value: '+677' },
  { label: '+252', value: '+252' },
  { label: '+27', value: '+27' },
  { label: '+500', value: '+500' },
  { label: '+34', value: '+34' },
  { label: '+94', value: '+94' },
  { label: '+249', value: '+249' },
  { label: '+597', value: '+597' },
  { label: '+47', value: '+47' },
  { label: '+268', value: '+268' },
  { label: '+46', value: '+46' },
  { label: '+41', value: '+41' },
  { label: '+963', value: '+963' },
  { label: '+886', value: '+886' },
  { label: '+992', value: '+992' },
  { label: '+255', value: '+255' },
  { label: '+66', value: '+66' },
  { label: '+670', value: '+670' },
  { label: '+228', value: '+228' },
  { label: '+690', value: '+690' },
  { label: '+676', value: '+676' },
  { label: '+1-868', value: '+1-868' },
  { label: '+216', value: '+216' },
  { label: '+90', value: '+90' },
  { label: '+993', value: '+993' },
  { label: '+1-649', value: '+1-649' },
  { label: '+688', value: '+688' },
  { label: '+256', value: '+256' },
  { label: '+380', value: '+380' },
  { label: '+971', value: '+971' },
  { label: '+44', value: '+44' },
  { label: '+1', value: '+1' },
  { label: '+00', value: '+00' },
  { label: '+598', value: '+598' },
  { label: '+998', value: '+998' },
  { label: '+678', value: '+678' },
  { label: '+58', value: '+58' },
  { label: '+84', value: '+84' },
  { label: '+1-284', value: '+1-284' },
  { label: '+1-340', value: '+1-340' },
  { label: '+681', value: '+681' },
  { label: '+212', value: '+212' },
  { label: '+967', value: '+967' },
  { label: '+260', value: '+260' },
  { label: '+263', value: '+263' },
  { label: '+1-787', value: '+1-787' },
  { label: '+1-809', value: '+1-809' }
]

export const SALES_ORDER_TYPES = [
  { label: 'Standard', value: 'Standard' },
  { label: 'Dropship', value: 'Dropship' }
]

export const PURCHASE_ORDER_TYPES = [
  { label: 'Standard', value: 'Standard' },
  { label: 'Dropship', value: 'Dropship' },
  { label: 'Asset', value: 'Asset' }
]

export const PRINT_MODE = [
  { label: 'Offset', value: 'Offset' },
  { label: 'Digital Media', value: 'Digital Media' },
  { label: 'Screen Printing', value: 'Screen Printing' },
  { label: 'Canon Digital ', value: 'Canon Digital ' },
  { label: 'OutSide Printing', value: 'OutSide Printing' }
]

export const NO_OF_PRINT = [
  { label: '1x0', value: '1x0' },
  { label: '1x1', value: '1x1' },
  { label: '1x2', value: '1x2' },
  { label: '1x3', value: '1x3' },
  { label: '1x4', value: '1x4' },
  { label: '2x0', value: '2x0' },
  { label: '2x1', value: '2x1' },
  { label: '2x2', value: '2x2' },
  { label: '2x3', value: '2x3' },
  { label: '2x4', value: '2x4' },
  { label: '3x0', value: '3x0' },
  { label: '3x1', value: '3x1' },
  { label: '3x2', value: '3x2' },
  { label: '3x3', value: '3x3' },
  { label: '3x4', value: '3x4' },
  { label: '4x0', value: '4x0' },
  { label: '4x1', value: '4x1' },
  { label: '4x2', value: '4x2' },
  { label: '4x3', value: '4x3' },
  { label: '4x4', value: '4x4' }
]

export const COLOR_MODE = [
  { label: 'Black', value: 'Black' },
  { label: 'Blue', value: 'Blue' },
  { label: 'Green', value: 'Green' },
  { label: 'Red', value: 'Red' },
  { label: 'Reflex Blue', value: 'Reflex Blue' },
  { label: 'Violet', value: 'Violet' },
  { label: 'Cyan ', value: 'Cyan ' },
  { label: 'Magenta', value: 'Magenta' },
  { label: 'Yellow', value: 'Yellow' },
  { label: 'Pink', value: 'Pink' },
  { label: 'Brown', value: 'Brown' }
]

export const OPEN_CLOSE_SIZE = [
  { label: 'A6', value: 'A6' },
  { label: 'A5', value: 'A5' },
  { label: 'A4', value: 'A4' },
  { label: 'A3', value: 'A3' },
  { label: '48x33s', value: '48x33' }
]

export const BINDING = [
  { label: 'Saddle Stitch', value: 'Saddle Stitchs' },
  { label: 'Perfect Binding', value: 'Perfect Bindings' },
  { label: 'Spiral Binding', value: 'Spiral Bindings' },
  { label: 'Hardcase Binding', value: 'Hardcase Bindings' },
  { label: 'Die Cutting', value: 'Die Cuttings' },
  { label: 'Glue  Pad', value: 'Glue  Pads' },
  { label: 'Perforation', value: 'Perforations' },
  { label: 'Top Pinning', value: 'Top Pinnings' },
  { label: 'Side Pinning', value: 'Side Pinnings' }
]

export const FOLDING = [
  { label: 'center Folding', value: 'center Folding' },
  { label: 'Single Folding', value: 'Single Folding' },
  { label: 'Two Folding', value: 'Two Folding' },
  { label: 'Three Folding', value: 'Three Folding' }
]

export const LAMINATION = [
  { label: 'One Side Glosy Lamination', value: 'One Side Glosy Lamination' },
  { label: 'BothSide Glosy Lamination', value: 'BothSide Glosy Lamination' },
  { label: 'One Side Matt Lamination', value: 'One Side Matt Lamination' },
  { label: 'BothSide Matt Lamination', value: 'BothSide Matt Lamination' },
  { label: 'Hard Glosy Lamination', value: 'Hard Glosy Lamination' },
  { label: 'Hard Matt Lamination', value: 'Hard Matt Lamination' }
]
export const DRILL = [{ label: 'Hole Punching', value: 'Hole Punching' }]

export const PACKING = [
  { label: 'Al Haram Box', value: 'Al Haram Box' },
  { label: 'White Box', value: 'White Box' },
  { label: 'ShrinkWrapping', value: 'ShrinkWrapping' }
]
export const FOILING = [
  { label: 'Gold Foiling', value: 'Gold Foiling' },
  { label: 'Silver Foiling', value: 'Silver Foiling' },
  { label: 'Purple Foiling', value: 'Purple Foiling' },
  { label: 'Green Foiling', value: 'Green Foiling' },
  { label: 'Red Foiling', value: 'Red Foiling' }
]

export const ORDER_STATUS = [
  { label: 'Created', value: 'Created' },
  { label: 'Approved', value: 'Approved' },
  { label: 'Shortclosed', value: 'Shortclosed' }
]

export const EMPLOYEE_TRANSER_TYPES = [
  { label: 'Permanent', value: 'Permanent' },
  { label: 'Temporary', value: 'Temporary' }
]

export const DOCUMENT_CHARGE_TYPES = [
  { label: 'Charge', value: 'Charge' },
  { label: 'Discount', value: 'Discount' }
]

export const JOURNAL_VOUCHER = [
  { label: 'Journal Voucher', value: 'JORVOU' },
  { label: 'Bank Asset', value: 'BACAST' },
  { label: 'LoC issue', value: 'LCISSUE' },
  { label: 'LoC closure', value: 'LOCCLO' },
  { label: 'Prepaid Rent', value: 'ADVREN' },
  { label: 'Employee Loan', value: 'EMPLOA' },
  { label: 'Employee interest booking', value: 'EMPLIR' },
  { label: 'Employee interest payment', value: 'EMPINP' },
  { label: 'Employee Loan Repayment', value: 'EMPREPAY' },
  { label: 'Cash Reserves', value: 'RESERV' },
  { label: 'Cash Reserves Reversal', value: 'RESERR' },
  { label: 'Financial Closure', value: 'FINCLO' },
  { label: 'Opening Balance', value: 'OPENBAL' },
  { label: 'Customer Adjustment', value: 'JVCADJ' },
  { label: 'Customer Balance', value: 'JVCBAL' }
]

export const BUDGET_PERIOD_OPTIONS = [
  { label: 'Weekly', value: 'Weekly' },
  { label: 'Monthly', value: 'Monthly' },
  { label: 'Quaterly', value: 'Quaterly' },
  { label: 'Half-Yearly', value: 'Half-Yearly' },
  { label: 'Yearly', value: 'Yearly' }
]

export const LANGUAGES = [
  { label: 'Chinese', code: 'zh-Hans', value: 'zh-Hans' },
  { label: 'Arabic', code: 'ar', value: 'ar' },
  { label: 'Bulgarian', code: 'bg', value: 'bg' },
  { label: 'Czech', code: 'cs', value: 'cs' },
  { label: 'Danish', code: 'da', value: 'da' },
  { label: 'German', code: 'de', value: 'de' },
  { label: 'Greek', code: 'el', value: 'el' },
  { label: 'English', code: 'en', value: 'en' },
  { label: 'Spanish', code: 'es', value: 'es' },
  { label: 'Estonian', code: 'et', value: 'et' },
  { label: 'Finnish', code: 'fi', value: 'fi' },
  { label: 'French', code: 'fr', value: 'fr' },
  { label: 'Hungarian', code: 'hu', value: 'hu' },
  { label: 'Indonesia', code: 'id', value: 'id' },
  { label: 'Italian', code: 'it', value: 'it' },
  { label: 'Japanese', code: 'ja', value: 'ja' },
  { label: 'Korean', code: 'ko', value: 'ko' },
  { label: 'Lithuanian', code: 'lt', value: 'lt' },
  { label: 'Latvian', code: 'lv', value: 'lv' },
  { label: 'Norwegian', code: 'nb', value: 'nb' },
  { label: 'Dutch', code: 'nl', value: 'nl' },
  { label: 'Polish', code: 'pl', value: 'pl' },
  { label: 'Portuguese', code: 'pt-PT', value: 'pt-PT' },
  { label: 'Romanian', code: 'ro', value: 'ro' },
  { label: 'Russian', code: 'ru', value: 'ru' },
  { label: 'Slovak', code: 'sk', value: 'sk' },
  { label: 'slovenian', code: 'sl', value: 'sl' },
  { label: 'Swedish', code: 'sv', value: 'sv' },
  { label: 'Turkish', code: 'tr', value: 'tr' }
]

export const getTransactionCodeName = (code) => {
  switch (code) {
    case 'DSALINV':
      return 'Customer Sales Invoice'
    case 'SALDEL':
      return 'Customer Sales Delivery'
    case 'EXPINV':
      return 'Expense Invoice'
    case 'PURREC':
      return 'Purchase Goods Receipt'
    case 'EXPPAY':
      return 'Expense Payment'
    case 'DIREXP':
      return 'Direct Expense Payment'
    case 'ADVADJ':
      return 'Advance Adjustment'
    case 'AMORTI':
      return 'Amortisation'
    case 'DSALREC':
      return 'Direct Sales Receipt'
    case 'CUSADV':
      return 'Customer Advance Receipt'
    case 'DRINV':
      return 'Customer Invoice (Direct)'
    case 'JOROUT':
      return 'Job Order Issue'
    case 'STKREC':
      return 'Inventory Stock Receipt'
    case 'DIRREC':
      return 'Direct Receipts'
    case 'DSALADV':
      return 'Advance'
    case 'DELRET':
      return 'Delivery Return'
    case 'CRINV':
      return 'Credit Note'
    case 'JORVOU':
      return 'Journal Voucher'
    case 'CUSCLE':
      return 'Customs Clearance Expenses'
    case 'ASTCAP':
      return 'Asset Capitalisation'
    case 'OPENBAL':
      return 'Opening Balance'
    case 'STKISS':
      return 'Inventory Stock Issue'
    case 'PRDACT':
      return 'Production Activity Reporting'
    case 'PRODISS':
      return 'Production Issue'
    case 'PRDREC':
      return 'Production Receipt'
    case 'JORINP':
      return 'Job Order Receipt'
    case 'PURINV':
      return 'Supplier Invoice'
    case 'PURPAY':
      return 'Supplier Invoice Payment'
    default:
      return code
  }
}

export const LOCATIONS = [
  { label: 'Bangalore', value: 'Bangalore' },
  { label: 'Chennai', value: 'Chennai' },
  { label: 'Hyderabad', value: 'Hyderabad' }
]

export const JOB_LEVEL = [
  { label: 'Associate (T1)', value: 'Bangalore' },
  { label: 'Specialist (T2)', value: 'Specialist (T2)' },
  { label: 'Senior Specialist (T3)', value: 'Senior Specialist (T3)' }
]

export const EMPLOYEE_GROUP = [
  { label: 'Active', value: 'Active' },
  { label: 'Inactive', value: 'Inactive' },
  { label: 'Trainee', value: 'Trainee' },
  { label: 'Terminated', value: 'Terminated' },
  { label: 'External Employee', value: 'External Employee' },
  { label: 'Retire/Pensioner', value: 'Retire/Pensioner' },
  { label: 'Early Retire', value: 'Early Retire' }
]

export const EMPLOYEE_SUBGROUP = [
  { label: 'Salaried Staff', value: 'Salaried Staff' },
  { label: 'Hourly Wage', value: 'Hourly Wage' },
  { label: 'Salary Packaging', value: 'Salary Packaging' },
  { label: 'Bi-Weekly Salaried', value: 'Bi-Weekly Salaried' }
]
