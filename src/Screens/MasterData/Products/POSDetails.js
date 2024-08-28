import { Col, Row } from 'antd'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Field } from '../../../Components/Formik'
import Panel from '../../../Layout/Panel'
import apiClient from '../../../Util/apiClient'

export default function POSDetails({ setFieldValue }) {
  const [categories, setCategories] = useState([])
  const [subCategories, setSubCategories] = useState([])

  const { t } = useTranslation()

  const getData = () => {
    apiClient.get('pos-options/get-categories').then(({ status, data }) => {
      if (status === 200) {
        setCategories(data.map((item) => ({ label: item.category, value: item.category })))
      }
    })
  }

  const getSubCategory = (category) => {
    apiClient.get('pos-options/get-sub-categories', { params: { category } }).then(({ status, data }) => {
      if (status === 200) {
        setSubCategories(data.map((item) => ({ label: item.subCategory, value: item.subCategory })))
      }
    })
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <Panel title={t('POS Details')}>
      <Row gutter={[20, 10]}>
        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 6 }}>
          <div className="form-field">
            <Field
              as="select"
              name="category"
              label="Product Category"
              options={categories}
              onChange={(n, v) => {
                getSubCategory(v)
                setFieldValue('subCategory', '')

                return setFieldValue(n, v)
              }}
            />
          </div>
        </Col>
        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 6 }}>
          <div className="form-field">
            <Field as="select" name="subCategory" label="Product Sub Category" options={subCategories} />
          </div>
        </Col>
        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 12 }}>
          <div className="form-field">
            <Field as="attachment" name="images" label="Product Images" acceptFile={['image', 'pdf']} />
          </div>
        </Col>
      </Row>
    </Panel>
  )
}
