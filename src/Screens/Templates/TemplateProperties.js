import { removeEmptyKeys } from '../../Util/Util'

export const updateStyle = (style = {}) => {
  const newStyle = { ...removeEmptyKeys(style, ['border', 'borderLeft']) }

  if (newStyle.border && style.border !== 0) {
    newStyle.border = `${style.border}px solid ${style.borderColor}`
  }

  if (newStyle.borderLeft) {
    newStyle.borderLeft = `${newStyle.borderLeft}px solid ${style.borderColor}`
  }

  if (newStyle.borderRight) {
    newStyle.borderRight = `${newStyle.borderRight}px solid ${style.borderColor}`
  }

  if (newStyle.borderTop) {
    newStyle.borderTop = `${newStyle.borderTop}px solid ${style.borderColor}`
  }

  if (newStyle.borderBottom) {
    newStyle.borderBottom = `${newStyle.borderBottom}px solid ${style.borderColor}`
  }

  delete newStyle.height

  return newStyle
}

export const employeeProperties = [
  {
    name: 'Employee No',
    type: 'TextBox',
    value: '${employeeData.employeeNo}',
    itemFor: 'Employee',
    group: 'Employee Properties'
  },
  {
    name: 'Employee Name',
    type: 'TextBox',
    value: '${employeeData.name}',
    itemFor: 'Employee',
    group: 'Employee Properties'
  },
  {
    name: 'First Name',
    type: 'TextBox',
    value: '${employeeData.firstName}',
    itemFor: 'Employee',
    group: 'Employee Properties'
  },
  {
    name: 'Last Name',
    type: 'TextBox',
    value: '${employeeData.lastName}',
    itemFor: 'Employee',
    group: 'Employee Properties'
  },
  {
    name: 'Middle Name',
    type: 'TextBox',
    value: '${employeeData.middleName}',
    itemFor: 'Employee',
    group: 'Employee Properties'
  },
  {
    name: 'Employee Email',
    type: 'TextBox',
    value: '${employeeData.email}',
    itemFor: 'Employee',
    group: 'Employee Properties'
  },
  {
    name: 'Job Title',
    type: 'TextBox',
    value: '${employeeData.jobTitle}',
    itemFor: 'Employee',
    group: 'Employee Properties'
  },
  {
    name: 'Division',
    type: 'TextBox',
    value: '${employeeData.divisionData.name}',
    itemFor: 'Employee',
    group: 'Employee Properties'
  },
  {
    name: 'Employee Phone',
    type: 'TextBox',
    value: '${employeeData.phone}',
    itemFor: 'Employee',
    group: 'Employee Properties'
  },
  {
    name: 'Employee DOB',
    type: 'TextBox',
    value: '${employeeData.dob}',
    itemFor: 'Employee',
    group: 'Employee Properties'
  },
  {
    name: 'Employee Social Id',
    type: 'TextBox',
    value: '${employeeData.socialId}',
    itemFor: 'Employee',
    group: 'Employee Properties'
  },
  {
    name: 'Employee Street',
    type: 'TextBox',
    value: '${employeeData.street}',
    itemFor: 'Employee',
    group: 'Employee Properties'
  },
  {
    name: 'Employee City',
    type: 'TextBox',
    value: '${employeeData.city}',
    itemFor: 'Employee',
    group: 'Employee Properties'
  },
  {
    name: 'Employee State',
    type: 'TextBox',
    value: '${employeeData.stateName}',
    itemFor: 'Employee',
    group: 'Employee Properties'
  },
  {
    name: 'Employee Country',
    type: 'TextBox',
    value: '${employeeData.countryName}',
    itemFor: 'Employee',
    group: 'Employee Properties'
  },
  {
    name: 'Employee Postalcode',
    type: 'TextBox',
    value: '${employeeData.postalCode}',
    itemFor: 'Employee',
    group: 'Employee Properties'
  },
  {
    name: 'Employee BankName',
    type: 'TextBox',
    value: '${employeeData.bankName}',
    itemFor: 'Employee',
    group: 'Employee Properties'
  },
  {
    name: 'Employee Bank Acc No',
    type: 'TextBox',
    value: '${employeeData.bankAccountNo}',
    itemFor: 'Employee',
    group: 'Employee Properties'
  },
  {
    name: 'Employee BankSwift',
    type: 'TextBox',
    value: '${employeeData.bankSwift}',
    itemFor: 'Employee',
    group: 'Employee Properties'
  },
  {
    name: 'Employee Currency',
    type: 'TextBox',
    value: '${employeeData.currency}',
    itemFor: 'Employee',
    group: 'Employee Properties'
  }
]

export const companyProperties = [
  {
    name: 'Company Name',
    type: 'TextBox',
    value: '${companyData.name}',
    itemFor: 'Employee',
    group: 'Company Properties'
  },
  {
    name: 'Company Email',
    type: 'TextBox',
    value: '${companyData.email}',
    itemFor: 'Employee',
    group: 'Company Properties'
  },
  {
    name: 'Company Phone',
    type: 'TextBox',
    value: '${companyData.phone}',
    itemFor: 'Employee',
    group: 'Company Properties'
  },
  {
    name: 'Company BuildingNo',
    type: 'TextBox',
    value: '${companyData.buildingNo}',
    itemFor: 'Employee',
    group: 'Company Properties'
  },
  {
    name: 'Company Street',
    type: 'TextBox',
    value: '${companyData.street}',
    itemFor: 'Employee',
    group: 'Company Properties'
  },
  {
    name: 'Company Additional Street',
    type: 'TextBox',
    value: '${companyData.additionalStreet}',
    itemFor: 'Employee',
    group: 'Company Properties'
  },
  {
    name: 'Company City',
    type: 'TextBox',
    value: '${companyData.city}',
    group: 'Company Properties'
  },
  {
    name: 'Company State',
    type: 'TextBox',
    value: '${companyData.state}',
    itemFor: 'Employee',
    group: 'Company Properties'
  },
  {
    name: 'Company Country',
    type: 'TextBox',
    value: '${companyData.country}',
    itemFor: 'Employee',
    group: 'Company Properties'
  },
  {
    name: 'Company Postalcode',
    type: 'TextBox',
    value: '${companyData.postalCode}',
    itemFor: 'Employee',
    group: 'Company Properties'
  },
  {
    name: 'Company AdditionalNo',
    type: 'TextBox',
    value: '${companyData.additionalNo}',
    itemFor: 'Employee',
    group: 'Company Properties'
  },
  {
    name: 'Company Neighbourhood',
    type: 'TextBox',
    value: '${companyData.neighbourhood}',
    itemFor: 'Employee',
    group: 'Company Properties'
  },
  {
    name: 'Company Reg No',
    type: 'TextBox',
    value: '${companyData.crNo}',
    itemFor: 'Employee',
    group: 'Company Properties'
  },
  {
    name: 'Company Reg No Alt',
    type: 'TextBox',
    value: '${companyData.crNoAlt}',
    itemFor: 'Employee',
    group: 'Company Properties'
  },
  {
    name: 'Tax No',
    type: 'TextBox',
    value: '${companyData.taxNo}',
    itemFor: 'Employee',
    group: 'Company Properties'
  },
  {
    name: 'Tax No Alt',
    type: 'TextBox',
    value: '${companyData.taxNoAlt}',
    itemFor: 'Employee',
    group: 'Company Properties'
  }
]

export const clientProperties = [
  {
    name: 'Client Name',
    type: 'TextBox',
    value: '${clientData.name}',
    group: 'Client Properties'
  },
  {
    name: 'Client Type',
    type: 'TextBox',
    value: '${clientData.type}',
    group: 'Client Properties'
  },

  {
    name: 'Currency',
    type: 'TextBox',
    value: '${clientData.currency}',
    group: 'Client Properties'
  },
  {
    name: 'Tax Type',
    type: 'TextBox',
    value: '${clientData.taxType}',
    group: 'Client Properties'
  },
  {
    name: 'Tax No',
    type: 'TextBox',
    value: '${clientData.taxNo}',
    group: 'Client Properties'
  },
  {
    name: 'Tax No',
    type: 'TextBox',
    value: '${clientData.taxNoAlt}',
    group: 'Client Properties'
  },
  {
    name: 'Company Reg No',
    type: 'TextBox',
    value: '${clientData.crNo}',
    group: 'Client Properties'
  },
  {
    name: 'Company Reg No Alt',
    type: 'TextBox',
    value: '${clientData.crNoAlt}',
    group: 'Client Properties'
  },
  {
    name: 'Shipping BuildingNo',
    type: 'TextBox',
    value: '${clientData.shippingAddress.buildingNo}',
    group: 'Client Properties'
  },
  {
    name: 'Shipping Street',
    type: 'TextBox',
    value: '${clientData.shippingAddress.street}',
    group: 'Client Properties'
  },
  {
    name: 'Shipping Additional Street',
    type: 'TextBox',
    value: '${clientData.shippingAddress.additionalStreet}',
    group: 'Client Properties'
  },
  {
    name: 'Shipping City',
    type: 'TextBox',
    value: '${clientData.shippingAddress.city}',
    group: 'Client Properties'
  },
  {
    name: 'Shipping State',
    type: 'TextBox',
    value: '${clientData.shippingAddress.state}',
    group: 'Client Properties'
  },
  {
    name: 'Shipping PostalCode',
    type: 'TextBox',
    value: '${clientData.shippingAddress.postalCode}',
    group: 'Client Properties'
  },
  {
    name: 'Shipping Country',
    type: 'TextBox',
    value: '${clientData.shippingAddress.country}',
    group: 'Client Properties'
  },
  {
    name: 'Shipping AdditionalNo',
    type: 'TextBox',
    value: '${clientData.shippingAddress.additionalNo}',
    group: 'Client Properties'
  },
  {
    name: 'Shipping Neighbourhood',
    type: 'TextBox',
    value: '${clientData.shippingAddress.neighbourhood}',
    group: 'Client Properties'
  },
  {
    name: 'Billing BuildingNo',
    type: 'TextBox',
    value: '${clientData.billingAddress.buildingNo}',
    group: 'Client Properties'
  },
  {
    name: 'Billing Street',
    type: 'TextBox',
    value: '${clientData.billingAddress.street}',
    group: 'Client Properties'
  },
  {
    name: 'Billing Additional Street',
    type: 'TextBox',
    value: '${clientData.billingAddress.additionalStreet}',
    group: 'Client Properties'
  },
  {
    name: 'Billing City',
    type: 'TextBox',
    value: '${clientData.billingAddress.city}',
    group: 'Client Properties'
  },
  {
    name: 'Billing State',
    type: 'TextBox',
    value: '${clientData.billingAddress.state}',
    group: 'Client Properties'
  },
  {
    name: 'Billing PostalCode',
    type: 'TextBox',
    value: '${clientData.billingAddress.postalCode}',
    group: 'Client Properties'
  },
  {
    name: 'Billing Country',
    type: 'TextBox',
    value: '${clientData.billingAddress.country}',
    group: 'Client Properties'
  },
  {
    name: 'Billing AdditionalNo',
    type: 'TextBox',
    value: '${clientData.billingAddress.additionalNo}',
    group: 'Client Properties'
  },
  {
    name: 'Billing Neighbourhood',
    type: 'TextBox',
    value: '${clientData.billingAddress.neighbourhood}',
    group: 'Client Properties'
  },
  {
    name: 'Contact Person Name',
    type: 'TextBox',
    value: '${clientData.contactPerson.contactName}',
    group: 'Client Properties'
  },
  {
    name: 'Contact Person Name Alt',
    type: 'TextBox',
    value: '${clientData.contactPerson.contactNameAlt}',
    group: 'Client Properties'
  },
  {
    name: 'Contact Person Email',
    type: 'TextBox',
    value: '${clientData.contactPerson.contactEmail}',
    group: 'Client Properties'
  },
  {
    name: 'Contact Person Phone',
    type: 'TextBox',
    value: '${clientData.contactPerson.contactPhone}',
    group: 'Client Properties'
  }
]

