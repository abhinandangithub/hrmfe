import { Col, Row } from 'antd'
import { withFormik } from 'formik'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import * as Yup from 'yup'
import FooterActions from '../../../Components/FooterActions'
import { Field, Form } from '../../../Components/Formik'
import Panel from '../../../Layout/Panel'
import PanelLayout from '../../../Layout/PanelLayout'
import apiClient from '../../../Util/apiClient'
import { STATUS } from '../../../Util/Options'

const Schema = Yup.object().shape({
  name: Yup.string().required(),
  category: Yup.string().required(),
  itemNo: Yup.string().required()
})

const AssetForm = ({
  setValues,
  match: {
    params: { id }
  },
  values,
  history
}) => {
  const { t } = useTranslation()
  const getData = () => {
    if (id) {
      apiClient.get(`assets/get/${id}`).then(({ status, data }) => {
        if (status === 200 && data.result) {
          setValues(data.result)
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
        <Col xs={22} sm={22} md={18} lg={20}>
          <PanelLayout title={t(`Asset Details (${values?.assetNo || 'New'})`)} className="mb-5">
            <Panel title={t('Asset Details')}>
              <Row gutter={(12, 10)}>
                <Col xs={24} sm={24} md={12} lg={10}>
                  <div className="form-fields">
                    <Field name="name" label="Name" />
                  </div>
                </Col>
                <Col xs={24} sm={24} md={12} lg={8}>
                  <div className="form-fields">
                    <Field name="category" label="Category" />
                  </div>
                </Col>
                <Col xs={24} sm={24} md={12} lg={6}>
                  <div className="form-fields">
                    <Field name="itemNo" label="Item No" />
                  </div>
                </Col>
              </Row>
            </Panel>

            <Panel title={t('Bill Details')}>
              <Row gutter={(12, 10)}>
                <Col xs={24} sm={24} md={12} lg={6}>
                  <div className="form-fields">
                    <Field name="billDate" label="Bill Date" as="date" />
                  </div>
                </Col>
                <Col xs={24} sm={24} md={12} lg={6}>
                  <div className="form-fields">
                    <Field name="billDetails" label="Bill Details" />
                  </div>
                </Col>
                <Col xs={24} sm={24} md={12} lg={6}>
                  <div className="form-fields">
                    <Field name="warrantPeriod" label="Warrant Period" as="date" />
                  </div>
                </Col>
                <Col xs={24} sm={24} md={12} lg={6}>
                  <div className="form-fields">
                    <Field name="price" label="Price" />
                  </div>
                </Col>
              </Row>
            </Panel>

            <Panel title={t('Contact Details')}>
              <Row gutter={(12, 10)}>
                <Col xs={24} sm={24} md={12} lg={8}>
                  <div className="form-fields">
                    <Field name="contactPerson" label="Contact Person" />
                  </div>
                </Col>
                <Col xs={24} sm={24} md={12} lg={8}>
                  <div className="form-fields">
                    <Field name="contactEmail" label="Contact Email" />
                  </div>
                </Col>
                <Col xs={24} sm={24} md={12} lg={8}>
                  <div className="form-fields">
                    <Field name="contactPhone" label="Contact Phone" />
                  </div>
                </Col>
              </Row>
            </Panel>
            <Row gutter={(12, 10)}>
              <Col xs={24} sm={24} md={12} lg={12}>
                <div className="form-fields">
                  <Field name="notes" label="Notes" as="textarea" />
                </div>
              </Col>
              <Col xs={24} sm={24} md={12} lg={6}>
                <div className="form-fields">
                  <Field name="status" label="Status" as="select" options={STATUS} />
                </div>
              </Col>
            </Row>
          </PanelLayout>
        </Col>
      </Row>

      <FooterActions
        leftActions={[
          {
            prefix: 'flaticon-back',
            label: 'Back to Asset list',
            onClick: () => history('/app/assets')
          }
        ]}
        centerActions={[
          {
            prefix: 'flaticon-play',
            label: id ? 'Update' : 'Save',
            type: 'submit'
          }
        ]}
      />
    </Form>
  )
}

export default withFormik({
  mapPropsToValues: () => ({
    name: '',
    category: '',
    itemNo: '',
    billDate: '',
    billDetails: '',
    warrentPeriod: '',
    price: '',
    contactEmail: '',
    contactPhone: '',
    contactPerson: '',
    notes: '',
    status: 'Active'
  }),
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
      apiClient.put(`assets/update/${id}`, { ...data }).then(({ data }) => {
        if (data && data.result) {
          history('/app/assets')
        }
      })
    } else {
      apiClient.post('assets/add', data).then(({ data }) => {
        if (data && data.result) {
          history('/app/assets')
        }
      })
    }
  },
  validationSchema: Schema
})(AssetForm)
