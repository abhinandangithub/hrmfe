import { ArrowLeftOutlined } from '@ant-design/icons'
import { Col, Row } from 'antd'
import { Formik } from 'formik'
import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { addCategory, getCategoryById, updateCategory } from '../../../Actions/UserAction'
import Button from '../../../Components/Button'
import { Field } from '../../../Components/Formik'
import { useStateCallback } from '../../../Util/Util'

const CategoryForm = (props) => {
  const { history, match } = props

  const [state, setState] = useStateCallback({
    name: '',
    id: false
  })

  const { name, id } = state

  useEffect(() => {
    if (match.params.id) {
      getCategoryById(match.params.id).then((category) => {
        if (category) {
          const { id, name } = category
          setState({ ...state, id, name })
        }
      })
    }
  }, [])

  const handleSubmit = (values) => {
    const { name } = values
    const { id } = state
    const validateFields = ['name']
    let flag = true
    validateFields.map((data) => {
      if (data && data.error) {
        flag = false
      }

      return true
    })

    if (flag) {
      if (id) {
        updateCategory(id, { name }).then((category) => {
          if (category) {
            history.push('/app/categories')
          }
        })
      } else {
        addCategory({ name }).then((category) => {
          if (category) {
            history.push('/app/categories')
          }
        })
      }
    } else {
      setState({ ...state, isSubmit: true })
    }
  }

  return (
    <Row justify="center" className="inner-contents">
      <Col xs={{ span: 22 }} sm={{ span: 22 }} md={{ span: 20 }} lg={{ span: 16 }}>
        <div className="panel-layout">
          <h2 className="panel-title">Category Details</h2>
          <Row gutter={[26, { xs: 8, sm: 16, md: 20, lg: 20 }]}>
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 24 }}>
              <div className="panel-design">
                <div className="panel-header">
                  <h3>Add New Category</h3>
                </div>
                <div className="panel-body">
                  <Formik
                    initialValues={{
                      name: id ? name : ''
                    }}
                    onSubmit={handleSubmit}>
                    {(props) => {
                      const { handleSubmit } = props

                      return (
                        <form onSubmit={handleSubmit} noValidate>
                          <div className="form-field">
                            <Field name="name" label="Name" />
                          </div>
                          <div className="save-changes">
                            <button type="submit" className="btn ant-btn-primary">
                              {id ? 'Update' : 'Save'}
                            </button>
                            <span>or</span>
                            <Link to="/app/categories">
                              <Button>
                                <ArrowLeftOutlined /> Back to category list
                              </Button>
                            </Link>
                          </div>
                        </form>
                      )
                    }}
                  </Formik>
                </div>
              </div>
              {/* Invoice Information ends */}
            </Col>
          </Row>
        </div>
      </Col>
    </Row>
  )
}

function mapStateToProps(state) {
  return {
    companyInfo: state.users.companyInfo
  }
}

export default connect(mapStateToProps)(CategoryForm)
