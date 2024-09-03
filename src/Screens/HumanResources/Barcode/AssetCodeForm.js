import { Col, Row } from 'antd'
import { withFormik } from 'formik'
import moment from 'moment'
import React from 'react'
import Button from '../../../Components/Button'
import { Field, Form } from '../../../Components/Formik'
import { history } from '../../../Routes'
import apiClient from '../../../Util/apiClient'
import { INVENTORY_STATUS } from '../../../Util/Options'

const AssetCodeForm = (props) => (
  <Form>
    <Row justify="left" gutter={(12, 10)}>
      <Col xs={24} sm={24} md={24} lg={12}>
        <div className="form-field">
          <Field name="status" label="Status" as="select" options={INVENTORY_STATUS} />
        </div>
      </Col>
      <Col xs={24} sm={24} md={12} lg={12}>
        <div className="form-field">
          <Field name="location" label="Location" />
        </div>
      </Col>
      <Col xs={24} sm={24} md={24} lg={12}>
        <div className="form-field">
          <Field
            name="available"
            label="Available"
            as="select"
            options={[
              { label: 'Yes', value: 'yes' },
              { label: 'No', value: 'no' }
            ]}
          />
        </div>
      </Col>
      <Col xs={24} sm={24} md={12} lg={12}>
        <div className="form-field">
          <Field name="costCenter" label="Cost Center" as="select" options={props.costCenter} />
        </div>
      </Col>
      <Col xs={24} sm={24} md={24} lg={12}>
        <div className="form-field">
          <Field name="takenOn" label="Inventory Taken On" as="date" />
        </div>
      </Col>
      <Col xs={24} sm={24} md={24} lg={12}>
        <div className="form-field">
          <Field
            name="takenBy"
            label="Inventory Taken by"
            as="paged-select"
            endPoint="users/get-active-by-company"
            optionValue="user"
          />
        </div>
      </Col>
    </Row>
    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
      <Button variant="secondary" onClick={() => props.onCancel()}>
        Cancel
      </Button>
      &nbsp;&nbsp;
      <Button type="submit" variant="primary" style={{ paddingRight: 20 }}>
        Save
      </Button>
    </div>
  </Form>
)

export default withFormik({
  mapPropsToValues: (props) => ({
    status: '',
    location: props.currentDetails.assetData.location,
    available: props.inventoryDetails.assetInv[0].available,
    costCenter: props.currentDetails.assetData.costCenter,
    takenOn: moment(props.inventoryDetails.date),
    takenBy: ''
  }),
  handleSubmit: (data, { props }) => {
    const tag = {
      ...data,
      assetTag: props.currentDetails.assetTag,
      location: props.currentDetails.assetData.location,
      costCenter: props.currentDetails.assetData.costCenter,
      date: props.inventoryDetails.date
    }
    apiClient.put(`asset-inventory/update/${props.id}`, tag).then(({ status }) => {
      if (status === 200) {
        history('/app/asset-inventories')
      }
    })
  }
  //   validationSchema: Schema
})(AssetCodeForm)
