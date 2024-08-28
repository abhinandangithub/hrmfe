import { withFormik } from 'formik'
import _ from 'lodash'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import Button from '../../../Components/Button'
import { Field, Form } from '../../../Components/Formik'
import apiClient from '../../../Util/apiClient'
import { STATUS } from '../../../Util/Options'
import { GET_DATA, removeEmptyKeys, SET_DATA, validateAccess } from '../../../Util/Util'

function Filter(props) {
  const { submitForm, validateForm, values, onFilter } = props
  const history = useHistory()
  const [currencies, setCurrencies] = useState([])

  useEffect(() => {
    apiClient.get('currencies/getMaster').then(({ data }) => {
      if (data && data.result) {
        const currencies = data.result.map((val) => {
          val.label = `${val.code} - ${val.name}`
          val.value = val.code

          return val
        })
        setCurrencies(currencies)
      }
    })
  }, [])

  const onSubmitForm = async () => {
    await submitForm()
    validateForm().then((err) => {
      if (_.isEmpty(err)) {
        const params = removeEmptyKeys(values)

        if (params.date) {
          params.date = moment(params.date).format('YYYY-MM-DD')
        }

        onFilter(params)
        SET_DATA('uomConversions.filterData', params)
      }
    })
  }

  const onClear = () => {
    props.resetForm({})
    props.onFilter({})
  }

  return (
    <>
      {validateAccess('add-uom-conversion') && (
        <Button
          onClick={() => history.push('/app/add-uom-conversion')}
          variant="primary"
          className="btn-block">
          <i className="flaticon-plus" /> Add UOM Conversion
        </Button>
      )}
      <Form>
        <div className="form-fields">
          <Field name="date" label="Month" as="date" />
          <Field name="baseCurrency" label="Base Currency" as="select" options={currencies} />
          <Field name="toCurrency" label="To Currency" as="select" options={currencies} />
          <Field name="rate" label="Rate" />
          <Field name="status" label="Status" as="select" options={STATUS} />
        </div>
        <div className="form-fields">
          <Button onClick={() => onSubmitForm()} variant="primary" className="search">
            Show
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
    const filterObj = GET_DATA('uomConversions.filterData')

    return {
      date: filterObj?.date || '',
      baseCurrency: filterObj?.baseCurrency || '',
      toCurrency: filterObj?.toCurrency || '',
      rate: filterObj?.rate || '',
      status: filterObj?.status || ''
    }
  },
  handleSubmit: () => null
})(Filter)
