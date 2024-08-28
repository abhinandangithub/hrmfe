import { withFormik } from 'formik'
import _ from 'lodash'
import { useHistory } from 'react-router-dom'
import Button from '../../../Components/Button'
import { Field, Form } from '../../../Components/Formik'
import { EMPLOYEE_TRANSER_TYPES } from '../../../Util/Options'
import { GET_DATA, SET_DATA, validateAccess } from '../../../Util/Util'

function Filter(props) {
  const history = useHistory()

  const onSubmitForm = async () => {
    props.validateForm().then((err) => {
      if (_.isEmpty(err)) {
        const data = _(props.values).omitBy(_.isEmpty).value()
        SET_DATA('employeeTransfers.filterData', data)
        props.onFilter(data)
      }
    })
  }

  const onClear = () => {
    props.resetForm({})
    props.onFilter({})
  }

  return (
    <>
      {validateAccess('add-employee-transfer') && (
        <Button
          onClick={() => history.push('/app/add-employee-transfer')}
          variant="primary"
          className="btn-block">
          <i className="flaticon-plus" /> Add Transfer
        </Button>
      )}
      <Form>
        <div className="form-fields">
          <Field name="transferType" label="Transfer Type" as="select" options={EMPLOYEE_TRANSER_TYPES} />
        </div>
        <div className="form-field">
          <Field name="status" label="Status" />
        </div>

        <div className="form-fields">
          <Button variant="secondary" className="search" onClick={onSubmitForm}>
            <i className="flaticon-search-interface-symbol" />
            Search
          </Button>
          <Button className="btn-block btn-glow search" onClick={onClear}>
            Clear
          </Button>
        </div>
      </Form>
    </>
  )
}

export default withFormik({
  mapPropsToValues: () => {
    const filterObj = GET_DATA('employeeTransfers.filterData')

    return {
      transferType: filterObj?.transferType || '',
      status: filterObj?.status || ''
    }
  },
  handleSubmit: () => null
})(Filter)
