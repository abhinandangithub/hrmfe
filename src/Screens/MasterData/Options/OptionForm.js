import { ArrowLeftOutlined } from '@ant-design/icons'
import { Col, Row } from 'antd'
import { withFormik } from 'formik'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import * as Yup from 'yup'
import Button from '../../../Components/Button'
import { Field, Form } from '../../../Components/Formik'
import Panel from '../../../Layout/Panel'
import PanelLayout from '../../../Layout/PanelLayout'
import apiClient from '../../../Util/apiClient'
import { MASTER_OPTION_TYPES } from '../../../Util/Options'

const Schema = Yup.object().shape({
  type: Yup.string().required(),
  label: Yup.string().required(),
  value: Yup.string().required()
})

function OptionForm({
  setValues,
  match: {
    params: { id }
  },
  history
}) {
  const { t } = useTranslation()
  const getData = () => {
    if (id) {
      apiClient.get(`options/get/${id}`).then(({ data }) => {
        if (data && data.result) {
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
        <Col xs={22} sm={22} md={20} lg={22}>
          <PanelLayout title={t('Value Help')}>
            <Panel title={t('Value Help')}>
              <Row gutter={[10, 10]}>
                <Col xs={12} sm={12} md={12} lg={8}>
                  <div className="form-field">
                    <Field label="Type" name="type" as="select" options={MASTER_OPTION_TYPES} />
                  </div>
                </Col>
                <Col xs={12} sm={12} md={12} lg={8}>
                  <div className="form-field">
                    <Field label="Label" name="label" />
                  </div>
                </Col>
                <Col xs={12} sm={12} md={12} lg={8}>
                  <div className="form-field">
                    <Field label="Value" name="value" />
                  </div>
                </Col>
              </Row>
            </Panel>
          </PanelLayout>
          <div className="save-changes">
            <Button type="submit" variant="primary">
              {id ? 'Update' : 'Save'}
            </Button>

            <Button onClick={() => history.goBack()}>
              <ArrowLeftOutlined /> Back
            </Button>
          </div>
        </Col>
      </Row>
    </Form>
  )
}

export default withFormik({
  mapPropsToValues: () => ({
    type: '',
    label: '',
    value: ''
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
      apiClient.put(`options/update/${id}`, { ...data }).then(({ data }) => {
        if (data && data.result) {
          history('/app/options')
        }
      })
    } else {
      apiClient.post('options/add', data).then(({ data }) => {
        if (data && data.result) {
          history('/app/options')
        }
      })
    }
  }
})(OptionForm)
