import { Col, message, Row } from 'antd'
import { withFormik } from 'formik'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import FooterActions from '../../../Components/FooterActions'
import { Field, Form } from '../../../Components/Formik'
import Panel from '../../../Layout/Panel'
import PanelLayout from '../../../Layout/PanelLayout'
import apiClient from '../../../Util/apiClient'

function RegionForm({
  setValues,
  match: {
    params: { id }
  },
  history
}) {
  const fetchData = () => {
    if (id) {
      apiClient
        .get(`region/${id}`)
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
        params: { type: 'Region' }
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
          <PanelLayout title={t('REGION')}>
            <Panel title={t('REGION DETAILS')}>
              <Row gutter={[20, 10]}>
                <Col xs={12} md={8} lg={4}>
                  <div className="form-field">
                    <Field name="regionId" label="Region ID" />
                  </div>
                </Col>

                <Col xs={12} md={8} lg={4}>
                  <div className="form-field">
                    <Field name="region" label="Region" as="select" options={options.Region} />
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
    regionId: '',
    region: ''
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
        .put(`region/${id}`, values)
        .then(({ data }) => {
          console.log('PUT response data:', data) // Log the response data

          if (data && data.result) {
            message.success('Regions Updated Successfully')
            history('/app/regions')
          } else {
            message.error('Failed to update Regions')
          }
        })
        .catch((error) => {
          message.error('Failed to updateRegions')
          console.error('Error updating data:', error)
        })
    } else {
      apiClient
        .post('region', values)
        .then(({ data }) => {
          if (data && data.result) {
            message.success('Region Added Successfully')
            history('/app/regions')
          } else {
            message.error('Failed to add Region')
          }
        })
        .catch((error) => {
          message.error('Failed to add Region')
          console.error('Error adding data:', error)
        })
    }
  }
})(RegionForm)