export const payrollCommonProperties = [
  {
    name: 'Container',
    type: 'Container',
    group: 'Common Properties'
  },
  {
    name: 'Text Box',
    type: 'TextBox',
    group: 'Common Properties'
  },
  {
    name: 'Image',
    type: 'Image',
    group: 'Common Properties'
  },
  {
    name: 'Payroll TextBox',
    type: 'TextBox',
    itemFor: 'Employee',
    group: 'Common Properties'
  },
  {
    name: 'Underline',
    type: 'Underline',
    group: 'Common Properties'
  }
]

export const commonProperties = [
  {
    name: 'Container',
    type: 'Container',
    group: 'Common Properties'
  },
  {
    name: 'Text Box',
    type: 'TextBox',
    group: 'Common Properties'
  },
  {
    name: 'Image',
    type: 'Image',
    group: 'Common Properties'
  },
  {
    name: 'Underline',
    type: 'Underline',
    group: 'Common Properties'
  },
  {
    name: 'Header',
    type: 'Container',
    group: 'Common Properties',
    itemRef: 'header-ref'
  },
  {
    name: 'Footer',
    type: 'Container',
    group: 'Common Properties',
    itemRef: 'footer-ref'
  },
  {
    name: 'Page Number',
    type: 'TextBox',
    value: 'PDF_PAGE_NUMBER',
    group: 'Common Properties'
  },
  {
    name: 'Total Pages',
    type: 'TextBox',
    value: 'PDF_TOTAL_PAGES',
    group: 'Common Properties'
  }
]

export const invoiceProperties = [
  {
    name: 'Kind',
    type: 'TextBox',
    value: '${invoiceData.kind}',
    group: 'Invoice Properties'
  },
  {
    name: 'Invoice Number',
    type: 'TextBox',
    value: '${invoiceData.invoiceNo}',
    group: 'Invoice Properties'
  },
  {
    name: 'PO Number',
    type: 'TextBox',
    value: '${invoiceData.poNo}',
    group: 'Invoice Properties'
  },
  {
    name: 'Currency',
    type: 'TextBox',
    value: '${invoiceData.currency}',
    group: 'Invoice Properties'
  },
  {
    name: 'Issue Date',
    type: 'TextBox',
    value: "${formatedDate(invoiceData.issueDate, 'YYYY-MM-DD')}",
    group: 'Invoice Properties'
  },
  {
    name: 'Tax Date',
    type: 'TextBox',
    value: "${formatedDate(invoiceData.taxDate, 'YYYY-MM-DD')}",
    group: 'Invoice Properties'
  },
  {
    name: 'Tax Category',
    type: 'TextBox',
    value: '${invoiceData.taxCategory}',
    group: 'Invoice Properties'
  },
  {
    name: 'Vendor ID',
    type: 'TextBox',
    value: '${invoiceData.vendorId}',
    group: 'Invoice Properties'
  },
  {
    name: 'Amount',
    type: 'TextBox',
    value: '${invoiceData.amount}',
    group: 'Invoice Properties'
  },
  {
    name: 'Discount Amount',
    type: 'TextBox',
    value: '${invoiceData.discountAmount}',
    group: 'Invoice Properties'
  },
  {
    name: 'Charge Amount',
    type: 'TextBox',
    value: '${invoiceData.chargeAmount}',
    group: 'Invoice Properties'
  },

  {
    name: 'Charge Amount',
    type: 'TextBox',
    value: '${invoiceData.chargeAmount}',
    group: 'Invoice Properties'
  },
  {
    name: 'Document Net Amount',
    type: 'TextBox',
    value: '${invoiceData.documentNetAmount}',
    group: 'Invoice Properties'
  },
  {
    name: 'Document Charge Amount',
    type: 'TextBox',
    value: '${invoiceData.documentChargeAmount}',
    group: 'Invoice Properties'
  },
  {
    name: 'Net Amount',
    type: 'TextBox',
    value: '${invoiceData.netAmount}',
    group: 'Invoice Properties'
  },
  {
    name: 'Tax Amount',
    type: 'TextBox',
    value: '${invoiceData.taxAmount}',
    group: 'Invoice Properties'
  },
  {
    name: 'Gross Amount',
    type: 'TextBox',
    value: '${invoiceData.grossAmount}',
    group: 'Invoice Properties'
  },
  {
    name: 'Total Amount',
    type: 'TextBox',
    value: '${invoiceData.totalAmount}',
    group: 'Invoice Properties'
  },
  {
    name: 'Amount in words',
    type: 'TextBox',
    value: '${invoiceData.amountInWords}',
    group: 'Invoice Properties'
  },
  {
    name: 'Amount in words Alt',
    type: 'TextBox',
    value: '${invoiceData.amountInWordsAlt}',
    group: 'Invoice Properties'
  },
  {
    name: 'Date of supply',
    type: 'TextBox',
    value: "${formatedDate(invoiceData.dateOfSupply, 'YYYY-MM-DD')}",
    group: 'Invoice Properties'
  },
  {
    name: 'Payment Term',
    type: 'TextBox',
    value: '${invoiceData.paymentTerm}',
    group: 'Invoice Properties'
  },
  {
    name: 'Sent Date',
    type: 'TextBox',
    value: "${formatedDate(invoiceData.sentDate, 'YYYY-MM-DD')}",
    group: 'Invoice Properties'
  },
  {
    name: 'Payment Due Date',
    type: 'TextBox',
    value: "${formatedDate(invoiceData.paymentDueDate, 'YYYY-MM-DD')}",
    group: 'Invoice Properties'
  },
  {
    name: 'Payment Type',
    type: 'TextBox',
    value: '${invoiceData.paymentType}',
    group: 'Invoice Properties'
  },
  {
    name: 'Paid Amount',
    type: 'TextBox',
    value: '${invoiceData.paidAmount}',
    group: 'Invoice Properties'
  },
  {
    name: 'Payment Date',
    type: 'TextBox',
    value: "${formatedDate(invoiceData.paymentDate, 'YYYY-MM-DD')}",
    group: 'Invoice Properties'
  },
  {
    name: 'Status',
    type: 'TextBox',
    value: '${invoiceData.status}',
    group: 'Invoice Properties'
  },
  {
    name: 'Bank Account No',
    type: 'TextBox',
    value: '${bankData.bankAccountNo}',
    group: 'Invoice Properties'
  },
  {
    name: 'Account Holder Name',
    type: 'TextBox',
    value: '${bankData.bankAccountHolderName}',
    group: 'Invoice Properties'
  },
  {
    name: 'Bank Name',
    type: 'TextBox',
    value: '${bankData.bankName}',
    group: 'Invoice Properties'
  },
  {
    name: 'Bank Swift',
    type: 'TextBox',
    value: '${bankData.bankSwift}',
    group: 'Invoice Properties'
  },
  {
    name: 'Bank Currency',
    type: 'TextBox',
    value: '${bankData.bankCurrency}',
    group: 'Invoice Properties'
  },
  {
    name: 'Bank Address',
    type: 'TextBox',
    value: '${bankData.bankAddress}',
    group: 'Invoice Properties'
  },
  {
    name: 'Notes',
    type: 'TextBox',
    value: '${invoiceData.notes}',
    group: 'Invoice Properties'
  },
  {
    name: 'Sales Person Name',
    type: 'TextBox',
    value: '${invoiceData.salesPersonData.name}',
    group: 'Invoice Properties'
  },
  {
    name: 'Sales Person Mail',
    type: 'TextBox',
    value: '${invoiceData.salesPersonData.email}',
    group: 'Invoice Properties'
  },
  {
    name: 'Sales Person Phone',
    type: 'TextBox',
    value: '${invoiceData.salesPersonData.phone}',
    group: 'Invoice Properties'
  },
  {
    name: 'Qr Code',
    type: 'Image',
    value:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIQAAACECAYAAABRRIOnAAAAAklEQVR4AewaftIAAAOOSURBVO3BQa7cVgADweaD7n/ljhdZcCVAGP2xE7Mq/sLMvw4z5TBTDjPlMFMOM+UwUw4z5TBTDjPlMFMOM+UwUw4z5TBTDjPl4kNJ+CaVJ5LwhMoTSWgqLQnfpPKJw0w5zJTDTLl4mcqbkvBNSWgqLQlN5QmVNyXhTYeZcpgph5ly8cOS8ITKE0l4k0pLQlNpSWgqTyThCZWfdJgph5lymCkXfxmVO0l4QuX/5DBTDjPlMFMu/nJJuKPyNznMlMNMOcyUix+m8idTaUloSXhC5QmVP8lhphxmymGmXLwsCb+TSkvCnSQ0lZaEptKS8EQS/mSHmXKYKYeZcvEhlT+ZSktCU3kiCU+o/JccZsphphxmysWHktBUWhLepNJU7iShqdxJwhMqd5LwJpWfdJgph5lymCnxF16UhDsqd5LQVN6UhCdU7iShqdxJQlN5IglN5U2HmXKYKYeZcvEylSeScCcJT6i0JDSVloSm0pJwR+VOEp5IQlO5k4Sm8onDTDnMlMNMufhQEu6otCTcUXkiCXdUWhKayieScEflCZU7Ki0JbzrMlMNMOcyUi5ep3FF5IglNpan8JJWWhCeS0FRaEppKS8I3HWbKYaYcZsrFD0tCU2lJaCpNpSXhEyotCXdUmkpLQlO5k4Sm0pLQVFoSmsqbDjPlMFMOM+XiD5eEJ1SeUGlJaEn4RBLuJOETSWgqnzjMlMNMOcyUiy9LQlNpSWgqLQlvSsIdlZaEptKS0FRaEu6o3FFpSXjTYaYcZsphplz8ZkloKi0JTaUl4U4SmsodlZaEO0m4k4RPJKGpNJU3HWbKYaYcZkr8hf+wJDyh8okk3FF5Igl3VL7pMFMOM+UwUy4+lIRvUmkqLQlNpSXhjsodlZaEO0loKndUWhKeUPnEYaYcZsphply8TOVNSbiThKbSknBH5U4SmsoTKk8koancScKbDjPlMFMOM+XihyXhCZU3qbQkPKHSknAnCZ9QaUn4psNMOcyUw0y5+J9JQlNpKi0J36TSktCS8DsdZsphphxmysVfTqUl4QmVloSmckelJeGOSkvCmw4z5TBTDjPl4oep/CSVloQnknBH5U4SmkpLwidUvukwUw4z5TBTLl6WhG9Kwp0kNJU7Ki0JTaWptCS8KQnfdJgph5lymCnxF2b+dZgph5lymCmHmXKYKYeZcpgph5lymCmHmXKYKYeZcpgph5lymCn/AN4phS+q2U+ZAAAAAElFTkSuQmCC',
    group: 'Invoice Properties'
  }
]

