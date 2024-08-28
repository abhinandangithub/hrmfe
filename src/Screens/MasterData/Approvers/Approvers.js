import { Col, message, Row, Tabs } from 'antd'
import { withFormik } from 'formik'
import _ from 'lodash'
import { useEffect, useState } from 'react'
import { withTranslation, useTranslation } from 'react-i18next'
import * as Yup from 'yup'
import FooterActions from '../../../Components/FooterActions'
import { Field, FieldArray, Form } from '../../../Components/Formik'
import Panel from '../../../Layout/Panel'
import PanelLayout from '../../../Layout/PanelLayout'
import apiClient from '../../../Util/apiClient'

const { TabPane } = Tabs

const Schema = Yup.object().shape({
  levels: Yup.array().of(
    Yup.object().shape({
      name: Yup.string().required(),
      approvers: Yup.array().min(1, 'Approvers is a required field').required(),
      value: Yup.number()
    })
  )
})

const tabData = [{ label: 'Purchase Request', value: 'PurchaseRequest' }]

function Approvers({ setValues, values, submitForm, validateForm }) {
  const [activeTab, setActiveTab] = useState('PurchaseRequest')
  
  const { t } = useTranslation()
  useEffect(() => {
    getData(activeTab)
  }, [])

  const onSave = async (entityType) => {
    await submitForm()
    validateForm().then((err) => {
      if (_.isEmpty(err)) {
        const approveData = { ...values, entityType }
        apiClient.put(`approvers/manage/${entityType}`, approveData).then(({ data }) => {
          if (data?.result) {
            message.success('Approvers saved')
            setValues({ ...values, ...data.result })
          }
        })
      }
    })
  }

  const getData = (type) => {
    apiClient.get(`approvers/get-by-entity/${type}`, {}).then(({ data }) => {
      if (data?.result) {
        setValues({ ...values, ...data.result })
      }
    })
  }

  const onChangeTab = (tab) => {
    setActiveTab(tab)
    getData(tab)
  }

  return (
    <Form>
      <Row justify="center" className="inner-contents">
        <Col xs={22} sm={22} md={20} lg={22}>
          <PanelLayout title={t('Approvers')}>
            <Tabs className="reports-tab" defaultActiveKey={activeTab} onChange={onChangeTab}>
              {tabData.map((v) => (
                <TabPane tab={v.label} key={v.value}>
                  <Row gutter={[20, 20]}>
                    <Col lg={24}>
                      <Panel title={`${v.label} Approvers`}>
                        <FieldArray
                          name="levels"
                          additionalValues={{}}
                          defaultValues={{
                            name: '',
                            approvers: []
                          }}>
                          {ApproverForm}
                        </FieldArray>
                      </Panel>
                    </Col>
                  </Row>
                </TabPane>
              ))}
            </Tabs>
            <FooterActions
              centerActions={[
                {
                  prefix: 'flaticon-invoice-3',
                  label: 'Save',
                  onClick: () => onSave(activeTab)
                }
              ]}
            />
          </PanelLayout>
        </Col>
      </Row>
    </Form>
  )
}

export default withFormik({
  mapPropsToValues: () => ({
    levels: [{ name: '', approvers: [], value: '' }]
  }),
  handleSubmit: () => null,
  validationSchema: Schema
})(Approvers)

// function ApproverForm({ i, ...props }) {
//   return (
//     <Row gutter={[10, 5]}>
//       <Col xs={12} sm={12} md={8} lg={8}>
//         <div className="form-field">
//           <Field name={`levels[${i}].name`} label={props.t('Name / Description')} />
//         </div>
//       </Col>
//       <Col xs={12} sm={12} md={8} lg={12}>
//         <div className="form-field">
//           <Field
//             label="Approvers"
//             as="paged-select"
//             name={`levels[${i}].approvers`}
//             endPoint="users/get-active-by-company"
//             optionValue="user"
//             mode="multiple"
//           />
//         </div>
//       </Col>
//       <Col xs={12} sm={12} md={8} lg={4}>
//         <div className="form-field">
//           <Field name={`levels[${i}].value`} label="Value" />
//         </div>
//       </Col>
//     </Row>
//   )
// }
const ApproverForm = withTranslation()(({ i, ...props }) => (
  <Row gutter={[10, 5]}>
    <Col xs={12} sm={12} md={8} lg={8}>
      <div className="form-field">
        <Field name={`levels[${i}].name`} label={props.t('Name / Description')} />
      </div>
    </Col>
    <Col xs={12} sm={12} md={8} lg={12}>
      <div className="form-field">
        <Field
          label={props.t('Approvers')}
          as="paged-select"
          name={`levels[${i}].approvers`}
          endPoint="users/get-active-by-company"
          optionValue="user"
          mode="multiple"
        />
      </div>
    </Col>
    <Col xs={12} sm={12} md={8} lg={4}>
      <div className="form-field">
        <Field name={`levels[${i}].value`} label={props.t('Value')} />
      </div>
    </Col>
  </Row>
))
