import { ArrowLeftOutlined } from '@ant-design/icons'
import { Col, Row } from 'antd'
import { withFormik } from 'formik'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import Button from '../../../Components/Button'
import { Field, Form } from '../../../Components/Formik'
import Panel from '../../../Layout/Panel'
import PanelLayout from '../../../Layout/PanelLayout'
import apiClient from '../../../Util/apiClient'
import { STATUS } from '../../../Util/Options'
import { salesPersonSchema } from '../../../Util/validationSchema'

function SalesPersonForm({
  values,
  setValues,
  match: {
    params: { id }
  }
}) {
  const { t } = useTranslation()
  const getData = () => {
    if (id) {
      apiClient.get(`sales-persons/${id}`).then(({ status, data }) => {
        if (status === 200) {
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
          <PanelLayout title={t('Sales Person Definition')}>
            <Panel title={t('Sales Person')}>
              <Row gutter={[20, 10]}>
                <Col xs={24} md={12} lg={8}>
                  <div className="form-field">
                    <Field name="firstName" label="First Name" />
                  </div>
                </Col>
                <Col xs={24} md={12} lg={8}>
                  <div className="form-field">
                    <Field name="lastName" label="Last Name" />
                  </div>
                </Col>
                <Col xs={24} md={12} lg={8}>
                  <div className="form-field">
                    <Field name="email" label="Mail ID" />
                  </div>
                </Col>
                <Col xs={24} md={12} lg={8}>
                  <div className="form-field">
                    <Field name="phone" label="Phone" />
                  </div>
                </Col>
                <Col xs={24} md={12} lg={8}>
                  <div className="form-field">
                    <Field name="commission" label="Commission" />
                  </div>
                </Col>
                <Col xs={24} md={12} lg={8}>
                  <div className="form-field">
                    <Field as="select" name="status" label="Status" options={STATUS} />
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
            <Link to="/app/sales-persons">
              <Button>
                <ArrowLeftOutlined /> Back to sales persons
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
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    commission: '',
    status: 'Active'
  }),
  validationSchema: salesPersonSchema,
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
    data.name = `${data.firstName} ${data.lastName}`

    if (id) {
      apiClient.put(`sales-persons/${id}`, data).then(({ status }) => {
        if (status === 200) {
          history.push('/app/sales-persons')
        }
      })
    } else {
      apiClient.post('sales-persons', data).then(({ status }) => {
        if (status === 201) {
          history.push('/app/sales-persons')
        }
      })
    }
  }
})(SalesPersonForm)