export const invoiceItemProperties = [
  {
    name: 'Invoice Item Row',
    type: 'Container',
    group: 'Invoice Item Properties',
    itemRef: 'invoice-ref'
  },
  {
    name: 'Type',
    type: 'TextBox',
    value: '${invoiceItem.type}',
    group: 'Invoice Item Properties'
  },
  {
    name: 'Product',
    type: 'TextBox',
    value: '${invoiceItem.product}',
    group: 'Invoice Item Properties'
  },
  {
    name: 'Product Alt',
    type: 'TextBox',
    value: '${invoiceItem.productAlt}',
    group: 'Invoice Item Properties'
  },
  {
    name: 'Description',
    type: 'TextBox',
    value: '${invoiceItem.description}',
    group: 'Invoice Item Properties'
  },
  {
    name: 'Description Alt',
    type: 'TextBox',
    value: '${invoiceItem.descriptionAlt}',
    group: 'Invoice Item Properties'
  },
  {
    name: 'Quantity',
    type: 'TextBox',
    value: '${invoiceItem.quantity}',
    group: 'Invoice Item Properties'
  },
  {
    name: 'Unit',
    type: 'TextBox',
    value: '${invoiceItem.unit}',
    group: 'Invoice Item Properties'
  },
  {
    name: 'Unit Price',
    type: 'TextBox',
    value: '${invoiceItem.unitPrice}',
    group: 'Invoice Item Properties'
  },
  {
    name: 'Amount',
    type: 'TextBox',
    value: '${invoiceItem.amount}',
    group: 'Invoice Item Properties'
  },
  {
    name: 'Discount',
    type: 'TextBox',
    value: '${invoiceItem.discount}',
    group: 'Invoice Item Properties'
  },
  {
    name: 'Discount Format',
    type: 'TextBox',
    value: '${invoiceItem.discountFormat}',
    group: 'Invoice Item Properties'
  },
  {
    name: 'Discount Amount',
    type: 'TextBox',
    value: '${invoiceItem.discountAmount}',
    group: 'Invoice Item Properties'
  },
  {
    name: 'Charge',
    type: 'TextBox',
    value: '${invoiceItem.charge}',
    group: 'Invoice Item Properties'
  },
  {
    name: 'Charge Format',
    type: 'TextBox',
    value: '${invoiceItem.chargeFormat}',
    group: 'Invoice Item Properties'
  },
  {
    name: 'Charge Amount',
    type: 'TextBox',
    value: '${invoiceItem.chargeAmount}',
    group: 'Invoice Item Properties'
  },
  {
    name: 'Net Amount',
    type: 'TextBox',
    value: '${invoiceItem.netAmount}',
    group: 'Invoice Item Properties'
  },
  {
    name: 'Tax',
    type: 'TextBox',
    value: '${invoiceItem.tax}',
    group: 'Invoice Item Properties'
  },
  {
    name: 'Tax Format',
    type: 'TextBox',
    value: '${invoiceItem.taxFormat}',
    group: 'Invoice Item Properties'
  },
  {
    name: 'Tax Amount',
    type: 'TextBox',
    value: '${invoiceItem.taxAmount}',
    group: 'Invoice Item Properties'
  },
  {
    name: 'Tax Type',
    type: 'TextBox',
    value: '${invoiceItem.taxType}',
    group: 'Invoice Item Properties'
  },
  {
    name: 'Gross Amount',
    type: 'TextBox',
    value: '${invoiceItem.grossAmount}',
    group: 'Invoice Item Properties'
  }
]

export const invoiceDocumentChargeProperties = [
  {
    name: 'Invoice Document Charge Row',
    type: 'Container',
    group: 'Invoice Document Charge Properties',
    itemRef: 'invoice-document-charge-ref'
  },
  {
    name: 'Type',
    type: 'TextBox',
    value: '${documentChargeItem.type}',
    group: 'Invoice Document Charge Properties'
  },
  {
    name: 'category',
    type: 'TextBox',
    value: '${documentChargeItem.category}',
    group: 'Invoice Document Charge Properties'
  },
  {
    name: 'amountFormat',
    type: 'TextBox',
    value: '${documentChargeItem.amountFormat}',
    group: 'Invoice Document Charge Properties'
  },
  {
    name: 'amount',
    type: 'TextBox',
    value: '${documentChargeItem.amount}',
    group: 'Invoice Document Charge Properties'
  },
  {
    name: 'documentAmount',
    type: 'TextBox',
    value: '${documentChargeItem.documentAmount}',
    group: 'Invoice Document Charge Properties'
  }
]

export const reporterProperties = [
  {
    name: 'Reporter No',
    type: 'TextBox',
    value: '${reporterData.employeeNo}',
    group: 'Employee Properties'
  },
  {
    name: 'Reporter Name',
    type: 'TextBox',
    value: '${reporterData.name}',
    group: 'Reporter Properties'
  },
  {
    name: 'Reporter Email',
    type: 'TextBox',
    value: '${reporterData.email}',
    group: 'Reporter Properties'
  },
  {
    name: 'Reporter Phone',
    type: 'TextBox',
    value: '${reporterData.phone}',
    group: 'Reporter Properties'
  },
  {
    name: 'Reporter DOB',
    type: 'TextBox',
    value: '${reporterData.dob}',
    group: 'Reporter Properties'
  },
  {
    name: 'Reporter Social Id',
    type: 'TextBox',
    value: '${reporterData.socialId}',
    group: 'Reporter Properties'
  },
  {
    name: 'Reporter Street',
    type: 'TextBox',
    value: '${reporterData.street}',
    group: 'Reporter Properties'
  },
  {
    name: 'Reporter City',
    type: 'TextBox',
    value: '${reporterData.city}',
    group: 'Reporter Properties'
  },
  {
    name: 'Reporter State',
    type: 'TextBox',
    value: '${reporterData.stateName}',
    group: 'Reporter Properties'
  },
  {
    name: 'Reporter Country',
    type: 'TextBox',
    value: '${reporterData.countryName}',
    group: 'Reporter Properties'
  },
  {
    name: 'Reporter Postalcode',
    type: 'TextBox',
    value: '${reporterData.postalCode}',
    group: 'Reporter Properties'
  },
  {
    name: 'Reporter BankName',
    type: 'TextBox',
    value: '${reporterData.bankName}',
    group: 'Reporter Properties'
  },
  {
    name: 'Reporter Bank Acc No',
    type: 'TextBox',
    value: '${reporterData.bankAccountNo}',
    group: 'Reporter Properties'
  },
  {
    name: 'Reporter BankSwift',
    type: 'TextBox',
    value: '${reporterData.bankSwift}',
    group: 'Reporter Properties'
  },
  {
    name: 'Reporter Currency',
    type: 'TextBox',
    value: '${reporterData.currency}',
    group: 'Reporter Properties'
  }
]

export const timeSheetProperties = [
  {
    name: 'Start Date',
    type: 'TextBox',
    value: "${formatedDate(timesheetData.startDate, 'DD-MMM-YYYY')}",
    group: 'Timesheet Properties'
  },
  {
    name: 'End Date',
    type: 'TextBox',
    value: "${formatedDate(timesheetData.endDate, 'DD-MMM-YYYY')}",
    group: 'Timesheet Properties'
  },

  {
    name: 'Projects',
    type: 'Container',
    group: 'Timesheet Properties',
    itemRef: 'timesheets-projects-ref'
  },
  {
    name: 'Project Name',
    type: 'TextBox',
    value: '${project.name}',
    group: 'Timesheet Properties'
  },
  {
    name: 'Dates',
    type: 'TextBox',
    value: "${formatedDate(dateData.date, 'DD')}",
    group: 'Timesheet Properties',
    itemRef: 'timesheet-dates-ref'
  },
  {
    name: 'Times',
    type: 'TextBox',
    value: '${getTimes(dateData.dateNumber, project)}',
    group: 'Timesheet Properties',
    itemRef: 'timesheet-times-ref'
  },
  {
    name: 'Weeks',
    type: 'Container',
    group: 'Timesheet Properties',
    itemRef: 'timesheet-weeks-ref'
  },
  {
    name: 'Week start and end ',
    type: 'TextBox',
    value:
      "${formatedDate(weekData.startWeekDate, 'DD')} - ${formatedDate(weekData.endWeekDate, 'DD MMM YYYY')}",
    group: 'Timesheet Properties'
  },
  {
    name: 'Week Total Hours ',
    type: 'TextBox',
    value: '${convertMinutesToHours(weekData.totalMinutes)}',
    group: 'Timesheet Properties'
  },
  {
    name: 'Week Status ',
    type: 'TextBox',
    value: '${weekData.status}',
    group: 'Timesheet Properties'
  },

  {
    name: 'Time Entries',
    type: 'Container',
    group: 'Timesheet Properties',
    itemRef: 'timesheet-entries-ref'
  },

  {
    name: 'Total Hours ',
    type: 'TextBox',
    value: '${convertMinutesToHours(timesheetData.totalMinutes)}',
    group: 'Timesheet Properties'
  },
  {
    name: 'Billable Days',
    type: 'TextBox',
    value: '${toDecimal((timesheetData.totalMinutes/60)/8, 2)}',
    group: 'Timesheet Properties'
  }
]

export const orderProperties = [
  {
    name: 'Order No',
    type: 'TextBox',
    value: '${orderData.orderNo}',
    group: 'Order Properties'
  },
  {
    name: 'Order Type',
    type: 'TextBox',
    value: '${orderData.orderType}',
    group: 'Order Properties'
  },
  {
    name: 'Order Date',
    type: 'TextBox',
    value: '${orderData.orderDate}',
    group: 'Order Properties'
  },
  {
    name: 'Customer/Supplier Name',
    type: 'TextBox',
    value: '${clientData.name}',
    group: 'Order Properties'
  },
  {
    name: 'Currency',
    type: 'TextBox',
    value: '${orderData.currency}',
    group: 'Order Properties'
  },
  {
    name: 'Exchange Rate',
    type: 'TextBox',
    value: '${orderData.exchangeRate}',
    group: 'Order Properties'
  },
  {
    name: 'Po/Ref No',
    type: 'TextBox',
    value: '${orderData.poNo}',
    group: 'Order Properties'
  },
  {
    name: 'Po/Ref Date',
    type: 'TextBox',
    value: '${orderData.poDate}',
    group: 'Order Properties'
  },
  {
    name: 'Remarks',
    type: 'TextBox',
    value: '${orderData.remarks}',
    group: 'Order Properties'
  },
  {
    name: 'Order Address',
    type: 'TextBox',
    value: '${orderData.orderAddress}',
    group: 'Order Properties'
  },
  {
    name: 'Delivery Address',
    type: 'TextBox',
    value: '${orderData.deliveryAddress}',
    group: 'Order Properties'
  },
  {
    name: 'Pay Term in days',
    type: 'TextBox',
    value: '${orderData.payTerm}',
    group: 'Order Properties'
  },
  {
    name: 'Pay Term',
    type: 'TextBox',
    value: '${orderData.payTermOption}',
    group: 'Order Properties'
  },
  {
    name: 'Sales Person Name',
    type: 'TextBox',
    value: '${orderData.salesPersonData.name}',
    group: 'Order Properties'
  },
  {
    name: 'Sales Person Mail',
    type: 'TextBox',
    value: '${orderData.salesPersonData.email}',
    group: 'Order Properties'
  },
  {
    name: 'Sales Person Phone',
    type: 'TextBox',
    value: '${orderData.salesPersonData.phone}',
    group: 'Order Properties'
  },
  {
    name: 'Contact Person',
    type: 'TextBox',
    value: '${orderData.contactPerson}',
    group: 'Order Properties'
  },
  {
    name: 'Tax',
    type: 'TextBox',
    value: '${orderData.tax}',
    group: 'Order Properties'
  }
]

