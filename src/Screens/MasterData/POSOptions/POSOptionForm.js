import { Col, Row } from 'antd'
import { withFormik } from 'formik'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import FooterActions from '../../../Components/FooterActions'
import { FieldArray, Form } from '../../../Components/Formik'
import Panel from '../../../Layout/Panel'
import PanelLayout from '../../../Layout/PanelLayout'
import apiClient from '../../../Util/apiClient'
import { POSSchema } from '../../../Util/validationSchema'
import SinglePOSOption from './SinglePOSOption'

const DEFAULT_POS_OPTIONS = {
  category: '',
  subCategory: ''
}

function POSOptionForm({
  setValues,
  history,
  match: {
    params: { id }
  },
  companyInfo: { configurations = {} } = {}
}) {
  const { t } = useTranslation()
  const { POSCategories, POSSubCategories } = configurations

  const getData = () => {
    if (id) {
      apiClient.get(`pos-options/${id}`).then(({ status, data }) => {
        if (status === 200) {
          setValues({ options: [{ ...data, POSCategories, POSSubCategories }] })
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
          <PanelLayout title={t('POS Options')}>
            <Panel title={t('POS Options')}>
              <FieldArray
                name="options"
                loaderCount={2}
                defaultValues={{ ...DEFAULT_POS_OPTIONS, POSCategories, POSSubCategories }}>
                {SinglePOSOption}
              </FieldArray>
            </Panel>
          </PanelLayout>
          <FooterActions
            leftActions={[
              {
                prefix: 'flaticon-back',
                label: 'Back',
                onClick: () => history.goBack()
              }
            ]}
            centerActions={[
              {
                prefix: 'flaticon-writing',
                label: id ? 'Update' : 'Save',
                type: 'submit'
              }
            ]}
          />
        </Col>
      </Row>
    </Form>
  )
}

export default withFormik({
  mapPropsToValues: ({ companyInfo: { configurations: { POSCategories, POSSubCategories } = {} } = {} }) => ({
    options: [{ ...DEFAULT_POS_OPTIONS, POSCategories, POSSubCategories }]
  }),
  validationSchema: POSSchema,
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
      apiClient.put(`pos-options/${id}`, data.options[0]).then(({ status }) => {
        if (status === 200) {
          history('/app/pos-options')
        }
      })
    } else {
      apiClient.post('pos-options', data).then(({ status }) => {
        if (status === 201) {
          history('/app/pos-options')
        }
      })
    }
  }
})(POSOptionForm)
