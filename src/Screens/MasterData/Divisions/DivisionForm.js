import { ArrowLeftOutlined } from '@ant-design/icons'
import { Col, Row } from 'antd'
import { withFormik } from 'formik'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useNavigate  } from 'react-router-dom'
import * as Yup from 'yup'
import Button from '../../../Components/Button'
import { Field, Form } from '../../../Components/Formik'
import Panel from '../../../Layout/Panel'
import PanelLayout from '../../../Layout/PanelLayout'
import apiClient from '../../../Util/apiClient'

const Schema = Yup.object().shape({
  name: Yup.string().required(),
  email: Yup.string().required(),
  phone: Yup.string().required(),
  street: Yup.string().required(),
  city: Yup.string().required(),
  postalCode: Yup.string().required(),
  country: Yup.string().required()
})

function DivisionForm({
  setValues,
  values,
  match: {
    params: { id }
  },
  companyInfo
}) {
  const { t } = useTranslation()
  const history = useNavigate()

  const getData = () => {
    if (id) {
      apiClient.get(`divisions/get/${id}`).then(({ data }) => {
        if (data && data.result) {
          setValues({ ...values, ...data.result })
        }
      })
    }
  }

  useEffect(() => {
    if (companyInfo?.configurations?.division !== 'Yes') {
      history('/app/dashboard')
    }

    getData()
  }, [])

  return (
    <Form>
      <Row justify="center" className="inner-contents">
        <Col xs={{ span: 22 }} sm={{ span: 22 }} md={{ span: 20 }} lg={{ span: 20 }}>
          <PanelLayout title={t('Division')}>
            <Panel title={t('Division Details')}>
              <Row gutter={[20, 10]}>
                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 8 }}>
                  <div className="form-field">
                    <Field name="name" label="Name" altInput />
                  </div>
                </Col>
                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 8 }}>
                  <div className="form-field">
                    <Field name="email" label="Email" />
                  </div>
                </Col>
                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 8 }}>
                  <div className="form-field">
                    <Field name="phone" label="Phone" />
                  </div>
                </Col>
                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 8 }}>
                  <div className="form-field">
                    <Field label="Company Reg No" name="crNo" altInput />
                  </div>
                </Col>
              </Row>
            </Panel>
            <Panel title={t('Address Details')}>
              <Row gutter={[10, 10]}>
                <Col xs={12} sm={12} md={12} lg={6}>
                  <div className="form-field">
                    <Field label="Street" name="street" altInput />
                  </div>
                </Col>
                <Col xs={12} sm={12} md={12} lg={6}>
                  <div className="form-field">
                    <Field label="City" name="city" altInput />
                  </div>
                </Col>
                <Col xs={12} sm={12} md={12} lg={6}>
                  <div className="form-field">
                    <Field label="State" name="state" altInput />
                  </div>
                </Col>
                <Col xs={12} sm={12} md={12} lg={6}>
                  <div className="form-field">
                    <Field label="Postal Code" name="postalCode" altInput />
                  </div>
                </Col>
                <Col xs={12} sm={12} md={12} lg={6}>
                  <div className="form-field">
                    <Field label="Country" name="country" altInput />
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
            <Link to="/app/divisions">
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
    name: '',
    email: '',
    phone: '',
    crNo: '',
    street: '',
    city: '',
    state: '',
    postalCode: '',
    country: ''
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
      apiClient.put(`divisions/update/${id}`, data).then(({ data }) => {
        if (data && data.result) {
          history('/app/divisions')
        }
      })
    } else {
      apiClient.post('divisions/add', data).then(({ data }) => {
        if (data && data.result) {
          history('/app/divisions')
        }
      })
    }
  }
})(DivisionForm)
