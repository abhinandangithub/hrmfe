import { ArrowLeftOutlined } from '@ant-design/icons'
import { Col, Row } from 'antd'
import { withFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import * as Yup from 'yup'
import Button from '../../../Components/Button'
import { Field, Form } from '../../../Components/Formik'
import apiClient from '../../../Util/apiClient'
import { convertSelectOptions } from '../../../Util/Util'

const projectSchema = Yup.object().shape({
  project: Yup.string().required(),
  user: Yup.string().required()
})

function WarehouseForm({
  setFieldValue,
  setValues,
  match: {
    params: { id }
  }
}) {
  const [employeeOptions, setEmployeeOptions] = useState([])
  const [projectOptions, setProjectOptions] = useState([])

  const getData = () => {
    if (id) {
      apiClient.get(`projects/getProjectAndEmployeeById/${id}`).then(({ status, data }) => {
        if (status === 200 && data.result) {
          setValues(data.result)
        }
      })
    }

    apiClient.get('employees/get-active').then(({ status, data }) => {
      if (status === 200 && data.result) {
        setEmployeeOptions(convertSelectOptions(data.result || [], 'name', 'user'))
      }
    })
    apiClient.get('projects/getAllActive').then(({ status, data }) => {
      if (status === 200 && data.result) {
        setProjectOptions(convertSelectOptions(data.result || [], 'name', 'id'))
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
                        as="select"
                        name="project"
                        label="Project"
                        options={projectOptions}
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
                      <Field as="select" name="user" label="Employee" options={employeeOptions} />
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
    client: '',
    project: '',
    user: ''
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
      apiClient.put(`projects/updateProjectAndEmployeeById/${id}`, data).then(({ data }) => {
        if (data && data.result) {
          history('/app/project-employees')
        }
      })
    } else {
      apiClient.post('projects/addProjectAndEmployee', data).then(({ data }) => {
        if (data && data.result) {
          history('/app/project-employees')
        }
      })
    }
  }
})(WarehouseForm)
