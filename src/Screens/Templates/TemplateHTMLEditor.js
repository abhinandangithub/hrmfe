import { withFormik } from 'formik'
import _ from 'lodash'
import { useEffect } from 'react'
import * as Yup from 'yup'
import Field from '../../Components/Formik/Field'
import Form from '../../Components/Formik/Form'
import ModalBox from '../../Components/ModalBox/ModalBox'
import apiClient from '../../Util/apiClient'

const Schema = Yup.object().shape({
  htmlContent: Yup.string().required()
})

function TemplateFormHTMLEditor(props) {
  const { edit, submitForm, validateForm, values, onAdd, open, onCancel, resetForm, setValues } = props

  useEffect(() => {
    if (edit) {
      apiClient.get(`customTemplates/getById/${edit.id}`).then(({ data }) => {
        if (data?.result) {
          setValues({ ...values, htmlContent: data.result.htmlContent })
        }
      })
    }
  }, [])

  const onSubmitForm = async () => {
    await submitForm()
    validateForm().then((err) => {
      if (_.isEmpty(err)) {
        onAdd(values)
        resetForm()
      }
    })
  }

  return (
    <ModalBox
      className="add-new-report"
      title={`Add ${props.type} Template`}
      visible={open}
      onOk={onSubmitForm}
      okText="Update"
      onCancel={() => {
        onCancel(false)
        resetForm()
      }}>
      <Form>
        <div className="form-fields">
          <Field dir="ltr" name="htmlContent" label="HTML Content" as="textarea" rows={16} />
        </div>
      </Form>
    </ModalBox>
  )
}

export default withFormik({
  mapPropsToValues: () => ({
    htmlContent: ''
  }),
  handleSubmit: () => null,
  validationSchema: Schema
})(TemplateFormHTMLEditor)
