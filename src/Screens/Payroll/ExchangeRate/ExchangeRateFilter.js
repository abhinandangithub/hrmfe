import { message } from 'antd'
import { withFormik } from 'formik'
import _ from 'lodash'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import Button from '../../../Components/Button'
import ConfirmationBox from '../../../Components/ConfirmationBox/ConfirmationBox'
import { Field, Form } from '../../../Components/Formik'
import apiClient from '../../../Util/apiClient'
import { STATUS } from '../../../Util/Options'
import { GET_DATA, removeEmptyKeys, SET_DATA, validateAccess } from '../../../Util/Util'
import UploadArea from '../../MasterData/MasterUploads/UploadArea'

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
        SET_DATA('exchangeRates.filterData', params)
      }
    })
  }

  const onUpload = async (header, rowData) => {
    await submitForm()
    validateForm().then(() => {
      if (header.length > 0) {
        const rows = []

        rowData.forEach((val) => {
          const obj = {}
          header.forEach((col, i) => {
            if (col === 'Date(YYYY-MM-DD)') {
              obj.date = moment(val[i]).format('YYYY-MM-DD')
            } else if (col === 'Base') {
              obj.baseCurrency = val[i] || null
            } else if (col === 'To') {
              obj.toCurrency = val[i] || null
            } else if (col === 'Rate') {
              obj.rate = val[i] || null
            } else if (col === 'Status') {
              obj.status = val[i] || null
            }
          })
          rows.push(obj)
        })

        if (rows.length) {
          ConfirmationBox({
            title: 'Exchange rate upload',
            description: 'If same date exits it will overwrite! Are you sure to upload exchange rates?',
            acceptText: 'Yes, Upload now',
            cancelText: 'Cancel',
            acceptFn: () => {
              apiClient
                .post('exchange-rates/upload', { date: values.date, exchangeRates: rows })
                .then(({ data }) => {
                  if (data && data.result) {
                    onFilter(removeEmptyKeys(values))
                    message.success('Exchange rates uploaded')
                  }
                })
            }
          })
        }
      }
    })
  }

  const onDownload = async () => {
    props.validateForm().then((err) => {
      if (_.isEmpty(err)) {
        const params = _(props.values).omitBy(_.isEmpty).value()
        apiClient
          .post('download-data/exchange-rates', params, { responseType: 'blob' })
          .then(({ status, data, headers }) => {
            if (status === 200) {
              const a = document.createElement('a')
              a.href = window.URL.createObjectURL(data)
              a.download = JSON.parse(headers['content-disposition'].split('filename=')[1].split(';')[0])
              document.body.appendChild(a)
              a.click()
              a.remove()
            }
          })
      }
    })
  }

  const onClear = () => {
    props.resetForm({})
    props.onFilter({})
  }

  return (
    <>
      {validateAccess('add-exchange-rate') && (
        <Button
          onClick={() => history.push('/app/add-exchange-rate')}
          variant="primary"
          className="btn-block">
          <i className="flaticon-plus" /> Add Exchange Rate
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
          <Button className="btn-block btn-glow search" onClick={onDownload}>
            Download
          </Button>
        </div>

        <UploadArea
          onUpload={onUpload}
          sheetName="ExchangeRates"
          label="Click here or drag and drop file here to upload exchange rates"
        />
      </Form>
    </>
  )
}

export default withFormik({
  mapPropsToValues: () => {
    const filterObj = GET_DATA('exchangeRates.filterData')

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
