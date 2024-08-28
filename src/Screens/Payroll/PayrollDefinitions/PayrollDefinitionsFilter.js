// import { message } from 'antd'
import { withFormik } from 'formik'
import _ from 'lodash'
import { useHistory } from 'react-router-dom'
import Button from '../../../Components/Button'
import { Field, Form } from '../../../Components/Formik'
import { STATUS } from '../../../Util/Options'
import { GET_DATA, removeEmptyKeys, SET_DATA } from '../../../Util/Util'

function PayrollDefinitionsFilter(props) {
  const history = useHistory()
  const { validateForm, values, onFilter, resetForm } = props

  const onSubmit = async () => {
    validateForm().then((err) => {
      if (_.isEmpty(err)) {
        const params = removeEmptyKeys(values)
        onFilter(params)
        SET_DATA('payrollDefinitions.filterData', params)
      }
    })
  }

  const onFilterClear = () => {
    resetForm({ status: 'All' })
    onFilter()
  }

  return (
    <>
      <Button
        onClick={() => history.push('/app/payroll-definitions/add')}
        variant="primary"
        className="btn-block">
        <i className="flaticon-plus" /> Payroll Definition
      </Button>
      <Form>
        <div className="form-fields">
          <Field name="payrollId" label="Payroll Id" />
        </div>
        <div className="form-fields">
          <Field name="payrollName" label="Payroll Name" />
        </div>
        <div className="form-fields">
          <Field
            as="select"
            name="status"
            label="Status"
            defaultValue="all"
            options={[{ label: 'All', value: 'all' }, ...STATUS]}
          />
        </div>
        <div className="form-fields">
          <Button onClick={onSubmit} variant="secondary" className="search">
            Search
          </Button>
          <Button onClick={onFilterClear} className="search">
            Clear
          </Button>
        </div>
      </Form>
    </>
  )
}

export default withFormik({
  mapPropsToValues: () => {
    const filterObj = GET_DATA('payrollDefinitions.filterData')

    return {
      payrollId: filterObj?.payrollId || '',
      payrollName: filterObj?.payrollName || '',
      status: filterObj?.status || ''
    }
  },
  handleSubmit: () => null
})(PayrollDefinitionsFilter)
