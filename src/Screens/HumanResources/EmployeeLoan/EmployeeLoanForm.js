import { Col, Row } from 'antd'
import { withFormik } from 'formik'
import moment from 'moment'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import FooterActions from '../../../Components/FooterActions'
import { Field, Form } from '../../../Components/Formik'
import useDidUpdateEffect from '../../../Hooks/useDidUpdateEffect'
import PanelLayout from '../../../Layout/PanelLayout'
import { history } from '../../../Routes'
import apiClient from '../../../Util/apiClient'

function EmployeeLoanForm({
  setValues,
  values,
  setFieldValue,

  match: {
    params: { id }
  }
}) {
  const [employeeLoan, setEmployeeLoan] = useState([])

  const { t } = useTranslation()

  const getData = () => {
    if (id) {
      apiClient.get(`loan/get/${id}`).then(({ status, data }) => {
        if (status === 200) {
          setValues({ ...values, ...data.result })
        }
      })
    }

    apiClient.get('employees/get-active').then(({ status, data }) => {
      if (status === 200) {
        console.log('data', data)
        setEmployeeLoan(
          data.result.map((item) => ({
            label: item.employeeNo,
            value: item.user,
            ...item
          }))
        )
      }
    })
  }

  useEffect(() => {
    getData()
  }, [])

  useDidUpdateEffect(() => {
    if (values.amount && values.repaymentPeriod) {
      setFieldValue(
        'deductionPerMonth',
        (parseFloat(values.amount) || '') / (parseInt(values.repaymentPeriod, 10) || 1)
      )
    }
  }, [values.amount, values.repaymentPeriod])

  useDidUpdateEffect(() => {
    setFieldValue('balance', (parseFloat(values.amount) || 0) - (parseFloat(values.deducted) || 0))
  }, [values.amount, values.deducted])

  return (
    <Form className="employee-loan-form">
      <Row justify="center" className="inner-contents">
        <Col xs={22}>
          <PanelLayout title={t('Loan Record information')}>
            <Row gutter={[20, 10]}>
              <Col xs={24}>
                <Row gutter={[20, 10]}>
                  <Col xs={12} md={12} lg={8}>
                    <div className="form-field">
                      <Field name="employeeId" label="Employee No" as="select" options={employeeLoan} />
                    </div>
                  </Col>
                  <Col xs={24} md={12} lg={8}>
                    <div className="form-field">
                      <Field
                        name="employeeName"
                        label="Employee Name"
                        as="paged-select"
                        endPoint="users/get-active-by-company"
                        optionValue="user"
                        value={employeeLoan.find((item) => item.user === values.employeeId)?.name}
                      />
                    </div>
                  </Col>
                  <Col xs={24} md={12} lg={8}>
                    <div className="form-field">
                      <Field
                        name="roles"
                        label="Roles"
                        disabled
                        value={employeeLoan.find((item) => item.user === values.employeeId)?.roleData?.name}
                      />
                    </div>
                  </Col>

                  <Col xs={24} md={12} lg={8}>
                    <div className="form-field">
                      <Field
                        as="select"
                        name="type"
                        label="Type"
                        options={[
                          { label: 'Loan', value: 'Loan' },
                          { label: 'Advanced', value: 'Advanced' }
                        ]}
                      />
                    </div>
                  </Col>

                  <Col xs={24} md={12} lg={8}>
                    <div className="form-field">
                      <Field name="amount" label="Loan Amount" />
                    </div>
                  </Col>
                  <Col xs={24} md={12} lg={8}>
                    <div className="form-field">
                      <Field name="repaymentPeriod" label="Repayment Period (months)" />
                    </div>
                  </Col>

                  <Col xs={12} md={12} lg={8}>
                    <div className="form-field">
                      <Field name="deductionPerMonth" label="Deduction Per Month" disabled />
                    </div>
                  </Col>
                  <Col xs={24} md={12} lg={8}>
                    <div className="form-field">
                      <Field
                        name="paidOn"
                        label="Loan Disbursed on"
                        as="date"
                        onChange={(n, v) => {
                          setFieldValue('repaymentStartsOn', moment(v).add(1, 'month').startOf('month'))
                          setFieldValue(n, v)
                        }}
                      />
                    </div>
                  </Col>
                  <Col xs={24} md={12} lg={8}>
                    <div className="form-field">
                      <Field name="repaymentStartsOn" label="Repayment Starts On" type="number" as="date" />
                    </div>
                  </Col>

                  <Col xs={24} md={12} lg={8}>
                    <div className="form-field">
                      <Field name="deducted" label="Deducted So Far" />
                    </div>
                  </Col>

                  <Col xs={24} md={12} lg={8}>
                    <div className="form-field">
                      <Field name="balance" label="Balance" disabled />
                    </div>
                  </Col>
                </Row>
              </Col>
            </Row>
          </PanelLayout>
          <FooterActions
            leftActions={[
              {
                prefix: 'flaticon-back',
                label: 'Back',
                onClick: () => history.goBack()
              }
            ]}
            centerActions={[
              {
                prefix: 'flaticon-writing',
                label: id ? 'Update' : 'Save',
                type: 'submit'
              }
            ]}
            rightActions={[
              {
                prefix: 'flaticon-security',
                label: `${id ? 'Update' : 'Save'} & Post`
              }
            ]}
          />
        </Col>
      </Row>
    </Form>
  )
}

export default withFormik({
  mapPropsToValues: () => ({
    employeeId: '',
    employeeName: '',
    roles: '',
    amount: '',
    type: '',
    repaymentPeriod: '',
    deducted: 0,
    paidOn: '',
    repaymentStartsOn: '',
    deductedSoFar: 0,
    balance: 0
  }),

  handleSubmit: (
    values,
    {
      props: {
        match: {
          params: { id }
        },
        history
      }
    }
  ) => {
    if (id) {
      apiClient.put(`loan/update/${id}`, values).then(({ status }) => {
        if (status === 200) {
          history.push('/app/employee-loans')
        }
      })
    } else {
      apiClient.post('loan/add', values).then(({ status, data }) => {
        if (status === 200) {
          console.log('data', data.result)
          history.push('/app/employee-loans/')
        }
      })
    }
  }
})(EmployeeLoanForm)