export const orderItemProperties = [
  {
    name: 'Order Item Row',
    type: 'Container',
    group: 'Order Item Properties',
    itemRef: 'order-ref'
  },
  {
    name: 'Position',
    type: 'TextBox',
    value: '${orderItem.position}',
    group: 'Order Item Properties'
  },
  {
    name: 'Material Code',
    type: 'TextBox',
    value: '${orderItem.materialCode}',
    group: 'Order Item Properties'
  },
  {
    name: 'Material Description',
    type: 'TextBox',
    value: '${orderItem.materialDescription}',
    group: 'Order Item Properties'
  },
  {
    name: 'Unit',
    type: 'TextBox',
    value: '${orderItem.unit}',
    group: 'Order Item Properties'
  },
  {
    name: 'Ordered Quantity',
    type: 'TextBox',
    value: '${orderItem.orderedQuantity}',
    group: 'Order Item Properties'
  },
  {
    name: 'Requested Date',
    type: 'TextBox',
    value: '${orderItem.requestedDate}',
    group: 'Order Item Properties'
  },
  {
    name: 'Price',
    type: 'TextBox',
    value: '${orderItem.price}',
    group: 'Order Item Properties'
  },
  {
    name: 'Amount',
    type: 'TextBox',
    value: '${orderItem.amount}',
    group: 'Order Item Properties'
  },
  {
    name: 'Discount Type',
    type: 'TextBox',
    value: '${orderItem.discountType}',
    group: 'Order Item Properties'
  },
  {
    name: 'Discount',
    type: 'TextBox',
    value: '${orderItem.discount}',
    group: 'Order Item Properties'
  },

  {
    name: 'Discount Value',
    type: 'TextBox',
    value: '${orderItem.discountValue}',
    group: 'Order Item Properties'
  },
  {
    name: 'Charge Type',
    type: 'TextBox',
    value: '${orderItem.chargeType}',
    group: 'Order Item Properties'
  },
  {
    name: 'Charge',
    type: 'TextBox',
    value: '${orderItem.charge}',
    group: 'Order Item Properties'
  },
  {
    name: 'Charge Value',
    type: 'TextBox',
    value: '${orderItem.chargeValue}',
    group: 'Order Item Properties'
  },
  {
    name: 'Net Amount',
    type: 'TextBox',
    value: '${orderItem.netAmount}',
    group: 'Order Item Properties'
  },
  {
    name: 'Delivery Status',
    type: 'TextBox',
    value: '${orderItem.deliveryStatus}',
    group: 'Order Item Properties'
  },
  {
    name: 'Invoice Status',
    type: 'TextBox',
    value: '${orderItem.invoiceStatus}',
    group: 'Order Item Properties'
  },
  {
    name: 'Delivered Quantity',
    type: 'TextBox',
    value: '${orderItem.deliveredQuantity}',
    group: 'Order Item Properties'
  },
  {
    name: 'Invoiced Quantity',
    type: 'TextBox',
    value: '${orderItem.invoicedQuantity}',
    group: 'Order Item Properties'
  },
  {
    name: 'To Be Delivered Quantity',
    type: 'TextBox',
    value: '${orderItem.toBeDeliveredQuantity}',
    group: 'Order Item Properties'
  },
  {
    name: 'To Be Invoiced Quantity',
    type: 'TextBox',
    value: '${orderItem.toBeInvoicedQuantity}',
    group: 'Order Item Properties'
  }
]

export const offerProperties = [
  {
    name: 'Offer No',
    type: 'TextBox',
    value: '${offerData.offerNo}',
    group: 'Offer Properties'
  },
  {
    name: 'Type',
    type: 'TextBox',
    value: '${offerData.offerType}',
    group: 'Offer Properties'
  },
  {
    name: 'Quotation No',
    type: 'TextBox',
    value: '${offerData.quotationNo}',
    group: 'Offer Properties'
  },
  {
    name: 'Client Name',
    type: 'TextBox',
    value: '${offerData.clientName}',
    group: 'Offer Properties'
  },
  {
    name: 'Contact Person',
    type: 'TextBox',
    value: '${offerData.contactPerson}',
    group: 'Offer Properties'
  },
  {
    name: 'Street',
    type: 'TextBox',
    value: '${offerData.street}',
    group: 'Offer Properties'
  },
  {
    name: 'City',
    type: 'TextBox',
    value: '${offerData.city}',
    group: 'Offer Properties'
  },
  {
    name: 'State',
    type: 'TextBox',
    value: '${offerData.state}',
    group: 'Offer Properties'
  },
  {
    name: 'Postal Code',
    type: 'TextBox',
    value: '${offerData.postalCode}',
    group: 'Offer Properties'
  },
  {
    name: 'Country',
    type: 'TextBox',
    value: '${offerData.country}',
    group: 'Offer Properties'
  },
  {
    name: 'Phone',
    type: 'TextBox',
    value: '${offerData.phone}',
    group: 'Offer Properties'
  },
  {
    name: 'Email',
    type: 'TextBox',
    value: '${offerData.email}',
    group: 'Offer Properties'
  },
  {
    name: 'POLPOD',
    type: 'TextBox',
    value: '${offerData.POLPOD}',
    group: 'Offer Properties'
  },
  {
    name: 'Actual Weight',
    type: 'TextBox',
    value: '${offerData.actualWeight}',
    group: 'Offer Properties'
  },
  {
    name: 'Chargeable Weight',
    type: 'TextBox',
    value: '${offerData.chargeableWeight}',
    group: 'Offer Properties'
  },
  {
    name: 'Requested Date',
    type: 'TextBox',
    value: "${formatedDate(offerData.requestedDate, 'YYYY-MM-DD')}",
    group: 'Offer Properties'
  },
  {
    name: 'Completed Date',
    type: 'TextBox',
    value: "${formatedDate(offerData.completedDate, 'YYYY-MM-DD')}",
    group: 'Offer Properties'
  },
  {
    name: 'Operations',
    type: 'TextBox',
    value: '${offerData.operations}',
    group: 'Offer Properties'
  },
  {
    name: 'Sales Person',
    type: 'TextBox',
    value: '${offerData.salesPerson}',
    group: 'Offer Properties'
  },
  {
    name: 'Reference',
    type: 'TextBox',
    value: '${offerData.reference}',
    group: 'Offer Properties'
  },
  {
    name: 'Special Instruction',
    type: 'TextBox',
    value: '${offerData.specialInstruction}',
    group: 'Offer Properties'
  },
  {
    name: 'Comments',
    type: 'TextBox',
    value: '${offerData.comments}',
    group: 'Offer Properties'
  },
  {
    name: 'Statement',
    type: 'TextBox',
    value: '${offerData.statement}',
    group: 'Offer Properties'
  },
  {
    name: 'Status',
    type: 'TextBox',
    value: '${offerData.status}',
    group: 'Offer Properties'
  }
]

export const bookingProperties = [
  {
    name: 'Booking No',
    type: 'TextBox',
    value: '${bookingData.bookingNo}',
    group: 'Booking Properties'
  },
  {
    name: 'Type',
    type: 'TextBox',
    value: '${bookingData.type}',
    group: 'Booking Properties'
  },
  {
    name: 'Quotation No',
    type: 'TextBox',
    value: '${bookingData.quotationNo}',
    group: 'Booking Properties'
  },
  {
    name: 'Client Name',
    type: 'TextBox',
    value: '${bookingData.clientName}',
    group: 'Booking Properties'
  },
  {
    name: 'Contact Person',
    type: 'TextBox',
    value: '${bookingData.contactPerson}',
    group: 'Booking Properties'
  },
  {
    name: 'Street',
    type: 'TextBox',
    value: '${bookingData.street}',
    group: 'Booking Properties'
  },
  {
    name: 'City',
    type: 'TextBox',
    value: '${bookingData.city}',
    group: 'Booking Properties'
  },
  {
    name: 'State',
    type: 'TextBox',
    value: '${bookingData.state}',
    group: 'Booking Properties'
  },
  {
    name: 'Postal Code',
    type: 'TextBox',
    value: '${bookingData.postalCode}',
    group: 'Booking Properties'
  },
  {
    name: 'Country',
    type: 'TextBox',
    value: '${bookingData.country}',
    group: 'Booking Properties'
  },
  {
    name: 'Phone',
    type: 'TextBox',
    value: '${bookingData.phone}',
    group: 'Booking Properties'
  },
  {
    name: 'Email',
    type: 'TextBox',
    value: '${bookingData.email}',
    group: 'Booking Properties'
  },
  {
    name: 'POLPOD',
    type: 'TextBox',
    value: '${bookingData.POLPOD}',
    group: 'Booking Properties'
  },
  {
    name: 'Actual Weight',
    type: 'TextBox',
    value: '${bookingData.actualWeight}',
    group: 'Booking Properties'
  },
  {
    name: 'Chargeable Weight',
    type: 'TextBox',
    value: '${bookingData.chargeableWeight}',
    group: 'Booking Properties'
  },
  {
    name: 'Requested Date',
    type: 'TextBox',
    value: "${formatedDate(bookingData.requestedDate, 'YYYY-MM-DD')}",
    group: 'Booking Properties'
  },
  {
    name: 'Completed Date',
    type: 'TextBox',
    value: "${formatedDate(bookingData.completedDate, 'YYYY-MM-DD')}",
    group: 'Booking Properties'
  },
  {
    name: 'Operations',
    type: 'TextBox',
    value: '${bookingData.operations}',
    group: 'Booking Properties'
  },
  {
    name: 'Sales Person',
    type: 'TextBox',
    value: '${bookingData.salesPerson}',
    group: 'Booking Properties'
  },
  {
    name: 'Reference',
    type: 'TextBox',
    value: '${bookingData.reference}',
    group: 'Booking Properties'
  },
  {
    name: 'Special Instruction',
    type: 'TextBox',
    value: '${bookingData.specialInstruction}',
    group: 'Booking Properties'
  },
  {
    name: 'Comments',
    type: 'TextBox',
    value: '${bookingData.comments}',
    group: 'Booking Properties'
  },
  {
    name: 'Statement',
    type: 'TextBox',
    value: '${bookingData.statement}',
    group: 'Booking Properties'
  },
  {
    name: 'Status',
    type: 'TextBox',
    value: '${bookingData.status}',
    group: 'Booking Properties'
  }
]

