import { Col, Row } from 'antd'
import { useEffect, useState } from 'react'
import Field from '../../../Components/Formik/Field'
import Form from '../../../Components/Formik/Form'
import { IStandardRates } from '../../../Interfaces/IHrConfigurations'
import apiClient from '../../../Util/apiClient'
import { TDependentExpenseFormValues } from './DependentsExpenseReport'

const APPROVAL_OPTIONS = [
  {
    label: 'Yes',
    value: 'Yes'
  },
  {
    label: 'No',
    value: 'No'
  }
]

type TDependentOptionList = {
  label: string
  value: string
  relationship: string
}

type TProps = {
  dependentsOptionList: TDependentOptionList[]
  values: TDependentExpenseFormValues
  setFieldValue: (field: string, value: number | undefined, shouldValidate?: boolean | undefined) => void
}

const DependentExpenseForm = (props: TProps) => {
  const { values, dependentsOptionList, setFieldValue } = props
  const [standardRates, setStandardRates] = useState<IStandardRates | null>(null)
  const [selectedFields, setSelectedFields] = useState<Record<string, boolean>>({})

  useEffect(() => {
    apiClient.get('hr-configurations/get/standardRates').then(({ data }) => {
      if (data?.result) {
        setStandardRates(data?.result)
      }
    })
  }, [])

  const handleRadioChange = (name: string, value: string) => {
    if (value === 'Yes' && standardRates) {
      setSelectedFields((prevState) => ({
        ...prevState,
        [name]: true
      }))
      setFieldValue(name, standardRates[name as keyof IStandardRates])
    } else {
      setSelectedFields((prevState) => ({
        ...prevState,
        [name]: false
      }))
      setFieldValue(name, 0)
    }
  }

  return (
    <Form>
      <Row justify="start" gutter={[12, 10]}>
        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 12 }}>
          <div className="form-field">
            <Field required name="id" label="Dependent" as="select" options={dependentsOptionList} disabled />
          </div>
        </Col>
        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 12 }}>
          <div className="form-field">
            <Field
              name="relationship"
              label="Relationship"
              disabled
              value={
                dependentsOptionList.find((dependent) => dependent.value === values.id)?.relationship ?? ''
              }
            />
          </div>
        </Col>
        <br />

        <Col xs={24} sm={12} md={24} lg={8}>
          <div style={{ fontSize: 14 }}>Passport</div>
        </Col>
        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 8 }}>
          <div className="form-field">
            <Field
              as="radio-group"
              name="passport"
              value={values.passport || selectedFields?.passport ? 'Yes' : 'No'}
              onChange={handleRadioChange}
              options={APPROVAL_OPTIONS}
            />
          </div>
        </Col>
        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 8 }}>
          <div className="form-field">
            <Field
              required
              name="passport"
              placeholder="Passport"
              disabled={!values.passport && !selectedFields.passport}
              addonAfter="BHD"
            />
          </div>
        </Col>

        <Col xs={24} sm={12} md={24} lg={8}>
          <div style={{ fontSize: 14 }}>Visa</div>
        </Col>
        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 8 }}>
          <div className="form-field">
            <Field
              as="radio-group"
              name="visa"
              value={values.visa || selectedFields?.visa ? 'Yes' : 'No'}
              onChange={handleRadioChange}
              options={APPROVAL_OPTIONS}
            />
          </div>
        </Col>
        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 8 }}>
          <div className="form-field">
            <Field
              required
              name="visa"
              placeholder="Visa Cost"
              disabled={!values.visa && !selectedFields.visa}
              addonAfter="BHD"
            />
          </div>
        </Col>

        <Col xs={24} sm={12} md={24} lg={8}>
          <div style={{ fontSize: 14 }}>Insurance</div>
        </Col>
        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 8 }}>
          <div className="form-field">
            <Field
              as="radio-group"
              name="insurance"
              value={values.insurance || selectedFields?.insurance ? 'Yes' : 'No'}
              onChange={handleRadioChange}
              options={APPROVAL_OPTIONS}
            />
          </div>
        </Col>
        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 8 }}>
          <div className="form-field">
            <Field
              required
              name="insurance"
              placeholder="Insurance"
              disabled={!values.insurance && !selectedFields.insurance}
              addonAfter="BHD"
            />
          </div>
        </Col>

        <Col xs={24} sm={12} md={24} lg={8}>
          <div style={{ fontSize: 14 }}>Driving License</div>
        </Col>
        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 8 }}>
          <div className="form-field">
            <Field
              as="radio-group"
              name="drivingLicense"
              value={values.drivingLicense || selectedFields?.drivingLicense ? 'Yes' : 'No'}
              onChange={handleRadioChange}
              options={APPROVAL_OPTIONS}
            />
          </div>
        </Col>
        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 8 }}>
          <div className="form-field">
            <Field
              required
              name="drivingLicense"
              placeholder="Driving License"
              disabled={!values.drivingLicense && !selectedFields.drivingLicense}
              addonAfter="BHD"
            />
          </div>
        </Col>

        <Col xs={24} sm={12} md={24} lg={8}>
          <div style={{ fontSize: 14 }}>Car Insurance</div>
        </Col>
        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 8 }}>
          <div className="form-field">
            <Field
              as="radio-group"
              name="carInsurance"
              value={values.carInsurance || selectedFields?.carInsurance ? 'Yes' : 'No'}
              onChange={handleRadioChange}
              options={APPROVAL_OPTIONS}
            />
          </div>
        </Col>
        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 8 }}>
          <div className="form-field">
            <Field
              required
              name="carInsurance"
              placeholder="Car Insurance"
              disabled={!values.carInsurance && !selectedFields.carInsurance}
              addonAfter="BHD"
            />
          </div>
        </Col>

        <Col xs={24} sm={12} md={24} lg={8}>
          <div style={{ fontSize: 14 }}>GOSI</div>
        </Col>
        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 8 }}>
          <div className="form-field">
            <Field
              as="radio-group"
              name="gosi"
              value={values.gosi || selectedFields?.gosi ? 'Yes' : 'No'}
              onChange={handleRadioChange}
              options={APPROVAL_OPTIONS}
            />
          </div>
        </Col>
        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 8 }}>
          <div className="form-field">
            <Field
              required
              name="gosi"
              placeholder="GOSI"
              disabled={!values.gosi && !selectedFields.gosi}
              addonAfter="BHD"
            />
          </div>
        </Col>

        <Col xs={24} sm={12} md={24} lg={8}>
          <div style={{ fontSize: 14 }}>LMRA</div>
        </Col>
        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 8 }}>
          <div className="form-field">
            <Field
              as="radio-group"
              name="lmra"
              value={values.lmra || selectedFields?.lmra ? 'Yes' : 'No'}
              onChange={handleRadioChange}
              options={APPROVAL_OPTIONS}
            />
          </div>
        </Col>
        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 8 }}>
          <div className="form-field">
            <Field
              required
              name="lmra"
              placeholder="LMRA"
              disabled={!values.lmra && !selectedFields.lmra}
              addonAfter="BHD"
            />
          </div>
        </Col>

        <Col xs={24} sm={12} md={24} lg={8}>
          <div style={{ fontSize: 14 }}>CPR</div>
        </Col>
        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 8 }}>
          <div className="form-field">
            <Field
              as="radio-group"
              name="cpr"
              value={values.cpr || selectedFields?.cpr ? 'Yes' : 'No'}
              onChange={handleRadioChange}
              options={APPROVAL_OPTIONS}
            />
          </div>
        </Col>
        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 8 }}>
          <div className="form-field">
            <Field
              required
              name="cpr"
              placeholder="CPR"
              disabled={!values.cpr && !selectedFields.cpr}
              addonAfter="BHD"
            />
          </div>
        </Col>

        <Col xs={24} sm={12} md={24} lg={8}>
          <div style={{ fontSize: 14 }}>Air Ticket 1 Way</div>
        </Col>
        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 8 }}>
          <div className="form-field">
            <Field
              as="radio-group"
              name="airTicket1Way"
              value={values.airTicket1Way || selectedFields?.airTicket1Way ? 'Yes' : 'No'}
              onChange={handleRadioChange}
              options={APPROVAL_OPTIONS}
            />
          </div>
        </Col>
        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 8 }}>
          <div className="form-field">
            <Field
              required
              name="airTicket1Way"
              placeholder="Air Ticket 1 Way"
              disabled={!values.airTicket1Way && !selectedFields.airTicket1Way}
              addonAfter="BHD"
            />
          </div>
        </Col>

        <Col xs={24} sm={12} md={24} lg={8}>
          <div style={{ fontSize: 14 }}>Air Ticket 2 Way</div>
        </Col>
        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 8 }}>
          <div className="form-field">
            <Field
              as="radio-group"
              name="airTicket2Way"
              value={values.airTicket2Way || selectedFields?.airTicket2Way ? 'Yes' : 'No'}
              onChange={handleRadioChange}
              options={APPROVAL_OPTIONS}
            />
          </div>
        </Col>
        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 8 }}>
          <div className="form-field">
            <Field
              required
              name="airTicket2Way"
              placeholder="Air Ticket 2 Way"
              disabled={!values.airTicket2Way && !selectedFields.airTicket2Way}
              addonAfter="BHD"
            />
          </div>
        </Col>

        <Col xs={24} sm={12} md={24} lg={8}>
          <div style={{ fontSize: 14 }}>School Fee</div>
        </Col>
        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 8 }}>
          <div className="form-field">
            <Field
              as="radio-group"
              name="schoolFee"
              value={values.schoolFee || selectedFields?.schoolFee ? 'Yes' : 'No'}
              onChange={handleRadioChange}
              options={APPROVAL_OPTIONS}
            />
          </div>
        </Col>
        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 8 }}>
          <div className="form-field">
            <Field
              required
              name="schoolFee"
              placeholder="School Fee"
              disabled={!values.schoolFee && !selectedFields.schoolFee}
              addonAfter="BHD"
            />
          </div>
        </Col>
      </Row>
    </Form>
  )
}

export default DependentExpenseForm
