import { withFormik } from 'formik'
import _ from 'lodash'
import React from 'react'
import { useNavigate  } from 'react-router-dom'
import Button from '../../../Components/Button'
import { Field, Form } from '../../../Components/Formik'
import { GET_DATA, SET_DATA, validateAccess } from '../../../Util/Util'

function Filter(props) {
  const history = useNavigate()

  const onSubmitForm = async () => {
    props.validateForm().then((err) => {
      if (_.isEmpty(err)) {
        props.onFilter(_(props.values).omitBy(_.isEmpty).value())
        SET_DATA('products.filterData', props.values)
      }
    })
  }

  const onClear = () => {
    props.resetForm({})
    props.onFilter({})
  }

  return (
    <>
      {validateAccess('add-product') && (
        <Button onClick={() => history('/app/add-product')} variant="primary" className="btn-block">
          <i className="flaticon-plus" /> Add Product
        </Button>
      )}
      <div style={{ paddingTop: 15 }}>
        <Field
          name="productType"
          label="Service"
          as="radio-group"
          value={props.productType}
          options={[
            { label: 'Service', value: 'Service' },
            { label: 'Material', value: 'Material' }
          ]}
          onChange={(n, v) => {
            props.setProductType(v)
          }}
        />
      </div>

      <Form>
        <div className="form-fields">
          <Field name="name" label="name" />
        </div>
        <div className="form-fields">
          <Field name="currency" label="Currency" />
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
    const filterObj = GET_DATA('products.filterData')

    return {
      name: filterObj?.name || '',
      currency: filterObj?.currency || ''
    }
  },
  handleSubmit: () => null
})(Filter)