export const jobCreationProperties = [
  {
    name: 'Job Creation No',
    type: 'TextBox',
    value: '${jobCreationData.jobCreationNo}',
    group: 'Job Creation Properties'
  },
  {
    name: 'Type',
    type: 'TextBox',
    value: '${jobCreationData.type}',
    group: 'Job Creation Properties'
  },
  {
    name: 'Forwarder',
    type: 'TextBox',
    value: '${jobCreationData.forwarder}',
    group: 'Job Creation Properties'
  },
  {
    name: 'Creation Date',
    type: 'TextBox',
    value: "${formatedDate(bookingData.creationDate, 'YYYY-MM-DD')}",
    group: 'Job Creation Properties'
  },
  {
    name: 'Tos',
    type: 'TextBox',
    value: '${jobCreationData.tos}',
    group: 'Job Creation Properties'
  },
  {
    name: 'Flight No',
    type: 'TextBox',
    value: '${jobCreationData.flightNo}',
    group: 'Job Creation Properties'
  },
  {
    name: 'MAWB No',
    type: 'TextBox',
    value: '${jobCreationData.MAWBNo}',
    group: 'Job Creation Properties'
  },
  {
    name: 'POLPOD',
    type: 'TextBox',
    value: '${jobCreationData.POLPOD}',
    group: 'Job Creation Properties'
  },
  {
    name: 'Airline',
    type: 'TextBox',
    value: '${jobCreationData.airline}',
    group: 'Job Creation Properties'
  },
  {
    name: 'Shipper',
    type: 'TextBox',
    value: '${jobCreationData.shipper}',
    group: 'Job Creation Properties'
  },
  {
    name: 'Consignee',
    type: 'TextBox',
    value: '${jobCreationData.consignee}',
    group: 'Job Creation Properties'
  },
  {
    name: 'Commodity',
    type: 'TextBox',
    value: '${jobCreationData.commodity}',
    group: 'Job Creation Properties'
  },
  {
    name: 'ID No',
    type: 'TextBox',
    value: '${jobCreationData.idNo}',
    group: 'Job Creation Properties'
  },
  {
    name: 'Issue Date',
    type: 'TextBox',
    value: "${formatedDate(bookingData.issueDate, 'YYYY-MM-DD')}",
    group: 'Job Creation Properties'
  },
  {
    name: 'Vessel',
    type: 'TextBox',
    value: '${jobCreationData.vessel}',
    group: 'Job Creation Properties'
  },
  {
    name: 'Vessel Code',
    type: 'TextBox',
    value: '${jobCreationData.vesselCode}',
    group: 'Job Creation Properties'
  },
  {
    name: 'Voyage No',
    type: 'TextBox',
    value: '${jobCreationData.voyageNo}',
    group: 'Job Creation Properties'
  },
  {
    name: 'Departure Date',
    type: 'TextBox',
    value: "${formatedDate(bookingData.departureDate, 'YYYY-MM-DD')}",
    group: 'Job Creation Properties'
  },
  {
    name: 'Arrival Date',
    type: 'TextBox',
    value: "${formatedDate(bookingData.arrivalDate, 'YYYY-MM-DD')}",
    group: 'Job Creation Properties'
  },
  {
    name: 'Client Name',
    type: 'TextBox',
    value: '${jobCreationData.clientName}',
    group: 'Job Creation Properties'
  },
  {
    name: 'Phone',
    type: 'TextBox',
    value: '${jobCreationData.phone}',
    group: 'Job Creation Properties'
  },
  {
    name: 'Email',
    type: 'TextBox',
    value: '${jobCreationData.email}',
    group: 'Job Creation Properties'
  },
  {
    name: 'Operations',
    type: 'TextBox',
    value: '${jobCreationData.operations}',
    group: 'Job Creation Properties'
  },
  {
    name: 'Sales Person',
    type: 'TextBox',
    value: '${jobCreationData.salesPerson}',
    group: 'Job Creation Properties'
  },
  {
    name: 'Booking No',
    type: 'TextBox',
    value: '${jobCreationData.bookingNo}',
    group: 'Job Creation Properties'
  },
  {
    name: 'Street',
    type: 'TextBox',
    value: '${jobCreationData.address.street}',
    group: 'Job Creation Properties'
  },
  {
    name: 'City',
    type: 'TextBox',
    value: '${jobCreationData.address.city}',
    group: 'Job Creation Properties'
  },
  {
    name: 'State',
    type: 'TextBox',
    value: '${jobCreationData.address.state}',
    group: 'Job Creation Properties'
  },
  {
    name: 'Postal Code',
    type: 'TextBox',
    value: '${jobCreationData.address.postalCode}',
    group: 'Job Creation Properties'
  },
  {
    name: 'Country',
    type: 'TextBox',
    value: '${jobCreationData.address.country}',
    group: 'Job Creation Properties'
  },
  {
    name: 'Status',
    type: 'TextBox',
    value: '${jobCreationData.status}',
    group: 'Job Creation Properties'
  }
]

export const packageListProperties = [
  {
    name: 'Package List Row',
    type: 'Container',
    group: 'Package List Properties',
    itemRef: 'package-list-ref'
  },
  {
    name: 'Position',
    type: 'TextBox',
    value: '${packageData.position}',
    group: 'Package List Properties'
  },
  {
    name: 'Package Type',
    type: 'TextBox',
    value: '${packageData.packageType}',
    group: 'Package List Properties'
  },
  {
    name: 'Length',
    type: 'TextBox',
    value: '${packageData.length}',
    group: 'Package List Properties'
  },
  {
    name: 'Breadth',
    type: 'TextBox',
    value: '${packageData.breadth}',
    group: 'Package List Properties'
  },
  {
    name: 'Height',
    type: 'TextBox',
    value: '${packageData.height}',
    group: 'Package List Properties'
  },
  {
    name: 'Unit',
    type: 'TextBox',
    value: '${packageData.unit}',
    group: 'Package List Properties'
  },
  {
    name: 'Weight',
    type: 'TextBox',
    value: '${packageData.weight}',
    group: 'Package List Properties'
  },
  {
    name: 'Weight Unit',
    type: 'TextBox',
    value: '${packageData.weightUnit}',
    group: 'Package List Properties'
  },
  {
    name: 'Volume',
    type: 'TextBox',
    value: '${packageData.volume}',
    group: 'Package List Properties'
  },
  {
    name: 'Volume Unit',
    type: 'TextBox',
    value: '${packageData.volumeUnit}',
    group: 'Package List Properties'
  }
]

export const packageItemProperties = [
  {
    name: 'Package Item Row',
    type: 'Container',
    group: 'Package Item Properties',
    itemRef: 'package-item-ref'
  },
  {
    name: 'Description',
    type: 'TextBox',
    value: '${packageItem.description}',
    group: 'Package Item Properties'
  },
  {
    name: 'Quantity',
    type: 'TextBox',
    value: '${packageItem.quantity}',
    group: 'Package Item Properties'
  },
  {
    name: 'Unit',
    type: 'TextBox',
    value: '${packageItem.unit}',
    group: 'Package Item Properties'
  },
  {
    name: 'Price',
    type: 'TextBox',
    value: '${packageItem.price}',
    group: 'Package Item Properties'
  },
  {
    name: 'Amount',
    type: 'TextBox',
    value: '${packageItem.amount}',
    group: 'Package Item Properties'
  },
  {
    name: 'Net Amount',
    type: 'TextBox',
    value: '${packageItem.netAmount}',
    group: 'Package Item Properties'
  },
  {
    name: 'Currency',
    type: 'TextBox',
    value: '${packageItem.currency}',
    group: 'Package Item Properties'
  },
  {
    name: 'Charge Type',
    type: 'TextBox',
    value: '${packageItem.chargeType}',
    group: 'Package Item Properties'
  },
  {
    name: 'Charge',
    type: 'TextBox',
    value: '${packageItem.charge}',
    group: 'Package Item Properties'
  },
  {
    name: 'Charge Value',
    type: 'TextBox',
    value: '${packageItem.chargeValue}',
    group: 'Package Item Properties'
  },

  {
    name: 'Tax Type',
    type: 'TextBox',
    value: '${packageItem.taxType}',
    group: 'Package Item Properties'
  },
  {
    name: 'Tax',
    type: 'TextBox',
    value: '${packageItem.tax}',
    group: 'Package Item Properties'
  },
  {
    name: 'Tax Amount',
    type: 'TextBox',
    value: '${packageItem.taxAmount}',
    group: 'Package Item Properties'
  }
]

export const directReceiptProperties = [
  {
    name: 'Receipt No',
    type: 'TextBox',
    value: '${receiptData.receiptNo}',
    group: 'Direct Receipt Properties'
  },
  {
    name: 'Date',
    type: 'TextBox',
    value: "${formatedDate(receiptData.date, 'YYYY-MM-DD')}",
    group: 'Direct Receipt Properties'
  },
  {
    name: 'Description',
    type: 'TextBox',
    value: '${receiptData.description}',
    group: 'Direct Receipt Properties'
  },
  {
    name: 'Tax',
    type: 'TextBox',
    value: '${receiptData.tax}',
    group: 'Direct Receipt Properties'
  },
  {
    name: 'Tax Format',
    type: 'TextBox',
    value: '${receiptData.taxFormat}',
    group: 'Direct Receipt Properties'
  },
  {
    name: 'Tax Amount',
    type: 'TextBox',
    value: '${receiptData.taxAmount}',
    group: 'Direct Receipt Properties'
  },
  {
    name: 'Total Amount',
    type: 'TextBox',
    value: '${receiptData.totalAmount}',
    group: 'Direct Receipt Properties'
  },
  {
    name: 'Currency',
    type: 'TextBox',
    value: '${receiptData.currency}',
    group: 'Direct Receipt Properties'
  },
  {
    name: 'Reference No',
    type: 'TextBox',
    value: '${receiptData.entityRef}',
    group: 'Direct Receipt Properties'
  },
  {
    name: 'Transaction Type',
    type: 'TextBox',
    value: '${receiptData.transactionType}',
    group: 'Direct Receipt Properties'
  },
  {
    name: 'Cheque No',
    type: 'TextBox',
    value: '${receiptData.chequeNo}',
    group: 'Direct Receipt Properties'
  },
  {
    name: 'Qr Code',
    type: 'Image',
    value:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIQAAACECAYAAABRRIOnAAAAAklEQVR4AewaftIAAAOOSURBVO3BQa7cVgADweaD7n/ljhdZcCVAGP2xE7Mq/sLMvw4z5TBTDjPlMFMOM+UwUw4z5TBTDjPlMFMOM+UwUw4z5TBTDjPl4kNJ+CaVJ5LwhMoTSWgqLQnfpPKJw0w5zJTDTLl4mcqbkvBNSWgqLQlN5QmVNyXhTYeZcpgph5ly8cOS8ITKE0l4k0pLQlNpSWgqTyThCZWfdJgph5lymCkXfxmVO0l4QuX/5DBTDjPlMFMu/nJJuKPyNznMlMNMOcyUix+m8idTaUloSXhC5QmVP8lhphxmymGmXLwsCb+TSkvCnSQ0lZaEptKS8EQS/mSHmXKYKYeZcvEhlT+ZSktCU3kiCU+o/JccZsphphxmysWHktBUWhLepNJU7iShqdxJwhMqd5LwJpWfdJgph5lymCnxF16UhDsqd5LQVN6UhCdU7iShqdxJQlN5IglN5U2HmXKYKYeZcvEylSeScCcJT6i0JDSVloSm0pJwR+VOEp5IQlO5k4Sm8onDTDnMlMNMufhQEu6otCTcUXkiCXdUWhKayieScEflCZU7Ki0JbzrMlMNMOcyUi5ep3FF5IglNpan8JJWWhCeS0FRaEppKS8I3HWbKYaYcZsrFD0tCU2lJaCpNpSXhEyotCXdUmkpLQlO5k4Sm0pLQVFoSmsqbDjPlMFMOM+XiD5eEJ1SeUGlJaEn4RBLuJOETSWgqnzjMlMNMOcyUiy9LQlNpSWgqLQlvSsIdlZaEptKS0FRaEu6o3FFpSXjTYaYcZsphplz8ZkloKi0JTaUl4U4SmsodlZaEO0m4k4RPJKGpNJU3HWbKYaYcZkr8hf+wJDyh8okk3FF5Igl3VL7pMFMOM+UwUy4+lIRvUmkqLQlNpSXhjsodlZaEO0loKndUWhKeUPnEYaYcZsphply8TOVNSbiThKbSknBH5U4SmsoTKk8koancScKbDjPlMFMOM+XihyXhCZU3qbQkPKHSknAnCZ9QaUn4psNMOcyUw0y5+J9JQlNpKi0J36TSktCS8DsdZsphphxmysVfTqUl4QmVloSmckelJeGOSkvCmw4z5TBTDjPl4oep/CSVloQnknBH5U4SmkpLwidUvukwUw4z5TBTLl6WhG9Kwp0kNJU7Ki0JTaWptCS8KQnfdJgph5lymCnxF2b+dZgph5lymCmHmXKYKYeZcpgph5lymCmHmXKYKYeZcpgph5lymCn/AN4phS+q2U+ZAAAAAElFTkSuQmCC',
    group: 'Direct Receipt Properties'
  }
]

