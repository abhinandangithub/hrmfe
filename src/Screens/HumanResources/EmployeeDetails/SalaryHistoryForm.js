import { Col, Row } from 'antd'
import { withTranslation } from 'react-i18next'
import { Field, Form } from '../../../Components/Formik'

const SalaryHistoryForm = (props) => {
  const CATEGORY_OPTIONS = [
    { label: props.t('Basic salary'), value: 'Basic salary' },
    { label: props.t('Housing Allowance'), value: 'Housing Allowance' },
    { label: props.t('Transportation Allowance'), value: 'Transportation Allowance' },
    { label: props.t('Food Allowance'), value: 'Food Allowance' }
  ]

  const TYPE_OPTIONS = [
    { label: props.t('Gross Salary'), value: 'Gross Salary' },
    { label: props.t('OT Rate'), value: 'OT Rate' },
    { label: props.t('Others'), value: 'Others' }
  ]
  return (
    <Form>
      <Row justify="left" gutter={(12, 10)}>
        <Col xs={24} sm={24} md={24} lg={12}>
          <div className="form-field">
            <Field name="from" label={props.t('From Date')} as="date" />
          </div>
        </Col>
        <Col xs={24} sm={24} md={24} lg={12}>
          <div className="form-field">
            <Field name="to" label={props.t('To Date')} as="date" />
          </div>
        </Col>
        <Col xs={24} sm={24} md={24} lg={12}>
          <div className="form-field">
            <Field name="category" label={props.t('Category')} as="select" options={CATEGORY_OPTIONS} />
          </div>
        </Col>
        <Col xs={24} sm={24} md={24} lg={12}>
          <div className="form-field">
            <Field name="type" label={props.t('Type')} as="select" options={TYPE_OPTIONS} />
          </div>
        </Col>
        <Col xs={24} sm={24} md={24} lg={12}>
          <div className="form-field">
            <Field name="payGrade" label={props.t('Pay Grade')} />
          </div>
        </Col>
        <Col xs={24} sm={24} md={12} lg={12}>
          <div className="form-field">
            <Field name="currency" label={props.t('Currency')} />
          </div>
        </Col>
        <Col xs={24} sm={24} md={12} lg={12}>
          <div className="form-field">
            <Field name="annualBasicPay" label={props.t('Annual Basic Payment')} />
          </div>
        </Col>
        <Col xs={24} sm={24} md={12} lg={12}>
          <div className="form-field">
            <Field name="earnings" label={props.t('Earnings')} />
          </div>
        </Col>
        <Col xs={24} sm={24} md={12} lg={12}>
          <div className="form-field">
            <Field name="deductions" label={props.t('Deductions')} type="number" />
          </div>
        </Col>
        <Col xs={24} sm={24} md={12} lg={12}>
          <div className="form-field">
            <Field name="comment" label={props.t('Comment')} as="textarea" />
          </div>
        </Col>
      </Row>
    </Form>
  )
}

export default withTranslation()(SalaryHistoryForm)
// withFormik({
//   mapPropsToValues: () => ({
//     payGrade: '',
//     annualBasicPay: '',
//     currency: '',
//     earnings: '',
//     comment: '',
//     deductions: ''
//   }),
//   handleSubmit: () => null,
//   validationSchema: Schema
// })(SalaryHistoryForm)
