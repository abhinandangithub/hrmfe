import { Col, message, Row } from 'antd'
import { withFormik } from 'formik'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import FooterActions from '../../../Components/FooterActions'
import { Field, Form } from '../../../Components/Formik'
import Panel from '../../../Layout/Panel'
import PanelLayout from '../../../Layout/PanelLayout'
import apiClient from '../../../Util/apiClient'

function MaritalStatusForm({
  setValues,
  match: {
    params: { id }
  },
  history
}) {
  const fetchData = () => {
    if (id) {
      apiClient
        .get(`marital-status/${id}`)
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
        params: { type: 'MaritalStatus' }
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
          <PanelLayout title={t('MARITAL STATUS')}>
            <Panel title={t('MARITAL STATUS DETAILS')}>
              <Row gutter={[20, 10]}>
                <Col xs={12} md={8} lg={4}>
                  <div className="form-field">
                    <Field name="maritalStatusId" label="Marital Status ID" />
                  </div>
                </Col>

                <Col xs={12} md={8} lg={4}>
                  <div className="form-field">
                    <Field
                      name="maritalstatus"
                      label="Marital Status"
                      as="select"
                      options={options.MaritalStatus}
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

export default withFormik({
  mapPropsToValues: () => ({
    maritalStatusId: '',
    maritalStatusText: ''
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
      apiClient
        .put(`marital-status/${id}`, values)
        .then(({ data }) => {
          console.log('PUT response data:', data) // Log the response data

          if (data && data.result) {
            message.success('Marital Status Updated Successfully')
            history('/app/marital-status')
          } else {
            message.error('Failed to update Marital Status')
          }
        })
        .catch((error) => {
          message.error('Failed to update Marital Status')
          console.error('Error updating data:', error)
        })
    } else {
      apiClient
        .post('marital-status', values)
        .then(({ data }) => {
          if (data && data.result) {
            message.success('Marital Status Added Successfully')
            history('/app/marital-status')
          } else {
            message.error('Failed to add Marital Status')
          }
        })
        .catch((error) => {
          message.error('Failed to add Marital Status')
          console.error('Error adding data:', error)
        })
    }
  }
})(MaritalStatusForm)
