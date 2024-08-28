import { Col, Row } from 'antd'
import { useState } from 'react'
import Button from '../../../../Components/Button'
import ModalBox from '../../../../Components/ModalBox/ModalBox'
import Panel from '../../../../Layout/Panel'
import apiClient from '../../../../Util/apiClient'
import VisaPaymentConfigurationForm from './VisaPaymentConfigurationForm'
import { useTranslation } from 'react-i18next'



const {t} = useTranslation()


export default function VisaPaymentConfiguration(props) {
  const [config, setConfig] = useState(props.visaPayment)
  const [toggle, setToogle] = useState(false)

  const onCancel = () => {
    setToogle(false)
  }

  const onUpdate = (v) => {
    apiClient.put('hr-configurations/update/visaPayment', { visaPayment: v }).then(({ data }) => {
      if (data?.result) {
        setConfig(data.result)
        setToogle(false)
      }
    })
  }

  return (
    <div>

      <Panel title={t('Visa Payment')}>
        <div style={{ position: 'absolute', top: -40, right: 15 }}>
          <Button variant="primary" onClick={() => setToogle(true)}>
            Edit
          </Button>
        </div>
        <Row>
          <Col xs={24} sm={24} md={8} lg={8}>
            No Of Months: <b>{config.noOfMonths}</b>
          </Col>
          <Col xs={24} sm={24} md={8} lg={8}>
            Visa Cost: <b>{config?.visaCost}</b>
          </Col>
          <Col xs={24} sm={24} md={8} lg={8}>
            Medical Cost: <b>{config?.medicalCost}</b>
          </Col>
        </Row>
        <ModalBox
          title={typeof toggle === 'object' ? 'Update Config' : 'Add Config'}
          visible={!!toggle}
          footer={null}
          onCancel={() => onCancel()}
          destroyOnClose>
          <VisaPaymentConfigurationForm onCancel={onCancel} selectedConfig={config} onUpdate={onUpdate} />
        </ModalBox>
      </Panel>
    </div>
  )
}
