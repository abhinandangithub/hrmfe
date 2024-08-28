import { Col, Row, message } from 'antd'
import { FormikProps, withFormik } from 'formik'
import { isEmpty } from 'lodash'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import * as Yup from 'yup'
import Button from '../../../../Components/Button'
import Field from '../../../../Components/Formik/Field'
import Form from '../../../../Components/Formik/Form'
import { IAlerts } from '../../../../Interfaces/IHrConfigurations'
import Panel from '../../../../Layout/Panel'
import { removeEmptyKeys } from '../../../../Util/Util'
import apiClient from '../../../../Util/apiClient'


const Schema = Yup.object().shape({
  passport: Yup.number().nullable(),
  visa: Yup.number().nullable(),
  cpr: Yup.number().nullable(),
  drivingLicense: Yup.number().nullable(),
  carPassing: Yup.number().nullable(),
  crRenewal: Yup.number().nullable(),
  carInsurance: Yup.number().nullable()
})

type TAlertsProps = {
  alerts: IAlerts
}

type TProps = FormikProps<TAlertsFormValues> & TAlertsProps

function Alerts(props: TProps) {
  const { t } = useTranslation()
  const [disabled, setDisabled] = useState(true)
  const { setValues, values, errors, submitForm, alerts } = props


  useEffect(() => {
    if (alerts) {
      setValues(alerts)
    }
  }, [alerts])

  const onUpdate = () => {
    submitForm()

    if (isEmpty(errors)) {
      apiClient
        .put('hr-configurations/update/alerts', { alerts: removeEmptyKeys(values) })
        .then(({ data }) => {
          if (data?.result) {
            message.success('Alert configurations has been updated successfully.')
            setDisabled(true)
          }
        })
    }
  }

  const handleCancel = () => {
    if (alerts) {
      setValues(alerts)
    }

    setDisabled(true)
  }

  return (
    <Form>
      <Panel title={t('Alert Configurations')} noBottom={false}>
        <div style={{ position: 'absolute', top: -40, right: 15 }}>
          {disabled ? (
            <Button variant="primary" onClick={() => setDisabled(false)}>
              Edit
            </Button>
          ) : (
            <>
              <Button className="mr-2" onClick={handleCancel}>
                Cancel
              </Button>
              <Button variant="primary" onClick={onUpdate}>
                Save
              </Button>
            </>
          )}
        </div>

        <Row gutter={[20, 10]}>
          <Col xs={24} sm={12} md={6} lg={4} className='py-3'>
            <div style={{ fontSize: 14 }}>Passport</div>
          </Col>
          <Col xs={24} sm={12} md={6} lg={4}>
            <div className="form-field" id="pass">
              <Field type="number" disabled={disabled} name="passport" addonAfter="days" />
            </div>
          </Col>

          <Col xs={24} sm={12} md={6} lg={4} className='py-3'>
            <div style={{ fontSize: 14 }}>VISA</div>
          </Col>
          <Col xs={24} sm={12} md={6} lg={4}>
            <div className="form-field">
              <Field type="number" disabled={disabled} name="visa" addonAfter="days" />
            </div>
          </Col>

          <Col xs={24} sm={12} md={6} lg={4} className='py-3'>
            <div style={{ fontSize: 14 }}>CPR</div>
          </Col>
          <Col xs={24} sm={12} md={6} lg={4}>
            <div className="form-field">
              <Field type="number" disabled={disabled} name="cpr" addonAfter="days" />
            </div>
          </Col>
        </Row>
        <Row gutter={[20, 10]}>
          <Col xs={24} sm={12} md={6} lg={4} className='py-3'>
            <div style={{ fontSize: 14 }}>Driving License</div>
          </Col>
          <Col xs={24} sm={12} md={6} lg={4}>
            <div className="form-field">
              <Field type="number" disabled={disabled} name="drivingLicense" addonAfter="days" />
            </div>
          </Col>

          <Col xs={24} sm={12} md={6} lg={4} className='py-3'>
            <div style={{ fontSize: 14 }}>Car Passing</div>
          </Col>
          <Col xs={24} sm={12} md={6} lg={4}>
            <div className="form-field">
              <Field type="number" disabled={disabled} name="carPassing" addonAfter="days" />
            </div>
          </Col>

          <Col xs={24} sm={12} md={6} lg={4} className='py-3'>
            <div style={{ fontSize: 14 }}>CR Renewal</div>
          </Col>
          <Col xs={24} sm={12} md={6} lg={4}>
            <div className="form-field">
              <Field type="number" disabled={disabled} name="crRenewal" addonAfter="days" />
            </div>
          </Col>
        </Row>
        <Row gutter={[20, 10]}>
          <Col xs={24} sm={12} md={6} lg={4} className='py-3'>
            <div style={{ fontSize: 14 }}>Car Insurance</div>
          </Col>
          <Col xs={24} sm={12} md={6} lg={4}>
            <div className="form-field">
              <Field type="number" disabled={disabled} name="carInsurance" addonAfter="days" />
            </div>
          </Col>
        </Row>
      </Panel>
    </Form>
  )
}

type TAlertsFormValues = {
  passport: TNumber
  visa: TNumber
  cpr: TNumber
  drivingLicense: TNumber
  carPassing: TNumber
  crRenewal: TNumber
  carInsurance: TNumber
}

export default withFormik<TAlertsProps, TAlertsFormValues>({
  mapPropsToValues: () => ({
    passport: '',
    visa: '',
    cpr: '',
    drivingLicense: '',
    carPassing: '',
    crRenewal: '',
    carInsurance: ''
  }),
  validationSchema: Schema,
  handleSubmit: () => null
})(Alerts)
