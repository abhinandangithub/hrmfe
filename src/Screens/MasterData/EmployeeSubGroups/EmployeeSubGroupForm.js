import { Col, message, Row } from 'antd'
import { withFormik } from 'formik'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import FooterActions from '../../../Components/FooterActions'
import { Field, Form } from '../../../Components/Formik'
import Panel from '../../../Layout/Panel'
import PanelLayout from '../../../Layout/PanelLayout'
import apiClient from '../../../Util/apiClient'
import Yup from '../../../Util/YupMethod'

function EmployeeSubGroupForm({
  values,
  setValues,
  match: {
    params: { id }
  },
  history
}) {
  const [employeeGroupOptions, setEmployeeGroupOptions] = useState([])

  const fetchEmployeeGroups = async () => {
    try {
      const { data } = await apiClient.get('employee-groups')
      if (data?.result) {
        setEmployeeGroupOptions(
          data.result.map((group) => ({
            label: group.employeeGroupId,
            value: group.employeeGroupId
          }))
        )
      }
    } catch (error) {
      console.error('Error fetching employee groups:', error)
    }
  }

  const fetchData = () => {
    if (id) {
      apiClient
        .get(`employee-sub-groups/${id}`)
        .then(({ data }) => {
          if (data && data.result) {
            setValues(data.result)
          }
        })
        .catch((error) => {
          console.error('Error fetching data:', error)
        })
    }
  }

  const [options, setOptions] = useState({})

  const fetchDropdownValues = () => {
    apiClient
      .get('options/get-by-types', {
        params: { type: 'EmployeeSubGroup' }
      })
      .then(({ data }) => {
        if (data && data.result) {
          setOptions(data.result)
        }
      })
  }

  const { t } = useTranslation()

  useEffect(() => {
    fetchEmployeeGroups()
    if (id) {
      fetchData()
    }
    fetchDropdownValues()
  }, [id])

  return (
    <Form>
      <Row justify="center" className="inner-contents">
        <Col xs={{ span: 22 }} sm={{ span: 22 }} md={{ span: 20 }} lg={{ span: 22 }}>
          <PanelLayout title={t('EMPLOYEE SUB GROUP')}>
            <Panel title={t('EMPLOYEE SUB GROUP DETAILS')}>
              <Row gutter={[20, 10]}>
                <Col xs={12} md={8} lg={4}>
                  <div className="form-field">
                    <Field
                      as="date"
                      name="validFrom"
                      label="Valid From"
                      placeholder="Valid From"
                      disabledDate={(d) => !d || d.isAfter(values.validTo)}
                      format="YYYY-MM-DD"
                    />
                  </div>
                </Col>

                <Col xs={12} md={8} lg={4}>
                  <div className="form-field">
                    <Field
                      as="date"
                      name="validTo"
                      label="Valid To"
                      placeholder="Valid To"
                      disabledDate={(d) => !d || d.isBefore(values.validFrom)}
                      format="YYYY-MM-DD"
                    />
                  </div>
                </Col>

                <Col xs={12} md={8} lg={4}>
                  <div className="form-field">
                    <Field
                      name="employeeGroupId"
                      label="Employee Group Id"
                      as="select"
                      options={employeeGroupOptions}
                    />
                  </div>
                </Col>

                <Col xs={12} md={8} lg={4}>
                  <div className="form-field">
                    <Field name="employeeSubGroupId" label="Employee Sub Group Id" />
                  </div>
                </Col>

                <Col xs={12} md={8} lg={4}>
                  <div className="form-field">
                    <Field
                      name="employeeSubGroupText"
                      label="Employee Sub Group Text"
                      as="select"
                      options={options.EmployeeSubGroup}
                    />
                  </div>
                </Col>
              </Row>
            </Panel>
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
          />
        </Col>
      </Row>
    </Form>
  )
}

const Schema = Yup.object().shape({
  validFrom: Yup.date()
    .max(Yup.ref('validTo'), 'Should not exceed valid to date')
    .required('Please select a valid from date'),
  validTo: Yup.date()
    .min(Yup.ref('validFrom'), 'Should not be less than valid from date')
    .required('Please select a valid to date')
})

export default withFormik({
  mapPropsToValues: () => ({
    validFrom: '',
    validTo: '',
    employeeGroupId: '',
    employeeSubGroupId: '',
    employeeSubGroupText: ''
  }),
  validationSchema: Schema,
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
      apiClient
        .put(`employee-sub-groups/${id}`, values)
        .then(({ data }) => {
          console.log('PUT response data:', data) // Log the response data

          if (data && data.result) {
            message.success('Employee Sub Group Updated Successfully')
            history('/app/employee-sub-groups')
          } else {
            message.error('Failed to update Employee Sub Group')
          }
        })
        .catch((error) => {
          message.error('Failed to update Employee Sub Group')
          console.error('Error updating data:', error)
        })
    } else {
      apiClient
        .post('employee-sub-groups', values)
        .then(({ data }) => {
          if (data && data.result) {
            message.success('Employee Sub Group Added Successfully')
            history('/app/employee-sub-groups')
          } else {
            message.error('Failed to add Employee Sub Group')
          }
        })
        .catch((error) => {
          message.error('Failed to add Employee Sub Group')
          console.error('Error adding data:', error)
        })
    }
  }
})(EmployeeSubGroupForm)
