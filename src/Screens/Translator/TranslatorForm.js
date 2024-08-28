import { ArrowLeftOutlined } from '@ant-design/icons'
import { Col, Row, Spin } from 'antd'
import { withFormik } from 'formik'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import * as Yup from 'yup'
import Button from '../../Components/Button'
import { Field, Form } from '../../Components/Formik'
import Panel from '../../Layout/Panel'
import PanelLayout from '../../Layout/PanelLayout'
import apiClient from '../../Util/apiClient'

const Schema = Yup.object().shape({
  defaultValue: Yup.string().required(),
  isVerified: Yup.boolean().required(),
  value: Yup.object().shape({
    'zh-Hans': '',
    ar: '',
    bg: '',
    cs: '',
    da: '',
    de: '',
    el: '',
    en: '',
    es: '',
    et: '',
    fi: '',
    fr: '',
    hu: '',
    id: '',
    it: '',
    ja: '',
    ko: '',
    lt: '',
    lv: '',
    nb: '',
    nl: '',
    pl: '',
    'pt-PT': '',
    ro: '',
    ru: '',
    sk: '',
    sl: '',
    sv: '',
    tr: ''
  })
})

function TranslatorForm({
  setValues,
  values,
  match: {
    params: { id }
  }
}) {
  const [isVerifyApi, setIsVerifyApi] = useState(false)
  const { t } = useTranslation()

  const getData = () => {
    if (id) {
      apiClient.get(`language/get/${id}`).then(({ data }) => {
        if (data && data.result) {
          console.log('values', values)
          console.log(' data.result', data.result)
          setValues({ ...values, ...data.result })
        }
      })
    }
  }

  const verifyData = () => {
    const param = {
      defaultValue: values.defaultValue
    }
    setIsVerifyApi(true)
    apiClient
      .post('language/verify', param)
      .then(({ data }) => {
        if (data && data.result) {
          setValues({ ...values, ...data.result })
        }
        setIsVerifyApi(false)
      })
      .catch(() => {
        setIsVerifyApi(false)
      })
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <Form>
      <Row justify="center" className="inner-contents">
        <Col xs={22} sm={22} md={20} lg={20}>
          <PanelLayout title={t('Translator')}>
            <Panel title={t('Translator Details')}>
              <Row gutter={[20, 10]}>
                <Col xs={24} sm={24} md={8} lg={8}>
                  <div className="form-field">
                    <Field name="defaultValue" label="Field Name" />
                  </div>
                </Col>
                <Col xs={24} sm={24} md={8} lg={8}>
                  <div className="form-field mt-4">
                    <Button type="button" onClick={() => verifyData()} variant="primary">
                      Verify
                    </Button>
                  </div>
                </Col>
              </Row>
              {isVerifyApi && (
                <Row gutter={[20, 10]} justify="center">
                  <div
                    style={{
                      textAlign: 'center',

                      borderRadius: '4px',
                      marginBottom: '20px',
                      padding: '30px 50px',
                      margin: '20px 0'
                    }}>
                    <Spin />
                    <div>Taking Few Mintues!</div>
                  </div>
                </Row>
              )}

              {values.isVerified && (
                <>
                  <Row gutter={[20, 10]}>
                    <Col span={6}>
                      <div className="form-field">
                        <Field name="value.zh-Hans" label="Chinese" />
                      </div>
                    </Col>
                    <Col span={6}>
                      <div className="form-field">
                        <Field name="value.ar" label="Arabic" />
                      </div>
                    </Col>
                    <Col span={6}>
                      <div className="form-field">
                        <Field name="value.bg" label="Bulgarian" />
                      </div>
                    </Col>
                    <Col span={6}>
                      <div className="form-field">
                        <Field name="value.cs" label="Czech" />
                      </div>
                    </Col>
                  </Row>
                  <Row gutter={[20, 10]}>
                    <Col span={6}>
                      <div className="form-field">
                        <Field name="value.da" label="Danish" />
                      </div>
                    </Col>
                    <Col span={6}>
                      <div className="form-field">
                        <Field name="value.de" label="German" />
                      </div>
                    </Col>
                    <Col span={6}>
                      <div className="form-field">
                        <Field name="value.el" label="Greek" />
                      </div>
                    </Col>
                    <Col span={6}>
                      <div className="form-field">
                        <Field name="value.en" label="English" />
                      </div>
                    </Col>
                  </Row>
                  <Row gutter={[20, 10]}>
                    <Col span={6}>
                      <div className="form-field">
                        <Field name="value.es" label="Spanish" />
                      </div>
                    </Col>
                    <Col span={6}>
                      <div className="form-field">
                        <Field name="value.et" label="Estonian" />
                      </div>
                    </Col>
                    <Col span={6}>
                      <div className="form-field">
                        <Field name="value.fi" label="Finnish" />
                      </div>
                    </Col>
                    <Col span={6}>
                      <div className="form-field">
                        <Field name="value.fr" label="French" />
                      </div>
                    </Col>
                  </Row>
                  <Row gutter={[20, 10]}>
                    <Col span={6}>
                      <div className="form-field">
                        <Field name="value.hu" label="Hungarian" />
                      </div>
                    </Col>
                    <Col span={6}>
                      <div className="form-field">
                        <Field name="value.id" label="Indonesia" />
                      </div>
                    </Col>
                    <Col span={6}>
                      <div className="form-field">
                        <Field name="value.it" label="Italian" />
                      </div>
                    </Col>
                    <Col span={6}>
                      <div className="form-field">
                        <Field name="value.ja" label="Japanese" />
                      </div>
                    </Col>
                  </Row>
                  <Row gutter={[20, 10]}>
                    <Col span={6}>
                      <div className="form-field">
                        <Field name="value.ko" label="Korean" />
                      </div>
                    </Col>
                    <Col span={6}>
                      <div className="form-field">
                        <Field name="value.lt" label="Lithuanian" />
                      </div>
                    </Col>
                    <Col span={6}>
                      <div className="form-field">
                        <Field name="value.lv" label="Latvian" />
                      </div>
                    </Col>
                    <Col span={6}>
                      <div className="form-field">
                        <Field name="value.nb" label="Norwegian" />
                      </div>
                    </Col>
                  </Row>
                  <Row gutter={[20, 10]}>
                    <Col span={6}>
                      <div className="form-field">
                        <Field name="value.nl" label="Dutch" />
                      </div>
                    </Col>
                    <Col span={6}>
                      <div className="form-field">
                        <Field name="value.pl" label="Polish" />
                      </div>
                    </Col>
                    <Col span={6}>
                      <div className="form-field">
                        <Field name="value.pt-PT" label="Portuguese" />
                      </div>
                    </Col>
                    <Col span={6}>
                      <div className="form-field">
                        <Field name="value.ro" label="Romanian" />
                      </div>
                    </Col>
                  </Row>
                  <Row gutter={[20, 10]}>
                    <Col span={6}>
                      <div className="form-field">
                        <Field name="value.ru" label="Russian" />
                      </div>
                    </Col>
                    <Col span={6}>
                      <div className="form-field">
                        <Field name="value.sk" label="Slovak" />
                      </div>
                    </Col>
                    <Col span={6}>
                      <div className="form-field">
                        <Field name="value.sl" label="slovenian" />
                      </div>
                    </Col>
                    <Col span={6}>
                      <div className="form-field">
                        <Field name="value.sv" label="Swedish" />
                      </div>
                    </Col>
                  </Row>
                  <Row gutter={[20, 10]}>
                    <Col span={6}>
                      <div className="form-field">
                        <Field name="value.tr" label="Turkish" />
                      </div>
                    </Col>
                  </Row>
                </>
              )}
            </Panel>
          </PanelLayout>

          <div className="save-changes">
            <Button type="submit" variant="primary" disabled={!values.isVerified}>
              {id ? 'Update' : 'Save'}
            </Button>
            <span>or</span>
            <Link to="/app/translate">
              <Button>
                <ArrowLeftOutlined /> Back
              </Button>
            </Link>
          </div>
        </Col>
      </Row>
    </Form>
  )
}

export default withFormik({
  mapPropsToValues: () => ({
    defaultValue: '',
    isVerified: false
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
    console.log('data', data)

    if (id) {
      apiClient.put(`language/update/${id}`, data).then(({ data }) => {
        if (data && data.result) {
          history.push('/app/translate')
        }
      })
    } else {
      apiClient.post('language/add', data).then(({ data }) => {
        if (data && data.result) {
          history.push('/app/translate')
        }
      })
    }
  }
})(TranslatorForm)
