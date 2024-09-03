import { ArrowLeftOutlined } from '@ant-design/icons'
import { Col, Row } from 'antd'
import { withFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import * as Yup from 'yup'
import Button from '../../../Components/Button'
import { Field, Form } from '../../../Components/Formik'
import apiClient from '../../../Util/apiClient'

const STATUS = [
  { label: 'Assigned', value: 'Assigned' },
  { label: 'Returned', value: 'Returned' }
]

const Schema = Yup.object().shape({
  asset: Yup.string().required(),
  employee: Yup.string().required(),
  assignedDate: Yup.date().required(),
  purpose: Yup.string().required(),
  returnedDate: Yup.date().when('status', {
    is: (status) => status === 'Returned',
    then: (schema) => schema.required()
  })
})

function WarehouseForm({
  setValues,
  values,
  match: {
    params: { id }
  }
}) {
  const [assetTransferStatus, setAssetTransferStatus] = useState('')

  const getData = () => {
    if (id) {
      apiClient.get(`asset-transfers/get/${id}`).then(({ data }) => {
        if (data?.result) {
          setValues({ ...values, ...data.result })
          setAssetTransferStatus(data.result.status)
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
          <div className="panel-layout">
            <h2 className="panel-title">Asset Transfer</h2>

            <div className="panel-design">
              <div className="panel-header">
                <h3>Asset</h3>
              </div>
              <div className="panel-body">
                <Row gutter={[20, 10]}>
                  <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 8 }}>
                    <div className="form-field">
                      <Field
                        as="paged-select"
                        name="asset"
                        label="Asset"
                        endPoint={id ? 'assets/get' : 'assets/get-available'}
                        disabled={!!id}
                      />
                    </div>
                  </Col>
                  <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 8 }}>
                    <div className="form-field">
                      <Field
                        as="paged-select"
                        name="employee"
                        label="Employee"
                        endPoint="employees/get-active"
                        disabled={!!id}
                      />
                    </div>
                  </Col>
                </Row>
              </div>
            </div>

            <div className="panel-design">
              <div className="panel-header">
                <h3>Assignment</h3>
              </div>
              <div className="panel-body">
                <Row gutter={[20, 10]}>
                  <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 6 }}>
                    <div className="form-field">
                      <Field name="assignedDate" label="Assigned Date" as="date" />
                    </div>
                  </Col>
                  <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 6 }}>
                    <div className="form-field">
                      <Field name="purpose" label="Purpose" />
                    </div>
                  </Col>
                  <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 12 }}>
                    <div className="form-field">
                      <Field name="comments" label="Comments" as="textarea" />
                    </div>
                  </Col>
                </Row>
              </div>
            </div>

            {id && (
              <div className="panel-design">
                <div className="panel-header">
                  <h3>Validity</h3>
                </div>
                <div className="panel-body">
                  <Row gutter={[20, 10]}>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 6 }}>
                      <div className="form-field">
                        <Field as="date" name="returnedDate" label="Retured Date" />
                      </div>
                    </Col>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 6 }}>
                      <div className="form-field">
                        <Field as="select" name="status" label="Status" options={STATUS} />
                      </div>
                    </Col>
                  </Row>
                </div>
              </div>
            )}
          </div>

          {/* Product details ends */}

          <div className="save-changes">
            {assetTransferStatus !== 'Returned' && (
              <>
                <Button type="submit" variant="primary">
                  {id ? 'Update' : 'Save'}
                </Button>
                <span>or</span>
              </>
            )}

            <Link to="/app/asset-transfers">
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
    asset: '',
    employee: '',
    assignedDate: '',
    purpose: '',
    comments: '',
    returnedDate: '',
    status: 'Assigned'
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
      apiClient.put(`asset-transfers/update/${id}`, data).then(({ data }) => {
        if (data.result) {
          history('/app/asset-transfers')
        }
      })
    } else {
      apiClient.post('asset-transfers/add', data).then(({ data }) => {
        if (data.result) {
          history('/app/asset-transfers')
        }
      })
    }
  }
})(WarehouseForm)
