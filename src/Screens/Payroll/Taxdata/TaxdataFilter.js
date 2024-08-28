import { message } from 'antd'
import { withFormik } from 'formik'
import _ from 'lodash'
import moment from 'moment'
import React from 'react'
import Button from '../../../Components/Button'
import ConfirmationBox from '../../../Components/ConfirmationBox/ConfirmationBox'
import { Field, Form } from '../../../Components/Formik'
import apiClient from '../../../Util/apiClient'
import { GET_DATA, SET_DATA } from '../../../Util/Util'
import UploadArea from '../../MasterData/MasterUploads/UploadArea'

const SWISS_STATES = [
  { label: 'Aargau', value: 'Aargau' },
  { label: 'Appenzell Ausserrhoden', value: 'Appenzell Ausserrhoden' },
  { label: 'Appenzell Innerrhoden', value: 'Appenzell Innerrhoden' },
  { label: 'Basel-Land', value: 'Basel-Land' },
  { label: 'Basel-Stadt', value: 'Basel-Stadt' },
  { label: 'Bern', value: 'Bern' },
  { label: 'Freiburg', value: 'Freiburg' },
  { label: 'Genf', value: 'Genf' },
  { label: 'Glarus', value: 'Glarus' },
  { label: 'Graubünden', value: 'Graubünden' },
  { label: 'Jura', value: 'Jura' },
  { label: 'Luzern', value: 'Luzern' },
  { labeL: 'Neuchatel', values: 'Neuchatel' },
  { label: 'Neuenburg', value: 'Neuenburg' },
  { label: 'Nidwalden', value: 'Nidwalden' },
  { label: 'Obwalden', value: 'Obwalden' },
  { label: 'Sankt Gallen', value: 'Sankt Gallen' },
  { label: 'Schaffhausen', value: 'Schaffhausen' },
  { label: 'Schwyz', value: 'Schwyz' },
  { label: 'Solothurn', value: 'Solothurn' },
  { label: 'Tessin', value: 'Tessin' },
  { label: 'Thurgau', value: 'Thurgau' },
  { label: 'Uri', value: 'Uri' },
  { label: 'Waadt', value: 'Waadt' },
  { label: 'Wallis', value: 'Wallis' },
  { label: 'Zug', value: 'Zug' },
  { label: 'Zürich', value: 'Zürich' }
]

function Filter(props) {
  const { submitForm, validateForm, values, onFilter } = props

  const onSubmitForm = async (type) => {
    await submitForm()
    validateForm().then((err) => {
      if (_.isEmpty(err)) {
        if (values.year && values.year !== '') {
          values.year = moment(values.year).format('YYYY')
        }

        onFilter(values, type)
        SET_DATA('taxData.filter', values)
      }
    })
  }

  const onUpload = async (header, rowData) => {
    await submitForm()
    validateForm().then(() => {
      if (values.year && values.year !== '' && values.state && values.state !== '') {
        const year = moment(values.year).format('YYYY')
        const { state } = values

        if (header.length > 0) {
          const rows = []

          rowData.forEach((val, ind) => {
            if (ind !== 0) {
              const obj = {}
              header.forEach((col, i) => {
                if (col === 'Tax Code') {
                  obj.taxCode = val[i] || null
                } else if (col === 'From') {
                  obj.from = val[i] || null
                } else if (col === 'To') {
                  obj.to = val[i] || null
                } else if (col === 'Tax') {
                  obj.tax = val[i] || null
                }

                obj.year = year
                obj.state = state
              })
              rows.push(obj)
            }
          })

          if (rows.length) {
            ConfirmationBox({
              title: 'Tax data upload',
              description: `This will delete all exiting data for year ${year} and state ${state} and upload new data`,
              acceptText: 'Yes, Upload now',
              cancelText: 'Cancel',
              acceptFn: () => {
                apiClient.post('tax-data/upload', { year, state, taxData: rows }).then(({ data }) => {
                  if (data && data.result) {
                    message.success('Tax data uploaded')
                  }
                })
              }
            })
          }
        }
      } else {
        message.error('Please select Year and State')
      }
    })
  }

  return (
    <Form>
      <div className="form-fields">
        <Field name="taxCode" label="TaxCode" />
        <Field name="year" label="Year" as="date" picker="year" />
        <Field name="state" label="State" as="select" options={SWISS_STATES} />
      </div>
      <div className="form-fields">
        <Button onClick={() => onSubmitForm('Show')} variant="primary" className="search">
          Show
        </Button>
      </div>
      <UploadArea
        onUpload={onUpload}
        sheetName="TaxData"
        label="Click here or drag and drop file here to upload tax data"
      />
    </Form>
  )
}

export default withFormik({
  mapPropsToValues: () => {
    const filterObj = GET_DATA('taxData.filter')

    return {
      taxCode: filterObj?.taxCode || '',
      year: filterObj?.year || '',
      state: filterObj?.state || ''
    }
  },
  handleSubmit: () => null
})(Filter)
