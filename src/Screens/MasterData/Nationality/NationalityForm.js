import { Col, message, Row } from 'antd'
import { withFormik } from 'formik'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import FooterActions from '../../../Components/FooterActions'
import { Field, Form } from '../../../Components/Formik'
import Panel from '../../../Layout/Panel'
import PanelLayout from '../../../Layout/PanelLayout'
import apiClient from '../../../Util/apiClient'

function NationalityForm({
  setValues,
  match: {
    params: { id }
  },
  history
}) {
  const fetchData = () => {
    if (id) {
      apiClient
        .get(`nationality/${id}`)
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

  const [options, setOptions] = useState({})

  const fetchDropdownValues = () => {
    apiClient
      .get('options/get-by-types', {
        params: { type: ['Country', 'CountryCode'] }
      })
      .then(({ data }) => {
        if (data && data.result) {
          setOptions(data.result)
        }
      })
  }

  useEffect(() => {
    if (id) {
      fetchData()
    }
    fetchDropdownValues()
  }, [id])

  return (
    <Form>
      <Row justify="center" className="inner-contents">
        <Col xs={{ span: 22 }} sm={{ span: 22 }} md={{ span: 20 }} lg={{ span: 22 }}>
          <PanelLayout title={t('NATIONALITY')}>
            <Panel title={t('NATIONALITY DETAILS')}>
              <Row gutter={[20, 10]}>
                <Col xs={12} md={8} lg={4}>
                  <div className="form-field">
                    <Field
                      name="nationalityId"
                      label="Country Code"
                      as="select"
                      options={options.CountryCode}
                    />
                  </div>
                </Col>
                <Col xs={12} md={8} lg={4}>
                  <div className="form-field">
                    <Field
                      name="nationalityName"
                      label="Country Name"
                      as="select"
                      options={options.Country}
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
    nationalityId: '',
    nationalityName: ''
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
        .put(`nationality/${id}`, values)
        .then(({ data }) => {
          console.log('PUT response data:', data) // Log the response data

          if (data && data.result) {
            message.success('Nationality Updated Successfully')
            history('/app/nationalities')
          } else {
            message.error('Failed to update Nationality')
          }
        })
        .catch((error) => {
          message.error('Failed to update Nationality')
          console.error('Error updating data:', error)
        })
    } else {
      apiClient
        .post('nationality', values)
        .then(({ data }) => {
          if (data && data.result) {
            message.success('Nationality Added Successfully')
            history('/app/nationalities')
          } else {
            message.error('Failed to add Nationality')
          }
        })
        .catch((error) => {
          message.error('Failed to add Nationality')
          console.error('Error adding data:', error)
        })
    }
  }
})(NationalityForm)
