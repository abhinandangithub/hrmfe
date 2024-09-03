import { Col, message, Row } from 'antd'
import { withFormik } from 'formik'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import FooterActions from '../../../Components/FooterActions'
import { Field, Form } from '../../../Components/Formik'
import Panel from '../../../Layout/Panel'
import PanelLayout from '../../../Layout/PanelLayout'
import apiClient from '../../../Util/apiClient'

function CategoryForm({
  setValues,
  match: {
    params: { id }
  },
  history
}) {
  const fetchData = () => {
    if (id) {
      apiClient
        .get(`expense-categories/${id}`)
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
  }, [id])

  return (
    <Form>
      <Row justify="center" className="inner-contents">
        <Col xs={{ span: 22 }} sm={{ span: 22 }} md={{ span: 20 }} lg={{ span: 22 }}>
          <PanelLayout title={t('CATEGORY')}>
            <Panel title={t('CATEGORY DETAILS')}>
              <Row gutter={[26, { xs: 8, sm: 16, md: 20, lg: 20 }]}>
                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 24 }}>
                  <div className="form-field">
                    <Field as="string" name="name" label="Name" />
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
    name: ''
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
        .put(`expense-categories/${id}`, values)
        .then(({ data }) => {
          console.log('PUT response data:', data) // Log the response data

          if (data && data.result) {
            message.success('Category Updated Successfully')
            history('/app/categories')
          } else {
            message.error('Failed to update Category')
          }
        })
        .catch((error) => {
          message.error('Failed to update Category')
          console.error('Error updating data:', error)
        })
    } else {
      apiClient
        .post('expense-categories/add', values)
        .then(({ data }) => {
          if (data && data.result) {
            message.success('Category Added Successfully')
            history('/app/categories')
          } else {
            message.error('Failed to add Category')
          }
        })
        .catch((error) => {
          message.error('Failed to add Category')
          console.error('Error adding data:', error)
        })
    }
  }
})(CategoryForm)
