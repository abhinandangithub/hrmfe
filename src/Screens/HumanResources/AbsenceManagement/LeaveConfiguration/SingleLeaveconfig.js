import { Col, Row } from 'antd'
import { memo } from 'react'
import { Field } from '../../../../Components/Formik'
import { EMPLOYEE_GROUP, EMPLOYEE_SUBGROUP, JOB_LEVEL, LOCATIONS } from '../../../../Util/Options'

function SingleLeaveconfig({ i }) {
  //   const [materials, setMaterials] = useState([])
  //   const { order } = getClientPriceNames(type)

  //   const getMaterials = (material) => {
  //     getMaterial({ material }).then((data) => {
  //       setMaterials(data)
  //     })
  //   }

  //   useDidUpdateEffect(() => {
  //     if (currency) {
  //       apiClient
  //         .get('exchange-rates/get-rate', {
  //           params: { currency }
  //         })
  //         .then(({ data }) => {
  //           if (data && data.result) {
  //             setFieldValue(`materials[${i}].exchangeRate`, data.result.rate || exchangeRate || 1)
  //           }
  //         })
  //     }
  //   }, [currency])

  //   useDidUpdateEffect(() => {
  //     if (price && exchangeRate) {
  //       setFieldValue(`materials[${i}].basePrice`, price * exchangeRate)
  //     }
  //   }, [price, exchangeRate])

  return (
    <Row gutter={[10, 5]}>
      <Col xs={24} md={12} lg={4} xl={6}>
        <div className="form-field">
          <Field name={`leaveTypes[${i}].type`} label="Leave Type" />
        </div>
      </Col>
      <Col xs={24} md={12} lg={4} xl={6}>
        <div className="form-field">
          <Field name={`leaveTypes[${i}].description`} label="Leave Description" />
        </div>
      </Col>
      <Col xs={24} md={12} lg={4} xl={6}>
        <div className="form-field">
          <Field
            name={`leaveTypes[${i}].roles`}
            label="Roles"
            as="paged-select"
            mode="multiple"
            endPoint="roles/get-active"
          />
        </div>
      </Col>
      <Col xs={24} md={12} lg={4} xl={6}>
        <div className="form-field">
          <Field type="number" name={`leaveTypes[${i}].leavePerYear`} label="Leave Per Calendar Year" />
        </div>
      </Col>
      <Col xs={24} md={12} lg={4} xl={6}>
        <div className="form-field">
          <Field
            name={`leaveTypes[${i}].location`}
            label="Location"
            as="paged-select"
            mode="multiple"
            endPoint=""
            options={LOCATIONS}
          />
        </div>
      </Col>
      <Col xs={24} md={12} lg={4} xl={6}>
        <div className="form-field">
          <Field
            name={`leaveTypes[${i}].jobLevel`}
            label="Job Level"
            as="paged-select"
            mode="multiple"
            endPoint=""
            options={JOB_LEVEL}
          />
        </div>
      </Col>
      <Col xs={24} md={12} lg={4} xl={6}>
        <div className="form-field">
          <Field
            name={`leaveTypes[${i}].employeeGroup`}
            label="Employee Group"
            as="paged-select"
            mode="multiple"
            endPoint=""
            options={EMPLOYEE_GROUP}
          />
        </div>
      </Col>
      <Col xs={24} md={12} lg={4} xl={6}>
        <div className="form-field">
          <Field
            name={`leaveTypes[${i}].employeeSubgroup`}
            label="Employee Sub Group"
            as="paged-select"
            mode="multiple"
            endPoint=""
            options={EMPLOYEE_SUBGROUP}
          />
        </div>
      </Col>
    </Row>
  )
}

export default memo(SingleLeaveconfig)