export const orderDeliveryProperties = [
  {
    name: 'Delivery No',
    type: 'TextBox',
    value: '${orderData.deliveryNo}',
    group: 'Order Delivery Properties'
  },
  {
    name: 'Delivery Date',
    type: 'TextBox',
    value: "${formatedDate(orderData.deliveryDate, 'YYYY-MM-DD')}",
    group: 'Order Delivery Properties'
  },
  {
    name: 'Remarks',
    type: 'TextBox',
    value: '${orderData.remarks}',
    group: 'Order Delivery Properties'
  },
  {
    name: 'PO Type',
    type: 'TextBox',
    value: '${orderData.poType}',
    group: 'Order Delivery Properties'
  },
  {
    name: 'Goods No',
    type: 'TextBox',
    value: '${orderData.goodsNo}',
    group: 'Order Delivery Properties'
  }
]

export const orderDeliveryItemProperties = [
  {
    name: 'Item Row',
    type: 'Container',
    group: 'Order Delivery Item Properties',
    itemRef: 'order-ref'
  },
  {
    name: 'Delivery Position',
    type: 'TextBox',
    value: '${orderItem.deliveryPosition}',
    group: 'Order Delivery Item Properties'
  },
  {
    name: 'Order No',
    type: 'TextBox',
    value: '${orderItem.orderNo}',
    group: 'Order Delivery Item Properties'
  },
  {
    name: 'Position',
    type: 'TextBox',
    value: '${orderItem.position}',
    group: 'Order Delivery Item Properties'
  },
  {
    name: 'Material Code',
    type: 'TextBox',
    value: '${orderItem.materialCode}',
    group: 'Order Delivery Item Properties'
  },
  {
    name: 'Material Description',
    type: 'TextBox',
    value: '${orderItem.materialDescription}',
    group: 'Order Delivery Item Properties'
  },
  {
    name: 'Material Description Alt',
    type: 'TextBox',
    value: '${orderItem.materialDescriptionAlt}',
    group: 'Order Delivery Item Properties'
  },
  {
    name: 'Unit',
    type: 'TextBox',
    value: '${orderItem.unit}',
    group: 'Order Delivery Item Properties'
  },
  {
    name: 'Currency',
    type: 'TextBox',
    value: '${orderItem.currency}',
    group: 'Order Delivery Item Properties'
  },
  {
    name: 'Warehouse',
    type: 'TextBox',
    value: '${orderItem.warehouse}',
    group: 'Order Delivery Item Properties'
  },
  {
    name: 'Location',
    type: 'TextBox',
    value: '${orderItem.location}',
    group: 'Order Delivery Item Properties'
  },
  {
    name: 'Rack',
    type: 'TextBox',
    value: '${orderItem.rack}',
    group: 'Order Delivery Item Properties'
  },
  {
    name: 'Requested Date',
    type: 'TextBox',
    value: "${formatedDate(orderItem.requestedDate, 'YYYY-MM-DD')}",
    group: 'Order Delivery Item Properties'
  },
  {
    name: 'Ordered Quantity',
    type: 'TextBox',
    value: '${orderItem.orderedQuantity}',
    group: 'Order Delivery Item Properties'
  },
  {
    name: 'Price',
    type: 'TextBox',
    value: '${orderItem.price}',
    group: 'Order Delivery Item Properties'
  },
  {
    name: 'To Be Delivered Quantity',
    type: 'TextBox',
    value: '${orderItem.toBeDeliveredQuantity}',
    group: 'Order Delivery Item Properties'
  },
  {
    name: 'Delivery Quantity',
    type: 'TextBox',
    value: '${orderItem.deliveryQuantity}',
    group: 'Order Delivery Item Properties'
  },
  {
    name: 'Delivery Value',
    type: 'TextBox',
    value: '${orderItem.deliveryValue}',
    group: 'Order Delivery Item Properties'
  },

  {
    name: 'Stock Rate',
    type: 'TextBox',
    value: '${orderItem.stockRate}',
    group: 'Order Delivery Item Properties'
  },
  {
    name: 'Stock Value',
    type: 'TextBox',
    value: '${orderItem.stockValue}',
    group: 'Order Delivery Item Properties'
  },
  {
    name: 'Stockable',
    type: 'TextBox',
    value: '${orderItem.stockable}',
    group: 'Order Delivery Item Properties'
  },
  {
    name: 'Stock Unit',
    type: 'TextBox',
    value: '${orderItem.stockUnit}',
    group: 'Order Delivery Item Properties'
  },
  {
    name: 'Stock Conversion',
    type: 'TextBox',
    value: '${orderItem.stockConversion}',
    group: 'Order Delivery Item Properties'
  }
]

export const deliveryReturnProperties = [
  {
    name: 'Return No',
    type: 'TextBox',
    value: '${orderData.returnNo}',
    group: 'Delivery Return Properties'
  },
  {
    name: 'Return Date',
    type: 'TextBox',
    value: "${formatedDate(orderData.returnDate, 'YYYY-MM-DD')}",
    group: 'Delivery Return Properties'
  },
  {
    name: 'Status',
    type: 'TextBox',
    value: '${orderData.status}',
    group: 'Delivery Return Properties'
  }
]

export const deliveryReturnItemProperties = [
  {
    name: 'Item Row',
    type: 'Container',
    group: 'Delivery Return Item Properties',
    itemRef: 'order-ref'
  },
  {
    name: 'Delivery No',
    type: 'TextBox',
    value: '${orderItem.deliveryNo}',
    group: 'Delivery Return Item Properties'
  },
  {
    name: 'Delivery Position',
    type: 'TextBox',
    value: '${orderItem.deliveryPosition}',
    group: 'Delivery Return Item Properties'
  },
  {
    name: 'Order No',
    type: 'TextBox',
    value: '${orderItem.orderNo}',
    group: 'Delivery Return Item Properties'
  },
  {
    name: 'Order Type',
    type: 'TextBox',
    value: '${orderItem.orderType}',
    group: 'Delivery Return Item Properties'
  },
  {
    name: 'Position',
    type: 'TextBox',
    value: '${orderItem.position}',
    group: 'Delivery Return Item Properties'
  },
  {
    name: 'Material Code',
    type: 'TextBox',
    value: '${orderItem.materialCode}',
    group: 'Delivery Return Item Properties'
  },
  {
    name: 'Material Description',
    type: 'TextBox',
    value: '${orderItem.materialDescription}',
    group: 'Delivery Return Item Properties'
  },
  {
    name: 'Material Description Alt',
    type: 'TextBox',
    value: '${orderItem.materialDescriptionAlt}',
    group: 'Delivery Return Item Properties'
  },
  {
    name: 'Unit',
    type: 'TextBox',
    value: '${orderItem.unit}',
    group: 'Delivery Return Item Properties'
  },
  {
    name: 'Currency',
    type: 'TextBox',
    value: '${orderItem.currency}',
    group: 'Delivery Return Item Properties'
  },
  {
    name: 'Warehouse',
    type: 'TextBox',
    value: '${orderItem.warehouse}',
    group: 'Delivery Return Item Properties'
  },
  {
    name: 'Location',
    type: 'TextBox',
    value: '${orderItem.location}',
    group: 'Delivery Return Item Properties'
  },
  {
    name: 'Rack',
    type: 'TextBox',
    value: '${orderItem.rack}',
    group: 'Delivery Return Item Properties'
  },
  {
    name: 'Ordered Quantity',
    type: 'TextBox',
    value: '${orderItem.orderedQuantity}',
    group: 'Delivery Return Item Properties'
  },
  {
    name: 'Price',
    type: 'TextBox',
    value: '${orderItem.price}',
    group: 'Delivery Return Item Properties'
  },
  {
    name: 'Delivery Quantity',
    type: 'TextBox',
    value: '${orderItem.deliveryQuantity}',
    group: 'Delivery Return Item Properties'
  },
  {
    name: 'Return Quantity',
    type: 'TextBox',
    value: '${orderItem.returnQuantity}',
    group: 'Delivery Return Item Properties'
  },
  {
    name: 'Return Value',
    type: 'TextBox',
    value: '${orderItem.returnValue}',
    group: 'Delivery Return Item Properties'
  },
  {
    name: 'Stock Rate',
    type: 'TextBox',
    value: '${orderItem.stockRate}',
    group: 'Delivery Return Item Properties'
  },
  {
    name: 'Stock Value',
    type: 'TextBox',
    value: '${orderItem.stockValue}',
    group: 'Delivery Return Item Properties'
  },
  {
    name: 'Stockable',
    type: 'TextBox',
    value: '${orderItem.stockable}',
    group: 'Delivery Return Item Properties'
  },
  {
    name: 'Stock Unit',
    type: 'TextBox',
    value: '${orderItem.stockUnit}',
    group: 'Delivery Return Item Properties'
  },
  {
    name: 'Stock Conversion',
    type: 'TextBox',
    value: '${orderItem.stockConversion}',
    group: 'Delivery Return Item Properties'
  }
]

export const goodsReceiptProperties = [
  {
    name: 'Receipt No',
    type: 'TextBox',
    value: '${orderData.receiptNo}',
    group: 'Goods Receipt Properties'
  },
  {
    name: 'Receipt Date',
    type: 'TextBox',
    value: "${formatedDate(orderData.receiptDate, 'YYYY-MM-DD')}",
    group: 'Goods Receipt Properties'
  },
  {
    name: 'Remarks',
    type: 'TextBox',
    value: '${orderData.remarks}',
    group: 'Goods Receipt Properties'
  },
  {
    name: 'PO Type',
    type: 'TextBox',
    value: '${orderData.poType}',
    group: 'Goods Receipt Properties'
  },
  {
    name: 'Goods No',
    type: 'TextBox',
    value: '${orderData.goodsNo}',
    group: 'Goods Receipt Properties'
  }
]

