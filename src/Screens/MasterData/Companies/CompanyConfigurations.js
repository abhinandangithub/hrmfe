import { Col, message, Row } from 'antd'
import { withFormik } from 'formik'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import * as Yup from 'yup'
import { getWarehouseCodes } from '../../../Actions/UserAction'
import Button from '../../../Components/Button'
import { Field, Form } from '../../../Components/Formik'
import Panel from '../../../Layout/Panel'
import PanelLayout from '../../../Layout/PanelLayout'
import apiClient from '../../../Util/apiClient'
import { removeEmptyKeys } from '../../../Util/Util'

const ADDITIONAL_FIELDS_INCOMES = [
  { label: 'Location', value: 'location' },
  { label: 'Premise', value: 'premise' },
  { label: 'Slip No', value: 'slipNo' },
  { label: 'Project', value: 'project' },
  { label: 'Project Name', value: 'projectName' },
  { label: 'Contract No', value: 'contractNo' },
  { label: 'Contract Title', value: 'contractTitle' },
  { label: 'Contract Period', value: 'contractPeriod' },
  { label: 'Contract Value', value: 'contractValue' },
  { label: 'Period Of Payment', value: 'periodOfPayment' },
  { label: 'Vendor ID', value: 'vendorId' },
  { label: 'Vendor No', value: 'vendorNo' },
  { label: 'SES No', value: 'sesNo' },

  { label: 'Subject', value: 'subject' },
  { label: 'Description', value: 'description' },
  { label: 'Discount', value: 'discount' },
  { label: 'Retention', value: 'retention' },
  { label: 'Charge', value: 'charge' },
  { label: 'Amount', value: 'amount' },
  { label: 'Account', value: 'account' },
  { label: 'Free of cost', value: 'freeOfCost' }
]

const ADDITIONAL_FIELDS = [
  { label: 'Project', value: 'project' },
  { label: 'Description', value: 'description' },
  { label: 'Discount', value: 'discount' },
  { label: 'Retention', value: 'retention' },
  { label: 'Charge', value: 'charge' }
]

const FIELDS_TO_TRANSLATE = [
  { label: 'Billing Street', value: 'billingStreet' },
  { label: 'Billing City', value: 'billingCity' },
  { label: 'Billing Country', value: 'billingCountry' },
  { label: 'Invoice - Item - Product', value: 'itemProduct' },
  { label: 'Invoice - Item - Description', value: 'itemDescription' },
  { label: 'Invoice - Item - Notes', value: 'itemNotes' },
  { label: 'Invoice - Client Name', value: 'invoiceClientName' },
  { label: 'Invoice - Subject', value: 'invoiceSubject' },
  { label: 'Invoice - Premise', value: 'invoicePremise' },
  { label: 'Invoice - Notes', value: 'invoiceNotes' }
]

const ADDITIONAL_QUOTATION_FIELDS = [
  { label: 'Source', value: 'source' },
  { label: 'Destination', value: 'destination' },
  { label: 'Trade Term', value: 'tradeTerm' },
  { label: 'Terms Of Payment', value: 'termsOfPayment' },
  { label: 'Delivery Time', value: 'deliveryTime' },
  { label: 'Remarks', value: 'remarks' },
  { label: 'Notes', value: 'notes' },
  { label: 'Net Quantity', value: 'netQuantity' },
  { label: 'Buffer', value: 'buffer' },
  { label: 'Area', value: 'area' },
  { label: 'Dimension1', value: 'dimension1' },
  { label: 'Dimension2', value: 'dimension2' },
  { label: 'Project', value: 'project' },
  { label: 'Warranty', value: 'warranty' },
  { label: 'Validity', value: 'validity' },
  { label: 'Subject', value: 'subject' }
]
const ADDITIONAL_SALES_ORDER_FIELDS = [
  { label: 'Source', value: 'source' },
  { label: 'Destination', value: 'destination' },
  { label: 'Trade Term', value: 'tradeTerm' },
  { label: 'Terms Of Payment', value: 'termsOfPayment' },
  { label: 'Delivery Time', value: 'deliveryTime' },
  { label: 'Remarks', value: 'remarks' },
  { label: 'Notes', value: 'notes' },
  { label: 'Net Quantity', value: 'netQuantity' },
  { label: 'Buffer', value: 'buffer' },
  { label: 'Area', value: 'area' },
  { label: 'Dimension1', value: 'dimension1' },
  { label: 'Dimension2', value: 'dimension2' },
  { label: 'Project', value: 'project' },
  { label: 'Warranty', value: 'warranty' },
  { label: 'Validity', value: 'validity' },
  { label: 'Subject', value: 'subject' }
]
const ADDITIONAL_PURCHASE_ORDER_FIELDS = [
  { label: 'Source', value: 'source' },
  { label: 'Destination', value: 'destination' },
  { label: 'Trade Term', value: 'tradeTerm' },
  { label: 'Terms Of Payment', value: 'termsOfPayment' },
  { label: 'Delivery Time', value: 'deliveryTime' },
  { label: 'Remarks', value: 'remarks' },
  { label: 'Notes', value: 'notes' },
  { label: 'Net Quantity', value: 'netQuantity' },
  { label: 'Buffer', value: 'buffer' },
  { label: 'Area', value: 'area' },
  { label: 'Dimension1', value: 'dimension1' },
  { label: 'Dimension2', value: 'dimension2' },
  { label: 'Project', value: 'project' },
  { label: 'Warranty', value: 'warranty' },
  { label: 'Validity', value: 'validity' },
  { label: 'Subject', value: 'subject' }
]

