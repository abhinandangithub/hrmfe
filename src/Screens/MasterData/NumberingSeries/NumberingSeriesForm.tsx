import { Col, Row } from 'antd'
import { withFormik } from 'formik'
import moment from 'moment'
import * as Yup from 'yup'
import { Field, Form } from '../../../Components/Formik'
import ModalBoxFooter from '../../../Components/ModalBox/ModalBoxFooter'
import { NUMBERING_MODULES_TRANSACTIONS } from '../../../Util/Options'
import apiClient from '../../../Util/apiClient'

const Schema = Yup.object().shape({
  moduleTransaction: Yup.string().required(),
  startNo: Yup.number().required(),
  validFrom: Yup.date().required(),
  validTo: Yup.date().required()
})

function NumberingSeriesForm(props: any) {
  const onSave = async () => {
    await props.submitForm()
  }

  return (
    <Form>
      <Row gutter={[10, 10]}>
        <Col xs={24}>
          <div className="form-fields">
            <Field
              as="select"
              name="moduleTransaction"
              label="Transaction"
              options={NUMBERING_MODULES_TRANSACTIONS}
              disabled={!!props.selectedSeries}
            />
          </div>
        </Col>
        <Col xs={24} lg={8}>
          <div className="form-fields">
            <Field name="prefix" label="Prefix" disabled={!!props.selectedSeries} />
          </div>
        </Col>
        <Col xs={24} lg={8}>
          <div className="form-fields">
            <Field name="startNo" label="StartNo" disabled={!!props.selectedSeries} />
          </div>
        </Col>
        <Col xs={24} lg={8}>
          <div className="form-fields">
            <Field name="suffix" label="Suffix" disabled={!!props.selectedSeries} />
          </div>
        </Col>
        <Col xs={24} lg={12}>
          <div className="form-fields">
            <Field as="date" name="validFrom" label="ValidFrom" />
          </div>
        </Col>
        <Col xs={24} lg={12}>
          <div className="form-fields">
            <Field as="date" name="validTo" label="ValidTo" />
          </div>
        </Col>
      </Row>

      <div className="form-fields">
        <ModalBoxFooter
          okText={props.selectedSeries ? 'Update' : 'Add'}
          onOk={() => onSave()}
          onCancel={() => props.onCancel()}
        />
      </div>
    </Form>
  )
}

export default withFormik({
  mapPropsToValues: ({ selectedSeries = {} }: any) => ({
    moduleTransaction: selectedSeries ? `${selectedSeries.module} - ${selectedSeries.transaction}` : '',
    prefix: selectedSeries?.prefix || '',
    startNo: selectedSeries?.startNo || '',
    suffix: selectedSeries?.suffix || '',
    validFrom: selectedSeries ? moment(selectedSeries.validFrom).utc() : '',
    validTo: selectedSeries ? moment(selectedSeries.validTo).utc() : ''
  }),

  validationSchema: Schema,
  handleSubmit: (data: any, { props: { selectedSeries, onCancel } }: any) => {
    const findSeries = NUMBERING_MODULES_TRANSACTIONS.find((v) => v.value === data.moduleTransaction)

    if (findSeries) {
      data.module = findSeries.module
      data.transaction = findSeries.transaction
      data.code = findSeries.code
    }

    data.validFrom = moment(data.validFrom).format('YYYY-MM-DD')
    data.validTo = moment(data.validTo).format('YYYY-MM-DD')

    if (selectedSeries) {
      apiClient.put(`numbering-series/${selectedSeries.id}`, { ...data }).then(({ data }) => {
        if (data && data.result) {
          onCancel()
        }
      })
    } else {
      apiClient.post('numbering-series', data).then(({ data }) => {
        if (data && data.result) {
          onCancel()
        }
      })
    }
  }
})(NumberingSeriesForm)
