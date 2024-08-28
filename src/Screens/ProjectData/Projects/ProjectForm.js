import { ArrowLeftOutlined } from '@ant-design/icons'
import { Col, Row } from 'antd'
import { withFormik } from 'formik'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import * as Yup from 'yup'
import Button from '../../../Components/Button'
import { Field, Form } from '../../../Components/Formik'
import Panel from '../../../Layout/Panel'
import PanelLayout from '../../../Layout/PanelLayout'
import apiClient from '../../../Util/apiClient'
import { BUDGET_PERIOD_OPTIONS, STATUS } from '../../../Util/Options'
import { convertSelectOptions } from '../../../Util/Util'

// mofified

const BILLABLE_OPTIONS = [
  { label: 'Yes', value: 'Yes' },
  { label: 'No', value: 'No' }
]

const projectSchema = Yup.object().shape({
  code: Yup.string().required(),
  name: Yup.string().required(),
  client: Yup.string().required(),
  billable: Yup.string().required()
})

function WarehouseForm({
  setValues,
  match: {
    params: { id }
  }
}) {
  const [clientOptions, setClientOptions] = useState([])
  const { t } = useTranslation()

  const getData = () => {
    if (id) {
      apiClient.get(`projects/byId/${id}`).then(({ status, data }) => {
        if (status === 200 && data.result) {
          setValues(data.result)
        }
      })
    }

    apiClient.get('clients/getAllActive').then(({ status, data }) => {
      if (status === 200 && data.result) {
        setClientOptions(convertSelectOptions(data.result || [], 'name', 'id'))
      }
    })
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <Form>
      <Row justify="center" className="inner-contents">
        <Col xs={{ span: 22 }} sm={{ span: 22 }} md={{ span: 20 }} lg={{ span: 20 }}>
          <PanelLayout title={t('Project Definition')}>
            <Panel title={t('Project')}>
              <Row gutter={[20, 10]}>
                <Col xs={24} sm={24} md={12} lg={4}>
                  <div className="form-field">
                    <Field name="code" label="Code" disabled={!!id} />
                  </div>
                </Col>
                <Col xs={24} sm={24} md={12} lg={8}>
                  <div className="form-field">
                    <Field name="name" label="Name" />
                  </div>
                </Col>
                <Col xs={24} sm={24} md={12} lg={4}>
                  <div className="form-field">
                    <Field
                      name="status"
                      label="Status"
                      as="select"
                      options={[...STATUS, { label: 'OnHold', value: 'OnHold' }]}
                    />
                  </div>
                </Col>
                <Col xs={24} sm={24} md={12} lg={4}>
                  <div className="form-field">
                    <Field
                      name="currency"
                      label="Currency"
                      as="paged-select"
                      optionValue="code"
                      endPoint="currencies/getAll"
                    />
                  </div>
                </Col>
                <Col xs={24} sm={24} md={12} lg={4}>
                  <div className="form-field">
                    <Field name="exchageRate" label="Exchage Rate" />
                  </div>
                </Col>
                <Col xs={24} sm={24} md={12} lg={24}>
                  <div className="form-field">
                    <Field name="description" label="Description" as="textarea" rows={3} />
                  </div>
                </Col>
              </Row>
            </Panel>
            <Panel title={t('Project Information')}>
              <Row gutter={[20, 10]}>
                <Col xs={24} sm={24} md={6} lg={6}>
                  <div className="form-field">
                    <Field as="select" name="client" label="Client" options={clientOptions} />
                  </div>
                </Col>

                <Col xs={24} sm={24} md={6} lg={6}>
                  <div className="form-field">
                    <Field as="date" name="startDate" label="Start Date" />
                  </div>
                </Col>
                <Col xs={24} sm={24} md={6} lg={6}>
                  <div className="form-field">
                    <Field as="date" name="endDate" label="End Date" />
                  </div>
                </Col>
                <Col xs={24} sm={24} md={6} lg={6}>
                  <div className="form-field">
                    <Field as="select" name="billable" label="Billable" options={BILLABLE_OPTIONS} />
                  </div>
                </Col>
                <Col xs={24} sm={24} md={6} lg={6}>
                  <div className="form-field">
                    <Field
                      as="select"
                      name="type"
                      label="Type"
                      options={[
                        { label: 'Fixed', value: 'Fixed' },
                        { label: 'Time & Material', value: 'Time & Material' }
                      ]}
                    />
                  </div>
                </Col>
                <Col xs={24} sm={24} md={4} lg={4}>
                  <div className="form-field">
                    <Field name="rate" label="Rate / Value" type="number" />
                  </div>
                </Col>
                <Col xs={24} sm={24} md={4} lg={4}>
                  <div className="form-field">
                    <Field name="margin" label="Margin(%)" type="number" />
                  </div>
                </Col>
                <Col xs={24} sm={24} md={4} lg={4}>
                  <div className="form-field">
                    <Field name="budget" label="Budget" type="number" />
                  </div>
                </Col>
                <Col xs={24} sm={24} md={4} lg={4}>
                  <div className="form-field">
                    <Field
                      name="budgetPeriod"
                      label="Budget Periodicity"
                      as="select"
                      options={BUDGET_PERIOD_OPTIONS}
                    />
                  </div>
                </Col>
              </Row>
            </Panel>
          </PanelLayout>

          {/* Product details ends */}

          <div className="save-changes">
            <Button type="submit" variant="primary">
              {id ? 'Update' : 'Save'}
            </Button>
            <span>or</span>
            <Link to="/app/projects">
              <Button>
                <ArrowLeftOutlined /> Back to project list
              </Button>
            </Link>
          </div>
          {/* Invoice Information ends */}
        </Col>
      </Row>
    </Form>
  )
}

export default withFormik({
  mapPropsToValues: () => ({
    code: '',
    name: '',
    status: '',
    currency: '',
    exchageRate: 1,
    description: '',
    client: '',
    startDate: '',
    endDate: '',
    billable: '',
    type: '',
    rate: '',
    margin: '',
    budget: '',
    budgetPeriod: ''
  }),
  validationSchema: projectSchema,
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
      apiClient.put(`projects/update/${id}`, { ...data }).then(({ data }) => {
        if (data && data.result) {
          history.push('/app/projects')
        }
      })
    } else {
      apiClient.post('projects/add', data).then(({ data }) => {
        if (data && data.result) {
          history.push('/app/projects')
        }
      })
    }
  }
})(WarehouseForm)
