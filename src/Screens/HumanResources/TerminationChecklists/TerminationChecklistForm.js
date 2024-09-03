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

const ACTION_ON = [
  { label: 'HR Manager', value: 'HR Manager' },
  { label: 'Reporting Manager ', value: 'Reporting Manager' },
  { label: 'Self', value: 'Self' }
]

const TYPES = [
  { label: 'Text', value: 'Text' },
  { label: 'Dropdown', value: 'Dropdown' },
  { label: 'Radio', value: 'Radio' }
]

const Schema = Yup.object().shape({
  name: Yup.string().required(),
  description: Yup.string().required(),
  items: Yup.array()
    .of(
      Yup.object().shape({
        description: Yup.string().required(),
        actionOn: Yup.string().required(),
        type: Yup.string().required()
      })
    )
    .required()
})

function TerminationChecklistForm({
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
      apiClient.get(`termination-checklists/get/${id}`).then(({ data }) => {
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
          <PanelLayout title={t('Termination Checklist')}>
            <Panel title={t('Checklist Details')}>
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
                    <Field
                      name="division"
                      label="Division"
                      as="paged-select"
                      endPoint="divisions/get-active"
                    />
                  </div>
                </Col>
                <Col xs={24} sm={24} md={12} lg={8}>
                  <div className="form-field">
                    <Field
                      name="department"
                      label="Department"
                      as="paged-select"
                      endPoint="department/get-active"
                    />
                  </div>
                </Col>
                <Col xs={24} sm={24} md={12} lg={8}>
                  <div className="form-field">
                    <Field
                      name="grades"
                      label="Grade"
                      as="paged-select"
                      endPoint="grades/get-active"
                      mode="multiple"
                    />
                  </div>
                </Col>
              </Row>
            </Panel>

            <Panel title={t('Checklists')}>
              <FieldArray
                name="items"
                editable
                defaultValues={{
                  description: '',
                  type: '',
                  actionOn: '',
                  typeOptions: []
                }}>
                {Checklists}
              </FieldArray>
            </Panel>
          </PanelLayout>

          <FooterActions
            leftActions={[
              {
                prefix: 'flaticon-back',
                label: 'Cancel',
                onClick: () => {
                  history('/app/termination-checklists')
                }
              }
            ]}
            centerActions={[
              {
                prefix: 'flaticon-teamwork',
                label: id ? 'Update' : 'Save',
                onClick: () => submitForm(),
                dontShow: values.status === 'Transfered'
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
    transferType: '',
    division: null,
    department: null,
    grade: [],
    items: [{ description: '', type: '', actionOn: '', typeOptions: [] }]
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
      apiClient.put(`termination-checklists/update/${id}`, data).then(({ data }) => {
        if (data && data.result) {
          history('/app/termination-checklists')
        }
      })
    } else {
      apiClient.post('termination-checklists/add', data).then(({ data }) => {
        if (data && data.result) {
          history('/app/termination-checklists')
        }
      })
    }
  }
})(TerminationChecklistForm)

function Checklists({ i, type }) {
  return (
    <Row gutter={[10, 5]}>
      <Col xs={12} sm={12} md={8} lg={6} xl={6}>
        <div className="form-field">
          <Field name={`items[${i}].description`} label="Description" />
        </div>
      </Col>
      <Col xs={12} sm={12} md={8} lg={6} xl={6}>
        <div className="form-field">
          <Field name={`items[${i}].actionOn`} label="Action On" as="select" options={ACTION_ON} />
        </div>
      </Col>
      <Col xs={12} sm={12} md={8} lg={6} xl={6}>
        <div className="form-field">
          <Field name={`items[${i}].type`} label="Type" as="select" options={TYPES} />
        </div>
      </Col>
      {type && type !== 'Text' && (
        <Col xs={12} sm={12} md={8} lg={6} xl={6}>
          <div className="form-field">
            <Field name={`items[${i}].typeOptions`} label="Options" as="input-chip" />
          </div>
        </Col>
      )}
    </Row>
  )
}
