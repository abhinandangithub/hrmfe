import { Col, message, Row } from 'antd'
import { FormikProps, withFormik } from 'formik'
import { isEmpty } from 'lodash'
import { useEffect, useState } from 'react'
import * as Yup from 'yup'
import Button from '../../../../Components/Button'
import Field from '../../../../Components/Formik/Field'
import Form from '../../../../Components/Formik/Form'
import { IStandardRates } from '../../../../Interfaces/IHrConfigurations'
import Panel from '../../../../Layout/Panel'
import apiClient from '../../../../Util/apiClient'
import { useTranslation } from 'react-i18next'




const {t} = useTranslation()


const Schema = Yup.object().shape({
  passport: Yup.number(),
  visa: Yup.number(),
  cpr: Yup.number(),
  drivingLicense: Yup.number(),
  carPassing: Yup.number(),
  crRenewal: Yup.number(),
  carInsurance: Yup.number(),
  gosi: Yup.number(),
  lmra: Yup.number(),
  indemnityUptoThreeYears: Yup.number(),
  indemnityAboveThreeYears: Yup.number(),
  normalOT: Yup.number(),
  nationalHolidayOT: Yup.number(),
  holidayOT: Yup.number(),
  airTicket1Way: Yup.number(),
  airTicket2Way: Yup.number(),
  schoolFee: Yup.number()
})

type TStandardRatesProps = {
  standardRates: IStandardRates
}

type TProps = FormikProps<TStandardRatesFormValues> & TStandardRatesProps