const YES_NO_OPTIONS = [
  { label: 'Yes', value: 'Yes' },
  { label: 'No', value: 'No' }
]

const POS_USAGE_OPTIONS = [
  { label: 'Products', value: 'Products' },
  { label: 'Services', value: 'Services' },
  { label: 'Both', value: '' }
]

const BARCODE_OPTIONS = [
  { label: 'CODE39', value: 'CODE39' },
  { label: 'CODE128', value: 'CODE128' }
]

const MATERIAL_BARCODE_FIELDS = [
  { label: 'Material Code', value: 'materialCode' },
  { label: 'Material Desc.', value: 'materialDescription' },
  { label: 'Material Type', value: 'materialType' },
  { label: 'Material Group', value: 'materialGroup' },
  { label: 'Stock UOM', value: 'unit' },
  { label: 'Batch', value: 'batch' },
  { label: 'Serial', value: 'serial' },
  { label: 'Purchase UOM', value: 'purchaseUnit' },
  { label: 'Sales UOM', value: 'salesUnit' },
  { label: 'Retail Price / Last Sales Price', value: 'salesPrice' },
  { label: 'Wholesale Price / Last Purchase Price', value: 'purchasePrice' },
  { label: 'Tax of Sales', value: 'salesTax' },
  { label: 'Tax of Purchase', value: 'purchaseTax' },
  { label: 'Standard Cost', value: 'cost' }
]

const DIVISION_LEVEL = [{ label: 'Header', value: 'Header' }]

const INVOICE_TRANSMISSION_TYPE_OPTIONS = [{ label: 'ZATCA', value: 'ZATCA' }]

const ADDITIONAL_MATERIAL_TRANSFER_STATUS = [
  { label: 'Release', value: 'Release' },
  { label: 'Receive', value: 'Receive' }
]

const Schema = Yup.object().shape({
  division: Yup.string().required(),
  costCenter: Yup.string().required(),
  incomeInvoiceApprover: Yup.array(),
  expenseInvoiceApprover: Yup.array(),
  warehouseLocations: Yup.string().required(),
  manualIncomeInvoiceNo: Yup.string().required(),
  manualExpenseInvoiceNo: Yup.string().required(),
  approvedIncomeCancellation: Yup.string().required(),
  approvedExpenseCancellation: Yup.string().required(),
  incomeDivisionLevel: Yup.string().required(),
  expenseDivisionLevel: Yup.string().required(),
  POSInvoice: Yup.string().required(),
  warehouseRacks: Yup.string().required(),
  deliveryBasedOnSales: Yup.string().required(),
  receiptBasedOnPurchase: Yup.string().required(),
  saveReportsInDMS: Yup.string().required(),
  defaultTrialBalanceConfig: Yup.string().required(),
  invoiceTransmissionType: Yup.string().when('invoiceTransmission', {
    is: (invoiceTransmission) => invoiceTransmission === 'Yes',
    then: (schema) => schema.required()
  }),
  invoiceTransmissionEndpoint: Yup.string()
    .url()
    .when('invoiceTransmission', {
      is: (invoiceTransmission) => invoiceTransmission === 'Yes',
      then: (schema) => schema.required()
    }),
  inventoryCountScanAutoSave: Yup.string().required(),
  freeOfCost: Yup.string().required()
})

