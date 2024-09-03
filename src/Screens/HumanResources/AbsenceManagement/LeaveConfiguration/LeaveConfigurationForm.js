import { Col, message, Row, Space } from 'antd'
import { withFormik } from 'formik'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import * as Yup from 'yup'
import FooterActions from '../../../../Components/FooterActions'
import { Field, Form } from '../../../../Components/Formik'
import Panel from '../../../../Layout/Panel'
import PanelLayout from '../../../../Layout/PanelLayout'
import apiClient from '../../../../Util/apiClient'
import {
  EMPLOYEE_GROUP,
  EMPLOYEE_SUBGROUP,
  JOB_LEVEL,
  LEAVE_BUCKET,
  LEAVE_CATEGORY,
  LOCATIONS
} from '../../../../Util/Options'

const Schema = Yup.object().shape({
  calenderName: Yup.string().required(),
  category: Yup.string().required(),
  bucket: Yup.string().required(),
  roles: Yup.array().required(),
  type: Yup.string().required(),
  description: Yup.string(),
  leavePerYear: Yup.number().decimal().required(),
  location: Yup.array().required(),
  jobLevel: Yup.array().required(),
  employeeGroup: Yup.array().required(),
  employeeSubgroup: Yup.array().required(),
  previousPerYear: Yup.number().decimal().required()
})

function LeaveConfigurationForm({
  setValues,
  history,
  match: {
    params: { id, index }
  }
}) {
  // const [prevyear, setPrevyear] = useState([])
  const [calender, setcalender] = useState([])
  const [category] = useState(LEAVE_CATEGORY)
  const [bucket] = useState(LEAVE_BUCKET)
  const { t } = useTranslation()

  const getData = () => {
    if (id) {
      apiClient.get(`leave-types/by-calender-year?calenderYear=${id}`).then(({ data }) => {
        if (data.result) {
          const updateParam = data.result.leaveTypes[index]
          const patchParam = { ...updateParam, ...data.result }
          setValues(patchParam)
        }
      })
    }
  }

  // const previouscalendar = () => {
  //   if (values.previouscalender) {
  //     apiClient
  //       .get(`leave-types/by-calender-year?calenderYear=${values.previouscalender}`)
  //       .then(({ data }) => {
  //         if (data) {
  //           setFieldValue('leaveTypes', data.result.leaveTypes)
  //         }
  //       })
  //   } else {
  //     message.error('Please select the year')
  //   }
  // }

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

  // const getpreviousyear = () => {
  //   apiClient.get('leave-types/get-year-ids').then(({ data }) => {
  //     if (data && data.result) {
  //       //  setFieldValue('previouscalender', data.calenderYear)
  //       setPrevyear(
  //         data.result.map((item) => ({
  //           label: item.calenderData.name,
  //           value: item.calenderYear,
  //           ...item
  //         }))
  //       )
  //     }
  //   })
  // }

  useEffect(() => {
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
                <Col xs={24} md={12} lg={4} xl={8}>
                  <div className="form-field">
                    <Field name="category" label="Leave Category" as="select" options={category} />
                  </div>
                </Col>
                <Col xs={24} md={12} lg={4} xl={8}>
                  <div className="form-field">
                    <Field name="bucket" label="Leave Bucket" as="select" options={bucket} />
                  </div>
                </Col>
                <Col xs={24} md={12} lg={4} xl={8}>
                  <div className="form-field">
                    <Field
                      name="roles"
                      label="Roles"
                      as="paged-select"
                      mode="multiple"
                      endPoint="roles/get-active"
                    />
                  </div>
                </Col>
                <Col xs={24} md={12} lg={4} xl={8}>
                  <div className="form-field">
                    <Field name="type" label="Leave Type" />
                  </div>
                </Col>
                <Col xs={24} md={12} lg={4} xl={8}>
                  <div className="form-field">
                    <Field name="description" label="Leave Description" />
                  </div>
                </Col>
                <Col xs={24} md={12} lg={4} xl={8}>
                  <div className="form-field">
                    <Field type="number" name="leavePerYear" label="Current Year Leaves" />
                  </div>
                </Col>
                <Col xs={24} md={12} lg={4} xl={8}>
                  <div className="form-field">
                    <Field
                      type="number"
                      name="previousPerYear"
                      label="Previous Year Carry Over Leave Limit"
                    />
                  </div>
                </Col>

                {/* {editable && (
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
                )} */}
              </Row>
              <Panel title={t('Eligibility Criteria')}>
                <Row gutter={[20, 10]}>
                  <Col xs={24} md={12} lg={4} xl={8}>
                    <div className="form-field">
                      <Field
                        name="location"
                        label="Location"
                        as="paged-select"
                        mode="multiple"
                        endPoint=""
                        options={LOCATIONS}
                      />
                    </div>
                  </Col>
                  <Col xs={24} md={12} lg={4} xl={8}>
                    <div className="form-field">
                      <Field
                        name="jobLevel"
                        label="Job Level"
                        as="paged-select"
                        mode="multiple"
                        endPoint=""
                        options={JOB_LEVEL}
                      />
                    </div>
                  </Col>
                  <Col xs={24} md={12} lg={4} xl={8}>
                    <div className="form-field">
                      <Field
                        name="employeeGroup"
                        label="Employee Group"
                        as="paged-select"
                        mode="multiple"
                        endPoint=""
                        options={EMPLOYEE_GROUP}
                      />
                    </div>
                  </Col>
                  <Col xs={24} md={12} lg={4} xl={8}>
                    <div className="form-field">
                      <Field
                        name="employeeSubgroup"
                        label="Employee Sub Group"
                        as="paged-select"
                        mode="multiple"
                        endPoint=""
                        options={EMPLOYEE_SUBGROUP}
                      />
                    </div>
                  </Col>
                </Row>
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
    calenderName: '',
    previouscalender: ''
  }),
  validationSchema: Schema,
  handleSubmit: (
    data,
    {
      props: {
        match: {
          params: { id, index }
        },
        history
      }
    }
  ) => {
    if (id) {
      const updateparam = { ...data, index }
      apiClient.post('leave-types/update', updateparam).then(() => {
        history('/app/leave-configuration')
      })
    } else {
      apiClient.post('leave-types/add', data).then((data) => {
        if (data.data.success === true) {
          history('/app/leave-configuration')
        } else {
          message.warning(data.data.message)
        }
      })
    }
  }
})(LeaveConfigurationForm)
