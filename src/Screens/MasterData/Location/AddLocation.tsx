import { Col, Row } from 'antd'
import { withFormik } from 'formik'
import _ from 'lodash'
import { withTranslation } from 'react-i18next'
import * as Yup from 'yup'
import { Field, Form } from '../../../Components/Formik'
import ModalBoxFooter from '../../../Components/ModalBox/ModalBoxFooter'
import apiClient from '../../../Util/apiClient'

const Schema = Yup.object().shape({
  locationId: Yup.string().required(),
  name: Yup.string().required(),
  workHour: Yup.string().required(),
  houseNo: Yup.string().required(),
  street: Yup.string().required(),
  town: Yup.string().required(),
  city: Yup.string().required(),
  country: Yup.string().required(),
  postalCode: Yup.string().required(),
})

function LocationForm(props?: any) {
  const onSave = async () => {
    await props.submitForm()
    props.validateForm().then((err: any) => {
      if (_.isEmpty(err)) {
        if (props.selectedLoc) {
          apiClient.put(`location/update/${props.selectedLoc.id}`, props.values).then(({ data }) => {
            if (data && data.success) {
              props.onCancel(true)
            }
          })
        } else {
          apiClient.post('location/add', props.values).then(({ data }) => {
            if (data && data.result) {
              props.onCancel(true)
            }
          })
        }
      }
    })
  }

  return (
    <Form>
      <Row gutter={[10, 5]}>
        <Col xs={24}>
          <div className="form-fields">
            <Field name="locationId" label={props.t('Location Id')} />
          </div>
        </Col>
        <Col xs={24}>
          <div className="form-fields">
            <Field name="name" label={props.t('Name')} />
          </div>
        </Col>
        <Col xs={24}>
          <div className="form-fields">
            <Field name="workHour" label={props.t('Planned Working Hours')} />
          </div>
        </Col>
        <Col xs={8}>
          <div className="form-field">
            <Field name="houseNo" label="House No" />
          </div>
        </Col>
        <Col xs={16}>
          <div className="form-field">
            <Field name="street" label="Street" />
          </div>
        </Col>
        <Col xs={12}>
          <div className="form-field">
            <Field name="town" label="Town" />
          </div>
        </Col>
        <Col xs={12}>
          <div className="form-field">
            <Field name="city" label="City" />
          </div>
        </Col>
        <Col xs={12}>
          <div className="form-field">
            <Field name="country" label="Country" />
          </div>
        </Col>
        <Col xs={12}>
          <div className="form-field">
            <Field name="postalCode" label="Postal Code" />
          </div>
        </Col>

      </Row>
      <div className="form-fields">
        <ModalBoxFooter
          okText={props.t(props.selectedLoc ? 'Update' : 'Add')}
          onOk={() => onSave()}
          onCancel={() => props.onCancel()}
        />
      </div>
    </Form>
  )
}

export default withFormik({
  mapPropsToValues: ({ selectedLoc = {} }: any) => ({
    locationId: selectedLoc?.locationId || '',
    name: selectedLoc?.name || '',
    workHour: selectedLoc?.workHour || '',
    houseNo: selectedLoc?.houseNo || '',
    street: selectedLoc?.street || '',
    town: selectedLoc?.town || '',
    city: selectedLoc?.city || '',
    country: selectedLoc?.country || '',
    postalCode: selectedLoc?.postalCode || '',

  }),

  handleSubmit: () => null,
  validationSchema: Schema
})(withTranslation()(LocationForm))
