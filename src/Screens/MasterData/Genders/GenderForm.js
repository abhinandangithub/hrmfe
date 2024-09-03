import { Col, message, Row } from 'antd'
import { withFormik } from 'formik'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import FooterActions from '../../../Components/FooterActions'
import { Field, Form } from '../../../Components/Formik'
import Panel from '../../../Layout/Panel'
import PanelLayout from '../../../Layout/PanelLayout'
import apiClient from '../../../Util/apiClient'

function GenderForm({
  setValues,
  match: {
    params: { id }
  },
  history
}) {
  const fetchData = () => {
    if (id) {
      apiClient
        .get(`genders/${id}`)
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
        params: { type: 'Gender' }
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
          <PanelLayout title={t('GENDER')}>
            <Panel title={t('GENDER DETAILS')}>
              <Row gutter={[20, 10]}>
                <Col xs={12} md={12} lg={8}>
                  <div className="form-field">
                    <Field as="Number" name="genderId" label="Gender ID" />
                  </div>
                </Col>

                <Col xs={12} md={12} lg={8}>
                  <div className="form-field">
                    <Field as="select" name="genderText" label="Gender Text" options={options.Gender} />
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
    genderGroupId: '',
    genderGroupText: ''
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
        .put(`genders/${id}`, values)
        .then(({ data }) => {
          console.log('PUT response data:', data) // Log the response data

          if (data && data.result) {
            message.success('Gender Updated Successfully')
            history('/app/genders')
          } else {
            message.error('Failed to update Gender')
          }
        })
        .catch((error) => {
          message.error('Failed to update Gender')
          console.error('Error updating data:', error)
        })
    } else {
      apiClient
        .post('genders', values)
        .then(({ data }) => {
          if (data && data.result) {
            message.success('Gender Added Successfully')
            history('/app/genders')
          } else {
            message.error('Failed to add Gender')
          }
        })
        .catch((error) => {
          message.error('Failed to add Gender')
          console.error('Error adding data:', error)
        })
    }
  }
})(GenderForm)