export const goodsReceiptItemProperties = [
  {
    name: 'Item Row',
    type: 'Container',
    group: 'Goods Receipt Item Properties',
    itemRef: 'order-ref'
  },
  {
    name: 'Receipt Position',
    type: 'TextBox',
    value: '${orderItem.receiptPosition}',
    group: 'Goods Receipt Item Properties'
  },
  {
    name: 'Order No',
    type: 'TextBox',
    value: '${orderItem.orderNo}',
    group: 'Goods Receipt Item Properties'
  },
  {
    name: 'Position',
    type: 'TextBox',
    value: '${orderItem.position}',
    group: 'Goods Receipt Item Properties'
  },
  {
    name: 'Material Code',
    type: 'TextBox',
    value: '${orderItem.materialCode}',
    group: 'Goods Receipt Item Properties'
  },
  {
    name: 'Material Description',
    type: 'TextBox',
    value: '${orderItem.materialDescription}',
    group: 'Goods Receipt Item Properties'
  },
  {
    name: 'Material DescriptionAlt',
    type: 'TextBox',
    value: '${orderItem.materialDescriptionAlt}',
    group: 'Goods Receipt Item Properties'
  },
  {
    name: 'Unit',
    type: 'TextBox',
    value: '${orderItem.unit}',
    group: 'Goods Receipt Item Properties'
  },
  {
    name: 'Currency',
    type: 'TextBox',
    value: '${orderItem.currency}',
    group: 'Goods Receipt Item Properties'
  },
  {
    name: 'Warehouse',
    type: 'TextBox',
    value: '${orderItem.warehouse}',
    group: 'Goods Receipt Item Properties'
  },
  {
    name: 'Location',
    type: 'TextBox',
    value: '${orderItem.location}',
    group: 'Goods Receipt Item Properties'
  },
  {
    name: 'Rack',
    type: 'TextBox',
    value: '${orderItem.rack}',
    group: 'Goods Receipt Item Properties'
  },
  {
    name: 'Requested Date',
    type: 'TextBox',
    value: "${formatedDate(orderItem.requestedDate, 'YYYY-MM-DD')}",
    group: 'Goods Receipt Item Properties'
  },
  {
    name: 'Ordered Quantity',
    type: 'TextBox',
    value: '${orderItem.orderedQuantity}',
    group: 'Goods Receipt Item Properties'
  },
  {
    name: 'Price',
    type: 'TextBox',
    value: '${orderItem.price}',
    group: 'Goods Receipt Item Properties'
  },
  {
    name: 'To Be Delivered Quantity',
    type: 'TextBox',
    value: '${orderItem.toBeDeliveredQuantity}',
    group: 'Goods Receipt Item Properties'
  },
  {
    name: 'Receipt Quantity',
    type: 'TextBox',
    value: '${orderItem.receiptQuantity}',
    group: 'Goods Receipt Item Properties'
  },
  {
    name: 'Receipt Value',
    type: 'TextBox',
    value: '${orderItem.receiptValue}',
    group: 'Goods Receipt Item Properties'
  },

  {
    name: 'Stock Rate',
    type: 'TextBox',
    value: '${orderItem.stockRate}',
    group: 'Goods Receipt Item Properties'
  },
  {
    name: 'Stock Value',
    type: 'TextBox',
    value: '${orderItem.stockValue}',
    group: 'Goods Receipt Item Properties'
  },
  {
    name: 'Stockable',
    type: 'TextBox',
    value: '${orderItem.stockable}',
    group: 'Goods Receipt Item Properties'
  },
  {
    name: 'Stock Unit',
    type: 'TextBox',
    value: '${orderItem.stockUnit}',
    group: 'Goods Receipt Item Properties'
  },
  {
    name: 'Stock Conversion',
    type: 'TextBox',
    value: '${orderItem.stockConversion}',
    group: 'Goods Receipt Item Properties'
  }
]

export const goodsReturnProperties = [
  {
    name: 'Return No',
    type: 'TextBox',
    value: '${orderData.returnNo}',
    group: 'Goods Return Properties'
  },
  {
    name: 'Return Date',
    type: 'TextBox',
    value: "${formatedDate(orderData.returnDate, 'YYYY-MM-DD')}",
    group: 'Goods Return Properties'
  },
  {
    name: 'Status',
    type: 'TextBox',
    value: '${orderData.status}',
    group: 'Goods Return Properties'
  }
]

export const goodsReturnItemProperties = [
  {
    name: 'Item Row',
    type: 'Container',
    group: 'Goods Receipt Item Properties',
    itemRef: 'order-ref'
  },
  {
    name: 'Receipt No',
    type: 'TextBox',
    value: '${orderItem.receiptNo}',
    group: 'Goods Receipt Item Properties'
  },
  {
    name: 'Receipt Position',
    type: 'TextBox',
    value: '${orderItem.receiptPosition}',
    group: 'Goods Receipt Item Properties'
  },
  {
    name: 'Order No',
    type: 'TextBox',
    value: '${orderItem.orderNo}',
    group: 'Goods Receipt Item Properties'
  },
  {
    name: 'Position',
    type: 'TextBox',
    value: '${orderItem.position}',
    group: 'Goods Receipt Item Properties'
  },
  {
    name: 'Material Code',
    type: 'TextBox',
    value: '${orderItem.materialCode}',
    group: 'Goods Receipt Item Properties'
  },
  {
    name: 'Material Description',
    type: 'TextBox',
    value: '${orderItem.materialDescription}',
    group: 'Goods Receipt Item Properties'
  },
  {
    name: 'Material DescriptionAlt',
    type: 'TextBox',
    value: '${orderItem.materialDescriptionAlt}',
    group: 'Goods Receipt Item Properties'
  },
  {
    name: 'Unit',
    type: 'TextBox',
    value: '${orderItem.unit}',
    group: 'Goods Receipt Item Properties'
  },
  {
    name: 'Currency',
    type: 'TextBox',
    value: '${orderItem.currency}',
    group: 'Goods Receipt Item Properties'
  },
  {
    name: 'Warehouse',
    type: 'TextBox',
    value: '${orderItem.warehouse}',
    group: 'Goods Receipt Item Properties'
  },
  {
    name: 'Location',
    type: 'TextBox',
    value: '${orderItem.location}',
    group: 'Goods Receipt Item Properties'
  },
  {
    name: 'Rack',
    type: 'TextBox',
    value: '${orderItem.rack}',
    group: 'Goods Receipt Item Properties'
  },
  {
    name: 'Ordered Quantity',
    type: 'TextBox',
    value: '${orderItem.orderedQuantity}',
    group: 'Goods Receipt Item Properties'
  },
  {
    name: 'Price',
    type: 'TextBox',
    value: '${orderItem.price}',
    group: 'Goods Receipt Item Properties'
  },
  {
    name: 'Receipt Quantity',
    type: 'TextBox',
    value: '${orderItem.receiptQuantity}',
    group: 'Goods Return Item Properties'
  },
  {
    name: 'Return Quantity',
    type: 'TextBox',
    value: '${orderItem.returnQuantity}',
    group: 'Goods Return Item Properties'
  },
  {
    name: 'Return Value',
    type: 'TextBox',
    value: '${orderItem.returnValue}',
    group: 'Goods Return Item Properties'
  },

  {
    name: 'Stock Rate',
    type: 'TextBox',
    value: '${orderItem.stockRate}',
    group: 'Goods Receipt Item Properties'
  },
  {
    name: 'Stock Value',
    type: 'TextBox',
    value: '${orderItem.stockValue}',
    group: 'Goods Receipt Item Properties'
  },
  {
    name: 'Stockable',
    type: 'TextBox',
    value: '${orderItem.stockable}',
    group: 'Goods Receipt Item Properties'
  },
  {
    name: 'Stock Unit',
    type: 'TextBox',
    value: '${orderItem.stockUnit}',
    group: 'Goods Receipt Item Properties'
  },
  {
    name: 'Stock Conversion',
    type: 'TextBox',
    value: '${orderItem.stockConversion}',
    group: 'Goods Receipt Item Properties'
  }
]

export const batchSerialItemProperties = [
  {
    name: 'Batch Serial Item Row',
    type: 'Container',
    group: 'Batch Serial Item Properties',
    itemRef: 'batch-serial-ref'
  },
  {
    name: 'Batch No',
    type: 'TextBox',
    value: '${batchSerialItem.batchNo}',
    group: 'Batch Serial Item Properties'
  },
  {
    name: 'Serial No',
    type: 'TextBox',
    value: '${batchSerialItem.serialNo}',
    group: 'Batch Serial Item Properties'
  },
  {
    name: 'Quantity',
    type: 'TextBox',
    value: '${batchSerialItem.quantity}',
    group: 'Batch Serial Item Properties'
  },
  {
    name: 'Warehouse',
    type: 'TextBox',
    value: '${batchSerialItem.warehouse}',
    group: 'Batch Serial Item Properties'
  },
  {
    name: 'Location',
    type: 'TextBox',
    value: '${batchSerialItem.location}',
    group: 'Batch Serial Item Properties'
  },
  {
    name: 'Rack',
    type: 'TextBox',
    value: '${batchSerialItem.rack}',
    group: 'Batch Serial Item Properties'
  },
  {
    name: 'Manufacturing Date',
    type: 'TextBox',
    value: "${formatedDate(batchSerialItem.manufacturingDate, 'YYYY-MM-DD')}",
    group: 'Batch Serial Item Properties'
  },
  {
    name: 'Expiry Date',
    type: 'TextBox',
    value: "${formatedDate(batchSerialItem.expiryDate, 'YYYY-MM-DD')}",
    group: 'Batch Serial Item Properties'
  }
]

export const directExpenseProperties = [
  {
    name: 'Expense No',
    type: 'TextBox',
    value: '${templateData.expenseNo}',
    group: 'Direct Expense Properties'
  },
  {
    name: 'Date',
    type: 'TextBox',
    value: "${formatedDate(templateData.date, 'YYYY-MM-DD')}",
    group: 'Direct Expense Properties'
  },
  {
    name: 'Description',
    type: 'TextBox',
    value: '${templateData.description}',
    group: 'Direct Expense Properties'
  },
  {
    name: 'Amount',
    type: 'TextBox',
    value: '${templateData.amount}',
    group: 'Direct Expense Properties'
  },
  {
    name: 'Tax',
    type: 'TextBox',
    value: '${templateData.tax}',
    group: 'Direct Expense Properties'
  },
  {
    name: 'Tax Format',
    type: 'TextBox',
    value: '${templateData.taxFormat}',
    group: 'Direct Expense Properties'
  },
  {
    name: 'Tax Amount',
    type: 'TextBox',
    value: '${templateData.taxAmount}',
    group: 'Direct Expense Properties'
  },
  {
    name: 'Total Amount',
    type: 'TextBox',
    value: '${templateData.totalAmount}',
    group: 'Direct Expense Properties'
  },
  {
    name: 'Currency',
    type: 'TextBox',
    value: '${templateData.currency}',
    group: 'Direct Expense Properties'
  },
  {
    name: 'Exchange Rate',
    type: 'TextBox',
    value: '${templateData.exchangeRate}',
    group: 'Direct Expense Properties'
  },
  {
    name: 'Reference',
    type: 'TextBox',
    value: '${templateData.entityRef}',
    group: 'Direct Expense Properties'
  }
]

