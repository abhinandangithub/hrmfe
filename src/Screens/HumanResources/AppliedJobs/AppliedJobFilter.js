import { withFormik } from 'formik'
import _ from 'lodash'
import Button from '../../../Components/Button'
import { Field, Form } from '../../../Components/Formik'
import { GET_DATA, SET_DATA } from '../../../Util/Util'

function Filter(props) {
  const onSubmitForm = async () => {
    props.validateForm().then((err) => {
      if (_.isEmpty(err)) {
        const data = _(props.values).omitBy(_.isEmpty).value()
        SET_DATA('appliedJobs.filterData', data)
        props.onFilter(data)
      }
    })
  }

  const onClear = () => {
    SET_DATA('appliedJobs.filterData', {})
    props.resetForm({})
    props.onFilter({})
  }

  return (
    <Form>
      <div className="form-field">
        <Field name="firstName" label="First Name" />
      </div>
      <div className="form-field">
        <Field name="last Name" label="Last Name" />
      </div>
      <div className="form-field">
        <Field name="email" label="Email" />
      </div>
      <div className="form-field">
        <Field
          name="job"
          label="Job"
          as="paged-select"
          endPoint="job-postings/get"
          value={props.values?.job || ''}
          allowClear
        />
      </div>
      <div className="form-field">
        <Field name="status" label="Status" value={props.values?.status || ''} />
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
  )
}

export default withFormik({
  mapPropsToValues: () => {
    const filterObj = GET_DATA('appliedJobs.filterData')

    return {
      firstName: filterObj?.firstName || '',
      lastName: filterObj?.lastName || '',
      email: filterObj?.email || '',
      job: filterObj?.job || '',
      status: filterObj?.status || ''
    }
  },
  handleSubmit: () => null
})(Filter)
