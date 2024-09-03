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

function OperationForm({
  values,
  setValues,
  match: {
    params: { id }
  },
  history
}) {
  const fetchData = () => {
    if (id) {
      apiClient
        .get(`operational-level-2/${id}`)
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
        params: { type: 'OperationalLevel2' }
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
    fetchOperationalLevel1()
    fetchDropdownValues()
  }, [id])

  const [operationalLevel1Options, setOperationalLevel1Options] = useState([])

  const fetchOperationalLevel1 = async () => {
    try {
      const { data } = await apiClient.get('operational-level1')
      if (data?.result) {
        setOperationalLevel1Options(
          data.result.map((group) => ({
            label: group.operationalLevel1Id,
            value: group.operationalLevel1Id
          }))
        )
      }
    } catch (error) {
      console.error('Error fetching operational level 1:', error)
    }
  }

  return (
    <Form>
      <Row justify="center" className="inner-contents">
        <Col xs={{ span: 22 }} sm={{ span: 22 }} md={{ span: 20 }} lg={{ span: 22 }}>
          <PanelLayout title={t('OPERATIONAL LEVEL 2')}>
            <Panel title={t('OPERATIONAL LEVEL 2 DETAILS')}>
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
                      name="operationalLevel1Id"
                      label="Operational Level 1 ID"
                      as="select"
                      options={operationalLevel1Options}
                    />
                  </div>
                </Col>

                <Col xs={12} md={8} lg={4}>
                  <div className="form-field">
                    <Field name="operationalLevel2Id" label="Operational Level 2 ID" />
                  </div>
                </Col>

                <Col xs={12} md={8} lg={4}>
                  <div className="form-field">
                    <Field
                      name="operationalLevel2"
                      label="Operational Level 2"
                      as="select"
                      options={options.OperationalLevel2}
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
    operationalLevel1Id: '',
    operationalLevel2Id: '',
    operationalLevel2: ''
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
        .put(`operational-level-2/${id}`, values)
        .then(({ data }) => {
          console.log('PUT response data:', data) // Log the response data

          if (data && data.result) {
            message.success('Operational Level 2 Updated Successfully')
            history('/app/operational-level-2')
          } else {
            message.error('Failed to update Operational Level 2')
          }
        })
        .catch((error) => {
          message.error('Failed to update Operational Level 2')
          console.error('Error updating data:', error)
        })
    } else {
      apiClient
        .post('operational-level-2', values)
        .then(({ data }) => {
          if (data && data.result) {
            message.success('Operational Level 2 Added Successfully')
            history('/app/operational-level-2')
          } else {
            message.error('Failed to add Operational Level 2')
          }
        })
        .catch((error) => {
          message.error('Failed to add Operational Level 2')
          console.error('Error adding data:', error)
        })
    }
  }
})(OperationForm)
