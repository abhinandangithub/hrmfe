export type UserState = {
  userInfo: UserInfo
  adminUser: boolean
  companyInfo: CompanyInfo
}

export type UserInfo = {
  status: string
  _id: string
  name: string
  email: string
  network: string
  createdAt: string
  updatedAt: string
  company: string
  userType: string
  id: string
  roleData?: {
    access: string[]
    status: string
    name: string
  }
  userData: {
    user: string
    email: string
    userType: string
  }
  currencies: TCurrency[]
}

export type CompanyInfo = {
  _id: string
  configurations: Configurations
  status: string
  network: string
  name: string
  country: string
  currency: string
  crNo: string
  timeZone: string
  taxType: string
  taxNo: string
  tax: TNumber
  taxFormat: PercentageFormat
  email: string
  phone: string
  buildingNo: string
  street: string
  additionalStreet: string
  city: string
  state: string
  postalCode: string
  additionalNo: string
  neighbourhood: string
  banks: Bank[]
}

export type Bank = {
  bankAccountHolderName: string
  bankAccountNo: string
  bankAddress: string
  bankCurrency: string
  bankName: string
  bankSwift: string
}

export type Configurations = {
  division: string
  costCenter: string
  timeEntryFutureDate: string
  manualIncomeInvoiceNo: string
  manualExpenseInvoiceNo: string
  incomeAdditionalFields: string[]
  expenseAdditionalFields: string[]
  approvedIncomeCancellation: string
  approvedExpenseCancellation: string
  incomeDivisionLevel: string
  expenseDivisionLevel: string
  stockReductionInInvoice: string
  stockAdditionInExpense: string
  POSInvoice: string
  invoiceDueDateWhenEmailSent: string
  warehouseLocations: string
  warehouseRacks: string
  deliveryBasedOnSales: string
  jobBasedOnSales: string
  quotaionAdditionalFields: string[]
  defaultTrialBalanceConfig: string
  wholeSaleAndRetailPrice: string
  pickOrder: string
  deliveryByInventory: string
  receiptBasedOnPurchase: string
  barcodeFormat: string
  POSCategories: string
  POSSubCategories: string
  POSWarehouses: string[]
  defaultPOSWarehouse: string
  defaultPOSReturnWarehouse: string
  stockPriceAccess: string[]
  salesOrderAdditionalFields: string[]
  purchaseOrderAdditionalFields: string[]
  saveReportsInDMS: string
  incomeInvoiceApprover: string[]
  expenseInvoiceApprover: string[]
  invoiceTransmission: string
  invoiceTransmissionType: string
  inventoryCountScanAutoSave: string
  freeOfCost: string
}

export type TCurrency = {
  name: string
  unit: string
  code: string
  format: string
  decimalLength: number
}
