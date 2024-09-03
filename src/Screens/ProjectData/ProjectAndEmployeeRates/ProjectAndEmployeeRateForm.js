import { ArrowLeftOutlined } from '@ant-design/icons'
import { Col, Row } from 'antd'
import { withFormik } from 'formik'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import * as Yup from 'yup'
import Button from '../../../Components/Button'
import { Field, Form } from '../../../Components/Formik'
import apiClient from '../../../Util/apiClient'
import { WAGE_MODE } from '../../../Util/Options'
import { convertSelectOptions } from '../../../Util/Util'

const Schema = Yup.object().shape({
  project: Yup.string().required(),
  user: Yup.string().required(),
  poNumber: Yup.string().required(),
  payType: Yup.string().required(),
  rate: Yup.string().required(),
  currency: Yup.string().required(),
  startDate: Yup.date().required(),
  endDate: Yup.date().required()
})

function WarehouseForm({
  setFieldValue,
  setValues,
  match: {
    params: { id }
  }
}) {
  const [projectOptions, setProjectOptions] = useState([])
  const [currencyOptions, setcurrencyOptions] = useState([])

  const getData = () => {
    if (id) {
      apiClient.get(`projects/getProjectAndEmployeeById/${id}`).then(({ status, data }) => {
        if (status === 200 && data.result) {
          setValues(data.result)
        }
      })
    }

    apiClient.get('projects/getAllActive').then(({ status, data }) => {
      if (status === 200 && data.result) {
        setProjectOptions(convertSelectOptions(data.result || [], 'name', 'id'))
      }
    })
    apiClient.get('currencies/getAllActive').then(({ status, data }) => {
      if (status === 200 && data.result) {
        setcurrencyOptions(convertSelectOptions(data.result || [], 'name', 'code'))
      }
    })
  }

  useEffect(() => {
    getData()
  }, [])

  //   const onChange = () => {}

  return (
    <Form>
      <Row justify="center" className="inner-contents">
        <Col xs={{ span: 22 }} sm={{ span: 22 }} md={{ span: 20 }} lg={{ span: 20 }}>
          <div className="panel-layout">
            <h2 className="panel-title">Project Definition</h2>

            <div className="panel-design">
              <div className="panel-header">
                <h3>Project</h3>
              </div>
              <div className="panel-body">
                <Row gutter={[20, 10]}>
                  <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 8 }}>
                    <div className="form-field">
                      <Field
                        as="paged-select"
                        name="project"
                        label="Project"
                        endPoint="projects/get-active"
                        onChange={(n, v) => {
                          const selectedPro = projectOptions.find((val) => val.id === v)
                          setFieldValue('client', selectedPro ? selectedPro.client : null)

                          return setFieldValue(n, v)
                        }}
                      />
                    </div>
                  </Col>
                  <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 8 }}>
                    <div className="form-field">
                      <Field
                        as="paged-select"
                        name="user"
                        label="Employee"
                        endPoint="employees/get-active"
                        optionValue="user"
                      />
                    </div>
                  </Col>
                </Row>
              </div>
            </div>

            <div className="panel-design">
              <div className="panel-header">
                <h3>Rates</h3>
              </div>
              <div className="panel-body">
                <Row gutter={[20, 10]}>
                  <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 6 }}>
                    <div className="form-field">
                      <Field name="poNumber" label="Purchare Order" />
                    </div>
                  </Col>
                  <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 6 }}>
                    <div className="form-field">
                      <Field as="select" name="payType" label="Pay Type" options={WAGE_MODE} />
                    </div>
                  </Col>
                  <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 6 }}>
                    <div className="form-field">
                      <Field name="rate" label="Rate" />
                    </div>
                  </Col>
                  <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 6 }}>
                    <div className="form-field">
                      <Field
                        as="select"
                        name="currency"
                        label="Currency"
                        required
                        options={currencyOptions}
                      />
                    </div>
                  </Col>
                </Row>
              </div>
            </div>

            <div className="panel-design">
              <div className="panel-header">
                <h3>Validity</h3>
              </div>
              <div className="panel-body">
                <Row gutter={[20, 10]}>
                  <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 6 }}>
                    <div className="form-field">
                      <Field as="date" name="startDate" label="Start Date" />
                    </div>
                  </Col>
                  <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 6 }}>
                    <div className="form-field">
                      <Field as="date" name="endDate" label="End Date" />
                    </div>
                  </Col>
                </Row>
              </div>
            </div>
          </div>

          {/* Product details ends */}

          <div className="save-changes">
            <Button type="submit" variant="primary">
              {id ? 'Update' : 'Save'}
            </Button>
            <span>or</span>
            <Link to="/app/project-employee-rates">
              <Button>
                <ArrowLeftOutlined /> Back to list
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
    client: '',
    project: '',
    user: '',
    poNumber: '',
    payType: '',
    rate: '',
    currency: '',
    startDate: '',
    endDate: ''
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
      data.startDate = data.startDate ? moment(data.startDate).startOf('day') : null
      data.endDate = data.startDate ? moment(data.endDate).startOf('day') : null
      apiClient.put(`projects/updateProjectAndEmployeeById/${id}`, data).then(({ data }) => {
        if (data.result) {
          history('/app/project-employee-rates')
        }
      })
    } else {
      apiClient.post('projects/addProjectAndEmployee', data).then(({ data }) => {
        if (data.result) {
          history('/app/project-employee-rates')
        }
      })
    }
  }
})(WarehouseForm)
