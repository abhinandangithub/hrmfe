import { Col, Row } from 'antd'
import { withFormik } from 'formik'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate  } from 'react-router-dom'
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

function DesignationForm({
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
      apiClient.get(`designations/get/${id}`).then(({ data }) => {
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
        <Col xs={{ span: 22 }} sm={{ span: 22 }} md={{ span: 20 }} lg={{ span: 20 }}>
          <PanelLayout title={t('Designation')}>
            <Panel title={t('Designation Details')}>
              <Row gutter={[20, 10]}>
                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 8 }}>
                  <div className="form-field">
                    <Field name="name" label="Name" />
                  </div>
                </Col>
                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 8 }}>
                  <div className="form-field">
                    <Field name="description" label="Description" />
                  </div>
                </Col>
                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 8 }}>
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
                  history('/app/designations')
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
      apiClient.put(`designations/update/${id}`, data).then(({ data }) => {
        if (data && data.result) {
          history('/app/designations')
        }
      })
    } else {
      apiClient.post('designations/add', data).then(({ data }) => {
        if (data && data.result) {
          history('/app/designations')
        }
      })
    }
  }
})(DesignationForm)
