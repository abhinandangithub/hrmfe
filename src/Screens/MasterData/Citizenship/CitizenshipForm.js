import { Col, message, Row } from 'antd'
import { withFormik } from 'formik'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import FooterActions from '../../../Components/FooterActions'
import { Field, Form } from '../../../Components/Formik'
import Panel from '../../../Layout/Panel'
import PanelLayout from '../../../Layout/PanelLayout'
import apiClient from '../../../Util/apiClient'

function CitizenshipForm({
  setValues,
  match: {
    params: { id }
  },
  history
}) {
  const fetchData = () => {
    if (id) {
      apiClient
        .get(`citizenship/${id}`)
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
        params: { type: 'Citizenship' }
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
          <PanelLayout title={t('CITIZENSHIP')}>
            <Panel title={t('CITIZENSHIP DETAILS')}>
              <Row gutter={[20, 10]}>
                <Col xs={12} md={12} lg={8}>
                  <div className="form-field">
                    <Field as="Number" name="citizenshipId" label="Citizenship ID" />
                  </div>
                </Col>

                <Col xs={12} md={12} lg={8}>
                  <div className="form-field">
                    <Field as="select" name="citizenship" label="Citizenship" options={options.Citizenship} />
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
    citizenshipId: '',
    citizenship: ''
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
        .put(`citizenship/${id}`, values)
        .then(({ data }) => {
          console.log('PUT response data:', data) // Log the response data

          if (data && data.result) {
            message.success('Citizenship Updated Successfully')
            history('/app/citizenship')
          } else {
            message.error('Failed to update Citizenship')
          }
        })
        .catch((error) => {
          message.error('Failed to update Citizenship')
          console.error('Error updating data:', error)
        })
    } else {
      apiClient
        .post('citizenship', values)
        .then(({ data }) => {
          if (data && data.result) {
            message.success('Citizenship Added Successfully')
            history('/app/citizenship')
          } else {
            message.error('Failed to add Citizenship')
          }
        })
        .catch((error) => {
          message.error('Failed to add Citizenship')
          console.error('Error adding data:', error)
        })
    }
  }
})(CitizenshipForm)
