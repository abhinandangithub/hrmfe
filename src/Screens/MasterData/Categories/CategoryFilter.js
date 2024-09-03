import { Formik } from 'formik'
import React from 'react'
import { Field } from '../../../Components/Formik'
import { validateAccess } from '../../../Util/Util'

const CategotyFilter = (props) => {
  const { history, onFilter } = props

  const handleSubmit = (values) => {
    const { name } = values
    const queryArr = []

    if (name && name !== '') {
      queryArr.push(`name=${name}`)
    }

    // this.props.onFilter(queryArr.length > 0 ? queryArr.join('&') : false)
    onFilter({ name })
  }

  return (
    <div className="filter-section">
      {validateAccess('add-category') && (
        <button
          type="button"
          onClick={() => history('/app/add-category')}
          className="btn-glow btn-block primary">
          Add new category
        </button>
      )}
      <Formik
        initialValues={{
          name: ''
        }}
        onSubmit={handleSubmit}>
        {(props) => {
          const { handleSubmit } = props

          return (
            <form onSubmit={handleSubmit} noValidate>
              <div className="form-fields">
                <Field name="name" label="Name" />
              </div>
              <div className="form-fields">
                <button type="submit" className="btn-glow btn-block search">
                  Search
                </button>
              </div>
            </form>
          )
        }}
      </Formik>
    </div>
  )
}

export default CategotyFilter