function CompanyConfigurations({ values, setFieldValue }) {
  const [warehouses, setWarehouses] = useState([])
  const [roles, setRoles] = useState([])
  const { t } = useTranslation()

  const defaultWarehouses = warehouses.filter((item) => values.POSWarehouses.includes(item.value))

  const getData = () => {
    apiClient.get('roles/get-roles').then(({ data }) => {
      if (data.success) {
        setRoles(data.result.map((x) => ({ label: x.name, value: x.name })))
      }
    })
  }

  useEffect(() => {
    getWarehouseCodes().then((data) => {
      setWarehouses(data)
    })
    getData()
  }, [])

  return (
    <Form>
      <Row justify="center" className="inner-contents">
        <Col xs={22} sm={22} md={20} lg={20}>
          <PanelLayout title={t('COMPANY CONFIGURATIONS')}>
            <Panel title={t('Company')}>
              <Row gutter={[20, 10]}>
                <Col xs={24} sm={24} md={12} lg={8}>
                  <div style={{ fontSize: 14 }}>Do you have divisions in this company?</div>
                  <div style={{ fontSize: 14 }}>
                    <i>(If yes, you can create multiple divisions under company setup)</i>
                  </div>
                </Col>
                <Col xs={24} sm={24} md={12} lg={4}>
                  <div className="form-field">
                    <Field as="select" name="division" options={YES_NO_OPTIONS} />
                  </div>
                </Col>
                <Col xs={24} sm={24} md={12} lg={8}>
                  <div style={{ fontSize: 14 }}>Do you have cost center in this company?</div>
                  <div style={{ fontSize: 14 }}>
                    <i>(If yes, you can create under finance management)</i>
                  </div>
                </Col>
                <Col xs={24} sm={24} md={12} lg={4}>
                  <div className="form-field">
                    <Field as="select" name="costCenter" options={YES_NO_OPTIONS} />
                  </div>
                </Col>
                <Col xs={24} sm={24} md={12} lg={8}>
                  <div style={{ fontSize: 14 }}>Do you have free of cost in this company?</div>
                </Col>
                <Col xs={24} sm={24} md={12} lg={4}>
                  <div className="form-field">
                    <Field as="select" name="freeOfCost" options={YES_NO_OPTIONS} />
                  </div>
                </Col>
              </Row>
            </Panel>
            <Panel title={t('Timesheet')}>
              <Row gutter={[20, 10]}>
                <Col xs={24} sm={24} md={12} lg={6}>
                  <div style={{ fontSize: 14 }}>Do you want to enter time entries for future dates?</div>
                </Col>
                <Col xs={24} sm={24} md={12} lg={6}>
                  <div className="form-field">
                    <Field as="select" name="timeEntryFutureDate" options={YES_NO_OPTIONS} />
                  </div>
                </Col>
              </Row>
            </Panel>
            <Panel title={t('Invoice')}>
              <Row gutter={[20, 10]}>
                <Col xs={24} sm={24} md={12} lg={6}>
                  <div style={{ fontSize: 14 }}>
                    Select income invoice approver to manage approvals. (N/A if empty)
                  </div>
                </Col>
                <Col xs={24} sm={24} md={12} lg={6}>
                  <div className="form-field">
                    <Field
                      as="paged-select"
                      name="incomeInvoiceApprover"
                      endPoint="users/get-active-by-company"
                      optionValue="user"
                      mode="multiple"
                    />
                  </div>
                </Col>
                <Col xs={24} sm={24} md={12} lg={6}>
                  <div style={{ fontSize: 14 }}>
                    Select expense invoice approver to manage approvals. (N/A if empty)
                  </div>
                </Col>
                <Col xs={24} sm={24} md={12} lg={6}>
                  <div className="form-field">
                    <Field
                      as="paged-select"
                      name="expenseInvoiceApprover"
                      endPoint="users/get-active-by-company"
                      optionValue="user"
                      mode="multiple"
                    />
                  </div>
                </Col>
                <Col xs={24} sm={24} md={12} lg={6}>
                  <div style={{ fontSize: 14 }}>Manual income invoice number?</div>
                </Col>
                <Col xs={24} sm={24} md={12} lg={6}>
                  <div className="form-field">
                    <Field as="select" name="manualIncomeInvoiceNo" options={YES_NO_OPTIONS} />
                  </div>
                </Col>
                <Col xs={24} sm={24} md={12} lg={6}>
                  <div style={{ fontSize: 14 }}>Manual expense invoice number?</div>
                </Col>
                <Col xs={24} sm={24} md={12} lg={6}>
                  <div className="form-field">
                    <Field as="select" name="manualExpenseInvoiceNo" options={YES_NO_OPTIONS} />
                  </div>
                </Col>

                <Col xs={24} sm={24} md={12} lg={6}>
                  <div style={{ fontSize: 14 }}>Select income Additional fields</div>
                </Col>
                <Col xs={24} sm={24} md={12} lg={6}>
                  <div className="form-field">
                    <Field
                      as="select"
                      name="incomeAdditionalFields"
                      options={ADDITIONAL_FIELDS_INCOMES}
                      mode="multiple"
                    />
                  </div>
                </Col>
                <Col xs={24} sm={24} md={12} lg={6}>
                  <div style={{ fontSize: 14 }}>Field to translate in arabic</div>
                </Col>
                <Col xs={24} sm={24} md={12} lg={6}>
                  <div className="form-field">
                    <Field
                      as="select"
                      name="fieldsToTranslate"
                      mode="multiple"
                      options={FIELDS_TO_TRANSLATE}
                    />
                  </div>
                </Col>
                <Col xs={24} sm={24} md={12} lg={6}>
                  <div style={{ fontSize: 14 }}>Select expense Additional fields</div>
                </Col>
                <Col xs={24} sm={24} md={12} lg={6}>
                  <div className="form-field">
                    <Field
                      as="select"
                      name="expenseAdditionalFields"
                      options={ADDITIONAL_FIELDS}
                      mode="multiple"
                    />
                  </div>
                </Col>

                <Col xs={24} sm={24} md={12} lg={6}>
                  <div style={{ fontSize: 14 }}>
                    Do you wants to allow cancellation of approved income invoices?
                  </div>
                </Col>
                <Col xs={24} sm={24} md={12} lg={6}>
                  <div className="form-field">
                    <Field as="select" name="approvedIncomeCancellation" options={YES_NO_OPTIONS} />
                  </div>
                </Col>
                <Col xs={24} sm={24} md={12} lg={6}>
                  <div style={{ fontSize: 14 }}>
                    Do you wants to allow cancellation of approved expense invoices?
                  </div>
                </Col>
                <Col xs={24} sm={24} md={12} lg={6}>
                  <div className="form-field">
                    <Field as="select" name="approvedExpenseCancellation" options={YES_NO_OPTIONS} />
                  </div>
                </Col>
                <Col xs={24} sm={24} md={12} lg={6}>
                  <div style={{ fontSize: 14 }}>Income division level?</div>
                </Col>
                <Col xs={24} sm={24} md={12} lg={6}>
                  <div className="form-field">
                    <Field as="select" name="incomeDivisionLevel" options={DIVISION_LEVEL} />
                  </div>
                </Col>
                <Col xs={24} sm={24} md={12} lg={6}>
                  <div style={{ fontSize: 14 }}>Expense division level?</div>
                </Col>
                <Col xs={24} sm={24} md={12} lg={6}>
                  <div className="form-field">
                    <Field as="select" name="expenseDivisionLevel" options={DIVISION_LEVEL} />
                  </div>
                </Col>
                <Col xs={24} sm={24} md={12} lg={6}>
                  <div style={{ fontSize: 14 }}>Stock reduction in Direct invoices</div>
                </Col>
                <Col xs={24} sm={24} md={12} lg={6}>
                  <div className="form-field">
                    <Field as="select" name="stockReductionInInvoice" options={YES_NO_OPTIONS} />
                  </div>
                </Col>
                <Col xs={24} sm={24} md={12} lg={6}>
                  <div style={{ fontSize: 14 }}>Stock addition in Direct expenses</div>
                </Col>
                <Col xs={24} sm={24} md={12} lg={6}>
                  <div className="form-field">
                    <Field as="select" name="stockAdditionInExpense" options={YES_NO_OPTIONS} />
                  </div>
                </Col>
                <Col xs={24} sm={24} md={12} lg={6}>
                  <div style={{ fontSize: 14 }}>POS Invoice</div>
                </Col>
                <Col xs={24} sm={24} md={12} lg={6}>
                  <div className="form-field">
                    <Field
                      as="select"
                      name="POSInvoice"
                      label="POS Invoice"
                      options={YES_NO_OPTIONS}
                      hideLabel
                    />
                  </div>
                </Col>
                <Col xs={24} sm={24} md={12} lg={6}>
                  <div style={{ fontSize: 14 }}>Update payment due date when email sent</div>
                </Col>
                <Col xs={24} sm={24} md={12} lg={6}>
                  <div className="form-field">
                    <Field
                      as="select"
                      name="invoiceDueDateWhenEmailSent"
                      label="invoiceDueDateWhenEmailSent"
                      options={YES_NO_OPTIONS}
                      hideLabel
                    />
                  </div>
                </Col>
              </Row>
            </Panel>
            <Panel title={t('Warehouse')}>
              <Row gutter={[20, 10]}>
                <Col xs={24} sm={24} md={12} lg={6}>
                  <div style={{ fontSize: 14 }}>Do you want to use Warehouse locations?</div>
                </Col>
                <Col xs={24} sm={24} md={12} lg={6}>
                  <div className="form-field">
                    <Field as="select" name="warehouseLocations" options={YES_NO_OPTIONS} />
                  </div>
                </Col>
                <Col xs={24} sm={24} md={12} lg={6}>
                  <div style={{ fontSize: 14 }}>Do you want to use Warehouse racks?</div>
                </Col>
                <Col xs={24} sm={24} md={12} lg={6}>
                  <div className="form-field">
                    <Field as="select" name="warehouseRacks" options={YES_NO_OPTIONS} />
                  </div>
                </Col>
              </Row>
            </Panel>
            <Panel title={t('Sales')}>
              <Row gutter={[20, 10]}>
                <Col xs={24} sm={24} md={12} lg={6}>
                  <div style={{ fontSize: 14 }}>
                    Delivery based on Sales Order and invoices based on deliveries?
                  </div>
                </Col>
                <Col xs={24} sm={24} md={12} lg={6}>
                  <div className="form-field">
                    <Field as="select" name="deliveryBasedOnSales" options={YES_NO_OPTIONS} />
                  </div>
                </Col>
                <Col xs={24} sm={24} md={12} lg={6}>
                  <div style={{ fontSize: 14 }}>Job order based on sales order?</div>
                </Col>
                <Col xs={24} sm={24} md={12} lg={6}>
                  <div className="form-field">
                    <Field as="select" name="jobBasedOnSales" options={YES_NO_OPTIONS} />
                  </div>
                </Col>
                <Col xs={24} sm={24} md={12} lg={6}>
                  <div style={{ fontSize: 14 }}>Select additional Sales Quotation fields</div>
                </Col>
                <Col xs={24} sm={24} md={12} lg={6}>
                  <div className="form-field">
                    <Field
                      as="select"
                      name="quotaionAdditionalFields"
                      options={ADDITIONAL_QUOTATION_FIELDS}
                      mode="multiple"
                    />
                  </div>
                </Col>
                <Col xs={24} sm={24} md={12} lg={6}>
                  <div style={{ fontSize: 14 }}>Select additional Sales Order fields</div>
                </Col>
                <Col xs={24} sm={24} md={12} lg={6}>
                  <div className="form-field">
                    <Field
                      as="select"
                      name="salesOrderAdditionalFields"
                      options={ADDITIONAL_SALES_ORDER_FIELDS}
                      mode="multiple"
                    />
                  </div>
                </Col>
                <Col xs={24} sm={24} md={12} lg={6}>
                  <div style={{ fontSize: 14 }}>Use Whole Sale and Retail Price</div>
                </Col>
                <Col xs={24} sm={24} md={12} lg={6}>
                  <div className="form-field">
                    <Field as="select" name="wholeSaleAndRetailPrice" options={YES_NO_OPTIONS} />
                  </div>
                </Col>
                <Col xs={24} sm={24} md={12} lg={6}>
                  <div style={{ fontSize: 14 }}>Pick Order</div>
                </Col>
                <Col xs={24} sm={24} md={12} lg={6}>
                  <div className="form-field">
                    <Field as="select" name="pickOrder" options={YES_NO_OPTIONS} />
                  </div>
                </Col>
                <Col xs={24} sm={24} md={12} lg={6}>
                  <div style={{ fontSize: 14 }}>Delivery by Inventory Management</div>
                </Col>
                <Col xs={24} sm={24} md={12} lg={6}>
                  <div className="form-field">
                    <Field as="select" name="deliveryByInventory" options={YES_NO_OPTIONS} />
                  </div>
                </Col>
              </Row>
            </Panel>
            <Panel title={t('Purchase')}>
              <Row gutter={[20, 10]}>
                <Col xs={24} sm={24} md={12} lg={6}>
                  <div style={{ fontSize: 14 }}>
                    Receipt based on Purchase Order and invoices based on receipts?
                  </div>
                </Col>
                <Col xs={24} sm={24} md={12} lg={6}>
                  <div className="form-field">
                    <Field as="select" name="receiptBasedOnPurchase" options={YES_NO_OPTIONS} />
                  </div>
                </Col>
                <Col xs={24} sm={24} md={12} lg={6}>
                  <div style={{ fontSize: 14 }}>Select additional Purchase Order fields</div>
                </Col>
                <Col xs={24} sm={24} md={12} lg={6}>
                  <div className="form-field">
                    <Field
                      as="select"
                      name="purchaseOrderAdditionalFields"
                      options={ADDITIONAL_PURCHASE_ORDER_FIELDS}
                      mode="multiple"
                    />
                  </div>
                </Col>
              </Row>
            </Panel>
            <Panel title={t('POS')}>
              <Row gutter={[20, 10]}>
                <Col xs={24} sm={24} md={12} lg={6}>
                  <div style={{ fontSize: 14 }}>Select your POS usage</div>
                </Col>
                <Col xs={24} sm={24} md={12} lg={6}>
                  <div className="form-field">
                    <Field as="select" name="POSUsage" options={POS_USAGE_OPTIONS} />
                  </div>
                </Col>
                <Col xs={24} sm={24} md={12} lg={6}>
                  <div style={{ fontSize: 14 }}>Use Categories</div>
                </Col>
                <Col xs={24} sm={24} md={12} lg={6}>
                  <div className="form-field">
                    <Field
                      as="select"
                      name="POSCategories"
                      options={YES_NO_OPTIONS}
                      onChange={(n, v) => {
                        if (v === 'No') {
                          setFieldValue('POSSubCategories', 'No')
                        }

                        return setFieldValue(n, v)
                      }}
                    />
                  </div>
                </Col>
                {values.POSCategories === 'Yes' && (
                  <>
                    <Col xs={24} sm={24} md={12} lg={6}>
                      <div style={{ fontSize: 14 }}>Use Sub Categories</div>
                    </Col>
                    <Col xs={24} sm={24} md={12} lg={6}>
                      <div className="form-field">
                        <Field as="select" name="POSSubCategories" options={YES_NO_OPTIONS} />
                      </div>
                    </Col>
                  </>
                )}
                <Col xs={24} sm={24} md={12} lg={6}>
                  <div style={{ fontSize: 14 }}>POS Warehouses</div>
                </Col>
                <Col xs={24} sm={24} md={12} lg={6}>
                  <div className="form-field">
                    <Field as="select" name="POSWarehouses" options={warehouses} mode="multiple" />
                  </div>
                </Col>
                <Col xs={24} sm={24} md={12} lg={6}>
                  <div style={{ fontSize: 14 }}>Default POS Warehouse</div>
                </Col>
                <Col xs={24} sm={24} md={12} lg={6}>
                  <div className="form-field">
                    <Field as="select" name="defaultPOSWarehouse" options={defaultWarehouses} />
                  </div>
                </Col>
                <Col xs={24} sm={24} md={12} lg={6}>
                  <div style={{ fontSize: 14 }}>Default POS Return Warehouse</div>
                </Col>
                <Col xs={24} sm={24} md={12} lg={6}>
                  <div className="form-field">
                    <Field as="select" name="defaultPOSReturnWarehouse" options={defaultWarehouses} />
                  </div>
                </Col>
              </Row>
            </Panel>
            <Panel title={t('Stocks')}>
              <Row gutter={[20, 10]}>
                <Col xs={24} sm={24} md={12} lg={6}>
                  <div style={{ fontSize: 14 }}>Stock price access</div>
                </Col>
                <Col xs={24} sm={24} md={12} lg={6}>
                  <div className="form-field">
                    <Field as="select" mode="multiple" name="stockPriceAccess" options={roles} allowClear />
                  </div>
                </Col>
                <Col xs={24} sm={24} md={12} lg={6}>
                  <div style={{ fontSize: 14 }}>Additional MR Status</div>
                </Col>
                <Col xs={24} sm={24} md={12} lg={6}>
                  <div className="form-field">
                    <Field
                      as="select"
                      mode="multiple"
                      name="additionalMaterialTransferStatus"
                      options={ADDITIONAL_MATERIAL_TRANSFER_STATUS}
                      allowClear
                    />
                  </div>
                </Col>
              </Row>
            </Panel>
            <Panel title={t('Reports')}>
              <Row gutter={[20, 10]}>
                <Col xs={24} sm={24} md={12} lg={6}>
                  <div style={{ fontSize: 14 }}>Do you want to save the reports to DMS?</div>
                  <div style={{ fontSize: 14 }}>
                    <i>(If yes, reports will automatically saved to DMS)</i>
                  </div>
                </Col>
                <Col xs={24} sm={24} md={12} lg={6}>
                  <div className="form-field">
                    <Field as="select" name="saveReportsInDMS" options={YES_NO_OPTIONS} />
                  </div>
                </Col>

                <Col xs={24} sm={24} md={12} lg={6}>
                  <div style={{ fontSize: 14 }}>Do you want to use default trial balance config?</div>
                </Col>
                <Col xs={24} sm={24} md={12} lg={6}>
                  <div className="form-field">
                    <Field as="select" name="defaultTrialBalanceConfig" options={YES_NO_OPTIONS} />
                  </div>
                </Col>
              </Row>
            </Panel>
            <Panel title={t('Barcode/QR Code Scanning')}>
              <Row gutter={[20, 10]}>
                <Col xs={24} sm={24} md={12} lg={6}>
                  <div style={{ fontSize: 14 }}>Barcode Format</div>
                </Col>
                <Col xs={24} sm={24} md={12} lg={6}>
                  <div className="form-field">
                    <Field as="select" name="barcodeFormat" options={BARCODE_OPTIONS} />
                  </div>
                </Col>
                <Col xs={24} sm={24} md={12} lg={6}>
                  <div style={{ fontSize: 14 }}>Inventory Count Scan Auto Save</div>
                </Col>
                <Col xs={24} sm={24} md={12} lg={6}>
                  <div className="form-field">
                    <Field as="select" name="inventoryCountScanAutoSave" options={YES_NO_OPTIONS} />
                  </div>
                </Col>
              </Row>
              <Row gutter={[20, 10]}>
                <Col xs={24} sm={24} md={12} lg={6}>
                  <div style={{ fontSize: 14 }}>Material barcode size</div>
                </Col>
                <Col xs={24} sm={24} md={12} lg={6}>
                  <Row gutter={[20, 0]} align="middle">
                    <Col xs={24} sm={24} md={12} lg={4}>
                      <div style={{ fontSize: 14 }}>Breath</div>
                    </Col>
                    <Col xs={24} sm={24} md={12} lg={8}>
                      <div className="form-field">
                        <Field type="number" name="materialBarcodeBreath" suffix="cm" />
                      </div>
                    </Col>
                    <Col xs={24} sm={24} md={12} lg={4}>
                      <div style={{ fontSize: 14 }}>Height</div>
                    </Col>
                    <Col xs={24} sm={24} md={12} lg={8}>
                      <div className="form-field">
                        <Field type="number" name="materialBarcodeHeight" suffix="cm" />
                      </div>
                    </Col>
                  </Row>
                </Col>
                <Col xs={24} sm={24} md={12} lg={6}>
                  <div style={{ fontSize: 14 }}>Material barcode print values</div>
                </Col>
                <Col xs={24} sm={24} md={12} lg={6}>
                  <div className="form-field">
                    <Field
                      as="select"
                      mode="multiple"
                      name="materialBarcodeFields"
                      options={MATERIAL_BARCODE_FIELDS}
                    />
                  </div>
                </Col>
              </Row>
            </Panel>

            <Panel title={t('Invoice Transmission')}>
              <Row gutter={[20, 10]}>
                <Col xs={24} sm={24} md={12} lg={3}>
                  <div style={{ fontSize: 14 }}>Do you want to transmit invoice?</div>
                </Col>
                <Col xs={24} sm={24} md={12} lg={3}>
                  <div className="form-field">
                    <Field as="select" name="invoiceTransmission" options={YES_NO_OPTIONS} />
                  </div>
                </Col>
                <Col xs={24} sm={24} md={12} lg={3}>
                  <div style={{ fontSize: 14 }}>Transmission Type</div>
                </Col>
                <Col xs={24} sm={24} md={12} lg={3}>
                  <div className="form-field">
                    <Field
                      as="select"
                      name="invoiceTransmissionType"
                      options={INVOICE_TRANSMISSION_TYPE_OPTIONS}
                      disabled={values.invoiceTransmission !== 'Yes'}
                      allowClear
                    />
                  </div>
                </Col>

                <Col xs={24} sm={24} md={12} lg={3}>
                  <div style={{ fontSize: 14 }}>Transmission Endpoint</div>
                </Col>
                <Col xs={24} sm={24} md={12} lg={9}>
                  <div className="form-field">
                    <Field
                      name="invoiceTransmissionEndpoint"
                      disabled={values.invoiceTransmission !== 'Yes'}
                    />
                  </div>
                </Col>
              </Row>
            </Panel>
          </PanelLayout>

          <div className="save-changes">
            <Button type="submit" variant="primary">
              Update
            </Button>
          </div>
        </Col>
      </Row>
    </Form>
  )
}

