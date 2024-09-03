import { Col, Row } from 'antd'
import React from 'react'
import { useTranslation } from 'react-i18next'
import Scanner from '../../../Components/Scanner'
import PanelLayout from '../../../Layout/PanelLayout'

export default function BarcodeScanner({ history }) {
  const _onDetected = (result) => {
    history(`/app/tracked-assets/${result}`)
  }

  const { t } = useTranslation()

  return (
    <div style={{ padding: 20 }}>
      <PanelLayout title={t('Track Assets by Barcode')}>
        <Row justify="center">
          <Col xs={10}>
            <Scanner onChange={_onDetected} />
          </Col>
        </Row>
      </PanelLayout>
    </div>
  )
}
