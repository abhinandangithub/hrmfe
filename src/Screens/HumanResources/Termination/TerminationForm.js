import { Col, Radio, Row } from 'antd'
import { withFormik } from 'formik'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import * as Yup from 'yup'
import FooterActions from '../../../Components/FooterActions'
import { Field, Form } from '../../../Components/Formik'
import Panel from '../../../Layout/Panel'
import PanelLayout from '../../../Layout/PanelLayout'
import { history } from '../../../Routes'
import apiClient from '../../../Util/apiClient'

const Schema = Yup.object().shape({
  // employee: Yup.string().required(),
  terminationDate: Yup.date().required(),
  RefNo: Yup.string().required(),
  lastWorkingDate: Yup.date().required(),
  reason: Yup.string().required(),
  result: Yup.string().required()
})

function Termination({
  match: {
    params: { id }
  },
  setFieldValue,
  setValues,
  values
}) {
  // const [value, setValue] = React.useState(1)
  const { t } = useTranslation()
  const getDetails = () => {
    apiClient.get(`termination/get/${id}`).then(({ data }) => {
      if (data && data.result) {
        setValues(data.result)
      }
    })
  }

  useEffect(() => {
    if (id) {
      getDetails()
    }
  }, [])

  return (
    <Form>
      <Row justify="center" className="inner-contents">
        <Col xs={{ span: 22 }} sm={{ span: 22 }} md={{ span: 18 }} lg={{ span: 18 }}>
          <PanelLayout title={t('Employee Terminations')} className="mb-5">
            <Panel title={t('Employee Terminations')}>
              <Row justify="left" gutter={(12, 10)}>
                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 24 }}>
                  <div className="form-fields">
                    <Field
                      name="employee"
                      label="Employee"
                      as="paged-select"
                      mode="multiple"
                      endPoint="employees/get-active"
                      allowClear
                    />
                  </div>
                </Col>
                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 8 }}>
                  <div className="form-fields">
                    <Field name="terminationDate" label="Termination Date" as="date" />
                  </div>
                </Col>
                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 8 }}>
                  <div className="form-fields">
                    <Field name="RefNo" label="Reference Number" />
                  </div>
                </Col>
                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 8 }}>
                  <div className="form-fields">
                    <Field name="lastWorkingDate" label="Last Working Date" as="date" />
                  </div>
                </Col>
                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 24 }}>
                  <div className="form-fields">
                    <label>Termination Reason</label>
                    <Radio.Group
                      onChange={(e) => setFieldValue('reason', e.target.value)}
                      value={values.reason}
                      optionType="button"
                      buttonStyle="solid">
                      <Radio value="Termination of Employment with in 6 Months of Marriage contract">
                        Termination of Employment with in 6 Months of Marriage contract
                      </Radio>
                      <Radio value=" A worker left the work as a Result of Force Meajeure-No Benefits">
                        A worker left the work as a Result of Force Meajeure-No Benefits
                      </Radio>

                      <Radio value="Termination of Contract">Termination of Contract</Radio>
                      <Radio value="N/A">N/A</Radio>
                      <Radio value="The Resignation of the worker">The Resignation of the worker</Radio>
                    </Radio.Group>
                  </div>
                </Col>
                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 24 }}>
                  <div className="form-fields">
                    <label>Termination Results</label>
                    <Radio.Group
                      style={{ marginLeft: '10px' }}
                      onChange={(e) => setFieldValue('result', e.target.value)}
                      value={values.result}
                      optionType="button"
                      buttonStyle="solid">
                      <Radio value="N/A">N/A</Radio>
                      <Radio value="Exit">Exit</Radio>
                      <Radio value="Out of Service">Out of Service</Radio>
                    </Radio.Group>
                  </div>
                </Col>
                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 24 }}>
                  <div className="form-fields">
                    <Field name="remarks" label="Remarks" as="textarea" />
                  </div>
                </Col>
                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 24 }}>
                  <div className="form-fields">
                    <label>Future Induction :</label>
                    <Radio.Group
                      style={{ marginLeft: '10px' }}
                      onChange={(e) => setFieldValue('futureInduction', e.target.value)}
                      value={values.futureInduction}
                      optionType="button"
                      buttonStyle="solid">
                      <Radio value="Recommended">Recommended</Radio>
                      <Radio value="Not recommended">Not Recommended</Radio>
                    </Radio.Group>
                  </div>
                </Col>
              </Row>
            </Panel>
          </PanelLayout>
        </Col>
      </Row>

      <FooterActions
        leftActions={[
          {
            prefix: 'flaticon-back',
            label: 'Back to Termination list',
            onClick: () => history.push('/app/termination')
          }
        ]}
        centerActions={[
          {
            prefix: 'flaticon-user-1',
            label: 'Send checklist to employee',
            type: 'submit'
          }
        ]}
        rightActions={[
          id
            ? {
                prefix: 'flaticon-user-1',
                label: 'Accept Termination'
              }
            : {
                prefix: 'flaticon-user-1',
                label: 'Finalize Termination'
              }
        ]}
      />
    </Form>
  )
}

export default withFormik({
  mapPropsToValues: () => ({
    terminationDate: '',
    RefNo: '',
    lastWorkingDate: '',
    remarks: '',
    reason: '',
    result: '',
    futureInduction: ''
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
      apiClient.put(`termination/update/${id}`, data).then(({ data }) => {
        if (data && data.result) {
          history.push('/app/termination')
        }
      })
    } else {
      apiClient.post('termination/add', data).then(({ data }) => {
        if (data && data.result) {
          history.push('/app/termination')
        }
      })
    }
  }
})(Termination)
