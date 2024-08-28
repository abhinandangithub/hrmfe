import { withFormik } from 'formik'
import _ from 'lodash'
import { useEffect } from 'react'
import * as Yup from 'yup'
import { Field, Form } from '../../Components/Formik'
import ModalBox from '../../Components/ModalBox/ModalBox'
import { STATUS, YES_NO_OPTIONS } from '../../Util/Options'
import { convertSelectOptions } from '../../Util/Util'

const Schema = Yup.object().shape({
  name: Yup.string().required(),
  description: Yup.string().required(),
  for: Yup.string().required(),
  default: Yup.string().required(),
  mode: Yup.string().required(),
  status: Yup.string().required()
})

const MODE_OPTIONS = [
  { label: 'Drag And Drop', value: 'DragAndDrop' },
  { label: 'HTML', value: 'HTML' }
]

const DEFAULT_TEMPLATES = [
  { label: 'Default Daily Payroll', value: 'defaultPayrollDailyTemplate', type: 'Payroll' },
  { label: 'Default Monthly Payroll', value: 'defaultPayrollMonthlyTemplate', type: 'Payroll' },
  { label: 'Default Income', value: 'defaultIncomeInvoiceTemplate', type: 'Invoice' },
  { label: 'Default Expense', value: 'defaultExpenseInvoiceTemplate', type: 'Invoice' },
  { label: 'Default Timesheet', value: 'defaultTimesheetTemplate', type: 'Timesheet' },
  { label: 'Default Client Timesheet', value: 'defaultClientTimesheetTemplate', type: 'Timesheet' },
  { label: 'Default Sales Order', value: 'defaultSalesOrderTemplate', type: 'Logistic' },
  { label: 'Default Sales Quotation', value: 'defaultSalesQuotationTemplate', type: 'Logistic' },
  { label: 'Default Open Sales Order', value: 'defaultOpenSalesOrderTemplate', type: 'Logistic' },
  { label: 'Default Purchase Order', value: 'defaultPurchaseOrderTemplate', type: 'Logistic' },
  { label: 'Default Open Purchase Order', value: 'defaultOpenPurchaseOrderTemplate', type: 'Logistic' },
  { label: 'Default Custom Clearance', value: 'defaultCustomClearanceTemplate', type: 'Logistic' },
  { label: 'Default Job Order', value: 'defaultJobOrder', type: 'Logistic' }
]

const LOGISTIC_FOR_OPTIONS = [
  { label: 'Sales Order', value: 'Sales Order' },
  { label: 'Sales Quotation', value: 'Sales Quotation' },
  { label: 'Open Sales Order', value: 'Open Sales Order' },
  { label: 'Purchase Order', value: 'Purchase Order' },
  { label: 'Open Purchase Order', value: 'Open Purchase Order' },
  { label: 'Custom Clearance', value: 'Custom Clearance' },
  { label: 'Sales Delivery', value: 'Sales Delivery' },
  { label: 'Delivery Return', value: 'Delivery Return' },
  { label: 'Goods Receipt', value: 'Goods Receipt' },
  { label: 'Goods Return', value: 'Goods Return' },
  { label: 'Purchase Request', value: 'Purchase Request' },
  { label: 'Sales Return', value: 'Sales Return' },
  { label: 'Purchase Return', value: 'Purchase Return' },
  { label: 'Job Order', value: 'Job Order' },
  { label: 'Lead Proposal', value: 'Lead Proposal' },
  { label: 'Pick Order', value: 'Pick Order' },
  { label: 'Material Request/ Return', value: 'Material Transfer' }
]

const FREIGHT_FOR_OPTIONS = [
  { label: 'Offer', value: 'Offer' },
  { label: 'Booking', value: 'Booking' },
  { label: 'Job Creation', value: 'Job Creation' }
]

const FINANCE_FOR_OPTIONS = [
  { label: 'Invoice', value: 'Invoice' },
  { label: 'Simplified Invoice', value: 'Simplified-Invoice' },
  { label: 'Credit-Note', value: 'Credit-Note' },
  { label: 'Simplified Credit Note', value: 'Simplified-Credit-Note' },
  { label: 'Expense', value: 'Expense' },
  { label: 'Debit-Note', value: 'Debit-Note' },
  { label: 'Direct-Receipt', value: 'Direct-Receipt' },
  { label: 'Direct-Expense', value: 'Direct-Expense' },
  { label: 'Invoice-Receipt', value: 'Invoice-Receipt' },
  { label: 'Expense-Payment', value: 'Expense-Payment' },
  { label: 'POS-Invoice', value: 'POSInvoice' },
  { label: 'Proforma-Invoice', value: 'Proforma-Invoice' }
]

const SERVICE_FOR_OPTIONS = [{ label: 'Timesheet', value: 'Timesheet' }]

const PAYROLL_FOR_OPTIONS = [{ label: 'Timesheet', value: 'Timesheet' }]

function TemplateForm(props) {
  const {
    edit,
    activeTab,
    submitForm,
    validateForm,
    values,
    onAdd,
    open,
    onCancel,
    templates,
    resetForm,
    setValues
  } = props

  const onSubmitForm = async () => {
    await submitForm()
    validateForm().then((err) => {
      if (_.isEmpty(err)) {
        onAdd(values)
        resetForm()
      }
    })
  }

  useEffect(() => {
    if (edit) {
      setValues(edit)
    }
  }, [])
  const defaultOption = DEFAULT_TEMPLATES.filter((val) => val.type === activeTab)

  const getForOptions = () => {
    switch (props.type) {
      case 'Service':
        return SERVICE_FOR_OPTIONS
      case 'Logistic':
        return LOGISTIC_FOR_OPTIONS
      case 'Freight':
        return FREIGHT_FOR_OPTIONS
      case 'Finance':
        return FINANCE_FOR_OPTIONS
      case 'Payroll':
        return PAYROLL_FOR_OPTIONS
      default:
        return []
    }
  }

  return (
    <ModalBox
      className="add-new-report"
      title={`Add ${props.type} Template`}
      visible={open}
      onOk={onSubmitForm}
      okText={edit ? 'Update' : 'Add'}
      onCancel={() => {
        onCancel(false)
        resetForm()
      }}>
      <Form>
        <div className="form-fields">
          <Field name="name" label="Name" />
        </div>
        <div className="form-fields">
          <Field name="description" label="Description" />
        </div>
        <div className="form-fields">
          <Field name="for" label="For" as="select" options={getForOptions()} />
        </div>
        <div className="form-fields">
          <Field name="mode" label="Mode" as="select" options={MODE_OPTIONS} />
        </div>
        <div className="form-fields">
          <Field name="default" label="Default" as="select" options={YES_NO_OPTIONS} allowClear />
        </div>
        {!edit && (
          <div className="form-fields">
            <Field
              name="copyFrom"
              label="Copy from"
              as="select"
              options={[...defaultOption, ...convertSelectOptions(templates, 'name', 'id')]}
            />
          </div>
        )}
        <div className="form-fields">
          <Field name="status" label="Status" as="select" options={STATUS} />
        </div>
      </Form>
    </ModalBox>
  )
}

export default withFormik({
  mapPropsToValues: () => ({
    name: '',
    description: '',
    copyFrom: '',
    for: '',
    mode: '',
    default: 'No',
    status: 'Active'
  }),
  handleSubmit: () => null,
  validationSchema: Schema
})(TemplateForm)
