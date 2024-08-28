import { Col, message, Row, Space } from 'antd'
import { withFormik } from 'formik'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import * as Yup from 'yup'
import Button from '../../../../Components/Button'
import FooterActions from '../../../../Components/FooterActions'
import { Field, FieldArray, Form } from '../../../../Components/Formik'
import Panel from '../../../../Layout/Panel'
import PanelLayout from '../../../../Layout/PanelLayout'
import apiClient from '../../../../Util/apiClient'
import { DEFAULT_LEAVE_TYPES } from '../../../../Util/Options'
import SingleLeaveconfig from './SingleLeaveconfig'

const Schema = Yup.object().shape({
  calenderName: Yup.string().required(),
  leaveTypes: Yup.array()
    .of(
      Yup.object().shape({
        type: Yup.string().required(),
        description: Yup.string().required(),
        roles: Yup.array().required(),
        leavePerYear: Yup.number().decimal().required()
      })
    )
    .required()
})

function LeaveConfigurationForm({
  values,
  setValues,
  setFieldValue,
  history,
  match: {
    params: { id }
  }
}) {
  const [prevyear, setPrevyear] = useState([])
  const [editable, setEditable] = useState(!id)
  const [calender, setcalender] = useState([])
  const { t } = useTranslation()

  const getData = () => {
    if (id) {
      apiClient.get(`leave-types/by-calender-year?calenderYear=${id}`).then(({ data }) => {
        if (data.result) {
          setValues(data.result)
          setEditable(false)
        }
      })
    }
  }

  const previouscalendar = () => {
    if (values.previouscalender) {
      apiClient
        .get(`leave-types/by-calender-year?calenderYear=${values.previouscalender}`)
        .then(({ data }) => {
          if (data) {
            setFieldValue('leaveTypes', data.result.leaveTypes)
          }
        })
    } else {
      message.error('Please select the year')
    }
  }

  const calendar = () => {
    apiClient.get('yearly-calender/get-year-ids').then(({ data }) => {
      if (data && data.result) {
        setcalender(
          data.result.map((item) => ({
            label: item.name,
            value: item.name
          }))
        )
      }
    })
  }

  const getpreviousyear = () => {
    apiClient.get('leave-types/get-year-ids').then(({ data }) => {
      if (data && data.result) {
        //  setFieldValue('previouscalender', data.calenderYear)
        setPrevyear(
          data.result.map((item) => ({
            label: item.calenderData.name,
            value: item.calenderYear,
            ...item
          }))
        )
      }
    })
  }

  useEffect(() => {
    getpreviousyear()
    calendar()
  }, [])
  useEffect(() => {
    getData()
  }, [id])

  return (
    <Form>
      <Row justify="center" className="inner-contents">
        <Col xs={22} sm={22} md={20} lg={20}>
          <PanelLayout title={t('Leave Configuration')}>
            <Space size="large" direction="vertical" className="w-100">
              <Row gutter={[20, 10]}>
                <Col xs={24} md={12} lg={4} xl={8}>
                  <div className="form-field">
                    <Field name="calenderName" label="Calendar Year" as="select" options={calender} />
                  </div>
                </Col>

                {editable && (
                  <>
                    <Col
                      xs={24}
                      md={12}
                      lg={4}
                      xl={8}
                      style={{
                        paddingTop: '5px',
                        paddingRight: '225px',
                        paddingBottom: '5px',
                        paddingLeft: '226px'
                      }}>
                      <Button
                        variant="secondary"
                        className="search"
                        onClick={previouscalendar}
                        style={{
                          paddingRight: '14px',
                          marginTop: '25px',
                          marginLeft: '51px',
                          backgroundColor: 'rgb(3, 155, 205)',
                          border: 0
                        }}>
                        Clone From Calendar
                      </Button>
                    </Col>
                    <Col xs={24} md={12} lg={4} xl={8}>
                      <div className="form-field">
                        <Field
                          name="previouscalender"
                          label="Previous Calendar Year"
                          as="select"
                          options={prevyear}
                        />
                      </div>
                    </Col>
                  </>
                )}
              </Row>
              <Panel title={t('Leave Type Entries')}>
                <FieldArray
                  name="leaveTypes"
                  loaderCount={8}
                  defaultValues={DEFAULT_LEAVE_TYPES}
                  additionalValues={{
                    type: values.type
                  }}
                  editable>
                  {SingleLeaveconfig}
                </FieldArray>
              </Panel>
            </Space>
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
  mapPropsToValues: () => ({
    leaveTypes: [],
    calenderName: '',
    previouscalender: ''
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
      apiClient.post('leave-types/update', data).then(() => {
        history.push('/app/leave-configuration')
      })
    } else {
      apiClient.post('leave-types/add', data).then((data) => {
        if (data.data.success === true) {
          history.push('/app/leave-configuration')
        } else {
          message.warning(data.data.message)
        }
      })
    }
  }
})(LeaveConfigurationForm)
