import { withFormik } from 'formik'
import _ from 'lodash'
import { useNavigate  } from 'react-router-dom'
import Button from '../../../Components/Button'
import { Field, Form } from '../../../Components/Formik'
import { GET_DATA, removeEmptyKeys, SET_DATA } from '../../../Util/Util'

function Filter(props) {
  const history = useNavigate()
  const { validateForm, values, onFilter, resetForm } = props

  const onSubmit = async () => {
    validateForm().then((err) => {
      if (_.isEmpty(err)) {
        const params = removeEmptyKeys(values)
        onFilter(params)
        SET_DATA('employeePaymaster.filterData', params)
      }
    })
  }

  const handleClear = () => {
    resetForm({ validForm: '', validTo: '' })
    onFilter()
  }

  return (
    <>
      <Button onClick={() => history('/app/paymaster/add')} variant="primary" className="btn-block">
        <i className="flaticon-plus" /> Employee Pay Setup
      </Button>
      <Form>
        <div className="form-fields">
          <Field name="employeeNo" label="Employee No" />
        </div>
        <div className="form-fields">
          <Field name="name" label="Name" />
        </div>
        <div className="form-fields">
          <Field name="email" label="Email" />
        </div>
        <div className="form-fields">
          <Field name="validFrom" label="Valid From" as="date" />
        </div>
        <div className="form-fields">
          <Field name="validTo" label="Valid To" as="date" />
        </div>
        <div className="form-fields">
          <Button onClick={onSubmit} variant="secondary" className="search">
            Search
          </Button>
          <Button onClick={handleClear} className="btn-block search">
            Clear
          </Button>
        </div>
      </Form>
    </>
  )
}

export default withFormik({
  mapPropsToValues: () => {
    const filterObj = GET_DATA('employeePaymaster.filterData')

    return {
      employeeNo: filterObj?.employeeNo || '',
      name: filterObj?.name || '',
      email: filterObj?.email || '',
      validFrom: filterObj?.validFrom || '',
      validTo: filterObj?.validTo || ''
    }
  },
  handleSubmit: () => null
})(Filter)
