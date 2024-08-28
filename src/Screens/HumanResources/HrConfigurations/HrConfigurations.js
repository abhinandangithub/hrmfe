import { Col, Row } from 'antd'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import LoaderBox from '../../../Components/LoaderBox/LoaderBox'
import PanelLayout from '../../../Layout/PanelLayout'
import apiClient from '../../../Util/apiClient'
import Alerts from './Alerts/Alerts'

export default function HrConfigurations() {
  const [isLoading, setLoading] = useState(true)
  const [hrConfigs, setHrConfigs] = useState(null)

  const { t } = useTranslation()

  useEffect(() => {
    apiClient.get('hr-configurations/getAll').then(({ data }) => {
      if (data?.result) {
        setHrConfigs(data?.result)
      }
    })
    setLoading(false)
  }, [])

  if (isLoading) {
    return <LoaderBox loader />
  }

  return (
    <Row justify="center" className="inner-contents">
      <Col xs={22} sm={22} md={20} lg={20}>
        <PanelLayout title={t('HR Configurations')}>
          <Row gutter={[20]}>
            {/* <Col xs={24} sm={24} md={12} lg={12}>
              <PensionFundConfiuration pensionFund={hrConfigs?.pensionFund} />
            </Col>
            <Col xs={24} sm={24} md={12} lg={12}>
              <LabourMinistryRegulatory labourMinistryRegulatory={hrConfigs?.labourMinistryRegulatory} />
            </Col>
            <Col xs={24} sm={24} md={24} lg={24}>
              <VisaPaymentConfiguration visaPayment={hrConfigs?.visaPayment || {}} />
            </Col>
            <Col xs={24} sm={24} md={24} lg={24}>
              <StandardRates standardRates={hrConfigs?.standardRates} />
            </Col> */}
            <Col xs={24} sm={24} md={24} lg={24}>
              <Alerts alerts={hrConfigs?.alerts} />
            </Col>
          </Row>
        </PanelLayout>
      </Col>
    </Row>
  )
}
