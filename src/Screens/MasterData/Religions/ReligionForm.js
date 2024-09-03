import { Col, message, Row } from 'antd'
import { withFormik } from 'formik'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import FooterActions from '../../../Components/FooterActions'
import { Field, Form } from '../../../Components/Formik'
import Panel from '../../../Layout/Panel'
import PanelLayout from '../../../Layout/PanelLayout'
import apiClient from '../../../Util/apiClient'

function ReligionForm({
  setValues,
  match: {
    params: { id }
  },
  history
}) {
  const fetchData = () => {
    if (id) {
      apiClient
        .get(`religion/${id}`)
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
        params: { type: 'Religion' }
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
          <PanelLayout title={t('RELIGION')}>
            <Panel title={t('RELIGION DETAILS')}>
              <Row gutter={[20, 10]}>
                <Col xs={12} md={12} lg={8}>
                  <div className="form-field">
                    <Field as="Number" name="religionId" label="Religion ID" />
                  </div>
                </Col>

                <Col xs={12} md={12} lg={8}>
                  <div className="form-field">
                    <Field as="select" name="religionName" label="Religion Name" options={options.Religion} />
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
    religionId: '',
    religionName: ''
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
        .put(`religion/${id}`, values)
        .then(({ data }) => {
          console.log('PUT response data:', data) // Log the response data

          if (data && data.result) {
            message.success('Religion Updated Successfully')
            history('/app/religions')
          } else {
            message.error('Failed to update Religion')
          }
        })
        .catch((error) => {
          message.error('Failed to update Religion')
          console.error('Error updating data:', error)
        })
    } else {
      apiClient
        .post('religion', values)
        .then(({ data }) => {
          if (data && data.result) {
            message.success('Religion Added Successfully')
            history('/app/religions')
          } else {
            message.error('Failed to add Religion')
          }
        })
        .catch((error) => {
          message.error('Failed to add Religion')
          console.error('Error adding data:', error)
        })
    }
  }
})(ReligionForm)
