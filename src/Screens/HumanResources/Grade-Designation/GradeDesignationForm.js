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
import { GRADE } from '../../../Util/Options'

const Schema = Yup.object().shape({
  grade: Yup.string().required(),
  designation: Yup.array().required()
})

function GradeDesignationForm({
  setValues,
  values,
  match: {
    params: { id }
  }
}) {
  const { t } = useTranslation()
  const getData = () => {
    if (id) {
      apiClient.get(`grade/get/${id}`).then(({ data }) => {
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
        <Col xs={{ span: 22 }} sm={{ span: 22 }} md={{ span: 20 }} lg={{ span: 16 }}>
          <PanelLayout title={t('Grade')}>
            <Panel title={t('Grade/Designation')}>
              <Row gutter={[20, 10]}>
                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 12 }}>
                  <div className="form-field">
                    <Field name="grade" label="Grade" as="select" options={GRADE} />
                  </div>
                </Col>
                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 12 }}>
                  <div className="form-field">
                    <Field as="input-chip" name="designation" label="Designation" />
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
            <Link to="/app/Grade-Designation">
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
    designation: [],
    grade: ''
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
      apiClient.put(`grade/update/${id}`, data).then(({ data }) => {
        if (data && data.result) {
          history.push('/app/Grade-Designation')
        }
      })
    } else {
      apiClient.post('grade/add', data).then(({ data }) => {
        if (data && data.result) {
          history.push('/app/Grade-Designation')
        }
      })
    }
  }
})(GradeDesignationForm)
