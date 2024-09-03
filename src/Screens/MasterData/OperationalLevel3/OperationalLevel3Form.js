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

function OperationalLevelForm({
  setValues,
  match: {
    params: { id }
  },
  history
}) {
  const fetchData = () => {
    if (id) {
      apiClient
        .get(`operational-level-3/${id}`)
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
    fetchOperationalLevel1()
    fetchOperationalLevel2()
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

  const [operationalLevel2Options, setOperationalLevel2Options] = useState([])

  const fetchOperationalLevel2 = async () => {
    try {
      const { data } = await apiClient.get('operational-level-2')
      if (data?.result) {
        setOperationalLevel2Options(
          data.result.map((group) => ({
            label: group.operationalLevel2Id,
            value: group.operationalLevel2Id
          }))
        )
      }
    } catch (error) {
      console.error('Error fetching operational level 2:', error)
    }
  }

  const [options, setOptions] = useState({})

  const fetchDropdownValues = () => {
    apiClient
      .get('options/get-by-types', {
        params: { type: 'OperationalLevel3' }
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
          <PanelLayout title={t('OPERATIONAL LEVEL 3')}>
            <Panel title={t('OPERATIONAL LEVEL 3 DETAILS')}>
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
                    <Field
                      name="operationalLevel2Id"
                      label="Operational Level 2 ID"
                      as="select"
                      options={operationalLevel2Options}
                    />
                  </div>
                </Col>
                <Col xs={12} md={8} lg={4}>
                  <div className="form-field">
                    <Field as="Number" name="operationalLevel3Id" label="Operational Level 3 ID" />
                  </div>
                </Col>

                <Col xs={12} md={8} lg={4}>
                  <div className="form-field">
                    <Field
                      name="operationalLevel3Name"
                      label="Operational Level 3 Name"
                      as="select"
                      options={options.OperationalLevel3}
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
    operationalLevel1Id: '',
    operationalLevel2Id: '',
    operationalLevel3Id: '',
    operationalLevel3Name: ''
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
        .put(`operational-level-3/${id}`, values)
        .then(({ data }) => {
          console.log('PUT response data:', data) // Log the response data

          if (data && data.result) {
            message.success('OperationalLevel Updated Successfully')
            history('/app/operational-level-3')
          } else {
            message.error('Failed to update OperationalLevel')
          }
        })
        .catch((error) => {
          message.error('Failed to update OperationalLevel')
          console.error('Error updating data:', error)
        })
    } else {
      apiClient
        .post('operational-level-3', values)
        .then(({ data }) => {
          if (data && data.result) {
            message.success('OperationalLevel Added Successfully')
            history('/app/operational-level-3')
          } else {
            message.error('Failed to add OperationalLevel')
          }
        })
        .catch((error) => {
          message.error('Failed to add OperationalLevel')
          console.error('Error adding data:', error)
        })
    }
  }
})(OperationalLevelForm)
