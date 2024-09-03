import { CheckCircleOutlined, CloseCircleFilled, ExceptionOutlined, WarningOutlined } from '@ant-design/icons'
import { Card, Col, Row } from 'antd'
import { withFormik } from 'formik'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import Field from '../../../Components/Formik/Field'
import Form from '../../../Components/Formik/Form'
import PanelLayout from '../../../Layout/PanelLayout'
import apiClient from '../../../Util/apiClient'
import { removeEmptyKeys, SET_DATA } from '../../../Util/Util'
import './AppliedJobs.scss'

function AppliedJobsDashboard({ values, history }) {
  const [dashboardData, setDashboardData] = useState({})
  const { t } = useTranslation()
  useEffect(() => {
    getData(removeEmptyKeys(values))
  }, [values.job])

  const getData = (params = {}) => {
    apiClient.get('applied-jobs/get-dashboard-data', { params }).then(({ data }) => {
      if (data?.result) {
        setDashboardData(data.result)
      }
    })
  }

  const onRedirect = (status) => {
    SET_DATA('appliedJobs.filterData', { ...removeEmptyKeys(values), status })
    history('/app/applied-jobs')
  }

  return (
    <Form>
      <Row justify="center" className="inner-contents applied-dashboard">
        <Col xs={22} sm={22} md={20} lg={21}>
          <PanelLayout title={t('Job Positions Dashboard')}>
            <Row gutter={[20, 20]}>
              <Col xs={22} sm={22} md={20} lg={8}>
                <Field name="job" placeholder="Select Job" as="paged-select" endPoint="job-postings/get" />
              </Col>
              <Col xs={22} sm={22} md={20} lg={24}>
                <Row gutter={[20, 20]}>
                  <Col xs={24} sm={24} md={24} lg={6}>
                    <Card
                      size="small"
                      bordered={false}
                      className="info-card-pending"
                      onClick={() => onRedirect('Pending')}>
                      <div className="info">
                        <WarningOutlined />
                        <h2 className="text-white mb-0 count">{dashboardData.pending || 0}</h2>
                        <h3 className="text-white mb-0">No. of CVs Received</h3>
                      </div>
                    </Card>
                  </Col>
                  <Col xs={24} sm={24} md={24} lg={6}>
                    <Card
                      size="small"
                      bordered={false}
                      className="info-card-shortlisted"
                      onClick={() => onRedirect('Shortlisted')}>
                      <div className="info">
                        <ExceptionOutlined />
                        <h2 className="text-white mb-0 count">{dashboardData.shortlisted || 0}</h2>
                        <h3 className="text-white mb-0">Shortlisted Candidates</h3>
                      </div>
                    </Card>
                  </Col>
                  <Col xs={24} sm={24} md={24} lg={6}>
                    <Card
                      size="small"
                      bordered={false}
                      className="info-card-accepted"
                      onClick={() => onRedirect('Accepted')}>
                      <div className="info">
                        <CheckCircleOutlined />
                        <h2 className="text-white mb-0 count">{dashboardData.accepted || 0}</h2>
                        <h3 className="text-white mb-0">Selected Candidates</h3>
                      </div>
                    </Card>
                  </Col>
                  <Col xs={24} sm={24} md={24} lg={6}>
                    <Card
                      size="small"
                      bordered={false}
                      className="info-card-rejected"
                      onClick={() => onRedirect('Rejected')}>
                      <div className="info">
                        <CloseCircleFilled />
                        <h2 className="text-white mb-0 count">{dashboardData.rejected || 0}</h2>
                        <h3 className="text-white mb-0">Rejected Candidates</h3>
                      </div>
                    </Card>
                  </Col>
                </Row>
              </Col>
            </Row>
          </PanelLayout>
        </Col>
      </Row>
    </Form>
  )
}

export default withFormik({
  mapPropsToValues: () => ({
    job: ''
  }),
  handleSubmit: () => null
})(AppliedJobsDashboard)