export default withFormik({
  mapPropsToValues: ({ companyInfo: { configurations = {} } = {} }) => ({
    division: configurations?.division || 'No',
    costCenter: configurations?.costCenter || 'No',
    timeEntryFutureDate: configurations?.timeEntryFutureDate || 'No',
    incomeInvoiceApprover: configurations?.incomeInvoiceApprover || [],
    expenseInvoiceApprover: configurations?.expenseInvoiceApprover || [],
    manualIncomeInvoiceNo: configurations?.manualIncomeInvoiceNo || '',
    manualExpenseInvoiceNo: configurations?.manualExpenseInvoiceNo || '',
    incomeAdditionalFields: configurations?.incomeAdditionalFields || [],
    fieldsToTranslate: configurations?.fieldsToTranslate || [],
    expenseAdditionalFields: configurations?.expenseAdditionalFields || [],
    approvedIncomeCancellation: configurations?.approvedIncomeCancellation || '',
    approvedExpenseCancellation: configurations?.approvedExpenseCancellation || '',
    incomeDivisionLevel: configurations?.incomeDivisionLevel || 'Header',
    expenseDivisionLevel: configurations?.expenseDivisionLevel || 'Header',
    stockReductionInInvoice: configurations?.stockReductionInInvoice || 'No',
    stockAdditionInExpense: configurations?.stockAdditionInExpense || 'No',
    POSInvoice: configurations?.POSInvoice || '',
    invoiceDueDateWhenEmailSent: configurations?.invoiceDueDateWhenEmailSent || 'No',
    warehouseLocations: configurations?.warehouseLocations || '',
    warehouseRacks: configurations?.warehouseRacks || '',
    deliveryBasedOnSales: configurations?.deliveryBasedOnSales || '',
    jobBasedOnSales: configurations?.jobBasedOnSales || 'No',
    quotaionAdditionalFields: configurations?.quotaionAdditionalFields || [],
    salesOrderAdditionalFields: configurations?.salesOrderAdditionalFields || [],
    purchaseOrderAdditionalFields: configurations?.purchaseOrderAdditionalFields || [],
    saveReportsInDMS: configurations?.saveReportsInDMS || 'No',
    defaultTrialBalanceConfig: configurations?.defaultTrialBalanceConfig || 'Yes',
    wholeSaleAndRetailPrice: configurations?.wholeSaleAndRetailPrice || 'No',
    pickOrder: configurations?.pickOrder || 'No',
    deliveryByInventory: configurations?.deliveryByInventory || 'No',
    receiptBasedOnPurchase: configurations?.receiptBasedOnPurchase || 'No',
    barcodeFormat: configurations?.barcodeFormat || 'CODE39',
    POSUsage: configurations?.POSUsage || '',
    POSCategories: configurations?.POSCategories || 'No',
    POSSubCategories: configurations?.POSSubCategories || 'No',
    POSWarehouses: configurations?.POSWarehouses || [],
    defaultPOSWarehouse: configurations?.defaultPOSWarehouse || '',
    defaultPOSReturnWarehouse: configurations?.defaultPOSReturnWarehouse || '',
    stockPriceAccess: configurations?.stockPriceAccess || [],
    invoiceTransmission: configurations?.invoiceTransmission || 'No',
    invoiceTransmissionType: configurations?.invoiceTransmissionType || '',
    invoiceTransmissionEndpoint: configurations?.invoiceTransmissionEndpoint || '',
    inventoryCountScanAutoSave: configurations?.inventoryCountScanAutoSave || 'No',
    freeOfCost: configurations?.freeOfCost || 'No',
    materialBarcodeBreath: configurations?.materialBarcodeBreath || '',
    materialBarcodeHeight: configurations?.materialBarcodeHeight || '',
    materialBarcodeFields: configurations?.materialBarcodeFields || [],
    additionalMaterialTransferStatus: configurations?.additionalMaterialTransferStatus || []
  }),
  validationSchema: Schema,
  handleSubmit: (data, { props: { userInfo, dispatch } }) => {
    if (userInfo.company) {
      apiClient
        .put(`companies/update/${userInfo.company}`, { configurations: removeEmptyKeys(data) })
        .then(({ data }) => {
          if (data && data.result) {
            dispatch({ type: 'SET_USER_REDUCER', payload: { companyInfo: data.result } })
            message.success('Configurations Updated')
          }
        })
    }
  }
})(CompanyConfigurations)