function StandardRates(props: TProps) {
  const [disabled, setDisabled] = useState(true)
  const { setValues, values, errors, submitForm, standardRates } = props

  useEffect(() => {
    setValues(standardRates)
  }, [])

  const onUpdate = () => {
    submitForm()

    if (isEmpty(errors)) {
      apiClient.put('hr-configurations/update/standardRates', { standardRates: values }).then(({ data }) => {
        if (data?.result) {
          message.success('Standard Rates has been updated successfully.')
          setDisabled(true)
        }
      })
    }
  }

  const handleCancel = () => {
    setValues(standardRates)
    setDisabled(true)
  }

  return (
    <Form>
      <Panel title={t('Gov / Other Standard Rates')} noBottom={false}>
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
          <Col xs={24} sm={12} md={6} lg={4}>
            <div style={{ fontSize: 14 }}>Passport</div>
          </Col>
          <Col xs={24} sm={12} md={6} lg={4}>
            <div className="form-field">
              <Field type="number" disabled={disabled} name="passport" addonAfter="BHD" />
            </div>
          </Col>

          <Col xs={24} sm={12} md={6} lg={4}>
            <div style={{ fontSize: 14 }}>VISA</div>
          </Col>
          <Col xs={24} sm={12} md={6} lg={4}>
            <div className="form-field">
              <Field type="number" disabled={disabled} name="visa" addonAfter="BHD" />
            </div>
          </Col>

          <Col xs={24} sm={12} md={6} lg={4}>
            <div style={{ fontSize: 14 }}>CPR</div>
          </Col>
          <Col xs={24} sm={12} md={6} lg={4}>
            <div className="form-field">
              <Field type="number" disabled={disabled} name="cpr" addonAfter="BHD" />
            </div>
          </Col>
        </Row>
        <Row gutter={[20, 10]}>
          <Col xs={24} sm={12} md={6} lg={4}>
            <div style={{ fontSize: 14 }}>Driving License</div>
          </Col>
          <Col xs={24} sm={12} md={6} lg={4}>
            <div className="form-field">
              <Field type="number" disabled={disabled} name="drivingLicense" addonAfter="BHD" />
            </div>
          </Col>

          <Col xs={24} sm={12} md={6} lg={4}>
            <div style={{ fontSize: 14 }}>Car Passing</div>
          </Col>
          <Col xs={24} sm={12} md={6} lg={4}>
            <div className="form-field">
              <Field type="number" disabled={disabled} name="carPassing" addonAfter="BHD" />
            </div>
          </Col>

          <Col xs={24} sm={12} md={6} lg={4}>
            <div style={{ fontSize: 14 }}>CR Renewal</div>
          </Col>
          <Col xs={24} sm={12} md={6} lg={4}>
            <div className="form-field">
              <Field type="number" disabled={disabled} name="crRenewal" addonAfter="BHD" />
            </div>
          </Col>
        </Row>
        <Row gutter={[20, 10]}>
          <Col xs={24} sm={12} md={6} lg={4}>
            <div style={{ fontSize: 14 }}>Car Insurance</div>
          </Col>
          <Col xs={24} sm={12} md={6} lg={4}>
            <div className="form-field">
              <Field type="number" disabled={disabled} name="carInsurance" addonAfter="BHD" />
            </div>
          </Col>

          <Col xs={24} sm={12} md={6} lg={4}>
            <div style={{ fontSize: 14 }}>Gosi</div>
          </Col>
          <Col xs={24} sm={12} md={6} lg={4}>
            <div className="form-field">
              <Field type="number" disabled={disabled} name="gosi" addonAfter="BHD" />
            </div>
          </Col>

          <Col xs={24} sm={12} md={6} lg={4}>
            <div style={{ fontSize: 14 }}>LMRA</div>
          </Col>
          <Col xs={24} sm={12} md={6} lg={4}>
            <div className="form-field">
              <Field type="number" disabled={disabled} name="lmra" addonAfter="BHD" />
            </div>
          </Col>
        </Row>
        <Row gutter={[20, 10]}>
          <Col xs={24} sm={12} md={6} lg={4}>
            <div style={{ fontSize: 14 }}>Indemnity 1-3rd Year</div>
          </Col>
          <Col xs={24} sm={12} md={6} lg={4}>
            <div className="form-field">
              <Field type="number" disabled={disabled} name="indemnityUptoThreeYears" addonAfter="%" />
            </div>
          </Col>

          <Col xs={24} sm={12} md={6} lg={4}>
            <div style={{ fontSize: 14 }}>Indemnity &gt;3</div>
          </Col>
          <Col xs={24} sm={12} md={6} lg={4}>
            <div className="form-field">
              <Field type="number" disabled={disabled} name="indemnityAboveThreeYears" addonAfter="%" />
            </div>
          </Col>

          <Col xs={24} sm={12} md={6} lg={4}>
            <div style={{ fontSize: 14 }}>OT - Normal Days</div>
          </Col>
          <Col xs={24} sm={12} md={6} lg={4}>
            <div className="form-field">
              <Field type="number" disabled={disabled} name="normalOT" addonAfter="%" />
            </div>
          </Col>
        </Row>
        <Row gutter={[20, 10]}>
          <Col xs={24} sm={12} md={6} lg={4}>
            <div style={{ fontSize: 14 }}>OT - National Holidays</div>
          </Col>
          <Col xs={24} sm={12} md={6} lg={4}>
            <div className="form-field">
              <Field type="number" disabled={disabled} name="nationalHolidayOT" addonAfter="%" />
            </div>
          </Col>

          <Col xs={24} sm={12} md={6} lg={4}>
            <div style={{ fontSize: 14 }}>OT - Holidays</div>
          </Col>
          <Col xs={24} sm={12} md={6} lg={4}>
            <div className="form-field">
              <Field type="number" disabled={disabled} name="holidayOT" addonAfter="%" />
            </div>
          </Col>

          <Col xs={24} sm={12} md={6} lg={4}>
            <div style={{ fontSize: 14 }}>Air Ticket 1 Way</div>
          </Col>
          <Col xs={24} sm={12} md={6} lg={4}>
            <div className="form-field">
              <Field type="number" disabled={disabled} name="airTicket1Way" addonAfter="BHD" />
            </div>
          </Col>
        </Row>
        <Row gutter={[20, 10]}>
          <Col xs={24} sm={12} md={6} lg={4}>
            <div style={{ fontSize: 14 }}>Air Ticket 2 Way</div>
          </Col>
          <Col xs={24} sm={12} md={6} lg={4}>
            <div className="form-field">
              <Field type="number" disabled={disabled} name="airTicket2Way" addonAfter="BHD" />
            </div>
          </Col>

          <Col xs={24} sm={12} md={6} lg={4}>
            <div style={{ fontSize: 14 }}>School Fee</div>
          </Col>
          <Col xs={24} sm={12} md={6} lg={4}>
            <div className="form-field">
              <Field type="number" disabled={disabled} name="schoolFee" addonAfter="BHD" />
            </div>
          </Col>
        </Row>
      </Panel>
    </Form>
  )
}

export type TStandardRatesFormValues = IStandardRates

export default withFormik<TStandardRatesProps, TStandardRatesFormValues>({
  mapPropsToValues: () => ({
    passport: undefined,
    visa: undefined,
    cpr: undefined,
    drivingLicense: undefined,
    carPassing: undefined,
    crRenewal: undefined,
    carInsurance: undefined,
    gosi: undefined,
    lmra: undefined,
    indemnityUptoThreeYears: undefined,
    indemnityAboveThreeYears: undefined,
    normalOT: undefined,
    nationalHolidayOT: undefined,
    holidayOT: undefined,
    airTicket1Way: undefined,
    airTicket2Way: undefined,
    schoolFee: undefined
  }),
  validationSchema: Schema,
  handleSubmit: () => null
})(StandardRates)
