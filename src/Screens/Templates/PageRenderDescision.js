import {
  batchSerialItemProperties,
  bookingProperties,
  clientProperties,
  commonProperties,
  companyProperties,
  deliveryReturnItemProperties,
  deliveryReturnProperties,
  directExpenseProperties,
  directReceiptProperties,
  employeeProperties,
  expensePaymentProperties,
  goodsReceiptItemProperties,
  goodsReceiptProperties,
  goodsReturnItemProperties,
  goodsReturnProperties,
  invoiceDocumentChargeProperties,
  invoiceItemProperties,
  invoiceProperties,
  invoiceReceiptProperties,
  jobCreationProperties,
  jobOrderItemProperties,
  jobOrderProperties,
  leadProposalProperties,
  offerProperties,
  orderDeliveryItemProperties,
  orderDeliveryProperties,
  orderItemProperties,
  orderProperties,
  packageItemProperties,
  packageListProperties,
  payrollCommonProperties,
  reporterProperties,
  timeSheetProperties
} from './TemplateProperties'

export const payrollPage = {
  group: ['Common Properties', 'Employee Properties', 'Company Properties', 'Paymaster Properties'],
  items: [...payrollCommonProperties, ...employeeProperties, ...companyProperties]
}

export const invoicePage = {
  group: [
    'Common Properties',
    'Company Properties',
    'Client Properties',
    'Invoice Properties',
    'Invoice Item Properties',
    'Invoice Document Charge Properties'
  ],
  items: [
    ...commonProperties,
    ...companyProperties,
    ...clientProperties,
    ...invoiceProperties,
    ...invoiceItemProperties,
    ...invoiceDocumentChargeProperties
  ]
}

export const purchaseRequestPage = {
  group: ['Common Properties', 'Company Properties', 'Order Properties', 'Order Item Properties'],
  items: [...commonProperties, ...companyProperties, ...orderProperties, ...orderItemProperties]
}

export const orderPage = {
  group: ['Common Properties', 'Company Properties', 'Order Properties', 'Order Item Properties'],
  items: [...commonProperties, ...companyProperties, ...orderProperties, ...orderItemProperties]
}

export const orderDeliveryPage = {
  group: [
    'Common Properties',
    'Company Properties',
    'Order Delivery Properties',
    'Order Delivery Item Properties',
    'Batch Serial Item Properties'
  ],
  items: [
    ...commonProperties,
    ...companyProperties,
    ...orderDeliveryProperties,
    ...orderDeliveryItemProperties,
    ...batchSerialItemProperties
  ]
}

export const deliveryReturnPage = {
  group: [
    'Common Properties',
    'Company Properties',
    'Delivery Return Properties',
    'Delivery Return Item Properties',
    'Batch Serial Item Properties'
  ],
  items: [
    ...commonProperties,
    ...companyProperties,
    ...deliveryReturnProperties,
    ...deliveryReturnItemProperties,
    ...batchSerialItemProperties
  ]
}

export const goodsReceiptPage = {
  group: [
    'Common Properties',
    'Company Properties',
    'Goods Receipt Properties',
    'Goods Receipt Item Properties',
    'Batch Serial Item Properties'
  ],
  items: [
    ...commonProperties,
    ...companyProperties,
    ...goodsReceiptProperties,
    ...goodsReceiptItemProperties,
    ...batchSerialItemProperties
  ]
}

export const goodsReturnPage = {
  group: [
    'Common Properties',
    'Company Properties',
    'Goods Return Properties',
    'Goods Return Item Properties',
    'Batch Serial Item Properties'
  ],
  items: [
    ...commonProperties,
    ...companyProperties,
    ...goodsReturnProperties,
    ...goodsReturnItemProperties,
    ...batchSerialItemProperties
  ]
}

export const salesReturnPage = {
  group: ['Common Properties', 'Company Properties', 'Order Properties', 'Order Item Properties'],
  items: [...commonProperties, ...companyProperties, ...orderProperties, ...orderItemProperties]
}

export const purchaseReturnPage = {
  group: ['Common Properties', 'Company Properties', 'Order Properties', 'Order Item Properties'],
  items: [...commonProperties, ...companyProperties, ...orderProperties, ...orderItemProperties]
}

export const timesheetPage = {
  group: [
    'Common Properties',
    'Company Properties',
    'Client Properties',
    'Employee Properties',
    'Reporter Properties',
    'Timesheet Properties'
  ],
  items: [
    ...companyProperties,
    ...clientProperties,
    ...commonProperties,
    ...employeeProperties,
    ...reporterProperties,
    ...timeSheetProperties
  ]
}

export const offerPage = {
  group: [
    'Common Properties',
    'Company Properties',
    'Offer Properties',
    'Package List Properties',
    'Package Item Properties'
  ],
  items: [
    ...commonProperties,
    ...companyProperties,
    ...offerProperties,
    ...packageListProperties,
    ...packageItemProperties
  ]
}

export const bookingPage = {
  group: [
    'Common Properties',
    'Company Properties',
    'Booking Properties',
    'Package List Properties',
    'Package Item Properties'
  ],
  items: [
    ...commonProperties,
    ...companyProperties,
    ...bookingProperties,
    ...packageListProperties,
    ...packageItemProperties
  ]
}

export const jobCreationPage = {
  group: [
    'Common Properties',
    'Company Properties',
    'Job Creation Properties',
    'Package List Properties',
    'Package Item Properties'
  ],
  items: [
    ...commonProperties,
    ...companyProperties,
    ...jobCreationProperties,
    ...packageListProperties,
    ...packageItemProperties
  ]
}

export const directReceiptPage = {
  group: ['Common Properties', 'Company Properties', 'Client Properties', 'Direct Receipt Properties'],
  items: [...commonProperties, ...companyProperties, ...clientProperties, ...directReceiptProperties]
}

export const directExpensePage = {
  group: ['Common Properties', 'Company Properties', 'Client Properties', 'Direct Expense Properties'],
  items: [...commonProperties, ...companyProperties, ...clientProperties, ...directExpenseProperties]
}

export const invoiceReceiptPage = {
  group: ['Common Properties', 'Company Properties', 'Client Properties', 'Invoice Receipt Properties'],
  items: [...commonProperties, ...companyProperties, ...clientProperties, ...invoiceReceiptProperties]
}

export const expensePaymentPage = {
  group: ['Common Properties', 'Company Properties', 'Client Properties', 'Expense Payment Properties'],
  items: [...commonProperties, ...companyProperties, ...clientProperties, ...expensePaymentProperties]
}
export const jobOrderPage = {
  group: ['Common Properties', 'Company Properties', 'Order Properties', 'Order Item Properties'],
  items: [...commonProperties, ...companyProperties, ...jobOrderProperties, ...jobOrderItemProperties]
}

export const leadProposalPage = {
  group: ['Common Properties', 'Company Properties', 'Lead Proposal Properties', 'Order Item Properties'],
  items: [...commonProperties, ...companyProperties, ...leadProposalProperties, ...orderItemProperties]
}
