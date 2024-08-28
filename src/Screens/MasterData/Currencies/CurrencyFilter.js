import { Formik } from 'formik'
import React from 'react'
import Button from '../../../Components/Button'
import { Field } from '../../../Components/Formik'
import { validateAccess } from '../../../Util/Util'

const CurrencyFilter = (props) => {
  const { history, onFilter } = props

  const handleSubmit = (values) => {
    const { name, code } = values
    const queryArr = []

    if (name && name !== '') {
      queryArr.push(`name=${name}`)
    }

    if (code && code !== '') {
      queryArr.push(`code=${code}`)
    }

    // this.props.onFilter(queryArr.length > 0 ? queryArr.join('&') : false)
    onFilter({ name, code })
  }

  return (
    <div className="filter-section">
      {validateAccess('add-currency') && (
        <Button
          type="button"
          onClick={() => history.push('/app/add-currency')}
          className="btn-block"
          variant="primary">
          <i className="flaticon-plus" />
          Define your currency
        </Button>
      )}
      <Formik
        initialValues={{
          name: '',
          code: ''
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
                <Field name="code" label="Code" />
              </div>
              <div className="form-fields">
                <Button type="submit" className="btn-glow btn-block search">
                  <i className="flaticon-search-interface-symbol" /> Search
                </Button>
              </div>
            </form>
          )
        }}
      </Formik>
    </div>
  )
}

export default CurrencyFilter
