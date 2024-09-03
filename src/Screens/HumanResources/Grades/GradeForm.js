import { Col, Row } from 'antd'
import { withFormik } from 'formik'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate  } from 'react-router-dom'
import * as Yup from 'yup'
import FooterActions from '../../../Components/FooterActions'
import { Field, Form } from '../../../Components/Formik'
import Panel from '../../../Layout/Panel'
import PanelLayout from '../../../Layout/PanelLayout'
import apiClient from '../../../Util/apiClient'

function GradeForm({
  setValues,
  values,
  match: {
    params: { id }
  },
  submitForm
}) {
  const history = useNavigate()
  const { t } = useTranslation()

  const getData = () => {
    if (id) {
      apiClient.get(`grades/get/${id}`).then(({ data }) => {
        if (data && data.result) {
          setValues({ ...values, ...data.result })
        }
      })
    }
  }

  useEffect(() => {
    getData()
    fetchDropdownValues()
  }, [])

  const [options, setOptions] = useState({})

  const fetchDropdownValues = () => {
    apiClient
      .get('options/get-by-types', {
        params: { type: 'Grade' }
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
        <Col xs={22} sm={22} md={20} lg={20}>
          <PanelLayout title={t('Grade')}>
            <Panel title={t('Grade Details')}>
              <Row gutter={[20, 10]}>
                <Col xs={24} sm={24} md={12} lg={4}>
                  <div className="form-field">
                    <Field name="validFrom" label="Valid From" as="date" />
                  </div>
                </Col>
                <Col xs={24} sm={24} md={12} lg={4}>
                  <div className="form-field">
                    <Field name="validTo" label="Valid To" as="date" />
                  </div>
                </Col>
                <Col xs={24} sm={24} md={12} lg={4}>
                  <div className="form-field">
                    <Field name="gradeId" label="Grade ID" />
                  </div>
                </Col>
                <Col xs={24} sm={24} md={12} lg={4}>
                  <div className="form-field">
                    <Field name="gradeName" label="Grade Name" as="select" options={options.Grade} />
                  </div>
                </Col>
              </Row>
            </Panel>
          </PanelLayout>

          <FooterActions
            leftActions={[
              {
                prefix: 'flaticon-delete',
                label: 'Cancel',
                onClick: () => {
                  history('/app/grades')
                }
              }
            ]}
            centerActions={[
              {
                prefix: 'flaticon-teamwork',
                label: id ? 'Update' : 'Save',
                onClick: () => submitForm()
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
    gradeId: '',
    gradeName: ''
  }),
  validationSchema: Schema,
  handleSubmit: (
    data,
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
      apiClient.put(`grades/update/${id}`, data).then(({ data }) => {
        if (data && data.result) {
          history('/app/grades')
        }
      })
    } else {
      apiClient.post('grades/add', data).then(({ data }) => {
        if (data && data.result) {
          history('/app/grades')
        }
      })
    }
  }
})(GradeForm)
