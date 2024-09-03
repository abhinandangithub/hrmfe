import { Col, Row } from 'antd'
import { withFormik } from 'formik'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate  } from 'react-router-dom'
import * as Yup from 'yup'
import FooterActions from '../../../Components/FooterActions'
import { Field, Form } from '../../../Components/Formik'
import FieldArray from '../../../Components/Formik/FieldArray'
import Panel from '../../../Layout/Panel'
import PanelLayout from '../../../Layout/PanelLayout'
import apiClient from '../../../Util/apiClient'
import { STATUS, YES_NO_OPTIONS } from '../../../Util/Options'

// const ACTION_ON = [
//   { label: 'HR Manager', value: 'HR Manager' },
//   { label: 'Reporting Manager ', value: 'Reporting Manager' },
//   { label: 'Self', value: 'Self' }
// ]

const TYPES = [
  { label: 'Text', value: 'Text' },
  { label: 'Dropdown', value: 'Dropdown' },
  { label: 'Radio', value: 'Radio' }
]

const Schema = Yup.object().shape({
  name: Yup.string().required(),
  description: Yup.string().required(),
  sequences: Yup.array()
    .of(
      Yup.object().shape({
        description: Yup.string().required(),
        type: Yup.string().required()
      })
    )
    .required(),
  questions: Yup.array()
    .of(
      Yup.object().shape({
        description: Yup.string().required(),
        mandatory: Yup.string().required(),
        type: Yup.string().required()
      })
    )
    .required()
})

function JobSequenceForm({
  setValues,
  values,
  match: {
    params: { id }
  },
  submitForm
}) {
  const history = useNavigate()
  const { t } = useTranslation()

  const getData = () => {
    if (id) {
      apiClient.get(`job-sequences/get/${id}`).then(({ data }) => {
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
        <Col xs={{ span: 22 }} sm={{ span: 22 }} md={{ span: 20 }} lg={{ span: 20 }}>
          <PanelLayout title={t('Job Sequence')}>
            <Panel title={t('Sequence Details')}>
              <Row gutter={[20, 10]}>
                <Col xs={24} sm={24} md={12} lg={8}>
                  <div className="form-field">
                    <Field name="name" label="Name" />
                  </div>
                </Col>
                <Col xs={24} sm={24} md={12} lg={8}>
                  <div className="form-field">
                    <Field name="description" label="Description" />
                  </div>
                </Col>
                <Col xs={24} sm={24} md={12} lg={8}>
                  <div className="form-field">
                    <Field name="status" label="Status" as="select" options={STATUS} />
                  </div>
                </Col>
              </Row>
            </Panel>

            <Panel title={t('Sequence details')}>
              <FieldArray
                name="sequences"
                editable
                defaultValues={{
                  description: '',
                  type: '',
                  actionOn: '',
                  typeOptions: []
                }}>
                {Sequences}
              </FieldArray>
            </Panel>
            <Panel title={t('Questionnaire')}>
              <FieldArray
                name="questions"
                editable
                defaultValues={{
                  description: '',
                  type: '',
                  actionOn: '',
                  typeOptions: []
                }}>
                {Questions}
              </FieldArray>
            </Panel>
          </PanelLayout>

          <FooterActions
            leftActions={[
              {
                prefix: 'flaticon-back',
                label: 'Back',
                onClick: () => {
                  history('/app/job-sequences')
                }
              }
            ]}
            centerActions={[
              {
                prefix: 'flaticon-teamwork',
                label: id ? 'Update' : 'Save',
                onClick: () => submitForm()
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
    name: '',
    description: '',
    grade: [],
    sequences: [{ description: '', type: '', actionOn: '', typeOptions: [] }],
    questions: [{ description: '', type: '', mandatory: '', typeOptions: [] }]
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
      apiClient.put(`job-sequences/update/${id}`, data).then(({ data }) => {
        if (data && data.result) {
          history('/app/job-sequences')
        }
      })
    } else {
      apiClient.post('job-sequences/add', data).then(({ data }) => {
        if (data && data.result) {
          history('/app/job-sequences')
        }
      })
    }
  }
})(JobSequenceForm)

function Sequences({ i, type }) {
  return (
    <Row gutter={[10, 5]}>
      <Col xs={12} sm={12} md={8} lg={8} xl={8}>
        <div className="form-field">
          <Field name={`sequences[${i}].description`} label="Description" />
        </div>
      </Col>
      {/* <Col xs={12} sm={12} md={8} lg={6} xl={6}>
        <div className="form-field">
          <Field name={`sequences[${i}].actionOn`} label="Action On" as="select" options={ACTION_ON} />
        </div>
      </Col> */}
      <Col xs={12} sm={12} md={8} lg={8} xl={8}>
        <div className="form-field">
          <Field name={`sequences[${i}].type`} label="Type" as="select" options={TYPES} />
        </div>
      </Col>
      {type && type !== 'Text' && (
        <Col xs={12} sm={12} md={8} lg={8} xl={8}>
          <div className="form-field">
            <Field name={`sequences[${i}].typeOptions`} label="Options" as="input-chip" />
          </div>
        </Col>
      )}
    </Row>
  )
}

function Questions({ i, type }) {
  return (
    <Row gutter={[10, 5]}>
      <Col xs={12} sm={12} md={8} lg={6} xl={6}>
        <div className="form-field">
          <Field name={`questions[${i}].description`} label="Description" />
        </div>
      </Col>
      <Col xs={12} sm={12} md={8} lg={6} xl={6}>
        <div className="form-field">
          <Field name={`questions[${i}].mandatory`} label="Mandatory" as="select" options={YES_NO_OPTIONS} />
        </div>
      </Col>
      <Col xs={12} sm={12} md={8} lg={6} xl={6}>
        <div className="form-field">
          <Field name={`questions[${i}].type`} label="Type" as="select" options={TYPES} />
        </div>
      </Col>
      {type && type !== 'Text' && (
        <Col xs={12} sm={12} md={8} lg={6} xl={6}>
          <div className="form-field">
            <Field name={`questions[${i}].typeOptions`} label="Options" as="input-chip" />
          </div>
        </Col>
      )}
    </Row>
  )
}
