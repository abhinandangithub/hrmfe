import { Col, Row } from 'antd'
import { withFormik } from 'formik'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'
import * as Yup from 'yup'
import FooterActions from '../../../Components/FooterActions'
import { Field, Form } from '../../../Components/Formik'
import Panel from '../../../Layout/Panel'
import PanelLayout from '../../../Layout/PanelLayout'
import apiClient from '../../../Util/apiClient'
import { STATUS } from '../../../Util/Options'

const Schema = Yup.object().shape({
  name: Yup.string().required()
})

function GradeForm({
  setValues,
  values,
  match: {
    params: { id }
  },
  submitForm
}) {
  const history = useHistory()
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
  }, [])

  return (
    <Form>
      <Row justify="center" className="inner-contents">
        <Col xs={22} sm={22} md={20} lg={20}>
          <PanelLayout title={t('Grade')}>
            <Panel title={t('Grade Details')}>
              <Row gutter={[20, 10]}>
                <Col xs={24} sm={24} md={12} lg={8}>
                  <div className="form-field">
                    <Field name="name" label="Name" />
                  </div>
                </Col>
                <Col xs={24} sm={24} md={12} lg={16}>
                  <div className="form-field">
                    <Field name="description" label="Description" />
                  </div>
                </Col>
                <Col xs={24} sm={24} md={12} lg={8}>
                  <div className="form-field">
                    <Field name="salaryFrom" label="From Salary" />
                  </div>
                </Col>
                <Col xs={24} sm={24} md={12} lg={8}>
                  <div className="form-field">
                    <Field name="salaryTo" label="To Salary" />
                  </div>
                </Col>
                <Col xs={24} sm={24} md={12} lg={8}>
                  <div className="form-field">
                    <Field name="status" label="Status" as="select" options={STATUS} />
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

export default withFormik({
  mapPropsToValues: () => ({
    name: '',
    description: '',
    fromSalary: '',
    toSalary: '',
    status: ''
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
          history.push('/app/grades')
        }
      })
    } else {
      apiClient.post('grades/add', data).then(({ data }) => {
        if (data && data.result) {
          history.push('/app/grades')
        }
      })
    }
  }
})(GradeForm)
