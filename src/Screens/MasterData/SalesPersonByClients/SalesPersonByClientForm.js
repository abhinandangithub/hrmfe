import { Col, Row } from 'antd'
import { withFormik } from 'formik'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import * as Yup from 'yup'
import FooterActions from '../../../Components/FooterActions'
import { Field, Form } from '../../../Components/Formik'
import Panel from '../../../Layout/Panel'
import PanelLayout from '../../../Layout/PanelLayout'
import apiClient from '../../../Util/apiClient'
import { CLIENT_TYPE_OPTIONS, STATUS } from '../../../Util/Options'
import { convertSelectOptions } from '../../../Util/Util'

const Schema = Yup.object().shape({
  type: Yup.string().required(),
  client: Yup.string().required(),
  salesPerson: Yup.string().required(),
  status: Yup.string().required()
})

function SalesPersonByClientForm({
  values,
  setValues,
  setFieldValue,
  match: {
    params: { id }
  },
  history
}) {
  const [clients, setClients] = useState([])
  const [salesPersons, setSalesPersons] = useState([])
  const { t } = useTranslation()

  const getData = () => {
    if (id) {
      apiClient.get(`sales-person-by-clients/get/${id}`).then(({ data }) => {
        if (data?.result) {
          getClients({ type: data.result.type })
          setValues({ ...values, ...data.result })
        }
      })
    }
  }

  useEffect(() => {
    getData()
    getSalesPersons()
  }, [])

  const getClients = (params = {}) => {
    apiClient.get('clients/getAllActive', { params }).then(({ data }) => {
      if (data?.result) {
        const clientOptions = data.result.map((v) => {
          v.label = `${v.clientNo} - ${v.name}`
          v.value = v.id

          return v
        })
        setClients(clientOptions)
      }
    })
  }

  const getSalesPersons = (params = {}) => {
    apiClient.get('sales-persons/list', { params }).then(({ data }) => {
      if (data?.result) {
        setSalesPersons(convertSelectOptions(data.result, 'name', 'id'))
      }
    })
  }

  return (
    <Form>
      <Row justify="center" className="inner-contents">
        <Col xs={22} sm={22} md={20} lg={20}>
          <PanelLayout title={t('Sales Person Definition')}>
            <Panel title={t('Client')}>
              <Row gutter={[20, 10]}>
                <Col xs={24} md={12} lg={4}>
                  <div className="form-field">
                    <Field
                      label="Type"
                      name="type"
                      as="select"
                      options={CLIENT_TYPE_OPTIONS}
                      onChange={(n, v) => {
                        getClients({ type: v })
                        setFieldValue('client', '')

                        return setFieldValue(n, v)
                      }}
                    />
                  </div>
                </Col>
                <Col xs={24} md={12} lg={10}>
                  <div className="form-field">
                    <Field name="client" label="Client" as="select" options={clients} />
                  </div>
                </Col>
                <Col xs={24} md={12} lg={10}>
                  <div className="form-field">
                    <Field
                      name="salesPerson"
                      label="Sales Person"
                      as="select"
                      options={salesPersons}
                      onChange={(n, v, o) => {
                        setFieldValue('firstName', o?.firstName)
                        setFieldValue('lastName', o?.lastName)
                        setFieldValue('email', o?.email)
                        setFieldValue('phone', o?.phone)
                        setFieldValue('commission', o?.commission)

                        return setFieldValue(n, v)
                      }}
                    />
                  </div>
                </Col>
              </Row>
            </Panel>
            <Panel title={t('Sales Person')}>
              <Row gutter={[20, 10]}>
                <Col xs={24} md={12} lg={8}>
                  <div className="form-field">
                    <Field name="firstName" label="First Name" disabled />
                  </div>
                </Col>
                <Col xs={24} md={12} lg={8}>
                  <div className="form-field">
                    <Field name="lastName" label="Last Name" disabled />
                  </div>
                </Col>
                <Col xs={24} md={12} lg={8}>
                  <div className="form-field">
                    <Field name="email" label="Email" disabled />
                  </div>
                </Col>
                <Col xs={24} md={12} lg={8}>
                  <div className="form-field">
                    <Field name="phone" label="Phone" disabled />
                  </div>
                </Col>
                <Col xs={24} md={12} lg={8}>
                  <div className="form-field">
                    <Field name="commission" label="Commission" disabled />
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
                label: 'Save',
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
    type: '',
    client: '',
    salesPerson: '',
    status: 'Active'
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
    data.name = `${data.firstName} ${data.lastName}`

    if (id) {
      apiClient.put(`sales-person-by-clients/update/${id}`, data).then(({ data }) => {
        if (data?.result) {
          history('/app/sales-person-by-clients')
        }
      })
    } else {
      apiClient.post('sales-person-by-clients/add', data).then(({ data }) => {
        if (data?.result) {
          history('/app/sales-person-by-clients')
        }
      })
    }
  }
})(SalesPersonByClientForm)
