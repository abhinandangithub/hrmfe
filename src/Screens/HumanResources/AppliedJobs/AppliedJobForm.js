import { Col, message, Row } from 'antd'
import { withFormik } from 'formik'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import * as Yup from 'yup'
import FooterActions from '../../../Components/FooterActions'
import { Field, Form } from '../../../Components/Formik'
import FieldArray from '../../../Components/Formik/FieldArray'
import Panel from '../../../Layout/Panel'
import PanelLayout from '../../../Layout/PanelLayout'
import apiClient from '../../../Util/apiClient'
import { sanitize } from '../../../Util/Util'

const Schema = Yup.object().shape({
  firstName: Yup.string().required(),
  lastName: Yup.string().required(),
  email: Yup.string().required()
})

function JobPostingForm({
  setValues,
  values,
  match: {
    params: { id }
  },
  submitForm,
  history,
  setFieldValue
}) {
  const { t } = useTranslation()
  const getData = () => {
    if (id) {
      apiClient.get(`applied-jobs/get/${id}`).then(({ data }) => {
        if (data && data.result) {
          data.result.sequences = data.result.sequences.map((v) => {
            v.value = v.value || ''

            return v
          })
          setValues({ ...values, ...data.result })
        }
      })
    }
  }

  useEffect(() => {
    getData()
  }, [])

  const onSave = (status) => {
    let flag = true
    values.sequences.forEach((v) => {
      if (!v.value) {
        flag = false
      }
    })

    if (flag) {
      setFieldValue('status', status)
      submitForm()
    } else {
      message.error('Please complete all the sequence')
    }
  }

  return (
    <Form>
      <Row justify="center" className="inner-contents" style={{ minHeight: '100vh' }}>
        <Col xs={22} sm={22} md={20} lg={21}>
          <PanelLayout title={t(`${values.jobId} - ${values.name} - ${values.status}`)}>
            <Row gutter={[20]}>
              <Col xs={22} sm={22} md={20} lg={16}>
                <Panel title={t('Personal details')}>
                  <Row gutter={[20, 10]}>
                    <Col xs={24} sm={24} md={12} lg={8}>
                      <div className="form-field">
                        <Field name="firstName" label="First Name" disabled />
                      </div>
                    </Col>
                    <Col xs={24} sm={24} md={12} lg={8}>
                      <div className="form-field">
                        <Field name="lastName" label="Last Name" disabled />
                      </div>
                    </Col>
                    <Col xs={24} sm={24} md={12} lg={8}>
                      <div className="form-field">
                        <Field name="email" label="Email" disabled />
                      </div>
                    </Col>
                  </Row>
                </Panel>

                <Panel title={t('Questionnaire')}>
                  <table>
                    {values.questions.map((v, i) => (
                      <tr key={i}>
                        <td style={{ padding: 10 }}>{v.description}</td>
                        <td style={{ paddingLeft: 50 }}>{v.value}</td>
                      </tr>
                    ))}
                  </table>
                </Panel>
                <Panel title={t('Sequence / Rounds')}>
                  <FieldArray
                    name="sequences"
                    defaultValues={{
                      description: '',
                      type: '',
                      actionOn: '',
                      typeOptions: []
                    }}>
                    {Questions}
                  </FieldArray>
                </Panel>
              </Col>
              <Col xs={22} sm={22} md={20} lg={8}>
                <Panel title={t('Resume')}>
                  <iframe style={{ width: '100%', height: 300 }} src={values.attachment} title="Resume" />
                </Panel>
                <Panel title={t('Job Description')}>
                  <Row gutter={[20, 10]}>
                    <Col xs={24} sm={24} md={24} lg={24}>
                      <div className="form-field">
                        <div {...sanitize(values.description)} />
                      </div>
                    </Col>
                  </Row>
                </Panel>
              </Col>
            </Row>
          </PanelLayout>
        </Col>
      </Row>
      <FooterActions
        leftActions={[
          {
            prefix: 'flaticon-back',
            label: 'Back',
            onClick: () => {
              history('/app/applied-jobs')
            }
          }
        ]}
        centerActions={[
          {
            prefix: 'flaticon-teamwork',
            label: 'Update',
            onClick: () => submitForm(),
            dontShow: values.status !== 'Pending'
          }
        ]}
        rightActions={[
          {
            prefix: 'flaticon-blockchain-1',
            label: 'Shortlist',
            onClick: () => onSave('Shortlisted'),
            dontShow: !(values.status === 'Pending')
          },
          {
            prefix: 'flaticon-tick-1',
            label: 'Accept',
            onClick: () => onSave('Accepted'),
            dontShow: !['Pending', 'Shortlisted'].includes(values.status)
          },
          {
            prefix: 'flaticon-export',
            label: 'Reject',
            onClick: () => onSave('Rejected'),
            dontShow: !['Pending', 'Shortlisted'].includes(values.status)
          }
        ]}
      />
    </Form>
  )
}

export default withFormik({
  mapPropsToValues: () => ({
    firstName: '',
    lastName: '',
    email: '',
    jobId: '',
    name: '',
    description: '',
    division: null,
    department: null,
    costCenter: null,
    inCharge: null,
    hrManager: null,
    postingDate: '',
    closingDate: '',
    sequences: [],
    questions: []
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
    apiClient.put(`applied-jobs/update/${id}`, data).then(({ data }) => {
      if (data && data.result) {
        history('/app/applied-jobs')
      }
    })
  }
})(JobPostingForm)

function Questions({ i, description, type, typeOptions }) {
  const options = typeOptions.map((v) => ({ label: v, value: v }))

  const getFields = () => {
    switch (type) {
      case 'Text':
        return <Field name={`sequences[${i}].value`} />
      case 'Dropdown':
        return <Field name={`sequences[${i}].value`} as="select" options={options} />
      case 'Radio':
        return <Field name={`sequences[${i}].value`} as="radio-group" options={options} />

      default:
        return null
    }
  }

  return (
    <Row gutter={[10, 5]}>
      <Col xs={12} sm={12} md={8} lg={12} xl={12}>
        <div className="form-field">{description}</div>
      </Col>
      <Col xs={12} sm={12} md={8} lg={12} xl={12}>
        <div className="form-field">{getFields()}</div>
      </Col>
    </Row>
  )
}
