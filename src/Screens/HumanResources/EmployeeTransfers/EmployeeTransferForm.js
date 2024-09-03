import { Col, Row } from 'antd'
import { withFormik } from 'formik'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate  } from 'react-router-dom'
import * as Yup from 'yup'
import FooterActions from '../../../Components/FooterActions'
import { Field, Form } from '../../../Components/Formik'
import Panel from '../../../Layout/Panel'
import PanelLayout from '../../../Layout/PanelLayout'
import apiClient from '../../../Util/apiClient'
import { EMPLOYEE_TRANSER_TYPES } from '../../../Util/Options'

const Schema = Yup.object().shape({
  employee: Yup.string().required(),
  date: Yup.string().required(),
  transferType: Yup.string().required(),
  division: Yup.string().required(),
  department: Yup.string().required()
})

function EmployeeTransferForm({
  setValues,
  setFieldValue,
  values,
  match: {
    params: { id }
  },
  submitForm
}) {
  const history = useNavigate()
  const { t } = useTranslation()

  const getData = () => {
    if (id) {
      apiClient.get(`employee-transfers/get/${id}`).then(({ data }) => {
        if (data && data.result) {
          setValues({ ...values, ...data.result })
        }
      })
    }
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <Form>
      <Row justify="center" className="inner-contents">
        <Col xs={{ span: 22 }} sm={{ span: 22 }} md={{ span: 20 }} lg={{ span: 20 }}>
          <PanelLayout title={t('Employee Transfer')}>
            <Panel title={t('Transfer Details')}>
              <Row gutter={[20, 10]}>
                <Col xs={24} sm={24} md={12} lg={8}>
                  <div className="form-field">
                    <Field
                      name="employee"
                      label="Employee"
                      as="paged-select"
                      endPoint="employees/get-active"
                      onChange={(n, v, o) => {
                        setFieldValue('previousDivision', o?.division)
                        setFieldValue('previousDepartment', o?.department)
                        setFieldValue('previousGrade', o?.grade)
                        setFieldValue('previousDesignation', o?.designation)
                        setFieldValue('previousCostCenter', o?.costCenter)

                        return setFieldValue(n, v)
                      }}
                      disabled={values.status === 'Transfered'}
                    />
                  </div>
                </Col>
                <Col xs={24} sm={24} md={12} lg={8}>
                  <div className="form-field">
                    <Field
                      name="date"
                      label="Transfer Date"
                      as="date"
                      disabled={values.status === 'Transfered'}
                    />
                  </div>
                </Col>
                <Col xs={24} sm={24} md={12} lg={8}>
                  <div className="form-field">
                    <Field
                      name="transferType"
                      label="Transfer Type"
                      as="select"
                      options={EMPLOYEE_TRANSER_TYPES}
                      disabled={values.status === 'Transfered'}
                    />
                  </div>
                </Col>
                <Col xs={24} sm={24} md={12} lg={8}>
                  <div className="form-field">
                    <Field
                      name="startDate"
                      label="Start Date"
                      as="date"
                      disabled={values.status === 'Transfered'}
                    />
                  </div>
                </Col>
                <Col xs={24} sm={24} md={12} lg={8}>
                  <div className="form-field">
                    <Field
                      name="endDate"
                      label="End Date"
                      as="date"
                      disabled={values.status === 'Transfered'}
                    />
                  </div>
                </Col>
                <Col xs={24} sm={24} md={12} lg={8}>
                  <div className="form-field">
                    <Field name="reason" label="Reason" disabled={values.status === 'Transfered'} />
                  </div>
                </Col>
              </Row>
            </Panel>

            <Panel title={t('Transfer From')}>
              <Row gutter={[20, 10]}>
                <Col xs={24} sm={24} md={12} lg={8}>
                  <div className="form-field">
                    <Field
                      name="previousDivision"
                      label="Division"
                      as="paged-select"
                      endPoint="divisions/get-active"
                      disabled
                    />
                  </div>
                </Col>
                <Col xs={24} sm={24} md={12} lg={8}>
                  <div className="form-field">
                    <Field
                      name="previousDepartment"
                      label="Department"
                      as="paged-select"
                      endPoint="department/get-active"
                      disabled
                    />
                  </div>
                </Col>
                <Col xs={24} sm={24} md={12} lg={8}>
                  <div className="form-field">
                    <Field
                      name="previousGrade"
                      label="Grade"
                      as="paged-select"
                      endPoint="grades/get-active"
                      disabled
                    />
                  </div>
                </Col>
                <Col xs={24} sm={24} md={12} lg={8}>
                  <div className="form-field">
                    <Field
                      name="previousDesignation"
                      label="Designation"
                      as="paged-select"
                      endPoint="designations/get-active"
                      disabled
                    />
                  </div>
                </Col>
                <Col xs={24} sm={24} md={12} lg={8}>
                  <div className="form-field">
                    <Field
                      name="previousCostCenter"
                      label="Cost Center"
                      as="paged-select"
                      endPoint="cost-centers/get-active"
                      disabled
                    />
                  </div>
                </Col>
              </Row>
            </Panel>
            <Panel title={t('Transfer To')}>
              <Row gutter={[20, 10]}>
                <Col xs={24} sm={24} md={12} lg={8}>
                  <div className="form-field">
                    <Field
                      name="division"
                      label="Division"
                      as="paged-select"
                      endPoint="divisions/get-active"
                      disabled={values.status === 'Transfered'}
                    />
                  </div>
                </Col>
                <Col xs={24} sm={24} md={12} lg={8}>
                  <div className="form-field">
                    <Field
                      name="department"
                      label="Department"
                      as="paged-select"
                      endPoint="department/get-active"
                      disabled={values.status === 'Transfered'}
                    />
                  </div>
                </Col>
                <Col xs={24} sm={24} md={12} lg={8}>
                  <div className="form-field">
                    <Field name="grade" label="Grade" as="paged-select" endPoint="grades/get-active" />
                  </div>
                </Col>
                <Col xs={24} sm={24} md={12} lg={8}>
                  <div className="form-field">
                    <Field
                      name="designation"
                      label="Designation"
                      as="paged-select"
                      endPoint="designations/get-active"
                      disabled={values.status === 'Transfered'}
                    />
                  </div>
                </Col>
                <Col xs={24} sm={24} md={12} lg={8}>
                  <div className="form-field">
                    <Field
                      name="costCenter"
                      label="Cost Center"
                      as="paged-select"
                      endPoint="cost-centers/get-active"
                      disabled={values.status === 'Transfered'}
                    />
                  </div>
                </Col>
              </Row>
            </Panel>
          </PanelLayout>

          <FooterActions
            leftActions={[
              {
                prefix: 'flaticon-delete',
                label: 'Cancel',
                onClick: () => {
                  history('/app/employee-transfers')
                }
              }
            ]}
            centerActions={[
              {
                prefix: 'flaticon-teamwork',
                label: id ? 'Update' : 'Save',
                onClick: () => submitForm(),
                dontShow: values.status === 'Transfered'
              }
            ]}
            rightActions={[
              {
                prefix: 'flaticon-teamwork',
                label: id ? 'Update & Tranfer' : 'Save & Transfer',
                onClick: () => {
                  setFieldValue('completeTransfer', 'Yes')
                  submitForm()
                },
                dontShow: values.status === 'Transfered'
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
    employee: '',
    date: '',
    transferType: '',
    startDate: '',
    endDate: '',
    reason: '',
    division: null,
    department: null,
    designation: null,
    grade: null,
    costCenter: null,

    previousDivision: null,
    previousDepartment: null,
    previousDesignation: null,
    previousGrade: null,
    previousCostCenter: null
  }),
  validationSchema: Schema,
  handleSubmit: (
    data,
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
      apiClient.put(`employee-transfers/update/${id}`, data).then(({ data }) => {
        if (data && data.result) {
          history('/app/employee-transfers')
        }
      })
    } else {
      apiClient.post('employee-transfers/add', data).then(({ data }) => {
        if (data && data.result) {
          history('/app/employee-transfers')
        }
      })
    }
  }
})(EmployeeTransferForm)
