import { ArrowLeftOutlined } from '@ant-design/icons'
import { Col, Row } from 'antd'
import { withFormik } from 'formik'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import * as Yup from 'yup'
import Button from '../../../Components/Button'
import { Field, Form } from '../../../Components/Formik'
import Panel from '../../../Layout/Panel'
import PanelLayout from '../../../Layout/PanelLayout'
import apiClient from '../../../Util/apiClient'

const Schema = Yup.object().shape({
  division: Yup.string().required(),
  name: Yup.string().required()
})

function DepartmentsForm({
  setValues,
  values,
  match: {
    params: { id }
  }
}) {
  const { t } = useTranslation()
  const getData = () => {
    if (id) {
      apiClient.get(`department/get/${id}`).then(({ data }) => {
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
          <PanelLayout title={t('Departments')}>
            <Panel title={t('Departments Details')}>
              <Row gutter={[20, 10]}>
                <Col xs={24} sm={24} md={8} lg={8}>
                  <div className="form-field">
                    <Field name="division" label="Division" as="paged-select" endPoint="divisions/get" />
                  </div>
                </Col>
                <Col xs={24} sm={24} md={8} lg={8}>
                  <div className="form-field">
                    <Field name="name" label="Name" altInput />
                  </div>
                </Col>
                <Col xs={24} sm={24} md={8} lg={8}>
                  <div className="form-field">
                    <Field name="email" label="Email" />
                  </div>
                </Col>
              </Row>
            </Panel>
          </PanelLayout>

          <div className="save-changes">
            <Button type="submit" variant="primary">
              {id ? 'Update' : 'Save'}
            </Button>
            <span>or</span>
            <Link to="/app/departments">
              <Button>
                <ArrowLeftOutlined /> Back
              </Button>
            </Link>
          </div>
        </Col>
      </Row>
    </Form>
  )
}

export default withFormik({
  mapPropsToValues: () => ({
    division: '',
    name: '',
    email: ''
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
      apiClient.put(`department/update/${id}`, data).then(({ data }) => {
        if (data && data.result) {
          history.push('/app/departments')
        }
      })
    } else {
      apiClient.post('department/add', data).then(({ data }) => {
        if (data && data.result) {
          history.push('/app/departments')
        }
      })
    }
  }
})(DepartmentsForm)
