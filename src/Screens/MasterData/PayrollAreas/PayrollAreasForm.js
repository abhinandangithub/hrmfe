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

function PayrollAreasForm({
  setValues,
  match: {
    params: { id }
  },
  history
}) {
  const fetchData = () => {
    if (id) {
      apiClient
        .get(`payroll-area/${id}`)
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
  const { t } = useTranslation()

  useEffect(() => {
    if (id) {
      fetchData()
    }
    fetchDropdownValues()
  }, [id])

  const [options, setOptions] = useState({})

  const fetchDropdownValues = () => {
    apiClient
      .get('options/get-by-types', {
        params: { type: 'PayrollArea' }
      })
      .then(({ data }) => {
        if (data && data.result) {
          setOptions(data.result)
        }
      })
  }

  return (
    <Form>
      <Row justify="center" className="inner-contents">
        <Col xs={{ span: 22 }} sm={{ span: 22 }} md={{ span: 20 }} lg={{ span: 22 }}>
          <PanelLayout title={t('PAYROLL AREAS')}>
            <Panel title={t('PAYROLL AREAS DETAILS')}>
              <Row gutter={[20, 10]}>
                <Col xs={12} md={8} lg={4}>
                  <div className="form-field">
                    <Field as="date" name="validFrom" label="Valid From" />
                  </div>
                </Col>
                <Col xs={12} md={8} lg={4}>
                  <div className="form-field">
                    <Field as="date" name="validTo" label="Valid To" />
                  </div>
                </Col>
                <Col xs={12} md={8} lg={4}>
                  <div className="form-field">
                    <Field name="payrollAreaId" label="Payroll Area Id" />
                  </div>
                </Col>
                <Col xs={12} md={8} lg={4}>
                  <div className="form-field">
                    <Field
                      name="payrollAreaName"
                      label="Payroll Area Name"
                      as="select"
                      options={options.PayrollArea}
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
    .required('Please select a valid to date')
})

export default withFormik({
  mapPropsToValues: () => ({
    validFrom: '',
    validTo: '',
    payrollAreaId: '',
    payrollAreaName: ''
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
        .put(`payroll-area/${id}`, values)
        .then(({ data }) => {
          console.log('PUT response data:', data) // Log the response data

          if (data && data.result) {
            message.success('Pay Updated Successfully')
            history('/app/payroll-areas')
          } else {
            message.error('Failed to update Payroll area')
          }
        })
        .catch((error) => {
          message.error('Failed to update PAy')
          console.error('Error updating data:', error)
        })
    } else {
      apiClient
        .post('payroll-area', values)
        .then(({ data }) => {
          if (data && data.result) {
            message.success('Pay Added Successfully')
            history('/app/payroll-areas')
          } else {
            message.error('Failed to add Payroll Area')
          }
        })
        .catch((error) => {
          message.error('Failed to add Payroll Area')
          console.error('Error adding data:', error)
        })
    }
  }
})(PayrollAreasForm)
