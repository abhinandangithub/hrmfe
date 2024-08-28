import { Col, Row } from 'antd'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import PanelLayout from '../../../Layout/PanelLayout'
import { GET_DATA, SET_DATA } from '../../../Util/Util'
import ProductForm from './ProductForm'

export default function MergedProductForm(props) {
  const [productType, setType] = useState(GET_DATA('mergedProducts.productType') || 'Service')

  const setProductType = (type) => {
    SET_DATA('mergedProducts.productType', type)
    setType(type)
  }

  const { t } = useTranslation()

  return (
    <Row justify="center" className="inner-contents">
      <Col xs={{ span: 22 }} sm={{ span: 22 }} md={{ span: 20 }} lg={{ span: 20 }}>
        <PanelLayout title={t(`Product (${productType})`)}>
          {productType === 'Service' && (
            <ProductForm {...props} productType={productType} setProductType={setProductType} />
          )}
        </PanelLayout>
      </Col>
    </Row>
  )
}