export const invoiceReceiptProperties = [
  {
    name: 'Receipt No',
    type: 'TextBox',
    value: '${templateData.receiptNo}',
    group: 'Invoice Receipt Properties'
  },
  {
    name: 'Date',
    type: 'TextBox',
    value: "${formatedDate(templateData.date, 'YYYY-MM-DD')}",
    group: 'Invoice Receipt Properties'
  },
  {
    name: 'Type Of Payment',
    type: 'TextBox',
    value: '${templateData.typeOfPayment}',
    group: 'Invoice Receipt Properties'
  },
  {
    name: 'Amount',
    type: 'TextBox',
    value: '${templateData.amount}',
    group: 'Invoice Receipt Properties'
  },
  {
    name: 'Discount',
    type: 'TextBox',
    value: '${templateData.discount}',
    group: 'Invoice Receipt Properties'
  },
  {
    name: 'Total Amount',
    type: 'TextBox',
    value: '${templateData.totalAmount}',
    group: 'Invoice Receipt Properties'
  },
  {
    name: 'Currency',
    type: 'TextBox',
    value: '${templateData.currency}',
    group: 'Invoice Receipt Properties'
  },
  {
    name: 'Exchange Rate',
    type: 'TextBox',
    value: '${templateData.exchangeRate}',
    group: 'Invoice Receipt Properties'
  },
  {
    name: 'Bank Charges',
    type: 'TextBox',
    value: '${templateData.bankCharges}',
    group: 'Invoice Receipt Properties'
  },
  {
    name: 'Forex Diff',
    type: 'TextBox',
    value: '${templateData.forexDiff}',
    group: 'Invoice Receipt Properties'
  },
  {
    name: 'Reference',
    type: 'TextBox',
    value: '${templateData.entityRef}',
    group: 'Invoice Receipt Properties'
  }
]

export const expensePaymentProperties = [
  {
    name: 'Payment No',
    type: 'TextBox',
    value: '${templateData.paymentNo}',
    group: 'Invoice Receipt Properties'
  },
  {
    name: 'Date',
    type: 'TextBox',
    value: "${formatedDate(templateData.date, 'YYYY-MM-DD')}",
    group: 'Invoice Receipt Properties'
  },
  {
    name: 'Type Of Payment',
    type: 'TextBox',
    value: '${templateData.typeOfPayment}',
    group: 'Invoice Receipt Properties'
  },
  {
    name: 'Amount',
    type: 'TextBox',
    value: '${templateData.amount}',
    group: 'Invoice Receipt Properties'
  },
  {
    name: 'Discount',
    type: 'TextBox',
    value: '${templateData.discount}',
    group: 'Invoice Receipt Properties'
  },
  {
    name: 'Total Amount',
    type: 'TextBox',
    value: '${templateData.totalAmount}',
    group: 'Invoice Receipt Properties'
  },
  {
    name: 'Currency',
    type: 'TextBox',
    value: '${templateData.currency}',
    group: 'Invoice Receipt Properties'
  },
  {
    name: 'Exchange Rate',
    type: 'TextBox',
    value: '${templateData.exchangeRate}',
    group: 'Invoice Receipt Properties'
  },
  {
    name: 'Bank Charges',
    type: 'TextBox',
    value: '${templateData.bankCharges}',
    group: 'Invoice Receipt Properties'
  },
  {
    name: 'Forex Diff',
    type: 'TextBox',
    value: '${templateData.forexDiff}',
    group: 'Invoice Receipt Properties'
  },
  {
    name: 'Reference',
    type: 'TextBox',
    value: '${templateData.entityRef}',
    group: 'Invoice Receipt Properties'
  }
]

export const jobOrderProperties = [
  {
    name: 'Job Order No',
    type: 'TextBox',
    value: '${jobOrderData.orderNo}',
    group: 'Order Properties'
  },
  {
    name: 'Order Type',
    type: 'TextBox',
    value: '${jobOrderData.orderType}',
    group: 'Order Properties'
  },
  {
    name: 'Job Order Date',
    type: 'TextBox',
    value: '${jobOrderData.orderDate}',
    group: 'Order Properties'
  },
  {
    name: 'Customer/Supplier Name',
    type: 'TextBox',
    value: '${clientData.name}',
    group: 'Order Properties'
  },
  {
    name: 'Currency',
    type: 'TextBox',
    value: '${jobOrderData.currency}',
    group: 'Order Properties'
  }
]
export const jobOrderItemProperties = [
  {
    name: 'Order Item Row',
    type: 'Container',
    group: 'Order Item Properties',
    itemRef: 'order-ref'
  },
  {
    name: 'Position',
    type: 'TextBox',
    value: '${orderItem.position}',
    group: 'Order Item Properties'
  },
  {
    name: 'Material Code',
    type: 'TextBox',
    value: '${orderItem.materialCode}',
    group: 'Order Item Properties'
  },
  {
    name: 'Material Description',
    type: 'TextBox',
    value: '${orderItem.materialDescription}',
    group: 'Order Item Properties'
  },
  {
    name: 'Unit',
    type: 'TextBox',
    value: '${orderItem.unit}',
    group: 'Order Item Properties'
  },
  {
    name: 'Ordered Quantity',
    type: 'TextBox',
    value: '${orderItem.orderedQuantity}',
    group: 'Order Item Properties'
  },
  {
    name: 'Requested Date',
    type: 'TextBox',
    value: '${orderItem.requestedDate}',
    group: 'Order Item Properties'
  },
  {
    name: 'Price',
    type: 'TextBox',
    value: '${orderItem.price}',
    group: 'Order Item Properties'
  },
  {
    name: 'Amount',
    type: 'TextBox',
    value: '${orderItem.amount}',
    group: 'Order Item Properties'
  },
  {
    name: 'Discount Type',
    type: 'TextBox',
    value: '${orderItem.discountType}',
    group: 'Order Item Properties'
  },
  {
    name: 'Discount',
    type: 'TextBox',
    value: '${orderItem.discount}',
    group: 'Order Item Properties'
  },

  {
    name: 'Discount Value',
    type: 'TextBox',
    value: '${orderItem.discountValue}',
    group: 'Order Item Properties'
  },
  {
    name: 'Charge Type',
    type: 'TextBox',
    value: '${orderItem.chargeType}',
    group: 'Order Item Properties'
  },
  {
    name: 'Charge',
    type: 'TextBox',
    value: '${orderItem.charge}',
    group: 'Order Item Properties'
  },
  {
    name: 'Charge Value',
    type: 'TextBox',
    value: '${orderItem.chargeValue}',
    group: 'Order Item Properties'
  },
  {
    name: 'Net Amount',
    type: 'TextBox',
    value: '${orderItem.netAmount}',
    group: 'Order Item Properties'
  },
  {
    name: 'Delivery Status',
    type: 'TextBox',
    value: '${orderItem.deliveryStatus}',
    group: 'Order Item Properties'
  },
  {
    name: 'Invoice Status',
    type: 'TextBox',
    value: '${orderItem.invoiceStatus}',
    group: 'Order Item Properties'
  },
  {
    name: 'Delivered Quantity',
    type: 'TextBox',
    value: '${orderItem.deliveredQuantity}',
    group: 'Order Item Properties'
  },
  {
    name: 'Invoiced Quantity',
    type: 'TextBox',
    value: '${orderItem.invoicedQuantity}',
    group: 'Order Item Properties'
  },
  {
    name: 'To Be Delivered Quantity',
    type: 'TextBox',
    value: '${orderItem.toBeDeliveredQuantity}',
    group: 'Order Item Properties'
  },
  {
    name: 'To Be Invoiced Quantity',
    type: 'TextBox',
    value: '${orderItem.toBeInvoicedQuantity}',
    group: 'Order Item Properties'
  }
]

export const leadProposalProperties = [
  {
    name: 'Proposal No',
    type: 'TextBox',
    value: '${orderData.proposalNo}',
    group: 'Lead Proposal Properties'
  },
  {
    name: 'Proposal Date',
    type: 'TextBox',
    value: '${orderData.proposalDate}',
    group: 'Lead Proposal Properties'
  },
  {
    name: 'Submitted By',
    type: 'TextBox',
    value: '${orderData.submittedBy}',
    group: 'Lead Proposal Properties'
  },
  {
    name: 'Approved By',
    type: 'TextBox',
    value: '${orderData.approvedBy}',
    group: 'Lead Proposal Properties'
  },
  {
    name: 'Version',
    type: 'TextBox',
    value: '${orderData.version}',
    group: 'Lead Proposal Properties'
  },
  {
    name: 'Lead No',
    type: 'TextBox',
    value: '${orderData.leadNo}',
    group: 'Lead Proposal Properties'
  },
  {
    name: 'Lead Name',
    type: 'TextBox',
    value: '${orderData.leadName}',
    group: 'Lead Proposal Properties'
  },
  {
    name: 'Contact Person',
    type: 'TextBox',
    value: '${orderData.contactPerson}',
    group: 'Lead Proposal Properties'
  },
  {
    name: 'Contact Info',
    type: 'TextBox',
    value: '${orderData.contactInfo}',
    group: 'Lead Proposal Properties'
  },
  {
    name: 'Project Name',
    type: 'TextBox',
    value: '${orderData.projectName}',
    group: 'Lead Proposal Properties'
  },
  {
    name: 'Reference',
    type: 'TextBox',
    value: '${orderData.reference}',
    group: 'Lead Proposal Properties'
  },
  {
    name: 'Rfp Number',
    type: 'TextBox',
    value: '${orderData.rfpNumber}',
    group: 'Lead Proposal Properties'
  },
  {
    name: 'Rfp Date',
    type: 'TextBox',
    value: '${orderData.rfpDate}',
    group: 'Lead Proposal Properties'
  },
  {
    name: 'Work Scope',
    type: 'TextBox',
    value: '${orderData.workScope}',
    group: 'Lead Proposal Properties'
  },
  {
    name: 'Detailed Content',
    type: 'TextBox',
    value: '${orderData.detailedContent}',
    group: 'Lead Proposal Properties'
  },
  {
    name: 'Currency',
    type: 'TextBox',
    value: '${orderData.currency}',
    group: 'Lead Proposal Properties'
  },
  {
    name: 'Exchange Rate',
    type: 'TextBox',
    value: '${orderData.exchangeRate}',
    group: 'Lead Proposal Properties'
  },
  {
    name: 'Tax Category',
    type: 'TextBox',
    value: '${orderData.taxCategory}',
    group: 'Lead Proposal Properties'
  },
  {
    name: 'Terms And Conditions',
    type: 'TextBox',
    value: '${orderData.termsAndConditions}',
    group: 'Lead Proposal Properties'
  },
  {
    name: 'Amount',
    type: 'TextBox',
    value: '${orderData.amount}',
    group: 'Lead Proposal Properties'
  },
  {
    name: 'Discount',
    type: 'TextBox',
    value: '${orderData.discount}',
    group: 'Lead Proposal Properties'
  },
  {
    name: 'Charge',
    type: 'TextBox',
    value: '${orderData.charge}',
    group: 'Lead Proposal Properties'
  },
  {
    name: 'Net Amount',
    type: 'TextBox',
    value: '${orderData.netAmount}',
    group: 'Lead Proposal Properties'
  },
  {
    name: 'Tax Amount',
    type: 'TextBox',
    value: '${orderData.taxAmount}',
    group: 'Lead Proposal Properties'
  },
  {
    name: 'Gross Amount',
    type: 'TextBox',
    value: '${orderData.grossAmount}',
    group: 'Lead Proposal Properties'
  }
]
