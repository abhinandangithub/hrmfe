import { Col, Row } from 'antd'
import React, { memo, useState } from 'react'
import { Field } from '../../../Components/Formik'
import apiClient from '../../../Util/apiClient'

function SinglePOSOption({ i, setFieldValue }) {
  const [categories, setCategories] = useState([])

  const getCategories = (category) => {
    setFieldValue(`options[${i}].category`, category)
    apiClient.get('pos-options/get-categories', { params: { category } }).then(({ status, data }) => {
      if (status === 200) {
        setCategories(data.map((item) => ({ label: item.category, value: item.category })))
      }
    })
  }

  return (
    <Row gutter={[20, 10]}>
      <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }}>
        <div className="form-field">
          <Field
            as="auto-complete"
            name={`options[${i}].category`}
            label="Category"
            onSearch={getCategories}
            options={categories}
          />
        </div>
      </Col>
      <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }}>
        <div className="form-field">
          <Field name={`options[${i}].subCategory`} label="Sub Category" />
        </div>
      </Col>
    </Row>
  )
}

export default memo(SinglePOSOption)
